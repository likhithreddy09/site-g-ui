import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const PRIVATE = ["/app/", "/r/", "/api/", "/login"];

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
        userAgent: "Googlebot-Image",
        allow: ["/", "/opengraph-image", "/icon.svg", "/twitter-image", "/logo.png", "/favicon.ico", "/favicon.svg"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
