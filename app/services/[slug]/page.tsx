import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getService, services } from "@/data/services";
import { events } from "@/data/events";
import { runOfShow } from "@/data/content";
import { RunOfShow } from "@/components/sections/RunOfShow";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn, ImageReveal, SplitReveal } from "@/components/animation/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Faq } from "@/components/ui/Faq";
import { WorkCard } from "@/components/cards/EventCard";
import { CTABand } from "@/components/sections/CTABand";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { absoluteUrl, faqSchema, JsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({ title: s.seoTitle, description: s.seoDescription, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = events.filter((e) => e.category === service.slug && e.status === "past").slice(0, 2);
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const [first, ...rest] = service.title.split(" ");

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            serviceType: service.title,
            description: service.seoDescription,
            provider: { "@id": `${site.url}/#organization` },
            areaServed: { "@type": "City", name: "Chennai" },
            url: absoluteUrl(`/services/${service.slug}`),
          },
          ...(service.faq.length ? [faqSchema(service.faq)] : []),
        ]}
      />

      <PageHero
        eyebrow={service.kicker}
        lines={rest.length ? [first, rest.join(" ")] : [first]}
        accentLine={rest.length ? 1 : undefined}
        intro={service.blurb}
        image={service.image}
        imageAlt={service.title}
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={`/contact?service=${service.slug}`} size="lg" trackAs="plan_event_click" icon={<ArrowIcon />}>
            Plan your event
          </Button>
        </div>
      </PageHero>

      {/* Intro + occasions */}
      <section className="bg-ink py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            {service.intro.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <p className={i === 0 ? "text-pretty text-2xl leading-snug sm:text-3xl" : "text-pretty text-lg text-bone/70"}>{p}</p>
              </FadeIn>
            ))}
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <SectionLabel>Occasions</SectionLabel>
            <ul className="mt-6 flex flex-wrap gap-2">
              {service.occasions.map((o) => (
                <li key={o} className="rounded-full border border-bone/15 px-4 py-2 text-sm">
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="bg-ink pb-20" aria-label={`${service.title} gallery`}>
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-3 px-5 sm:px-8 md:grid-cols-4">
          {service.gallery.slice(0, 4).map((src, i) => (
            <ImageReveal key={src} delay={i * 0.08} className={`relative rounded-2xl ${i % 2 ? "aspect-[3/4] md:mt-16" : "aspect-[3/4]"}`}>
              <Image src={src} alt={`${service.title} — photo ${i + 1}`} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
            </ImageReveal>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="bg-bone py-20 text-ink sm:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel tone="light">What&apos;s included</SectionLabel>
            <SplitReveal lines={["Everything,", "handled."]} className="display mt-6 text-[clamp(2.6rem,6vw,6rem)]" />
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-7">
            {service.includes.map((item, i) => (
              <FadeIn as="li" key={item} delay={i * 0.04} className="flex items-baseline gap-4 border-t border-ink/10 py-5">
                <span className="eyebrow text-ember">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg font-medium tracking-tight">{item}</span>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      {runOfShow[service.slug] && <RunOfShow steps={runOfShow[service.slug]} service={service.title} />}

      {related.length > 0 && (
        <section className="bg-ink pb-20 sm:pb-28">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
            <SectionLabel>Related work</SectionLabel>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {related.map((e, i) => (
                <FadeIn key={e.slug} delay={i * 0.1}>
                  <WorkCard event={e} index={i} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.faq.length > 0 && (
        <section className="bg-ink pb-20 sm:pb-28">
          <div className="mx-auto grid max-w-[1600px] gap-10 px-5 sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel>Questions</SectionLabel>
              <h2 className="display mt-6 text-5xl">FAQ</h2>
            </div>
            <div className="lg:col-span-8">
              <Faq items={service.faq} />
            </div>
          </div>
        </section>
      )}

      <section className="bg-ink pb-20" aria-label="Other services">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <SectionLabel>Explore more</SectionLabel>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}`} className="group relative aspect-[16/10] overflow-hidden rounded-3xl">
                <Image src={o.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-ink/90 to-transparent" />
                <span className="display absolute bottom-5 left-6 text-4xl">{o.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand whatsappText={`Hi Maitreya Events, I'd like to plan a ${service.label.toLowerCase()} event.`} />
    </>
  );
}
