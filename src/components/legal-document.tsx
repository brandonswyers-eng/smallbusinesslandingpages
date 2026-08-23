import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-frame";

export function LegalDocument({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col bg-[oklch(0.97_0.008_250)]">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-28 pb-20 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight text-[oklch(0.22_0.05_250)]">
          {title}
        </h1>
        <p className="mt-4 text-sm text-[oklch(0.42_0.03_250)]">
          Last updated: {updated}
        </p>
        <div className="legal-prose mt-8 space-y-4 text-base leading-relaxed text-[oklch(0.32_0.03_250)] [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[oklch(0.22_0.05_250)] [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[oklch(0.22_0.05_250)] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_a]:underline [&_a]:underline-offset-4">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
