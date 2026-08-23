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
  Globe,
  Headphones,
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
  },
  {
    title: "Services and business information",
    description:
      "Your offerings, hours, service area, and the details customers look for first.",
    icon: ClipboardList,
  },
  {
    title: "Contact form",
    description:
      "A simple way for visitors to reach you without hunting for an email address.",
    icon: MessageSquare,
  },
  {
    title: "Click-to-call buttons",
    description:
      "Phone numbers that open the dialer on mobile so people can call in one tap.",
    icon: Phone,
  },
  {
    title: "Basic search-engine setup",
    description:
      "Page title, description, and indexing basics so search engines can find the site. This is not a ranking guarantee.",
    icon: Search,
  },
  {
    title: "Two revision rounds",
    description:
      "Two rounds of design revisions after you review the first custom draft.",
    icon: LayoutTemplate,
  },
  {
    title: "SSL and domain connection",
    description:
      "Secure HTTPS plus connecting your domain so the page can go live.",
    icon: ShieldCheck,
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
      className={`inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90 ${className}`}
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[oklch(0.22_0.05_250)]/95 text-white backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm text-primary-foreground">
              S
            </span>
            Shopfront
          </a>
          <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
            <a href="#why" className="hover:text-white">
              Why we exist
            </a>
            <a href="#included" className="hover:text-white">
              What’s included
            </a>
            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>
            <a href="#faq" className="hover:text-white">
              FAQ
            </a>
          </nav>
          <CtaLink className="h-10 px-4 text-sm">Get My Landing Page</CtaLink>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-[oklch(0.22_0.05_250)] text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.55_0.14_175_/_0.28),transparent_50%)]"
          />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
            <div className="animate-fade-up">
              <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
                For local businesses still working offline
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
                Professional landing pages without the $2,000+ agency price tag.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                We help local businesses get online with a modern, mobile-friendly
                landing page—without confusing packages, hidden costs or
                traditional agency overhead.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CtaLink>Get My Landing Page</CtaLink>
                <a
                  href="#pricing"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-6 text-base font-medium text-white/90 transition hover:bg-white/10"
                >
                  See simple pricing
                </a>
              </div>
              <p className="mt-6 text-sm text-white/55">
                Traditional landing-page projects can cost $2,000 or more.
                Shopfront starts at $399 for design and build.
              </p>
            </div>

            <div className="animate-fade-up rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-sm">
              <p className="text-sm font-medium text-white/70">Clear pricing</p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start justify-between gap-4 rounded-xl bg-white/5 p-4">
                  <div>
                    <p className="font-medium">Landing-page design &amp; build</p>
                    <p className="text-sm text-white/60">One-time</p>
                  </div>
                  <p className="text-xl font-semibold tabular-nums">$399</p>
                </li>
                <li className="flex items-start justify-between gap-4 rounded-xl bg-white/5 p-4">
                  <div>
                    <p className="font-medium">Domain registration &amp; launch</p>
                    <p className="text-sm text-white/60">One-time</p>
                  </div>
                  <p className="text-xl font-semibold tabular-nums">$129</p>
                </li>
                <li className="flex items-start justify-between gap-4 rounded-xl border border-primary/30 bg-primary/10 p-4">
                  <div>
                    <p className="font-medium">Hosting, maintenance &amp; support</p>
                    <p className="text-sm text-white/70">12-month commitment</p>
                  </div>
                  <p className="text-xl font-semibold tabular-nums">
                    $59
                    <span className="text-sm font-normal text-white/70">/mo</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="why" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Why we exist
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[oklch(0.28_0.055_250)] sm:text-4xl">
              Many great small businesses remain offline because traditional
              landing-page projects can cost $2,000 or more.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              We exist to remove that barrier with a simple, transparent and
              affordable model. Professional presence should not require an
              agency budget, a maze of packages, or features you will never use.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <h3 className="font-semibold text-[oklch(0.28_0.055_250)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="included"
          className="border-y border-border bg-white py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              What’s included
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[oklch(0.28_0.055_250)] sm:text-4xl">
              Everything a local service business needs to look professional
              online.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {included.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-border bg-background p-6 shadow-sm"
                >
                  <item.icon className="size-6 text-primary" aria-hidden />
                  <h3 className="mt-4 font-semibold text-[oklch(0.28_0.055_250)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-sm text-muted-foreground">
              The standard domain is registered in the customer’s business name.
              Additional work outside the package is quoted and approved before
              beginning.
            </p>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Simple pricing
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[oklch(0.28_0.055_250)] sm:text-4xl">
            Every charge, written down.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            No bundled mystery packages. You can see the one-time work and the
            monthly hosting before you inquire.
          </p>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm font-medium text-muted-foreground">
                One-time
              </p>
              <p className="mt-2 text-4xl font-semibold tabular-nums text-[oklch(0.28_0.055_250)]">
                $399
              </p>
              <h3 className="mt-3 font-semibold">Landing-page design and build</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Starting price for a custom single-page site, including two
                revision rounds.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm font-medium text-muted-foreground">
                One-time
              </p>
              <p className="mt-2 text-4xl font-semibold tabular-nums text-[oklch(0.28_0.055_250)]">
                $129
              </p>
              <h3 className="mt-3 font-semibold">
                Domain registration and launch setup
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Registered in your business name, connected to the site, and
                prepared to go live.
              </p>
            </article>
            <article className="rounded-2xl border-2 border-primary bg-card p-6 shadow-md">
              <p className="text-sm font-medium text-primary">Monthly</p>
              <p className="mt-2 text-4xl font-semibold tabular-nums text-[oklch(0.28_0.055_250)]">
                $59
                <span className="text-lg font-medium text-muted-foreground">
                  /month
                </span>
              </p>
              <h3 className="mt-3 font-semibold">
                Hosting, maintenance and support
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Keeps the page online and supported. Requires a 12-month
                commitment.
              </p>
            </article>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="border-b border-border bg-muted/50 px-4 py-3 text-sm font-semibold text-[oklch(0.28_0.055_250)] sm:px-6">
              First-year snapshot
            </div>
            <div className="divide-y divide-border">
              <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm sm:px-6">
                <span>Design and build (one-time)</span>
                <span className="font-semibold tabular-nums">$399</span>
              </div>
              <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm sm:px-6">
                <span>Domain registration and launch (one-time)</span>
                <span className="font-semibold tabular-nums">$129</span>
              </div>
              <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm sm:px-6">
                <span>Hosting for 12 months ($59 × 12)</span>
                <span className="font-semibold tabular-nums">$708</span>
              </div>
              <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm font-semibold text-[oklch(0.28_0.055_250)] sm:px-6">
                <span>Typical first-year total</span>
                <span className="tabular-nums">$1,236</span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            First-year total is arithmetic from the published rates, not a
            discount or a guarantee of extra services. Additional work is
            quoted separately.
          </p>
        </section>

        <section className="border-y border-border bg-[oklch(0.28_0.055_250)] py-20 text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Four steps from conversation to a live page.
            </h2>
            <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <li
                  key={step.n}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <p className="font-mono text-sm text-primary">{step.n}</p>
                  <h3 className="mt-3 font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Who it’s for
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[oklch(0.28_0.055_250)] sm:text-4xl">
            Built for local service businesses that need a clear, professional
            page—not an enterprise website.
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            If customers still find you by word of mouth, a truck, or a paper
            card, a focused landing page can make it easier to get called back.
            We do not promise leads or search rankings.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {audiences.map((label) => (
              <li
                key={label}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium shadow-sm"
              >
                {label}
              </li>
            ))}
          </ul>
        </section>

        <section id="faq" className="border-y border-border bg-white py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[oklch(0.28_0.055_250)]">
              Straight answers before you inquire.
            </h2>
            <Accordion className="mt-8 w-full">
              {faqs.map((item, index) => (
                <AccordionItem key={item.q} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-10 rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Get started
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[oklch(0.28_0.055_250)]">
                Tell us about your business.
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Send a short inquiry. We’ll follow up to confirm fit, pricing,
                and timeline. No fake urgency, and no contract until you agree
                to the work.
              </p>
              <ul className="mt-6 space-y-2 text-sm">
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
              <div className="mt-8 flex items-start gap-3 text-sm text-muted-foreground">
                <Headphones className="mt-0.5 size-4 shrink-0 text-primary" />
                Direct communication—you are not paying for layers of account
                management.
              </div>
              <div className="mt-3 flex items-start gap-3 text-sm text-muted-foreground">
                <Globe className="mt-0.5 size-4 shrink-0 text-primary" />
                Hosting starts after launch, at $59/month with a 12-month
                commitment.
              </div>
            </div>
            <InquiryForm />
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-white/10 bg-[oklch(0.22_0.05_250)] py-10 text-white/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Shopfront. Local landing pages.</p>
          <p>
            Pricing shown is for the standard single-page package. Traditional
            agency projects can cost $2,000+.
          </p>
        </div>
      </footer>
    </div>
  );
}
