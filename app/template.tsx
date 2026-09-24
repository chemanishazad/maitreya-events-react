"use client";

import { motion } from "motion/react";
import { useHasNavigated } from "@/components/layout/RouteTransition";

/**
 * Route transition. The first page load renders immediately (no delay to first content);
 * subsequent client navigations get a short curtain wipe and content rise.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const navigated = useHasNavigated();
  if (!navigated) return <>{children}</>;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[80] origin-top bg-marigold"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
