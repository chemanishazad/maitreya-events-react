"use client";

import Image from "next/image";
import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import { SplitReveal, FadeIn } from "@/components/animation/Reveal";
import { Plate, useAspect, usePointerDrift } from "@/components/animation/Depth";
import { Bokeh, Garlands, LightRays, Sparkles } from "@/components/hero/SceneArt";
import { useScrub } from "@/lib/motion";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/**
 * Inner-page opening — a short fly-through in the same language as the home hero:
 * the page photograph in the distance, marigold garlands and bokeh passing the lens as you
 * scroll into the page, pointer drift on every plate.
 */
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
  const aspect = useAspect();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = scrollYProgress;
  const { px, py } = usePointerDrift();
  const textY = useScrub(p, [0, 1], [0, -80]);
  const textOpacity = useScrub(p, [0.35, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative isolate min-h-[92svh] overflow-hidden bg-ink">
      {image && (
        <Plate p={p} px={px} py={py} depth={0.08} travel={0.35}>
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover opacity-60" />
        </Plate>
      )}
      <Plate p={p} px={px} py={py} depth={0.15} travel={0.6} className="opacity-60">
        <LightRays />
      </Plate>
      <Plate p={p} px={px} py={py} depth={0.4} travel={1.5}>
        <Sparkles count={26} />
      </Plate>
      <Plate p={p} px={px} py={py} depth={0.75} travel={3.5}>
        <div className="absolute inset-0 opacity-50">
          <Garlands variant="far" aspect={aspect} />
        </div>
      </Plate>
      <Plate p={p} px={px} py={py} depth={1} travel={6}>
        <Bokeh />
      </Plate>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-linear-to-b from-ink/70 via-ink/45 to-ink" />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative mx-auto flex min-h-[92svh] max-w-[1600px] flex-col justify-end px-5 pb-16 pt-36 sm:px-8 sm:pb-24"
      >
        <FadeIn immediate y={10}>
          <Breadcrumbs items={crumbs} />
        </FadeIn>
        <FadeIn immediate delay={0.05} y={10}>
          <p className="nav-link mt-8 flex items-center gap-3 text-marigold">
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
          className="display mt-6 max-w-[14ch] text-[clamp(2.8rem,7.5vw,8rem)]"
        />
        {intro && (
          <FadeIn immediate delay={0.45}>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-bone/80 sm:text-xl">{intro}</p>
          </FadeIn>
        )}
        {children && (
          <FadeIn immediate delay={0.55} className="mt-10">
            {children}
          </FadeIn>
        )}
      </motion.div>
    </section>
  );
}
