"use client";

import Image from "next/image";
import { motion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { productionCapabilities } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useIsDesktop, usePrefersReducedMotion } from "@/lib/hooks";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { useScrub } from "@/lib/motion";

/**
 * "Built for the moment" — production capabilities. On desktop the section pins and the
 * panels travel horizontally with vertical scroll; on touch it is a native swipe row.
 */
export function Production() {
  const desktop = useIsDesktop();
  const reduce = usePrefersReducedMotion();
  return desktop && !reduce ? <PinnedTrack /> : <SwipeTrack />;
}

function Intro() {
  return (
    <div className="flex w-[min(86vw,460px)] shrink-0 flex-col justify-between pr-8">
      <div>
        <SectionLabel index="06">Production</SectionLabel>
        <h2 className="display mt-6 text-[clamp(3rem,6.5vw,6.5rem)]">
          Built for <span className="font-serif font-normal italic text-marigold">the moment.</span>
        </h2>
      </div>
      <div>
        <p className="mt-6 max-w-sm text-pretty text-bone/70">
          We are an event production company, not only an organiser. Our crew builds, rigs and runs the technical
          backbone of every event.
        </p>
        <div className="mt-8">
          <Button href="/services/event-production" variant="ghost" icon={<ArrowIcon />}>
            Production services
          </Button>
        </div>
      </div>
    </div>
  );
}

function Panel({ item, index }: { item: (typeof productionCapabilities)[number]; index: number }) {
  return (
    <article className="group relative h-full w-[min(78vw,420px)] shrink-0 overflow-hidden rounded-[2rem] bg-ink-3">
      <Image
        src={item.image}
        alt={`${item.title} production`}
        fill
        sizes="420px"
        className="object-cover opacity-80 transition-transform duration-[1400ms] ease-expo group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/30 to-transparent" />
      <span className="display absolute left-6 top-5 text-7xl text-bone/15">{String(index + 1).padStart(2, "0")}</span>
      <div className="absolute inset-x-0 bottom-0 p-7">
        <h3 className="display text-[clamp(1.9rem,2.7vw,2.7rem)]">{item.title}</h3>
        <p className="mt-3 max-w-xs text-sm text-bone/75">{item.body}</p>
      </div>
    </article>
  );
}

function PinnedTrack() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useScrub(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useScrub(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink"
      style={{ height: distance ? `calc(100vh + ${distance}px)` : "300vh" }}
      aria-label="Production capabilities"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex h-[72vh] gap-4 pl-8 pr-[8vw]">
          <Intro />
          {productionCapabilities.map((item, i) => (
            <Panel key={item.title} item={item} index={i} />
          ))}
        </motion.div>
        <div className="mx-8 mt-8 h-px bg-bone/10">
          <motion.div className="h-full origin-left bg-marigold" style={{ scaleX: bar }} />
        </div>
      </div>
    </section>
  );
}

function SwipeTrack() {
  return (
    <section className="bg-ink py-24" aria-label="Production capabilities">
      <div className="px-5 sm:px-8">
        <Intro />
      </div>
      <div className="hide-scrollbar mt-10 flex h-[62vh] min-h-[420px] snap-x snap-mandatory gap-3 overflow-x-auto px-5 sm:px-8">
        {productionCapabilities.map((item, i) => (
          <div key={item.title} className="h-full snap-center">
            <Panel item={item} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
