import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { createBlankProfile, MemoryStore } from "./store";
import {
  activateAccount,
  assertRouteAccess,
  canCreatePaymentLink,
  createClientTask,
  createPaymentLink,
  createProspect,
  createSupportRequest,
  PlatformError,
  provisionPaidProject,
  publicRegistrationAvailable,
  saveAgreement,
  submitClientTask,
  updateAgreementStatus,
  type PlatformContext,
} from "./services";
import { handleStripeEvent } from "./webhooks";

type Mail = { to: string; subject: string; text: string; html: string };

function makeCtx() {
  const mail: Mail[] = [];
  const ctx: PlatformContext = {
    store: new MemoryStore(),
    mailer: {
      async send(message) {
        mail.push({
          to: message.to,
          subject: message.subject,
          text: message.text,
          html: message.html,
        });
      },
    },
    auth: {
      async createUser(input) {
        return { authUserId: `auth-${input.profileId}` };
      },
      async updatePassword() {},
    },
    stripe: {
      async createOrGetCustomer() {
        return { id: "cus_test_123" };
      },
      async createSubscriptionCheckout() {
        return { id: "cs_test_123", url: "https://checkout.stripe.com/c/test" };
      },
    },
    files: { async save() {} },
    appUrl: "https://smallbusinesslandingpages.com",
    teamNotifyEmail: "team@smallbusinesslandingpages.com",
  };
  return { ctx, mail };
}

async function staffAndProspect() {
  const setup = makeCtx();
  const staff = await setup.ctx.store.insertProfile(
    createBlankProfile({
      email: "owner@smallbusinesslandingpages.com",
      fullName: "Alex Rivera",
      role: "admin",
      accountStatus: "active",
    }),
  );
  const created = await createProspect(setup.ctx, staff, {
    email: "pat@example.com",
    fullName: "Pat Lee",
    businessName: "Lee Plumbing",
    demoWebsiteUrl: "https://demo.example.com/lee",
  });
  return { ...setup, staff, ...created };
}

