import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { events } from "@/data/events";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["", "/services", "/events", "/portfolio", "/about", "/contact", "/privacy", "/terms"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: p === "/events" ? ("weekly" as const) : ("monthly" as const),
    priority: p === "" ? 1 : p === "/contact" || p === "/services" ? 0.9 : 0.6,
  }));

  return [
    ...staticPages,
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Placeholder "sample" events are not listed until they are replaced with real ones
    ...events.filter((e) => !e.sample).map((e) => ({
      url: `${site.url}/events/${e.slug}`,
      // Never a future date — Google ignores lastmod values it can't trust
      lastModified: new Date(Math.min(new Date(e.date).getTime(), now.getTime())),
      changeFrequency: e.status === "upcoming" ? ("weekly" as const) : ("yearly" as const),
      priority: e.status === "upcoming" ? 0.7 : 0.5,
    })),
  ];
}
