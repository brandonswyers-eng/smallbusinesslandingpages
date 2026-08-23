import Link from "next/link";
import type { ReactNode } from "react";
import { Wordmark } from "@/components/site-frame";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function fieldClass() {
  return "h-11 w-full rounded-xl border border-input bg-white px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";
}

export function AppShell({
  area,
  title,
  children,
}: {
  area: "admin" | "dashboard";
  title: string;
  children: ReactNode;
}) {
  const links =
    area === "admin"
      ? [
          ["/", "Home"],
          ["/admin", "Pipeline"],
          ["/admin/new", "New client"],
          ["/admin/support", "Support"],
        ]
      : [
          ["/dashboard", "Overview"],
          ["/dashboard/project", "Project"],
          ["/dashboard/tasks", "Tasks"],
          ["/dashboard/agreements", "Agreements"],
          ["/dashboard/billing", "Billing"],
          ["/dashboard/support", "Support"],
          ["/dashboard/account", "Account"],
        ];
  return (
    <div className="min-h-full bg-[oklch(0.97_0.008_250)]">
      <header className="border-b border-[oklch(0.9_0.02_250)] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href={area === "admin" ? "/admin" : "/dashboard"}>
            <Wordmark />
          </Link>
          <div className="flex items-center gap-3">
            <p className="hidden text-sm text-[oklch(0.38_0.03_250)] sm:block">{title}</p>
            <form action="/api/auth/sign-out" method="post">
              <Button variant="outline" size="sm" type="submit">
                Sign out
              </Button>
            </form>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-3 py-1.5 text-sm text-[oklch(0.32_0.04_250)] hover:bg-[oklch(0.95_0.02_250)]"
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}

export function Panel({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-[oklch(0.9_0.02_250)] bg-white p-6 shadow-sm",
        className,
      )}
    >
      <h2 className="text-lg font-semibold text-[oklch(0.22_0.05_250)]">{title}</h2>
      {description ? (
        <p className="mt-1 text-sm text-[oklch(0.42_0.03_250)]">{description}</p>
      ) : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function StatusPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-[oklch(0.93_0.05_128)] px-3 py-1 text-xs font-semibold text-[oklch(0.32_0.06_150)]">
      {children}
    </span>
  );
}

export function SetupNotice() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24">
      <Wordmark />
      <h1 className="mt-6 text-3xl font-semibold text-[oklch(0.22_0.05_250)]">
        The client workspace is not connected yet.
      </h1>
      <p className="mt-4 text-[oklch(0.38_0.03_250)]">
        Add the Supabase, Stripe, and email values listed in docs/PLATFORM.md, then reload this
        page. Public pages on the marketing site stay available.
      </p>
    </div>
  );
}
