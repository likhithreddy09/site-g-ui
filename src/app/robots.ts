import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const PRIVATE = ["/app/", "/r/", "/api/", "/login", "/check-active-user"];

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
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url.replace(/^https?:\/\//, ""),
  };
}
