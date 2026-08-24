# Client onboarding and dashboard

This app still has no public sign-up and no shopping cart. Staff create the prospect, send an outside signing link, then send a private Stripe Checkout link. The client account is created only after Stripe confirms payment.

## What was added

- Invitation-only login at `/login`, activation at `/activate`, password reset at `/forgot-password`
- Staff workspace at `/admin`
- Client workspace at `/dashboard`
- Stripe Checkout for $499 + $229 + $69/month (first charge $797)
- Stripe webhook at `/api/stripe/webhook`
- Read-only billing status in the client dashboard
- Support requests instead of chat

## Configure

1. Create a Supabase project.
2. Run `supabase/migrations/20260823120000_platform.sql` in the SQL editor.
3. In Authentication, turn off public sign-ups.
4. Create your staff user in Authentication, then insert a matching `profiles` row with `role = 'admin'` and `account_status = 'active'`.
5. Create a private Storage bucket named `client-uploads`.
6. In Stripe test mode, create:
   - one-time $499 landing page price
   - one-time $229 domain setup price
   - recurring $69 / month hosting price
7. Add a webhook for `https://YOUR_DOMAIN/api/stripe/webhook` with:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
8. Copy `.env.example` to `.env.local` and fill in the values. Use the same keys in Vercel.

## Local test

```bash
npm install
npm test
npm run dev
```

Stripe test card: `4242 4242 4242 4242`. Failed-payment tests: `4000 0000 0000 0341`.

Walk the flow:

1. Sign in at `/admin`
2. Create a prospect
3. Add the demo URL
4. Paste an external signing URL and mark the agreement signed
5. Create a private payment link
6. Pay in Stripe Checkout
7. Confirm the webhook provisioned the account once
8. Open the activation email and set a password at `/activate`
9. Sign in at `/dashboard` and confirm you only see that business

## Manual items that are not finished until you add credentials

- Supabase project, SQL, staff user, and storage bucket
- Stripe products, prices, and webhook endpoint
- Resend sending domain (already used for inquiries)
- A real e-signature provider account (HelloSign, DocuSign, or PandaDoc). This app stores the link and status; it does not collect legally binding signatures itself.

Do not treat the workspace as live until those are connected.
