import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // AI crawlers (GPTBot, Google-Extended, PerplexityBot) are deliberately
    // allowed — they only cite catalogues they can crawl (GEO strategy).
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
