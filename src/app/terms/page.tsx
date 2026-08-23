import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms — smallbusinesslandingpages.com",
  description:
    "Terms for inquiring about a one-page website from smallbusinesslandingpages.com.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="flex min-h-full flex-col bg-[oklch(0.97_0.008_250)]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-28 pb-20 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight text-[oklch(0.22_0.05_250)]">
          Terms
        </h1>
        <p className="mt-4 text-sm text-[oklch(0.42_0.03_250)]">
          Last updated: 22 August 2026
        </p>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-[oklch(0.32_0.03_250)]">
          <p>
            {SITE_NAME} offers an inquiry-based one-page website service. Sending
            the form starts a conversation. It is not an order, a contract, or a
            reservation of a domain.
          </p>
          <p>
            Published prices describe the standard package: $399 one-time
            website design and build, $129 one-time domain registration and
            launch setup for a standard available domain (first-year
            registration in the customer’s business name, DNS, SSL, and launch
            connection), and $59 per month for hosting, maintenance, and
            support with a 12-month commitment. Work outside that package is
            quoted and only begins after you approve it.
          </p>
          <p>
            We do not guarantee leads, sales, or search-engine rankings. Basic
            search-engine setup means page title, description, and indexing
            basics.
          </p>
          <p>
            Domain availability, registry rules, and third-party email or
            hosting providers can affect launch timing. We will describe those
            constraints if they apply to your inquiry.
          </p>
          <p>
            These terms do not invent cancellation, refund, warranty, or
            limitation-of-liability language beyond what is stated here. Any
            paid engagement will be confirmed in writing before work starts.
          </p>
          <p>
            Questions:{" "}
            <a className="underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
