"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { img } from "@/data/images";
import { site } from "@/data/site";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { useScrub } from "@/lib/motion";

const slides = [
  { src: img.confettiConcert, label: "Live Events", alt: "Crowd celebrating under falling confetti at a live concert" },
  { src: img.mandap, label: "Weddings", alt: "Decorated wedding mandap stage with floral canopy" },
  { src: img.conferenceDark, label: "Corporate", alt: "Audience facing a lit stage at a corporate event" },
  { src: img.concertWhite, label: "Production", alt: "Stage lighting beams over a concert crowd" },
];

const SLIDE_MS = 5500;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgScale = useScrub(scrollYProgress, [0, 1], [1, 1.18]);
  const bgY = useScrub(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useScrub(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const contentOpacity = useScrub(scrollYProgress, [0, 0.6], [1, 0]);
  const radius = useScrub(scrollYProgress, [0, 1], [0, 48]);
  const inset = useScrub(scrollYProgress, [0, 1], ["inset(0% 0% 0% 0%)", "inset(4% 3% 0% 3%)"]);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink" aria-label="Introduction">
      <motion.div className="absolute inset-0" style={{ clipPath: inset, borderRadius: radius }}>
        <motion.div className="absolute inset-0" style={{ scale: bgScale, y: bgY }}>
          <AnimatePresence initial={false}>
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.12 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1.4, ease: "easeInOut" }, scale: { duration: SLIDE_MS / 1000 + 1.4, ease: "linear" } }}
            >
              <Image
                src={slides[index].src}
                alt={slides[index].alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
        {/* Readability overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-ink/70 via-ink/35 to-ink/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,transparent_20%,rgba(11,10,8,0.65)_85%)]" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-28 sm:px-8 sm:pb-32"
      >
        <p className="anim-fade-up eyebrow mb-6 flex items-center gap-3 text-bone/80">
          <span className="h-px w-10 bg-marigold" />
          {site.descriptor}
        </p>

        <h1 className="display text-[clamp(3.4rem,13.5vw,13rem)]">
          <span className="sr-only">Maitreya Events — We create. You celebrate.</span>
          <HeroLine delay={0.05}>We create.</HeroLine>
          <HeroLine delay={0.22} className="font-serif font-normal italic tracking-[-0.03em] text-marigold">
            You celebrate.
          </HeroLine>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p
            className="anim-fade-up max-w-md text-pretty text-base leading-relaxed text-bone/80 sm:text-lg"
            style={{ "--d": "0.55s" } as React.CSSProperties}
          >
            End-to-end event management, entertainment and production for weddings, celebrations, corporate events,
            cultural programmes and live experiences.
          </p>
          <div className="anim-fade-up flex flex-wrap gap-3" style={{ "--d": "0.7s" } as React.CSSProperties}>
            <Button href="/contact" size="lg" trackAs="plan_event_click" icon={<ArrowIcon />}>
              Plan your event
            </Button>
            <Button href="/portfolio" size="lg" variant="ghost" trackAs="explore_events_click">
              Explore our events
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Bottom bar: slide progress + scroll cue */}
      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-[1600px] items-end justify-between px-5 pb-8 sm:px-8">
        <div className="flex items-center gap-4" aria-hidden>
          {slides.map((s, i) => (
            <button
              key={s.label}
              type="button"
              tabIndex={-1}
              onClick={() => setIndex(i)}
              className="group flex flex-col gap-2 text-left"
            >
              <span className="relative block h-[2px] w-10 overflow-hidden bg-bone/20 sm:w-16">
                {i === index && (
                  <motion.span
                    key={index}
                    className="absolute inset-0 origin-left bg-marigold"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: reduce ? 0 : SLIDE_MS / 1000, ease: "linear" }}
                  />
                )}
              </span>
              <span
                className={`eyebrow hidden !text-[0.6rem] transition-colors sm:block ${i === index ? "text-bone" : "text-bone/40"}`}
              >
                {s.label}
              </span>
            </button>
          ))}
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <span className="eyebrow text-bone/60">Scroll</span>
          <span className="relative block h-12 w-px overflow-hidden bg-bone/15">
            <span className="scroll-cue-line absolute inset-0 bg-marigold" />
          </span>
        </div>
      </div>
    </section>
  );
}

function HeroLine({ children, delay, className }: { children: string; delay: number; className?: string }) {
  return (
    <span aria-hidden className={`block overflow-hidden pb-[0.06em] ${className ?? ""}`}>
      {children.split("").map((ch, i) => (
        <span key={i} className="anim-rise" style={{ "--d": `${delay + i * 0.028}s` } as React.CSSProperties}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
