import Stripe from "stripe";
import type { StripeCheckoutPort } from "./services";

export function stripeConfigured() {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.STRIPE_PRICE_LANDING_PAGE &&
      process.env.STRIPE_PRICE_DOMAIN_SETUP &&
      process.env.STRIPE_PRICE_HOSTING_MONTHLY,
  );
}

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set.");
  return new Stripe(key);
}

export function createStripePort(): StripeCheckoutPort {
  const stripe = getStripe();
  const landing = process.env.STRIPE_PRICE_LANDING_PAGE;
  const domain = process.env.STRIPE_PRICE_DOMAIN_SETUP;
  const hosting = process.env.STRIPE_PRICE_HOSTING_MONTHLY;
  if (!landing || !domain || !hosting) {
    throw new Error("Stripe price IDs are not set.");
  }
  return {
    async createOrGetCustomer(input) {
      if (input.existingId) {
        await stripe.customers.update(input.existingId, {
          email: input.email,
          name: input.name,
          metadata: input.metadata,
        });
        return { id: input.existingId };
      }
      const customer = await stripe.customers.create({
        email: input.email,
        name: input.name,
        metadata: input.metadata,
      });
      return { id: customer.id };
    },
    async createSubscriptionCheckout(input) {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer: input.customerId,
        client_reference_id: input.clientId,
        success_url: input.successUrl,
        cancel_url: input.cancelUrl,
        line_items: [
          { price: landing, quantity: 1 },
          { price: domain, quantity: 1 },
          { price: hosting, quantity: 1 },
        ],
        metadata: {
          client_id: input.clientId,
          project_id: input.projectId,
        },
        subscription_data: {
          metadata: {
            client_id: input.clientId,
            project_id: input.projectId,
          },
        },
      });
      if (!session.url) throw new Error("Stripe did not return a checkout URL.");
      return { id: session.id, url: session.url };
    },
  };
}
