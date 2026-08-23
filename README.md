# Shopfront

A marketing site for an affordable landing-page service aimed at local businesses.

Traditional landing-page projects can cost $2,000 or more. Shopfront publishes a simple offer:

- **$399** one-time design and build
- **$129** one-time domain registration and launch setup
- **$59/month** hosting, maintenance, and support with a **12-month commitment**

The site does not claim guaranteed leads or search rankings, and it does not use fabricated testimonials.

## Run locally

```bash
npm install
npm run dev -- --port 43127
```

Open [http://localhost:43127](http://localhost:43127).

The inquiry form posts to `/api/inquiry`, which validates the fields and logs them. Wire that route to email or a CRM before taking real inquiries.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui.
