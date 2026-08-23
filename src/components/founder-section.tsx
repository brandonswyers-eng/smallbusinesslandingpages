import { FOUNDER, SHOW_FOUNDER_SECTION } from "@/lib/site";

export function FounderSection() {
  if (!SHOW_FOUNDER_SECTION) {
    return null;
  }

  if (!FOUNDER.name || !FOUNDER.intro) {
    return null;
  }

  return (
    <section id="founder" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[oklch(0.45_0.08_250)]">
        Who you’ll work with
      </p>
      <div className="mt-8 grid items-center gap-8 rounded-3xl border border-black/5 bg-white p-8 shadow-[0_24px_60px_-36px_oklch(0.22_0.05_250)] md:grid-cols-[200px_1fr]">
        <div className="aspect-square rounded-2xl bg-[oklch(0.94_0.02_247)]" />
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-[oklch(0.22_0.05_250)]">
            {FOUNDER.name}
          </h2>
          {FOUNDER.location ? (
            <p className="mt-1 text-sm text-muted-foreground">{FOUNDER.location}</p>
          ) : null}
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[oklch(0.38_0.03_250)]">
            {FOUNDER.intro}
          </p>
        </div>
      </div>
    </section>
  );
}
