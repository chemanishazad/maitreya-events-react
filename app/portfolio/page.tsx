import { pastEvents } from "@/data/events";
import { img } from "@/data/images";
import { PageHero } from "@/components/layout/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { MediaGallery, type GalleryItem } from "@/components/gallery/MediaGallery";
import { CTABand } from "@/components/sections/CTABand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Portfolio — Weddings, Corporate & Live Events",
  description:
    "Event case studies and photography from Maitreya Events — weddings, corporate annual days, cultural festivals, concerts and college culturals in Chennai and Tamil Nadu.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  const gallery: GalleryItem[] = pastEvents.flatMap((e) =>
    e.gallery.slice(0, 4).map((src, i) => ({ src, alt: `${e.title} — ${e.type} photo ${i + 1}`, caption: e.type })),
  );
  // De-duplicate shared placeholder images
  const unique = gallery.filter((g, i, all) => all.findIndex((x) => x.src === g.src) === i);

  return (
    <>
      <PageHero
        eyebrow="Our work"
        lines={["Moments", "we made."]}
        accentLine={1}
        intro="A selection of the weddings, celebrations, corporate shows and live events we have planned and produced."
        image={img.confettiConcert}
        crumbs={[{ name: "Work", path: "/portfolio" }]}
      />

      <section className="bg-ink pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <SectionLabel>Case studies</SectionLabel>
          <div className="mt-8">
            <WorkGrid items={pastEvents} />
          </div>
        </div>
      </section>

      <section className="border-t border-bone/10 bg-ink py-24 sm:py-32">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <SectionLabel>Gallery</SectionLabel>
          <h2 className="display mt-6 text-[clamp(2.6rem,6vw,6rem)]">
            In <span className="font-serif font-normal italic text-marigold">frame.</span>
          </h2>
          <div className="mt-12">
            <MediaGallery items={unique} />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
