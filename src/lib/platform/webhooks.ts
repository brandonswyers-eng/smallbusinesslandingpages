import { templates } from "./email";
import { newId, nowIso } from "./crypto";
import { provisionPaidProject, type PlatformContext } from "./services";

export type StripeLikeEvent = {
  id: string;
  type: string;
  data: { object: Record<string, unknown> };
};

function text(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function cents(value: unknown) {
  return typeof value === "number" ? value : Number(value ?? 0) || 0;
}

export async function handleStripeEvent(ctx: PlatformContext, event: StripeLikeEvent) {
  const inserted = await ctx.store.insertStripeEvent({
    id: newId(),
    stripeEventId: event.id,
    eventType: event.type,
    processingStatus: "processed",
    processedAt: null,
    clientId: null,
    projectId: null,
    errorMessage: null,
    createdAt: nowIso(),
  });
  if (inserted.duplicate) {
    return { duplicate: true as const, type: event.type };
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await handleCheckout(ctx, event.data.object, inserted.record.id);
        break;
      case "invoice.paid":
        await handleInvoice(ctx, event.data.object, inserted.record.id, "paid");
        break;
      case "invoice.payment_failed":
        await handleInvoice(ctx, event.data.object, inserted.record.id, "failed");
        break;
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await handleSubscription(ctx, event.data.object, inserted.record.id);
        break;
      default:
        await ctx.store.updateStripeEvent(inserted.record.id, {
          processingStatus: "ignored",
          processedAt: nowIso(),
        });
        return { duplicate: false as const, type: event.type, ignored: true as const };
    }
    return { duplicate: false as const, type: event.type };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing failed.";
    await ctx.store.updateStripeEvent(inserted.record.id, {
      processingStatus: "failed",
      processedAt: nowIso(),
      errorMessage: message,
    });
    throw error;
  }
}

async function handleCheckout(
  ctx: PlatformContext,
  session: Record<string, unknown>,
  eventRowId: string,
) {
  const paymentStatus = text(session.payment_status);
  if (paymentStatus && paymentStatus !== "paid" && paymentStatus !== "no_payment_required") {
    await ctx.store.updateStripeEvent(eventRowId, {
      processingStatus: "ignored",
      processedAt: nowIso(),
      errorMessage: `Checkout not paid (${paymentStatus}).`,
    });
    return;
  }
  const metadata = (session.metadata ?? {}) as Record<string, unknown>;
  const clientId = text(metadata.client_id);
  const projectId = text(metadata.project_id);
  if (!clientId || !projectId) {
    throw new Error("Checkout session is missing client or project metadata.");
  }
  await ctx.store.updateStripeEvent(eventRowId, { clientId, projectId });
  await provisionPaidProject(ctx, {
    projectId,
    clientId,
    stripeCustomerId: text(session.customer) ?? undefined,
    stripeSubscriptionId: text(session.subscription),
    subscriptionStatus: "active",
  });
}

async function handleInvoice(
  ctx: PlatformContext,
  invoice: Record<string, unknown>,
  eventRowId: string,
  outcome: "paid" | "failed",
) {
  const metadata: Record<string, unknown> = {
    ...((invoice.metadata as Record<string, unknown> | undefined) ?? {}),
    ...(((invoice.parent as Record<string, unknown> | undefined)?.subscription_details as
      | Record<string, unknown>
      | undefined)?.metadata ?? {}),
    ...((invoice.subscription_details as Record<string, unknown> | undefined)?.metadata ?? {}),
  };
  const clientId =
    text(metadata.client_id) ??
    (await findClientIdByCustomer(ctx, text(invoice.customer)));
  const projectId =
    text(metadata.project_id) ??
    (clientId ? (await ctx.store.listProjectsByClient(clientId))[0]?.id ?? null : null);
  await ctx.store.updateStripeEvent(eventRowId, {
    clientId,
    projectId,
    processedAt: nowIso(),
  });
  if (!clientId) return;

  await ctx.store.upsertBillingByInvoiceId({
    id: newId(),
    stripeInvoiceId: text(invoice.id),
    stripeSubscriptionId: text(invoice.subscription),
    invoiceNumber: text(invoice.number),
    clientId,
    projectId,
    amount: cents(invoice.amount_paid || invoice.amount_due),
    currency: text(invoice.currency) ?? "usd",
    invoiceStatus: outcome === "paid" ? "paid" : "failed",
    subscriptionStatus: outcome === "paid" ? "active" : "past_due",
    invoiceDate: invoice.created
      ? new Date(Number(invoice.created) * 1000).toISOString()
      : nowIso(),
    paidAt: outcome === "paid" ? nowIso() : null,
    createdAt: nowIso(),
  });

  if (projectId) {
    await ctx.store.updateProject(projectId, {
      subscriptionStatus: outcome === "paid" ? "active" : "past_due",
      stripeSubscriptionId:
        text(invoice.subscription) ??
        (await ctx.store.getProjectById(projectId))?.stripeSubscriptionId ??
        null,
    });
  }

  if (outcome === "failed") {
    const client = await ctx.store.getProfileById(clientId);
    if (client) {
      const userMail = templates.paymentFailed({ name: client.fullName || "there" });
      await ctx.mailer.send({ to: client.email, ...userMail });
      const teamMail = templates.teamPaymentFailed({
        businessName: client.businessName || client.fullName,
        email: client.email,
      });
      await ctx.mailer.send({ to: ctx.teamNotifyEmail, ...teamMail });
    }
  }
}

async function handleSubscription(
  ctx: PlatformContext,
  subscription: Record<string, unknown>,
  eventRowId: string,
) {
  const metadata = (subscription.metadata ?? {}) as Record<string, unknown>;
  const clientId =
    text(metadata.client_id) ??
    (await findClientIdByCustomer(ctx, text(subscription.customer)));
  const projectId =
    text(metadata.project_id) ??
    (clientId ? (await ctx.store.listProjectsByClient(clientId))[0]?.id ?? null : null);
  await ctx.store.updateStripeEvent(eventRowId, {
    clientId,
    projectId,
    processedAt: nowIso(),
  });
  if (!projectId) return;
  const status = text(subscription.status) ?? "unknown";
  await ctx.store.updateProject(projectId, {
    stripeSubscriptionId: text(subscription.id),
    subscriptionStatus: status,
  });
}

async function findClientIdByCustomer(ctx: PlatformContext, customerId: string | null) {
  if (!customerId) return null;
  const clients = await ctx.store.listProfilesByRole("client");
  return clients.find((profile) => profile.stripeCustomerId === customerId)?.id ?? null;
}
