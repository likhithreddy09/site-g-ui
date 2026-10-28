export const SITE = {
  name: "SiteGuard",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://siteguard.app").replace(/\/$/, ""),
  tagline: "Website monitoring & automated QA for agencies",
  description:
    "SiteGuard monitors uptime, SSL, content, JavaScript errors, APIs and the forms that bring in leads across every client website — then gives your agency the evidence to fix issues fast and client-ready reports to prove it.",
  keywords: [
    "website monitoring for agencies", "uptime monitoring", "website monitoring tool", "SSL certificate monitoring", "domain expiry monitoring",
    "visual regression testing", "broken link checker", "JavaScript error monitoring", "API monitoring", "form testing",
    "synthetic monitoring", "client website reports", "WordPress maintenance monitoring", "website QA automation",
  ],
  email: { hello: "hello@siteguard.app", sales: "sales@siteguard.app", security: "security@siteguard.app", privacy: "privacy@siteguard.app" },
  twitter: "@siteguardapp",
};

export const abs = (path = "/") => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
