import { newId, nowIso } from "./crypto";
import type {
  Agreement,
  AuditEvent,
  AuthToken,
  BillingRecord,
  ClientTask,
  Profile,
  Project,
  StripeEventRecord,
  SupportRequest,
  TaskFile,
} from "./types";

export type Store = {
  getProfileById(id: string): Promise<Profile | null>;
  getProfileByEmail(email: string): Promise<Profile | null>;
  getProfileByAuthUserId(authUserId: string): Promise<Profile | null>;
  listProfilesByRole(role: Profile["role"] | "staff"): Promise<Profile[]>;
  insertProfile(profile: Profile): Promise<Profile>;
  updateProfile(id: string, patch: Partial<Profile>): Promise<Profile>;

  getProjectById(id: string): Promise<Project | null>;
  listProjects(): Promise<Project[]>;
  listProjectsByClient(clientId: string): Promise<Project[]>;
  insertProject(project: Project): Promise<Project>;
  updateProject(id: string, patch: Partial<Project>): Promise<Project>;

  listAgreementsByProject(projectId: string): Promise<Agreement[]>;
  getAgreementById(id: string): Promise<Agreement | null>;
  insertAgreement(agreement: Agreement): Promise<Agreement>;
  updateAgreement(id: string, patch: Partial<Agreement>): Promise<Agreement>;

  listTasksByProject(projectId: string): Promise<ClientTask[]>;
  getTaskById(id: string): Promise<ClientTask | null>;
  insertTask(task: ClientTask): Promise<ClientTask>;
  updateTask(id: string, patch: Partial<ClientTask>): Promise<ClientTask>;

  listTaskFiles(taskId: string): Promise<TaskFile[]>;
  insertTaskFile(file: TaskFile): Promise<TaskFile>;

  listSupportByProject(projectId: string): Promise<SupportRequest[]>;
  listOpenSupport(): Promise<SupportRequest[]>;
  getSupportById(id: string): Promise<SupportRequest | null>;
  insertSupport(request: SupportRequest): Promise<SupportRequest>;
  updateSupport(id: string, patch: Partial<SupportRequest>): Promise<SupportRequest>;

  getStripeEvent(stripeEventId: string): Promise<StripeEventRecord | null>;
  insertStripeEvent(record: StripeEventRecord): Promise<{ duplicate: boolean; record: StripeEventRecord }>;
  updateStripeEvent(id: string, patch: Partial<StripeEventRecord>): Promise<StripeEventRecord>;

  listBillingByClient(clientId: string): Promise<BillingRecord[]>;
  insertBilling(record: BillingRecord): Promise<BillingRecord>;
  upsertBillingByInvoiceId(record: BillingRecord): Promise<BillingRecord>;

  insertToken(token: AuthToken): Promise<AuthToken>;
  getTokenByHash(hash: string): Promise<AuthToken | null>;
  updateToken(id: string, patch: Partial<AuthToken>): Promise<AuthToken>;
  invalidateTokens(profileId: string, type: AuthToken["tokenType"]): Promise<void>;

  insertAudit(event: AuditEvent): Promise<AuditEvent>;
};

function clone<T>(value: T): T {
  return structuredClone(value);
}

export class MemoryStore implements Store {
  profiles = new Map<string, Profile>();
  projects = new Map<string, Project>();
  agreements = new Map<string, Agreement>();
  tasks = new Map<string, ClientTask>();
  files = new Map<string, TaskFile>();
  support = new Map<string, SupportRequest>();
  stripeEvents = new Map<string, StripeEventRecord>();
  stripeEventsByStripeId = new Map<string, string>();
  billing = new Map<string, BillingRecord>();
  tokens = new Map<string, AuthToken>();
  audit: AuditEvent[] = [];

  async getProfileById(id: string) {
    return clone(this.profiles.get(id) ?? null);
  }
  async getProfileByEmail(email: string) {
    return clone([...this.profiles.values()].find((p) => p.email === email) ?? null);
  }
  async getProfileByAuthUserId(authUserId: string) {
    return clone(
      [...this.profiles.values()].find((p) => p.authUserId === authUserId) ?? null,
    );
  }
  async listProfilesByRole(role: Profile["role"] | "staff") {
    const rows = [...this.profiles.values()].filter((p) =>
      role === "staff" ? p.role === "admin" || p.role === "team_member" : p.role === role,
    );
    return clone(rows);
  }
  async insertProfile(profile: Profile) {
    this.profiles.set(profile.id, profile);
    return clone(profile);
  }
  async updateProfile(id: string, patch: Partial<Profile>) {
    const current = this.profiles.get(id);
    if (!current) throw new Error("Profile not found");
    const next = { ...current, ...patch, updatedAt: nowIso() };
    this.profiles.set(id, next);
    return clone(next);
  }

  async getProjectById(id: string) {
    return clone(this.projects.get(id) ?? null);
  }
  async listProjects() {
    return clone([...this.projects.values()]);
  }
  async listProjectsByClient(clientId: string) {
    return clone([...this.projects.values()].filter((p) => p.clientId === clientId));
  }
  async insertProject(project: Project) {
    this.projects.set(project.id, project);
    return clone(project);
  }
  async updateProject(id: string, patch: Partial<Project>) {
    const current = this.projects.get(id);
    if (!current) throw new Error("Project not found");
    const next = { ...current, ...patch, updatedAt: nowIso() };
    this.projects.set(id, next);
    return clone(next);
  }

