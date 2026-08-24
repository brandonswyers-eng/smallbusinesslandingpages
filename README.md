# smallbusinesslandingpages.com

A marketing site for an affordable landing-page service aimed at local businesses.

Traditional landing-page projects can cost $2,000 or more. This offer is:

- **$499** one-time design and build
- **$229** one-time domain registration and launch setup
- **$69/month** hosting, maintenance, and support with a **12-month commitment**
- In-house payment plans available for the one-time website and launch fees

The site does not claim guaranteed leads or search rankings, and it does not use fabricated testimonials.

**Where the build stands, how to ship it, and GitHub status:** [docs/BUILD.md](docs/BUILD.md).

**Private client workspace (invitation-only, no public sign-up):** [docs/PLATFORM.md](docs/PLATFORM.md).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:43127](http://localhost:43127).

The inquiry form posts to `/api/inquiry`, which emails submissions via Resend. Copy `.env.example` to `.env.local` for local tests, and set the same variables in Vercel. The From address must be on a domain you verify in Resend.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, and shadcn/ui.

## Publish (GitHub → Vercel → Squarespace domain)

1. Push this repo to **GitHub** (`origin` is already [brandonswyers-eng/smallbusinesslandingpages](https://github.com/brandonswyers-eng/smallbusinesslandingpages)).
2. Import the GitHub repo in **Vercel** (Framework: Next.js).
3. In Vercel **Settings → Domains**, add `smallbusinesslandingpages.com` and `www.smallbusinesslandingpages.com`.
4. In **Squarespace → Domains → DNS**, keep MX/TXT email records. Replace website records with Vercel’s **A** (`@` → usually `76.76.21.21`) and **CNAME** (`www` → the value Vercel shows).
5. Wait for Vercel to show **Valid Configuration**, then visit the domain.

