import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site-frame";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy — smallbusinesslandingpages.com",
  description: "How smallbusinesslandingpages.com handles inquiry information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-full flex-col bg-[oklch(0.97_0.008_250)]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-28 pb-20 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight text-[oklch(0.22_0.05_250)]">
          Privacy
        </h1>
        <p className="mt-4 text-sm text-[oklch(0.42_0.03_250)]">
          Last updated: 22 August 2026
        </p>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-[oklch(0.32_0.03_250)]">
          <p>
            {SITE_NAME} is an inquiry-based service for one-page websites. This
            page describes how we use information you send through the website
            form or by email. It is not a comprehensive privacy policy for
            unrelated products, advertising networks, or payment processors we
            do not currently operate on this site.
          </p>
          <p>
            If you submit the inquiry form, we collect the name, business name,
            email, phone number, and business type you provide. We use that
            information to respond to your inquiry and to discuss whether the
            standard package is a fit. We do not sell inquiry information.
          </p>
          <p>
            Submissions are emailed to our team using an email delivery
            provider. Message content may be stored in that email inbox. We do
            not use the form to create a public directory of businesses.
          </p>
          <p>
            This website may log technical data typical of hosting (such as IP
            address and request time) as part of operating and securing the
            site.
          </p>
          <p>
            Questions about this notice can be sent to{" "}
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
