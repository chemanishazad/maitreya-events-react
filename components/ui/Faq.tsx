"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <ul className="border-b border-bone/10">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q} className="border-t border-bone/10">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-xl font-medium tracking-tight transition-colors hover:text-marigold sm:text-2xl"
              >
                {f.q}
                <span
                  aria-hidden
                  className={`relative h-8 w-8 shrink-0 rounded-full border border-bone/20 transition-transform duration-500 ease-expo ${isOpen ? "rotate-45 border-marigold text-marigold" : ""}`}
                >
                  <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 bg-current" />
                  <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-y-1/2 bg-current" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-pretty text-bone/70">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
