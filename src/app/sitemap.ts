import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";
import { POSTS } from "@/data/posts";
import {
  ACCESSORIES,
  MOTORCYCLES,
  RIDER_GEAR,
} from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/motorcycles",
    "/rider-gear",
    "/accessories",
    "/iphone-17",
    "/sell",
    "/road-tax",
    "/about-us",
    "/faq",
    "/blog",
    "/contact",
    "/terms-of-use",
    "/privacy-notice",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const products = [
    ...MOTORCYCLES.map((m) => `/motorcycles/${m.slug}`),
    ...RIDER_GEAR.map((g) => `/rider-gear/${g.slug}`),
    ...ACCESSORIES.map((a) => `/accessories/${a.slug}`),
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const posts = POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.updated ?? p.date,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...products, ...posts];
}
