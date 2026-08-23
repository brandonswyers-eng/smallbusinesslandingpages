import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <span className="flex min-w-0 flex-col text-[10px] font-medium leading-[1.15] tracking-tight min-[360px]:text-[11px] sm:flex-row sm:items-baseline sm:text-sm">
      <span className={light ? "text-white" : "text-[oklch(0.22_0.05_250)]"}>
        smallbusiness
      </span>
      <span className={light ? "text-primary" : "text-[oklch(0.45_0.1_175)]"}>
        landingpages.com
      </span>
    </span>
  );
}

export function HeaderCta({
  mobile,
  desktop,
}: {
  mobile: string;
  desktop: string;
}) {
  return (
    <Link
      href="/#contact"
      className="inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-primary px-3 text-xs font-semibold tracking-tight text-primary-foreground shadow-[0_18px_40px_-18px_oklch(0.88_0.155_128)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:h-10 sm:px-4 sm:text-sm"
    >
      <span className="sm:hidden">{mobile}</span>
      <span className="hidden sm:inline">{desktop}</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 overflow-x-clip px-2 pt-2 sm:px-5">
      <div className="mx-auto flex h-12 max-w-6xl min-w-0 items-center gap-2 rounded-full border border-white/10 bg-[oklch(0.18_0.045_250_/_0.72)] px-2.5 text-white shadow-[0_10px_40px_-20px_black] backdrop-blur-xl sm:h-14 sm:gap-4 sm:px-4 sm:pl-5">
        <Link href="/#top" className="min-w-0 flex-1 overflow-hidden">
          <Wordmark light />
        </Link>
        <nav className="hidden items-center gap-6 text-[13px] text-white/70 md:flex">
          <Link href="/#work" className="transition hover:text-white">
            Work
          </Link>
          <Link href="/#why" className="transition hover:text-white">
            Why
          </Link>
          <Link href="/#pricing" className="transition hover:text-white">
            Pricing
          </Link>
          <Link href="/#faq" className="transition hover:text-white">
            FAQ
          </Link>
        </nav>
        <HeaderCta mobile="Get Started" desktop="Get My Website" />
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[oklch(0.14_0.04_255)] py-10 text-sm text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-white/80">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            className="underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>
          <Link
            className="underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            href="/privacy"
          >
            Privacy
          </Link>
          <Link
            className="underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            href="/terms"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
