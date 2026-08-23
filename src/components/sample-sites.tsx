"use client";

import { useEffect, useState } from "react";

const SAMPLES = [
  {
    src: "/samples/ridgeway.jpg",
    name: "Ridgeway Auto Care",
    alt: "Finished one-page website concept for Ridgeway Auto Care, an auto repair shop.",
  },
  {
    src: "/samples/harbor.jpg",
    name: "Harbor & Beam",
    alt: "Finished one-page website concept for Harbor & Beam, a carpentry contractor.",
  },
  {
    src: "/samples/lumen.jpg",
    name: "Lumen Studio",
    alt: "Finished one-page website concept for Lumen Studio, a hair salon.",
  },
  {
    src: "/samples/maple.jpg",
    name: "Maple & Moss",
    alt: "Finished one-page website concept for Maple & Moss landscaping.",
  },
  {
    src: "/samples/brightpath.jpg",
    name: "BrightPath Dental",
    alt: "Finished one-page website concept for BrightPath Dental.",
  },
  {
    src: "/samples/kettle.jpg",
    name: "The Copper Kettle",
    alt: "Finished one-page website concept for The Copper Kettle cafe.",
  },
  {
    src: "/samples/northline.jpg",
    name: "Northline Plumbing",
    alt: "Finished one-page website concept for Northline Plumbing.",
  },
  {
    src: "/samples/velvet.jpg",
    name: "Velvet Room",
    alt: "Finished one-page website concept for Velvet Room barbershop.",
  },
  {
    src: "/samples/pine.jpg",
    name: "Pine Street Cleaning",
    alt: "Finished one-page website concept for Pine Street Cleaning.",
  },
  {
    src: "/samples/redbarn.jpg",
    name: "Red Barn BBQ",
    alt: "Finished one-page website concept for Red Barn BBQ.",
  },
  {
    src: "/samples/coastal.jpg",
    name: "Coastal Pets",
    alt: "Finished one-page website concept for Coastal Pets grooming.",
  },
  {
    src: "/samples/ironclad.jpg",
    name: "Ironclad Welding",
    alt: "Finished one-page website concept for Ironclad Welding.",
  },
  {
    src: "/samples/bloom.jpg",
    name: "Bloom & Stem",
    alt: "Finished one-page website concept for Bloom & Stem florist.",
  },
  {
    src: "/samples/summit.jpg",
    name: "Summit HVAC",
    alt: "Finished one-page website concept for Summit HVAC.",
  },
  {
    src: "/samples/oakember.jpg",
    name: "Oak & Ember",
    alt: "Finished one-page website concept for Oak & Ember bakery.",
  },
] as const;

export function SampleSites() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const images = SAMPLES.map(
      (sample) =>
        new Promise<void>((resolve) => {
          const image = new window.Image();
          image.onload = () => resolve();
          image.onerror = () => resolve();
          image.src = sample.src;
        }),
    );
    void Promise.all(images).then(() => {
      if (!cancelled) {
        setReady(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

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
          A look at the kind of finished one-page websites we design and launch
          for local businesses—specific to the trade, easy for customers to
          use, and built to go live.
        </p>
      </div>
      <div className="group mt-12 overflow-hidden border-y border-black/5 py-8">
        <div
          className={`flex w-max motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:animate-none ${
            ready
              ? "animate-portfolio-reel group-hover:[animation-play-state:paused]"
              : ""
          }`}
        >
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
      {SAMPLES.map((sample, index) => (
        <figure
          key={`${sample.src}${duplicate ? "-loop" : ""}`}
          className="w-[280px] shrink-0 sm:w-[300px]"
        >
          <div className="h-[430px] overflow-hidden rounded-xl border border-black/10 bg-[oklch(0.90_0.01_250)] shadow-[0_24px_50px_-28px_rgba(0,0,0,0.45)]">
            {/* Native img: Next Image lazy-load + optimizer made the reel flash white. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sample.src}
              alt={duplicate ? "" : sample.alt}
              width={720}
              height={1080}
              loading={index < 4 && !duplicate ? "eager" : "lazy"}
              fetchPriority={index < 2 && !duplicate ? "high" : "low"}
              decoding="async"
              draggable={false}
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
