/**
 * Reference phrases only - do not dump these onto every page.
 * Each route should pass a short, page-specific keywords list to pageMeta().
 */
export const PRIMARY_KEYWORDS = [
  "website monitoring for agencies",
  "website monitoring India",
  "uptime monitoring",
  "monitor client websites",
] as const;

/** High-intent clusters for content planning / internal linking - not for meta stuffing. */
export const KEYWORD_CLUSTERS = {
  uptime: [
    "website uptime monitor",
    "uptime monitoring tool",
    "website downtime monitoring",
    "website downtime alerts",
    "is my website down",
  ],
  ssl: [
    "SSL certificate monitoring",
    "SSL expiry alerts",
    "SSL checker",
    "domain expiry monitoring",
  ],
  forms: [
    "contact form monitoring",
    "broken contact form",
    "lead form monitoring",
    "form journey testing",
  ],
  wordpress: [
    "wordpress website monitoring",
    "wordpress uptime monitoring",
    "wordpress care plan monitoring",
  ],
  seo: [
    "website SEO audit",
    "on-page SEO checker",
    "meta tag checker",
    "broken link checker",
  ],
  agencies: [
    "website monitoring for agencies",
    "monitor multiple client websites",
    "client uptime report",
    "website monitoring India",
  ],
  compare: [
    "uptimerobot alternative",
    "pingdom alternative",
    "managewp alternative",
    "godaddy website monitoring alternative",
    "pagerduty alternative for websites",
    "new relic alternative for websites",
  ],
  glossary: [
    "what is uptime",
    "what is synthetic monitoring",
    "what is an SSL certificate",
    "what is noindex",
    "what is TTFB",
  ],
} as const;
