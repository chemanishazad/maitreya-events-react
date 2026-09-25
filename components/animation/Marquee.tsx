"use client";

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Infinite marquee whose speed and direction respond to scroll velocity.
 */
export function VelocityMarquee({
  children,
  baseVelocity = -2.5,
  className,
  skew = false,
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
  /** Lean the row with scroll speed */
  skew?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Only animate while on screen
  const inView = useInView(ref, { margin: "200px 0px" });
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(1);
  const skewX = useTransform(smoothVelocity, (v) => (skew ? `${Math.max(-10, Math.min(10, -v / 180))}deg` : "0deg"));

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    moveBy += direction.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={ref} className={`overflow-hidden whitespace-nowrap ${className ?? ""}`}>
      <motion.div className="flex w-max flex-nowrap" style={{ x, skewX }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
