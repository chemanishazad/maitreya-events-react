"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import clsx from "clsx";
import { processSteps } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * "From idea to event" — a pinned storytelling section. Scrolling advances through the
 * six stages; the stage image swaps with a clip-path wipe.
 */
export function IdeaToEvent() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(processSteps.length - 1, Math.floor(v * processSteps.length));
    setActive(i);
  });

  const step = processSteps[active];

  return (
    <section
      ref={ref}
      className="relative bg-bone text-ink"
      style={{ height: `${processSteps.length * 85 + 40}vh` }}
      aria-labelledby="process-heading"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden px-5 pb-8 pt-24 sm:px-8 lg:pt-28">
        <div className="mx-auto flex w-full max-w-[1600px] items-end justify-between gap-6">
          <div>
            <SectionLabel index="03" tone="light">
              The process
            </SectionLabel>
            <h2 id="process-heading" className="display mt-4 text-[clamp(2.4rem,6vw,6rem)]">
              From idea <span className="font-serif font-normal italic text-ember">to event</span>
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-ink/60 md:block">
            One team takes your event through every stage — no hand-offs, no gaps.
          </p>
        </div>

        <div className="mx-auto mt-6 grid w-full max-w-[1600px] flex-1 gap-6 lg:mt-10 lg:grid-cols-12 lg:gap-10">
          {/* Step list */}
          <div className="order-2 flex flex-col justify-between lg:order-1 lg:col-span-5">
            <ol className="hidden lg:block" aria-label="Stages">
              {processSteps.map((s, i) => (
                <li
                  key={s.title}
                  className={clsx(
                    "flex items-baseline gap-5 border-t border-ink/10 py-3 transition-all duration-500",
                    i === active ? "opacity-100" : "opacity-30",
                  )}
                >
                  <span className="eyebrow w-8">0{i + 1}</span>
                  <span className={clsx("text-2xl font-medium tracking-tight transition-transform duration-500 ease-expo", i === active && "translate-x-2")}>
                    {s.title}
                  </span>
                  {i === active && <motion.span layoutId="process-dot" className="ml-auto h-2 w-2 rounded-full bg-ember" />}
                </li>
              ))}
            </ol>

            <div className="relative min-h-[9.5rem] lg:min-h-[8rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="flex items-baseline gap-3">
                    <span className="display text-6xl text-ember lg:text-7xl">0{active + 1}</span>
                    <span className="display text-4xl lg:hidden">{step.title}</span>
                  </p>
                  <p className="mt-3 max-w-md text-pretty text-lg leading-snug text-ink/75">{step.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress */}
            <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-ink/10">
              <motion.div className="h-full origin-left bg-ember" style={{ scaleX: progress }} />
            </div>
          </div>

          {/* Stage image */}
          <div className="relative order-1 min-h-[34vh] overflow-hidden rounded-[2rem] lg:order-2 lg:col-span-7">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image src={step.image} alt={`${step.title} stage`} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
                </motion.div>
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/50 to-transparent" />
            <p className="display absolute bottom-5 left-6 hidden text-[clamp(3rem,6vw,6.5rem)] text-bone lg:block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  className="inline-block"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {step.title}
                </motion.span>
              </AnimatePresence>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
