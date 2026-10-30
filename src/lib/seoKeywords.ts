/**
 * High-intent search phrases Watchfront should rank for.
 * Used in meta keywords, FAQ answers, and page copy — keep body text natural.
 */
export const PRIMARY_KEYWORDS = [
  "website monitoring for agencies",
  "website monitoring India",
  "uptime monitoring tool",
  "monitor client websites",
  "website downtime alerts",
  "SSL certificate monitoring",
  "domain expiry monitoring",
  "WordPress website monitoring",
  "website monitoring software INR",
] as const;

export const SECONDARY_KEYWORDS = [
  "uptime monitoring for web agencies",
  "website monitoring for freelancers",
  "client website uptime reports",
  "white label website monitoring",
  "contact form monitoring",
  "landing page monitoring",
  "broken link checker for agencies",
  "JavaScript error monitoring",
  "API monitoring tool",
  "visual regression testing websites",
  "synthetic monitoring",
  "website QA automation",
  "UptimeRobot alternative for agencies",
  "website monitoring with client reports",
  "INR website monitoring",
  "Dodo Payments website monitoring India",
] as const;

export const ALL_KEYWORDS = [...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS];

export function keywordsFor(...extra: string[]) {
  return [...PRIMARY_KEYWORDS, ...extra, ...SECONDARY_KEYWORDS.slice(0, 8)];
}
