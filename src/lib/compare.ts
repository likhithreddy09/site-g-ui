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
    title: "StatusCake Alternative with Form Testing & Client Reports | Watchfront",
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
    title: "Site24x7 Alternative - Simpler Monitoring for Agencies | Watchfront",
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
];

export const comparisonBySlug = (s: string) => COMPARISONS.find((c) => c.slug === s);
