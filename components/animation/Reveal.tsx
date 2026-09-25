"use client";

import { motion, type Variants } from "motion/react";
import { Fragment, type CSSProperties, type ElementType, type ReactNode } from "react";
import clsx from "clsx";

const EASE = [0.16, 1, 0.3, 1] as const;

const delayVar = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/**
 * Masked line-by-line / word-by-word rise. Each line is a string; words rise from
 * behind an overflow mask with a small stagger. Text stays in the DOM for SEO/a11y.
 *
 * `immediate` (above-the-fold) uses pure CSS so it animates on first paint without
 * waiting for hydration; otherwise it animates when scrolled into view.
 */
export function SplitReveal({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  accentLine,
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  /** Index of a line to set in the italic serif accent */
  accentLine?: number;
  delay?: number;
  stagger?: number;
  /** Animate on first paint rather than when scrolled into view */
  immediate?: boolean;
}) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word: Variants = {
    hidden: { y: "110%", rotate: 4 },
    show: { y: "0%", rotate: 0, transition: { duration: 1, ease: EASE } },
  };

  let n = 0;
  const renderWord = (content: ReactNode) => {
    const i = n++;
    return (
      <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-top">
        {immediate ? (
          <span className="anim-rise" style={delayVar(delay + i * stagger)}>
            {content}
          </span>
        ) : (
          <motion.span className="inline-block origin-bottom-left" variants={word}>
            {content}
          </motion.span>
        )}
      </span>
    );
  };

  // A real space between lines, so search engines and screen readers read "Proof, not promises."
  // rather than "Proof, notpromises." (lines are display:block, so the space is invisible)
  const body = lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
    <span
      className={clsx("block", lineClassName, i === accentLine && "font-serif font-normal italic tracking-[-0.03em] text-marigold")}
    >
      {typeof line === "string"
        ? line.split(" ").map((w, j, all) => (
            <Fragment key={j}>
              {renderWord(w)}
              {j < all.length - 1 && " "}
            </Fragment>
          ))
        : renderWord(line)}
    </span>
    </Fragment>
  ));

  if (immediate) {
    return (
      <Tag className={className}>
        <span className="block">{body}</span>
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      <motion.span
        className="block"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      >
        {body}
      </motion.span>
    </Tag>
  );
}

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "p" | "li" | "section" | "span";
  /** Animate on first paint (pure CSS) rather than when scrolled into view */
  immediate?: boolean;
}) {
  if (immediate) {
    const Tag = as;
    return (
      <Tag className={clsx("anim-fade-up", className)} style={delayVar(delay)}>
        {children}
      </Tag>
    );
  }
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/** Image that unveils with a clip-path wipe and settles from a slight zoom. */
export function ImageReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={clsx("overflow-hidden", className)}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.3, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.8, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
