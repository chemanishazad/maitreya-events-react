"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { mailLink, nav, site, telLink, whatsappLink } from "@/data/site";
import { services } from "@/data/services";
import { upcomingEvents } from "@/data/events";
import { LogoMark } from "./Logo";
import { track } from "@/lib/analytics";

export function Footer() {
  const year = new Date().getFullYear();
  const word = "MAITREYA";

  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-ink-2 pt-20">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <LogoMark className="h-10 w-10" />
          <p className="mt-6 max-w-sm text-balance text-2xl font-medium leading-tight tracking-tight">
            Events, entertainment and production — from the first idea to the last guest.
          </p>
          <p className="eyebrow mt-6 text-muted">{site.descriptor}</p>
        </div>

        <FooterCol title="Services" className="md:col-span-3">
          {services.map((s) => (
            <li key={s.slug}>
              <FooterLink href={`/services/${s.slug}`}>{s.title}</FooterLink>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Company" className="md:col-span-2">
          {nav.map((n) => (
            <li key={n.href}>
              <FooterLink href={n.href}>{n.label}</FooterLink>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Contact" className="md:col-span-3">
          <li>
            <a href={telLink} onClick={() => track("call_click", { from: "footer" })} className="hover:text-marigold">
              {site.phoneDisplay}
            </a>
          </li>
          <li>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { from: "footer" })}
              className="hover:text-marigold"
            >
              WhatsApp
            </a>
          </li>
          <li>
            <a href={mailLink} className="hover:text-marigold">
              {site.email}
            </a>
          </li>
          <li className="text-muted">
            {site.address.locality}, {site.address.region}
          </li>
          {upcomingEvents[0] && (
            <li className="pt-4">
              <span className="eyebrow block text-muted">Next up</span>
              <FooterLink href={`/events/${upcomingEvents[0].slug}`}>{upcomingEvents[0].title}</FooterLink>
            </li>
          )}
          {site.social.length > 0 && (
            <li className="flex gap-4 pt-4">
              {site.social.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-marigold">
                  {s.label}
                </a>
              ))}
            </li>
          )}
        </FooterCol>
      </div>

      <div
        aria-hidden
        className="pointer-events-none mt-20 flex select-none justify-center overflow-hidden px-2 leading-[0.78]"
      >
        {word.split("").map((ch, i) => (
          <motion.span
            key={i}
            className="display inline-block bg-linear-to-b from-bone to-bone/10 bg-clip-text text-[19.5vw] text-transparent"
            initial={{ y: "70%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -5% 0px" }}
            transition={{ duration: 1.1, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            {ch}
          </motion.span>
        ))}
      </div>

      <div className="relative border-t border-bone/10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-bone">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-bone">
              Terms
            </Link>
            <span className="text-bone/70">{site.tagline}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="eyebrow mb-5 text-muted">{title}</h2>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 transition-colors hover:text-marigold">
      <span className="h-px w-0 bg-marigold transition-all duration-500 ease-expo group-hover:w-4" />
      {children}
    </Link>
  );
}
