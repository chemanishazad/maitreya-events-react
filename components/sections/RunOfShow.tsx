"use client";

import { motion, useScroll, type MotionValue } from "motion/react";
import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/animation/Reveal";
import { useScrub } from "@/lib/motion";

type Step = { when: string; title: string; body: string };

/** "A typical run of show" — a vertical timeline whose line draws itself as you scroll. */
export function RunOfShow({ steps, service }: { steps: Step[]; service: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const line = useScrub(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="bg-ink py-20 sm:py-28" aria-labelledby="run-heading">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionLabel>Run of show</SectionLabel>
            <h2 id="run-heading" className="sr-only">
              A typical {service} run of show
            </h2>
            <SplitReveal as="p" lines={["A typical", "run of show."]} accentLine={1} className="display mt-6 text-[clamp(2.4rem,4.8vw,4.8rem)]" />
            <p className="mt-6 max-w-sm text-pretty text-bone/65">
              An example flow for {service.toLowerCase()} with us. Every event gets its own plan.
            </p>
          </div>
        </div>

        <ol ref={ref} className="relative lg:col-span-7 lg:col-start-6">
          {/* Track + drawn line */}
          <span aria-hidden className="absolute bottom-3 left-[11px] top-3 w-px bg-bone/10" />
          <motion.span aria-hidden className="absolute bottom-3 left-[11px] top-3 w-px origin-top bg-marigold" style={{ scaleY: line }} />
          {steps.map((s, i) => (
            <StepItem key={s.title} step={s} index={i} total={steps.length} progress={scrollYProgress} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function StepItem({ step, index, total, progress }: { step: Step; index: number; total: number; progress: MotionValue<number> }) {
  const at = index / Math.max(1, total - 1);
  const lit = useScrub(progress, [at - 0.04, at + 0.02], [0, 1]);
  return (
    <motion.li
      className="relative pb-12 pl-14 last:pb-0"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <span aria-hidden className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-bone/25 bg-ink">
        <motion.span className="h-3 w-3 rounded-full bg-marigold" style={{ opacity: lit, scale: lit }} />
      </span>
      <p className="nav-link text-marigold">{step.when}</p>
      <h3 className="mt-2 text-2xl font-medium tracking-tight sm:text-3xl">{step.title}</h3>
      <p className="mt-2 max-w-lg text-pretty text-bone/65">{step.body}</p>
    </motion.li>
  );
}
