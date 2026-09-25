"use client";

import Image from "next/image";
import { motion, useScroll, type MotionValue } from "motion/react";
import { useRef } from "react";
import { whyUs, venueTypes } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/animation/Reveal";
import { useScrub } from "@/lib/motion";

/**
 * "Why Maitreya" — cards pin one after another and stack; earlier cards settle back
 * (scale down, dim) as the next slides over them.
 */
export function WhyStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="relative bg-ink py-24 sm:py-32" aria-labelledby="why-heading">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel index="08">Why Maitreya</SectionLabel>
            <h2 id="why-heading" className="sr-only">
              Why Maitreya Events
            </h2>
            <SplitReveal lines={["Why families", "and brands", "choose us."]} accentLine={2} className="display mt-6 text-[clamp(2.6rem,6.5vw,6.5rem)]" />
          </div>
          <p className="max-w-md text-pretty text-bone/70 md:col-span-4 md:col-start-9">
            Five promises that shape every event we take on — from an intimate family function to a packed concert ground.
          </p>
        </div>

        <div ref={ref} className="relative mt-16">
          {whyUs.map((w, i) => (
            <Card key={w.title} index={i} total={whyUs.length} progress={scrollYProgress} {...w} />
          ))}
        </div>

        {/* Where we produce */}
        <div className="mt-24">
          <p className="nav-link text-muted">Where we produce</p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {venueTypes.map((v, i) => (
              <motion.li
                key={v}
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-full border border-bone/15 px-5 py-2.5 text-sm transition-colors duration-300 hover:border-marigold hover:bg-marigold hover:text-ink"
              >
                {v}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Card({
  index,
  total,
  progress,
  kicker,
  title,
  body,
  image,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  kicker: string;
  title: string;
  body: string;
  image: string;
}) {
  // Once this card is covered by the following ones, ease it back
  const start = (index + 1) / total;
  const scale = useScrub(progress, [start - 0.05, 1], [1, 1 - (total - index - 1) * 0.04]);
  const dim = useScrub(progress, [start - 0.05, Math.min(1, start + 0.2)], [0, 0.55]);
  const last = index === total - 1;

  return (
    <div className="sticky mb-8" style={{ top: `calc(6.5rem + ${index * 1.4}rem)`, height: last ? "auto" : undefined }}>
      <motion.article
        style={{ scale }}
        className="relative grid min-h-[58vh] origin-top overflow-hidden rounded-[2rem] border border-bone/12 bg-[#1b1813] shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.7)] md:grid-cols-2"
      >
        <div className="relative z-10 flex flex-col justify-between gap-10 p-8 sm:p-12">
          <div className="flex items-center justify-between">
            <span className="nav-link text-marigold">{kicker}</span>
            <span className="display text-5xl text-bone/15">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div>
            <h3 className="display text-[clamp(2rem,3.6vw,3.6rem)]">{title}</h3>
            <p className="mt-5 max-w-md text-pretty text-lg text-bone/75">{body}</p>
          </div>
        </div>
        <div className="relative min-h-[240px]">
          <Image src={image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-r from-[#1e1a14] via-transparent to-transparent max-md:bg-linear-to-t" />
        </div>
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: dim }} />
      </motion.article>
    </div>
  );
}
