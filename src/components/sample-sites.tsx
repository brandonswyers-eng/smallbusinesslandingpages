export function SampleSites() {
  return (
    <section id="work" className="bg-[oklch(0.97_0.008_250)] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[oklch(0.45_0.08_250)]">
          See what we build
        </p>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.12] tracking-tight text-[oklch(0.22_0.05_250)] sm:text-5xl">
          Sample one-page websites for local service businesses.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[oklch(0.38_0.03_250)]">
          These are original concept mockups—not live client sites. They show
          the kind of clear, mobile-friendly layout we design and launch.
        </p>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <BrowserMock
            url="ridgewayauto.example"
            title="Ridgeway Auto Care"
            kicker="Mechanic"
            accent="oklch(0.72_0.14_55)"
            services={["Diagnostics", "Brakes", "Oil & filters"]}
          />
          <BrowserMock
            url="harborandbeam.example"
            title="Harbor & Beam"
            kicker="Contractor"
            accent="oklch(0.55_0.08_70)"
            services={["Kitchens", "Decks", "Repairs"]}
          />
          <PhoneMock />
        </div>
      </div>
    </section>
  );
}

function BrowserMock({
  url,
  title,
  kicker,
  accent,
  services,
}: {
  url: string;
  title: string;
  kicker: string;
  accent: string;
  services: string[];
}) {
  return (
    <article className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_24px_60px_-36px_oklch(0.22_0.05_250)]">
      <div className="flex items-center gap-2 border-b border-black/5 bg-[oklch(0.96_0.008_250)] px-3 py-2.5">
        <span className="size-2 rounded-full bg-[oklch(0.75_0.08_20)]" />
        <span className="size-2 rounded-full bg-[oklch(0.82_0.12_90)]" />
        <span className="size-2 rounded-full bg-[oklch(0.78_0.12_145)]" />
        <span className="ml-2 min-w-0 truncate rounded-full bg-white px-3 py-0.5 text-[10px] text-muted-foreground">
          {url}
        </span>
      </div>
      <div className="bg-[oklch(0.18_0.05_255)] p-5 text-white">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-primary">
          {kicker}
        </p>
        <p className="mt-2 text-xl font-semibold tracking-tight">{title}</p>
        <p className="mt-1 text-xs text-white/60">Open today · Call now</p>
        <div
          className="mt-4 h-16 rounded-2xl"
          style={{ background: accent, opacity: 0.85 }}
        />
        <div className="mt-4 grid grid-cols-3 gap-2">
          {services.map((service) => (
            <div
              key={service}
              className="rounded-xl bg-white/8 px-2 py-3 text-center text-[10px] font-medium text-white/80"
            >
              {service}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function PhoneMock() {
  return (
    <article className="overflow-hidden rounded-3xl border border-black/5 bg-white p-5 shadow-[0_24px_60px_-36px_oklch(0.22_0.05_250)]">
      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[oklch(0.45_0.08_250)]">
        Salon
      </p>
      <p className="mt-2 text-xl font-semibold tracking-tight text-[oklch(0.22_0.05_250)]">
        Lumen Studio
      </p>
      <div className="mx-auto mt-5 w-[180px] rounded-[2rem] border border-black/10 bg-[oklch(0.16_0.04_255)] p-2 shadow-inner">
        <div className="mx-auto mb-2 h-4 w-16 rounded-full bg-black/40" />
        <div className="rounded-[1.4rem] bg-[oklch(0.22_0.05_255)] p-3 text-white">
          <p className="text-[9px] uppercase tracking-[0.18em] text-primary">
            Appointments
          </p>
          <p className="mt-1 text-sm font-semibold">Cut · Color · Care</p>
          <div className="mt-3 space-y-1.5">
            <div className="h-8 rounded-lg bg-white/10" />
            <div className="h-8 rounded-lg bg-white/10" />
            <div className="h-8 rounded-full bg-primary" />
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-xs leading-relaxed text-[oklch(0.38_0.03_250)]">
        Phone-first concept: hours, services, and a tap-to-book prompt.
      </p>
    </article>
  );
}
