"use client";

import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { img } from "@/data/images";
import { site } from "@/data/site";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { useScrub } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Fly-through hero: plates stacked in depth. Scrolling flies the camera through a floral arch
 * toward the lit stage — the nearest garlands leave frame first — and the pointer adds drift.
 */
export function Hero() {
  const reduce = usePrefersReducedMotion();
  return reduce ? <StaticHero /> : <FlyThroughHero />;
}

function FlyThroughHero() {
  const ref = useRef<HTMLElement>(null);
  const aspect = useAspect();
  const portrait = aspect > 1.1;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // A little inertia on the camera, so the flight feels weighted
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.35 });

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

  const introOpacity = useScrub(p, [0, 0.22], [1, 0]);
  const introY = useScrub(p, [0, 0.22], [0, -60]);
  const cueOpacity = useScrub(p, [0, 0.06], [1, 0]);
  const outroOpacity = useScrub(p, [0.72, 0.86], [0, 1]);
  const outroScale = useScrub(p, [0.72, 1], [0.9, 1]);
  const vignette = useScrub(p, [0, 0.6, 1], [0.75, 0.35, 0.55]);

  return (
    <section ref={ref} className="relative h-[340vh] bg-ink lg:h-[460vh]" aria-label="Introduction">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Plates — far to near */}
        <Plate p={p} px={px} py={py} depth={0.06} travel={0.35}>
          <Image src={img.stageBeams} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-ink/35" />
        </Plate>

        <Plate p={p} px={px} py={py} depth={0.12} travel={0.6} className="mix-blend-screen">
          <LightRays />
        </Plate>

        <Plate p={p} px={px} py={py} depth={0.3} travel={2.4} exit={[0.8, 0.95]}>
          <Masked arch={portrait ? { halfWidth: 38, top: 30, bottom: 104, blur: 0.35 } : { halfWidth: 21, top: 24, bottom: 104, blur: 0.35 }}>
            <Image src={img.mandap} alt="" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-b from-ink/30 via-transparent to-ink/60" />
          </Masked>
        </Plate>

        <Plate p={p} px={px} py={py} depth={0.45} travel={3}>
          <Sparkles />
        </Plate>

        <Plate p={p} px={px} py={py} depth={0.6} travel={5} exit={[0.5, 0.7]} className="brightness-[.7] blur-[1px]">
          <Garlands variant="far" aspect={aspect} />
        </Plate>

        <Plate p={p} px={px} py={py} depth={0.85} travel={8} exit={[0.3, 0.48]}>
          <Garlands variant="near" aspect={aspect} />
        </Plate>

        <Plate p={p} px={px} py={py} depth={1} travel={12} exit={[0.14, 0.3]}>
          <Bokeh />
        </Plate>

        {/* Readability */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,transparent_25%,#0b0a08_90%)]"
          style={{ opacity: vignette }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink via-ink/60 to-transparent" />

        {/* Opening copy — on screen from the first frame */}
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-24 sm:px-8 sm:pb-28"
        >
          <p className="anim-fade-up eyebrow mb-6 flex items-center gap-3 text-bone/80">
            <span className="h-px w-10 bg-marigold" />
            {site.descriptor}
          </p>
          <h1 className="display text-[clamp(3.4rem,12vw,12rem)]">
            <span className="sr-only">Maitreya Events — We create. You celebrate.</span>
            <HeroLine delay={0.05}>We create.</HeroLine>
            <HeroLine delay={0.22} className="font-serif font-normal italic tracking-[-0.03em] text-marigold">
              You celebrate.
            </HeroLine>
          </h1>
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="anim-fade-up max-w-md text-pretty text-base leading-relaxed text-bone/80 sm:text-lg" style={delay(0.55)}>
              End-to-end event management, entertainment and production for weddings, celebrations, corporate events,
              cultural programmes and live experiences.
            </p>
            <div className="anim-fade-up flex flex-wrap gap-3" style={delay(0.7)}>
              <Button href="/contact" size="lg" trackAs="plan_event_click" icon={<ArrowIcon />}>
                Plan your event
              </Button>
              <Button href="/portfolio" size="lg" variant="ghost" trackAs="explore_events_click">
                Explore our events
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Arrival */}
        <motion.div
          style={{ opacity: outroOpacity, scale: outroScale }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center"
        >
          <p className="eyebrow text-marigold">Weddings · Corporate · Cultural · Live</p>
          <p className="display mt-5 text-[clamp(3rem,10vw,10rem)] drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            Step into <span className="font-serif font-normal italic text-marigold">the celebration.</span>
          </p>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-8 right-5 z-10 hidden items-center gap-3 sm:right-8 sm:flex"
        >
          <span className="eyebrow text-bone/60">Scroll to enter</span>
          <span className="relative block h-12 w-px overflow-hidden bg-bone/15">
            <span className="scroll-cue-line absolute inset-0 bg-marigold" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/** Viewport height ÷ width, stepped to 0.1. SSR assumes a 16:10 desktop. */
function useAspect() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    },
    () => Math.round((window.innerHeight / window.innerWidth) * 10) / 10,
    () => 0.6,
  );
}

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/**
 * One depth plate. `travel` is how far the camera pushes into it over the whole scroll —
 * near plates travel far (they fly past), far plates barely move. `depth` scales pointer drift.
 */
