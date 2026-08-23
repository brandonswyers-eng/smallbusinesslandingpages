import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InquiryForm } from "@/components/inquiry-form";
import {
  Check,
  ClipboardList,
  LayoutTemplate,
  MessageSquare,
  Phone,
  Search,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const included = [
  {
    title: "Mobile-friendly design",
    description:
      "A single-page site that reads clearly on phones, tablets, and desktops.",
    icon: Smartphone,
    span: "lg:col-span-2",
  },
  {
    title: "Services and business information",
    description:
      "Your offerings, hours, service area, and the details customers look for first.",
    icon: ClipboardList,
    span: "",
  },
  {
    title: "Contact form",
    description:
      "A simple way for visitors to reach you without hunting for an email address.",
    icon: MessageSquare,
    span: "",
  },
  {
    title: "Click-to-call buttons",
    description:
      "Phone numbers that open the dialer on mobile so people can call in one tap.",
    icon: Phone,
    span: "",
  },
  {
    title: "Basic search-engine setup",
    description:
      "Page title, description, and indexing basics so search engines can find the site. This is not a ranking guarantee.",
    icon: Search,
    span: "lg:col-span-2",
  },
  {
    title: "Two revision rounds",
    description:
      "Two rounds of design revisions after you review the first custom draft.",
    icon: LayoutTemplate,
    span: "",
  },
  {
    title: "SSL and domain connection",
    description:
      "Secure HTTPS plus connecting your domain so the page can go live.",
    icon: ShieldCheck,
    span: "",
  },
];

const steps = [
  {
    n: "01",
    title: "Tell us about your business",
    text: "Share your name, services, photos if you have them, and how you want customers to get in touch.",
  },
  {
    n: "02",
    title: "Review your custom design",
    text: "We build a streamlined landing page and send you a private preview to review on your phone and computer.",
  },
  {
    n: "03",
    title: "Approve the final version",
    text: "Use your two included revision rounds, then sign off when the page matches what you need.",
  },
  {
    n: "04",
    title: "We connect the domain and launch it",
    text: "We handle domain connection, SSL, and launch setup so the page is live for customers.",
  },
];

const audiences = [
  "Mechanics",
  "Contractors",
  "Landscapers",
  "Cleaners",
  "Salons",
  "Restaurants",
  "Auto detailers",
  "Other local services",
];

const faqs = [
  {
    q: "Who owns the domain?",
    a: "The standard domain is registered in your business name. You own it. We handle registration and launch setup as a one-time service so the site can go live without extra guesswork on your side.",
  },
  {
    q: "How do revisions work?",
    a: "The package includes two revision rounds after you review the first custom design. Extra rounds or a change in scope can be quoted separately and only start after you approve them.",
  },
  {
    q: "What does the $59/month cover?",
    a: "Monthly hosting, maintenance, and support for the live landing page. That typically includes keeping the site online, applying routine updates, and helping with the page as it was built—not a custom development retainer.",
  },
  {
    q: "What if I need additional changes later?",
    a: "Work outside the original package—new sections, extra pages, photography, or copy rewrites—is quoted first. We do not begin that work until you approve the quote.",
  },
  {
    q: "What happens during the 12-month commitment?",
    a: "Hosting, maintenance, and support is billed at $59 per month with a 12-month commitment. That keeps the site online and supported after launch. If you need to discuss ending or transferring hosting later, we will walk through options; the monthly plan is not month-to-month during the initial term.",
  },
];

function CtaLink({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href="#contact"
      className={`inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-[15px] font-semibold tracking-tight text-primary-foreground shadow-[0_18px_40px_-18px_oklch(0.88_0.155_128)] transition hover:brightness-105 ${className}`}
    >
      {children}
    </a>
  );
}

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="flex min-w-0 items-baseline text-[13px] font-medium tracking-tight sm:text-sm">
      <span className={light ? "text-white" : "text-[oklch(0.22_0.05_250)]"}>
        smallbusiness
      </span>
      <span className={light ? "text-primary" : "text-[oklch(0.45_0.1_175)]"}>
        landingpages.com
      </span>
    </span>
  );
}

