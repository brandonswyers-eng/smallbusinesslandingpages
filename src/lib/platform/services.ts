import { templates, type Mailer } from "./email";
import {
  expiryForTokenType,
  generateRawToken,
  hashToken,
  isExpired,
  newId,
  normalizeEmail,
  nowIso,
  passwordIssues,
  uploadIssues,
} from "./crypto";
import {
  addMonths,
  isStaffRole,
  MINIMUM_TERM_MONTHS,
  stageFromStatus,
  type Agreement,
  type ClientTask,
  type Profile,
  type Project,
  type SupportRequest,
  type UserRole,
} from "./types";
import { createBlankProfile, createBlankProject, type Store } from "./store";

export class PlatformError extends Error {
  constructor(
    message: string,
    readonly code: "unauthorized" | "forbidden" | "not_found" | "validation" | "conflict",
  ) {
    super(message);
    this.name = "PlatformError";
  }
}

export type AuthPort = {
  createUser(input: {
    email: string;
    password: string;
    profileId: string;
  }): Promise<{ authUserId: string }>;
  updatePassword(authUserId: string, password: string): Promise<void>;
};

export type StripeCheckoutPort = {
  createOrGetCustomer(input: {
    email: string;
    name: string;
    existingId?: string | null;
    metadata: Record<string, string>;
  }): Promise<{ id: string }>;
  createSubscriptionCheckout(input: {
    customerId: string;
    clientId: string;
    projectId: string;
    successUrl: string;
    cancelUrl: string;
  }): Promise<{ id: string; url: string }>;
};

export type FilePort = {
  save(input: { path: string; bytes: Uint8Array; contentType: string }): Promise<void>;
};

export type PlatformContext = {
  store: Store;
  mailer: Mailer;
  auth: AuthPort;
  stripe: StripeCheckoutPort;
  files: FilePort;
  appUrl: string;
  teamNotifyEmail: string;
  now?: () => Date;
};

function clock(ctx: PlatformContext) {
  return ctx.now?.() ?? new Date();
}

function assertStaff(actor: Profile) {
  if (!isStaffRole(actor.role) || actor.accountStatus !== "active") {
    throw new PlatformError("Staff access required.", "forbidden");
  }
}

function assertClient(actor: Profile) {
  if (actor.role !== "client") {
    throw new PlatformError("Client access required.", "forbidden");
  }
  if (actor.accountStatus === "paused") {
    throw new PlatformError("This account is paused. Please contact us.", "forbidden");
  }
  if (actor.accountStatus !== "active") {
    throw new PlatformError("This account is not active yet.", "forbidden");
  }
}

async function latestAgreement(store: Store, projectId: string) {
  const rows = await store.listAgreementsByProject(projectId);
  return rows[0] ?? null;
}

export async function sendActivationEmail(
  ctx: PlatformContext,
  profile: Profile,
  actorId: string | null,
) {
  await ctx.store.invalidateTokens(profile.id, "activation");
  const raw = generateRawToken();
  await ctx.store.insertToken({
    id: newId(),
    profileId: profile.id,
    tokenHash: hashToken(raw),
    tokenType: "activation",
    expiresAt: expiryForTokenType("activation", clock(ctx)),
    usedAt: null,
    createdAt: nowIso(clock(ctx)),
  });
  const activateUrl = `${ctx.appUrl}/activate?token=${encodeURIComponent(raw)}`;
  const content = templates.activation({
    name: profile.fullName || "there",
    activateUrl,
  });
  await ctx.mailer.send({ to: profile.email, ...content });
  await ctx.store.updateProfile(profile.id, { accountStatus: "invited" });
  await ctx.store.insertAudit({
    id: newId(),
    actorId,
    action: "activation_email_sent",
    entityType: "profile",
    entityId: profile.id,
    metadata: {},
    createdAt: nowIso(clock(ctx)),
  });
  return { activateUrl };
}

