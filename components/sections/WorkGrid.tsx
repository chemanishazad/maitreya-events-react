"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";
import type { EventItem } from "@/data/events";
import { services } from "@/data/services";
import { WorkCard } from "@/components/cards/EventCard";

/** Filterable grid of past events, with animated re-layout between filters. */
export function WorkGrid({ items }: { items: EventItem[] }) {
  const categories = services.filter((s) => items.some((e) => e.category === s.slug));
  const [filter, setFilter] = useState<string>("all");
  const shown = filter === "all" ? items : items.filter((e) => e.category === filter);

  return (
    <div>
      <div className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Filter events">
        {[{ slug: "all", label: "All" }, ...categories.map((c) => ({ slug: c.slug, label: c.label }))].map((c) => (
          <button
            key={c.slug}
            type="button"
            role="tab"
            aria-selected={filter === c.slug}
            onClick={() => setFilter(c.slug)}
            className={clsx(
              "relative shrink-0 rounded-full px-5 py-2.5 text-sm transition-colors",
              filter === c.slug ? "text-ink" : "text-bone/70 hover:text-bone",
            )}
          >
            {filter === c.slug && (
              <motion.span layoutId="work-filter" className="absolute inset-0 rounded-full bg-marigold" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
            )}
            <span className="relative">{c.label}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((e, i) => (
            <motion.div
              key={e.slug}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={i % 2 === 1 ? "md:mt-24" : ""}
            >
              <WorkCard event={e} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
