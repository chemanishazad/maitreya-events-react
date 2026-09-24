"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";
import { services } from "@/data/services";
import { SplitReveal } from "@/components/animation/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowIcon } from "@/components/ui/Button";

/**
 * "What we do" — Expanded Cards on desktop (the hovered/focused card grows while
 * neighbours compress), a swipeable snap carousel on touch screens.
 */
export function EventWorlds() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="relative bg-ink py-24 sm:py-32" aria-labelledby="worlds-heading">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel index="02">What we do</SectionLabel>
            <SplitReveal
              lines={["Eight worlds.", "One crew."]}
              className="display mt-6 text-[clamp(2.8rem,7vw,7rem)]"
              accentLine={1}
            />
            <h2 id="worlds-heading" className="sr-only">
              What we do
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-bone/70">
            Every kind of event, planned and produced in-house — so the idea, the design and the execution never get
            lost between vendors.
          </p>
        </div>

        {/* Desktop: expanded cards */}
        <div className="mt-16 hidden h-[72vh] min-h-[520px] gap-2 lg:flex">
          {services.map((s, i) => {
            const isActive = i === active;
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={clsx(
                  "group relative overflow-hidden rounded-3xl transition-[flex-grow] duration-[900ms] ease-expo",
                  isActive ? "grow-[5]" : "grow",
                )}
                style={{ flexBasis: 0 }}
                aria-label={`${s.title} — ${s.blurb}`}
              >
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 10vw"
                  className={clsx(
                    "object-cover transition-all duration-[1200ms] ease-expo",
                    isActive ? "scale-100 grayscale-0" : "scale-125 grayscale-[35%]",
                  )}
                />
                <div
                  className={clsx(
                    "absolute inset-0 transition-colors duration-700",
                    isActive ? "bg-linear-to-t from-ink/90 via-ink/20 to-transparent" : "bg-ink/40 group-hover:bg-ink/20",
                  )}
                />

                <span className="eyebrow absolute left-5 top-5 text-bone/70">0{i + 1}</span>

                {/* Collapsed: vertical label */}
                <span
                  className={clsx(
                    "absolute bottom-6 left-1/2 origin-center -translate-x-1/2 whitespace-nowrap text-lg font-medium tracking-tight transition-opacity duration-500 [writing-mode:vertical-rl] rotate-180",
                    isActive ? "opacity-0" : "opacity-100",
                  )}
                >
                  {s.label}
                </span>

                {/* Expanded content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute inset-x-0 bottom-0 p-8"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    >
                      <p className="eyebrow text-marigold">{s.kicker}</p>
                      <h3 className="display mt-3 text-[clamp(2.5rem,4.2vw,4.5rem)]">{s.title}</h3>
                      <div className="mt-4 flex items-end justify-between gap-6">
                        <p className="max-w-md text-pretty text-bone/80">{s.blurb}</p>
                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-marigold text-ink transition-transform duration-500 group-hover:rotate-[-45deg]">
                          <ArrowIcon className="h-5 w-5" />
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Touch / tablet: swipe carousel */}
      <div className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 sm:px-8 lg:hidden">
        {services.map((s, i) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="relative aspect-[3/4] w-[78vw] max-w-[380px] shrink-0 snap-center overflow-hidden rounded-3xl"
          >
            <Image src={s.image} alt="" fill sizes="80vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-ink/95 via-ink/20 to-transparent" />
            <span className="eyebrow absolute left-5 top-5 text-bone/70">0{i + 1}</span>
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="eyebrow text-marigold">{s.kicker}</p>
              <h3 className="display mt-2 text-4xl">{s.title}</h3>
              <p className="mt-3 text-sm text-bone/80">{s.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
