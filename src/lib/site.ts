export const SITE = {
  name: "Watchfront",
  /** Registered / legal business name shown for Cashfree & billing (must match KYC). */
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME || "Watchfront",
  /** Trading / brand name if different from legal entity. */
  tradingAs: "Watchfront",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://watchfront.in").replace(/\/$/, ""),
  tagline: "Website monitoring & automated QA for agencies",
  description:
    "Watchfront monitors uptime, SSL, content, JavaScript errors, APIs and the forms that bring in leads across every client website — then gives your agency the evidence to fix issues fast and client-ready reports to prove it.",
  keywords: [
    "website monitoring for agencies", "uptime monitoring", "website monitoring tool", "SSL certificate monitoring", "domain expiry monitoring",
    "visual regression testing", "broken link checker", "JavaScript error monitoring", "API monitoring", "form testing",
    "synthetic monitoring", "client website reports", "WordPress maintenance monitoring", "website QA automation",
  ],
  email: {
    hello: process.env.NEXT_PUBLIC_EMAIL_HELLO || "likhith.reddy@watchfront.in",
    sales: process.env.NEXT_PUBLIC_EMAIL_SALES || "likhith.reddy@watchfront.in",
    security: process.env.NEXT_PUBLIC_EMAIL_SECURITY || "likhith.reddy@watchfront.in",
    privacy: process.env.NEXT_PUBLIC_EMAIL_PRIVACY || "likhith.reddy@watchfront.in",
    billing: process.env.NEXT_PUBLIC_EMAIL_BILLING || "likhith.reddy@watchfront.in",
  },
  /** Support phone — required on Contact Us for Cashfree (use the number registered in KYC). */
  phone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || "+91 72070 27415",
  phoneHref: (process.env.NEXT_PUBLIC_SUPPORT_PHONE || "+91 72070 27415").replace(/\s+/g, ""),
  address: {
    line1: process.env.NEXT_PUBLIC_ADDRESS_LINE1 || "India",
    city: process.env.NEXT_PUBLIC_ADDRESS_CITY || "",
    country: "India",
  },
  /** Optional GSTIN shown on invoices / Contact when set. */
  gstin: process.env.NEXT_PUBLIC_GSTIN || "",
  payments: {
    provider: "Cashfree Payments",
    currency: "INR",
  },
  twitter: "@watchfrontapp",
};

export const abs = (path = "/") => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