export async function createProspect(
  ctx: PlatformContext,
  actor: Profile,
  input: {
    email: string;
    fullName: string;
    phone?: string;
    businessName: string;
    internalProjectName?: string;
    demoWebsiteUrl?: string;
    domainName?: string;
    expectedLaunchDate?: string;
    internalNotes?: string;
  },
) {
  assertStaff(actor);
  const email = normalizeEmail(input.email);
  if (!email || !input.fullName.trim() || !input.businessName.trim()) {
    throw new PlatformError("Name, email, and business name are required.", "validation");
  }
  if (await ctx.store.getProfileByEmail(email)) {
    throw new PlatformError("A profile with that email already exists.", "conflict");
  }
  const profile = await ctx.store.insertProfile(
    createBlankProfile({
      email,
      fullName: input.fullName.trim(),
      phone: input.phone?.trim() || null,
      businessName: input.businessName.trim(),
      role: "client",
      accountStatus: "pending",
    }),
  );
  const project = await ctx.store.insertProject(
    createBlankProject({
      clientId: profile.id,
      businessName: input.businessName.trim(),
      internalProjectName: input.internalProjectName?.trim() || null,
      demoWebsiteUrl: input.demoWebsiteUrl?.trim() || null,
      domainName: input.domainName?.trim() || null,
      expectedLaunchDate: input.expectedLaunchDate || null,
      internalNotes: input.internalNotes?.trim() || null,
      projectStatus: input.demoWebsiteUrl ? "demo_ready" : "prospect",
      onboardingStage: input.demoWebsiteUrl ? "demo_ready" : "prospect",
    }),
  );
  await ctx.store.insertAudit({
    id: newId(),
    actorId: actor.id,
    action: "prospect_created",
    entityType: "project",
    entityId: project.id,
    metadata: { email },
    createdAt: nowIso(clock(ctx)),
  });
  return { profile, project };
}

export async function updateProjectRecord(
  ctx: PlatformContext,
  actor: Profile,
  projectId: string,
  patch: Partial<
    Pick<
      Project,
      | "businessName"
      | "internalProjectName"
      | "demoWebsiteUrl"
      | "liveWebsiteUrl"
      | "domainName"
      | "projectStatus"
      | "launchDate"
      | "expectedLaunchDate"
      | "internalNotes"
    >
  >,
) {
  assertStaff(actor);
  const project = await ctx.store.getProjectById(projectId);
  if (!project) throw new PlatformError("Project not found.", "not_found");
  const nextStatus = patch.projectStatus ?? project.projectStatus;
  const updated = await ctx.store.updateProject(projectId, {
    ...patch,
    onboardingStage: stageFromStatus(nextStatus),
  });
  const client = await ctx.store.getProfileById(project.clientId);
  if (patch.projectStatus === "awaiting_approval" && client) {
    const content = templates.websiteReadyForApproval({
      name: client.fullName || "there",
      dashboardUrl: `${ctx.appUrl}/dashboard/project`,
    });
    await ctx.mailer.send({ to: client.email, ...content });
  }
  const liveUrl = patch.liveWebsiteUrl || project.liveWebsiteUrl;
  if (patch.projectStatus === "live" && client && liveUrl) {
    const content = templates.websiteLaunched({
      name: client.fullName || "there",
      liveUrl,
    });
    await ctx.mailer.send({ to: client.email, ...content });
  }
  return updated;
}

export async function setClientAccountStatus(
  ctx: PlatformContext,
  actor: Profile,
  profileId: string,
  accountStatus: Profile["accountStatus"],
) {
  assertStaff(actor);
  const profile = await ctx.store.getProfileById(profileId);
  if (!profile || profile.role !== "client") {
    throw new PlatformError("Client not found.", "not_found");
  }
  return ctx.store.updateProfile(profileId, { accountStatus });
}

