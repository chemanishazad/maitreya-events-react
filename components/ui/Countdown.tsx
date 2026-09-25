"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSyncExternalStore } from "react";
import clsx from "clsx";

// One shared 1-second clock for every countdown on the page
let now = 0;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;
function subscribe(cb: () => void) {
  listeners.add(cb);
  if (!timer) {
    now = Date.now();
    timer = setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(cb);
    if (!listeners.size && timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}
const getNow = () => now || Date.now();
const getServerNow = () => 0; // render placeholders on the server

/** Live countdown with rolling digits. `target` is an ISO date(-time). */
export function Countdown({ target, className, tone = "dark" }: { target: string; className?: string; tone?: "dark" | "light" }) {
  const t = useSyncExternalStore(subscribe, getNow, getServerNow);
  const end = new Date(target.length === 10 ? `${target}T00:00:00+05:30` : target).getTime();
  const diff = t ? Math.max(0, end - t) : null;

  const parts = [
    { label: "Days", value: diff === null ? null : Math.floor(diff / 86_400_000) },
    { label: "Hours", value: diff === null ? null : Math.floor(diff / 3_600_000) % 24 },
    { label: "Mins", value: diff === null ? null : Math.floor(diff / 60_000) % 60 },
    { label: "Secs", value: diff === null ? null : Math.floor(diff / 1000) % 60 },
  ];

  return (
    <div className={clsx("flex gap-3 sm:gap-4", className)} role="timer" aria-live="off">
      {parts.map((p) => (
        <div
          key={p.label}
          className={clsx(
            "flex min-w-[4.5rem] flex-col items-center rounded-2xl px-3 py-3 sm:min-w-[5.5rem]",
            tone === "dark" ? "glass-flat" : "bg-ink text-bone",
          )}
        >
          <span className="display flex h-[1.1em] overflow-hidden text-4xl tabular-nums sm:text-5xl">
            {String(p.value ?? "--").padStart(2, "0").split("").map((d, i) => (
              <Digit key={i} d={d} />
            ))}
          </span>
          <span className="nav-link mt-1 !text-[0.55rem] opacity-60">{p.label}</span>
        </div>
      ))}
    </div>
  );
}

function Digit({ d }: { d: string }) {
  return (
    <span className="relative inline-block w-[0.62em] text-center">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={d}
          className="inline-block"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {d}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
