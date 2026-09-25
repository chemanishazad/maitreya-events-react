import { config } from "@/lib/config";

export const site = {
  name: "Maitreya Events",
  shortName: "Maitreya",
  url: config.siteUrl,
  descriptor: "Events • Entertainment • Experiences",
  tagline: "We create. You celebrate.",
  description:
    "End-to-end event management, entertainment and production for weddings, celebrations, corporate events, cultural programmes and live experiences in Chennai and across Tamil Nadu.",

  phoneDisplay: config.phoneDisplay,
  phone: config.phone,
  whatsapp: config.whatsapp,
  email: config.email,
  address: {
    locality: "Chennai",
    region: "Tamil Nadu",
    country: "IN",
  },

  // Set NEXT_PUBLIC_INSTAGRAM_URL etc. in the env files — the footer hides this block while empty
  social: config.social,
};

export const nav = [
  { label: "Work", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Upcoming", href: "/events" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function whatsappLink(text = "Hi Maitreya Events, I'd like to plan an event.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const telLink = `tel:${site.phone}`;
export const mailLink = `mailto:${site.email}`;
