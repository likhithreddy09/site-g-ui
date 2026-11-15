import { BLOG_POSTS } from "./blog";
import { COMPARISONS } from "./compare";
import { GUIDES } from "./guides";
import { FEATURES, USE_CASES } from "./marketing";
import { PRODUCTS } from "./products";
import { TOOLS } from "./tools";

export type SitemapEntry = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  /** Short note for SEO audits - not rendered. */
  seo: string;
  /** ISO date of the last meaningful content change. Defaults to CONTENT_UPDATED. */
  lastmod?: string;
  /** Page-specific social image route, listed as an image sitemap entry. */
  image?: string;
};

/** Bump when marketing copy changes site-wide; a constant date keeps lastmod trustworthy for crawlers. */
export const CONTENT_UPDATED = "2026-11-15";

/**
 * Single source of truth for public indexable routes.
 * Keep in sync with pageMeta / generateMetadata on each route.
 */
/** Higher priority = crawl preference for key money pages. */
const featurePriority = (slug: string) =>
  slug === "seo-audit" ? 0.95 : slug === "uptime-monitoring" ? 0.9 : 0.85;

export const SITEMAP_PAGES: SitemapEntry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly", seo: "Brand + agency website monitoring", image: "/opengraph-image" },
  ...PRODUCTS.map((p) => ({
    path: `/${p.slug}`,
    priority: 0.98,
    changeFrequency: "weekly" as const,
    seo: p.title,
    image: `/${p.slug}/opengraph-image`,
  })),
  { path: "/features", priority: 0.95, changeFrequency: "weekly", seo: "All monitoring features hub", image: "/features/opengraph-image" },
  { path: "/features/seo-audit", priority: 0.95, changeFrequency: "weekly", seo: "Website SEO audit - multi-page on-page checks", image: "/features/seo-audit/opengraph-image" },
  ...FEATURES.filter((f) => f.slug !== "seo-audit").map((f) => ({
    path: `/features/${f.slug}`,
    priority: featurePriority(f.slug),
    changeFrequency: "weekly" as const,
    seo: f.title,
    image: `/features/${f.slug}/opengraph-image`,
  })),
  { path: "/use-cases", priority: 0.9, changeFrequency: "weekly", seo: "Audience use-cases hub", image: "/use-cases/opengraph-image" },
  ...USE_CASES.map((u) => ({
    path: `/use-cases/${u.slug}`,
    priority: 0.85,
    changeFrequency: "weekly" as const,
    seo: u.title,
    image: `/use-cases/${u.slug}/opengraph-image`,
  })),
  { path: "/tools", priority: 0.9, changeFrequency: "weekly", seo: "Free tools hub", image: "/tools/opengraph-image" },
  ...TOOLS.map((t) => ({ path: `/tools/${t.slug}`, priority: 0.9, changeFrequency: "weekly" as const, seo: t.title, image: `/tools/${t.slug}/opengraph-image` })),
  { path: "/blog", priority: 0.85, changeFrequency: "weekly", seo: "Blog & resources hub", image: "/blog/opengraph-image" },
  ...BLOG_POSTS.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: 0.85,
    changeFrequency: "monthly" as const,
    seo: p.title,
    lastmod: p.updated,
    image: `/blog/${p.slug}/opengraph-image`,
  })),
  { path: "/guides", priority: 0.8, changeFrequency: "weekly", seo: "Guides hub", image: "/guides/opengraph-image" },
  ...GUIDES.map((g) => ({ path: `/guides/${g.slug}`, priority: 0.8, changeFrequency: "monthly" as const, seo: g.title, lastmod: g.updated, image: `/guides/${g.slug}/opengraph-image` })),
  { path: "/compare", priority: 0.8, changeFrequency: "monthly", seo: "Comparisons hub", image: "/compare/opengraph-image" },
  ...COMPARISONS.map((c) => ({ path: `/compare/${c.slug}`, priority: 0.8, changeFrequency: "monthly" as const, seo: c.title, image: `/compare/${c.slug}/opengraph-image` })),
  { path: "/security", priority: 0.7, changeFrequency: "monthly", seo: "Security / trust", image: "/security/opengraph-image" },
  { path: "/about", priority: 0.55, changeFrequency: "monthly", seo: "About brand", image: "/about/opengraph-image" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly", seo: "Contact / book call", image: "/contact/opengraph-image" },
  { path: "/register", priority: 0.65, changeFrequency: "monthly", seo: "Start free CTA", image: "/register/opengraph-image" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly", seo: "Legal" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly", seo: "Legal" },
  { path: "/refund", priority: 0.2, changeFrequency: "yearly", seo: "Legal" },
  { path: "/shipping", priority: 0.2, changeFrequency: "yearly", seo: "Legal" },
];

/** Paths that must never appear in the sitemap. */
export const SITEMAP_EXCLUDED = ["/app", "/login", "/r", "/api"] as const;
