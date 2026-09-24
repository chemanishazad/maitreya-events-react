"use client";

import { usePathname } from "next/navigation";
import { MotionConfig } from "motion/react";
import { createContext, useContext, useState } from "react";

const NavigatedContext = createContext(false);

/**
 * Lives in the root layout (never remounts) and records whether the visitor has
 * navigated client-side yet, so the first page load is never delayed by a transition.
 */
export function RouteTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [initialPath] = useState(pathname);
  const [navigated, setNavigated] = useState(false);
  if (!navigated && pathname !== initialPath) setNavigated(true);
  return (
    <MotionConfig reducedMotion="user">
      <NavigatedContext.Provider value={navigated}>{children}</NavigatedContext.Provider>
    </MotionConfig>
  );
}

export const useHasNavigated = () => useContext(NavigatedContext);