function PhonePreview() {
  return (
    <div className="animate-float relative mx-auto w-[280px] sm:w-[300px]">
      <div className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(circle,oklch(0.88_0.155_128_/_0.22),transparent_62%)] blur-2xl" />
      <div className="rounded-[2.2rem] border border-white/15 bg-[oklch(0.18_0.04_250)] p-2.5 shadow-[0_40px_80px_-20px_oklch(0.15_0.05_250)]">
        <div className="overflow-hidden rounded-[1.7rem] bg-white">
          <div className="flex items-center justify-between bg-[oklch(0.22_0.05_250)] px-4 py-3 text-white">
            <span className="text-[10px] font-medium tracking-wide">
              RIVERA AUTO CARE
            </span>
            <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-semibold text-primary-foreground">
              Call
            </span>
          </div>
          <div className="space-y-3 p-4">
            <div className="h-24 rounded-2xl bg-gradient-to-br from-[oklch(0.93_0.03_175)] to-[oklch(0.9_0.02_250)]" />
            <div className="h-2.5 w-4/5 rounded-full bg-[oklch(0.22_0.05_250)]" />
            <div className="h-2 w-full rounded-full bg-zinc-200" />
            <div className="h-2 w-2/3 rounded-full bg-zinc-200" />
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="h-14 rounded-xl bg-zinc-100" />
              <div className="h-14 rounded-xl bg-zinc-100" />
            </div>
            <div className="h-9 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-[oklch(0.97_0.008_250)] text-foreground">
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[oklch(0.18_0.045_250_/_0.72)] px-3 pl-5 text-white shadow-[0_10px_40px_-20px_black] backdrop-blur-xl sm:h-16">
          <a href="#top" className="min-w-0 truncate">
            <Wordmark light />
          </a>
          <nav className="hidden items-center gap-7 text-[13px] text-white/70 md:flex">
            <a href="#why" className="transition hover:text-white">
              Why
            </a>
            <a href="#included" className="transition hover:text-white">
              Included
            </a>
            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>
            <a href="#faq" className="transition hover:text-white">
              FAQ
            </a>
          </nav>
          <CtaLink className="h-10 px-4 text-sm">Get My Landing Page</CtaLink>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-[oklch(0.18_0.05_255)] pt-28 text-white sm:pt-32">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 top-10 size-[28rem] rounded-full bg-[oklch(0.45_0.16_265_/_0.45)] blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 top-24 size-[22rem] rounded-full bg-[oklch(0.88_0.155_128_/_0.18)] blur-3xl"
          />
          <div
            aria-hidden
            className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
          />

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24">
            <div className="animate-fade-up">
              <p className="mb-6 inline-flex rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                Local businesses, still offline
              </p>
              <h1 className="text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.6rem]">
                Professional landing pages{" "}
                <span className="text-primary">without the $2,000+</span>{" "}
                agency price tag.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                We help local businesses get online with a modern, mobile-friendly
                landing page—without confusing packages, hidden costs or
                traditional agency overhead.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CtaLink>Get My Landing Page</CtaLink>
                <a
                  href="#pricing"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-[15px] font-medium text-white/85 transition hover:bg-white/10"
                >
                  See simple pricing
                </a>
              </div>
              <p className="mt-7 max-w-md text-sm leading-relaxed text-white/45">
                Traditional landing-page projects can cost $2,000 or more. This
                package starts at $399 for design and build.
              </p>
            </div>
            <PhonePreview />
          </div>

          <div className="relative border-t border-white/8">
            <div className="mx-auto grid max-w-6xl gap-px sm:grid-cols-3">
              {[
                ["$399", "One-time design & build"],
                ["$129", "One-time domain & launch"],
                ["$59/mo", "Hosting · 12-month term"],
              ].map(([price, label]) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-4 px-6 py-6 sm:block sm:px-8"
                >
                  <p className="font-semibold tracking-tight text-3xl text-primary sm:text-4xl">
                    {price}
                  </p>
                  <p className="text-sm text-white/55">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[oklch(0.45_0.08_250)]">
            Why we exist
          </p>
          <h2 className="font-semibold tracking-tight mt-4 max-w-4xl text-4xl leading-[1.12] tracking-tight text-[oklch(0.22_0.05_250)] sm:text-5xl">
            Many great small businesses remain offline because traditional
            landing-page projects can cost $2,000 or more.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            We exist to remove that barrier with a simple, transparent and
            affordable model. Professional presence should not require an agency
            budget, a maze of packages, or features you will never use.
          </p>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Single-page focus",
                text: "We specialize in streamlined landing pages—not oversized multi-page sites you did not ask for.",
              },
              {
                title: "Efficient modern tools",
                text: "A repeatable stack keeps production time down so the price can stay predictable.",
              },
              {
                title: "Repeatable process",
                text: "The same four steps, every time: intake, design, approval, launch.",
              },
              {
                title: "Direct communication",
                text: "You work with the people building the page. Clients aren’t paying for unnecessary agency overhead.",
              },
            ].map((item, i) => (
              <article
                key={item.title}
                className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_20px_50px_-32px_oklch(0.22_0.05_250)]"
              >
                <p className="font-semibold tracking-tight text-2xl text-primary">
                  0{i + 1}
                </p>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-[oklch(0.22_0.05_250)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="included" className="bg-[oklch(0.18_0.05_255)] py-24 text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
              What’s included
            </p>
            <h2 className="font-semibold tracking-tight mt-4 max-w-3xl text-4xl leading-[1.12] sm:text-5xl">
              Everything a local service business needs to look professional
              online.
            </h2>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {included.map((item) => (
                <article
                  key={item.title}
                  className={`rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm ${item.span}`}
                >
                  <item.icon className="size-5 text-primary" aria-hidden />
                  <h3 className="mt-5 text-base font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-10 max-w-3xl text-sm text-white/50">
              The standard domain is registered in the customer’s business name.
              Additional work outside the package is quoted and approved before
              beginning.
            </p>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[oklch(0.45_0.08_250)]">
            Simple pricing
          </p>
          <h2 className="font-semibold tracking-tight mt-4 text-4xl tracking-tight text-[oklch(0.22_0.05_250)] sm:text-5xl">
            Every charge, written down.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            No bundled mystery packages. You can see the one-time work and the
            monthly hosting before you inquire.
          </p>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <article className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_24px_60px_-36px_oklch(0.22_0.05_250)]">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                One-time
              </p>
              <p className="font-semibold tracking-tight mt-4 text-5xl text-[oklch(0.22_0.05_250)]">
                $399
              </p>
              <h3 className="mt-4 font-semibold">Landing-page design and build</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Starting price for a custom single-page site, including two
                revision rounds.
              </p>
            </article>
            <article className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_24px_60px_-36px_oklch(0.22_0.05_250)]">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                One-time
              </p>
              <p className="font-semibold tracking-tight mt-4 text-5xl text-[oklch(0.22_0.05_250)]">
                $129
              </p>
              <h3 className="mt-4 font-semibold">
                Domain registration and launch setup
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Registered in your business name, connected to the site, and
                prepared to go live.
              </p>
            </article>
            <article className="relative overflow-hidden rounded-3xl bg-[oklch(0.18_0.05_255)] p-8 text-white shadow-[0_24px_60px_-28px_oklch(0.18_0.05_255)]">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
                Monthly
              </p>
              <p className="font-semibold tracking-tight mt-4 text-5xl">
                $59
                <span className="ml-1 text-xl text-white/55">/month</span>
              </p>
              <h3 className="mt-4 font-semibold">
                Hosting, maintenance and support
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Keeps the page online and supported. Requires a 12-month
                commitment.
              </p>
            </article>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-black/5 bg-white">
            <div className="border-b border-black/5 px-5 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:px-8">
              First-year snapshot
            </div>
            <div className="divide-y divide-black/5">
              <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm sm:px-8">
                <span>Design and build (one-time)</span>
                <span className="font-semibold tabular-nums">$399</span>
              </div>
              <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm sm:px-8">
                <span>Domain registration and launch (one-time)</span>
                <span className="font-semibold tabular-nums">$129</span>
              </div>
              <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm sm:px-8">
                <span>Hosting for 12 months ($59 × 12)</span>
                <span className="font-semibold tabular-nums">$708</span>
              </div>
              <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-[oklch(0.22_0.05_250)] sm:px-8">
                <span>Typical first-year total</span>
                <span className="font-semibold tracking-tight text-2xl tabular-nums">
                  $1,236
                </span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            First-year total is arithmetic from the published rates, not a
            discount or a guarantee of extra services. Additional work is quoted
            separately.
          </p>
        </section>

        <section className="overflow-hidden bg-[oklch(0.18_0.05_255)] py-24 text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
              How it works
            </p>
            <h2 className="font-semibold tracking-tight mt-4 max-w-3xl text-4xl leading-[1.12] sm:text-5xl">
              Four steps from conversation to a live page.
            </h2>
            <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <li key={step.n} className="bg-white/[0.04] p-7">
                  <p className="font-semibold tracking-tight text-3xl text-primary">
                    {step.n}
                  </p>
                  <h3 className="mt-5 font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[oklch(0.45_0.08_250)]">
              Who it’s for
            </p>
            <h2 className="font-semibold tracking-tight mt-4 max-w-3xl text-4xl leading-[1.12] text-[oklch(0.22_0.05_250)] sm:text-5xl">
              Built for local service businesses that need a clear, professional
              page—not an enterprise website.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              If customers still find you by word of mouth, a truck, or a paper
              card, a focused landing page can make it easier to get called back.
              We do not promise leads or search rankings.
            </p>
          </div>
          <div className="mt-10 overflow-hidden border-y border-black/5 py-5">
            <div className="animate-marquee flex w-max gap-3">
              {[...audiences, ...audiences].map((label, i) => (
                <span
                  key={`${label}-${i}`}
                  className="rounded-full border border-black/8 bg-white px-5 py-2 text-sm font-medium text-[oklch(0.22_0.05_250)] shadow-sm"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[oklch(0.45_0.08_250)]">
              FAQ
            </p>
            <h2 className="font-semibold tracking-tight mt-4 text-4xl text-[oklch(0.22_0.05_250)]">
              Straight answers before you inquire.
            </h2>
            <Accordion className="mt-10 w-full">
              {faqs.map((item, index) => (
                <AccordionItem key={item.q} value={`faq-${index}`}>
                  <AccordionTrigger className="py-4 text-left text-base font-medium">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden bg-[oklch(0.18_0.05_255)] py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 size-[26rem] rounded-full bg-[oklch(0.88_0.155_128_/_0.16)] blur-3xl"
          />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="text-white">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
                Get started
              </p>
              <h2 className="font-semibold tracking-tight mt-4 text-4xl leading-[1.12] sm:text-5xl">
                Tell us about your business.
              </h2>
              <p className="mt-4 leading-relaxed text-white/65">
                Send a short inquiry. We’ll follow up to confirm fit, pricing,
                and timeline. No fake urgency, and no contract until you agree to
                the work.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-white/80">
                {[
                  "Standard domain registered in your business name",
                  "Additional work quoted and approved first",
                  "No claim of guaranteed leads or Google rankings",
                ].map((line) => (
                  <li key={line} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {line}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-white/45">
                Hosting starts after launch, at $59/month with a 12-month
                commitment.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-[0_40px_80px_-32px_black] sm:p-8">
              <InquiryForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[oklch(0.14_0.04_255)] py-10 text-white/50">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} smallbusinesslandingpages.com</p>
          <p>
            Pricing shown is for the standard single-page package. Traditional
            agency projects can cost $2,000+.
          </p>
        </div>
      </footer>
    </div>
  );
}
