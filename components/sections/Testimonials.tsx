import Image from "next/image";
import { testimonials } from "@/data/testimonials";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/animation/Reveal";

/** Genuine testimonials only. Renders nothing until real ones are added to data/testimonials.ts. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="bg-ink py-24 sm:py-32" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionLabel index="09">Kind words</SectionLabel>
        <h2 id="testimonials-heading" className="display mt-6 text-[clamp(2.6rem,6vw,6rem)]">
          In their <span className="font-serif font-normal italic text-marigold">words.</span>
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <figure className="flex h-full flex-col justify-between rounded-[1.75rem] border border-bone/10 bg-ink-2 p-8">
                <blockquote className="text-pretty text-xl leading-snug">“{t.content}”</blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  {t.image && (
                    <span className="relative h-12 w-12 overflow-hidden rounded-full">
                      <Image src={t.image} alt="" fill sizes="48px" className="object-cover" />
                    </span>
                  )}
                  <span>
                    <span className="block font-medium">{t.name}</span>
                    <span className="block text-sm text-muted">{[t.role, t.event].filter(Boolean).join(" · ")}</span>
                    {t.source && (
                      <a href={t.source.href} className="eyebrow mt-1 block text-marigold" target="_blank" rel="noopener noreferrer">
                        {t.source.label}
                      </a>
                    )}
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
