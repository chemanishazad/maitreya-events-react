"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import clsx from "clsx";
import { track } from "@/lib/analytics";

type Variant = "primary" | "ghost" | "light" | "dark";

const styles: Record<Variant, string> = {
  primary: "bg-marigold text-ink",
  ghost: "border border-bone/25 text-bone hover:border-bone/60",
  light: "bg-bone text-ink",
  dark: "bg-ink text-bone",
};

const fill: Record<Variant, string> = {
  primary: "bg-bone",
  ghost: "bg-bone",
  light: "bg-marigold",
  dark: "bg-marigold",
};

const fillText: Record<Variant, string> = {
  primary: "group-hover:text-ink",
  ghost: "group-hover:text-ink",
  light: "group-hover:text-ink",
  dark: "group-hover:text-ink",
};

/**
 * Pill button with a subtle magnetic pull and a fill that rises on hover.
 * Renders a Next <Link> for internal hrefs and <a> for external/tel/wa links.
 */
export function Button({
  href,
  children,
  variant = "primary",
  className,
  icon,
  trackAs,
  external,
  onClick,
  type,
  disabled,
  size = "md",
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
  trackAs?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  size?: "md" | "lg";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(my, { stiffness: 200, damping: 15, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const handleClick = () => {
    if (trackAs) track(trackAs, { href });
    onClick?.();
  };

  const inner = (
    <motion.span
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={clsx(
        "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-medium tracking-tight transition-colors duration-500",
        size === "lg" ? "h-16 px-9 text-base" : "h-12 px-6 text-sm",
        styles[variant],
        disabled && "pointer-events-none opacity-60",
        className,
      )}
    >
      <span
        aria-hidden
        className={clsx(
          "absolute inset-0 translate-y-full rounded-[inherit] transition-transform duration-500 ease-expo group-hover:translate-y-0",
          fill[variant],
        )}
      />
      <span className={clsx("relative z-10 flex items-center gap-3 transition-colors duration-500", fillText[variant])}>
        {children}
        {icon && (
          <span className="relative block overflow-hidden">
            <span className="block transition-transform duration-500 ease-expo group-hover:translate-x-[140%]">{icon}</span>
            <span className="absolute inset-0 -translate-x-[140%] transition-transform duration-500 ease-expo group-hover:translate-x-0">
              {icon}
            </span>
          </span>
        )}
      </span>
    </motion.span>
  );

  if (!href) {
    return (
      <button type={type ?? "button"} onClick={handleClick} disabled={disabled} className="inline-flex rounded-full">
        {inner}
      </button>
    );
  }

  const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);
  if (isExternal) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className="inline-flex rounded-full"
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} onClick={handleClick} className="inline-flex rounded-full">
      {inner}
    </Link>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={clsx("h-4 w-4", className)} aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={clsx("h-4 w-4", className)} aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm5.8 14.02c-.24.68-1.42 1.3-1.95 1.35-.5.05-1.13.07-1.83-.12-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.18-4.94-4.37-.14-.19-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.66.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.37-.43.5-.14.14-.29.3-.13.59.17.29.74 1.22 1.59 1.97 1.09.97 2.01 1.27 2.3 1.41.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.65-.14.26.1 1.68.79 1.97.94.29.14.48.22.55.34.07.12.07.7-.17 1.38Z" />
    </svg>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={clsx("h-4 w-4", className)} aria-hidden>
      <path
        d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