  async listAgreementsByProject(projectId: string) {
    return clone(
      [...this.agreements.values()]
        .filter((a) => a.projectId === projectId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    );
  }
  async getAgreementById(id: string) {
    return clone(this.agreements.get(id) ?? null);
  }
  async insertAgreement(agreement: Agreement) {
    this.agreements.set(agreement.id, agreement);
    return clone(agreement);
  }
  async updateAgreement(id: string, patch: Partial<Agreement>) {
    const current = this.agreements.get(id);
    if (!current) throw new Error("Agreement not found");
    const next = { ...current, ...patch };
    this.agreements.set(id, next);
    return clone(next);
  }

  async listTasksByProject(projectId: string) {
    return clone(
      [...this.tasks.values()]
        .filter((t) => t.projectId === projectId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    );
  }
  async getTaskById(id: string) {
    return clone(this.tasks.get(id) ?? null);
  }
  async insertTask(task: ClientTask) {
    this.tasks.set(task.id, task);
    return clone(task);
  }
  async updateTask(id: string, patch: Partial<ClientTask>) {
    const current = this.tasks.get(id);
    if (!current) throw new Error("Task not found");
    const next = { ...current, ...patch, updatedAt: nowIso() };
    this.tasks.set(id, next);
    return clone(next);
  }

  async listTaskFiles(taskId: string) {
    return clone([...this.files.values()].filter((f) => f.taskId === taskId));
  }
  async insertTaskFile(file: TaskFile) {
    this.files.set(file.id, file);
    return clone(file);
  }

  async listSupportByProject(projectId: string) {
    return clone(
      [...this.support.values()]
        .filter((s) => s.projectId === projectId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    );
  }
  async listOpenSupport() {
    return clone(
      [...this.support.values()].filter((s) => s.status !== "closed"),
    );
  }
  async getSupportById(id: string) {
    return clone(this.support.get(id) ?? null);
  }
  async insertSupport(request: SupportRequest) {
    this.support.set(request.id, request);
    return clone(request);
  }
  async updateSupport(id: string, patch: Partial<SupportRequest>) {
    const current = this.support.get(id);
    if (!current) throw new Error("Support request not found");
    const next = { ...current, ...patch, updatedAt: nowIso() };
    this.support.set(id, next);
    return clone(next);
  }

  async getStripeEvent(stripeEventId: string) {
    const id = this.stripeEventsByStripeId.get(stripeEventId);
    return clone((id ? this.stripeEvents.get(id) : null) ?? null);
  }
  async insertStripeEvent(record: StripeEventRecord) {
    const existingId = this.stripeEventsByStripeId.get(record.stripeEventId);
    if (existingId) {
      return { duplicate: true, record: clone(this.stripeEvents.get(existingId)!) };
    }
    this.stripeEvents.set(record.id, record);
    this.stripeEventsByStripeId.set(record.stripeEventId, record.id);
    return { duplicate: false, record: clone(record) };
  }
  async updateStripeEvent(id: string, patch: Partial<StripeEventRecord>) {
    const current = this.stripeEvents.get(id);
    if (!current) throw new Error("Stripe event not found");
    const next = { ...current, ...patch };
    this.stripeEvents.set(id, next);
    return clone(next);
  }

  async listBillingByClient(clientId: string) {
    return clone(
      [...this.billing.values()]
        .filter((b) => b.clientId === clientId)
        .sort((a, b) => (b.invoiceDate ?? "").localeCompare(a.invoiceDate ?? "")),
    );
  }
  async insertBilling(record: BillingRecord) {
    this.billing.set(record.id, record);
    return clone(record);
  }
  async upsertBillingByInvoiceId(record: BillingRecord) {
    if (record.stripeInvoiceId) {
      const existing = [...this.billing.values()].find(
        (b) => b.stripeInvoiceId === record.stripeInvoiceId,
      );
      if (existing) {
        const next = { ...existing, ...record, id: existing.id };
        this.billing.set(existing.id, next);
        return clone(next);
      }
    }
    this.billing.set(record.id, record);
    return clone(record);
  }

  async insertToken(token: AuthToken) {
    this.tokens.set(token.id, token);
    return clone(token);
  }
  async getTokenByHash(hash: string) {
    return clone([...this.tokens.values()].find((t) => t.tokenHash === hash) ?? null);
  }
  async updateToken(id: string, patch: Partial<AuthToken>) {
    const current = this.tokens.get(id);
    if (!current) throw new Error("Token not found");
    const next = { ...current, ...patch };
    this.tokens.set(id, next);
    return clone(next);
  }
  async invalidateTokens(profileId: string, type: AuthToken["tokenType"]) {
    for (const token of this.tokens.values()) {
      if (token.profileId === profileId && token.tokenType === type && !token.usedAt) {
        token.usedAt = nowIso();
      }
    }
  }

  async insertAudit(event: AuditEvent) {
    this.audit.push(event);
    return clone(event);
  }
}

export function createBlankProfile(overrides: Partial<Profile> & Pick<Profile, "email" | "fullName" | "role">): Profile {
  const now = nowIso();
  return {
    id: newId(),
    authUserId: null,
    phone: null,
    businessName: null,
    accountStatus: overrides.role === "client" ? "pending" : "active",
    stripeCustomerId: null,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

export function createBlankProject(
  overrides: Partial<Project> & Pick<Project, "clientId" | "businessName">,
): Project {
  const now = nowIso();
  return {
    id: newId(),
    internalProjectName: null,
    demoWebsiteUrl: null,
    liveWebsiteUrl: null,
    domainName: null,
    projectStatus: "prospect",
    onboardingStage: "prospect",
    launchDate: null,
    expectedLaunchDate: null,
    minimumTermStart: null,
    minimumTermEnd: null,
    internalNotes: null,
    stripeSubscriptionId: null,
    subscriptionStatus: null,
    paymentOverrideReason: null,
    provisionedAt: null,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}
