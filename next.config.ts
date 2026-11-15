import type { NextConfig } from "next";

const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    const faviconFresh = [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }];
    return [
      { source: "/app/:path*", headers: noindex },
      { source: "/r/:path*", headers: noindex },
      { source: "/favicon.ico", headers: faviconFresh },
      { source: "/favicon.svg", headers: faviconFresh },
      { source: "/favicon.png", headers: faviconFresh },
      { source: "/favicon-:size.png", headers: faviconFresh },
      { source: "/brand/favicon-:name*", headers: faviconFresh },
      { source: "/apple-touch-icon.png", headers: faviconFresh },
      { source: "/brand/apple-touch-icon-v2.png", headers: faviconFresh },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/signup", destination: "/register", permanent: true },
      { source: "/sign-up", destination: "/register", permanent: true },
      { source: "/sign-in", destination: "/login", permanent: true },
      { source: "/plans", destination: "/register", permanent: false },
      { source: "/pricing", destination: "/register", permanent: false },
      { source: "/features/uptime", destination: "/features/uptime-monitoring", permanent: true },
      { source: "/uptime", destination: "/features/uptime-monitoring", permanent: true },
      { source: "/ssl", destination: "/features/ssl-domain-monitoring", permanent: true },
      { source: "/monitoring", destination: "/features", permanent: true },
      { source: "/agencies", destination: "/use-cases/web-agencies", permanent: true },
      { source: "/wordpress", destination: "/use-cases/wordpress-maintenance", permanent: true },
      { source: "/freelancers", destination: "/use-cases/freelancers", permanent: true },
      { source: "/marketing", destination: "/use-cases/marketing-agencies", permanent: true },
      { source: "/seo", destination: "/features/seo-audit", permanent: true },
    ];
  },
};

export default nextConfig;
