/**
 * Topic clusters for cannibalization control + internal PageRank flow.
 * Each cluster has one primary money URL; supporting pages must differentiate
 * and link up to the primary (never compete with identical titles/intents).
 */

export type ClusterLink = { href: string; label: string; role: "primary" | "supporting" | "asset" };

export type TopicCluster = {
  id: string;
  name: string;
  /** Primary ranking URL for this intent family */
  primary: string;
  intent: string;
  links: ClusterLink[];
};

export const TOPIC_CLUSTERS: TopicCluster[] = [
  {
    id: "uptime",
    name: "Uptime & availability",
    primary: "/uptime-monitoring-tool",
    intent: "uptime monitoring tool / website uptime alerts",
    links: [
      { href: "/uptime-monitoring-tool", label: "Uptime monitoring tool", role: "primary" },
      { href: "/website-uptime-monitor", label: "Website uptime monitor (how monitors work)", role: "supporting" },
      { href: "/website-availability-monitoring", label: "Availability & SLA monitoring", role: "supporting" },
      { href: "/website-downtime-monitoring", label: "Downtime incidents & alerts", role: "supporting" },
      { href: "/features/uptime-monitoring", label: "Uptime feature deep-dive", role: "supporting" },
      { href: "/tools/website-down-checker", label: "Free website down checker", role: "asset" },
      { href: "/resources/cost-of-downtime", label: "Cost of downtime calculator", role: "asset" },
      { href: "/resources/uptime-measurement-methodology", label: "Uptime measurement methodology", role: "asset" },
      { href: "/glossary/uptime", label: "What is uptime?", role: "asset" },
      { href: "/glossary/mean-time-to-detect", label: "What is MTTD?", role: "asset" },
      { href: "/guides/what-is-uptime-monitoring", label: "Uptime monitoring guide", role: "asset" },
      { href: "/guides/reduce-mean-time-to-detect", label: "Reduce MTTD guide", role: "asset" },
      { href: "/guides/reduce-false-uptime-alerts", label: "Cut false alerts", role: "asset" },
    ],
  },
  {
    id: "agency-monitoring",
    name: "Agency website monitoring",
    primary: "/website-monitoring-for-agencies",
    intent: "website monitoring for agencies / client portfolios",
    links: [
      { href: "/website-monitoring-for-agencies", label: "Website monitoring for agencies", role: "primary" },
      { href: "/website-monitoring", label: "Website monitoring tool overview", role: "supporting" },
      { href: "/website-monitoring-software", label: "Monitoring software (platform)", role: "supporting" },
      { href: "/website-health-monitoring", label: "Multi-signal site health", role: "supporting" },
      { href: "/use-cases/web-agencies", label: "Web agencies use case", role: "supporting" },
      { href: "/guides/website-monitoring-india-agencies", label: "India agency guide", role: "asset" },
      { href: "/guides/how-to-write-monitoring-into-care-plans", label: "Write monitoring into care plans", role: "asset" },
      { href: "/resources/sample-client-uptime-report", label: "Sample client uptime report", role: "asset" },
      { href: "/resources/agency-monitoring-playbook-india", label: "Agency monitoring playbook", role: "asset" },
      { href: "/resources/monitoring-sow-template", label: "Monitoring SOW template", role: "asset" },
      { href: "/resources/cost-of-downtime", label: "Cost of downtime calculator", role: "asset" },
    ],
  },
  {
    id: "ssl",
    name: "SSL & domain",
    primary: "/ssl-certificate-monitoring",
    intent: "SSL certificate monitoring / expiry alerts",
    links: [
      { href: "/ssl-certificate-monitoring", label: "SSL certificate monitoring", role: "primary" },
      { href: "/domain-expiry-monitoring", label: "Domain expiry monitoring", role: "supporting" },
      { href: "/features/ssl-domain-monitoring", label: "SSL & domain feature", role: "supporting" },
      { href: "/tools/ssl-checker", label: "Free SSL checker", role: "asset" },
      { href: "/glossary/ssl-certificate", label: "What is an SSL certificate?", role: "asset" },
      { href: "/guides/what-is-ssl-monitoring", label: "What is SSL monitoring?", role: "asset" },
      { href: "/guides/ssl-expiry-alerts-for-client-websites", label: "SSL expiry alerts guide", role: "asset" },
    ],
  },
  {
    id: "forms",
    name: "Forms & journeys",
    primary: "/contact-form-monitoring",
    intent: "contact form monitoring / journey testing",
    links: [
      { href: "/contact-form-monitoring", label: "Contact form monitoring", role: "primary" },
      { href: "/features/form-journey-testing", label: "Form & journey testing", role: "supporting" },
      { href: "/guides/contact-form-monitoring-for-agencies", label: "Form monitoring for agencies", role: "asset" },
      { href: "/guides/contact-form-not-working", label: "Contact form not working", role: "asset" },
      { href: "/blog/agencies-lose-retainers-to-silent-form-failures", label: "Silent form failures", role: "asset" },
    ],
  },
  {
    id: "wordpress",
    name: "WordPress monitoring",
    primary: "/wordpress-website-monitoring",
    intent: "WordPress website monitoring / care plans",
    links: [
      { href: "/wordpress-website-monitoring", label: "WordPress website monitoring", role: "primary" },
      { href: "/use-cases/wordpress-maintenance", label: "WordPress maintenance use case", role: "supporting" },
      { href: "/guides/wordpress-uptime-monitoring", label: "WordPress uptime guide", role: "asset" },
      { href: "/blog/wordpress-care-plan-monitoring-checklist-india", label: "Care plan checklist", role: "asset" },
      { href: "/glossary/care-plan", label: "What is a care plan?", role: "asset" },
    ],
  },
  {
    id: "seo-hygiene",
    name: "SEO hygiene monitoring",
    primary: "/features/seo-audit",
    intent: "website SEO audit / meta regressions",
    links: [
      { href: "/features/seo-audit", label: "SEO audit feature", role: "primary" },
      { href: "/tools/seo-checker", label: "Free SEO checker", role: "asset" },
      { href: "/tools/meta-tag-checker", label: "Meta tag checker", role: "asset" },
      { href: "/broken-link-checker-tool", label: "Broken link monitoring", role: "supporting" },
      { href: "/glossary/noindex", label: "What is noindex?", role: "asset" },
      { href: "/glossary/canonical-url", label: "What is a canonical URL?", role: "asset" },
      { href: "/glossary/soft-404", label: "What is a soft 404?", role: "asset" },
      { href: "/blog/seo-regressions-after-wordpress-updates", label: "SEO regressions after updates", role: "asset" },
    ],
  },
  {
    id: "synthetic",
    name: "Synthetic monitoring",
    primary: "/synthetic-monitoring",
    intent: "synthetic monitoring for websites",
    links: [
      { href: "/synthetic-monitoring", label: "Synthetic monitoring", role: "primary" },
      { href: "/api-monitoring-tool", label: "API monitoring tool", role: "supporting" },
      { href: "/javascript-error-monitoring-tool", label: "JS error monitoring", role: "supporting" },
      { href: "/guides/synthetic-monitoring-vs-real-user-monitoring", label: "Synthetic vs RUM", role: "asset" },
      { href: "/glossary/synthetic-monitoring", label: "What is synthetic monitoring?", role: "asset" },
    ],
  },
];

