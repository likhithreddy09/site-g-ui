import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const PRIVATE = ["/app/", "/r/", "/api/", "/login", "/register", "/check-active-user"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: PRIVATE,
      },
      {
        // Must crawl favicons + logo for SERP brand icon
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      // AI / answer-engine crawlers - allow public marketing; keep private app paths blocked
      { userAgent: "GPTBot", allow: "/", disallow: PRIVATE },
      { userAgent: "ChatGPT-User", allow: "/", disallow: PRIVATE },
      { userAgent: "ClaudeBot", allow: "/", disallow: PRIVATE },
      { userAgent: "anthropic-ai", allow: "/", disallow: PRIVATE },
      { userAgent: "PerplexityBot", allow: "/", disallow: PRIVATE },
      { userAgent: "Google-Extended", allow: "/", disallow: PRIVATE },
      { userAgent: "Applebot-Extended", allow: "/", disallow: PRIVATE },
      { userAgent: "Bytespider", allow: "/", disallow: PRIVATE },
      { userAgent: "CCBot", allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url.replace(/^https?:\/\//, ""),
  };
}

// Note: AI crawlers also discover https://www.watchfront.in/llms.txt and /llms-full.txt
