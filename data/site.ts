export const site = {
  name: "Maitreya Events",
  shortName: "Maitreya",
  url: "https://maitreyaevents.com",
  descriptor: "Events • Entertainment • Experiences",
  tagline: "We create. You celebrate.",
  description:
    "End-to-end event management, entertainment and production for weddings, celebrations, corporate events, cultural programmes and live experiences in Chennai and across Tamil Nadu.",

  phoneDisplay: "+91 87781 45196",
  phone: "+918778145196",
  whatsapp: "918778145196",
  email: "maitreyaevents@gmail.com",
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
