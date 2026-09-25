"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import clsx from "clsx";
import { entertainment } from "@/data/content";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/animation/Reveal";

/**
 * Entertainment roster as an editorial list. On desktop a preview image follows the
 * cursor over the hovered row; on touch each row shows its thumbnail inline.
 */
export function Entertainment() {
  const [hovered, setHovered] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.5 });
  const y = useSpring(my, { stiffness: 180, damping: 22, mass: 0.5 });

  return (
    <section
      className="relative bg-ink py-24 sm:py-32"
      aria-labelledby="ent-heading"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel index="07">Entertainment</SectionLabel>
            <h2 id="ent-heading" className="sr-only">
              Entertainment
            </h2>
            <SplitReveal as="p"
              lines={["The people", "on stage."]}
              className="display mt-6 text-[clamp(2.8rem,6vw,6rem)]"
              accentLine={1}
            />
            <p className="mt-6 max-w-sm text-pretty text-bone/70">
              Anchors, DJs, musicians, dancers and artists — booked, briefed and cued as part of one show-flow.
            </p>
          </div>

          <ul className="md:col-span-7" onPointerLeave={() => setHovered(null)}>
            {entertainment.map((item, i) => (
              <li key={item.title} onPointerEnter={() => setHovered(i)} className="group border-t border-bone/10 last:border-b">
                <div className="flex items-center gap-5 py-5 sm:py-6">
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl lg:hidden">
                    <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                  <span className="eyebrow hidden w-10 text-muted lg:block">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={clsx(
                      "display flex-1 text-[clamp(1.8rem,3.6vw,3.4rem)] transition-all duration-500 ease-expo",
                      hovered === i ? "translate-x-4 text-marigold" : hovered !== null ? "text-bone/35" : "",
                    )}
                  >
                    {item.title}
                  </span>
                  <span className="hidden max-w-[16rem] text-right text-sm text-bone/60 sm:block">{item.body}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cursor-follow preview (desktop, fine pointer only) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 hidden h-[280px] w-[220px] [@media(pointer:fine)]:lg:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              key={hovered}
              className="absolute inset-0 overflow-hidden rounded-2xl"
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src={entertainment[hovered].image} alt="" fill sizes="220px" className="object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
