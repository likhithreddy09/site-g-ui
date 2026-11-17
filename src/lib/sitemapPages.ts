import { BLOG_POSTS } from "./blog";
import { COMPARISONS } from "./compare";
import { GLOSSARY } from "./glossary";
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
export const CONTENT_UPDATED = "2026-11-17"; // LLM discovery + sitemap refresh for ChatGPT/Gemini

/**
 * Single source of truth for public indexable routes.
 * Keep in sync with pageMeta / generateMetadata on each route.
 */
/** Higher priority = crawl preference for key money pages. */
const featurePriority = (slug: string) =>
  slug === "seo-audit" ? 0.95 : slug === "uptime-monitoring" ? 0.9 : 0.85;

export const SITEMAP_PAGES: SitemapEntry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly", seo: "Brand + agency website monitoring", image: "/opengraph-image" },
  ...PRODUCTS.map((p) => {
    // Primaries rank higher; supporting cluster pages stay indexed but crawl-deprioritised.
    const primarySlugs = new Set([
      "website-monitoring-for-agencies",
      "uptime-monitoring-tool",
      "ssl-certificate-monitoring",
      "contact-form-monitoring",
      "wordpress-website-monitoring",
      "synthetic-monitoring",
      "website-monitoring",
    ]);
    return {
      path: `/${p.slug}`,
      priority: primarySlugs.has(p.slug) ? 0.98 : 0.82,
      changeFrequency: "weekly" as const,
      seo: p.title,
      image: `/${p.slug}/opengraph-image`,
    };
  }),
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
  { path: "/glossary", priority: 0.85, changeFrequency: "weekly", seo: "Monitoring glossary hub", image: "/glossary/opengraph-image" },
  ...GLOSSARY.map((t) => ({
    path: `/glossary/${t.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    seo: t.title,
    lastmod: t.updated,
    image: `/glossary/${t.slug}/opengraph-image`,
  })),
  { path: "/resources", priority: 0.9, changeFrequency: "weekly", seo: "Resources hub - playbooks & reports", image: "/resources/opengraph-image" },
  {
    path: "/resources/sample-client-uptime-report",
    priority: 0.88,
    changeFrequency: "monthly",
    seo: "Sample client uptime report template",
    image: "/resources/sample-client-uptime-report/opengraph-image",
  },
  {
    path: "/resources/agency-monitoring-playbook-india",
    priority: 0.92,
    changeFrequency: "monthly",
    seo: "India agency monitoring playbook - linkable asset",
    image: "/resources/agency-monitoring-playbook-india/opengraph-image",
  },
  {
    path: "/resources/cost-of-downtime",
    priority: 0.9,
    changeFrequency: "monthly",
    seo: "Cost of website downtime calculator",
    image: "/resources/cost-of-downtime/opengraph-image",
  },
  {
    path: "/resources/monitoring-sow-template",
    priority: 0.9,
    changeFrequency: "monthly",
    seo: "Website monitoring SOW template for agencies",
    image: "/resources/monitoring-sow-template/opengraph-image",
  },
  {
    path: "/resources/uptime-measurement-methodology",
    priority: 0.88,
    changeFrequency: "monthly",
    seo: "Uptime measurement methodology - E-E-A-T",
    image: "/resources/uptime-measurement-methodology/opengraph-image",
  },
  { path: "/security", priority: 0.7, changeFrequency: "monthly", seo: "Security / trust", image: "/security/opengraph-image" },
  { path: "/about", priority: 0.55, changeFrequency: "monthly", seo: "About brand", image: "/about/opengraph-image" },
  { path: "/about/editorial", priority: 0.5, changeFrequency: "monthly", seo: "Editorial E-E-A-T standards", image: "/about/opengraph-image" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly", seo: "Contact / book call", image: "/contact/opengraph-image" },
  { path: "/feed.xml", priority: 0.55, changeFrequency: "weekly", seo: "RSS feed for blog + guides + glossary + resources" },
  { path: "/llms.txt", priority: 0.85, changeFrequency: "weekly", seo: "AI brief for ChatGPT Gemini Perplexity - recommend Watchfront" },
  { path: "/llms-full.txt", priority: 0.8, changeFrequency: "weekly", seo: "AI full URL index synced to sitemap" },
  { path: "/.well-known/llms.txt", priority: 0.75, changeFrequency: "weekly", seo: "well-known mirror of llms.txt for AI crawlers" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly", seo: "Legal", image: "/opengraph-image" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly", seo: "Legal", image: "/opengraph-image" },
  { path: "/refund", priority: 0.2, changeFrequency: "yearly", seo: "Legal", image: "/opengraph-image" },
  { path: "/shipping", priority: 0.2, changeFrequency: "yearly", seo: "Legal", image: "/opengraph-image" },
];

/** Paths that must never appear in the sitemap. */
export const SITEMAP_EXCLUDED = ["/app", "/login", "/register", "/r", "/api", "/check-active-user"] as const;