function tokenFromMail(mail: Mail[]) {
  const body = mail.map((item) => `${item.text}\n${item.html}`).join("\n");
  const match = body.match(/[?&]token=([^"&\s]+)/);
  if (!match) throw new Error("No activation token found in email.");
  return decodeURIComponent(match[1]);
}

describe("invitation-only platform", () => {
  it("does not offer public registration", () => {
    expect(publicRegistrationAvailable()).toBe(false);
    expect(existsSync(path.join(process.cwd(), "src/app/signup/page.tsx"))).toBe(false);
    expect(existsSync(path.join(process.cwd(), "src/app/register/page.tsx"))).toBe(false);
  });

  it("creates a client without sending an invitation email", async () => {
    const { mail, profile } = await staffAndProspect();
    expect(profile.accountStatus).toBe("pending");
    expect(mail).toHaveLength(0);
  });

  it("blocks clients from admin routes", async () => {
    const { profile, staff } = await staffAndProspect();
    await expect(assertRouteAccess(profile, "admin")).rejects.toBeInstanceOf(PlatformError);
    await expect(assertRouteAccess(staff, "admin")).resolves.toBeUndefined();
    await expect(assertRouteAccess(null, "dashboard")).rejects.toBeInstanceOf(PlatformError);
  });

  it("requires a signed agreement before creating a payment link", async () => {
    const { ctx, staff, project } = await staffAndProspect();
    await expect(createPaymentLink(ctx, staff, { projectId: project.id })).rejects.toBeInstanceOf(
      PlatformError,
    );
    const unsigned = await saveAgreement(ctx, staff, {
      projectId: project.id,
      agreementName: "Service agreement",
      status: "sent",
    });
    expect(canCreatePaymentLink(project, unsigned).ok).toBe(false);
    await updateAgreementStatus(ctx, staff, unsigned.id, "signed");
    const link = await createPaymentLink(ctx, staff, { projectId: project.id });
    expect(link.url).toContain("checkout.stripe.com");
  });

  it("allows a recorded override when the agreement is unsigned", async () => {
    const { ctx, staff, project } = await staffAndProspect();
    const link = await createPaymentLink(ctx, staff, {
      projectId: project.id,
      overrideReason: "Owner signed a paper copy in person.",
    });
    expect(link.sessionId).toBe("cs_test_123");
  });

  it("provisions the account once after a successful Stripe webhook", async () => {
    const { ctx, mail, profile, project } = await staffAndProspect();
    const event = {
      id: "evt_1",
      type: "checkout.session.completed",
      data: {
        object: {
          payment_status: "paid",
          customer: "cus_test_123",
          subscription: "sub_123",
          metadata: { client_id: profile.id, project_id: project.id },
        },
      },
    };
    await handleStripeEvent(ctx, event);
    await handleStripeEvent(ctx, event);
    const updatedProject = await ctx.store.getProjectById(project.id);
    const updatedProfile = await ctx.store.getProfileById(profile.id);
    expect(updatedProject?.projectStatus).toBe("payment_received");
    expect(updatedProject?.provisionedAt).toBeTruthy();
    expect(updatedProject?.minimumTermEnd).toBeTruthy();
    expect(updatedProfile?.accountStatus).toBe("invited");
    expect(mail.filter((item) => /password|account/i.test(item.subject))).toHaveLength(1);
  });

  it("does not provision after a failed payment and notifies the team", async () => {
    const { ctx, mail, profile, project } = await staffAndProspect();
    await handleStripeEvent(ctx, {
      id: "evt_fail",
      type: "invoice.payment_failed",
      data: {
        object: {
          id: "in_fail",
          customer: "cus_test_123",
          amount_due: 6900,
          currency: "usd",
          metadata: { client_id: profile.id, project_id: project.id },
        },
      },
    });
    const updatedProject = await ctx.store.getProjectById(project.id);
    expect(updatedProject?.provisionedAt).toBeNull();
    expect(mail.some((item) => /fail/i.test(item.subject))).toBe(true);
  });

  it("activates from a live token and rejects an expired token", async () => {
    const live = await staffAndProspect();
    await provisionPaidProject(live.ctx, {
      projectId: live.project.id,
      clientId: live.profile.id,
      stripeCustomerId: "cus_test_123",
      stripeSubscriptionId: "sub_123",
      subscriptionStatus: "active",
    });
    const activated = await activateAccount(live.ctx, {
      token: tokenFromMail(live.mail),
      password: "Password1234",
    });
    expect(activated.accountStatus).toBe("active");

    const expired = makeCtx();
    const staff = await expired.ctx.store.insertProfile(
      createBlankProfile({
        email: "owner@smallbusinesslandingpages.com",
        fullName: "Alex Rivera",
        role: "admin",
        accountStatus: "active",
      }),
    );
    const created = await createProspect(expired.ctx, staff, {
      email: "old@example.com",
      fullName: "Old Owner",
      businessName: "Old Shop",
    });
    await provisionPaidProject(expired.ctx, {
      projectId: created.project.id,
      clientId: created.profile.id,
    });
    const token = tokenFromMail(expired.mail);
    const stored = [...(expired.ctx.store as MemoryStore).tokens.values()][0];
    stored.expiresAt = "2000-01-01T00:00:00.000Z";
    await expect(
      activateAccount(expired.ctx, { token, password: "Password1234" }),
    ).rejects.toBeInstanceOf(PlatformError);
  });

  it("keeps client tasks and support requests on the owning project", async () => {
    const { ctx, staff, profile, project } = await staffAndProspect();
    await ctx.store.updateProfile(profile.id, { accountStatus: "active" });
    const active = (await ctx.store.getProfileById(profile.id))!;
    const task = await createClientTask(ctx, staff, {
      projectId: project.id,
      title: "Send logo",
      taskType: "logo",
    });
    const submitted = await submitClientTask(ctx, active, {
      taskId: task.id,
      response: "Logo is attached as discussed.",
    });
    expect(submitted.status).toBe("submitted");
    const request = await createSupportRequest(ctx, active, {
      projectId: project.id,
      subject: "Need a phone number change",
      message: "Please use the new shop number.",
    });
    expect(request.status).toBe("open");

    const other = await createProspect(ctx, staff, {
      email: "other@example.com",
      fullName: "Other Owner",
      businessName: "Other Shop",
    });
    await ctx.store.updateProfile(other.profile.id, { accountStatus: "active" });
    const otherActive = (await ctx.store.getProfileById(other.profile.id))!;
    await expect(
      submitClientTask(ctx, otherActive, {
        taskId: task.id,
        response: "Should not work",
      }),
    ).rejects.toBeInstanceOf(PlatformError);
  });
});
