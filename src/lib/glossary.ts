import type { Faq } from "./marketing";

/**
 * Glossary / definition pages for featured-snippet + AI-overview capture.
 * Each term targets a "what is X" / plain-English definition intent.
 */
export type GlossaryTerm = {
  slug: string;
  term: string;
  /** SERP title */
  title: string;
  description: string;
  /** One-sentence definition (speakable / featured snippet bait) */
  definition: string;
  /** Expanded plain-English explanation */
  body: string[];
  /** Why agencies care */
  whyItMatters: string[];
  keywords: string[];
  faqs?: Faq[];
  relatedProduct?: string;
  relatedFeature?: string;
  relatedTool?: string;
  relatedGuide?: string;
  updated: string;
};

export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: "uptime",
    term: "Uptime",
    title: "What Is Uptime? Definition for Websites | Watchfront",
    description:
      "Uptime means the percentage of time a website is reachable and responding correctly. Plain-English definition, formulas and agency examples.",
    definition:
      "Uptime is the share of time a website (or API) is available and responding successfully — usually expressed as a percentage over a day, week or month.",
    body: [
      "If a site answers correctly for 43,170 minutes in a 43,200-minute month, uptime is 99.93%. The missing minutes are downtime.",
      "Agencies track uptime per client URL so retainers can prove “we kept you online” with numbers, not vibes.",
    ],
    whyItMatters: [
      "Clients ask “were we down?” — uptime % answers in one number",
      "Hosting SLAs (99.9%) only mean something if you measure them",
      "Pair uptime with form and SSL checks — “up” is not the same as “working”",
    ],
    keywords: ["what is uptime", "uptime definition", "website uptime meaning", "uptime percentage"],
    relatedProduct: "uptime-monitoring-tool",
    relatedFeature: "uptime-monitoring",
    relatedTool: "website-down-checker",
    relatedGuide: "what-is-uptime-monitoring",
    updated: "2026-11-17",
    faqs: [
      { q: "Is 100% uptime realistic?", a: "Rarely. Even strong stacks have brief blips — measure honestly and communicate impact." },
      { q: "What does 99.9% uptime mean?", a: "About 43 minutes of downtime per month." },
    ],
  },
  {
    slug: "downtime",
    term: "Downtime",
    title: "What Is Downtime? Website Outage Definition | Watchfront",
    description:
      "Downtime is when a website is unreachable or failing for users. Definition, common causes and how agencies detect it fast.",
    definition:
      "Downtime is any period when a website or critical URL fails to respond correctly for users — timeouts, connection errors or repeated 5xx failures.",
    body: [
      "Brief blips happen. Confirmed downtime usually means consecutive failed checks after retries, so one bad probe does not count as an outage.",
      "Agencies need downtime history with start/end times to brief clients and fix root causes.",
    ],
    whyItMatters: [
      "Every minute of downtime on a lead-gen site costs campaigns and trust",
      "Clients forgive outages they hear about first — not from their customers",
      "Incidents with evidence beat “we think it was DNS” Slack threads",
    ],
    keywords: ["what is downtime", "website downtime", "downtime definition", "website outage"],
    relatedProduct: "website-downtime-monitoring",
    relatedFeature: "uptime-monitoring",
    relatedTool: "website-down-checker",
    relatedGuide: "website-down-what-to-do",
    updated: "2026-11-17",
  },
  {
    slug: "ssl-certificate",
    term: "SSL certificate",
    title: "What Is an SSL Certificate? Plain English | Watchfront",
    description:
      "An SSL (TLS) certificate proves a site’s identity and enables HTTPS. Definition, expiry risk and why agencies monitor certificates.",
    definition:
      "An SSL certificate (more precisely a TLS certificate) is a digital file that lets browsers encrypt traffic to a website and verify the server’s identity over HTTPS.",
    body: [
      "Without a valid certificate, browsers show a full-page security warning. Visitors leave. Forms and checkouts die.",
      "Certificates expire. Let’s Encrypt lasts about 90 days. Auto-renew fails after DNS moves, host changes and billing issues — which is why monitoring matters.",
    ],
    whyItMatters: [
      "Expired SSL looks like the agency “let the site break”",
      "www and apex can use different certificates",
      "Monitoring days-left beats hoping auto-renew worked",
    ],
    keywords: ["what is an SSL certificate", "SSL certificate meaning", "TLS certificate", "HTTPS certificate"],
    relatedProduct: "ssl-certificate-monitoring",
    relatedFeature: "ssl-domain-monitoring",
    relatedTool: "ssl-checker",
    relatedGuide: "what-is-ssl-monitoring",
    updated: "2026-11-17",
    faqs: [
      { q: "Is SSL the same as TLS?", a: "People say SSL colloquially; modern HTTPS uses TLS certificates." },
      { q: "How often should SSL be checked?", a: "Daily continuous monitoring with 30/14/7-day warnings is a solid agency default." },
    ],
  },
  {
    slug: "canonical-url",
    term: "Canonical URL",
    title: "What Is a Canonical URL? SEO Definition | Watchfront",
    description:
      "A canonical URL tells search engines which version of a page is the primary one. Definition and why agencies check canonicals after edits.",
    definition:
      "A canonical URL is the preferred address of a page, declared so search engines consolidate ranking signals when duplicates or near-duplicates exist (www vs apex, tracking params, print views).",
    body: [
      "The tag usually looks like `<link rel=\"canonical\" href=\"https://example.com/page\" />`. If it points at the wrong host or a staging URL, rankings and indexing suffer.",
      "Agencies catch bad canonicals with on-page SEO audits after migrations and page-builder edits.",
    ],
    whyItMatters: [
      "Wrong canonicals can deindex the live page",
      "Common after staging → production copies",
      "Pair with robots/noindex checks on money URLs",
    ],
    keywords: ["what is a canonical URL", "canonical tag", "rel canonical", "canonical URL meaning"],
    relatedProduct: "website-monitoring-software",
    relatedFeature: "seo-audit",
    relatedTool: "meta-tag-checker",
    updated: "2026-11-17",
  },
  {
    slug: "noindex",
    term: "Noindex",
    title: "What Does Noindex Mean? SEO Definition | Watchfront",
    description:
      "Noindex tells search engines not to show a page in results. Definition, how it appears, and why staging leftovers wreck client traffic.",
    definition:
      "Noindex is a directive (usually via meta robots or X-Robots-Tag) that asks search engines not to include a page in search results.",
    body: [
      "Useful on thank-you pages, staging and private content. Dangerous when left on a production landing page after a deploy.",
      "A site can be “up” with perfect uptime while Google quietly drops the money page. SEO audits catch that.",
    ],
    whyItMatters: [
      "Accidental noindex is a classic post-update disaster",
      "Ads keep spending while organic/landing indexability dies",
      "Monitor robots on campaign URLs, not just the homepage",
    ],
    keywords: ["what is noindex", "noindex meaning", "meta robots noindex", "accidental noindex"],
    relatedFeature: "seo-audit",
    relatedTool: "meta-tag-checker",
    relatedGuide: "how-to-choose-website-monitoring-tool",
    updated: "2026-11-17",
  },
  {
    slug: "http-status-code",
    term: "HTTP status code",
    title: "What Is an HTTP Status Code? | Watchfront",
    description:
      "HTTP status codes are three-digit responses from a server (200, 301, 404, 500…). Definition and what agencies look for in monitoring.",
    definition:
      "An HTTP status code is a three-digit number a server returns with each response to say whether the request succeeded, redirected, was blocked or failed.",
    body: [
      "2xx = success. 3xx = redirect. 4xx = client/page problem. 5xx = server failure. Timeouts may never return a code at all.",
      "Uptime monitors watch for unexpected codes and connection failures; redirect checkers map 301/302 chains after migrations.",
    ],
    whyItMatters: [
      "Status codes turn “site feels broken” into a diagnosable fact",
      "200 on the homepage can hide 500 on the form endpoint",
      "Free status checkers help triage “down for me vs everyone”",
    ],
    keywords: ["HTTP status code", "what is HTTP status", "200 404 500 meaning", "website status code"],
    relatedProduct: "website-uptime-monitor",
    relatedTool: "http-status-checker",
    relatedGuide: "website-down-for-everyone-or-just-me",
    updated: "2026-11-17",
  },
  {
    slug: "synthetic-monitoring",
    term: "Synthetic monitoring",
    title: "What Is Synthetic Monitoring? | Watchfront",
    description:
      "Synthetic monitoring runs scripted checks from outside your site on a schedule. Definition vs real-user monitoring for agencies.",
    definition:
      "Synthetic monitoring is automated testing that simulates users — requesting URLs or running browser journeys on a schedule from external servers — to detect failures before real customers report them.",
    body: [
      "Uptime pings, SSL checks and recorded form journeys are synthetic. They do not wait for traffic.",
      "Real-user (RUM) monitoring watches actual visitors. Agencies usually need both: synthetic for 24/7 coverage, RUM/JS errors for browser-only bugs.",
    ],
    whyItMatters: [
      "Care plans need checks that run when nobody is “looking”",
      "Catches overnight and weekend failures",
      "Evidence (status, screenshot) arrives with the alert",
    ],
    keywords: ["what is synthetic monitoring", "synthetic monitoring definition", "synthetic vs RUM", "proactive website monitoring"],
    relatedProduct: "website-monitoring",
    relatedFeature: "form-journey-testing",
    relatedGuide: "how-to-choose-website-monitoring-tool",
    updated: "2026-11-17",
  },
  {
    slug: "false-positive-alert",
    term: "False positive alert",
    title: "What Is a False Positive Alert in Monitoring? | Watchfront",
    description:
      "A false positive alert pages you when the site is fine. Definition and how agencies cut monitoring noise with retries and thresholds.",
    definition:
      "A false positive alert is a monitoring notification that fires when there is no real user-facing failure — often a single network blip or one bad probe.",
    body: [
      "Too many false positives and teams mute alerts. Then real outages get ignored. The fix is confirmation: retries, consecutive-failure thresholds and quiet hours.",
      "Good uptime tools record brief blips without waking the whole agency at 3am.",
    ],
    whyItMatters: [
      "Alert fatigue kills retainers’ value",
      "Clients notice when you miss a real outage after muting noise",
      "Design monitors for signal, not drama",
    ],
    keywords: ["false positive alert", "false alarm monitoring", "uptime false positives", "alert fatigue"],
    relatedProduct: "uptime-monitoring-tool",
    relatedFeature: "uptime-monitoring",
    relatedGuide: "reduce-false-uptime-alerts",
    updated: "2026-11-17",
  },
  {
    slug: "ttl-dns",
    term: "DNS TTL",
    title: "What Is DNS TTL? Definition for Site Moves | Watchfront",
    description:
      "DNS TTL is how long resolvers cache a DNS record. Definition and why agencies lower TTL before migrations.",
    definition:
      "DNS TTL (time to live) is the number of seconds a DNS record may be cached before resolvers should ask again — controlling how fast DNS changes propagate.",
    body: [
      "High TTL (e.g. 24 hours) means old IPs stick around after a host move. Lower TTL a day before migrations so cutovers propagate faster.",
      "TTL does not replace uptime monitoring — propagation issues still look like regional downtime.",
    ],
    whyItMatters: [
      "Migrations without TTL planning create “down for some users” chaos",
      "Clients blame the agency for DNS lag they could have prepared for",
      "Monitor after cutover until caches drain",
    ],
    keywords: ["what is DNS TTL", "DNS TTL meaning", "time to live DNS", "lower TTL before migration"],
    relatedProduct: "website-downtime-monitoring",
    relatedFeature: "uptime-monitoring",
    relatedGuide: "website-down-what-to-do",
    updated: "2026-11-17",
  },
  {
    slug: "mttr",
    term: "MTTR",
    title: "What Is MTTR in Website Monitoring? | Watchfront",
    description:
      "MTTR (mean time to repair/restore) measures how fast you recover from incidents. Definition for agency website ops.",
    definition:
      "MTTR (mean time to repair or restore) is the average time from detecting a failure to restoring service — a core reliability metric for monitored websites.",
    body: [
      "Fast detection without fast fix still hurts clients. Monitoring shortens detection; runbooks and evidence shorten repair.",
      "Agencies can track MTTR across the portfolio to show improving ops quality in retainers.",
    ],
    whyItMatters: [
      "Clients care how long they were down, not only that you “got an alert”",
      "Evidence-packed incidents reduce time wasted guessing",
      "Report MTTR lightly — trends beat vanity decimals",
    ],
    keywords: ["what is MTTR", "mean time to repair", "MTTR monitoring", "mean time to restore"],
    relatedProduct: "website-monitoring-software",
    relatedFeature: "client-reports",
    relatedGuide: "monitor-multiple-client-websites",
    updated: "2026-11-17",
  },
  {
    slug: "sla-uptime",
    term: "Uptime SLA",
    title: "What Is an Uptime SLA? | Watchfront",
    description:
      "An uptime SLA is a promised availability level (like 99.9%). Definition, math and how agencies verify host promises.",
    definition:
      "An uptime SLA is a contractual promise that a service will be available for a minimum percentage of time — for example 99.9% — over an agreed period.",
    body: [
      "99.9% ≈ 43 minutes of downtime per month. 99.99% ≈ 4 minutes. Without independent monitoring, you cannot prove whether a host met the SLA.",
      "Agency care plans sometimes include softer internal targets; still measure them.",
    ],
    whyItMatters: [
      "Hosting marketing claims need receipts",
      "Clients escalate when “enterprise SLA” feels broken",
      "Independent checks beat the host’s own status page alone",
    ],
    keywords: ["uptime SLA", "what is uptime SLA", "99.9 uptime meaning", "availability SLA"],
    relatedProduct: "uptime-monitoring-tool",
    relatedGuide: "what-is-uptime-monitoring",
    relatedTool: "website-down-checker",
    updated: "2026-11-17",
  },
  {
    slug: "open-graph",
    term: "Open Graph",
    title: "What Are Open Graph Tags? | Watchfront",
    description:
      "Open Graph tags control how links look when shared on WhatsApp, LinkedIn and Facebook. Definition and why agencies audit them.",
    definition:
      "Open Graph tags are meta tags (og:title, og:description, og:image) that tell social apps how to preview a link when someone shares a URL.",
    body: [
      "Missing or wrong OG tags make campaign links look broken or generic in WhatsApp — a silent conversion killer in India.",
      "SEO checkers and scheduled SEO audits verify OG fields alongside titles and canonicals.",
    ],
    whyItMatters: [
      "Share previews are part of marketing QA",
      "Theme/plugin updates often drop OG image tags",
      "Fix before ads and founder WhatsApp blasts",
    ],
    keywords: ["what are Open Graph tags", "og:title", "Open Graph SEO", "WhatsApp link preview"],
    relatedFeature: "seo-audit",
    relatedTool: "meta-tag-checker",
    updated: "2026-11-17",
  },
  {
    slug: "response-time",
    term: "Response time",
    title: "What Is Website Response Time? | Watchfront",
    description:
      "Website response time is how long a server takes to answer a request. Definition, good benchmarks and why agencies track it with uptime.",
    definition:
      "Response time is how long a website or API takes to return a response to a request — often measured as time to first byte from an external monitor.",
    body: [
      "Slow is not the same as down, but slow landing pages burn ads and patience. Monitoring stores response-time history next to uptime so you see regressions after deploys.",
      "Under ~500 ms to first byte is a solid marketing-site target; sustained multi-second responses deserve an incident or at least a client note.",
    ],
    whyItMatters: [
      "Clients feel “the site is broken” when it is only slow",
      "Plugin updates and shared hosting spikes show up in latency",
      "Pair latency trends with uptime % in reports",
    ],
    keywords: ["website response time", "what is response time", "TTFB", "server response time"],
    relatedProduct: "uptime-monitoring-tool",
    relatedFeature: "uptime-monitoring",
    relatedTool: "http-status-checker",
    updated: "2026-11-17",
  },
  {
    slug: "incident-management",
    term: "Incident management",
    title: "What Is Incident Management for Websites? | Watchfront",
    description:
      "Incident management is how teams detect, track and resolve website failures. Definition for agencies monitoring client sites.",
    definition:
      "Incident management is the process of detecting a failure, opening a tracked incident, investigating with evidence, fixing the issue and closing with a timeline — instead of losing the outage in chat scrollback.",
    body: [
      "For agencies, an incident should include when it started, what failed (uptime, SSL, form step), evidence and who owns the fix.",
      "Quiet months still need the system — so when something breaks, the path is automatic.",
    ],
    whyItMatters: [
      "Clients ask for timelines; incidents are the timeline",
      "Prevents “we thought someone else was looking”",
      "Feeds the monthly report without rewriting history",
    ],
    keywords: ["incident management", "website incident", "outage incident tracking", "monitoring incidents"],
    relatedProduct: "website-monitoring-software",
    relatedFeature: "client-reports",
    relatedGuide: "reduce-false-uptime-alerts",
    updated: "2026-11-17",
  },
  {
    slug: "white-label-report",
    term: "White-label report",
    title: "What Is a White-Label Uptime Report? | Watchfront",
    description:
      "A white-label uptime report shows monitoring results under your agency brand. Definition and what to include for retainers.",
    definition:
      "A white-label report is a client-facing document or link that presents monitoring results (uptime, incidents, SSL) under the agency’s brand instead of the tool’s brand.",
    body: [
      "Retainers renew when clients see calm proof. White-label reports turn invisible monitoring work into a professional artifact.",
      "Keep page one simple: uptime %, incidents, SSL days left — then detail.",
    ],
    whyItMatters: [
      "Procurement and founders skim — brand + clarity win",
      "Stops rebuilding Canva PDFs every month",
      "Ties monitoring spend to visible deliverables",
    ],
    keywords: ["white label uptime report", "white-label monitoring report", "agency client report", "branded uptime report"],
    relatedProduct: "website-monitoring-for-agencies",
    relatedFeature: "client-reports",
    relatedGuide: "monitor-multiple-client-websites",
    updated: "2026-11-17",
    faqs: [
      { q: "Is white-label the same as private label?", a: "In monitoring reports, yes in practice — your brand on the client-facing artifact." },
      { q: "Do clients need a login?", a: "Not always. Secure share links are enough for many retainers." },
    ],
  },
  {
    slug: "heartbeat-monitoring",
    term: "Heartbeat monitoring",
    title: "What Is Heartbeat Monitoring? | Watchfront",
    description:
      "Heartbeat monitoring expects a periodic signal from a job or service. Definition vs website uptime checks for agencies.",
    definition:
      "Heartbeat monitoring watches for a regular “I’m alive” signal from a job or service — if the pulse stops, something failed to run.",
    body: [
      "Cron jobs and workers often use heartbeats. Public marketing sites usually need URL synthetics instead — they do not emit heartbeats.",
      "If a client asks for cron monitoring, that is a different tool class than website uptime. Pick the right instrument.",
    ],
    whyItMatters: [
      "Stops buying the wrong monitor for brochure sites",
      "Clarifies scope in technical SOWs",
      "Website agencies usually need URL + journey synthetics first",
    ],
    keywords: ["heartbeat monitoring", "what is heartbeat monitoring", "cron heartbeat", "dead man switch monitoring"],
    relatedProduct: "api-monitoring-tool",
    relatedGuide: "how-to-monitor-website-apis",
    updated: "2026-11-17",
    faqs: [
      { q: "Does Watchfront do cron heartbeats?", a: "Watchfront focuses on website and API synthetics, not cron dead-man switches." },
      { q: "When do I need heartbeats?", a: "When the risk is a background job that never hits a public URL." },
    ],
  },
  {
    slug: "status-page",
    term: "Status page",
    title: "What Is a Status Page? | Watchfront",
    description:
      "A status page publishes service health to customers. Definition and why agencies still need independent monitoring.",
    definition:
      "A status page is a public (or private) page that communicates whether a service is operational, degraded or down — usually maintained by the service provider.",
    body: [
      "Useful for communication. Incomplete as detection. Providers can be slow to update, and your client’s specific site can fail while the platform status stays green.",
      "Agencies should monitor client URLs independently, then optionally link outages to a status narrative.",
    ],
    whyItMatters: [
      "Clients confuse “status green” with “my site works”",
      "Independent synthetics are the source of truth",
      "Use status pages for comms, not as your only monitor",
    ],
    keywords: ["what is a status page", "status page meaning", "public status page", "service status page"],
    relatedProduct: "synthetic-monitoring",
    relatedGuide: "synthetic-monitoring-vs-real-user-monitoring",
    updated: "2026-11-17",
  },
  {
    slug: "time-to-first-byte",
    term: "Time to first byte (TTFB)",
    title: "What Is TTFB (Time to First Byte)? | Watchfront",
    description:
      "TTFB is how long until the browser receives the first byte from the server. Definition and why monitors track it with uptime.",
    definition:
      "Time to first byte (TTFB) is the delay from requesting a URL to receiving the first byte of the response — a common proxy for server/origin responsiveness.",
    body: [
      "High TTFB often points at slow origin, cold caches or overloaded PHP/WordPress stacks. It is not a full Core Web Vital, but it is a useful synthetic signal.",
      "Track TTFB trends after plugin updates and host moves.",
    ],
    whyItMatters: [
      "Explains “feels slow” without a full RUM suite",
      "Flags regressions after deploys",
      "Complements uptime % in technical reviews",
    ],
    keywords: ["what is TTFB", "time to first byte", "TTFB meaning", "server response TTFB"],
    relatedProduct: "uptime-monitoring-tool",
    relatedTool: "http-status-checker",
    relatedFeature: "uptime-monitoring",
    updated: "2026-11-17",
  },
  {
    slug: "http-redirect",
    term: "HTTP redirect",
    title: "What Is an HTTP Redirect? | Watchfront",
    description:
      "An HTTP redirect sends browsers from one URL to another (301, 302…). Definition and why agencies trace redirect chains after migrations.",
    definition:
      "An HTTP redirect is a response that tells a browser or crawler to request a different URL — commonly 301 (permanent) or 302 (temporary).",
    body: [
      "Redirects are essential after HTTPS cutovers and site moves. Long chains and loops slow pages and confuse analytics.",
      "Use a redirect checker after migrations, then keep availability monitoring on the final URLs users hit.",
    ],
    whyItMatters: [
      "Broken redirects = soft 404s and lost ads",
      "www ↔ apex mistakes are common",
      "Verify chains before telling clients “everything redirects”",
    ],
    keywords: ["what is an HTTP redirect", "301 redirect", "302 redirect", "redirect chain"],
    relatedTool: "redirect-checker",
    relatedProduct: "website-monitoring",
    updated: "2026-11-17",
  },
  {
    slug: "care-plan",
    term: "Website care plan",
    title: "What Is a Website Care Plan? | Watchfront",
    description:
      "A website care plan is a retainer for updates, backups and monitoring. Definition and what Indian agencies should include.",
    definition:
      "A website care plan is a recurring retainer where an agency maintains a client’s site — typically updates, backups, security basics and increasingly continuous monitoring.",
    body: [
      "Care plans fail when “monitoring” is undefined. Name uptime, SSL, forms and reporting in the SOW.",
      "Price monitoring as insurance. Deliver evidence monthly.",
    ],
    whyItMatters: [
      "Ambiguous care plans create scope fights",
      "Named monitors renew more easily",
      "Separates updates/backups from runtime monitoring",
    ],
    keywords: ["what is a website care plan", "website care plan meaning", "wordpress care plan", "website retainer"],
    relatedProduct: "website-monitoring-for-agencies",
    relatedGuide: "how-to-write-monitoring-into-care-plans",
    updated: "2026-11-17",
  },
  {
    slug: "probe",
    term: "Monitoring probe",
    title: "What Is a Monitoring Probe? | Watchfront",
    description:
      "A monitoring probe is the external checker that requests your URL. Definition and why probe count matters less than confirmation rules.",
    definition:
      "A monitoring probe is an external server (or network location) that periodically requests your website or API to test availability and performance.",
    body: [
      "Vendors brag about dozens of cities. For most Indian agency portfolios, one solid external location with retries beats map theatre.",
      "Confirmation rules matter more than probe cosplay.",
    ],
    whyItMatters: [
      "Stops overbuying multi-region when you need forms/SSL",
      "Clarifies false-positive control",
      "Keeps demos honest",
    ],
    keywords: ["monitoring probe", "what is a probe", "uptime probe locations", "monitoring check location"],
    relatedProduct: "website-uptime-monitor",
    relatedGuide: "reduce-false-uptime-alerts",
    updated: "2026-11-17",
  },
];

export const glossaryBySlug = (s: string) => GLOSSARY.find((t) => t.slug === s);
