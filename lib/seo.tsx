import type { Metadata } from "next";
import { site } from "@/data/site";
import type { EventItem } from "@/data/events";
import { services } from "@/data/services";
import { config } from "@/lib/config";

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

export function pageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  /** Link-preview image (WhatsApp, Facebook, LinkedIn, X). Defaults to the branded card. */
  image?: string;
  /** Keep the page out of search results (still followed for links) */
  noindex?: boolean;
}): Metadata {
  const images = [{ url: image, width: 1200, height: 630, alt: `${title} — ${site.name}` }];
  return {
    title,
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
      title: `${title} | ${site.name}`,
      description,
      url: path,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [image],
    },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#organization`,
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  logo: absoluteUrl("/apple-icon"),
  image: absoluteUrl("/opengraph-image"),
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    ...(config.streetAddress ? { streetAddress: config.streetAddress } : {}),
    ...(config.postalCode ? { postalCode: config.postalCode } : {}),
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: site.phone,
    email: site.email,
    areaServed: "IN",
  },
  knowsAbout: [
    "Event management",
    "Wedding planning",
    "Corporate events",
    "Cultural programmes",
    "Stage, sound and lighting production",
    "LED walls and AV",
    "Entertainment and artist management",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Event services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, url: absoluteUrl(`/services/${s.slug}`) },
    })),
  },
  areaServed: [
    { "@type": "City", name: "Chennai" },
    { "@type": "State", name: "Tamil Nadu" },
  ],
  sameAs: site.social.map((s) => s.href),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  publisher: { "@id": `${site.url}/#organization` },
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function eventSchema(e: EventItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    description: e.summary,
    startDate: e.date,
    ...(e.endDate ? { endDate: e.endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: [e.heroImage],
    location: {
      "@type": "Place",
      name: e.venue ?? e.location,
      address: { "@type": "PostalAddress", addressLocality: e.location, addressRegion: "Tamil Nadu", addressCountry: "IN" },
    },
    organizer: { "@id": `${site.url}/#organization` },
    url: absoluteUrl(`/events/${e.slug}`),
  };
}

export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
