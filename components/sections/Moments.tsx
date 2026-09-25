"use client";

import Image from "next/image";
import { VelocityMarquee } from "@/components/animation/Marquee";
import { SplitReveal } from "@/components/animation/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { img } from "@/data/images";

const rowA = [
  { src: img.weddingCelebration, label: "Wedding" },
  { src: img.concertOrange, label: "Live" },
  { src: img.holi, label: "Cultural" },
  { src: img.auditorium, label: "Corporate" },
  { src: img.balloons, label: "Birthday" },
  { src: img.stageBeams, label: "Production" },
];
const rowB = [
  { src: img.rings, label: "Engagement" },
  { src: img.cheering, label: "College" },
  { src: img.toast, label: "Reception" },
  { src: img.fireworks, label: "Festival" },
  { src: img.sparklers, label: "Celebration" },
  { src: img.mixingDesk, label: "Sound" },
];

/** Two photo rails sliding in opposite directions; both lean with scroll speed. */
export function Moments() {
  return (
    <section className="overflow-hidden bg-ink py-24 sm:py-32" aria-labelledby="moments-heading">
      <div className="mx-auto mb-14 flex max-w-[1600px] flex-col justify-between gap-6 px-5 sm:px-8 md:flex-row md:items-end">
        <div>
          <SectionLabel>Moments</SectionLabel>
          <h2 id="moments-heading" className="sr-only">
            Moments we made
          </h2>
          <SplitReveal lines={["Moments", "we made."]} accentLine={1} className="display mt-6 text-[clamp(2.6rem,6.5vw,6.5rem)]" />
        </div>
        <p className="max-w-sm text-pretty text-bone/70">
          Every kind of celebration, from the first ritual to the last song. Scroll faster — the moments lean in.
        </p>
      </div>

      <div className="space-y-4">
        <VelocityMarquee baseVelocity={-1.6} skew>
          {rowA.map((m) => (
            <Tile key={m.label} {...m} />
          ))}
        </VelocityMarquee>
        <VelocityMarquee baseVelocity={1.6} skew>
          {rowB.map((m) => (
            <Tile key={m.label} {...m} tall />
          ))}
        </VelocityMarquee>
      </div>
    </section>
  );
}

function Tile({ src, label, tall }: { src: string; label: string; tall?: boolean }) {
  return (
    <figure
      className={`group relative mx-2 shrink-0 overflow-hidden rounded-3xl ${
        tall ? "h-[34vw] max-h-[380px] min-h-[220px] w-[26vw] min-w-[170px] max-w-[300px]" : "h-[26vw] max-h-[300px] min-h-[170px] w-[36vw] min-w-[240px] max-w-[440px]"
      }`}
    >
      <Image src={src} alt={`${label} event`} fill sizes="(min-width: 1024px) 30vw, 60vw" className="object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-110" />
      <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
      <figcaption className="nav-link absolute bottom-4 left-4 rounded-full bg-ink/60 px-3 py-1.5 !text-[0.6rem]">{label}</figcaption>
    </figure>
  );
}
