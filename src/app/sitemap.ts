import type { MetadataRoute } from "next";
import { SITEMAP_PAGES } from "@/lib/sitemapPages";
import { abs } from "@/lib/site";

/** Bump when major marketing pages change so crawlers re-fetch. */
const UPDATED = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_PAGES.map(({ path, priority, changeFrequency }) => ({
    url: abs(path),
    lastModified: UPDATED,
    changeFrequency,
    priority,
  }));
}
