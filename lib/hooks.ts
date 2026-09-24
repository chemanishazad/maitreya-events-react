"use client";

import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string, serverFallback = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}

/** Desktop = wide screen with a fine pointer; used to choose cinematic vs. touch-first interactions. */
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px) and (pointer: fine)", true);
export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
