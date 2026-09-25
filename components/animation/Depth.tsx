"use client";

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { useScrub } from "@/lib/motion";

/**
 * Depth-plate toolkit for scroll "fly-through" scenes: plates stacked in depth that the camera
 * pushes into as `p` (0 → 1) advances, with a little pointer drift on top.
 */

/** Round to 2 decimals so SSR and client serialise identical attribute strings */
export const r2 = (n: number) => Math.round(n * 100) / 100;

/** Deterministic pseudo-random (same on server and client — no hydration mismatch) */
export const rand = (i: number, salt = 1) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/** Viewport height ÷ width, stepped to 0.1. SSR assumes a 16:10 desktop. */
export function useAspect() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    },
    () => Math.round((window.innerHeight / window.innerWidth) * 10) / 10,
    () => 0.6,
  );
}

/** Normalised pointer position (-0.5 … 0.5), springy; stays at 0 on touch devices. */
export function usePointerDrift() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 40, damping: 18 });
  const py = useSpring(my, { stiffness: 40, damping: 18 });
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);
  return { px, py };
}

/**
 * One depth plate. `travel` is how far the camera pushes into it over the scroll — near plates
 * travel far (they fly past), far plates barely move. `depth` scales the pointer drift.
 * `enter`/`exit` fade the plate in/out over a progress range.
 */
export function Plate({
  p,
  px,
  py,
  depth,
  travel,
  enter,
  exit,
  origin = "50% 58%",
  className,
  children,
}: {
  p: MotionValue<number>;
  px: MotionValue<number>;
  py: MotionValue<number>;
  depth: number;
  travel: number;
  enter?: [number, number];
  exit?: [number, number];
  origin?: string;
  className?: string;
  children: ReactNode;
}) {
  const scale = useTransform(p, (v) => 1 + v * v * travel + v * 0.15);
  const inOpacity = useScrub(p, enter ?? [0, 1], enter ? [0, 1] : [1, 1]);
  const outOpacity = useScrub(p, exit ?? [0, 1], exit ? [1, 0] : [1, 1]);
  const opacity = useTransform([inOpacity, outOpacity], ([a, b]: number[]) => a * b);
  // Fully faded plates are taken out of rendering entirely (big win on weak GPUs)
  const visibility = useTransform(opacity, (o) => (o < 0.005 ? "hidden" : "visible"));
  const x = useTransform(px, (v) => v * -90 * depth);
  const y = useTransform(py, (v) => v * -60 * depth);
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute -inset-[6%] will-change-transform ${className ?? ""}`}
      style={{ scale, opacity, x, y, visibility, transformOrigin: origin }}
    >
      {children}
    </motion.div>
  );
}

/** Cuts an arch-shaped window (flat bottom, round top) out of a plate. Units are % of the plate. */
export function Masked({
  arch,
  children,
}: {
  arch: { halfWidth: number; top: number; bottom: number; blur: number };
  children: ReactNode;
}) {
  const { halfWidth: w, top, bottom, blur } = arch;
  const l = 50 - w;
  const r = 50 + w;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><filter id='b' x='-20%' y='-20%' width='140%' height='140%'><feGaussianBlur stdDeviation='${blur}'/></filter><path filter='url(#b)' fill='#000' fill-rule='evenodd' d='M-20 -20H120V120H-20Z M${l} ${bottom}V${top + w}A${w} ${w} 0 0 1 ${r} ${top + w}V${bottom}Z'/></svg>`;
  const mask = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  return (
    <div
      className="absolute inset-0"
      style={{ maskImage: mask, WebkitMaskImage: mask, maskSize: "100% 100%", WebkitMaskSize: "100% 100%", maskRepeat: "no-repeat" }}
    >
      {children}
    </div>
  );
}