export async function saveAgreement(
  ctx: PlatformContext,
  actor: Profile,
  input: {
    projectId: string;
    agreementName: string;
    agreementVersion?: string;
    documentUrl?: string;
    externalSigningUrl?: string;
    esignatureProviderId?: string;
    status?: Agreement["status"];
    notifyClient?: boolean;
  },
) {
  assertStaff(actor);
  const project = await ctx.store.getProjectById(input.projectId);
  if (!project) throw new PlatformError("Project not found.", "not_found");
  const status = input.status ?? (input.externalSigningUrl ? "sent" : "draft");
  const now = nowIso(clock(ctx));
  const agreement = await ctx.store.insertAgreement({
    id: newId(),
    clientId: project.clientId,
    projectId: project.id,
    agreementName: input.agreementName.trim(),
    agreementVersion: input.agreementVersion?.trim() || null,
    documentUrl: input.documentUrl?.trim() || null,
    externalSigningUrl: input.externalSigningUrl?.trim() || null,
    esignatureProviderId: input.esignatureProviderId?.trim() || null,
    status,
    sentAt: status === "draft" || status === "declined" || status === "expired" ? null : now,
    signedAt: status === "signed" ? now : null,
    createdAt: now,
  });
  if (status === "sent" || status === "signed") {
    await ctx.store.updateProject(project.id, {
      projectStatus: status === "signed" ? "agreement_signed" : "agreement_sent",
      onboardingStage: status === "signed" ? "agreement_signed" : "agreement_sent",
    });
  }
  if (input.notifyClient && agreement.externalSigningUrl) {
    const client = await ctx.store.getProfileById(project.clientId);
    if (client) {
      const content = templates.agreementReady({
        name: client.fullName || "there",
        signingUrl: agreement.externalSigningUrl,
      });
      await ctx.mailer.send({ to: client.email, ...content });
    }
  }
  return agreement;
}

export async function updateAgreementStatus(
  ctx: PlatformContext,
  actor: Profile,
  agreementId: string,
  status: Agreement["status"],
) {
  assertStaff(actor);
  const agreement = await ctx.store.getAgreementById(agreementId);
  if (!agreement) throw new PlatformError("Agreement not found.", "not_found");
  const now = nowIso(clock(ctx));
  const updated = await ctx.store.updateAgreement(agreementId, {
    status,
    sentAt: status === "sent" ? agreement.sentAt ?? now : agreement.sentAt,
    signedAt: status === "signed" ? now : agreement.signedAt,
  });
  if (status === "signed" || status === "sent") {
    await ctx.store.updateProject(agreement.projectId, {
      projectStatus: status === "signed" ? "agreement_signed" : "agreement_sent",
      onboardingStage: status === "signed" ? "agreement_signed" : "agreement_sent",
    });
  }
  return updated;
}

export function canCreatePaymentLink(project: Project, agreement: Agreement | null) {
  if (agreement?.status === "signed") return { ok: true as const };
  if (project.paymentOverrideReason?.trim()) return { ok: true as const };
  return {
    ok: false as const,
    reason:
      "The agreement must be marked signed, or an override reason must be recorded.",
  };
}

export async function createPaymentLink(
  ctx: PlatformContext,
  actor: Profile,
  input: { projectId: string; overrideReason?: string; sendEmail?: boolean },
) {
  assertStaff(actor);
  const project = await ctx.store.getProjectById(input.projectId);
  if (!project) throw new PlatformError("Project not found.", "not_found");
  const client = await ctx.store.getProfileById(project.clientId);
  if (!client) throw new PlatformError("Client not found.", "not_found");
  const agreement = await latestAgreement(ctx.store, project.id);
  const overrideReason = input.overrideReason?.trim() || project.paymentOverrideReason;
  const gated = canCreatePaymentLink(
    { ...project, paymentOverrideReason: overrideReason ?? null },
    agreement,
  );
  if (!gated.ok) throw new PlatformError(gated.reason, "validation");

  if (input.overrideReason?.trim() && agreement?.status !== "signed") {
    await ctx.store.updateProject(project.id, {
      paymentOverrideReason: input.overrideReason.trim(),
    });
    await ctx.store.insertAudit({
      id: newId(),
      actorId: actor.id,
      action: "payment_link_override",
      entityType: "project",
      entityId: project.id,
      metadata: { reason: input.overrideReason.trim() },
      createdAt: nowIso(clock(ctx)),
    });
  }

  const customer = await ctx.stripe.createOrGetCustomer({
    email: client.email,
    name: client.fullName || client.businessName || client.email,
    existingId: client.stripeCustomerId,
    metadata: { client_id: client.id, project_id: project.id },
  });
  if (customer.id !== client.stripeCustomerId) {
    await ctx.store.updateProfile(client.id, { stripeCustomerId: customer.id });
  }

  const session = await ctx.stripe.createSubscriptionCheckout({
    customerId: customer.id,
    clientId: client.id,
    projectId: project.id,
    successUrl: `${ctx.appUrl}/payment-received`,
    cancelUrl: `${ctx.appUrl}/admin/projects/${project.id}`,
  });

  await ctx.store.updateProject(project.id, {
    projectStatus: "awaiting_payment",
    onboardingStage: "awaiting_payment",
  });

  if (input.sendEmail) {
    const content = templates.paymentLink({
      name: client.fullName || "there",
      paymentUrl: session.url,
    });
    await ctx.mailer.send({ to: client.email, ...content });
  }

  return { url: session.url, sessionId: session.id };
}

