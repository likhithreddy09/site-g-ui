/**
 * Blog / resources posts. Written for non-brand search + agency operators.
 * Body copy uses markdown-style [label](/path) for internal links.
 */
export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; cite?: string };

export type BlogPost = {
  slug: string;
  nav: string;
  title: string;
  description: string;
  h1: string;
  excerpt: string;
  keywords: string[];
  readMins: number;
  published: string;
  updated: string;
  category: "ops" | "clients" | "stack";
  author: string;
  authorRole: string;
  product?: string;
  feature?: string;
  tool?: string;
  guide?: string;
  relatedSlugs?: string[];
  body: BlogBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "agency-monday-site-check-still-misses-broken-forms",
    nav: "Monday checks miss forms",
    title: "Why Monday Site Checks Miss Broken Forms | Watchfront",
    description:
      "Opening ten client sites every Monday feels responsible. It still misses dead contact forms, half-broken SSL, and silent plugin damage. Here's a better rhythm.",
    h1: "Your Monday site check is theatre. Broken forms laugh at it.",
    excerpt:
      "If your agency still “checks sites” by clicking around once a week, you are gambling with lead gen. The failures that hurt clients rarely show up in a five-minute glance.",
    keywords: [
      "agency website monitoring",
      "broken contact form",
      "wordpress maintenance agency",
      "monitor client websites",
      "website monitoring for agencies",
    ],
    readMins: 8,
    published: "2026-11-15",
    updated: "2026-11-15",
    category: "ops",
    author: "Watchfront team",
    authorRole: "Product + support, India",
    product: "contact-form-monitoring",
    feature: "form-journey-testing",
    tool: "website-down-checker",
    guide: "contact-form-not-working",
    relatedSlugs: [
      "what-to-put-in-client-uptime-report",
      "wordpress-care-plan-monitoring-checklist-india",
    ],
    body: [
      {
        type: "p",
        text: "Most Indian web agencies I talk to have the same ritual. Monday morning. Chrome with fourteen tabs. Someone junior opens each client homepage, scrolls once, maybe submits a contact form if they remember which site still uses Contact Form 7. Then Slack gets a green tick: “all sites checked.”",
      },
      {
        type: "p",
        text: "Two weeks later the client forwards a screenshot of a thank-you page that never loads. Leads from a Meta campaign sat in a dead form for nine days. Nobody on your team was lazy. The ritual was just the wrong tool for the job.",
      },
      {
        type: "h2",
        text: "What a human glance actually catches",
      },
      {
        type: "p",
        text: "A hurried Monday pass is decent at spotting total outages and obvious layout explosions. It is terrible at everything else that burns retainers:",
      },
      {
        type: "ul",
        items: [
          "Forms that return 200 on the page but 500 on the submit endpoint",
          "SMTP credentials that rotated after a host “security update”",
          "SSL that expires at 02:00 on a Thursday, not during office hours",
          "A plugin update that only breaks the mobile booking step",
          "A noindex tag someone left on after staging",
        ],
      },
      {
        type: "p",
        text: "Those failures need repetition. Not vibes. That is the difference between “we look after your site” and [contact form monitoring](/contact-form-monitoring) that submits the journey on a schedule.",
      },
      {
        type: "h2",
        text: "A better weekly rhythm (that still fits a care plan)",
      },
      {
        type: "p",
        text: "Keep Mondays for human judgment. Move the boring verification to machines.",
      },
      {
        type: "ul",
        items: [
          "Continuous [uptime monitoring](/uptime-monitoring-tool) on every retained domain — not a once-a-week click",
          "Daily [SSL certificate monitoring](/ssl-certificate-monitoring) so renewals that fail silently still surface",
          "Hourly or daily journey tests on the money form for each lead-gen site",
          "A weekly SEO pass on landing pages that spend ad money — see our [SEO audit feature](/features/seo-audit)",
          "One human hour reviewing incidents and writing the client note",
        ],
      },
      {
        type: "quote",
        text: "If a check only happens when someone remembers, it is not a retainer deliverable. It is a hope.",
      },
      {
        type: "h2",
        text: "Prove the form, don't admire the homepage",
      },
      {
        type: "p",
        text: "Homepages lie. They stay pretty while the lead pipe is clogged. Run a real submit. Assert the success message. Keep a screenshot when it fails. That is what [form and journey testing](/features/form-journey-testing) is for — and why a free [website down checker](/tools/website-down-checker) alone will never replace it.",
      },
      {
        type: "p",
        text: "When something does break, use a short playbook. Our guide on [contact forms not working](/guides/contact-form-not-working) covers SMTP, spam folders, and plugin fallout without the fluff.",
      },
      {
        type: "h2",
        text: "What to tell the client",
      },
      {
        type: "p",
        text: "Clients do not buy “we opened your site on Monday.” They buy fewer surprises. Put monitoring coverage in the care-plan PDF: which URLs, which forms, how fast you alert, what a monthly [client report](/features/client-reports) includes. If you need language for that conversation, start from [website monitoring for agencies](/website-monitoring) and adapt it to your retainer tiers.",
      },
      {
        type: "p",
        text: "Theatre feels productive. Evidence renews contracts.",
      },
    ],
  },
  {
    slug: "wordpress-care-plan-monitoring-checklist-india",
    nav: "Care plan monitoring",
    title: "WordPress Care Plan Monitoring Checklist | Watchfront",
    description:
      "A practical monitoring stack to bake into WordPress care plans in India: uptime, SSL, forms, updates, and what to show in the monthly report.",
    h1: "Bake monitoring into your WordPress care plan — or keep fighting fires",
    excerpt:
      "Indian agencies sell care plans that promise peace of mind. Without continuous checks, you are selling a vibe. Here is the monitoring layer that belongs in the SOW.",
    keywords: [
      "wordpress care plan",
      "wordpress maintenance india",
      "wordpress website monitoring",
      "website maintenance retainer",
      "agency care plan checklist",
    ],
    readMins: 9,
    published: "2026-11-15",
    updated: "2026-11-15",
    category: "clients",
    author: "Watchfront team",
    authorRole: "Product + support, India",
    product: "website-monitoring",
    feature: "ssl-domain-monitoring",
    tool: "ssl-checker",
    guide: "website-maintenance-checklist",
    relatedSlugs: [
      "agency-monday-site-check-still-misses-broken-forms",
      "what-to-put-in-client-uptime-report",
    ],
    body: [
      {
        type: "p",
        text: "Care plans in India usually bundle updates, backups, and “we’ll keep an eye on things.” The first two are clear. The third is where agencies get burned. A client hears “monitoring” and imagines you knew about the SSL scare at 1am. You imagined a polite weekly glance.",
      },
      {
        type: "p",
        text: "Write the stack into the SOW. Price it. Automate it. Then the monthly invoice feels like insurance, not a mystery fee.",
      },
      {
        type: "h2",
        text: "Minimum monitoring every WordPress care plan should name",
      },
      {
        type: "ul",
        items: [
          "Homepage + key landing page [uptime monitoring](/uptime-monitoring-tool) (1-minute checks, confirmed failures)",
          "[SSL certificate monitoring](/ssl-certificate-monitoring) and domain expiry where the registry exposes dates",
          "At least one real-browser test on the primary lead form — see [WordPress monitoring use case](/use-cases/wordpress-maintenance)",
          "Post-update smoke: after plugin/theme updates, re-run the form journey before you close the ticket",
          "Broken-link / content spot checks on money pages after major edits",
        ],
      },
      {
        type: "p",
        text: "If you only sell “updates + backups,” say that out loud. Do not let the client invent a monitoring promise you never priced.",
      },
      {
        type: "h2",
        text: "Where agencies under-scope (and eat the cost)",
      },
      {
        type: "p",
        text: "WooCommerce checkouts, multilingual sites, and membership logins need their own journeys. One homepage ping will not save you when cart-to-pay breaks after a payment-gateway plugin bump. Scope those flows as add-ons or higher tiers.",
      },
      {
        type: "p",
        text: "Same story for SEO: a client who buys ads expects titles and indexability to stay sane. Point them at a scheduled [SEO audit](/features/seo-audit), or run the free [SEO checker](/tools/seo-checker) before you claim “technical SEO included.”",
      },
      {
        type: "h2",
        text: "A one-page checklist you can paste into proposals",
      },
      {
        type: "ul",
        items: [
          "Monitored URLs listed by environment (prod only unless staging is in scope)",
          "Alert channel + business hours vs 24/7 expectation",
          "Form journeys named explicitly (“Contact”, “Book a demo”)",
          "SSL/domain alert lead time (e.g. 30 and 14 days)",
          "Monthly report contents — uptime %, incidents, updates applied",
          "What is out of scope (server agents, email deliverability deep dives, redesign QA)",
        ],
      },
      {
        type: "quote",
        text: "Ambiguous care plans create angry WhatsApp threads. Named monitors create calm renewals.",
      },
      {
        type: "h2",
        text: "How Watchfront maps onto that SOW",
      },
      {
        type: "p",
        text: "Group each client’s sites, turn on [website monitoring](/website-monitoring) defaults, add the form journey, and send a shareable report at month-end. Start with the free [SSL checker](/tools/ssl-checker) on a messy portfolio if you need a quick win in the sales call. For the wider monthly ops list, keep our [website maintenance checklist](/guides/website-maintenance-checklist) next to your update runbook.",
      },
      {
        type: "p",
        text: "Care plans without monitoring are just scheduled hope. Put the checks in writing, then let the product do the boring part.",
      },
    ],
  },
  {
    slug: "what-to-put-in-client-uptime-report",
    nav: "Client uptime reports",
    title: "What to Put in a Client Uptime Report | Watchfront",
    description:
      "A practical outline for agency client uptime reports: metrics that matter, incidents without panic, SSL status, and how to show value every month.",
    h1: "What to put in a client uptime report so they actually renew",
    excerpt:
      "Agencies send reports packed with charts nobody asked for. Clients renew when the PDF answers three questions: were we up, what broke, what did you do.",
    keywords: [
      "client uptime report",
      "website uptime report for clients",
      "agency monitoring report",
      "white label uptime report",
      "monthly website maintenance report",
    ],
    readMins: 7,
    published: "2026-11-15",
    updated: "2026-11-15",
    category: "clients",
    author: "Watchfront team",
    authorRole: "Product + support, India",
    product: "website-monitoring-software",
    feature: "client-reports",
    guide: "monitor-multiple-client-websites",
    relatedSlugs: [
      "agency-monday-site-check-still-misses-broken-forms",
      "wordpress-care-plan-monitoring-checklist-india",
    ],
    body: [
      {
        type: "p",
        text: "I have seen agency reports that open with a world map of probe locations and a rainbow of response-time percentiles. The client’s owner skimmed for ten seconds and asked the only question that mattered: “So… were we down?”",
      },
      {
        type: "p",
        text: "If your report cannot answer that in the first screen, it is a vanity PDF. Here is a structure that survives a busy founder’s attention span and still sells the retainer.",
      },
      {
        type: "h2",
        text: "Page one: the three numbers",
      },
      {
        type: "ul",
        items: [
          "Uptime % for the period (define the URLs — homepage vs checkout)",
          "Incidents opened / resolved, with total downtime minutes",
          "SSL days remaining on every hostname you manage",
        ],
      },
      {
        type: "p",
        text: "That is the heartbeat. Put the fancy graphs later, or skip them. Pair the numbers with a one-line plain-English summary: “Two brief DNS blips; form journey caught a mail plugin failure on the 12th; certificate renews in 41 days.”",
      },
      {
        type: "h2",
        text: "Incidents without the thriller novel",
      },
      {
        type: "p",
        text: "Each incident needs four lines max: detected at, impact, cause (or “still investigating”), action taken. Attach evidence when you have it — status code, screenshot, console error. That is why [website downtime monitoring](/website-downtime-monitoring) should store history instead of vanishing into a random Slack scrollback.",
      },
      {
        type: "p",
        text: "Never hide an outage to look perfect. Clients forgive downtime. They do not forgive discovering it from their own customers.",
      },
      {
        type: "h2",
        text: "Show the work that is invisible",
      },
      {
        type: "p",
        text: "Monitoring value is mostly invisible when nothing breaks. So list preventive work: plugin updates applied after staging, SSL renewed, form tests that passed every day, SEO warnings fixed before ads resumed. Link the narrative to your [white-label client reports](/features/client-reports) so you are not rebuilding the PDF in Canva every month.",
      },
      {
        type: "quote",
        text: "A good report makes the boring month look intentional. A bad report makes a quiet month look like you did nothing.",
      },
      {
        type: "h2",
        text: "Close with a decision, not a vibe",
      },
      {
        type: "p",
        text: "End with one recommended next step: add the booking form journey, raise check frequency on the campaign landing page, or expand [website monitoring software](/website-monitoring-software) coverage to a new microsite. Decision prompts renewals. Soft fluff invites “can we pause for a quarter?”",
      },
      {
        type: "p",
        text: "If you manage many clients, standardise the template once. Our notes on [monitoring multiple client websites](/guides/monitor-multiple-client-websites) cover grouping and alert hygiene so the report data is clean before you hit export.",
      },
      {
        type: "p",
        text: "Reports are not decoration. They are how retainers survive procurement season.",
      },
    ],
  },
];

export const blogBySlug = (s: string) => BLOG_POSTS.find((p) => p.slug === s);

export const BLOG_CATEGORIES: Record<BlogPost["category"], string> = {
  ops: "Agency ops",
  clients: "Clients & retainers",
  stack: "Stack & tooling",
};