function Plate({
  p,
  px,
  py,
  depth,
  travel,
  exit,
  className,
  children,
}: {
  p: MotionValue<number>;
  px: MotionValue<number>;
  py: MotionValue<number>;
  depth: number;
  travel: number;
  exit?: [number, number];
  className?: string;
  children: ReactNode;
}) {
  const scale = useTransform(p, (v) => 1 + v * v * travel + v * 0.15);
  const opacity = useScrub(p, exit ?? [0, 1], exit ? [1, 0] : [1, 1]);
  const x = useTransform(px, (v) => v * -90 * depth);
  const y = useTransform(py, (v) => v * -60 * depth);
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute -inset-[6%] origin-[50%_58%] will-change-transform ${className ?? ""}`}
      style={{ scale, opacity, x, y }}
    >
      {children}
    </motion.div>
  );
}

/** Cuts an arch-shaped window (flat bottom, round top) out of a plate. Units are % of the plate. */
function Masked({
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

function LightRays() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-[-20%] h-[140%] w-[140%] -translate-x-1/2 animate-[rays_14s_ease-in-out_infinite_alternate] opacity-60"
        style={{
          background:
            "repeating-conic-gradient(from 168deg at 50% 0%, rgba(255,214,150,0.0) 0deg, rgba(255,214,150,0.22) 2deg, rgba(255,214,150,0) 5deg, rgba(255,214,150,0) 9deg)",
          maskImage: "radial-gradient(ellipse 45% 75% at 50% 0%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 45% 75% at 50% 0%, #000 20%, transparent 75%)",
        }}
      />
      <div className="absolute left-1/2 top-[52%] h-[55vmin] w-[55vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(247,194,124,0.55),transparent_65%)] blur-2xl" />
    </div>
  );
}

/** Round to 2 decimals so SSR and client serialise identical attribute strings */
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Deterministic pseudo-random (same on server and client — no hydration mismatch) */
const rand = (i: number, salt = 1) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function Sparkles() {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: 46 }).map((_, i) => {
        const size = r2(2 + rand(i, 3) * 4);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-marigold-soft animate-[float_linear_infinite]"
            style={{
              left: `${r2(8 + rand(i, 1) * 84)}%`,
              top: `${r2(10 + rand(i, 2) * 80)}%`,
              width: size,
              height: size,
              opacity: r2(0.35 + rand(i, 4) * 0.55),
              boxShadow: `0 0 ${size * 3}px rgba(247,194,124,0.9)`,
              animationDuration: `${r2(7 + rand(i, 5) * 9)}s`,
              animationDelay: `${r2(-rand(i, 6) * 12)}s`,
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * Marigold toran curtain framing the arch: a scalloped swag across the top and dense strands
 * down both sides, longest at the edges. `far` is a smaller, sparser copy for extra depth.
 */
function Garlands({ variant, aspect }: { variant: "near" | "far"; aspect: number }) {
  const near = variant === "near";
  // The SVG stretches to the viewport; k undoes the vertical stretch so flowers stay round
  const k = Math.max(1, aspect / 0.6);
  const portrait = k > 1.6;
  const step = (near ? 2.6 : 3.4) * (portrait ? 2.2 : 1);
  const flower = (near ? 1.25 : 0.9) * (portrait ? 2.2 : 1);
  const strands: { x: number; len: number }[] = [];
  for (let x = 1; x < 100; x += step) {
    const edge = Math.min(x, 100 - x); // distance from the nearest side
    if (edge > (portrait ? (near ? 12 : 16) : near ? 27 : 32)) continue; // keep the centre open
    const len = Math.round(((near ? 30 : 24) - edge * (near ? 0.85 : 0.6) * (portrait ? 2 : 1) + rand(Math.round(x * 10), 7) * 5) * (portrait ? k / 2.2 : 1));
    strands.push({ x: r2(x), len: Math.max(4, len) });
  }
  const swag = Math.round(100 / (flower * 1.6));

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id={`mg-${variant}`} cx="42%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#ffd98a" />
          <stop offset="45%" stopColor="#f4a340" />
          <stop offset="100%" stopColor="#b9480f" />
        </radialGradient>
        <radialGradient id={`my-${variant}`} cx="42%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#fff3b0" />
          <stop offset="50%" stopColor="#f6c343" />
          <stop offset="100%" stopColor="#b8780c" />
        </radialGradient>
      </defs>
      {Array.from({ length: swag + 1 }).map((_, i) => {
        const t = i / swag;
        const y = r2((2 + Math.abs(Math.sin(t * Math.PI * 4)) * 6) / k);
        return <Marigold key={`s${i}`} x={r2(t * 100)} y={y} r={flower * 1.15} k={k} fill={`url(#${i % 3 ? "mg" : "my"}-${variant})`} />;
      })}
      {strands.map((st, si) =>
        Array.from({ length: st.len }).map((_, j) => {
          const leaf = j > 0 && j % 5 === 0;
          const x = r2(st.x + Math.sin(j * 0.55 + si) * 0.35);
          const y = r2((6 + j * flower * 1.9) / k);
          return leaf ? (
            <ellipse key={`l${si}-${j}`} cx={x} cy={y} rx={r2(flower * 0.45)} ry={r2((flower * 1.1) / k)} fill="#2f6b2a" />
          ) : (
            <Marigold key={`f${si}-${j}`} x={x} y={y} r={flower} k={k} fill={`url(#${(si + j) % 3 ? "mg" : "my"}-${variant})`} />
          );
        }),
      )}
    </svg>
  );
}

