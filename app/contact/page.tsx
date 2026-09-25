import { img } from "@/data/images";
import { mailLink, site, telLink, whatsappLink } from "@/data/site";
import { getEvent } from "@/data/events";
import { PageHero } from "@/components/layout/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us — Plan Your Event in Chennai",
  description:
    "Tell us about your wedding, corporate event, celebration or show. Get a call back from Maitreya Events in Chennai, or message us on WhatsApp.",
  path: "/contact",
});

/** Maps a service page slug (?service=) to the form's event type */
const serviceToType: Record<string, string> = {
  "wedding-events": "Wedding",
  "corporate-events": "Corporate",
  "cultural-events": "Cultural",
  "private-events": "Birthday / Celebration",
  "live-events": "Concert / Live Event",
  "college-events": "College / School",
  "public-events": "Exhibition",
  "event-production": "Other",
};

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const sp = await searchParams;
  const service = typeof sp.service === "string" ? sp.service : undefined;
  const eventSlug = typeof sp.event === "string" && getEvent(sp.event) ? sp.event : undefined;

  const channels = [
    { label: "WhatsApp", value: "Chat with us", href: whatsappLink(), external: true },
    { label: "Call", value: site.phoneDisplay, href: telLink },
    { label: "Email", value: site.email, href: mailLink },
    { label: "Based in", value: `${site.address.locality}, ${site.address.region}` },
  ];

  return (
    <>
      <PageHero
        eyebrow="Plan your event"
        lines={["Let's talk", "celebrations."]}
        seoHeading="Contact Maitreya Events — Plan Your Event in Chennai"
        accentLine={1}
        intro="Share a few details and we'll call you back with ideas, availability and a rough budget. Prefer to chat? WhatsApp is the fastest way to reach us."
        image={img.sparklers}
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section className="bg-ink pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-[1600px] gap-14 px-5 sm:px-8 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <SectionLabel>Reach us</SectionLabel>
            <ul className="mt-8 divide-y divide-bone/10 border-y border-bone/10">
              {channels.map((c) => (
                <li key={c.label} className="py-5">
                  <span className="eyebrow block text-muted">{c.label}</span>
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="mt-1 inline-block text-xl font-medium tracking-tight transition-colors hover:text-marigold"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span className="mt-1 block text-xl font-medium tracking-tight">{c.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </aside>

          <div className="rounded-[2rem] border border-bone/10 bg-ink-2 p-6 sm:p-10 lg:col-span-8">
            <h2 className="display text-4xl sm:text-5xl">Event enquiry</h2>
            <p className="mt-3 text-bone/60">Fields marked optional can be skipped — we&apos;ll fill the gaps on the call.</p>
            <div className="mt-10">
              <EnquiryForm variant="full" defaultEventType={service ? serviceToType[service] : undefined} eventSlug={eventSlug} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
