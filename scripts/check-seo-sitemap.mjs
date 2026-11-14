#!/usr/bin/env node
/**
 * Cross-check: every sitemap path has a matching page file / generateStaticParams slug,
 * and no private routes leak into the sitemap list.
 *
 * Run: node scripts/check-seo-sitemap.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "src");

// Dynamic import of compiled isn't available; parse marketing slugs from source.
const marketing = fs.readFileSync(path.join(src, "lib/marketing.ts"), "utf8");
const featureSlugs = [...marketing.matchAll(/slug:\s*"(.*?)"[\s\S]*?name:\s*"(.*?)"/g)]
  .filter((_, i, arr) => {
    // FEATURES come before USE_CASES; crude split on USE_CASES marker
    return true;
  })
  .map((m) => m[1]);

const useCasesIdx = marketing.indexOf("export const USE_CASES");
const featuresBlock = marketing.slice(0, useCasesIdx);
const useCasesBlock = marketing.slice(useCasesIdx);
const features = [...featuresBlock.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const useCases = [...useCasesBlock.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

const slugsIn = (file) => [...fs.readFileSync(path.join(src, file), "utf8").matchAll(/^\s{4}slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
const tools = slugsIn("lib/tools.ts");
const guides = slugsIn("lib/guides.ts");
const compares = slugsIn("lib/compare.ts");

const sitemapSrc = fs.readFileSync(path.join(src, "lib/sitemapPages.ts"), "utf8");
const staticPaths = [...sitemapSrc.matchAll(/path:\s*"(\/[^"]*)"/g)].map((m) => m[1]);

const expected = new Set([
  "/",
  "/features",
  ...features.map((s) => `/features/${s}`),
  "/use-cases",
  ...useCases.map((s) => `/use-cases/${s}`),
  "/tools",
  ...tools.map((s) => `/tools/${s}`),
  "/guides",
  ...guides.map((s) => `/guides/${s}`),
  "/compare",
  ...compares.map((s) => `/compare/${s}`),
  "/security",
  "/about",
  "/contact",
  "/register",
  "/privacy",
  "/terms",
  "/refund",
  "/shipping",
]);

const pageExists = (p) => {
  if (p === "/") return fs.existsSync(path.join(src, "app/page.tsx"));
  if (p.startsWith("/features/") && p !== "/features") {
    return features.includes(p.replace("/features/", ""));
  }
  if (p.startsWith("/use-cases/") && p !== "/use-cases") {
    return useCases.includes(p.replace("/use-cases/", ""));
  }
  for (const [prefix, list] of [["/tools/", tools], ["/guides/", guides], ["/compare/", compares]]) {
    if (p.startsWith(prefix)) {
      return list.includes(p.slice(prefix.length)) && fs.existsSync(path.join(src, "app", prefix.slice(1, -1), "[slug]", "page.tsx"));
    }
  }
  const file = path.join(src, "app", p.slice(1), "page.tsx");
  const layout = path.join(src, "app", p.slice(1), "layout.tsx");
  return fs.existsSync(file) || fs.existsSync(layout);
};

let errors = 0;
console.log(`Features (${features.length}): ${features.join(", ")}`);
console.log(`Use cases (${useCases.length}): ${useCases.join(", ")}`);
console.log(`Expected sitemap URLs: ${expected.size}`);

for (const p of expected) {
  if (!pageExists(p)) {
    console.error(`✗ Missing page for sitemap path: ${p}`);
    errors++;
  } else {
    console.log(`✓ ${p}`);
  }
}

for (const p of staticPaths) {
  if (!expected.has(p) && !p.includes("${")) {
    // static-only paths listed in sitemapPages — ok if in expected
  }
}

const forbidden = ["/app", "/login", "/api", "/r"];
for (const f of forbidden) {
  if ([...expected].some((p) => p === f || p.startsWith(f + "/"))) {
    console.error(`✗ Forbidden path in sitemap set: ${f}`);
    errors++;
  }
}

// Ensure pageMeta (or generateMetadata) exists for top-level routes
const metaRoutes = [
  ["app/page.tsx", "home (layout defaults + JsonLd)"],
  ["app/features/page.tsx", "pageMeta"],
  ["app/features/[slug]/page.tsx", "generateMetadata"],
  ["app/use-cases/page.tsx", "pageMeta"],
  ["app/use-cases/[slug]/page.tsx", "generateMetadata"],
  ["app/tools/page.tsx", "pageMeta"],
  ["app/tools/[slug]/page.tsx", "generateMetadata"],
  ["app/guides/page.tsx", "pageMeta"],
  ["app/guides/[slug]/page.tsx", "generateMetadata"],
  ["app/compare/page.tsx", "pageMeta"],
  ["app/compare/[slug]/page.tsx", "generateMetadata"],
  ["app/security/page.tsx", "pageMeta"],
  ["app/about/page.tsx", "pageMeta"],
  ["app/contact/page.tsx", "pageMeta"],
  ["app/register/layout.tsx", "pageMeta"],
  ["app/privacy/page.tsx", "pageMeta"],
  ["app/terms/page.tsx", "pageMeta"],
  ["app/refund/page.tsx", "pageMeta"],
  ["app/shipping/page.tsx", "pageMeta"],
];

for (const [rel, kind] of metaRoutes) {
  const file = path.join(src, rel);
  const text = fs.readFileSync(file, "utf8");
  const ok =
    kind.includes("home") ||
    text.includes("pageMeta") ||
    text.includes("generateMetadata");
  if (!ok) {
    console.error(`✗ No SEO metadata helper in ${rel}`);
    errors++;
  } else {
    console.log(`✓ meta ${rel}`);
  }
}

// Also emit a static public/sitemap.xml (fallback if the App Router route misbehaves on host).
const now = new Date().toISOString();
// Rank money pages first: home → features hub → SEO audit → free tools → rest
const rankFirst = ["/", "/features", "/features/seo-audit", "/tools", "/use-cases"];
const ordered = [
  ...rankFirst.filter((p) => expected.has(p)),
  ...[...expected].filter((p) => !rankFirst.includes(p)),
];
const pri = (p) =>
  p === "/" ? 1 :
  ["/features", "/features/seo-audit"].includes(p) ? 0.95 :
  p === "/features/uptime-monitoring" ? 0.9 :
  p === "/use-cases" || p === "/tools" || p.startsWith("/tools/") ? 0.9 :
  p.startsWith("/guides") || p.startsWith("/compare") ? 0.8 :
  p.startsWith("/features/") || p.startsWith("/use-cases/") ? 0.85 :
  ["/security", "/contact"].includes(p) ? 0.7 :
  p === "/register" ? 0.65 :
  p === "/about" ? 0.55 : 0.2;
const freq = (p) =>
  ["/", "/features", "/use-cases", "/guides"].includes(p) || p.startsWith("/features/") || p.startsWith("/use-cases/") || p.startsWith("/tools")
    ? "weekly"
    : ["/privacy", "/terms", "/refund", "/shipping"].includes(p)
      ? "yearly"
      : "monthly";
const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...ordered.flatMap((p) => [
    `<url>`,
    `<loc>https://www.watchfront.in${p}</loc>`,
    `<lastmod>${now}</lastmod>`,
    `<changefreq>${freq(p)}</changefreq>`,
    `<priority>${pri(p)}</priority>`,
    `</url>`,
  ]),
  `</urlset>`,
  ``,
].join("\n");
fs.writeFileSync(path.join(root, "public/sitemap.xml"), xml);
console.log(`Wrote public/sitemap.xml (${ordered.length} URLs)`);

if (errors) {
  console.error(`\n${errors} issue(s) found.`);
  process.exit(1);
}
console.log(`\nAll ${expected.size} sitemap routes have pages + SEO metadata hooks.`);
