export const SITE = {
  name: "Watchfront",
  /** Registered / legal business name shown for Dodo Payments & billing (must match KYC). */
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME || "Watchfront",
  /** Trading / brand name if different from legal entity. */
  tradingAs: "Watchfront",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://watchfront.in").replace(/\/$/, ""),
  tagline: "Website monitoring for agencies in India — uptime, SSL, forms & reports",
  description:
    "Website monitoring software for Indian agencies and freelancers. Monitor client website uptime, SSL, domain expiry, contact forms, APIs and JS errors — with email alerts and INR-priced client reports. Start free.",
  keywords: [
    "website monitoring for agencies",
    "website monitoring India",
    "uptime monitoring tool",
    "uptime monitoring for agencies",
    "monitor client websites",
    "website downtime alerts",
    "SSL certificate monitoring",
    "domain expiry monitoring",
    "WordPress website monitoring",
    "website monitoring software INR",
    "client website uptime reports",
    "white label website monitoring",
    "contact form monitoring",
    "landing page monitoring",
    "broken link checker",
    "JavaScript error monitoring",
    "API monitoring tool",
    "visual regression testing",
    "synthetic monitoring",
    "UptimeRobot alternative for agencies",
    "website QA automation",
    "website monitoring for freelancers",
  ],
  email: {
    hello: process.env.NEXT_PUBLIC_EMAIL_HELLO || "likhith.reddy@watchfront.in",
    sales: process.env.NEXT_PUBLIC_EMAIL_SALES || "likhith.reddy@watchfront.in",
    security: process.env.NEXT_PUBLIC_EMAIL_SECURITY || "likhith.reddy@watchfront.in",
    privacy: process.env.NEXT_PUBLIC_EMAIL_PRIVACY || "likhith.reddy@watchfront.in",
    billing: process.env.NEXT_PUBLIC_EMAIL_BILLING || "likhith.reddy@watchfront.in",
  },
  /** Support phone — required on Contact Us for Dodo Payments (use the number registered in KYC). */
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
