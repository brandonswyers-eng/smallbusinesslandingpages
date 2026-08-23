# Build status — smallbusinesslandingpages.com

Snapshot of the product as of **22 August 2026**. This is the marketing site for the landing-page offer, not a customer site builder.

## What exists today

A single-page Next.js marketing site on `main`, live in GitHub at [brandonswyers-eng/smallbusinesslandingpages](https://github.com/brandonswyers-eng/smallbusinesslandingpages).

Public offer on the page:

| Charge | Amount | Notes |
| --- | --- | --- |
| Design and build | $399 one-time | Custom single page, two revision rounds |
| Domain and launch setup | $129 one-time | Domain registered in the customer’s business name |
| Hosting, maintenance, support | $59/month | 12-month commitment |
| Typical first-year total | $1,236 | $399 + $129 + ($59 × 12) |

Copy is conservative: no guaranteed leads or rankings, no fabricated testimonials. Inquiry is a conversation, not a contract.

### Page sections (`src/app/page.tsx`)

1. Fixed glass header with wordmark, in-page nav (Why / Included / Pricing / FAQ), CTA to `#contact`
2. Dark hero + three price tiles above the fold
3. `#why` — four reasons
4. `#included` — seven deliverables
5. `#pricing` — three cards + first-year snapshot
6. How it works — four steps
7. Audience marquee (mechanics, contractors, etc.)
8. `#faq` — accordion
9. `#contact` — inquiry form
10. Footer

### Inquiry form (not production-ready)

- Client: `src/components/inquiry-form.tsx`
- API: `POST /api/inquiry` in `src/app/api/inquiry/route.ts`
- Required fields: name, business name, email, phone, business type
- Success path returns `{ ok: true }` and **only `console.log`s** the payload
- Fallback contact copy: `hello@smallbusinesslandingpages.com`

**Do not treat inquiries as captured until this route is wired to email or a CRM.**

## Stack

| Piece | Version / choice |
| --- | --- |
| Next.js App Router | 16.3.2 |
| React | 19.2.8 |
| TypeScript | 5.x |
| Tailwind CSS | 4.x (`src/app/globals.css`) |
| UI | shadcn/ui (`base-nova`), Base UI, lucide-react |
| Fonts | Geist Sans + Geist Mono via `next/font` |
| Dev server | `next dev --port 43127` |

Layout lives under `src/app/`. UI primitives: button, input, label, textarea, card, accordion.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:43127](http://localhost:43127).

| Script | Command |
| --- | --- |
| Dev | `npm run dev` |
| Production build | `npm run build` |
| Serve production build | `npm start` |
| Lint | `npm run lint` |

## Production publish (not finished)

Intended path: **GitHub → Vercel → Squarespace DNS**.

1. Push `main` to GitHub (already connected; see below).
2. Import the repo in Vercel (framework: Next.js).
3. Add `smallbusinesslandingpages.com` and `www.smallbusinesslandingpages.com` in Vercel Domains.
4. In Squarespace DNS, keep email MX/TXT. Point web traffic with Vercel’s A record on `@` (typically `76.76.21.21`) and CNAME on `www`.
5. Wait for **Valid Configuration**, then load the domain.

This repo does **not** yet include a checked-in Vercel project (`.vercel` is gitignored). Domain cutover is still a manual step.

## GitHub and git (checked 22 Aug 2026)

| Check | Result |
| --- | --- |
| Branch | `main`, tracking `origin/main` |
| Remote | `https://github.com/brandonswyers-eng/smallbusinesslandingpages` |
| Visibility | Public |
| `git fetch` / `git ls-remote` | Success |
| `git push --dry-run origin HEAD` | Success (`Everything up-to-date`) |
| GitHub CLI (`gh`) | Logged in as `brandonswyers-eng`, protocol HTTPS, scopes include `repo` |
| Credential helper | `osxkeychain` |

Commits and pushes on this machine should work with the current HTTPS + keyring setup. If `gh` reports an invalid keyring token in a restricted environment, retry outside the sandbox; full-permission `gh auth status` was healthy.

Recent `main` history (newest first):

- Tighten hero spacing so launch pricing sits above the fold
- Remove the fake phone mockup from the hero
- Restore Geist sans headlines and drop Instrument Serif
- Rebrand to smallbusinesslandingpages.com with a more premium layout
- Add Shopfront landing page with transparent pricing
- Initialize project

## Known gaps / next build work

- Wire `/api/inquiry` to email or CRM
- Confirm Vercel project + custom domain DNS
- Privacy / terms if collecting real inquiries
- Favicon / OG image (still default Next public assets)
- Analytics if desired after launch
