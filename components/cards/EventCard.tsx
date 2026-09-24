import Image from "next/image";
import Link from "next/link";
import type { EventItem } from "@/data/events";
import { formatDate } from "@/data/events";

export function UpcomingCard({ event, priority }: { event: EventItem; priority?: boolean }) {
  const d = new Date(`${event.date}T00:00:00+05:30`);
  const day = d.toLocaleDateString("en-IN", { day: "2-digit", timeZone: "Asia/Kolkata" });
  const month = d.toLocaleDateString("en-IN", { month: "short", timeZone: "Asia/Kolkata" });

  return (
    <Link href={`/events/${event.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]">
        <Image
          src={event.heroImage}
          alt={event.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-expo group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex flex-col items-center rounded-2xl bg-bone px-4 py-2 text-ink">
          <span className="display text-3xl">{day}</span>
          <span className="eyebrow !text-[0.6rem]">{month}</span>
        </div>
        <span className="eyebrow absolute right-4 top-4 rounded-full bg-ink/60 px-3 py-1.5 backdrop-blur">{event.type}</span>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
          <div>
            <h3 className="display text-3xl sm:text-4xl">{event.title}</h3>
            <p className="mt-2 text-sm text-bone/75">
              {event.venue ? `${event.venue}, ` : ""}
              {event.location} · {formatDate(event.date)}
            </p>
          </div>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-marigold text-ink transition-transform duration-500 ease-expo group-hover:-rotate-45">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function WorkCard({ event, index }: { event: EventItem; index: number }) {
  return (
    <Link href={`/events/${event.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
        <Image
          src={event.heroImage}
          alt={event.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-expo group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/25" />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-marigold">
            {String(index + 1).padStart(2, "0")} — {event.type}
          </p>
          <h3 className="display mt-2 text-3xl sm:text-4xl">{event.title}</h3>
        </div>
        <p className="eyebrow pt-1 text-right text-muted">
          {event.location}
          <br />
          {formatDate(event.date, { month: "short", year: "numeric" })}
        </p>
      </div>
    </Link>
  );
}
