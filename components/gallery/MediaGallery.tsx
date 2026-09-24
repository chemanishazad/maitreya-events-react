"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

export type GalleryItem = { src: string; alt: string; caption?: string };

/** Masonry media gallery with a keyboard-accessible lightbox. */
export function MediaGallery({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  return (
    <>
      <ul className="columns-2 gap-3 md:columns-3 xl:columns-4 [&>li]:mb-3">
        {items.map((it, i) => (
          <motion.li
            key={it.src + i}
            className="break-inside-avoid"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.8, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block w-full overflow-hidden rounded-2xl"
              aria-label={`Open photo: ${it.alt}`}
            >
              <Image
                src={it.src}
                alt={it.alt}
                width={800}
                height={i % 3 === 0 ? 1000 : i % 3 === 1 ? 600 : 800}
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="h-auto w-full object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-105"
                style={{ aspectRatio: i % 3 === 0 ? "4/5" : i % 3 === 1 ? "4/3" : "1/1" }}
              />
              {it.caption && (
                <span className="eyebrow absolute bottom-3 left-3 translate-y-2 rounded-full bg-ink/70 px-3 py-1.5 opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {it.caption}
                </span>
              )}
            </button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={open}
                className="relative h-full w-full max-w-6xl"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image src={items[open].src} alt={items[open].alt} fill sizes="100vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-4" onClick={(e) => e.stopPropagation()}>
              <LightboxButton label="Previous photo" onClick={() => step(-1)}>
                ←
              </LightboxButton>
              <span className="eyebrow tabular-nums text-bone/70">
                {open + 1} / {items.length}
              </span>
              <LightboxButton label="Next photo" onClick={() => step(1)}>
                →
              </LightboxButton>
            </div>
            <button
              type="button"
              autoFocus
              onClick={close}
              aria-label="Close photo viewer"
              className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-bone/10 text-xl hover:bg-marigold hover:text-ink"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LightboxButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/20 text-lg hover:border-marigold hover:bg-marigold hover:text-ink"
    >
      {children}
    </button>
  );
}
