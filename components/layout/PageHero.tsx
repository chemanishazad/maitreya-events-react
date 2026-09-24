"use client";

import Image from "next/image";
import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import { SplitReveal, FadeIn } from "@/components/animation/Reveal";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { useScrub } from "@/lib/motion";

export function PageHero({
  eyebrow,
  lines,
  accentLine,
  intro,
  image,
  imageAlt = "",
  crumbs,
  children,
}: {
  eyebrow: string;
  lines: string[];
  accentLine?: number;
  intro?: string;
  image?: string;
  imageAlt?: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useScrub(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useScrub(scrollYProgress, [0, 1], [1.05, 1.2]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink pb-16 pt-36 sm:pb-24 sm:pt-44">
      {image && (
        <motion.div className="absolute inset-0" style={{ y, scale }}>
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover opacity-45" />
          <div className="absolute inset-0 bg-linear-to-b from-ink/60 via-ink/50 to-ink" />
        </motion.div>
      )}
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        <FadeIn immediate y={10}>
          <Breadcrumbs items={crumbs} />
        </FadeIn>
        <FadeIn immediate delay={0.05} y={10}>
          <p className="eyebrow mt-10 flex items-center gap-3 text-marigold">
            <span className="h-px w-8 bg-marigold" />
            {eyebrow}
          </p>
        </FadeIn>
        <SplitReveal
          as="h1"
          immediate
          delay={0.1}
          lines={lines}
          accentLine={accentLine}
          className="display mt-6 max-w-[16ch] text-[clamp(3rem,9.5vw,10rem)]"
        />
        {intro && (
          <FadeIn immediate delay={0.45}>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-bone/75 sm:text-xl">{intro}</p>
          </FadeIn>
        )}
        {children && (
          <FadeIn immediate delay={0.55} className="mt-10">
            {children}
          </FadeIn>
        )}
      </div>
    </section>
  );
}
