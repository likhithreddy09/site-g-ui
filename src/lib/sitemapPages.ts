import { FEATURES, USE_CASES } from "./marketing";

export type SitemapEntry = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  /** Short note for SEO audits — not rendered. */
  seo: string;
};

/**
 * Single source of truth for public indexable routes.
 * Keep in sync with pageMeta / generateMetadata on each route.
 */
export const SITEMAP_PAGES: SitemapEntry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly", seo: "Brand + agency website monitoring" },
  { path: "/features", priority: 0.95, changeFrequency: "weekly", seo: "All monitoring features hub" },
  ...FEATURES.map((f) => ({
    path: `/features/${f.slug}`,
    priority: 0.85,
    changeFrequency: "weekly" as const,
    seo: f.title,
  })),
  { path: "/use-cases", priority: 0.9, changeFrequency: "weekly", seo: "Audience use-cases hub" },
  ...USE_CASES.map((u) => ({
    path: `/use-cases/${u.slug}`,
    priority: 0.85,
    changeFrequency: "weekly" as const,
    seo: u.title,
  })),
  { path: "/pricing", priority: 0.95, changeFrequency: "weekly", seo: "INR pricing" },
  { path: "/security", priority: 0.7, changeFrequency: "monthly", seo: "Security / trust" },
  { path: "/about", priority: 0.55, changeFrequency: "monthly", seo: "About brand" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly", seo: "Contact / book call" },
  { path: "/register", priority: 0.65, changeFrequency: "monthly", seo: "Start free CTA" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly", seo: "Legal" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly", seo: "Legal" },
  { path: "/refund", priority: 0.2, changeFrequency: "yearly", seo: "Legal" },
  { path: "/shipping", priority: 0.2, changeFrequency: "yearly", seo: "Legal" },
];

/** Paths that must never appear in the sitemap. */
export const SITEMAP_EXCLUDED = ["/app", "/login", "/r", "/api"] as const;
