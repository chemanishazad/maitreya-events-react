import { r2, rand } from "@/components/animation/Depth";

/** Original scene artwork for the fly-through plates (pure CSS/SVG — no image assets). */

export function LightRays({ tint = "255,214,150" }: { tint?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-[-20%] h-[140%] w-[140%] -translate-x-1/2 animate-[rays_14s_ease-in-out_infinite_alternate] opacity-60"
        style={{
          background: `repeating-conic-gradient(from 168deg at 50% 0%, rgba(${tint},0) 0deg, rgba(${tint},0.22) 2deg, rgba(${tint},0) 5deg, rgba(${tint},0) 9deg)`,
          maskImage: "radial-gradient(ellipse 45% 75% at 50% 0%, #000 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 45% 75% at 50% 0%, #000 20%, transparent 75%)",
        }}
      />
      <div className="absolute left-1/2 top-[52%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(247,194,124,0.45),rgba(247,194,124,0.12)_40%,transparent_68%)]" />
    </div>
  );
}

export function Sparkles({ count = 28 }: { count?: number }) {
  return (
    <div className="absolute inset-0">
      {Array.from({ length: count }).map((_, i) => {
        const size = r2(6 + rand(i, 3) * 10);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-[radial-gradient(circle,#fff3cf_0%,rgba(247,194,124,0.9)_18%,rgba(247,194,124,0)_65%)] animate-[float_linear_infinite]"
            style={{
              left: `${r2(8 + rand(i, 1) * 84)}%`,
              top: `${r2(10 + rand(i, 2) * 80)}%`,
              width: size,
              height: size,
              opacity: r2(0.35 + rand(i, 4) * 0.55),
              animationDuration: `${r2(7 + rand(i, 5) * 9)}s`,
              animationDelay: `${r2(-rand(i, 6) * 12)}s`,
            }}
          />
        );
      })}
    </div>
  );
}

/** Stage haze the camera passes through between scenes */
export function Haze() {
  const puffs = [
    { l: 50, t: 55, w: 120, o: 0.85 },
    { l: 20, t: 40, w: 70, o: 0.6 },
    { l: 80, t: 45, w: 75, o: 0.6 },
    { l: 35, t: 80, w: 80, o: 0.7 },
    { l: 70, t: 78, w: 85, o: 0.7 },
  ];
  return (
    <div className="absolute inset-0">
      {puffs.map((f, i) => (
        <span
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: `${f.l}%`,
            top: `${f.t}%`,
            width: `${f.w}vmax`,
            height: `${f.w * 0.6}vmax`,
            opacity: f.o,
            background: "radial-gradient(ellipse, rgba(255,236,210,0.9), rgba(255,224,180,0.55) 30%, rgba(247,194,124,0.2) 55%, transparent 72%)",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Marigold toran curtain framing the arch: a scalloped swag across the top and dense strands
 * down both sides, longest at the edges. `far` is a smaller, sparser copy for extra depth.
 */
export function Garlands({ variant, aspect }: { variant: "near" | "far"; aspect: number }) {
  const near = variant === "near";
  // The SVG stretches to the viewport; k undoes the vertical stretch so flowers stay round
  const k = Math.max(1, aspect / 0.6);
  const portrait = k > 1.6;
  const step = (near ? 3.1 : 4.3) * (portrait ? 2.2 : 1);
  const flower = (near ? 1.25 : 0.9) * (portrait ? 2.2 : 1);
  const strands: { x: number; len: number }[] = [];
  for (let x = 1; x < 100; x += step) {
    const edge = Math.min(x, 100 - x); // distance from the nearest side
    if (edge > (portrait ? (near ? 12 : 16) : near ? 27 : 32)) continue; // keep the centre open
    const len = Math.round(
      ((near ? 30 : 24) - edge * (near ? 0.85 : 0.6) * (portrait ? 2 : 1) + rand(Math.round(x * 10), 7) * 5) *
        (portrait ? k / 2.2 : 1),
    );
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
export function Bokeh() {
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
          className="absolute rounded-full"
          style={{
            left: `${b.l}%`,
            top: `${b.t}%`,
            width: `${b.s}vmax`,
            height: `${b.s}vmax`,
            background: `radial-gradient(circle, ${i % 2 ? "rgba(245,197,66,0.5)" : "rgba(244,163,64,0.55)"}, ${i % 2 ? "rgba(245,197,66,0.18)" : "rgba(244,163,64,0.2)"} 38%, transparent 68%)`,
          }}
        />
      ))}
    </div>
  );
}
