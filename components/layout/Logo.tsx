import Link from "next/link";
import clsx from "clsx";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Maitreya Events — home" className={clsx("group flex items-center gap-2.5", className)}>
      <LogoMark className="h-8 w-8 transition-transform duration-700 ease-expo group-hover:rotate-[180deg]" />
      <span className="flex flex-col leading-none">
        <span className="text-[1.05rem] font-semibold tracking-[-0.03em]">MAITREYA</span>
        <span className="eyebrow mt-0.5 !text-[0.55rem] !tracking-[0.42em] text-muted">EVENTS</span>
      </span>
    </Link>
  );
}

/** Marigold "bloom" mark: eight petals around a centre, echoing a kolam. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <g fill="none" stroke="#f4a340" strokeWidth="1.6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={i} cx="16" cy="9" rx="3.2" ry="6.4" transform={`rotate(${i * 45} 16 16)`} />
        ))}
      </g>
      <circle cx="16" cy="16" r="2.6" fill="#f4a340" />
    </svg>
  );
}
