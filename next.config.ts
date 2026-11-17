import type { NextConfig } from "next";

const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

const nextConfig: NextConfig = {
  // Isolated build output so e2e testing does not clash with `npm run dev` on :3000.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    const faviconFresh = [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }];
    return [
      { source: "/app/:path*", headers: noindex },
      { source: "/r/:path*", headers: noindex },
      { source: "/favicon.ico", headers: faviconFresh },
      { source: "/favicon.svg", headers: faviconFresh },
      { source: "/favicon.png", headers: faviconFresh },
      { source: "/favicon-32.png", headers: faviconFresh },
      { source: "/favicon-48.png", headers: faviconFresh },
      { source: "/apple-touch-icon.png", headers: faviconFresh },
      { source: "/brand/favicon-v2.svg", headers: faviconFresh },
      { source: "/brand/favicon-v2.ico", headers: faviconFresh },
      { source: "/brand/favicon-32-v2.png", headers: faviconFresh },
      { source: "/brand/favicon-48-v2.png", headers: faviconFresh },
      { source: "/brand/apple-touch-icon-v2.png", headers: faviconFresh },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/marketing/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        source: "/brand/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
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
      { source: "/uptime", destination: "/uptime-monitoring-tool", permanent: true },
      { source: "/ssl", destination: "/ssl-certificate-monitoring", permanent: true },
      { source: "/monitoring", destination: "/website-monitoring-for-agencies", permanent: true },
      { source: "/agencies", destination: "/website-monitoring-for-agencies", permanent: true },
      { source: "/wordpress", destination: "/wordpress-website-monitoring", permanent: true },
      { source: "/freelancers", destination: "/use-cases/freelancers", permanent: true },
      { source: "/marketing", destination: "/use-cases/marketing-agencies", permanent: true },
      { source: "/seo", destination: "/features/seo-audit", permanent: true },
      { source: "/resources/playbook", destination: "/resources/agency-monitoring-playbook-india", permanent: true },
      { source: "/resources/report", destination: "/resources/sample-client-uptime-report", permanent: true },
      { source: "/resources/sow", destination: "/resources/monitoring-sow-template", permanent: true },
      { source: "/resources/downtime", destination: "/resources/cost-of-downtime", permanent: true },
      { source: "/resources/methodology", destination: "/resources/uptime-measurement-methodology", permanent: true },
      { source: "/playbook", destination: "/resources/agency-monitoring-playbook-india", permanent: true },
      { source: "/downtime-cost", destination: "/resources/cost-of-downtime", permanent: true },
      { source: "/cost-of-downtime", destination: "/resources/cost-of-downtime", permanent: true },
    ];
  },
};

export default nextConfig;
