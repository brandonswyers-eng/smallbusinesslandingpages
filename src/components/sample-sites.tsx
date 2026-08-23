import type { ReactNode } from "react";

const SAMPLES: { key: string; node: ReactNode }[] = [
  { key: "ridgeway", node: <RidgewayAuto /> },
  { key: "harbor", node: <HarborBeam /> },
  { key: "lumen", node: <LumenStudio /> },
  { key: "maple", node: <MapleMoss /> },
  { key: "brightpath", node: <BrightPathDental /> },
  { key: "kettle", node: <CopperKettle /> },
  { key: "northline", node: <NorthlinePlumbing /> },
  { key: "velvet", node: <VelvetRoom /> },
  { key: "pine", node: <PineStreetCleaning /> },
  { key: "redbarn", node: <RedBarnBbq /> },
  { key: "coastal", node: <CoastalPets /> },
  { key: "ironclad", node: <IroncladWelding /> },
  { key: "bloom", node: <BloomStem /> },
  { key: "summit", node: <SummitHvac /> },
  { key: "oakember", node: <OakEmberBakery /> },
];

export function SampleSites() {
  return (
    <section id="work" className="overflow-x-clip bg-[oklch(0.97_0.008_250)] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[oklch(0.45_0.08_250)]">
          See what we build
        </p>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.12] tracking-tight text-[oklch(0.22_0.05_250)] sm:text-5xl">
          Sample one-page websites for local service businesses.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[oklch(0.38_0.03_250)]">
          Fifteen original concepts—not live client sites. Each uses its own
          layout and colors so you can see the kind of one-page websites we
          design, rather than a restyle of this page.
        </p>
      </div>
      <div className="group mt-12 overflow-hidden border-y border-black/5 py-8">
        <div className="animate-portfolio-reel flex w-max group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:animate-none">
          <div className="flex gap-5 pr-5">
            {SAMPLES.map((sample) => (
              <div key={sample.key} className="w-[272px] shrink-0">
                {sample.node}
              </div>
            ))}
          </div>
          <div className="flex gap-5 pr-5 motion-reduce:hidden" aria-hidden>
            {SAMPLES.map((sample) => (
              <div key={`${sample.key}-loop`} className="w-[272px] shrink-0">
                {sample.node}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Chrome({
  url,
  children,
  bar = "#ece8e1",
}: {
  url: string;
  children: ReactNode;
  bar?: string;
}) {
  return (
    <article className="h-[420px] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]">
      <div
        className="flex items-center gap-1.5 px-3 py-2"
        style={{ background: bar }}
      >
        <span className="size-1.5 rounded-full bg-[#d96b5c]" />
        <span className="size-1.5 rounded-full bg-[#e0b45a]" />
        <span className="size-1.5 rounded-full bg-[#7eb56a]" />
        <span className="ml-1 min-w-0 flex-1 truncate rounded-sm bg-white/80 px-2 py-0.5 text-[9px] text-neutral-500">
          {url}
        </span>
      </div>
      {children}
    </article>
  );
}

function RidgewayAuto() {
  return (
    <Chrome url="ridgewayauto.example" bar="#2a2a2a">
      <div
        className="flex h-[calc(100%-36px)] flex-col"
        style={{ background: "#1c1917", color: "#f4e6d4", fontFamily: "ui-sans-serif, system-ui" }}
      >
        <div className="px-4 pt-4">
          <p className="text-[9px] tracking-[0.28em] text-[#c45c26]">EST. 1998</p>
          <p className="mt-1 text-lg font-black uppercase leading-tight tracking-tight">
            Ridgeway
            <br />
            Auto Care
          </p>
          <p className="mt-2 text-[10px] text-[#d6c4b0]">
            Diagnostics · brakes · fleet service
          </p>
        </div>
        <div className="mt-3 h-16 bg-[#c45c26]" />
        <div className="mt-auto grid grid-cols-2 gap-px bg-[#3f3a36] text-center text-[9px] font-semibold uppercase tracking-wide">
          <div className="bg-[#292524] py-3">Book bay</div>
          <div className="bg-[#c45c26] py-3 text-[#1c1917]">Call shop</div>
        </div>
      </div>
    </Chrome>
  );
}

function HarborBeam() {
  return (
    <Chrome url="harborandbeam.example" bar="#efe6d9">
      <div
        className="flex h-[calc(100%-36px)]"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        <div className="w-[38%] bg-[#5c4033] p-3 text-[#f3e6d4]">
          <p className="text-[8px] tracking-[0.2em]">BUILD</p>
          <p className="mt-8 text-[11px] leading-snug">Kitchens</p>
          <p className="text-[11px] leading-snug">Decks</p>
          <p className="text-[11px] leading-snug">Repairs</p>
        </div>
        <div className="flex-1 bg-[#f7f0e6] p-4 text-[#3d2b22]">
          <p className="text-xl leading-none">Harbor</p>
          <p className="text-xl italic leading-none">&amp; Beam</p>
          <p className="mt-3 text-[10px] leading-relaxed text-[#6b5346]">
            Finish carpentry on the coast. Licensed, insured, one crew.
          </p>
          <div className="mt-4 inline-block bg-[#3d2b22] px-3 py-1.5 text-[9px] tracking-wide text-[#f7f0e6]">
            Request a walkthrough
          </div>
        </div>
      </div>
    </Chrome>
  );
}

function LumenStudio() {
  return (
    <Chrome url="lumenstudio.example" bar="#f6ecec">
      <div
        className="flex h-[calc(100%-36px)] flex-col items-center bg-[#faf6f3] px-4 pt-6 text-center"
        style={{ color: "#4a3034", fontFamily: "Palatino, Georgia, serif" }}
      >
        <p className="text-[8px] tracking-[0.35em] text-[#b76e79]">SALON</p>
        <p className="mt-2 text-2xl font-light tracking-wide">Lumen</p>
        <div className="my-3 h-px w-10 bg-[#d9b8bd]" />
        <p className="text-[10px] italic text-[#7a5a60]">Cut · Color · Care</p>
        <div className="mt-5 w-full rounded-full bg-[#e8c4c8] py-6" />
        <div className="mt-auto mb-4 w-full rounded-full border border-[#4a3034] py-2 text-[9px] tracking-[0.16em]">
          Book a chair
        </div>
      </div>
    </Chrome>
  );
}

function MapleMoss() {
  return (
    <Chrome url="mapleandmoss.example" bar="#e4eee4">
      <div className="flex h-[calc(100%-36px)] flex-col" style={{ fontFamily: "ui-serif, Georgia, serif" }}>
        <div className="h-24 bg-[#2f4f3e]" />
        <div className="flex-1 bg-[#f4f1e8] px-4 py-3 text-[#24362c]">
          <p className="text-[9px] uppercase tracking-[0.2em] text-[#5d7a62]">
            Landscape
          </p>
          <p className="text-lg leading-tight">Maple &amp; Moss</p>
          <p className="mt-1 text-[10px] text-[#4d6354]">
            Lawns, planting beds, and seasonal cleanup.
          </p>
          <div className="mt-3 flex gap-1.5">
            {["Mow", "Mulch", "Prune"].map((item) => (
              <span
                key={item}
                className="rounded-sm bg-[#dce8dc] px-2 py-1 text-[8px]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Chrome>
  );
}

function BrightPathDental() {
  return (
    <Chrome url="brightpathdental.example" bar="#e8f4f2">
      <div
        className="flex h-[calc(100%-36px)] flex-col bg-white"
        style={{ fontFamily: "ui-sans-serif, system-ui", color: "#1f4e48" }}
      >
        <div className="flex items-center justify-between px-4 py-2 text-[8px] text-[#2a9d8f]">
          <span>BrightPath</span>
          <span>New patients</span>
        </div>
        <div className="flex-1 bg-[#e8f6f3] px-4 py-5">
          <p className="text-2xl font-semibold leading-none tracking-tight">
            Calm,
            <br />
            clear care.
          </p>
          <p className="mt-2 text-[10px] text-[#3d6e68]">
            Cleanings, fillings, and family dentistry.
          </p>
        </div>
        <div className="bg-[#2a9d8f] px-4 py-3 text-center text-[10px] font-semibold text-white">
          Schedule a visit
        </div>
      </div>
    </Chrome>
  );
}

function CopperKettle() {
  return (
    <Chrome url="copperkettlecafe.example" bar="#f3e4d4">
      <div
        className="flex h-[calc(100%-36px)] flex-col bg-[#f8efe4] px-4 py-4"
        style={{ color: "#5c2e1f", fontFamily: "Georgia, serif" }}
      >
        <p className="text-center text-[8px] tracking-[0.3em]">CAFE</p>
        <p className="text-center text-xl">The Copper Kettle</p>
        <div className="mx-auto my-2 h-8 w-8 rounded-full bg-[#c46b3a]" />
        <div className="mt-2 space-y-1 border-y border-[#e2cbb6] py-2 text-[10px]">
          <div className="flex justify-between">
            <span>Drip</span>
            <span>3</span>
          </div>
          <div className="flex justify-between">
            <span>Biscuit</span>
            <span>4</span>
          </div>
          <div className="flex justify-between">
            <span>Pie slice</span>
            <span>6</span>
          </div>
        </div>
        <p className="mt-auto text-center text-[9px] text-[#8a5a42]">
          Open 7–2 · Counter service
        </p>
      </div>
    </Chrome>
  );
}

function NorthlinePlumbing() {
  return (
    <Chrome url="northlineplumbing.example" bar="#f2f2f0">
      <div
        className="flex h-[calc(100%-36px)] flex-col"
        style={{ fontFamily: "Arial Narrow, Arial, sans-serif" }}
      >
        <div className="bg-[#f5c518] px-4 py-3 text-[#1a1a1a]">
          <p className="text-[8px] font-bold uppercase tracking-widest">
            24/7 emergency
          </p>
          <p className="text-lg font-black uppercase leading-none">Northline</p>
          <p className="text-sm font-bold uppercase">Plumbing</p>
        </div>
        <div className="flex-1 bg-[#efefef] p-4 text-[11px] text-[#333]">
          <p>Leaks · water heaters · clogged lines</p>
          <p className="mt-2 text-[10px] text-[#666]">Same-day when available.</p>
        </div>
        <div className="bg-[#1a1a1a] py-2.5 text-center text-[10px] font-bold uppercase tracking-wide text-[#f5c518]">
          Call the van
        </div>
      </div>
    </Chrome>
  );
}

function VelvetRoom() {
  return (
    <Chrome url="velvetroombarber.example" bar="#2b1218">
      <div
        className="flex h-[calc(100%-36px)] flex-col items-center justify-between bg-[#1a0d11] px-4 py-5 text-center"
        style={{ color: "#e8d5a3", fontFamily: "Georgia, serif" }}
      >
        <p className="text-[8px] tracking-[0.4em] text-[#c9a227]">BARBER</p>
        <div>
          <p className="text-2xl">Velvet</p>
          <p className="text-lg italic">Room</p>
        </div>
        <p className="text-[10px] text-[#b9a07a]">Fades · shaves · beard</p>
        <div className="w-full border border-[#c9a227] py-2 text-[9px] tracking-[0.2em]">
          Reserve a chair
        </div>
      </div>
    </Chrome>
  );
}

function PineStreetCleaning() {
  return (
    <Chrome url="pinestreetclean.example" bar="#eef6f2">
      <div
        className="flex h-[calc(100%-36px)] flex-col bg-[#f7fbf9] p-4"
        style={{ color: "#2c4a40", fontFamily: "ui-sans-serif, system-ui" }}
      >
        <p className="text-[9px] font-medium text-[#3d9b7a]">Residential</p>
        <p className="text-lg font-semibold leading-tight">Pine Street Cleaning</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-[#d4efe4] p-3 text-[9px]">Weekly</div>
          <div className="rounded-xl bg-[#c5e6d8] p-3 text-[9px]">Move-out</div>
          <div className="col-span-2 rounded-xl bg-[#3d9b7a] p-3 text-[9px] text-white">
            Get a same-week quote
          </div>
        </div>
        <p className="mt-auto text-[9px] text-[#5a7a6e]">Supplies included.</p>
      </div>
    </Chrome>
  );
}

function RedBarnBbq() {
  return (
    <Chrome url="redbarnbbq.example" bar="#f6ead8">
      <div
        className="flex h-[calc(100%-36px)] flex-col bg-[#f4e4c8]"
        style={{ fontFamily: "Georgia, serif", color: "#3b1f14" }}
      >
        <div className="bg-[#9b2226] px-4 py-4 text-[#f4e4c8]">
          <p className="text-center text-[8px] tracking-[0.25em]">SMOKEHOUSE</p>
          <p className="text-center text-2xl leading-none">Red Barn</p>
        </div>
        <div className="space-y-1 px-4 py-3 text-[11px]">
          <p>Brisket plate</p>
          <p>Pulled pork</p>
          <p>Banana pudding</p>
        </div>
        <p className="mt-auto bg-[#3b1f14] py-2 text-center text-[9px] text-[#f4e4c8]">
          Hours · 11 to sold out
        </p>
      </div>
    </Chrome>
  );
}

function CoastalPets() {
  return (
    <Chrome url="coastalpets.example" bar="#e7f0f3">
      <div
        className="flex h-[calc(100%-36px)] flex-col bg-[#f3f7f4] p-4"
        style={{ fontFamily: "ui-rounded, ui-sans-serif, system-ui", color: "#2f5d62" }}
      >
        <p className="text-[8px] tracking-[0.2em] text-[#4aa0a8]">GROOMING</p>
        <p className="text-xl font-semibold">Coastal Pets</p>
        <p className="mt-1 text-[10px] text-[#5e7d80]">Bath, trim, and nail care by the water.</p>
        <div className="mt-4 flex-1 rounded-[2rem] bg-[#d5eef0] p-3">
          <div className="rounded-2xl bg-white p-3 text-center text-[9px]">
            Tap to book a bath
          </div>
        </div>
      </div>
    </Chrome>
  );
}

function IroncladWelding() {
  return (
    <Chrome url="ironcladweld.example" bar="#111">
      <div
        className="flex h-[calc(100%-36px)] flex-col bg-black p-4"
        style={{ fontFamily: "ui-monospace, Menlo, monospace", color: "#ffb703" }}
      >
        <p className="text-[8px] text-[#8a8a8a]">FABRICATION</p>
        <p className="mt-1 text-lg font-bold uppercase leading-none text-white">
          Ironclad
        </p>
        <p className="text-sm uppercase text-[#ffb703]">Welding</p>
        <div className="mt-4 h-20 bg-gradient-to-br from-[#3d2b00] to-[#111]" />
        <p className="mt-3 text-[9px] leading-relaxed text-[#bbb]">
          Gates, rails, and repair. Shop &amp; mobile.
        </p>
        <p className="mt-auto text-[9px] uppercase tracking-widest">Get a fab quote →</p>
      </div>
    </Chrome>
  );
}

function BloomStem() {
  return (
    <Chrome url="bloomandstem.example" bar="#f3ebe8">
      <div
        className="flex h-[calc(100%-36px)] flex-col bg-[#f8f1ee] p-4"
        style={{ fontFamily: "Palatino, Georgia, serif", color: "#5c3d4a" }}
      >
        <p className="text-center text-[8px] tracking-[0.28em] text-[#7d9b7a]">
          FLORIST
        </p>
        <p className="text-center text-2xl font-light">Bloom &amp; Stem</p>
        <div className="mx-auto mt-3 grid grid-cols-3 gap-1.5">
          <div className="h-14 rounded-full bg-[#e3b7c2]" />
          <div className="h-14 rounded-full bg-[#c9d4b8]" />
          <div className="h-14 rounded-full bg-[#ead7a8]" />
        </div>
        <p className="mt-3 text-center text-[10px]">Weddings · weekly bunches</p>
        <div className="mt-auto rounded-sm bg-[#5c3d4a] py-2 text-center text-[9px] text-[#f8f1ee]">
          Order flowers
        </div>
      </div>
    </Chrome>
  );
}

function SummitHvac() {
  return (
    <Chrome url="summithvac.example" bar="#e6eaef">
      <div
        className="flex h-[calc(100%-36px)] flex-col bg-[#eef1f4]"
        style={{ fontFamily: "ui-sans-serif, system-ui", color: "#2c333a" }}
      >
        <div className="flex items-center justify-between bg-white px-4 py-2 text-[9px] font-semibold">
          <span>SUMMIT HVAC</span>
          <span className="bg-[#e85d04] px-2 py-0.5 text-white">Cooling</span>
        </div>
        <div className="flex-1 px-4 py-4">
          <p className="text-xl font-semibold leading-tight">
            Heat &amp; air that just works.
          </p>
          <p className="mt-2 text-[10px] text-[#5a6570]">
            Tune-ups, installs, and no-surprise service calls.
          </p>
        </div>
        <div className="grid grid-cols-2 text-center text-[9px] font-semibold">
          <div className="bg-[#2c333a] py-3 text-white">Service</div>
          <div className="bg-[#e85d04] py-3 text-white">Install</div>
        </div>
      </div>
    </Chrome>
  );
}

function OakEmberBakery() {
  return (
    <Chrome url="oakandember.example" bar="#efe4d0">
      <div
        className="flex h-[calc(100%-36px)] flex-col bg-[#f6edd8] px-4 py-4"
        style={{ fontFamily: "Georgia, serif", color: "#4a341c" }}
      >
        <p className="text-[8px] tracking-[0.3em]">BAKERY</p>
        <p className="text-2xl leading-none">Oak &amp; Ember</p>
        <p className="mt-1 text-[10px] italic text-[#7a5c38]">
          Sourdough, morning buns, Saturday focaccia.
        </p>
        <div className="mt-4 h-16 rounded-md bg-[#d4a373]" />
        <div className="mt-auto flex items-end justify-between text-[9px]">
          <span>Fri–Sun</span>
          <span className="underline">See the case</span>
        </div>
      </div>
    </Chrome>
  );
}
