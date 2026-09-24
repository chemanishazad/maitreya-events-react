import Link from "next/link";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { services } from "@/data/services";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink px-5 pt-28 sm:px-8">
      <div
        aria-hidden
        className="display pointer-events-none absolute -right-[4vw] bottom-[-6vw] select-none text-[42vw] leading-none text-bone/[0.04]"
      >
        404
      </div>
      <div className="relative mx-auto w-full max-w-[1600px]">
        <p className="eyebrow text-marigold">Error 404</p>
        <h1 className="display mt-6 text-[clamp(3rem,10vw,9rem)]">
          This stage <span className="font-serif font-normal italic text-marigold">is empty.</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg text-bone/70">The page you&apos;re looking for has moved or never existed. Try one of these instead.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/" size="lg" icon={<ArrowIcon />}>
            Back to home
          </Button>
          <Button href="/contact" size="lg" variant="ghost">
            Plan your event
          </Button>
        </div>
        <ul className="mt-14 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="hover:text-marigold">
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
