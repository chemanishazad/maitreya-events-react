"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ElementType } from "react";
import { useScrub } from "@/lib/motion";

/**
 * Scroll-linked "focus" typography: each word sharpens from blurred and dim to crisp
 * as the block scrolls through the viewport.
 */
export function FocusReveal({
  text,
  as: Tag = "p",
  className,
  accentWords = [],
}: {
  text: string;
  as?: ElementType;
  className?: string;
  accentWords?: string[];
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1.6 / words.length;
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, Math.min(end, 1)]}
            accent={accentWords.includes(w.replace(/[.,]/g, ""))}
          >
            {w}
          </Word>
        );
      })}
    </Tag>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useScrub(progress, range, [0.12, 1]);
  const blur = useScrub(progress, range, [10, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const y = useScrub(progress, range, [14, 0]);
  return (
    <motion.span
      aria-hidden
      style={{ opacity, filter, y }}
      className={`inline-block will-change-[filter,opacity] ${accent ? "font-serif italic font-normal text-marigold" : ""}`}
    >
      {children}&nbsp;
    </motion.span>
  );
}
