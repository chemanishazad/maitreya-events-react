"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { nav, site, telLink, whatsappLink } from "@/data/site";
import { Logo, LogoMark } from "./Logo";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Close the menu when the route changes (adjusting state during render, not in an effect)
  if (openedAt !== pathname) {
    setOpenedAt(pathname);
    setOpen(false);
  }

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > 240 && y > prev && !open);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4"
      >
        <div
          className={clsx(
            "relative mx-auto grid h-16 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center rounded-full px-3 transition-all duration-500 sm:px-5",
            solid || open ? "glass-flat !bg-ink/80" : "bg-transparent",
          )}
        >
          {/* Left: wordmark on mobile, first half of the nav on desktop */}
          <div className="flex items-center">
            <Logo className="lg:hidden" />
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {nav.slice(0, 3).map((item) => (
                  <NavItem key={item.href} item={item} pathname={pathname} />
                ))}
              </ul>
            </nav>
          </div>

          {/* Centre: the bloom mark */}
          <Link href="/" aria-label="Maitreya Events — home" className="group hidden flex-col items-center lg:flex">
            <LogoMark className="h-8 w-8 transition-transform duration-700 ease-expo group-hover:rotate-[180deg]" />
            <span className="nav-link mt-1 !text-[0.55rem] !tracking-[0.4em] text-bone/70">Maitreya</span>
          </Link>
          <span className="lg:hidden" />

          {/* Right: rest of the nav + CTA */}
          <div className="flex items-center justify-end gap-2">
            <nav aria-label="Secondary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {nav.slice(3).map((item) => (
                  <NavItem key={item.href} item={item} pathname={pathname} />
                ))}
              </ul>
            </nav>
            <div className="hidden sm:block">
              <Button href="/contact" trackAs="plan_event_click" icon={<ArrowIcon />}>
                Plan your event
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-12 w-12 items-center justify-center rounded-full bg-bone/10 lg:hidden"
            >
              <span
                className={clsx(
                  "absolute h-[1.5px] w-5 bg-bone transition-transform duration-500 ease-expo",
                  open ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                className={clsx(
                  "absolute h-[1.5px] w-5 bg-bone transition-transform duration-500 ease-expo",
                  open ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink px-6 pb-8 pt-28 lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 3rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile" className="flex-1">
              <ul className="space-y-1">
                {[{ label: "Home", href: "/" }, ...nav].map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        className={clsx(
                          "display flex items-baseline gap-4 py-1 text-[clamp(2.6rem,11vw,4.5rem)]",
                          pathname === item.href ? "text-marigold" : "text-bone",
                        )}
                      >
                        <span className="eyebrow text-muted">0{i + 1}</span>
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid gap-3 border-t border-bone/10 pt-6 text-sm text-muted"
            >
              <a href={whatsappLink()} onClick={() => track("whatsapp_click", { from: "menu" })} className="text-bone">
                WhatsApp us →
              </a>
              <a href={telLink} onClick={() => track("call_click", { from: "menu" })}>
                {site.phoneDisplay}
              </a>
              <span>{site.descriptor}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavItem({ item, pathname }: { item: { label: string; href: string }; pathname: string }) {
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
  return (
    <li>
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className="nav-link group relative block rounded-full px-4 py-2"
      >
        <span className="relative block overflow-hidden">
          <span className="block transition-transform duration-500 ease-expo group-hover:-translate-y-full">{item.label}</span>
          <span
            aria-hidden
            className="absolute inset-0 block translate-y-full text-marigold transition-transform duration-500 ease-expo group-hover:translate-y-0"
          >
            {item.label}
          </span>
        </span>
        {active && (
          <motion.span layoutId="nav-dot" className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-marigold" />
        )}
      </Link>
    </li>
  );
}