export async function provisionPaidProject(
  ctx: PlatformContext,
  input: {
    projectId: string;
    clientId: string;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string | null;
    subscriptionStatus?: string | null;
  },
) {
  const project = await ctx.store.getProjectById(input.projectId);
  const client = await ctx.store.getProfileById(input.clientId);
  if (!project || !client) {
    throw new PlatformError("Project or client missing for payment.", "not_found");
  }
  if (project.provisionedAt) {
    return { provisioned: false as const, duplicate: true as const, project, client };
  }
  const start = clock(ctx).toISOString().slice(0, 10);
  const updatedProject = await ctx.store.updateProject(project.id, {
    projectStatus: "payment_received",
    onboardingStage: "paid",
    stripeSubscriptionId: input.stripeSubscriptionId ?? project.stripeSubscriptionId,
    subscriptionStatus: input.subscriptionStatus ?? "active",
    minimumTermStart: start,
    minimumTermEnd: addMonths(start, MINIMUM_TERM_MONTHS),
    provisionedAt: nowIso(clock(ctx)),
  });
  if (input.stripeCustomerId) {
    await ctx.store.updateProfile(client.id, { stripeCustomerId: input.stripeCustomerId });
  }
  const paid = templates.paymentReceived({
    name: client.fullName || "there",
    businessName: project.businessName,
  });
  await ctx.mailer.send({ to: client.email, ...paid });
  await sendActivationEmail(ctx, client, null);
  return { provisioned: true as const, duplicate: false as const, project: updatedProject, client };
}

export async function resendActivation(
  ctx: PlatformContext,
  actor: Profile,
  profileId: string,
) {
  assertStaff(actor);
  const profile = await ctx.store.getProfileById(profileId);
  if (!profile) throw new PlatformError("Client not found.", "not_found");
  const projects = await ctx.store.listProjectsByClient(profileId);
  if (!projects.some((item) => item.provisionedAt)) {
    throw new PlatformError(
      "Activation emails are sent only after payment is confirmed.",
      "validation",
    );
  }
  return sendActivationEmail(ctx, profile, actor.id);
}

export async function activateAccount(
  ctx: PlatformContext,
  input: { token: string; password: string },
) {
  const issue = passwordIssues(input.password);
  if (issue) throw new PlatformError(issue, "validation");
  const token = await ctx.store.getTokenByHash(hashToken(input.token));
  if (!token || token.tokenType !== "activation" || token.usedAt) {
    throw new PlatformError("This activation link is invalid or already used.", "validation");
  }
  if (isExpired(token.expiresAt, clock(ctx))) {
    throw new PlatformError(
      "This activation link has expired. Please ask us to send a new one.",
      "validation",
    );
  }
  const profile = await ctx.store.getProfileById(token.profileId);
  if (!profile) throw new PlatformError("Account not found.", "not_found");
  if (profile.accountStatus === "paused" || profile.accountStatus === "archived") {
    throw new PlatformError("This account cannot be activated.", "forbidden");
  }
  let authUserId = profile.authUserId;
  if (!authUserId) {
    const created = await ctx.auth.createUser({
      email: profile.email,
      password: input.password,
      profileId: profile.id,
    });
    authUserId = created.authUserId;
  } else {
    await ctx.auth.updatePassword(authUserId, input.password);
  }
  await ctx.store.updateToken(token.id, { usedAt: nowIso(clock(ctx)) });
  const updated = await ctx.store.updateProfile(profile.id, {
    authUserId,
    accountStatus: "active",
  });
  const projects = await ctx.store.listProjectsByClient(profile.id);
  const project = projects[0];
  if (project && project.projectStatus === "payment_received") {
    await ctx.store.updateProject(project.id, {
      projectStatus: "onboarding",
      onboardingStage: "onboarding",
    });
  }
  return updated;
}

