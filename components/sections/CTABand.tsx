import { SplitReveal } from "@/components/animation/Reveal";
import { ArrowIcon, Button, WhatsAppIcon } from "@/components/ui/Button";
import { whatsappLink } from "@/data/site";

/** Compact closing call-to-action for inner pages. */
export function CTABand({
  lines = ["Let's create", "your event."],
  href = "/contact",
  whatsappText,
}: {
  lines?: string[];
  href?: string;
  whatsappText?: string;
}) {
  return (
    <section className="border-t border-bone/10 bg-ink py-24 sm:py-32">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-10 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <SplitReveal lines={lines} accentLine={1} className="display text-[clamp(3rem,8vw,8rem)]" />
        <div className="flex flex-wrap gap-3">
          <Button href={href} size="lg" trackAs="plan_event_click" icon={<ArrowIcon />}>
            Plan your event
          </Button>
          <Button href={whatsappLink(whatsappText)} size="lg" variant="ghost" trackAs="whatsapp_click" icon={<WhatsAppIcon />}>
            WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
