"use client";

import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import { SplitReveal } from "@/components/animation/Reveal";
import { ArrowIcon, Button, PhoneIcon, WhatsAppIcon } from "@/components/ui/Button";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { telLink, whatsappLink } from "@/data/site";
import { useScrub } from "@/lib/motion";

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const glowScale = useScrub(scrollYProgress, [0, 1], [0.4, 1.2]);
  const glowOpacity = useScrub(scrollYProgress, [0, 1], [0, 0.55]);

  return (
    <section ref={ref} id="enquire" className="relative overflow-hidden bg-ink py-28 sm:py-40" aria-labelledby="cta-heading">
      <motion.div
        aria-hidden
        style={{ scale: glowScale, opacity: glowOpacity }}
        className="pointer-events-none absolute left-1/2 top-1/3 h-[80vw] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(244,163,64,0.35),transparent_60%)] blur-2xl"
      />
      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        <h2 id="cta-heading" className="sr-only">
          Let&apos;s create your event
        </h2>
        <SplitReveal
          as="p"
          lines={["Let's create", "your event."]}
          className="display text-[clamp(3.4rem,12vw,12.5rem)]"
          accentLine={1}
        />

        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/contact" size="lg" trackAs="plan_event_click" icon={<ArrowIcon />}>
            Plan your event
          </Button>
          <Button href={whatsappLink()} size="lg" variant="ghost" trackAs="whatsapp_click" icon={<WhatsAppIcon />}>
            WhatsApp us
          </Button>
          <Button href={telLink} size="lg" variant="ghost" trackAs="call_click" icon={<PhoneIcon />}>
            Call us
          </Button>
        </div>

        <div className="mt-20 grid gap-12 rounded-[2rem] border border-bone/10 bg-ink-2/80 p-6 backdrop-blur sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-marigold">Quick enquiry</p>
            <p className="mt-4 text-pretty text-2xl font-medium leading-tight tracking-tight">
              Four details and we&apos;ll call you back with ideas, availability and a rough budget.
            </p>
          </div>
          <div className="lg:col-span-8">
            <EnquiryForm variant="compact" />
          </div>
        </div>
      </div>
    </section>
  );
}
