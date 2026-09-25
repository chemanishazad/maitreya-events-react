"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, type MotionValue } from "motion/react";
import { useRef, useState } from "react";
import clsx from "clsx";
import { processSteps } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/animation/Reveal";
import { useScrub } from "@/lib/motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const WIPE = [0.76, 0, 0.24, 1] as const;
type Step = (typeof processSteps)[number];

/**
 * "From idea to event" — six stages of how we work.
 * Desktop: pinned; scrolling advances the stage, photos wipe in with a floating detail card.
 * Touch/mobile: a simple stacked list of stage cards.
 */
export function IdeaToEvent() {
  return (
    <section className="relative bg-bone text-ink" aria-labelledby="process-heading">
      <h2 id="process-heading" className="sr-only">
        From idea to event — how we work
      </h2>
      <Pinned />
      <Stacked />
    </section>
  );
}

function Header() {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <SectionLabel index="03" tone="light">
          The process
        </SectionLabel>
        <p className="display mt-4 text-[clamp(2.4rem,5.4vw,5.6rem)]">
          From idea <span className="italic text-ember">to event</span>
        </p>
      </div>
      <p className="hidden max-w-xs text-sm text-ink/60 md:block">
        Six stages, one team. Nothing is handed off — the people who plan it are the people who run it.
      </p>
    </div>
  );
}

function Pinned() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = processSteps.length;

  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(n - 1, Math.floor(v * n))));

  const step = processSteps[active];
  // Photos drift slowly against the scroll for depth
  const drift = useScrub(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const detailDrift = useScrub(scrollYProgress, [0, 1], ["30px", "-60px"]);

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `${n * 90 + 30}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden px-8 pb-10 pt-28">
        {/* Giant stage number watermark */}
        <div aria-hidden className="pointer-events-none absolute -left-4 bottom-[-6vw] select-none">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={active}
              className="display block text-[34vw] leading-none text-ink/[0.045]"
              initial={{ y: "30%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-30%", opacity: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              {String(active + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="relative mx-auto w-full max-w-[1600px]">
          <Header />
        </div>

        <div className="relative mx-auto mt-10 grid w-full max-w-[1600px] flex-1 grid-cols-12 gap-10">
          {/* Copy */}
          <div className="col-span-5 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="nav-link flex items-center gap-3 text-ember">
                  <span className="rounded-full border border-ember/40 px-3 py-1">Stage {String(active + 1).padStart(2, "0")}</span>
                  {step.when}
                </p>
                <p className="display mt-5 text-[clamp(3rem,5vw,5.5rem)]">{step.title}</p>
                <p className="mt-5 max-w-md text-pretty text-lg leading-snug text-ink/75">{step.body}</p>
                <ul className="mt-7 space-y-3">
                  {step.deliverables.map((d, i) => (
                    <motion.li
                      key={d}
                      className="flex items-center gap-3 text-[0.95rem] font-medium"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: EASE }}
                    >
                      <Tick />
                      {d}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>

            <Progress active={active} progress={scrollYProgress} />
          </div>

          {/* Imagery */}
          <div className="relative col-span-7">
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-ink">
              {processSteps.map((s, i) => (
                <motion.div
                  key={s.title}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ clipPath: i <= active ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
                  transition={{ duration: 1, ease: WIPE }}
                  aria-hidden={i !== active}
                >
                  <motion.div className="absolute -inset-y-[6%] inset-x-0" style={{ y: drift }}>
                    <motion.div
                      className="absolute inset-0"
                      initial={false}
                      animate={{ scale: i === active ? 1 : 1.2 }}
                      transition={{ duration: 1.6, ease: EASE }}
                    >
                      <Image
                        src={s.image}
                        alt={i === active ? `${s.title} stage` : ""}
                        fill
                        sizes="58vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/65 via-ink/5 to-transparent" />
            </div>

            {/* Caption chip */}
            <div className="absolute bottom-6 left-6 z-10">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  className="glass-flat nav-link rounded-full px-4 py-2 text-bone"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} · {step.title}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Floating detail photo */}
            <motion.div className="absolute -left-10 top-10 z-10 w-[34%] max-w-[260px]" style={{ y: detailDrift }}>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active}
                  className="relative aspect-[4/5] overflow-hidden rounded-2xl border-4 border-bone shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]"
                  initial={{ opacity: 0, rotate: -8, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, rotate: -4, y: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 4, y: -30, scale: 0.95 }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <Image src={step.detail} alt="" fill sizes="260px" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Six segments; the active one fills with scroll */
function Progress({ active, progress }: { active: number; progress: MotionValue<number> }) {
  const n = processSteps.length;
  return (
    <ol className="mt-8 grid grid-cols-6 gap-2" aria-label="Stages">
      {processSteps.map((s, i) => (
        <li key={s.title} className="flex flex-col gap-2">
          <span className={clsx("nav-link !text-[0.6rem] transition-colors duration-300", i === active ? "text-ink" : "text-ink/40")}>
            {s.title}
          </span>
          <span className="h-[3px] overflow-hidden rounded-full bg-ink/10">
            <Segment index={i} total={n} progress={progress} />
          </span>
        </li>
      ))}
    </ol>
  );
}

function Segment({ index, total, progress }: { index: number; total: number; progress: MotionValue<number> }) {
  const scaleX = useScrub(progress, [index / total, (index + 1) / total], [0, 1]);
  return <motion.span className="block h-full origin-left rounded-full bg-ember" style={{ scaleX }} />;
}

function Tick() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ember text-bone">
      <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
        <path d="M2.5 6.2l2.2 2.2 4.8-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Touch / narrow screens: stage cards in a column */
function Stacked() {
  return (
    <div className="px-5 pb-20 pt-24 sm:px-8 lg:hidden">
      <Header />
      <ol className="mt-10 space-y-6">
        {processSteps.map((s, i) => (
          <StackedCard key={s.title} step={s} index={i} />
        ))}
      </ol>
    </div>
  );
}

function StackedCard({ step, index }: { step: Step; index: number }) {
  return (
    <motion.li
      className="overflow-hidden rounded-[1.75rem] bg-white/60 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="relative aspect-[16/10]">
        <Image src={step.image} alt={`${step.title} stage`} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-ink/60 to-transparent" />
        <span className="display absolute bottom-3 left-5 text-5xl text-bone">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="p-6">
        <p className="nav-link text-ember">{step.when}</p>
        <SplitReveal as="h3" lines={[step.title]} className="display mt-2 text-4xl" />
        <p className="mt-3 text-pretty text-ink/75">{step.body}</p>
        <ul className="mt-4 space-y-2">
          {step.deliverables.map((d) => (
            <li key={d} className="flex items-center gap-3 text-sm font-medium">
              <Tick />
              {d}
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}
