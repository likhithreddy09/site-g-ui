export const SITE = {
  name: "Watchfront",
  /** Registered / legal business name shown for Dodo Payments & billing (must match KYC). */
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME || "Watchfront",
  /** Trading / brand name if different from legal entity. */
  tradingAs: "Watchfront",
  /** Canonical host - keep one (prefer apex). Set NEXT_PUBLIC_SITE_URL in Vercel to match. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.watchfront.in").replace(/\/$/, ""),
  tagline: "Website monitoring tool for agencies",
  description:
    "Website monitoring tool for agencies: 1-minute uptime, SSL expiry alerts, contact-form checks, SEO hygiene and client reports. Free down & SSL checkers, then a 3-day full trial — no card.",
  keywords: [
    "website monitoring tool",
    "free website down checker",
    "is my website down",
    "down for everyone or just me",
    "check if website is up",
    "free ssl expiry checker",
    "uptime monitoring tool",
    "website monitoring",
    "website monitoring software",
    "website monitoring for agencies",
    "SSL certificate monitoring",
    "contact form monitoring",
    "wordpress website monitoring",
    "monitor client websites",
  ],
  email: {
    hello: process.env.NEXT_PUBLIC_EMAIL_HELLO || "likhith.reddy@watchfront.in",
    sales: process.env.NEXT_PUBLIC_EMAIL_SALES || "likhith.reddy@watchfront.in",
    security: process.env.NEXT_PUBLIC_EMAIL_SECURITY || "likhith.reddy@watchfront.in",
    privacy: process.env.NEXT_PUBLIC_EMAIL_PRIVACY || "likhith.reddy@watchfront.in",
    billing: process.env.NEXT_PUBLIC_EMAIL_BILLING || "likhith.reddy@watchfront.in",
  },
  /** Support phone - required on Contact Us for Dodo Payments (use the number registered in KYC). */
  phone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || "+91 72070 27415",
  phoneHref: (process.env.NEXT_PUBLIC_SUPPORT_PHONE || "+91 72070 27415").replace(/\s+/g, ""),
  address: {
    line1: process.env.NEXT_PUBLIC_ADDRESS_LINE1 || "",
    city: process.env.NEXT_PUBLIC_ADDRESS_CITY || "",
    country: process.env.NEXT_PUBLIC_ADDRESS_COUNTRY || "India",
  },
  /** Optional GSTIN shown on invoices / Contact when set. */
  gstin: process.env.NEXT_PUBLIC_GSTIN || "",
  payments: {
    provider: "Dodo Payments",
    currency: "INR",
  },
  twitter: "@watchfrontapp",
};

export const abs = (path = "/") => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
