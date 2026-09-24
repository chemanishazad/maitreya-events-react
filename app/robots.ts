import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { isIndexable } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  // The dev environment must never be indexed
  if (!isIndexable) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
