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
    title: "Website Monitoring Tool for Agencies | Watchfront",
    description:
      "Website monitoring for agencies: uptime, SSL, forms, SEO and JS errors on every client site - with alerts and reports. Free 3-day trial.",
    h1: "Website monitoring that catches more than downtime",
    intro:
      "A homepage can return 200 while the contact form is dead, the SSL certificate is about to expire, or a plugin update broke the layout. Watchfront is website monitoring software built for agencies looking after many client websites - not a single ping check on one URL.",
    keywords: [
      "website monitoring",
      "website monitoring tool",
      "website monitoring for agencies",
      "monitor client websites",
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
    guide: "ssl-expiry-alerts-for-client-websites",
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
    title: "Website Monitoring Software for Client Sites | Watchfront",
    description:
      "Website monitoring software for agencies: uptime, SSL, journey tests, SEO audits, JS errors and client reports in one product. Free 3-day trial.",
    h1: "Website monitoring software for people who manage other people’s sites",
    intro:
      "Most website monitoring software is built for engineering teams watching one product. Watchfront is website monitoring software for agencies and freelancers - many clients, many WordPress and marketing sites, one desk.",
    keywords: [
      "website monitoring software",
      "website monitoring platform",
      "best website monitoring software",
      "website monitoring SaaS",
      "agency monitoring software",
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
    title: "Website Downtime Monitoring & Alerts | Watchfront",
    description:
      "Website downtime monitoring with fast alerts, retries and evidence for agencies. Know before clients ask why the site is down. Free 3-day trial.",
    h1: "Website downtime monitoring that tells you first",
    intro:
      "Website downtime monitoring should mean you hear about an outage before the client’s email lands. Watchfront confirms the failure, opens an incident with evidence, and keeps a history you can put in the monthly report.",
    keywords: [
      "website downtime monitoring",
      "website downtime alerts",
      "downtime monitoring",
      "website down monitoring",
      "outage monitoring",
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
];

export const productBySlug = (s: string) => PRODUCTS.find((p) => p.slug === s);
