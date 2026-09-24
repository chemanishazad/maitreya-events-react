"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FocusReveal } from "@/components/animation/FocusReveal";
import { FadeIn } from "@/components/animation/Reveal";
import { VelocityMarquee } from "@/components/animation/Marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { img } from "@/data/images";

const flow = ["Concept", "Planning", "Design", "Production", "Execution", "Celebration"];
const marqueeWords = ["Weddings", "Corporate", "Cultural", "Concerts", "Birthdays", "Culturals", "Launches", "Festivals"];

export function BrandStatement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], ["20%", "-30%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["45%", "-45%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 4]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink pb-24 pt-28 sm:pb-36 sm:pt-40" aria-labelledby="brand-heading">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <SectionLabel index="01">Who we are</SectionLabel>

        <div className="relative mt-10">
          <h2 id="brand-heading" className="sr-only">
            One team. Every kind of event.
          </h2>
          <FocusReveal
            as="p"
            text="ONE TEAM. EVERY KIND OF EVENT."
            accentWords={["EVERY"]}
            className="display relative z-10 max-w-[14ch] text-[clamp(3rem,10.5vw,11rem)]"
          />

          {/* Parallax photographs */}
          <motion.div
            style={{ y: yA, rotate }}
            className="absolute right-[4%] top-[-6%] hidden aspect-[3/4] w-[22vw] max-w-[340px] overflow-hidden rounded-2xl md:block"
          >
            <Image src={img.weddingCelebration} alt="" fill sizes="22vw" className="object-cover" />
          </motion.div>
          <motion.div
            style={{ y: yB }}
            className="absolute bottom-[-20%] right-[24%] hidden aspect-square w-[15vw] max-w-[240px] overflow-hidden rounded-2xl md:block"
          >
            <Image src={img.stagePinkBlue} alt="" fill sizes="15vw" className="object-cover" />
          </motion.div>
        </div>

        <div className="mt-20 grid gap-10 md:mt-28 md:grid-cols-12">
          <FadeIn className="md:col-span-5 md:col-start-2">
            <p className="text-pretty text-xl leading-snug text-bone/85 sm:text-2xl">
              From intimate celebrations to large-scale corporate and cultural productions, Maitreya Events brings
              planning, creativity, production and execution together under one team.
            </p>
          </FadeIn>
          <div className="md:col-span-5 md:col-start-8">
            <ol className="flex flex-wrap gap-2" aria-label="How we work">
              {flow.map((step, i) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2"
                >
                  <span className="rounded-full border border-bone/15 px-4 py-2 text-sm">{step}</span>
                  {i < flow.length - 1 && <span className="text-marigold">→</span>}
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="mt-24 border-y border-bone/10 py-6 sm:mt-32">
        <VelocityMarquee baseVelocity={-2}>
          {marqueeWords.map((w) => (
            <span key={w} className="flex items-center">
              <span className="display px-6 text-[clamp(2.5rem,6vw,5.5rem)]">{w}</span>
              <span className="font-serif text-[clamp(2rem,4vw,3.5rem)] italic text-marigold">✦</span>
            </span>
          ))}
        </VelocityMarquee>
      </div>
    </section>
  );
}
