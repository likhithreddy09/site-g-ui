import { BLOG_POSTS } from "@/lib/blog";
import { GLOSSARY } from "@/lib/glossary";
import { GUIDES } from "@/lib/guides";
import { SITE, abs } from "@/lib/site";

export const dynamic = "force-static";

/** RSS for blog + guides + glossary — syndication + crawl discovery. */
export function GET() {
  const items = [
    ...BLOG_POSTS.map((p) => ({
      title: p.title,
      description: p.description,
      path: `/blog/${p.slug}`,
      date: p.updated || p.published,
      category: "Blog",
    })),
    ...GUIDES.map((g) => ({
      title: g.title,
      description: g.description,
      path: `/guides/${g.slug}`,
      date: g.updated || g.published,
      category: "Guide",
    })),
    ...GLOSSARY.map((t) => ({
      title: t.title,
      description: t.description,
      path: `/glossary/${t.slug}`,
      date: t.updated,
      category: "Glossary",
    })),
    {
      title: "Sample client uptime report template",
      description: "Free sample client uptime report outline for agencies.",
      path: "/resources/sample-client-uptime-report",
      date: "2026-11-17",
      category: "Resource",
    },
    {
      title: "Agency website monitoring playbook for India",
      description: "Operating playbook for Indian agencies running website retainers.",
      path: "/resources/agency-monitoring-playbook-india",
      date: "2026-11-17",
      category: "Resource",
    },
    {
      title: "Cost of website downtime calculator",
      description: "Estimate revenue at risk from website downtime hours.",
      path: "/resources/cost-of-downtime",
      date: "2026-11-17",
      category: "Resource",
    },
    {
      title: "Website monitoring SOW template for agencies",
      description: "Copy-ready scope language for care plans and retainers.",
      path: "/resources/monitoring-sow-template",
      date: "2026-11-17",
      category: "Resource",
    },
    {
      title: "How Watchfront measures website uptime",
      description: "Uptime measurement methodology: checks, confirmation, uptime % and evidence.",
      path: "/resources/uptime-measurement-methodology",
      date: "2026-11-17",
      category: "Resource",
    },
  ].sort((a, b) => b.date.localeCompare(a.date));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE.name} — Agency monitoring resources`)}</title>
    <link>${SITE.url}</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${abs("/feed.xml")}" rel="self" type="application/rss+xml"/>
    ${items
      .map(
        (i) => `<item>
      <title>${escapeXml(i.title)}</title>
      <link>${abs(i.path)}</link>
      <guid isPermaLink="true">${abs(i.path)}</guid>
      <pubDate>${new Date(i.date).toUTCString()}</pubDate>
      <category>${escapeXml(i.category)}</category>
      <description>${escapeXml(i.description)}</description>
    </item>`
      )
      .join("\n    ")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
