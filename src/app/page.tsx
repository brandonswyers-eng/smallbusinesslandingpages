import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FounderSection } from "@/components/founder-section";
import { InquiryForm } from "@/components/inquiry-form";
import { SampleSites } from "@/components/sample-sites";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { CONTACT_EMAIL } from "@/lib/site";
import type { Metadata } from "next";
import {
  Check,
  ClipboardList,
  Handshake,
  LayoutTemplate,
  MessageSquare,
  Phone,
  Search,
  ShieldCheck,
  Smartphone,
  Store,
} from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "https://smallbusinesslandingpages.com/" },
};

const included = [
  {
    title: "Mobile-friendly design",
    description:
      "A one-page website that reads clearly on phones, tablets, and desktops.",
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
      "Secure HTTPS plus connecting your domain so the one-page website can go live.",
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
    text: "We build a streamlined one-page website and send you a private preview to review on your phone and computer.",
  },
  {
    n: "03",
    title: "Approve the final version",
    text: "Use your two included revision rounds, then sign off when the page matches what you need.",
  },
  {
    n: "04",
    title: "We connect the domain and launch it",
    text: "We handle domain connection, SSL, and launch setup so the site is live for customers.",
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
    a: "The standard available domain is registered in your business name. You own it. The $129 launch fee covers first-year registration of that standard domain, DNS configuration, SSL, and connecting it to the live one-page website.",
  },
  {
    q: "How do revisions work?",
    a: "The package includes two revision rounds after you review the first custom design. Extra rounds or a change in scope can be quoted separately and only start after you approve them.",
  },
  {
    q: "What does the $59/month cover?",
    a: "Monthly hosting, maintenance, and support for the live one-page website. That typically includes keeping the site online, applying routine updates, and helping with the page as it was built—not a custom development retainer. It requires a 12-month commitment.",
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
      className={`inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-primary px-6 text-[15px] font-semibold tracking-tight text-primary-foreground shadow-[0_18px_40px_-18px_oklch(0.88_0.155_128)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 ${className}`}
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-full flex-col overflow-x-clip bg-[oklch(0.97_0.008_250)] text-foreground">
      <SiteHeader />

      <main id="top">
        <section className="relative overflow-hidden bg-[oklch(0.18_0.05_255)] pt-20 text-white lg:pt-22">
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

          <div className="relative mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:pb-10">
            <div className="animate-fade-up max-w-3xl">
              <p className="mb-3 inline-flex rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                Simple websites for local businesses
              </p>
              <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-[2.85rem]">
                A professional website for your local business
                <span className="text-primary">
                  —without the $2,000 agency bill.
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                We design, launch and manage a modern one-page website without
                confusing packages, hidden costs or traditional agency overhead.
              </p>
              <p className="mt-5 inline-flex max-w-full rounded-2xl border border-primary/40 bg-primary/15 px-4 py-3 text-sm font-semibold leading-snug text-primary sm:text-base">
                $528 upfront + $59/month for 12 months
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CtaLink>Get My Website</CtaLink>
                <a
                  href="#pricing"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-[15px] font-medium text-white/90 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  See simple pricing
                </a>
              </div>
            </div>
          </div>

          <div className="relative border-t border-white/8">
            <div className="mx-auto grid max-w-6xl gap-px sm:grid-cols-3">
              {[
                ["$399", "One-time website design & build"],
                ["$129", "One-time domain & launch"],
                ["$59/mo", "Hosting · 12-month term"],
              ].map(([price, label]) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-4 px-6 py-4 sm:block sm:px-8 sm:py-5"
                >
                  <p className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                    {price}
                  </p>
                  <p className="text-sm text-white/70">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SampleSites />

        <section id="why" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[oklch(0.45_0.08_250)]">
            Why we exist
          </p>
          <h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.12] tracking-tight text-[oklch(0.22_0.05_250)] sm:text-5xl">
            Great local businesses shouldn’t be invisible online simply because
            a traditional agency is outside their budget.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[oklch(0.38_0.03_250)]">
            We provide a focused, professional website with clear pricing and a
            straightforward process.
          </p>
          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Done for you",
                text: "We design, launch, and connect the one-page website so you are not assembling tools yourself.",
                icon: Handshake,
              },
              {
                title: "Simple and transparent",
                text: "Every charge is written down before you inquire. Additional work is quoted and approved first.",
                icon: ShieldCheck,
              },
              {
                title: "Built for local businesses",
                text: "A focused one-page website for services, hours, and contact—not an enterprise site you did not ask for.",
                icon: Store,
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_20px_50px_-32px_oklch(0.22_0.05_250)]"
              >
                <item.icon
                  className="size-5 text-[oklch(0.45_0.1_175)]"
                  aria-hidden
                />
                <h3 className="mt-4 text-base font-semibold tracking-tight text-[oklch(0.22_0.05_250)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[oklch(0.38_0.03_250)]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="included"
          className="bg-[oklch(0.18_0.05_255)] py-24 text-white"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
              What’s included
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">
              Everything a local service business needs to look professional
              online.
            </h2>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {included.map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <item.icon className="size-5 text-primary" aria-hidden />
                  <h3 className="mt-5 text-base font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-10 max-w-3xl text-sm leading-relaxed text-white/75">
              The standard available domain is registered in the customer’s
              business name. Additional work outside the package is quoted and
              approved before beginning.
            </p>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[oklch(0.45_0.08_250)]">
            Simple pricing
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[oklch(0.22_0.05_250)] sm:text-5xl">
            Every charge, written down.
          </h2>
          <p className="mt-4 max-w-2xl text-[oklch(0.38_0.03_250)]">
            $528 covers the one-time website and launch. Hosting is $59/month
            with a 12-month commitment.
          </p>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <article className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_24px_60px_-36px_oklch(0.22_0.05_250)]">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[oklch(0.42_0.03_250)]">
                One-time
              </p>
              <p className="mt-4 text-5xl font-semibold tracking-tight text-[oklch(0.22_0.05_250)]">
                $399
              </p>
              <h3 className="mt-4 font-semibold">
                Website design and build
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[oklch(0.38_0.03_250)]">
                Starting price for a custom one-page website, including two
                revision rounds.
              </p>
            </article>
            <article className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_24px_60px_-36px_oklch(0.22_0.05_250)]">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[oklch(0.42_0.03_250)]">
                One-time
              </p>
              <p className="mt-4 text-5xl font-semibold tracking-tight text-[oklch(0.22_0.05_250)]">
                $129
              </p>
              <h3 className="mt-4 font-semibold">
                Domain registration and launch setup
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[oklch(0.38_0.03_250)]">
                Includes first-year registration of a standard available domain,
                registration in your business name, DNS configuration, SSL, and
                launch connection.
              </p>
            </article>
            <article className="relative overflow-hidden rounded-3xl bg-[oklch(0.18_0.05_255)] p-8 text-white shadow-[0_24px_60px_-28px_oklch(0.18_0.05_255)]">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
                Monthly
              </p>
              <p className="mt-4 text-5xl font-semibold tracking-tight">
                $59
                <span className="ml-1 text-xl text-white/70">/month</span>
              </p>
              <h3 className="mt-4 font-semibold">
                Hosting, maintenance and support
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                Keeps the one-page website online and supported. Requires a
                12-month commitment.
              </p>
            </article>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-black/5 bg-white">
            <div className="border-b border-black/5 px-5 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-[oklch(0.42_0.03_250)] sm:px-8">
              First-year snapshot
            </div>
            <div className="divide-y divide-black/5">
              <div className="flex items-center justify-between gap-4 px-5 py-4 text-sm sm:px-8">
                <span>Website design and build (one-time)</span>
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
                <span className="text-2xl font-semibold tracking-tight tabular-nums">
                  $1,236
                </span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[oklch(0.38_0.03_250)]">
            First-year total is arithmetic from the published rates, not a
            discount or a guarantee of extra services. Additional work is quoted
            separately. Hosting is not month-to-month during the 12-month term.
          </p>
        </section>

        <section className="overflow-hidden bg-[oklch(0.18_0.05_255)] py-24 text-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
              How it works
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">
              Four steps from conversation to a live one-page website.
            </h2>
            <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <li key={step.n} className="bg-white/[0.04] p-7">
                  <p className="text-3xl font-semibold tracking-tight text-primary">
                    {step.n}
                  </p>
                  <h3 className="mt-5 font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
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
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.12] tracking-tight text-[oklch(0.22_0.05_250)] sm:text-5xl">
              Built for local service businesses that need a clear, professional
              website—not an enterprise build.
            </h2>
            <p className="mt-4 max-w-2xl text-[oklch(0.38_0.03_250)]">
              If customers still find you by word of mouth, a truck, or a paper
              card, a focused one-page website can make it easier to get called
              back. We do not promise leads or search rankings.
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

        <FounderSection />

        <section id="faq" className="bg-white py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[oklch(0.45_0.08_250)]">
              FAQ
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[oklch(0.22_0.05_250)]">
              Straight answers before you inquire.
            </h2>
            <Accordion className="mt-10 w-full">
              {faqs.map((item, index) => (
                <AccordionItem key={item.q} value={`faq-${index}`}>
                  <AccordionTrigger className="py-4 text-left text-base font-medium">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-[oklch(0.38_0.03_250)]">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section
          id="contact"
          className="relative overflow-hidden bg-[oklch(0.18_0.05_255)] py-24"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 size-[26rem] rounded-full bg-[oklch(0.88_0.155_128_/_0.16)] blur-3xl"
          />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="text-white">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
                Get started
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">
                Tell us about your business.
              </h2>
              <p className="mt-4 leading-relaxed text-white/80">
                Send a short inquiry. We’ll follow up to confirm fit, pricing,
                and timeline. No fake urgency, and no contract until you agree
                to the work.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-white/90">
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
              <p className="mt-8 text-sm leading-relaxed text-white/80">
                Hosting starts after launch, at $59/month with a 12-month
                commitment.
              </p>
              <p className="mt-4 text-sm text-white/80">
                Or email{" "}
                <a
                  className="text-primary underline-offset-4 hover:underline"
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-[0_40px_80px_-32px_black] sm:p-8">
              <InquiryForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
