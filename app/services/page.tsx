import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import { img } from "@/data/images";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn } from "@/components/animation/Reveal";
import { CTABand } from "@/components/sections/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Event Management Services in Chennai",
  description:
    "Weddings, corporate events, cultural programmes, private celebrations, live shows, college events and full event production — planned and delivered by Maitreya Events in Chennai.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        lines={["Every kind", "of event."]}
        accentLine={1}
        intro="Eight specialisms, one in-house team. Choose the part you need — or hand us the whole event from concept to celebration."
        image={img.stageBeams}
        crumbs={[{ name: "Services", path: "/services" }]}
      />

      <section className="bg-ink pb-24">
        <ul className="mx-auto max-w-[1600px] px-5 sm:px-8">
          {services.map((s, i) => (
            <FadeIn as="li" key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group grid items-center gap-6 border-t border-bone/10 py-8 transition-colors md:grid-cols-12 md:py-10"
              >
                <span className="eyebrow text-muted md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="display text-[clamp(2.4rem,5.5vw,5.5rem)] transition-all duration-700 ease-expo group-hover:translate-x-3 group-hover:text-marigold md:col-span-5">
                  {s.title}
                </h2>
                <p className="text-pretty text-bone/70 md:col-span-3">{s.blurb}</p>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl md:col-span-3">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(min-width: 768px) 25vw, 100vw"
                    className="object-cover grayscale-[60%] transition-all duration-[1200ms] ease-expo group-hover:scale-110 group-hover:grayscale-0"
                  />
                </div>
              </Link>
            </FadeIn>
          ))}
        </ul>
      </section>

      <CTABand />
    </>
  );
}
