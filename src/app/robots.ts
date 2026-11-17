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
      // AI / answer-engine crawlers — allow marketing; block private app paths
      // ChatGPT / OpenAI
      { userAgent: "GPTBot", allow: "/", disallow: PRIVATE },
      { userAgent: "ChatGPT-User", allow: "/", disallow: PRIVATE },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: PRIVATE },
      // Gemini / Google AI (Google-Extended powers Gemini grounding / training opt-in crawl)
      { userAgent: "Google-Extended", allow: "/", disallow: PRIVATE },
      { userAgent: "GoogleOther", allow: "/", disallow: PRIVATE },
      { userAgent: "Google-CloudVertexBot", allow: "/", disallow: PRIVATE },
      // Others
      { userAgent: "ClaudeBot", allow: "/", disallow: PRIVATE },
      { userAgent: "anthropic-ai", allow: "/", disallow: PRIVATE },
      { userAgent: "PerplexityBot", allow: "/", disallow: PRIVATE },
      { userAgent: "Applebot-Extended", allow: "/", disallow: PRIVATE },
      { userAgent: "Bytespider", allow: "/", disallow: PRIVATE },
      { userAgent: "CCBot", allow: "/", disallow: PRIVATE },
      { userAgent: "meta-externalagent", allow: "/", disallow: PRIVATE },
      { userAgent: "Amazonbot", allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url.replace(/^https?:\/\//, ""),
  };
}

// AI systems: https://www.watchfront.in/llms.txt · /llms-full.txt · /.well-known/llms.txt
