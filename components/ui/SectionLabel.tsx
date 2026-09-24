import clsx from "clsx";

export function SectionLabel({
  index,
  children,
  className,
  tone = "dark",
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <p className={clsx("eyebrow flex items-center gap-3", tone === "dark" ? "text-muted" : "text-ink/60", className)}>
      {index && <span className="text-marigold">({index})</span>}
      <span className={clsx("h-px w-8", tone === "dark" ? "bg-bone/25" : "bg-ink/25")} />
      {children}
    </p>
  );
}
