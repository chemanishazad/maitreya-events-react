export const site = {
  name: "Maitreya Events",
  shortName: "Maitreya",
  url: "https://maitreyaevents.com",
  descriptor: "Events • Entertainment • Experiences",
  tagline: "We create. You celebrate.",
  description:
    "End-to-end event management, entertainment and production for weddings, celebrations, corporate events, cultural programmes and live experiences in Chennai and across Tamil Nadu.",

  // TODO(content): replace with the real business contact details before launch.
  phoneDisplay: "+91 90000 00000",
  phone: "+919000000000",
  whatsapp: "919000000000",
  email: "hello@maitreyaevents.com",
  address: {
    locality: "Chennai",
    region: "Tamil Nadu",
    country: "IN",
  },

  // TODO(content): add real profile URLs — the footer hides this block while it is empty.
  social: [] as { label: string; href: string }[],
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
