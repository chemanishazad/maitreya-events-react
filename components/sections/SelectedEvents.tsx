"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { useCallback, useState } from "react";
import { featuredEvents, formatDate } from "@/data/events";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/animation/Reveal";
import { ArrowIcon, Button } from "@/components/ui/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Spotlight carousel: the selected event is large and centred, neighbours stay visible
 * at the sides. Supports buttons, keyboard arrows, swipe/drag and clicking a neighbour.
 */
export function SelectedEvents() {
  const items = featuredEvents;
  const [active, setActive] = useState(0);
  const count = items.length;

  const go = useCallback((dir: number) => setActive((a) => (a + dir + count) % count), [count]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
  };

  const current = items[active];

  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-32" aria-labelledby="selected-heading" aria-roledescription="carousel">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel index="05">Selected events</SectionLabel>
            <h2 id="selected-heading" className="sr-only">
              Selected events
            </h2>
            <SplitReveal as="p" lines={["Proof, not", "promises."]} className="display mt-6 text-[clamp(2.8rem,7vw,7rem)]" accentLine={1} />
          </div>
          <div className="flex items-center gap-3">
            <CarouselButton label="Previous event" onClick={() => go(-1)} flip />
            <span className="eyebrow w-16 text-center tabular-nums text-muted">
              {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <CarouselButton label="Next event" onClick={() => go(1)} />
          </div>
        </div>
      </div>

      <div
        className="relative mt-14 h-[58vw] max-h-[640px] min-h-[340px] outline-none"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        aria-label="Use left and right arrow keys to browse events"
      >
        <motion.div
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={onDragEnd}
        >
          {items.map((e, i) => {
            let offset = i - active;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;
            const abs = Math.abs(offset);
            const isActive = offset === 0;
            return (
              <motion.div
                key={e.slug}
                className="absolute left-1/2 top-0 h-full w-[78vw] max-w-[1000px] md:w-[62vw]"
                initial={false}
                animate={{
                  x: `${offset * 72 - 50}%`,
                  scale: isActive ? 1 : 0.78,
                  opacity: abs > 1 ? 0 : isActive ? 1 : 0.45,
                  zIndex: 10 - abs,
                  filter: isActive ? "grayscale(0%)" : "grayscale(80%)",
                }}
                transition={{ duration: 0.9, ease: EASE }}
                onClick={() => !isActive && setActive(i)}
                aria-hidden={!isActive}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
                  <Image
                    src={e.heroImage}
                    alt={e.title}
                    fill
                    draggable={false}
                    sizes="(min-width: 768px) 62vw, 78vw"
                    className="pointer-events-none object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-ink/85 via-transparent to-transparent" />
                  <span className="display absolute right-6 top-4 text-[clamp(3rem,7vw,7rem)] text-bone/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="mx-auto mt-8 max-w-[1000px] px-5 sm:px-8" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="eyebrow text-marigold">
                {current.type} — {current.venue ? `${current.venue}, ` : ""}
                {current.location} · {formatDate(current.date, { month: "short", year: "numeric" })}
              </p>
              <h3 className="display mt-3 text-[clamp(2rem,4.5vw,3.8rem)]">{current.title}</h3>
              <p className="mt-3 max-w-lg text-pretty text-bone/70">{current.summary}</p>
            </div>
            <Button href={`/events/${current.slug}`} variant="ghost" icon={<ArrowIcon />}>
              View case study
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-14 flex justify-center">
        <Link href="/portfolio" className="eyebrow text-muted underline-offset-8 transition-colors hover:text-marigold hover:underline">
          See all work →
        </Link>
      </div>
    </section>
  );
}

function CarouselButton({ label, onClick, flip }: { label: string; onClick: () => void; flip?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group flex h-14 w-14 items-center justify-center rounded-full border border-bone/20 transition-colors hover:border-marigold hover:bg-marigold hover:text-ink"
    >
      <ArrowIcon className={flip ? "rotate-180" : ""} />
    </button>
  );
}
