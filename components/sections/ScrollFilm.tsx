"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, type MotionValue } from "motion/react";
import { useRef, useState } from "react";
import clsx from "clsx";
import { filmFrames } from "@/data/content";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { useScrub } from "@/lib/motion";

/**
 * Signature scroll film: scroll scrubs through the life of an event — venue → celebration —
 * ending on the wordmark. Frames are stills today; swap `filmFrames` for an extracted video
 * frame sequence later without touching the section.
 */
export function ScrollFilm() {
  const reduce = usePrefersReducedMotion();
  return reduce ? <StaticFilm /> : <PinnedFilm />;
}

function PinnedFilm() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  // 0 → 0.08: window expands to full-bleed · 0.08 → 0.85: frames · 0.85 → 1: wordmark
  const clip = useScrub(scrollYProgress, [0, 0.08], ["inset(14% 18% 14% 18% round 28px)", "inset(0% 0% 0% 0% round 0px)"]);
  const film = useScrub(scrollYProgress, [0.08, 0.85], [0, 1]);
  const zoom = useScrub(scrollYProgress, [0, 1], [1.25, 1]);
  const statementOpacity = useScrub(scrollYProgress, [0.3, 0.38, 0.55, 0.62], [0, 1, 1, 0]);
  const statementScale = useScrub(scrollYProgress, [0.3, 0.62], [0.92, 1.06]);
  const finalOpacity = useScrub(scrollYProgress, [0.86, 0.93], [0, 1]);
  const finalY = useScrub(scrollYProgress, [0.86, 0.95], ["30%", "0%"]);
  const darken = useScrub(scrollYProgress, [0.84, 0.94], [0.25, 0.8]);
  const introOpacity = useScrub(scrollYProgress, [0, 0.06], [1, 0]);

  useMotionValueEvent(film, "change", (v) => {
    setActive(Math.min(filmFrames.length - 1, Math.floor(v * filmFrames.length)));
  });

  return (
    <section ref={ref} className="relative h-[520vh] bg-ink" aria-label="Every detail matters — how an event comes together">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.p
          style={{ opacity: introOpacity }}
          className="eyebrow absolute inset-x-0 top-[6%] z-20 text-center text-muted"
        >
          (04) Scroll to build an event
        </motion.p>

        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <motion.div className="absolute inset-0" style={{ scale: zoom }}>
            {filmFrames.map((f, i) => (
              <Frame key={f.label} index={i} total={filmFrames.length} progress={film} src={f.image} label={f.label} />
            ))}
          </motion.div>
          <motion.div className="absolute inset-0 bg-ink" style={{ opacity: darken }} />
        </motion.div>

        {/* Overlay statement */}
        <motion.div
          style={{ opacity: statementOpacity, scale: statementScale }}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-5 text-center"
        >
          <p className="display text-[clamp(3rem,10vw,10rem)] drop-shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
            Every detail <span className="font-serif font-normal italic text-marigold">matters.</span>
          </p>
        </motion.div>

        {/* Final wordmark */}
        <motion.div
          style={{ opacity: finalOpacity, y: finalY }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center"
        >
          <p className="eyebrow text-marigold">Events • Entertainment • Experiences</p>
          <p className="display mt-4 text-[clamp(3.2rem,12vw,12rem)]">Maitreya Events</p>
        </motion.div>

        {/* Stage timeline */}
        <div className="absolute inset-x-0 bottom-6 z-20 mx-auto max-w-[1600px] px-5 sm:bottom-8 sm:px-8">
          <div className="flex items-end justify-between gap-2">
            {filmFrames.map((f, i) => (
              <div key={f.label} className="flex flex-1 flex-col gap-2">
                <span
                  className={clsx(
                    "eyebrow hidden !text-[0.6rem] transition-colors duration-300 md:block",
                    i === active ? "text-marigold" : i < active ? "text-bone/70" : "text-bone/30",
                  )}
                >
                  {String(i + 1).padStart(2, "0")} {f.label}
                </span>
                <span className="h-[2px] w-full overflow-hidden bg-bone/15">
                  <span
                    className={clsx(
                      "block h-full origin-left bg-marigold transition-transform duration-500 ease-expo",
                      i <= active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </span>
              </div>
            ))}
          </div>
          <p className="eyebrow mt-3 text-bone md:hidden">
            {String(active + 1).padStart(2, "0")} / {filmFrames[active].label}
          </p>
        </div>
      </div>
    </section>
  );
}

function Frame({
  index,
  total,
  progress,
  src,
  label,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  src: string;
  label: string;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const fade = 0.35 / total;
  // Later frames stack on top and fade in over the previous one, so there is no dip to black.
  const opacity = useScrub(progress, index === 0 ? [0, 1] : [start - fade, start], index === 0 ? [1, 1] : [0, 1]);
  const scale = useScrub(progress, [start - fade, end], [1.12, 1]);
  return (
    <motion.div className="absolute inset-0" style={{ opacity, scale }}>
      <Image src={src} alt={`${label} stage of an event`} fill sizes="100vw" className="object-cover" loading={index < 2 ? "eager" : "lazy"} />
    </motion.div>
  );
}

/** Reduced-motion fallback: the same story as a simple grid. */
function StaticFilm() {
  return (
    <section className="bg-ink px-5 py-24 sm:px-8" aria-label="Every detail matters">
      <p className="display mx-auto max-w-[1600px] text-[clamp(2.6rem,7vw,7rem)]">
        Every detail <span className="font-serif font-normal italic text-marigold">matters.</span>
      </p>
      <ol className="mx-auto mt-10 grid max-w-[1600px] grid-cols-2 gap-3 md:grid-cols-4">
        {filmFrames.map((f, i) => (
          <li key={f.label} className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image src={f.image} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
            <span className="eyebrow absolute bottom-3 left-3 rounded-full bg-ink/70 px-3 py-1">
              {String(i + 1).padStart(2, "0")} {f.label}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
