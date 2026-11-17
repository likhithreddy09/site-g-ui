import type { Faq } from "./marketing";

export type Comparison = {
  slug: string;
  competitor: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  keywords: string[];
  /** Neutral summary of what the competitor is known for. */
  theyDo: string[];
  /** Where Watchfront takes a different approach. */
  weDo: string[];
  /** Honest cases where the competitor is the better pick. */
  pickThemIf: string[];
  faqs: Faq[];
};

const SHARED_WE_DO = [
  "Real-browser journey tests that submit contact forms and booking flows and confirm the success message - not just a homepage ping",
  "Client grouping, per-client health and shareable, branded uptime reports built for agencies",
  "SEO audits, SSL and domain expiry, visual/content checks and JavaScript error tracking in the same workspace",
  "Incidents carry screenshots, console logs and timelines, with AI summaries that separate evidence from guesses",
  "Built and supported from India, for teams managing many client websites",
];

export const COMPARISONS: Comparison[] = [
  {
    slug: "uptimerobot-alternative",
    competitor: "UptimeRobot",
    title: "UptimeRobot Alternative for Agencies | Watchfront",
    description: "Looking for an UptimeRobot alternative? Watchfront adds form and journey testing, SEO audits, JS errors and client reports on top of uptime monitoring.",
    keywords: ["uptimerobot alternative", "uptime robot alternative", "uptimerobot vs", "best uptime monitoring tool"],
    h1: "An UptimeRobot alternative that checks more than “is it up?”",
    intro: "UptimeRobot is a popular, easy uptime monitor. But a site can return 200 OK while its contact form, checkout or layout is broken. Watchfront is built for agencies that need to catch those failures too - and show clients the proof.",
    theyDo: ["Simple HTTP, keyword, ping and port monitoring", "A well-known free tier for basic uptime checks", "Public status pages", "Many alert integrations"],
    weDo: SHARED_WE_DO,
    pickThemIf: ["You only need basic up/down checks on a handful of sites", "You want a long-running free tier and nothing more", "You don't need form testing, SEO audits or client reporting"],
    faqs: [
      { q: "Is Watchfront a replacement for UptimeRobot?", a: "Yes for uptime, SSL and domain monitoring - and it adds journey tests, SEO audits, JS error tracking and client reports that UptimeRobot isn't focused on." },
      { q: "Can I try Watchfront alongside UptimeRobot?", a: "Yes. Start a 3-day free trial, add the same sites, and compare what each tool catches." },
    ],
  },
  {
    slug: "pingdom-alternative",
    competitor: "Pingdom",
    title: "Pingdom Alternative for Agencies in India | Watchfront",
    description: "A Pingdom alternative built for agencies: uptime, SSL, form journeys, SEO audits, JS errors and client-ready reports in one workspace.",
    keywords: ["pingdom alternative", "pingdom alternative india", "pingdom vs", "website monitoring tool"],
    h1: "A Pingdom alternative built around agency workflows",
    intro: "Pingdom is a long-standing monitoring product with uptime, transaction and real-user monitoring. Watchfront focuses on what agencies juggle daily: many client sites, broken forms, SEO regressions and the report the client asks for at month-end.",
    theyDo: ["Uptime and page-speed monitoring", "Synthetic transaction checks", "Real user monitoring (RUM)", "Enterprise-grade integrations"],
    weDo: SHARED_WE_DO,
    pickThemIf: ["You need mature real-user performance analytics at scale", "Your organisation already standardises on its vendor's tooling", "You don't manage sites on behalf of clients"],
    faqs: [
      { q: "How is Watchfront different from Pingdom?", a: "Watchfront is organised around clients and portfolios: group sites per client, catch broken forms and SEO regressions, and send shareable reports - without stitching tools together." },
      { q: "Does Watchfront do transaction monitoring?", a: "Yes - user journey tests run in a real browser to fill forms, click and assert outcomes, with safety guards for live sites." },
    ],
  },
  {
    slug: "statuscake-alternative",
    competitor: "StatusCake",
    title: "StatusCake Alternative with Form Testing | Watchfront",
    description: "Compare Watchfront and StatusCake. Get uptime, SSL and domain monitoring plus contact-form journeys, SEO audits and agency client reports.",
    keywords: ["statuscake alternative", "statuscake vs", "uptime and ssl monitoring", "agency website monitoring"],
    h1: "A StatusCake alternative that tests forms, not just pages",
    intro: "StatusCake covers uptime, page speed, SSL and domain monitoring well. Watchfront covers those too, then goes further for agencies: real-browser form journeys, multi-page SEO audits, JS error grouping and reports clients actually read.",
    theyDo: ["Uptime monitoring from multiple locations", "Page speed checks", "SSL and domain monitoring", "Server monitoring"],
    weDo: SHARED_WE_DO,
    pickThemIf: ["You need server-level resource monitoring", "Page speed from many global regions is your main concern", "You don't need client grouping or reports"],
    faqs: [
      { q: "Does Watchfront monitor SSL and domain expiry like StatusCake?", a: "Yes. Every site gets certificate validity, HTTPS redirect checks and domain registry expiry - and unknown values are shown as unknown, not guessed." },
      { q: "Can my clients see their own sites?", a: "Yes. Invite clients with a read-only role scoped to their websites, or share report links." },
    ],
  },
  {
    slug: "better-stack-alternative",
    competitor: "Better Stack",
    title: "Better Stack Alternative for Website Agencies | Watchfront",
    description: "A Better Stack (Better Uptime) alternative focused on agencies: client grouping, form journey tests, SEO audits and client reports alongside uptime.",
    keywords: ["better stack alternative", "better uptime alternative", "betterstack vs", "uptime monitoring for agencies"],
    h1: "A Better Stack alternative focused on client websites",
    intro: "Better Stack is a polished platform for uptime, incident management, on-call and logs - great for engineering teams running their own product. Watchfront is shaped for agencies looking after dozens of client websites.",
    theyDo: ["Uptime monitoring with incident management", "On-call scheduling and escalations", "Status pages", "Log management"],
    weDo: SHARED_WE_DO,
    pickThemIf: ["You're an engineering team running one product with on-call rotations", "You want logs and uptime in a single observability suite", "Status pages are a core requirement"],
    faqs: [
      { q: "Is Watchfront better than Better Stack?", a: "For agencies managing many client sites, Watchfront's client grouping, form tests, SEO audits and reports usually fit better. For product engineering teams needing on-call and logs, Better Stack may suit more." },
      { q: "Does Watchfront have escalations?", a: "Yes. Unacknowledged incidents can escalate to extra recipients after a delay you choose, and quiet hours mute non-critical alerts." },
    ],
  },
  {
    slug: "site24x7-alternative",
    competitor: "Site24x7",
    title: "Site24x7 Alternative for Agencies | Watchfront",
    description: "Want a simpler Site24x7 alternative? Watchfront gives agencies uptime, SSL, forms, SEO audits, JS errors and client reports without enterprise complexity.",
    keywords: ["site24x7 alternative", "site24x7 vs", "simple website monitoring", "website monitoring india"],
    h1: "A simpler Site24x7 alternative for agency teams",
    intro: "Site24x7 is a broad, full-stack monitoring suite covering servers, networks, applications and websites. If you mainly look after client websites, Watchfront gives you the checks that matter in a far simpler workspace.",
    theyDo: ["Full-stack infrastructure monitoring", "Server, network and cloud monitoring", "Application performance monitoring", "Website and synthetic monitoring"],
    weDo: SHARED_WE_DO,
    pickThemIf: ["You need to monitor servers, networks and cloud infrastructure", "You want one suite for IT operations", "You have a dedicated ops team to configure it"],
    faqs: [
      { q: "Is Watchfront easier to set up than Site24x7?", a: "Watchfront is intentionally narrower: paste a URL and checks start within a minute. There's nothing to install for uptime, SSL, SEO and journey checks." },
      { q: "Does Watchfront monitor servers?", a: "No. Watchfront monitors websites and APIs from the outside, plus optional real-visitor JavaScript errors. It doesn't install server agents." },
    ],
  },
  {
    slug: "freshping-alternative",
    competitor: "Freshping",
    title: "Freshping Alternative for Agencies | Watchfront",
    description: "Looking for a Freshping alternative? Watchfront adds form journeys, SEO audits, SSL/domain expiry and client reports on top of uptime checks.",
    keywords: ["freshping alternative", "freshping vs", "freshworks uptime alternative", "website monitoring for agencies"],
    h1: "A Freshping alternative built for client portfolios",
    intro: "Freshping is a straightforward uptime tool from Freshworks - great for simple “is it up?” checks. Agencies usually need more: broken forms, SSL expiry, SEO regressions and a report clients will actually open. That is where Watchfront is different.",
    theyDo: ["HTTP and HTTPS uptime checks", "Public status pages", "Email and Slack alerts", "Simple dashboard for a small number of checks"],
    weDo: SHARED_WE_DO,
    pickThemIf: ["You only need basic uptime on a few personal or internal sites", "You already live in the Freshworks suite and want the simplest add-on", "You do not need form testing, SEO or client reports"],
    faqs: [
      { q: "Is Watchfront a Freshping alternative?", a: "Yes for uptime monitoring, and it also covers SSL, forms, SEO audits, JS errors and agency client reports that Freshping is not built for." },
      { q: "Can I migrate from Freshping easily?", a: "Add the same URLs in Watchfront during the 3-day trial. Uptime checks start within a minute - no agent to install." },
    ],
  },
  {
    slug: "hetrixtools-alternative",
    competitor: "HetrixTools",
    title: "HetrixTools Alternative for Website Agencies | Watchfront",
    description: "Compare Watchfront and HetrixTools. Get uptime and blacklist-style peace of mind plus form testing, SEO audits and client-ready reports for agencies.",
    keywords: ["hetrixtools alternative", "hetrix tools alternative", "hetrixtools vs", "uptime monitoring india"],
    h1: "A HetrixTools alternative focused on client websites",
    intro: "HetrixTools is known for uptime monitoring and blacklist / reputation checks. If your day job is looking after many client websites - forms, SSL, SEO and month-end reports - Watchfront is shaped around that workflow instead of infrastructure reputation tooling.",
    theyDo: ["Uptime monitoring", "Blacklist monitoring", "Server resource monitoring", "Status pages"],
    weDo: SHARED_WE_DO,
    pickThemIf: ["Blacklist and IP reputation monitoring is your main need", "You manage servers more than marketing websites", "You want public status pages as a core feature"],
    faqs: [
      { q: "Does Watchfront do blacklist monitoring?", a: "No. Watchfront watches websites and APIs from the outside: uptime, SSL, forms, SEO, visual changes and JS errors." },
      { q: "Who should pick Watchfront over HetrixTools?", a: "Agencies and freelancers managing client websites who need form journeys, SEO audits and shareable client reports." },
    ],
  },
  {
    slug: "cronitor-alternative",
    competitor: "Cronitor",
    title: "Cronitor Alternative for Website Monitoring | Watchfront",
    description: "Need a Cronitor alternative for websites? Watchfront monitors client sites with uptime, SSL, form journeys, SEO audits and reports - not just cron jobs.",
    keywords: ["cronitor alternative", "cronitor vs", "cron job monitoring alternative", "website monitoring tool"],
    h1: "A Cronitor alternative when you monitor websites, not jobs",
    intro: "Cronitor shines at monitoring cron jobs, heartbeats and scheduled tasks. If what you actually need is watching client websites for downtime, expired certificates, broken forms and SEO regressions, Watchfront is the better fit.",
    theyDo: ["Cron and heartbeat monitoring", "Job failure alerts", "Dashboards for scheduled workloads", "Integrations for engineering teams"],
    weDo: SHARED_WE_DO,
    pickThemIf: ["Your main risk is failed cron jobs or background workers", "You are an engineering team, not an agency", "Website UX and client reporting are not your problem"],
    faqs: [
      { q: "Can Watchfront replace Cronitor?", a: "Only if you mainly need website and API monitoring. Watchfront does not monitor cron heartbeats the way Cronitor does." },
      { q: "Does Watchfront monitor APIs?", a: "Yes. API monitors check endpoints on a schedule with status and body assertions, alongside website checks." },
    ],
  },
  {
    slug: "uptime-com-alternative",
    competitor: "Uptime.com",
    title: "Uptime.com Alternative for Agencies | Watchfront",
    description:
      "Looking for an Uptime.com alternative? Watchfront adds form journeys, SEO audits, JS errors and agency client reports on top of uptime and SSL.",
    keywords: ["uptime.com alternative", "uptime com alternative", "uptime.com vs", "best uptime monitoring for agencies"],
    h1: "An Uptime.com alternative shaped for agency portfolios",
    intro:
      "Uptime.com is a capable multi-location uptime platform. Agencies that manage many client WordPress and marketing sites usually need more than probe geography: broken forms, SSL expiry, SEO regressions and a report the client will open. That is Watchfront’s focus.",
    theyDo: ["Multi-location uptime checks", "Transaction and API monitoring options", "Status pages", "Integrations for ops teams"],
    weDo: SHARED_WE_DO,
    pickThemIf: ["You need many global probe locations as the primary buying reason", "You already standardise on Uptime.com across an enterprise", "You do not need agency client grouping or form journeys"],
    faqs: [
      {
        q: "Is Watchfront a full Uptime.com replacement?",
        a: "For website uptime, SSL and related agency checks, yes. If you specifically need Uptime.com’s enterprise probe network or status-page product, keep that and use Watchfront for client-site workflows.",
      },
      {
        q: "Can I trial Watchfront alongside Uptime.com?",
        a: "Yes. Start the 3-day free trial, add the same URLs, and compare what each tool catches on forms and SEO.",
      },
    ],
  },
  {
    slug: "managewp-alternative",
    competitor: "ManageWP",
    title: "ManageWP Alternative for Monitoring | Watchfront",
    description:
      "Need a ManageWP alternative focused on monitoring? Watchfront watches uptime, SSL, forms and SEO across client WordPress sites with shareable reports.",
    keywords: ["managewp alternative", "managewp monitoring alternative", "wordpress monitoring alternative", "manage wp vs"],
    h1: "A ManageWP alternative when monitoring is the gap",
    intro:
      "ManageWP is strong for updates, backups and bulk WordPress management. Many agencies still need deeper runtime monitoring: confirmed downtime, SSL expiry, form journeys and SEO hygiene. Watchfront fills that monitoring layer without replacing your update workflow.",
    theyDo: ["Bulk WordPress updates and backups", "Client reporting for maintenance work", "Security and performance add-ons", "Central dashboard for many WP sites"],
    weDo: SHARED_WE_DO,
    pickThemIf: ["You primarily need bulk updates and backups", "You already run ManageWP for maintenance and only want light uptime", "You do not need real-browser form tests"],
    faqs: [
      {
        q: "Does Watchfront replace ManageWP?",
        a: "No. Watchfront is monitoring-first. Keep ManageWP (or similar) for updates and backups; use Watchfront for uptime, SSL, forms, SEO and client uptime reports.",
      },
      {
        q: "Can both run on the same WordPress sites?",
        a: "Yes. Watchfront monitors from the outside and does not conflict with ManageWP’s worker plugin.",
      },
    ],
  },
  {
    slug: "godaddy-website-monitoring-alternative",
    competitor: "GoDaddy Website Monitoring",
    title: "GoDaddy Website Monitoring Alternative | Watchfront",
    description:
      "Outgrown GoDaddy website monitoring? Watchfront gives agencies uptime, SSL, form tests, SEO audits and client reports in one workspace.",
    keywords: [
      "godaddy website monitoring alternative",
      "godaddy uptime monitoring alternative",
      "godaddy monitoring vs",
      "website monitoring india",
    ],
    h1: "A GoDaddy website monitoring alternative for serious retainers",
    intro:
      "GoDaddy’s built-in monitoring is fine as a host add-on. Agencies selling care plans usually need portfolio grouping, form journeys, SSL/domain expiry and reports that look professional. Watchfront is built for that job.",
    theyDo: ["Basic uptime tied to GoDaddy hosting", "Simple alerts", "Convenience if you already host there", "Host-centric dashboard"],
    weDo: SHARED_WE_DO,
    pickThemIf: ["You only host a couple of sites on GoDaddy and want the simplest free add-on", "You do not sell monitoring as a retainer deliverable", "You never need form or SEO checks"],
    faqs: [
      {
        q: "Can Watchfront monitor sites not hosted on GoDaddy?",
        a: "Yes. Watchfront monitors any public URL - WordPress, Webflow, custom stacks - regardless of host.",
      },
      {
        q: "Why switch from GoDaddy monitoring?",
        a: "If you manage many client sites across hosts, need form/SEO checks, or want client-ready uptime reports, Watchfront is a better fit.",
      },
    ],
  },
  {
    slug: "datadog-alternative-for-websites",
    competitor: "Datadog",
    title: "Datadog Alternative for Website Agencies | Watchfront",
    description:
      "Need a Datadog alternative for client websites? Watchfront covers uptime, SSL, forms, SEO and reports without enterprise observability complexity.",
    keywords: ["datadog alternative for websites", "datadog alternative agencies", "datadog vs uptime monitoring", "simple website monitoring"],
    h1: "A Datadog alternative when you monitor websites, not infrastructure",
    intro:
      "Datadog is a powerhouse for infrastructure, APM and logs. If you mainly look after client marketing sites, that suite is usually overkill. Watchfront gives agencies the website checks that matter - without an observability tax.",
    theyDo: ["Infrastructure and APM", "Logs, traces and metrics at scale", "Synthetic monitoring modules", "Enterprise integrations"],
    weDo: SHARED_WE_DO,
    pickThemIf: ["You run product engineering with full observability needs", "You already pay for Datadog across the org", "Website agency workflows are not your problem"],
    faqs: [
      {
        q: "Is Watchfront a Datadog replacement?",
        a: "Only for website and API monitoring use cases. It is not an infrastructure or APM suite.",
      },
      {
        q: "Who should pick Watchfront over Datadog?",
        a: "Agencies and freelancers managing client websites who need form journeys, SEO audits and shareable reports.",
      },
    ],
  },
  {
    slug: "new-relic-alternative-for-websites",
    competitor: "New Relic",
    title: "New Relic Alternative for Website Agencies | Watchfront",
    description:
      "Need a New Relic alternative for client websites? Watchfront covers uptime, SSL, forms, SEO and reports without full APM complexity or cost.",
    keywords: [
      "new relic alternative for websites",
      "new relic alternative agencies",
      "simple website monitoring",
      "website monitoring vs APM",
    ],
    h1: "A New Relic alternative when you need website monitoring, not full APM",
    intro:
      "New Relic is an observability platform for applications and infrastructure. Agencies looking after marketing and WordPress sites rarely need that depth - they need uptime, SSL, forms and client reports. Watchfront is built for that narrower, sharper job.",
    theyDo: ["APM and distributed tracing", "Infrastructure monitoring", "Logs and dashboards at scale", "Synthetic monitoring modules"],
    weDo: SHARED_WE_DO,
    pickThemIf: [
      "You run product engineering with full APM needs",
      "You already standardise on New Relic company-wide",
      "Website care-plan workflows are not your problem",
    ],
    faqs: [
      {
        q: "Is Watchfront a New Relic replacement?",
        a: "Only for website and light API monitoring. It is not an APM or infrastructure platform.",
      },
      {
        q: "When should an agency pick Watchfront instead?",
        a: "When the job is client websites, retainers and proof - not instrumenting a SaaS codebase.",
      },
    ],
  },
  {
    slug: "monitis-alternative",
    competitor: "Monitis",
    title: "Monitis Alternative for Agencies | Watchfront",
    description:
      "Looking for a Monitis alternative? Watchfront gives agencies uptime, SSL, form journeys, SEO audits and client-ready reports in one workspace.",
    keywords: ["monitis alternative", "monitis vs", "website monitoring alternative", "uptime monitoring for agencies"],
    h1: "A Monitis alternative focused on client website portfolios",
    intro:
      "Monitis offers website and infrastructure monitoring for SMBs. If your day job is agency care plans - many client sites, forms, SSL and month-end reports - Watchfront is shaped around that workflow.",
    theyDo: ["Website and server monitoring", "Transaction checks", "Dashboards for SMB ops", "Alerting integrations"],
    weDo: SHARED_WE_DO,
    pickThemIf: [
      "You need server resource monitoring as the main purchase",
      "You are an in-house IT team, not an agency",
      "You do not need client grouping or white-label reports",
    ],
    faqs: [
      {
        q: "Does Watchfront monitor servers like Monitis?",
        a: "No. Watchfront monitors websites and APIs from the outside, plus optional real-visitor JS errors.",
      },
      {
        q: "Can I try Watchfront next to Monitis?",
        a: "Yes. Start the 3-day free trial and compare what each tool catches on forms and SEO.",
      },
    ],
  },
  {
    slug: "pagerduty-alternative-for-websites",
    competitor: "PagerDuty",
    title: "PagerDuty Alternative for Website Agencies | Watchfront",
    description:
      "Need a PagerDuty alternative for client websites? Watchfront detects uptime, SSL and form failures with agency reports — without enterprise on-call complexity.",
    keywords: [
      "pagerduty alternative for websites",
      "pagerduty alternative agencies",
      "website monitoring vs pagerduty",
      "simpler than pagerduty",
    ],
    h1: "A PagerDuty alternative when you monitor client websites, not on-call rotations",
    intro:
      "PagerDuty shines at enterprise incident routing and on-call. Agencies usually need something sharper: know when a client site or form breaks, with evidence and a monthly report. Watchfront is built for that job.",
    theyDo: ["On-call scheduling and escalations", "Incident response workflows", "Integrations across observability stacks", "Enterprise operations tooling"],
    weDo: SHARED_WE_DO,
    pickThemIf: [
      "You run 24/7 engineering on-call for a product company",
      "You already standardise on PagerDuty for every alert",
      "Website care-plan reporting is not your problem",
    ],
    faqs: [
      {
        q: "Is Watchfront a PagerDuty replacement?",
        a: "No for enterprise on-call. Yes as the monitoring + alerting layer for agency client websites.",
      },
      {
        q: "Does Watchfront escalate alerts?",
        a: "Yes — unacknowledged incidents can escalate to extra recipients after a delay, with quiet hours for non-critical noise.",
      },
    ],
  },
  {
    slug: "appdynamics-alternative-for-websites",
    competitor: "AppDynamics",
    title: "AppDynamics Alternative for Agencies | Watchfront",
    description:
      "Looking for an AppDynamics alternative for marketing sites? Watchfront covers uptime, SSL, forms, SEO and reports without full APM overhead.",
    keywords: [
      "appdynamics alternative",
      "appdynamics alternative for websites",
      "website monitoring vs APM",
      "simple synthetic monitoring",
    ],
    h1: "An AppDynamics alternative for agencies (not full APM)",
    intro:
      "AppDynamics is deep application performance monitoring. If you maintain client WordPress and marketing sites, you rarely need that stack — you need synthetic website monitoring, forms, SSL and client proof. That is Watchfront.",
    theyDo: ["Deep APM and business transactions", "Infrastructure correlation", "Enterprise dashboards", "Application-centric observability"],
    weDo: SHARED_WE_DO,
    pickThemIf: [
      "You instrument large custom applications",
      "APM is already mandated by IT",
      "You are not selling website care plans",
    ],
    faqs: [
      {
        q: "Can Watchfront replace AppDynamics?",
        a: "Only for website/API synthetic monitoring use cases. It is not an APM platform.",
      },
      {
        q: "Who should choose Watchfront?",
        a: "Agencies and freelancers who need portfolio monitoring and retainer reports.",
      },
    ],
  },
  {
    slug: "solarwinds-alternative-for-websites",
    competitor: "SolarWinds",
    title: "SolarWinds Alternative for Website Agencies | Watchfront",
    description:
      "Need a SolarWinds alternative for client websites? Watchfront covers uptime, SSL, forms, SEO and reports without enterprise IT complexity.",
    keywords: [
      "solarwinds alternative",
      "solarwinds alternative for websites",
      "website monitoring vs solarwinds",
      "simple website monitoring for agencies",
    ],
    h1: "A SolarWinds alternative when you monitor websites, not enterprise IT",
    intro:
      "SolarWinds is a broad IT management universe. Agencies looking after client marketing sites need a thinner, sharper stack: availability, SSL, forms and retainer reports. Watchfront is built for that lane.",
    theyDo: ["Network and infrastructure management", "Broad IT operations suites", "Enterprise monitoring modules", "Complex admin surfaces"],
    weDo: SHARED_WE_DO,
    pickThemIf: [
      "You run enterprise IT / network ops",
      "You already standardise on SolarWinds across the org",
      "Website care plans are not your product",
    ],
    faqs: [
      {
        q: "Is Watchfront a SolarWinds replacement?",
        a: "Only for website/API synthetic monitoring. It is not an IT management suite.",
      },
      {
        q: "Who should pick Watchfront?",
        a: "Agencies and freelancers who need portfolio website monitoring and client reports.",
      },
    ],
  },
];

export const comparisonBySlug = (s: string) => COMPARISONS.find((c) => c.slug === s);
