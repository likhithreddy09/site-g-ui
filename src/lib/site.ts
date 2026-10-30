export const SITE = {
  name: "Watchfront",
  /** Registered / legal business name shown for Dodo Payments & billing (must match KYC). */
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME || "Watchfront",
  /** Trading / brand name if different from legal entity. */
  tradingAs: "Watchfront",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://watchfront.in").replace(/\/$/, ""),
  tagline: "Website monitoring for agencies in India",
  description:
    "Watchfront helps Indian agencies watch client sites for downtime, SSL problems, broken forms, SEO issues and JS errors - then share clear reports. Priced in INR. Start free.",
  keywords: [
    "website monitoring for agencies",
    "website monitoring India",
    "uptime monitoring",
    "monitor client websites",
    "SSL monitoring",
    "contact form monitoring",
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
