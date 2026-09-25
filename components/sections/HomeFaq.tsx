import { generalFaq } from "@/data/content";
import { Faq } from "@/components/ui/Faq";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitReveal } from "@/components/animation/Reveal";
import { ArrowIcon, Button, WhatsAppIcon } from "@/components/ui/Button";
import { whatsappLink } from "@/data/site";
import { faqSchema, JsonLd } from "@/lib/seo";

export function HomeFaq() {
  return (
    <section className="bg-ink py-24 sm:py-32" aria-labelledby="faq-heading">
      <JsonLd data={faqSchema(generalFaq)} />
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel index="10">Questions</SectionLabel>
          <h2 id="faq-heading" className="sr-only">
            Frequently asked questions
          </h2>
          <SplitReveal lines={["Questions,", "answered."]} accentLine={1} className="display mt-6 text-[clamp(2.6rem,5.5vw,5.5rem)]" />
          <p className="mt-6 max-w-sm text-pretty text-bone/70">Anything else? Ask us directly — a real person from our team will get back to you.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={whatsappLink()} trackAs="whatsapp_click" icon={<WhatsAppIcon />}>
              Ask on WhatsApp
            </Button>
            <Button href="/contact" variant="ghost" icon={<ArrowIcon />}>
              Enquire
            </Button>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Faq items={generalFaq} />
        </div>
      </div>
    </section>
  );
}
