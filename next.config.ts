import type { NextConfig } from "next";

const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/app/:path*", headers: noindex },
      { source: "/r/:path*", headers: noindex },
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
      { source: "/plans", destination: "/pricing", permanent: true },
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
