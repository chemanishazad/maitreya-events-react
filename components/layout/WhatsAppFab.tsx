"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

/** Floating WhatsApp shortcut — appears once the visitor has scrolled past the hero. */
export function WhatsAppFab() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 600));

  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Maitreya Events on WhatsApp"
      onClick={() => track("whatsapp_click", { from: "fab" })}
      initial={false}
      animate={{ scale: show ? 1 : 0, opacity: show ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-ink shadow-[0_12px_40px_-8px_rgba(37,211,102,0.6)] sm:bottom-8 sm:right-8"
      style={{ pointerEvents: show ? "auto" : "none" }}
      tabIndex={show ? 0 : -1}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </motion.a>
  );
}
