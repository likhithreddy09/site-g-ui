import type { Faq } from "./marketing";

/**
 * Commercial product landers for non-brand search intents.
 * These are money pages: keyword in title/H1, unique copy, deep links into features/tools/guides.
 */
export type ProductPage = {
  slug: string;
  /** Short nav / footer label */
  nav: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  keywords: string[];
  /** Primary feature this page sells into */
  feature: string;
  /** Related feature slugs */
  features: string[];
  /** Optional free tool */
  tool?: string;
  /** Optional guide */
  guide?: string;
  bullets: string[];
  sections: { h: string; p: string[] }[];
  faqs: Faq[];
};

export const PRODUCTS: ProductPage[] = [
  {
    slug: "website-monitoring",
    nav: "Website monitoring",
    title: "Website Monitoring Tool (Uptime + Forms + SSL) | Watchfront",
    description:
      "Website monitoring tool that covers uptime, SSL, forms, SEO and JS errors — not just a homepage ping. Free 3-day trial.",
    h1: "Website monitoring that catches more than downtime",
    intro:
      "A homepage can return 200 while the contact form is dead, the SSL certificate is about to expire, or a plugin update broke the layout. This page is the product overview for “website monitoring tool” searches. For retainer/SOW workflow language, see website monitoring for agencies.",
    keywords: [
      "website monitoring",
      "website monitoring tool",
      "monitor client websites",
      "website monitoring beyond uptime",
      "website monitoring India",
    ],
    feature: "uptime-monitoring",
    features: ["uptime-monitoring", "ssl-domain-monitoring", "form-journey-testing", "seo-audit", "client-reports"],
    tool: "website-down-checker",
    guide: "website-monitoring-india-agencies",
    bullets: [
      "1-minute uptime checks with confirmed-outage alerts",
      "SSL and domain expiry warnings before clients notice",
      "Real-browser contact form and journey tests",
      "Multi-page SEO audits and JavaScript error grouping",
      "Client-ready reports for retainers and care plans",
    ],
    sections: [
      {
        h: "What website monitoring should cover",
        p: [
          "Basic uptime tools only ask whether a URL answers. Agencies need more: certificate expiry, broken lead forms, SEO regressions after content edits, and a report the client can understand at month-end.",
          "Watchfront groups sites by client, runs those checks on a schedule, and opens incidents with screenshots, status codes and timelines so your team can fix fast.",
        ],
      },
      {
        h: "Built for Indian agencies and freelancers",
        p: [
          "Support and workflows are shaped for portfolios of WordPress and marketing sites. Start a 3-day free trial with every feature - no card - then join the waitlist if Watchfront fits how you work.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the best website monitoring tool for agencies?",
        a: "The best fit covers uptime plus the failures clients notice: SSL expiry, broken forms, SEO regressions and shareable reports. Watchfront is built for that agency workflow.",
      },
      {
        q: "Is Watchfront a website monitoring tool for India?",
        a: "Yes. It is built and supported for Indian agencies managing many client websites, with a free 3-day trial to evaluate on a real portfolio.",
      },
      {
        q: "Do I need to install a plugin for website monitoring?",
        a: "No for uptime, SSL, SEO, content and journey checks. An optional lightweight script adds real-visitor JavaScript error monitoring.",
      },
    ],
  },
  {
    slug: "uptime-monitoring-tool",
    nav: "Uptime monitoring",
    title: "Uptime Monitoring Tool with Instant Alerts | Watchfront",
    description:
      "Uptime monitoring tool with 1-minute checks, retries and confirmed-outage alerts for client websites. Built for agencies. Free 3-day trial.",
    h1: "Uptime monitoring tool that filters noise, not outages",
    intro:
      "Looking for an uptime monitoring tool that does not cry wolf? Watchfront checks client sites every minute, confirms failures before paging you, and attaches the evidence so the first person who sees the alert can act.",
    keywords: [
      "uptime monitoring tool",
      "uptime monitoring",
      "website uptime monitoring",
      "website downtime alerts",
      "uptime checker",
    ],
    feature: "uptime-monitoring",
    features: ["uptime-monitoring", "ssl-domain-monitoring", "api-monitoring", "client-reports"],
    tool: "website-down-checker",
    guide: "what-is-uptime-monitoring",
    bullets: [
      "HTTP checks as often as every minute",
      "Retries and thresholds before an incident opens",
      "Email alerts with status and timing evidence",
      "Quiet hours and escalation for real portfolios",
      "Pairs with SSL, forms and SEO in the same workspace",
    ],
    sections: [
      {
        h: "Uptime monitoring vs a one-off status check",
        p: [
          "A free website down checker answers “is it down right now?” An uptime monitoring tool answers “was it down overnight, how long, and did we catch it before the client?”",
          "Use Watchfront’s free down checker for a spot check, then schedule continuous uptime monitoring on every client site you retain.",
        ],
      },
      {
        h: "Cut false uptime alerts",
        p: [
          "Confirm consecutive failures, check the URLs users actually hit, and keep evidence in the alert. That is how agency teams stop muting notifications - and still catch real outages.",
        ],
      },
      {
        h: "Primary page for “uptime monitoring tool” intent",
        p: [
          "This is the ranking page for tool/comparison queries. Supporting pages cover how monitors work, availability/SLA reporting and downtime incident workflows — linked in the topic cluster below so they do not dilute this intent.",
        ],
      },
      {
        h: "Put a rupee number on downtime",
        p: [
          "Clients renew when they understand risk. Use the free cost of downtime calculator to estimate revenue at risk from outage hours, then show how 1-minute checks + confirmation cut detection time.",
          "Close the loop with a sample client uptime report so the monthly PDF matches the SOW language you already sold.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is an uptime monitoring tool?",
        a: "Software that repeatedly checks whether websites or APIs respond, then alerts you when they fail - ideally after confirming the failure so brief blips do not wake the whole team.",
      },
      {
        q: "How often should uptime monitoring run?",
        a: "Every 1 minute is a strong default for client marketing sites. Raise the bar for checkout pages; use confirmation rules so one failed probe is not enough.",
      },
      {
        q: "Is Watchfront only an uptime tool?",
        a: "No. Uptime is the foundation - Watchfront also monitors SSL, forms, SEO, APIs and JS errors, and produces client reports.",
      },
      {
        q: "How is this different from availability monitoring?",
        a: "This page is the productised alerting tool. Availability monitoring focuses on SLA-style reachability proof and reporting language.",
      },
      {
        q: "How do I explain downtime cost to a client?",
        a: "Use a planning estimate: monthly revenue ÷ 720 hours × downtime hours × impact. Our free cost of downtime calculator does the math; pair it with monitoring evidence, not scare tactics.",
      },
    ],
  },
  {
    slug: "ssl-certificate-monitoring",
    nav: "SSL monitoring",
    title: "SSL Certificate Monitoring & Expiry Alerts | Watchfront",
    description:
      "SSL certificate monitoring with expiry alerts, HTTPS checks and domain registry warnings for every client site. Free 3-day trial.",
    h1: "SSL certificate monitoring that warns you early",
    intro:
      "An expired SSL certificate is a public embarrassment and a trust killer. Watchfront SSL certificate monitoring watches validity, HTTPS redirects and domain expiry across your client portfolio - and alerts you before browsers show a warning.",
    keywords: [
      "SSL certificate monitoring",
      "SSL monitoring",
      "SSL expiry alerts",
      "SSL certificate expiry monitoring",
      "domain expiry monitoring",
    ],
    feature: "ssl-domain-monitoring",
    features: ["ssl-domain-monitoring", "uptime-monitoring", "client-reports"],
    tool: "ssl-checker",
    guide: "domain-expiry-monitoring",
    bullets: [
      "Daily certificate chain validation",
      "Days-left and issuer visibility per hostname",
      "HTTPS redirect checks",
      "Domain registry expiry when the data is available",
      "Unknown dates shown as unknown - never guessed",
    ],
    sections: [
      {
        h: "Why SSL monitoring belongs next to uptime",
        p: [
          "A site can be “up” while Chrome blocks visitors with a certificate warning. Pair SSL certificate monitoring with uptime so both failures open incidents in the same place.",
        ],
      },
      {
        h: "Check once, then automate",
        p: [
          "Use the free SSL checker for a one-off read of issuer and expiry, then add continuous SSL certificate monitoring so renewals that fail silently still get caught.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is SSL certificate monitoring?",
        a: "Automated checks of a site’s TLS certificate - validity, hostname coverage, chain trust and expiry - with alerts before the certificate fails in browsers.",
      },
      {
        q: "How early should SSL expiry alerts fire?",
        a: "Give yourself enough time to fix auto-renewal failures - many teams alert at 30 and 14 days remaining, then escalate closer to expiry.",
      },
      {
        q: "Does Watchfront monitor domain expiry too?",
        a: "Yes. Domain registry expiry is checked where the registry exposes it; if the date is hidden, Watchfront shows unknown instead of inventing a value.",
      },
    ],
  },
  {
    slug: "website-monitoring-software",
    nav: "Monitoring software",
    title: "Website Monitoring Software Platform | Watchfront",
    description:
      "Website monitoring software platform: one workspace for uptime, SSL, journeys, SEO, JS errors and client reports across a portfolio. Free 3-day trial.",
    h1: "Website monitoring software as a platform — not a single ping product",
    intro:
      "Category buyers search “website monitoring software” when they want a platform, not a one-check gadget. Watchfront is that platform for agencies: many clients, many WordPress and marketing sites, shared incidents and reports.",
    keywords: [
      "website monitoring software",
      "website monitoring platform",
      "website monitoring SaaS platform",
      "agency monitoring software platform",
      "client website monitoring software",
    ],
    feature: "client-reports",
    features: ["uptime-monitoring", "form-journey-testing", "seo-audit", "javascript-error-monitoring", "client-reports"],
    tool: "seo-checker",
    guide: "monitor-multiple-client-websites",
    bullets: [
      "Client grouping and portfolio health",
      "Synthetic checks from outside the site - no plugin required for core monitors",
      "Journey tests that submit real forms safely",
      "Incidents with evidence, not guesswork",
      "Shareable reports that support retainers",
    ],
    sections: [
      {
        h: "What to look for in website monitoring software",
        p: [
          "Check frequency and false-alarm control. Depth beyond ping: SSL, forms, SEO, visual or content checks. Multi-client workflow and reports. Alert channels your team actually uses.",
          "If a tool only does uptime, you will still stitch together SSL checkers, form testers and monthly PDFs by hand.",
        ],
      },
      {
        h: "Try the software on a real client site",
        p: [
          "Start free for 3 days, add a production client website, and compare what Watchfront catches against your current stack. No card required to evaluate.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is website monitoring software?",
        a: "A product that continuously checks websites for availability and related failures, alerts your team, and often stores history and reports for clients or stakeholders.",
      },
      {
        q: "Who is Watchfront website monitoring software for?",
        a: "Web agencies, WordPress maintainers, marketing agencies and freelancers who look after client websites every week.",
      },
      {
        q: "How is Watchfront different from UptimeRobot?",
        a: "UptimeRobot is strong at simple uptime. Watchfront adds form journeys, SEO audits, JS errors and agency client reports on top of uptime and SSL.",
      },
    ],
  },
  {
    slug: "website-downtime-monitoring",
    nav: "Downtime monitoring",
    title: "Website Downtime Monitoring & Incident Alerts | Watchfront",
    description:
      "Website downtime monitoring focused on incidents: detect outages, open evidence-backed alerts, track downtime minutes for agency reports.",
    h1: "Website downtime monitoring for incidents — not vanity uptime charts",
    intro:
      "When searchers want “downtime monitoring,” they mean outages and aftermath: who got alerted, how long it lasted, what proof you have. This page is the incident workflow. For the continuous checking product, use the uptime monitoring tool.",
    keywords: [
      "website downtime monitoring",
      "website downtime alerts",
      "downtime incident monitoring",
      "website outage monitoring",
      "downtime minutes report",
    ],
    feature: "uptime-monitoring",
    features: ["uptime-monitoring", "api-monitoring", "form-journey-testing", "client-reports"],
    tool: "website-down-checker",
    guide: "website-down-for-everyone-or-just-me",
    bullets: [
      "Fast detection with confirmation rules",
      "Incidents you can assign and resolve",
      "Evidence: status codes, timing, screenshots where relevant",
      "History for postmortems and client updates",
      "Works alongside SSL and form monitoring",
    ],
    sections: [
      {
        h: "When the site is “up” but still broken",
        p: [
          "Downtime monitoring catches full outages. Pair it with journey tests so a 200 OK homepage does not hide a dead checkout or contact form.",
        ],
      },
      {
        h: "What to do when a site is down",
        p: [
          "Confirm it is down for everyone, check DNS and hosting, review recent deploys, then communicate. Watchfront’s guides and free down checker help you run that playbook - continuous monitoring keeps it from being manual every time.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is website downtime monitoring?",
        a: "Continuous checks that detect when a website stops responding correctly, then alert the people responsible so they can restore service.",
      },
      {
        q: "How fast should downtime alerts arrive?",
        a: "Aim for detection within a minute or two for important marketing sites, with confirmation so a single network blip is not treated as an outage.",
      },
      {
        q: "Can I try downtime monitoring free?",
        a: "Yes. Run a one-off check with the free website down checker, or start a 3-day Watchfront trial for continuous monitoring.",
      },
    ],
  },
  {
    slug: "contact-form-monitoring",
    nav: "Form monitoring",
    title: "Contact Form Monitoring for Agencies | Watchfront",
    description:
      "Contact form monitoring with real-browser journey tests. Catch broken lead forms before clients do. Free 3-day trial.",
    h1: "Contact form monitoring that submits the form for real",
    intro:
      "Lead forms fail silently after plugin updates, SMTP changes and theme edits. Contact form monitoring in Watchfront runs a real browser journey - fill, submit, assert the success message - on a schedule, with safety guards for live sites.",
    keywords: [
      "contact form monitoring",
      "form monitoring",
      "website form testing",
      "lead form monitoring",
      "broken contact form detection",
    ],
    feature: "form-journey-testing",
    features: ["form-journey-testing", "uptime-monitoring", "javascript-error-monitoring"],
    tool: "website-down-checker",
    guide: "contact-form-monitoring-for-agencies",
    bullets: [
      "Real-browser form fills and submits",
      "Assert thank-you or success states",
      "Unique test emails and clear test headers",
      "Payment steps blocked by default",
      "Incidents with screenshots when the journey fails",
    ],
    sections: [
      {
        h: "Why uptime alone misses broken forms",
        p: [
          "The homepage can be fine while the form endpoint returns 500 or the success page never appears. Only a journey test proves the path that generates leads still works.",
        ],
      },
      {
        h: "Safe on production sites",
        p: [
          "Watchfront marks test traffic, uses unique emails, and blocks payment requests by default. You confirm a form is safe to repeat before it is scheduled.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is contact form monitoring?",
        a: "Automated tests that complete a contact or lead form like a user would, then verify success - so you learn when forms stop converting.",
      },
      {
        q: "Will form monitoring spam my client’s inbox?",
        a: "Tests use clearly marked unique addresses and headers. Configure routing or filters for test mail, and never enable payment steps on live checkouts without care.",
      },
      {
        q: "Can I monitor booking or login flows too?",
        a: "Yes. Journey tests support multi-step flows beyond a single contact form.",
      },
    ],
  },
  {
    slug: "wordpress-website-monitoring",
    nav: "WordPress monitoring",
    title: "WordPress Website Monitoring for Agencies | Watchfront",
    description:
      "WordPress website monitoring for agencies: uptime, SSL, plugin-break form tests, SEO regressions and client reports. Free 3-day trial.",
    h1: "WordPress website monitoring built for care plans",
    intro:
      "WordPress sites break quietly after plugin updates, theme edits and host “security” patches. Watchfront WordPress website monitoring watches uptime, certificates, lead forms and on-page SEO so your care plan catches failures before the client’s customers do.",
    keywords: [
      "wordpress website monitoring",
      "wordpress uptime monitoring",
      "wordpress monitoring tool",
      "wordpress care plan monitoring",
      "monitor wordpress sites",
    ],
    feature: "form-journey-testing",
    features: ["uptime-monitoring", "ssl-domain-monitoring", "form-journey-testing", "seo-audit", "client-reports"],
    tool: "website-down-checker",
    guide: "wordpress-uptime-monitoring",
    bullets: [
      "1-minute uptime on every retained WordPress site",
      "SSL and domain expiry across the portfolio",
      "Real-browser Contact Form 7 / Gravity Forms journeys",
      "SEO audits after content or theme changes",
      "Monthly reports that sell the care plan",
    ],
    sections: [
      {
        h: "What WordPress monitoring must cover",
        p: [
          "A green homepage is not enough. Plugin updates break forms, SMTP stops delivering, SSL auto-renew fails after a DNS move, and a staging noindex sneaks into production. Agencies need checks that match how WordPress actually fails.",
          "Watchfront groups sites by client, runs those checks on a schedule, and attaches screenshots and status codes when something breaks.",
        ],
      },
      {
        h: "Fit for Indian WordPress retainers",
        p: [
          "Price monitoring into the care-plan SOW, then automate it. Start a 3-day free trial on a real client site and compare what your Monday glance was missing.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need a WordPress plugin for monitoring?",
        a: "No for uptime, SSL, SEO, content and form journeys. An optional script adds real-visitor JavaScript error monitoring.",
      },
      {
        q: "Can Watchfront test Contact Form 7 and Gravity Forms?",
        a: "Yes. Journey tests fill and submit the form in a real browser and assert the success state.",
      },
      {
        q: "Is this for WordPress.com or self-hosted?",
        a: "Self-hosted and most managed WordPress hosts work. Anything publicly reachable over HTTPS can be monitored.",
      },
    ],
  },
  {
    slug: "api-monitoring-tool",
    nav: "API monitoring",
    title: "API Monitoring Tool for Agencies | Watchfront",
    description:
      "API monitoring tool for form handlers, booking engines and CMS endpoints. Assert status and body on a schedule. Free 3-day trial.",
    h1: "API monitoring tool that catches what the homepage hides",
    intro:
      "Homepages stay up while booking APIs, form endpoints and headless CMS routes fail. Watchfront’s API monitoring tool checks the endpoints that make money - on a schedule, with assertions - so agencies find integration failures before clients do.",
    keywords: [
      "API monitoring tool",
      "API monitoring",
      "endpoint monitoring",
      "website API monitoring",
      "Postman monitoring",
    ],
    feature: "api-monitoring",
    features: ["api-monitoring", "uptime-monitoring", "form-journey-testing", "javascript-error-monitoring"],
    guide: "how-to-monitor-website-apis",
    bullets: [
      "Import Postman, OpenAPI, HAR, CSV or paste cURL",
      "Assert status codes, JSON fields, headers and latency",
      "Encrypted secret headers for tokens",
      "Incidents with plain-English failure reasons",
      "Pairs with uptime and form journeys in one workspace",
    ],
    sections: [
      {
        h: "Why agencies need API monitoring",
        p: [
          "Marketing sites increasingly depend on third-party booking, CRM and payment APIs. When those fail, the homepage still returns 200. Endpoint checks close that blind spot.",
        ],
      },
      {
        h: "Set up without a full observability suite",
        p: [
          "Paste a cURL or import the collection your developer already uses. Watchfront stores tokens encrypted and alerts when the contract breaks - without asking you to run Datadog for a brochure site.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is an API monitoring tool?",
        a: "Software that repeatedly calls HTTP endpoints, checks the response against rules you define, and alerts when the API misbehaves.",
      },
      {
        q: "Can I import Postman collections?",
        a: "Yes. Postman v2/v2.1, OpenAPI 3, Swagger 2, HAR and CSV are supported.",
      },
      {
        q: "Is API monitoring included in the free trial?",
        a: "Yes. The 3-day trial includes every Watchfront feature, including API monitors.",
      },
    ],
  },
  {
    slug: "javascript-error-monitoring-tool",
    nav: "JS error monitoring",
    title: "JavaScript Error Monitoring Tool | Watchfront",
    description:
      "JavaScript error monitoring for client websites. See real-visitor errors with the steps before the break. Free 3-day trial.",
    h1: "JavaScript error monitoring that shows what visitors hit",
    intro:
      "Synthetic checks miss browser-only failures. Watchfront’s JavaScript error monitoring tool captures real-visitor exceptions, groups them by fingerprint, and shows the journey before the break - so agencies fix the bugs clients feel.",
    keywords: [
      "javascript error monitoring",
      "JS error monitoring",
      "frontend error monitoring",
      "website javascript errors",
      "client-side error tracking",
    ],
    feature: "javascript-error-monitoring",
    features: ["javascript-error-monitoring", "form-journey-testing", "uptime-monitoring", "client-reports"],
    guide: "fix-javascript-errors-on-client-sites",
    bullets: [
      "Lightweight script for real-visitor errors",
      "Grouped fingerprints instead of alert spam",
      "Steps and console context before the failure",
      "Works alongside synthetic uptime and journeys",
      "Evidence you can put in a client update",
    ],
    sections: [
      {
        h: "Synthetic uptime vs real-browser errors",
        p: [
          "A site can pass every outside check and still throw on a specific browser, ad-blocked script, or mobile path. Real-visitor JS monitoring closes that gap without replacing uptime checks.",
        ],
      },
      {
        h: "Built for agency portfolios",
        p: [
          "Turn the script on for retained sites that run heavy themes or third-party tags. Pair with form journeys on the money pages so you catch both silent exceptions and broken submits.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need the script for all monitoring?",
        a: "No. Uptime, SSL, SEO and journey tests work without it. The script is only for real-visitor JavaScript errors.",
      },
      {
        q: "Will this slow the client site?",
        a: "The script is small and loads after interactive. It is designed for marketing sites, not heavy APM overhead.",
      },
      {
        q: "Can clients see JS errors?",
        a: "You control reporting. Share summaries in client reports or keep raw errors internal.",
      },
    ],
  },
  {
    slug: "broken-link-checker-tool",
    nav: "Broken link monitoring",
    title: "Broken Link Checker & Monitoring | Watchfront",
    description:
      "Broken link checker and continuous monitoring for client sites. Catch 404s and dead CTAs before they hurt SEO and trust. Free 3-day trial.",
    h1: "Broken link checker that keeps watching after the audit",
    intro:
      "A one-off broken link crawl is useful. Continuous broken link monitoring is what agencies need after content edits and redesigns. Watchfront finds dead links and missing content on a schedule - and opens incidents when money pages break.",
    keywords: [
      "broken link checker",
      "broken link monitoring",
      "dead link checker",
      "404 monitor",
      "website broken links",
    ],
    feature: "visual-regression-testing",
    features: ["visual-regression-testing", "seo-audit", "uptime-monitoring", "client-reports"],
    tool: "seo-checker",
    guide: "fix-broken-links-on-client-websites",
    bullets: [
      "Scheduled content and link checks on key pages",
      "Plain-English reasons for dead links",
      "Pairs with SEO audits for titles and indexing",
      "Incidents when important CTAs disappear",
      "Evidence for client reports after content work",
    ],
    sections: [
      {
        h: "Why broken links keep coming back",
        p: [
          "Agencies publish new landing pages, migrate blogs, and retire old offers. Links rot. A quarterly crawl is not enough when ads point at pages that quietly 404.",
        ],
      },
      {
        h: "Monitor the pages that make money",
        p: [
          "Prioritise campaign URLs, nav CTAs and footer contact links. Watchfront’s content checks watch the words and parts you mark as must-have - not every obscure archive page.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is Watchfront a free broken link checker?",
        a: "Use the free SEO checker for on-page hygiene, then schedule content and link monitoring in the trial for continuous coverage.",
      },
      {
        q: "Does it crawl the whole site?",
        a: "SEO audits crawl sitemap and important links. Content checks focus on the pages and elements you mark as critical.",
      },
      {
        q: "Will dynamic menus cause false alarms?",
        a: "Common moving UI (cookie banners, chat widgets) is ignored automatically, and you can hide other regions.",
      },
    ],
  },
  {
    slug: "website-uptime-monitor",
    nav: "Uptime monitor",
    title: "How a Website Uptime Monitor Works | Watchfront",
    description:
      "How a website uptime monitor works: probes, retries, confirmation thresholds and evidence. Built for agencies who need clarity, not noise.",
    h1: "How a website uptime monitor actually works",
    intro:
      "An uptime monitor is not a vibe check. It is a scheduled probe with retries, thresholds and a paper trail. This page explains the mechanics — for the productised tool with alerts and portfolio workflow, see our uptime monitoring tool.",
    keywords: [
      "website uptime monitor",
      "how uptime monitor works",
      "uptime monitor probes",
      "uptime monitor retries",
      "online uptime monitor explained",
    ],
    feature: "uptime-monitoring",
    features: ["uptime-monitoring", "ssl-domain-monitoring", "api-monitoring", "client-reports"],
    tool: "website-down-checker",
    guide: "what-is-uptime-monitoring",
    bullets: [
      "HTTP checks as often as every minute",
      "Retries and thresholds before incidents",
      "Email alerts with evidence",
      "Quiet hours for non-critical sites",
      "Uptime history for client reports",
    ],
    sections: [
      {
        h: "Uptime monitor vs free down checker",
        p: [
          "A free checker answers “is it down right now?” A website uptime monitor answers “was it down at 2am, for how long, and did we catch it first?”",
        ],
      },
      {
        h: "Built for multi-client portfolios",
        p: [
          "Group sites by client, route alerts to the right person, and export uptime into the monthly report without rebuilding charts in Canva.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is a website uptime monitor?",
        a: "A service that repeatedly requests your URLs and alerts you when they stop responding correctly - ideally after confirming the failure.",
      },
      {
        q: "How often should an uptime monitor check?",
        a: "Every 1 minute is a strong default for client marketing sites. Use confirmation rules so one failed probe is not enough.",
      },
      {
        q: "Is Watchfront free to try?",
        a: "Yes. 3-day free trial with every feature, no card required.",
      },
    ],
  },
  {
    slug: "domain-expiry-monitoring",
    nav: "Domain expiry",
    title: "Domain Expiry Monitoring & Alerts | Watchfront",
    description:
      "Domain expiry monitoring with early alerts across every client domain. Pair with SSL and uptime so renewals never surprise you. Free 3-day trial.",
    h1: "Domain expiry monitoring that warns before the site vanishes",
    intro:
      "When a domain lapses, the website and often email disappear. Watchfront domain expiry monitoring watches registry dates across your client portfolio - and shows unknown honestly when a registry hides the date.",
    keywords: [
      "domain expiry monitoring",
      "domain expiration monitoring",
      "domain expiry alerts",
      "monitor domain expiry",
      "website domain monitoring",
    ],
    feature: "ssl-domain-monitoring",
    features: ["ssl-domain-monitoring", "uptime-monitoring", "client-reports"],
    tool: "ssl-checker",
    guide: "domain-expiry-monitoring",
    bullets: [
      "Registry expiry checks where dates are published",
      "Honest unknown when WHOIS/RDAP hides the date",
      "Pairs with SSL certificate monitoring",
      "Portfolio view across every client hostname",
      "Report-ready next-expiry fields",
    ],
    sections: [
      {
        h: "Domain expiry vs SSL expiry",
        p: [
          "Different clocks, same client panic. Certificates can renew while the domain lapses - or the opposite. Monitor both.",
        ],
      },
      {
        h: "Agency workflow",
        p: [
          "Add every production domain once. Route alerts to whoever can renew. Put next expiry on the monthly report so renewals look proactive.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is domain expiry monitoring?",
        a: "Automated checks of a domain’s registration expiry date with alerts before it lapses.",
      },
      {
        q: "Why do some domains show unknown?",
        a: "Some registries hide expiry behind privacy. Watchfront shows unknown instead of inventing a date.",
      },
      {
        q: "Does this include DNS monitoring?",
        a: "Domain expiry is registration lifetime. Uptime checks still catch DNS resolution failures separately.",
      },
    ],
  },
  {
    slug: "website-monitoring-for-agencies",
    nav: "Agencies",
    title: "Website Monitoring for Agencies | Watchfront",
    description:
      "Website monitoring for agencies: portfolio uptime, SSL, form journeys, SEO audits and client reports. Built for Indian retainers. Free 3-day trial.",
    h1: "Website monitoring for agencies who manage many client sites",
    intro:
      "When you look after dozens of client websites, Monday tab-checks are not a strategy. Watchfront is website monitoring for agencies — group sites by client, catch downtime, SSL, broken forms and SEO regressions, then send a report that renews the retainer.",
    keywords: [
      "website monitoring for agencies",
      "agency website monitoring",
      "monitor client websites",
      "website monitoring agency tool",
      "multi client website monitoring",
    ],
    feature: "client-reports",
    features: ["uptime-monitoring", "ssl-domain-monitoring", "form-journey-testing", "seo-audit", "client-reports"],
    tool: "website-down-checker",
    guide: "website-monitoring-india-agencies",
    bullets: [
      "Client grouping and portfolio health",
      "1-minute uptime with confirmed outages",
      "SSL and domain expiry across the book",
      "Real-browser form journeys on lead paths",
      "Shareable monthly reports clients understand",
    ],
    sections: [
      {
        h: "Built for retainers, not one product team",
        p: [
          "Engineering monitors watch one app. Agencies watch many sites with different hosts, plugins and marketers editing pages. Watchfront matches that chaos with client folders, quiet hours and evidence-backed incidents.",
        ],
      },
      {
        h: "The agency stack (name it in the SOW)",
        p: [
          "Uptime on money URLs. SSL and domain expiry. One real-browser form journey per lead-gen site. SEO hygiene on campaign pages. A monthly report with one recommended next step.",
          "Steal the operating rhythm from the free India agency monitoring playbook, then automate it here.",
        ],
      },
      {
        h: "Sell monitoring as a line item",
        p: [
          "Name the checks in the SOW. Price them. Automate them. Then the monthly PDF is proof — not theatre. Start free for 3 days on a real portfolio.",
          "Copy scope language from the free monitoring SOW template, price downtime risk with the cost of downtime calculator, and show the monthly deliverable with the sample client uptime report.",
        ],
      },
      {
        h: "How this differs from “uptime tool” pages",
        p: [
          "Uptime tools answer “is it up?” This page is about the agency workflow: clients, retainers, forms, reports and SOWs. Use the uptime monitoring tool page when the search intent is purely uptime product comparison.",
        ],
      },
    ],
    faqs: [
      {
        q: "What should agencies monitor?",
        a: "Uptime on money URLs, SSL/domain expiry, at least one lead form journey, and SEO hygiene on campaign pages — plus a client report.",
      },
      {
        q: "Can clients see their own sites?",
        a: "Yes. Invite read-only client roles or share report links.",
      },
      {
        q: "Is Watchfront only for India?",
        a: "It is built and supported for Indian agencies, but any English-speaking agency portfolio can use it.",
      },
      {
        q: "Where is a sample report?",
        a: "Use the free sample client uptime report under Resources, then generate live reports from Watchfront.",
      },
      {
        q: "Do you have SOW / care-plan language?",
        a: "Yes — use the free monitoring SOW template for scope, confirmation rules, alert routing and exclusions, then automate those URLs in Watchfront.",
      },
    ],
  },
  {
    slug: "synthetic-monitoring",
    nav: "Synthetic monitoring",
    title: "Synthetic Monitoring for Client Websites | Watchfront",
    description:
      "Synthetic monitoring for agencies: scheduled uptime, SSL, browser journeys and API checks that catch failures before customers do. Free 3-day trial.",
    h1: "Synthetic monitoring that runs when your team is offline",
    intro:
      "Synthetic monitoring simulates users on a schedule — pings, certificate checks and real-browser journeys — so overnight and weekend failures do not wait for a Monday glance. Watchfront packages that stack for agency portfolios.",
    keywords: [
      "synthetic monitoring",
      "synthetic website monitoring",
      "synthetic transaction monitoring",
      "proactive website monitoring",
      "synthetic monitoring tool",
    ],
    feature: "form-journey-testing",
    features: ["uptime-monitoring", "form-journey-testing", "api-monitoring", "ssl-domain-monitoring"],
    guide: "how-to-choose-website-monitoring-tool",
    bullets: [
      "External HTTP checks every minute",
      "Browser journeys for forms and bookings",
      "API synthetics with assertions",
      "SSL validity on the same schedule",
      "Incidents with screenshots and status codes",
    ],
    sections: [
      {
        h: "Synthetic vs real-user monitoring",
        p: [
          "Synthetic coverage does not need traffic. Real-user JS errors need visitors. Agencies should run synthetics 24/7 and add RUM/JS where themes are heavy.",
        ],
      },
      {
        h: "Keep synthetics safe on production",
        p: [
          "Mark test traffic, use unique emails, and block payment steps by default. Synthetic does not mean reckless.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is synthetic monitoring?",
        a: "Automated checks that simulate users from outside your network on a schedule to detect failures early.",
      },
      {
        q: "Is uptime the same as synthetic monitoring?",
        a: "Uptime checks are a basic synthetic. Full synthetic stacks also include journeys, APIs and certificate checks.",
      },
      {
        q: "Do I need agents on the server?",
        a: "No for Watchfront’s core synthetics — they run from the outside.",
      },
    ],
  },
  {
    slug: "website-availability-monitoring",
    nav: "Availability monitoring",
    title: "Website Availability & SLA Monitoring | Watchfront",
    description:
      "Website availability monitoring for SLA conversations: measure reachability over time, confirm outages, and prove availability % in client reports.",
    h1: "Website availability monitoring for SLA-grade proof",
    intro:
      "Availability is the business word for “could customers reach us?” This page is about measuring and reporting availability percentages for retainers and host SLA disputes — not a generic uptime product tour. For the alerting tool itself, use the uptime monitoring tool.",
    keywords: [
      "website availability monitoring",
      "availability SLA monitoring",
      "website availability percentage",
      "site availability monitoring",
      "availability monitoring for agencies",
    ],
    feature: "uptime-monitoring",
    features: ["uptime-monitoring", "ssl-domain-monitoring", "api-monitoring", "client-reports"],
    tool: "website-down-checker",
    guide: "what-is-uptime-monitoring",
    bullets: [
      "External availability checks every minute",
      "Retries and thresholds cut false positives",
      "Status codes and timing on every incident",
      "Availability history for SLA conversations",
      "Works with SSL, forms and SEO in one workspace",
    ],
    sections: [
      {
        h: "Availability vs “working”",
        p: [
          "A URL can be available (HTTP 200) while the lead form is dead. Pair availability monitoring with journey tests on money paths.",
        ],
      },
      {
        h: "Prove availability to clients",
        p: [
          "Uptime % is availability over time. Put it on page one of the monthly report with incident minutes — not a vanity world map.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is website availability monitoring?",
        a: "Continuous checks that verify whether a website URL responds successfully from outside your network, with alerts when it does not.",
      },
      {
        q: "Is availability the same as uptime?",
        a: "Uptime is availability expressed over a period (often as a percentage). Availability monitoring is how you measure it.",
      },
      {
        q: "How fast should availability checks run?",
        a: "Every 1 minute is a strong default for client marketing sites, with confirmation so one blip is not an incident.",
      },
    ],
  },
  {
    slug: "website-health-monitoring",
    nav: "Health monitoring",
    title: "Website Health Monitoring (Multi-Signal) | Watchfront",
    description:
      "Multi-signal website health monitoring: combine availability, SSL, forms, SEO and JS errors into one portfolio health view for agencies.",
    h1: "Website health monitoring as a multi-signal score — not a green ping",
    intro:
      "Health is plural. One green ping is not healthy if SSL is dying, the form is broken or the landing page is noindex. This page is about composing those signals into a single agency health view — distinct from a pure uptime tool.",
    keywords: [
      "website health monitoring",
      "multi signal website health",
      "site health monitoring agencies",
      "website health score monitoring",
      "portfolio website health",
    ],
    feature: "uptime-monitoring",
    features: ["uptime-monitoring", "ssl-domain-monitoring", "form-journey-testing", "seo-audit", "javascript-error-monitoring", "client-reports"],
    tool: "seo-checker",
    guide: "best-website-monitoring-tools-for-agencies",
    bullets: [
      "Availability with confirmation rules",
      "SSL and domain expiry",
      "Lead-form journey health",
      "On-page SEO hygiene scores",
      "Optional real-visitor JS errors",
      "Health summarized in client reports",
    ],
    sections: [
      {
        h: "Health is a stack, not a single metric",
        p: [
          "A green uptime badge can hide SSL warnings and dead forms. Define health as the checks that protect revenue — then automate them.",
        ],
      },
      {
        h: "Show health without drama",
        p: [
          "Clients want calm proof. Put availability %, SSL days and journey pass rates on page one. Keep deep diagnostics internal until asked.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is website health monitoring?",
        a: "Ongoing checks that verify a site is reachable, secure, converting on key paths and not silently broken for SEO or browsers.",
      },
      {
        q: "Is a free website health checker enough?",
        a: "Spot checks help triage. Continuous health monitoring catches overnight and post-update failures.",
      },
      {
        q: "Can agencies white-label health reports?",
        a: "Yes — share branded reports from Watchfront’s client reporting feature.",
      },
    ],
  },
];

export const productBySlug = (s: string) => PRODUCTS.find((p) => p.slug === s);
