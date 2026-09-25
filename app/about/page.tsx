import Image from "next/image";
import { img } from "@/data/images";
import { processSteps } from "@/data/content";
import { PageHero } from "@/components/layout/PageHero";
import { FocusReveal } from "@/components/animation/FocusReveal";
import { FadeIn, ImageReveal } from "@/components/animation/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CTABand } from "@/components/sections/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us — Event Management Company in Chennai",
  description:
    "Maitreya Events is a Chennai-based event management, entertainment and production company. One team for concept, planning, design, production and execution.",
  path: "/about",
});

const values = [
  {
    title: "One team",
    body: "Planning, design, production and on-ground execution sit with the same people, so nothing gets lost in hand-offs.",
  },
  {
    title: "Production in-house",
    body: "Stage, sound, lighting and LED are run by our own crew — the technical side is never an afterthought.",
  },
  {
    title: "Rooted in Tamil Nadu",
    body: "We know the venues, the traditions and the pace of celebrations in Chennai and across the state.",
  },
  {
    title: "Honest planning",
    body: "Clear budgets, clear timelines and a single point of contact from first call to final guest.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        lines={["We create.", "You celebrate."]}
        seoHeading="About Maitreya Events — Event Management Company in Chennai"
        accentLine={1}
        intro="Maitreya Events is an event management, entertainment and production company based in Chennai, Tamil Nadu."
        image={img.stagePinkBlue}
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <section className="bg-ink py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <SectionLabel>Our belief</SectionLabel>
          <FocusReveal
            as="p"
            text="An event is a promise to your guests. Our job is to keep it — every cue, every light, every moment."
            accentWords={["promise", "keep"]}
            className="display mt-10 max-w-[22ch] text-[clamp(2.4rem,6vw,6.5rem)]"
          />
        </div>
      </section>

      <section className="bg-ink pb-20 sm:pb-28">
        <div className="mx-auto grid max-w-[1600px] gap-3 px-5 sm:px-8 md:grid-cols-12">
          <ImageReveal className="relative aspect-[4/5] rounded-[2rem] md:col-span-5">
            <Image src={img.mandap} alt="A wedding mandap designed and produced as one piece" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </ImageReveal>
          <div className="grid gap-3 md:col-span-7 md:grid-rows-2">
            <ImageReveal delay={0.1} className="relative aspect-[16/9] rounded-[2rem] md:aspect-auto">
              <Image src={img.mixingDesk} alt="Sound engineer at a mixing console" fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
            </ImageReveal>
            <ImageReveal delay={0.2} className="relative aspect-[16/9] rounded-[2rem] md:aspect-auto">
              <Image src={img.crowdHands} alt="Crowd with hands raised at a live show" fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
            </ImageReveal>
          </div>
        </div>
      </section>

      <section className="bg-bone py-20 text-ink sm:py-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <SectionLabel tone="light">What makes us different</SectionLabel>
          <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08} className="border-t border-ink/15 pt-6">
                <span className="eyebrow text-ember">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="display mt-4 text-[clamp(2rem,4vw,3.5rem)]">{v.title}</h2>
                <p className="mt-3 max-w-md text-pretty text-lg text-ink/70">{v.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <SectionLabel>From idea to event</SectionLabel>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-[2rem] bg-bone/10 sm:grid-cols-2 lg:grid-cols-6">
            {processSteps.map((p, i) => (
              <FadeIn as="li" key={p.title} delay={i * 0.06} className="bg-ink p-6">
                <span className="display text-4xl text-marigold">0{i + 1}</span>
                <h3 className="mt-6 text-xl font-medium tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-bone/60">{p.body}</p>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      <CTABand />
    </>
  );
}