/** Map a path to its cluster (longest primary/supporting match). */
export function clusterForPath(path: string): TopicCluster | undefined {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  for (const c of TOPIC_CLUSTERS) {
    if (c.links.some((l) => l.href === normalized)) return c;
  }
  return undefined;
}

/** Product slug → cluster id for money pages. */
export const PRODUCT_CLUSTER: Record<string, string> = {
  "uptime-monitoring-tool": "uptime",
  "website-uptime-monitor": "uptime",
  "website-availability-monitoring": "uptime",
  "website-downtime-monitoring": "uptime",
  "website-monitoring-for-agencies": "agency-monitoring",
  "website-monitoring": "agency-monitoring",
  "website-monitoring-software": "agency-monitoring",
  "website-health-monitoring": "agency-monitoring",
  "ssl-certificate-monitoring": "ssl",
  "domain-expiry-monitoring": "ssl",
  "contact-form-monitoring": "forms",
  "wordpress-website-monitoring": "wordpress",
  "broken-link-checker-tool": "seo-hygiene",
  "synthetic-monitoring": "synthetic",
  "api-monitoring-tool": "synthetic",
  "javascript-error-monitoring-tool": "synthetic",
};

export function clusterById(id: string) {
  return TOPIC_CLUSTERS.find((c) => c.id === id);
}
