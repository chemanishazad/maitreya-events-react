import { upcomingEvents } from "@/data/events";
import { UpcomingCard } from "@/components/cards/EventCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn, SplitReveal } from "@/components/animation/Reveal";
import { Button, ArrowIcon } from "@/components/ui/Button";

export function Upcoming() {
  if (upcomingEvents.length === 0) return null;
  return (
    <section className="bg-ink-2 py-24 sm:py-32" aria-labelledby="upcoming-heading">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel index="08">Upcoming events</SectionLabel>
            <h2 id="upcoming-heading" className="sr-only">
              Upcoming events
            </h2>
            <SplitReveal
              lines={["Save", "the date."]}
              className="display mt-6 text-[clamp(2.8rem,7vw,7rem)]"
              accentLine={1}
            />
          </div>
          <Button href="/events" variant="ghost" icon={<ArrowIcon />}>
            All upcoming events
          </Button>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.slice(0, 3).map((e, i) => (
            <FadeIn key={e.slug} delay={i * 0.1}>
              <UpcomingCard event={e} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
