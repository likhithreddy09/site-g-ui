import type { MetadataRoute } from "next";
import { FEATURES, USE_CASES } from "@/lib/marketing";
import { abs } from "@/lib/site";

const UPDATED = new Date("2026-10-28");

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") =>
    ({ url: abs(path), lastModified: UPDATED, changeFrequency, priority });
  return [
    page("/", 1, "weekly"),
    page("/features", 0.9),
    ...FEATURES.map((f) => page(`/features/${f.slug}`, 0.8)),
    ...USE_CASES.map((u) => page(`/use-cases/${u.slug}`, 0.8)),
    page("/pricing", 0.9, "weekly"),
    page("/about", 0.5),
    page("/contact", 0.5),
    page("/security", 0.6),
    page("/register", 0.6),
    page("/login", 0.3, "yearly"),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
