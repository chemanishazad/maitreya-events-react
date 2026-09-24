"use client";

import { transform, useTransform, type MotionValue } from "motion/react";

/**
 * Scroll-scrubbed value mapping (clamped). Equivalent to `useTransform(value, input, output)`,
 * but always computed in JS: Motion otherwise hands array-form scroll transforms to native
 * ScrollTimeline, which mis-renders sub-range mappings (e.g. [0, 0.08]) in current Chromium.
 */
export function useScrub(value: MotionValue<number>, input: number[], output: number[]): MotionValue<number>;
export function useScrub(value: MotionValue<number>, input: number[], output: string[]): MotionValue<string>;
export function useScrub(value: MotionValue<number>, input: number[], output: number[] | string[]): MotionValue<number> | MotionValue<string> {
  const map = transform(input, output as number[]) as (v: number) => number | string;
  return useTransform(value, (v: number) => map(v)) as MotionValue<number> | MotionValue<string>;
}
