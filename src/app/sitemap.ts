import type { MetadataRoute } from "next";
import { CONTENT_UPDATED, SITEMAP_PAGES } from "@/lib/sitemapPages";
import { abs } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_PAGES.map(({ path, priority, changeFrequency, lastmod, image }) => ({
    url: abs(path),
    lastModified: lastmod ?? CONTENT_UPDATED,
    changeFrequency,
    priority,
    images: [abs(image ?? "/opengraph-image")],
  }));
}
