import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { events, formatDate, getEvent } from "@/data/events";
import { getService } from "@/data/services";
import { PageHero } from "@/components/layout/PageHero";
import { FadeIn, ImageReveal } from "@/components/animation/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkCard } from "@/components/cards/EventCard";
import { CTABand } from "@/components/sections/CTABand";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { eventSchema, JsonLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) return {};
  const place = e.venue ? `${e.venue}, ${e.location}` : e.location;
  return pageMetadata({
    title: e.seoTitle ?? `${e.title} — ${e.type} in ${place}`,
    description: e.seoDescription ?? e.summary,
    path: `/events/${e.slug}`,
  });
}

export default async function EventPage({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const service = getService(event.category);
  const upcoming = event.status === "upcoming";
  const related = events.filter((e) => e.slug !== event.slug && e.status === "past" && e.category === event.category).slice(0, 2);
  const fallback = events.filter((e) => e.slug !== event.slug && e.status === "past").slice(0, 2);
  const more = related.length ? related : fallback;

  const facts = [
    { k: "Type", v: event.type },
    { k: "Date", v: event.endDate ? `${formatDate(event.date)} – ${formatDate(event.endDate)}` : formatDate(event.date) },
    { k: "Location", v: event.venue ? `${event.venue}, ${event.location}` : event.location },
    ...(service ? [{ k: "Service", v: service.title }] : []),
  ];

  return (
    <>
      {upcoming && !event.sample && <JsonLd data={eventSchema(event)} />}

      <PageHero
        eyebrow={upcoming ? `Upcoming · ${event.type}` : `Case study · ${event.type}`}
        lines={[event.title]}
        intro={event.summary}
        image={event.heroImage}
        imageAlt={event.title}
        crumbs={[
          upcoming ? { name: "Upcoming events", path: "/events" } : { name: "Work", path: "/portfolio" },
          { name: event.title, path: `/events/${event.slug}` },
        ]}
      >
        {upcoming && (
          <Button
            href={event.registrationUrl ?? "#register"}
            size="lg"
            trackAs="plan_event_click"
            icon={<ArrowIcon />}
          >
            {event.registrationUrl ? "Get tickets" : "Register interest"}
          </Button>
        )}
      </PageHero>

      {/* Facts */}
      <section className="bg-ink">
        <dl className="mx-auto grid max-w-[1600px] grid-cols-2 border-y border-bone/10 px-5 sm:px-8 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.k} className="border-bone/10 py-6 pr-4 [&:not(:last-child)]:md:border-r md:pl-6 md:first:pl-0">
              <dt className="eyebrow text-muted">{f.k}</dt>
              <dd className="mt-2 text-lg font-medium tracking-tight">{f.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Hero image */}
      <section className="bg-ink px-5 pt-16 sm:px-8">
        <ImageReveal className="relative mx-auto aspect-[16/9] max-w-[1600px] rounded-[2rem]">
          <Image src={event.heroImage} alt={event.title} fill sizes="100vw" className="object-cover" />
        </ImageReveal>
      </section>

      {/* Story */}
      <section className="bg-ink py-20 sm:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-14 px-5 sm:px-8 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-7">
            <FadeIn>
              <SectionLabel>{upcoming ? "About the event" : "The brief"}</SectionLabel>
              <p className="mt-5 text-pretty text-2xl leading-snug sm:text-3xl">{event.objective}</p>
            </FadeIn>
            <FadeIn>
              <SectionLabel>The concept</SectionLabel>
              <p className="mt-5 text-pretty text-xl leading-snug text-bone/80">{event.concept}</p>
            </FadeIn>
          </div>
          <div className="space-y-10 lg:col-span-4 lg:col-start-9">
            <ListBlock title="Services" items={event.services} />
            <ListBlock title="Production" items={event.production} />
            <ListBlock title="Highlights" items={event.highlights} accent />
          </div>
        </div>
      </section>

      {/* Gallery */}
      {event.gallery.length > 1 && (
        <section className="bg-ink pb-20 sm:pb-28" aria-label="Gallery">
          <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-3 px-5 sm:px-8 md:grid-cols-3">
            {event.gallery.slice(1).map((src, i) => (
              <ImageReveal
                key={src}
                delay={(i % 3) * 0.08}
                className={`relative rounded-2xl ${i % 5 === 0 ? "col-span-2 aspect-[16/10] md:col-span-2" : "aspect-[4/5]"}`}
              >
                <Image src={src} alt={`${event.title} — photo ${i + 2}`} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
              </ImageReveal>
            ))}
          </div>
        </section>
      )}

      {upcoming && (
        <section id="register" className="scroll-mt-24 bg-bone py-20 text-ink sm:py-28">
          <div className="mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionLabel tone="light">Register interest</SectionLabel>
              <h2 className="display mt-6 text-[clamp(2.4rem,5vw,4.5rem)]">Be first to know.</h2>
              <p className="mt-4 text-ink/65">Leave your details and we&apos;ll share tickets, passes and updates for {event.title}.</p>
            </div>
            <div className="lg:col-span-8">
              <EnquiryForm variant="compact" tone="light" defaultEventType="Other" eventSlug={event.slug} />
            </div>
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section className="bg-ink py-20 sm:py-28">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
            <SectionLabel>More work</SectionLabel>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {more.map((e, i) => (
                <WorkCard key={e.slug} event={e} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand whatsappText={`Hi Maitreya Events, I saw "${event.title}" on your website and would like to plan something similar.`} />
    </>
  );
}

function ListBlock({ title, items, accent }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <FadeIn>
      <h2 className="eyebrow text-muted">{title}</h2>
      <ul className="mt-4 space-y-2">
        {items.map((i) => (
          <li key={i} className="flex items-baseline gap-3 border-t border-bone/10 pt-2 text-lg">
            <span className={accent ? "text-marigold" : "text-bone/30"}>✦</span>
            {i}
          </li>
        ))}
      </ul>
    </FadeIn>
  );
}
