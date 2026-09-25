import { pastEvents, upcomingEvents } from "@/data/events";
import { img } from "@/data/images";
import { PageHero } from "@/components/layout/PageHero";
import { UpcomingCard } from "@/components/cards/EventCard";
import { FadeIn } from "@/components/animation/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { CTABand } from "@/components/sections/CTABand";
import { pageMetadata } from "@/lib/seo";
import { Countdown } from "@/components/ui/Countdown";
import { formatDate } from "@/data/events";

export const metadata = pageMetadata({
  title: "Upcoming Events in Chennai",
  description:
    "Upcoming festivals, concerts, cultural programmes and public events by Maitreya Events in Chennai — dates, venues and registration.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Upcoming events"
        lines={["What's", "happening."]}
        seoHeading="Upcoming Events in Chennai by Maitreya Events"
        accentLine={1}
        intro="Public events, festivals and live shows produced by Maitreya Events. Register your interest and we'll share tickets and details as they open."
        image={img.crowdNight}
        crumbs={[{ name: "Upcoming events", path: "/events" }]}
      />

      {upcomingEvents[0] && (
        <section className="bg-ink pb-16" aria-label="Next event countdown">
          <div className="glass-flat mx-5 flex flex-col justify-between gap-6 rounded-[2rem] p-6 sm:mx-8 sm:p-10 md:flex-row md:items-center">
            <div>
              <p className="nav-link text-marigold">Next up · {formatDate(upcomingEvents[0].date)}</p>
              <p className="display mt-3 text-[clamp(2rem,4vw,3.6rem)]">{upcomingEvents[0].title}</p>
              <p className="mt-2 text-bone/70">{upcomingEvents[0].summary}</p>
            </div>
            <Countdown target={upcomingEvents[0].date} />
          </div>
        </section>
      )}

      <section className="bg-ink pb-24">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          {upcomingEvents.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((e, i) => (
                <FadeIn key={e.slug} delay={i * 0.08}>
                  <UpcomingCard event={e} priority={i < 3} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <p className="text-xl text-bone/70">New events are being planned — check back soon, or follow us on WhatsApp for updates.</p>
          )}
        </div>
      </section>

      <section className="border-t border-bone/10 bg-ink py-24 sm:py-32">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <SectionLabel>Past events</SectionLabel>
          <h2 className="display mt-6 text-[clamp(2.6rem,6vw,6rem)]">
            Recently <span className="font-serif font-normal italic text-marigold">delivered.</span>
          </h2>
          <div className="mt-12">
            <WorkGrid items={pastEvents} />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