export async function requestPasswordReset(ctx: PlatformContext, email: string) {
  const profile = await ctx.store.getProfileByEmail(normalizeEmail(email));
  if (!profile?.authUserId || profile.accountStatus !== "active") return;
  await ctx.store.invalidateTokens(profile.id, "password_reset");
  const raw = generateRawToken();
  await ctx.store.insertToken({
    id: newId(),
    profileId: profile.id,
    tokenHash: hashToken(raw),
    tokenType: "password_reset",
    expiresAt: expiryForTokenType("password_reset", clock(ctx)),
    usedAt: null,
    createdAt: nowIso(clock(ctx)),
  });
  const content = templates.passwordReset({
    name: profile.fullName || "there",
    resetUrl: `${ctx.appUrl}/forgot-password?token=${encodeURIComponent(raw)}`,
  });
  await ctx.mailer.send({ to: profile.email, ...content });
}

export async function completePasswordReset(
  ctx: PlatformContext,
  input: { token: string; password: string },
) {
  const issue = passwordIssues(input.password);
  if (issue) throw new PlatformError(issue, "validation");
  const token = await ctx.store.getTokenByHash(hashToken(input.token));
  if (!token || token.tokenType !== "password_reset" || token.usedAt) {
    throw new PlatformError("This reset link is invalid or already used.", "validation");
  }
  if (isExpired(token.expiresAt, clock(ctx))) {
    throw new PlatformError("This reset link has expired.", "validation");
  }
  const profile = await ctx.store.getProfileById(token.profileId);
  if (!profile?.authUserId) {
    throw new PlatformError("This account cannot reset a password yet.", "validation");
  }
  await ctx.auth.updatePassword(profile.authUserId, input.password);
  await ctx.store.updateToken(token.id, { usedAt: nowIso(clock(ctx)) });
}

export async function createClientTask(
  ctx: PlatformContext,
  actor: Profile,
  input: {
    projectId: string;
    title: string;
    description?: string;
    taskType?: ClientTask["taskType"];
    dueDate?: string;
    clientVisible?: boolean;
    notifyClient?: boolean;
  },
) {
  assertStaff(actor);
  const project = await ctx.store.getProjectById(input.projectId);
  if (!project) throw new PlatformError("Project not found.", "not_found");
  const now = nowIso(clock(ctx));
  const task = await ctx.store.insertTask({
    id: newId(),
    projectId: project.id,
    title: input.title.trim(),
    description: input.description?.trim() || null,
    taskType: input.taskType ?? "other",
    status: "open",
    dueDate: input.dueDate || null,
    clientVisible: input.clientVisible ?? true,
    clientResponse: null,
    completedAt: null,
    createdAt: now,
    updatedAt: now,
  });
  if (task.clientVisible && input.notifyClient) {
    const client = await ctx.store.getProfileById(project.clientId);
    if (client?.accountStatus === "active") {
      const content = templates.newTask({
        name: client.fullName || "there",
        taskTitle: task.title,
        dashboardUrl: `${ctx.appUrl}/dashboard/tasks`,
      });
      await ctx.mailer.send({ to: client.email, ...content });
    }
  }
  return task;
}

export async function updateTaskStatus(
  ctx: PlatformContext,
  actor: Profile,
  taskId: string,
  status: ClientTask["status"],
) {
  assertStaff(actor);
  return ctx.store.updateTask(taskId, {
    status,
    completedAt: status === "completed" || status === "approved" ? nowIso(clock(ctx)) : null,
  });
}

async function ownedProject(ctx: PlatformContext, actor: Profile, projectId: string) {
  assertClient(actor);
  const project = await ctx.store.getProjectById(projectId);
  if (!project || project.clientId !== actor.id) {
    throw new PlatformError("Project not found.", "not_found");
  }
  return project;
}

