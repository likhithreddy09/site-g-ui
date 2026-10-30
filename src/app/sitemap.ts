import type { MetadataRoute } from "next";
import { FEATURES, USE_CASES } from "@/lib/marketing";
import { abs } from "@/lib/site";

/** Bump when major marketing pages change so crawlers re-fetch. */
const UPDATED = new Date();

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

function page(path: string, priority: number, changeFrequency: Freq = "monthly"): MetadataRoute.Sitemap[number] {
  return { url: abs(path), lastModified: UPDATED, changeFrequency, priority };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    page("/", 1, "weekly"),
    page("/features", 0.95, "weekly"),
    ...FEATURES.map((f) => page(`/features/${f.slug}`, 0.85, "weekly")),
    page("/use-cases", 0.9, "weekly"),
    ...USE_CASES.map((u) => page(`/use-cases/${u.slug}`, 0.85, "weekly")),
    page("/pricing", 0.95, "weekly"),
    page("/security", 0.7, "monthly"),
    page("/about", 0.55, "monthly"),
    page("/contact", 0.7, "monthly"),
    page("/register", 0.65, "monthly"),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
    page("/refund", 0.2, "yearly"),
    page("/shipping", 0.2, "yearly"),
  ];
}
