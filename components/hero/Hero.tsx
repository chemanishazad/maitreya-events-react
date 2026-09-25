"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { img } from "@/data/images";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { upcomingEvents, formatDate } from "@/data/events";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { Masked, Plate, useAspect, usePointerDrift } from "@/components/animation/Depth";
import { Bokeh, Garlands, Haze, LightRays, Sparkles } from "./SceneArt";
import { useScrub } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Fly-through hero. Scene one: through a marigold toran and a floral mandap arch toward the lit
 * stage. The camera passes through stage haze into scene two — the celebration — where the
 * event worlds wait as glass cards. Pointer adds drift to every plate.
 */
export function Hero() {
  const reduce = usePrefersReducedMotion();
  return reduce ? <StaticHero /> : <FlyThroughHero />;
}

const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

function FlyThroughHero() {
  const ref = useRef<HTMLElement>(null);
  const aspect = useAspect();
  const portrait = aspect > 1.1;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Smooth scrolling already eases the camera — no extra spring, so the flight tracks the scroll 1:1
  const p = scrollYProgress;
  const { px, py } = usePointerDrift();

  const introOpacity = useScrub(p, [0, 0.16], [1, 0]);
  const introY = useScrub(p, [0, 0.16], [0, -50]);
  const cueOpacity = useScrub(p, [0, 0.05], [1, 0]);
  const arrival = useScrub(p, [0.66, 0.8], [0, 1]);
  const arrivalY = useScrub(p, [0.66, 0.86], [40, 0]);
  const arrivalEvents = useTransform(arrival, (v) => (v > 0.6 ? "auto" : "none"));
  const vignette = useScrub(p, [0, 0.5, 1], [0.75, 0.3, 0.45]);

  return (
    <section ref={ref} className="relative h-[380vh] bg-ink lg:h-[500vh]" aria-label="Introduction">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* ── Scene one: the arch ─────────────────────────── far → near */}
        <Plate p={p} px={px} py={py} depth={0.06} travel={0.5} exit={[0.55, 0.64]}>
          <Image src={img.stageBeams} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-ink/35" />
        </Plate>
        <Plate p={p} px={px} py={py} depth={0.12} travel={0.8} exit={[0.55, 0.64]} className="opacity-80">
          <LightRays />
        </Plate>
        <Plate p={p} px={px} py={py} depth={0.3} travel={2.6} exit={[0.46, 0.58]}>
          <Masked arch={portrait ? { halfWidth: 38, top: 30, bottom: 104, blur: 0.35 } : { halfWidth: 21, top: 24, bottom: 104, blur: 0.35 }}>
            <Image src={img.mandap} alt="" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-b from-ink/30 via-transparent to-ink/60" />
          </Masked>
        </Plate>
        <Plate p={p} px={px} py={py} depth={0.45} travel={3.2} exit={[0.5, 0.62]}>
          <Sparkles />
        </Plate>
        <Plate p={p} px={px} py={py} depth={0.6} travel={5} exit={[0.36, 0.5]}>
          <div className="absolute inset-0 opacity-55">
            <Garlands variant="far" aspect={aspect} />
          </div>
        </Plate>
        <Plate p={p} px={px} py={py} depth={0.85} travel={8} exit={[0.22, 0.36]}>
          <Garlands variant="near" aspect={aspect} />
        </Plate>
        <Plate p={p} px={px} py={py} depth={1} travel={12} exit={[0.1, 0.22]}>
          <Bokeh />
        </Plate>

        {/* ── Scene two: the celebration ──────────────────── revealed through the haze */}
        <Plate p={p} px={px} py={py} depth={0.08} travel={-0.12} enter={[0.54, 0.66]} origin="50% 50%">
          <Image src={img.confettiConcert} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-b from-ink/50 via-ink/20 to-ink/80" />
        </Plate>
        <Plate p={p} px={px} py={py} depth={0.3} travel={0.6} enter={[0.6, 0.72]}>
          <Sparkles count={30} />
        </Plate>

        {/* Stage haze between the two scenes */}
        <Plate p={p} px={px} py={py} depth={0.5} travel={2} enter={[0.4, 0.54]} exit={[0.6, 0.72]} origin="50% 50%">
          <Haze />
        </Plate>

        {/* Readability */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,transparent_25%,#0b0a08_92%)]"
          style={{ opacity: vignette }}
        />
        <motion.div
          aria-hidden
          style={{ opacity: introOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-ink via-ink/55 to-transparent"
        />

        {/* ── Opening copy — on screen from the first frame ── */}
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="relative z-10 mx-auto flex h-full max-w-[1600px] items-end justify-between gap-10 px-5 pb-20 sm:px-8 sm:pb-24"
        >
          <div className="max-w-2xl">
            <p className="anim-fade-up nav-link mb-5 flex items-center gap-3 text-bone/75">
              <span className="h-px w-10 bg-marigold" />
              {site.descriptor}
            </p>
            <h1 className="display whitespace-nowrap text-[12.5vw] leading-[0.92] sm:text-[clamp(2.7rem,6.4vw,7rem)]">
              <span className="sr-only">Maitreya Events — Event Management Company in Chennai. We create. You celebrate.</span>
              <HeroLine delay={0.05}>
                We create<span className="ml-[0.15em] inline-block translate-y-[-0.08em] text-[0.55em] text-marigold">›</span>
              </HeroLine>
              <HeroLine delay={0.2} className="italic text-marigold">
                you
              </HeroLine>
              <HeroLine delay={0.3}>celebrate.</HeroLine>
            </h1>
            <p className="anim-fade-up mt-6 max-w-md text-pretty text-sm leading-relaxed text-bone/75 sm:text-base" style={delay(0.55)}>
              End-to-end event management, entertainment and production for weddings, celebrations, corporate events,
              cultural programmes and live experiences.
            </p>
            <div className="anim-fade-up mt-7 flex flex-wrap gap-3" style={delay(0.7)}>
              <Button href="/contact" trackAs="plan_event_click" icon={<ArrowIcon />}>
                Plan your event
              </Button>
              <Button href="/portfolio" variant="ghost" trackAs="explore_events_click">
                Explore our events
              </Button>
            </div>
          </div>

          <HeroCards />
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        >
          <span className="nav-link text-bone/60">Enter</span>
          <svg viewBox="0 0 16 16" className="h-4 w-4 animate-bounce text-marigold" aria-hidden>
            <path d="M3 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* ── Arrival ─────────────────────────────────────── */}
        <motion.div
          style={{ opacity: arrival, y: arrivalY, pointerEvents: arrivalEvents }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center"
        >
          <p className="nav-link text-marigold">Eight event worlds · one team</p>
          <p className="display mt-4 text-[clamp(2.6rem,7.5vw,7.5rem)] drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            Step into <span className="italic text-marigold">the</span> celebration
          </p>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-sm text-bone/80 sm:text-base">
            Weddings, corporate shows, cultural festivals and live nights — planned, produced and run by one crew.
          </p>
          <ArrivalCards p={p} />
        </motion.div>
      </div>
    </section>
  );
}

/** Frosted media cards, bottom-right of the first frame */
function HeroCards() {
  const next = upcomingEvents[0];
  return (
    <div className="anim-fade-up hidden shrink-0 gap-3 lg:flex" style={delay(0.85)}>
      <Link href="/portfolio" className="group glass-flat relative h-44 w-36 overflow-hidden rounded-2xl xl:h-48 xl:w-40">
        <Image src={img.weddingCelebration} alt="" fill sizes="160px" className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-110" />
        <span className="absolute inset-x-3 bottom-3 flex items-center gap-2 text-xs font-medium">
          <span className="glass-flat flex h-7 w-7 items-center justify-center rounded-full">
            <svg viewBox="0 0 16 16" className="ml-0.5 h-3 w-3" aria-hidden>
              <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
            </svg>
          </span>
          See the work
        </span>
      </Link>
      <Link href="/services" className="glass-flat flex h-44 w-36 flex-col justify-end rounded-2xl p-4 transition-transform duration-500 hover:-translate-y-1 xl:h-48 xl:w-40">
        <span className="display text-5xl">{String(services.length).padStart(2, "0")}</span>
        <span className="mt-1 text-xs font-medium text-bone/80">Event worlds</span>
      </Link>
      {next && (
        <Link href={`/events/${next.slug}`} className="group glass-flat relative h-44 w-36 overflow-hidden rounded-2xl xl:h-48 xl:w-40">
          <Image src={next.heroImage} alt="" fill sizes="160px" className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-110" />
          <span className="absolute inset-x-3 bottom-3 text-left text-xs font-medium leading-tight">
            <span className="nav-link block !text-[0.55rem] text-marigold">Next up · {formatDate(next.date, { day: "numeric", month: "short" })}</span>
            {next.title}
          </span>
        </Link>
      )}
    </div>
  );
}

/** Fanned glass cards at the end of the flight — side cards sit back and blur */
function ArrivalCards({ p }: { p: MotionValue<number> }) {
  const picks = services.slice(0, 5);
  const tints = [
    "from-[#fff1d6] to-[#f3c98f]",
    "from-[#fde7e0] to-[#e9b3ae]",
    "from-[#fff7e8] to-[#f6dcae]",
    "from-[#f3e8ff] to-[#cdb9ea]",
    "from-[#e6f4ff] to-[#b3cfe8]",
  ];
  const order = [3, 1, 0, 2, 4]; // Weddings in the centre
  return (
    <div className="relative mt-10 flex h-[46vh] max-h-[360px] min-h-[240px] w-full max-w-5xl items-center justify-center">
      {order.map((idx, slot) => {
        const s = picks[idx];
        if (!s) return null;
        const offset = slot - 2;
        return <ArrivalCard key={s.slug} p={p} offset={offset} index={idx} service={s} tint={tints[slot]} />;
      })}
    </div>
  );
}

function ArrivalCard({
  p,
  offset,
  index,
  service,
  tint,
}: {
  p: MotionValue<number>;
  offset: number;
  index: number;
  service: (typeof services)[number];
  tint: string;
}) {
  const abs = Math.abs(offset);
  const start = 0.7 + abs * 0.04;
  const rise = useScrub(p, [start, start + 0.12], [120, 0]);
  const fade = useScrub(p, [start, start + 0.1], [0, 1]);
  const side = abs === 2;
  return (
    <motion.div
      style={{ y: rise, opacity: fade, x: `${offset * (side ? 92 : 104)}%`, zIndex: 10 - abs }}
      className={`absolute ${side ? "hidden scale-75 opacity-70 md:block" : abs === 1 ? "scale-90" : ""}`}
    >
      <Link
        href={`/services/${service.slug}`}
        tabIndex={side ? -1 : undefined}
        aria-hidden={side || undefined}
        className={`group flex h-[40vh] max-h-[300px] min-h-[210px] w-[34vw] max-w-[220px] flex-col justify-between rounded-3xl border border-white/40 bg-linear-to-br ${tint} p-5 text-left text-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:-translate-y-2`}
      >
        <span className="flex items-center justify-between">
          <span className="font-mono text-[0.65rem] tracking-widest text-ink/60">{String(index + 1).padStart(2, "0")}</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/70 transition-transform duration-500 group-hover:rotate-[-45deg]">
            <ArrowIcon className="h-3.5 w-3.5" />
          </span>
        </span>
        <span>
          <span className="block font-serif text-lg leading-[1.05] sm:text-2xl md:text-[1.7rem]">{service.title}</span>
          <span className="mt-2 hidden text-xs leading-snug text-ink/65 sm:block">{service.kicker}</span>
        </span>
      </Link>
    </motion.div>
  );
}

function HeroLine({ children, delay: d, className }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span aria-hidden className={`block overflow-hidden pb-[0.04em] ${className ?? ""}`}>
      <span className="anim-rise" style={delay(d)}>
        {children}
      </span>
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
        <h1 className="display text-[clamp(3.2rem,9.5vw,9.5rem)]">
          We create
          <span className="block italic text-marigold">you</span>
          celebrate.
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
