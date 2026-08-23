import Image from "next/image";

const SAMPLES = [
  {
    src: "/samples/ridgeway.png",
    name: "Ridgeway Auto Care",
    alt: "Finished one-page website concept for Ridgeway Auto Care, an auto repair shop.",
  },
  {
    src: "/samples/harbor.png",
    name: "Harbor & Beam",
    alt: "Finished one-page website concept for Harbor & Beam, a carpentry contractor.",
  },
  {
    src: "/samples/lumen.png",
    name: "Lumen Studio",
    alt: "Finished one-page website concept for Lumen Studio, a hair salon.",
  },
  {
    src: "/samples/maple.png",
    name: "Maple & Moss",
    alt: "Finished one-page website concept for Maple & Moss landscaping.",
  },
  {
    src: "/samples/brightpath.png",
    name: "BrightPath Dental",
    alt: "Finished one-page website concept for BrightPath Dental.",
  },
  {
    src: "/samples/kettle.png",
    name: "The Copper Kettle",
    alt: "Finished one-page website concept for The Copper Kettle cafe.",
  },
  {
    src: "/samples/northline.png",
    name: "Northline Plumbing",
    alt: "Finished one-page website concept for Northline Plumbing.",
  },
  {
    src: "/samples/velvet.png",
    name: "Velvet Room",
    alt: "Finished one-page website concept for Velvet Room barbershop.",
  },
  {
    src: "/samples/pine.png",
    name: "Pine Street Cleaning",
    alt: "Finished one-page website concept for Pine Street Cleaning.",
  },
  {
    src: "/samples/redbarn.png",
    name: "Red Barn BBQ",
    alt: "Finished one-page website concept for Red Barn BBQ.",
  },
  {
    src: "/samples/coastal.png",
    name: "Coastal Pets",
    alt: "Finished one-page website concept for Coastal Pets grooming.",
  },
  {
    src: "/samples/ironclad.png",
    name: "Ironclad Welding",
    alt: "Finished one-page website concept for Ironclad Welding.",
  },
  {
    src: "/samples/bloom.png",
    name: "Bloom & Stem",
    alt: "Finished one-page website concept for Bloom & Stem florist.",
  },
  {
    src: "/samples/summit.png",
    name: "Summit HVAC",
    alt: "Finished one-page website concept for Summit HVAC.",
  },
  {
    src: "/samples/oakember.png",
    name: "Oak & Ember",
    alt: "Finished one-page website concept for Oak & Ember bakery.",
  },
] as const;

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
          Concept sites that show the kind of finished one-page websites we
          design and launch. They are original samples, not live client
          properties.
        </p>
      </div>
      <div className="group mt-12 overflow-hidden border-y border-black/5 py-8">
        <div className="animate-portfolio-reel flex w-max group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:animate-none">
          <SampleRow />
          <div className="motion-reduce:hidden" aria-hidden>
            <SampleRow duplicate />
          </div>
        </div>
      </div>
    </section>
  );
}

function SampleRow({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="flex gap-5 pr-5">
      {SAMPLES.map((sample) => (
        <figure key={`${sample.src}${duplicate ? "-loop" : ""}`} className="w-[280px] shrink-0 sm:w-[300px]">
          <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_24px_50px_-28px_rgba(0,0,0,0.45)]">
            <Image
              src={sample.src}
              alt={sample.alt}
              width={720}
              height={1080}
              className="h-[430px] w-full object-cover object-top"
            />
          </div>
          <figcaption className="mt-2 text-center text-sm font-medium text-[oklch(0.32_0.03_250)]">
            {sample.name}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
