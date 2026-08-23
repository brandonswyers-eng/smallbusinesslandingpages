import { getStripe } from "@/lib/platform/stripe";
import { getPlatform, platformConfigured } from "@/lib/platform/runtime";
import { handleStripeEvent } from "@/lib/platform/webhooks";

export async function POST(request: Request) {
  if (!platformConfigured()) {
    return Response.json({ error: "Not configured" }, { status: 503 });
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return Response.json({ error: "Missing signature" }, { status: 400 });
  }
  const rawBody = await request.text();
  try {
    const event = getStripe().webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? "",
    );
    await handleStripeEvent(getPlatform(), {
      id: event.id,
      type: event.type,
      data: { object: event.data.object as unknown as Record<string, unknown> },
    });
    return Response.json({ received: true });
  } catch {
    return Response.json({ error: "Invalid webhook" }, { status: 400 });
  }
}