/** A marigold head: gradient body with a ring of darker petal edges */
function Marigold({ x, y, r, k, fill }: { x: number; y: number; r: number; k: number; fill: string }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={r2(r)} ry={r2((r * 1.55) / k)} fill={fill} />
      <ellipse cx={x} cy={y} rx={r2(r * 0.72)} ry={r2((r * 1.1) / k)} fill="none" stroke="#a8400c" strokeOpacity={0.35} strokeWidth={0.18} />
    </g>
  );
}

/** Out-of-focus marigolds right in front of the lens */
function Bokeh() {
  const blobs = [
    { l: -4, t: 62, s: 26 },
    { l: 82, t: 70, s: 30 },
    { l: 88, t: 8, s: 18 },
    { l: -6, t: 4, s: 20 },
    { l: 70, t: 88, s: 16 },
    { l: 12, t: 90, s: 14 },
  ];
  return (
    <div className="absolute inset-0">
      {blobs.map((b, i) => (
        <span
          key={i}
          className="absolute rounded-full blur-2xl"
          style={{
            left: `${b.l}%`,
            top: `${b.t}%`,
            width: `${b.s}vmax`,
            height: `${b.s}vmax`,
            background: `radial-gradient(circle, ${i % 2 ? "rgba(245,197,66,0.55)" : "rgba(244,163,64,0.6)"}, transparent 70%)`,
          }}
        />
      ))}
    </div>
  );
}

function HeroLine({ children, delay: d, className }: { children: string; delay: number; className?: string }) {
  return (
    <span aria-hidden className={`block overflow-hidden pb-[0.06em] ${className ?? ""}`}>
      {children.split("").map((ch, i) => (
        <span key={i} className="anim-rise" style={{ "--d": `${d + i * 0.028}s` } as CSSProperties}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}

/** Reduced motion: a single still composition, same copy and CTAs. */
function StaticHero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink" aria-label="Introduction">
      <Image src={img.mandap} alt="Decorated wedding mandap stage with floral canopy" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/50 to-ink/30" />
      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-24 sm:px-8">
        <h1 className="display text-[clamp(3.4rem,12vw,12rem)]">
          We create.
          <span className="block font-serif font-normal italic text-marigold">You celebrate.</span>
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/contact" size="lg" trackAs="plan_event_click" icon={<ArrowIcon />}>
            Plan your event
          </Button>
          <Button href="/portfolio" size="lg" variant="ghost" trackAs="explore_events_click">
            Explore our events
          </Button>
        </div>
      </div>
    </section>
  );
}