export async function submitClientTask(
  ctx: PlatformContext,
  actor: Profile,
  input: {
    taskId: string;
    response?: string;
    file?: { fileName: string; mimeType: string; sizeBytes: number; bytes: Uint8Array };
    approveWebsite?: boolean;
  },
) {
  const task = await ctx.store.getTaskById(input.taskId);
  if (!task || !task.clientVisible) {
    throw new PlatformError("Task not found.", "not_found");
  }
  const project = await ownedProject(ctx, actor, task.projectId);
  if (input.file) {
    const problem = uploadIssues(input.file.mimeType, input.file.sizeBytes);
    if (problem) throw new PlatformError(problem, "validation");
    const safeName = input.file.fileName.replaceAll(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${actor.id}/${project.id}/${task.id}/${newId()}-${safeName}`;
    await ctx.files.save({
      path,
      bytes: input.file.bytes,
      contentType: input.file.mimeType,
    });
    await ctx.store.insertTaskFile({
      id: newId(),
      taskId: task.id,
      uploadedBy: actor.id,
      storagePath: path,
      fileName: input.file.fileName,
      mimeType: input.file.mimeType,
      sizeBytes: input.file.sizeBytes,
      createdAt: nowIso(clock(ctx)),
    });
  }
  const updated = await ctx.store.updateTask(task.id, {
    clientResponse: input.response?.trim() || task.clientResponse,
    status: "submitted",
  });
  if (input.approveWebsite || task.taskType === "website_approval") {
    await ctx.store.updateProject(project.id, {
      projectStatus: "ready_to_launch",
      onboardingStage: "approval",
    });
  }
  const thanks = templates.taskCompleted({
    name: actor.fullName || "there",
    taskTitle: task.title,
  });
  await ctx.mailer.send({ to: actor.email, ...thanks });
  return updated;
}

export async function createSupportRequest(
  ctx: PlatformContext,
  actor: Profile,
  input: { projectId: string; subject: string; message: string },
) {
  await ownedProject(ctx, actor, input.projectId);
  if (!input.subject.trim() || !input.message.trim()) {
    throw new PlatformError("Please include a subject and a message.", "validation");
  }
  const now = nowIso(clock(ctx));
  return ctx.store.insertSupport({
    id: newId(),
    clientId: actor.id,
    projectId: input.projectId,
    subject: input.subject.trim(),
    message: input.message.trim(),
    status: "open",
    adminResponse: null,
    createdAt: now,
    updatedAt: now,
  });
}

export async function closeSupportRequest(
  ctx: PlatformContext,
  actor: Profile,
  requestId: string,
) {
  const request = await ctx.store.getSupportById(requestId);
  if (!request) throw new PlatformError("Request not found.", "not_found");
  if (isStaffRole(actor.role)) {
    assertStaff(actor);
  } else {
    assertClient(actor);
    if (request.clientId !== actor.id) {
      throw new PlatformError("Request not found.", "not_found");
    }
  }
  return ctx.store.updateSupport(requestId, { status: "closed" });
}

export async function respondToSupport(
  ctx: PlatformContext,
  actor: Profile,
  input: { requestId: string; response: string },
) {
  assertStaff(actor);
  const request = await ctx.store.getSupportById(input.requestId);
  if (!request) throw new PlatformError("Request not found.", "not_found");
  const updated = await ctx.store.updateSupport(request.id, {
    adminResponse: input.response.trim(),
    status: "responded",
  });
  const client = await ctx.store.getProfileById(request.clientId);
  if (client) {
    const content = templates.supportResponse({
      name: client.fullName || "there",
      subject: request.subject,
      response: input.response.trim(),
      dashboardUrl: `${ctx.appUrl}/dashboard/support`,
    });
    await ctx.mailer.send({ to: client.email, ...content });
  }
  return updated;
}

export async function assertRouteAccess(
  profile: Profile | null,
  area: "admin" | "dashboard",
) {
  if (!profile) throw new PlatformError("Please sign in.", "unauthorized");
  if (area === "admin") {
    if (!isStaffRole(profile.role) || profile.accountStatus !== "active") {
      throw new PlatformError("Staff access required.", "forbidden");
    }
  } else if (profile.role !== "client" || profile.accountStatus !== "active") {
    throw new PlatformError("This account cannot open the client dashboard.", "forbidden");
  }
}

export function publicRegistrationAvailable() {
  return false;
}

export async function createStaffProfile(
  ctx: PlatformContext,
  input: { email: string; fullName: string; role: Exclude<UserRole, "client"> },
) {
  const email = normalizeEmail(input.email);
  if (await ctx.store.getProfileByEmail(email)) {
    throw new PlatformError("That email is already in use.", "conflict");
  }
  return ctx.store.insertProfile(
    createBlankProfile({
      email,
      fullName: input.fullName,
      role: input.role,
      accountStatus: "active",
    }),
  );
}

export type { SupportRequest };
