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
  /** One featured illustration for the article */
  image: { src: string; alt: string };
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
    image: {
      src: "/marketing/form-evidence.jpg",
      alt: "Illustration of catching a broken contact form before the client does",
    },
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
    image: {
      src: "/marketing/checks-stack.jpg",
      alt: "Illustration of monitoring checks stacked into a care-plan stack",
    },
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
    image: {
      src: "/marketing/agency-desk.jpg",
      alt: "Illustration of a desk preparing a clear client uptime report",
    },
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
  {
    slug: "ssl-expiry-still-taking-down-client-sites",
    nav: "SSL expiry still kills sites",
    title: "Why SSL Expiry Still Takes Down Client Sites | Watchfront",
    description:
      "Auto-renew was supposed to end certificate outages. Here is why SSL expiry still takes down client sites - and the monitoring habit that stops it.",
    h1: "Auto-renew lied. SSL expiry still takes down client sites.",
    excerpt:
      "Let’s Encrypt lasts 90 days. Hosts promise auto-renew. Agencies still wake up to browser warnings. The failure mode is boring - and preventable.",
    keywords: [
      "SSL certificate expired",
      "SSL expiry",
      "SSL certificate monitoring",
      "website SSL warning",
      "lets encrypt failed renew",
    ],
    readMins: 7,
    published: "2026-11-17",
    updated: "2026-11-17",
    category: "ops",
    author: "Watchfront team",
    authorRole: "Product + support, India",
    image: {
      src: "/marketing/checks-stack.jpg",
      alt: "Illustration of stacked SSL and uptime checks",
    },
    product: "ssl-certificate-monitoring",
    feature: "ssl-domain-monitoring",
    tool: "ssl-checker",
    guide: "what-is-ssl-monitoring",
    relatedSlugs: [
      "wordpress-care-plan-monitoring-checklist-india",
      "what-to-put-in-client-uptime-report",
    ],
    body: [
      {
        type: "p",
        text: "Every year the same Slack screenshot lands in agency channels: Chrome’s red “Your connection is not private.” The client is furious. The host swears auto-renew was on. The junior who “watched SSL” left three months ago.",
      },
      {
        type: "p",
        text: "Certificate outages are not mysterious. They are operational debt. [SSL certificate monitoring](/ssl-certificate-monitoring) is how you pay it down.",
      },
      {
        type: "h2",
        text: "Why auto-renew keeps failing",
      },
      {
        type: "ul",
        items: [
          "DNS moved and the HTTP-01 challenge cannot reach the host",
          "Firewall or bot protection blocks the renew path",
          "www and apex use different certificates; only one renewed",
          "Billing lapsed on a “free SSL” host add-on",
          "The renew email goes to a founder who mutes vendor mail",
        ],
      },
      {
        type: "p",
        text: "None of those failures move the certificate’s Not After date. Monitoring watches the date. Inboxes watch hope.",
      },
      {
        type: "h2",
        text: "A boring system that works",
      },
      {
        type: "ul",
        items: [
          "Inventory every production hostname - including vanity domains",
          "Alert at 30 / 14 / 7 days (see [what SSL monitoring is](/guides/what-is-ssl-monitoring))",
          "Spot-check with a free [SSL checker](/tools/ssl-checker) during onboarding",
          "Put “days to next expiry” on page one of the [client uptime report](/blog/what-to-put-in-client-uptime-report)",
        ],
      },
      {
        type: "quote",
        text: "If your only SSL strategy is “the host handles it,” you are subcontracting trust to a calendar you do not control.",
      },
      {
        type: "h2",
        text: "Pair SSL with uptime - they are not the same",
      },
      {
        type: "p",
        text: "A site can answer HTTP while HTTPS is broken, or show a warning interstitial that still “pings” from some checkers. Run [website uptime monitoring](/website-uptime-monitor) and SSL in the same workspace so both open incidents with evidence.",
      },
      {
        type: "p",
        text: "Certificate theatre is optional. Expiry alerts are not.",
      },
    ],
  },
  {
    slug: "seo-regressions-after-wordpress-updates",
    nav: "SEO after WP updates",
    title: "SEO Regressions After WordPress Updates | Watchfront",
    description:
      "Plugin and theme updates silently break titles, meta and noindex. How agencies catch SEO regressions before traffic and ads tank.",
    h1: "WordPress updates did not “just” break the layout. They broke SEO.",
    excerpt:
      "The site looks fine. Google Search Console does not. Here is the SEO regression pattern agencies keep missing after routine updates.",
    keywords: [
      "wordpress seo broken after update",
      "seo regression",
      "noindex wordpress",
      "wordpress title tag missing",
      "website seo audit",
    ],
    readMins: 8,
    published: "2026-11-17",
    updated: "2026-11-17",
    category: "stack",
    author: "Watchfront team",
    authorRole: "Product + support, India",
    image: {
      src: "/marketing/signal-abstract.jpg",
      alt: "Abstract illustration of SEO signals across pages",
    },
    product: "website-monitoring-software",
    feature: "seo-audit",
    tool: "meta-tag-checker",
    guide: "how-to-choose-website-monitoring-tool",
    relatedSlugs: [
      "wordpress-care-plan-monitoring-checklist-india",
      "agency-monday-site-check-still-misses-broken-forms",
    ],
    body: [
      {
        type: "p",
        text: "You updated Yoast, swapped a page-builder section, and closed the ticket. Two weeks later the client asks why the landing page disappeared from ads quality checks. Spoiler: someone left noindex on, or the theme stopped outputting the meta description.",
      },
      {
        type: "p",
        text: "Uptime was green the whole time. SEO was not. That is why [SEO audits](/features/seo-audit) belong next to uptime on WordPress retainers.",
      },
      {
        type: "h2",
        text: "Regressions that sneak past a visual glance",
      },
      {
        type: "ul",
        items: [
          "Accidental noindex / nofollow left from staging",
          "Empty or duplicated title tags after a SEO plugin conflict",
          "Canonical pointing at the wrong host (www vs apex)",
          "Missing Open Graph tags so WhatsApp shares look broken",
          "H1 removed when a hero block was “redesigned”",
        ],
      },
      {
        type: "h2",
        text: "A 60-second gate before you close the update",
      },
      {
        type: "p",
        text: "Run a [meta tag checker](/tools/meta-tag-checker) on the money URL. Confirm title, description, robots and canonical. If you sell technical SEO as part of the care plan, schedule a multi-page audit so you are not relying on memory.",
      },
      {
        type: "quote",
        text: "If you only QA the screenshot, you are QA’ing what humans see - not what Googlebot parses.",
      },
      {
        type: "h2",
        text: "Put SEO monitoring in the SOW",
      },
      {
        type: "p",
        text: "Clients who buy ads expect indexability to stay sane. Name it: scheduled on-page checks, alert on noindex, monthly score in the report. Pair with [WordPress website monitoring](/wordpress-website-monitoring) so forms and SSL are covered in the same desk.",
      },
      {
        type: "p",
        text: "Updates without SEO gates are how quiet months become traffic autopsies.",
      },
    ],
  },
  {
    slug: "agencies-lose-retainers-to-silent-form-failures",
    nav: "Silent form failures",
    title: "How Agencies Lose Retainers to Silent Form Failures | Watchfront",
    description:
      "Silent contact form failures cost agencies retainers. Why homepage uptime lies, how to prove forms work, and what to write into the care plan.",
    h1: "Homepage is up. Leads are dead. Retainers follow.",
    excerpt:
      "The failure mode that ends care plans rarely looks like downtime. It looks like a thank-you page that never loads while everyone swears the site is fine.",
    keywords: [
      "broken contact form agency",
      "contact form monitoring",
      "silent form failure",
      "lead form not working",
      "agency retainer website issues",
    ],
    readMins: 7,
    published: "2026-11-17",
    updated: "2026-11-17",
    category: "clients",
    author: "Watchfront team",
    authorRole: "Product + support, India",
    image: {
      src: "/marketing/form-evidence.jpg",
      alt: "Illustration of evidence for a broken contact form",
    },
    product: "contact-form-monitoring",
    feature: "form-journey-testing",
    tool: "website-down-checker",
    guide: "contact-form-monitoring-for-agencies",
    relatedSlugs: [
      "agency-monday-site-check-still-misses-broken-forms",
      "ssl-expiry-still-taking-down-client-sites",
    ],
    body: [
      {
        type: "p",
        text: "When a site is down, clients shout. When a form is down, clients quietly stop getting leads - then stop paying you. Silent failures are how agencies lose retainers without a dramatic outage story.",
      },
      {
        type: "p",
        text: "A [website down checker](/tools/website-down-checker) will not save you. [Contact form monitoring](/contact-form-monitoring) will.",
      },
      {
        type: "h2",
        text: "What “silent” actually looks like",
      },
      {
        type: "ul",
        items: [
          "Form UI submits; endpoint returns 500",
          "Success message shows; SMTP never delivers",
          "Spam plugin starts eating legitimate leads",
          "Thank-you redirect 404s after a permalink change",
          "Payment or booking step blocked by a plugin update",
        ],
      },
      {
        type: "h2",
        text: "Prove the path, do not admire the homepage",
      },
      {
        type: "p",
        text: "Record the journey once. Replay it on a schedule. Assert the success state. Keep a screenshot when it fails. That is the difference between “we maintain WordPress” and evidence. Details live in [contact form monitoring for agencies](/guides/contact-form-monitoring-for-agencies).",
      },
      {
        type: "quote",
        text: "If the check only happens when someone remembers, it is not a deliverable. It is a liability.",
      },
      {
        type: "h2",
        text: "Say it in the proposal",
      },
      {
        type: "p",
        text: "Name the forms. Name the frequency. Name the alert channel. Put failures in the monthly report. Clients renew insurance they can see. They cancel vibes.",
      },
      {
        type: "p",
        text: "Uptime keeps the lights on. Form journeys keep the leads - and the retainer - alive.",
      },
    ],
  },
  {
    slug: "ecommerce-checkout-uptime-is-not-enough",
    nav: "Checkout needs more than uptime",
    title: "Ecommerce Checkout Monitoring Beyond Uptime | Watchfront",
    description:
      "Homepage uptime will not save a broken cart. How agencies monitor ecommerce checkouts, SSL and JS errors without creating fake orders.",
    h1: "Your store is “up.” The checkout is not. That is how revenue dies.",
    excerpt:
      "Agencies still sell uptime as ecommerce protection. Merchants lose money on the path to purchase. Here is the monitoring layer that actually matches the risk.",
    keywords: [
      "ecommerce checkout monitoring",
      "woocommerce uptime not enough",
      "shopify monitoring agency",
      "online store monitoring",
      "checkout broken monitoring",
    ],
    readMins: 7,
    published: "2026-11-17",
    updated: "2026-11-17",
    category: "ops",
    author: "Watchfront team",
    authorRole: "Product + support, India",
    image: {
      src: "/marketing/form-evidence.jpg",
      alt: "Illustration of catching a broken purchase path",
    },
    product: "website-monitoring",
    feature: "form-journey-testing",
    guide: "ecommerce-website-monitoring",
    relatedSlugs: [
      "agencies-lose-retainers-to-silent-form-failures",
      "ssl-expiry-still-taking-down-client-sites",
    ],
    body: [
      {
        type: "p",
        text: "I have watched agencies celebrate 99.9% uptime while the merchant’s Meta ads poured into a cart that threw a JS error on mobile Chrome. The homepage ping never blinked. Revenue did.",
      },
      {
        type: "p",
        text: "Ecommerce monitoring is not “is the store up?” It is “can a customer still buy?” Start from the [ecommerce website monitoring checklist](/guides/ecommerce-website-monitoring).",
      },
      {
        type: "h2",
        text: "What uptime misses on stores",
      },
      {
        type: "ul",
        items: [
          "Add-to-cart buttons that no-op after a theme update",
          "Coupon or shipping calculators returning 500",
          "SSL warnings on checkout subdomains",
          "Payment gateway scripts blocked or throwing",
          "Thank-you / order-received pages 404ing after a permalink change",
        ],
      },
      {
        type: "h2",
        text: "Safe journeys on live stores",
      },
      {
        type: "p",
        text: "Use [form and journey testing](/features/form-journey-testing) up to a safe boundary. Block payment requests by default. Prefer sandbox gateways when you must go further. Never let a monitor place a real paid order.",
      },
      {
        type: "quote",
        text: "If your monitor can charge a customer’s card, your monitor is the incident.",
      },
      {
        type: "h2",
        text: "Pair SSL, JS errors and reports",
      },
      {
        type: "p",
        text: "Certificate warnings kill checkout trust. Real-visitor [JavaScript error monitoring](/javascript-error-monitoring-tool) catches browser-only failures. Put uptime, SSL days and journey pass rates on the monthly report so the retainer looks like insurance, not a mystery fee. For the broader product framing, see [website monitoring for agencies](/website-monitoring).",
      },
      {
        type: "p",
        text: "Green homepage. Empty cart. That is not monitoring. That is theatre.",
      },
    ],
  },
  {
    slug: "synthetic-checks-beat-status-page-theatre",
    nav: "Synthetics beat status theatre",
    title: "Why Synthetic Checks Beat Host Status Pages | Watchfront",
    description:
      "Host status pages lag and lie by omission. Why agencies need independent synthetic monitoring on every client site.",
    h1: "Your host’s status page is not monitoring. It is marketing.",
    excerpt:
      "Green host dashboards still miss regional DNS, SSL and “200 but form is dead.” Independent synthetics are how agencies stop outsourcing trust.",
    keywords: [
      "host status page vs monitoring",
      "synthetic monitoring agencies",
      "independent uptime monitoring",
      "dont trust status page",
    ],
    readMins: 6,
    published: "2026-11-17",
    updated: "2026-11-17",
    category: "stack",
    author: "Watchfront team",
    authorRole: "Product + support, India",
    image: {
      src: "/marketing/signal-abstract.jpg",
      alt: "Illustration of independent monitoring signals",
    },
    product: "synthetic-monitoring",
    feature: "uptime-monitoring",
    guide: "synthetic-monitoring-vs-real-user-monitoring",
    relatedSlugs: [
      "ssl-expiry-still-taking-down-client-sites",
      "ecommerce-checkout-uptime-is-not-enough",
    ],
    body: [
      {
        type: "p",
        text: "When a client forwards a downtime screenshot, the worst reply is “host status is green.” Host pages measure their narrative. You need [synthetic monitoring](/synthetic-monitoring) that measures the URL the customer hits.",
      },
      {
        type: "h2",
        text: "What status pages skip",
      },
      {
        type: "ul",
        items: [
          "Your specific domain’s DNS or CDN edge",
          "Certificate warnings that still “ping”",
          "Application 500s behind a healthy load balancer blurb",
          "Broken forms and checkout steps",
        ],
      },
      {
        type: "h2",
        text: "Independence is the product",
      },
      {
        type: "p",
        text: "Run checks from outside the host. Confirm failures. Keep evidence. Read [synthetic vs RUM](/guides/synthetic-monitoring-vs-real-user-monitoring) if you are mixing browser errors into the stack.",
      },
      {
        type: "quote",
        text: "If the only monitor you trust is the vendor’s, you have no monitor.",
      },
      {
        type: "p",
        text: "Status theatre comforts. Synthetics renew retainers.",
      },
    ],
  },
  {
    slug: "price-monitoring-into-the-retainer",
    nav: "Price monitoring into retainers",
    title: "How to Price Website Monitoring in Retainers | Watchfront",
    description:
      "How agencies price website monitoring inside care plans: line items, tiers, and the conversation that stops under-scoping.",
    h1: "Price monitoring like insurance — or keep eating outages for free",
    excerpt:
      "If monitoring is “included” with no line item, you will under-scope forever. Here is how Indian agencies package and price it.",
    keywords: [
      "price website monitoring",
      "monitoring retainer pricing",
      "care plan monitoring cost",
      "agency uptime pricing",
    ],
    readMins: 7,
    published: "2026-11-17",
    updated: "2026-11-17",
    category: "clients",
    author: "Watchfront team",
    authorRole: "Product + support, India",
    image: {
      src: "/marketing/agency-desk.jpg",
      alt: "Illustration of an agency desk pricing a retainer",
    },
    product: "website-monitoring-for-agencies",
    feature: "client-reports",
    guide: "how-to-write-monitoring-into-care-plans",
    relatedSlugs: [
      "wordpress-care-plan-monitoring-checklist-india",
      "what-to-put-in-client-uptime-report",
    ],
    body: [
      {
        type: "p",
        text: "Free monitoring inside a cheap care plan is how agencies burn out. Put a line item. Attach named checks. Show the report. Use [how to write monitoring into care plans](/guides/how-to-write-monitoring-into-care-plans) as the SOW spine.",
      },
      {
        type: "h2",
        text: "Three tiers that sell",
      },
      {
        type: "ul",
        items: [
          "Essential: uptime + SSL on prod URLs",
          "Growth: + lead form journey + monthly report",
          "Protect: + SEO audits + JS errors on money pages / ecommerce paths",
        ],
      },
      {
        type: "h2",
        text: "The client conversation",
      },
      {
        type: "p",
        text: "Ask: “When the form dies at 1am, who should know first — us or your customers?” Then show [website monitoring for agencies](/website-monitoring-for-agencies) as the delivery system, not a buzzword.",
      },
      {
        type: "quote",
        text: "Unpriced monitoring is unpaid emergency labour with better branding.",
      },
      {
        type: "p",
        text: "Insurance you can invoice. Hope you cannot.",
      },
    ],
  },
  {
    slug: "availability-is-not-the-same-as-working",
    nav: "Available ≠ working",
    title: "Website Availability Is Not the Same as Working | Watchfront",
    description:
      "Availability monitoring keeps URLs reachable. Forms, SSL and checkout still break on green uptime. What agencies must measure next.",
    h1: "The site is available. The business is not. That gap kills retainers.",
    excerpt:
      "HTTP 200 is not a lead. Availability is necessary and wildly insufficient. Here is the stack that closes the gap.",
    keywords: [
      "website availability vs uptime",
      "site up but form broken",
      "availability monitoring not enough",
      "website working vs available",
    ],
    readMins: 6,
    published: "2026-11-17",
    updated: "2026-11-17",
    category: "ops",
    author: "Watchfront team",
    authorRole: "Product + support, India",
    image: {
      src: "/marketing/form-evidence.jpg",
      alt: "Illustration of availability vs working checks",
    },
    product: "website-availability-monitoring",
    feature: "form-journey-testing",
    guide: "best-website-monitoring-tools-for-agencies",
    relatedSlugs: [
      "agencies-lose-retainers-to-silent-form-failures",
      "synthetic-checks-beat-status-page-theatre",
    ],
    body: [
      {
        type: "p",
        text: "Availability monitoring asks: can we reach the URL? Business monitoring asks: can a customer complete the job? Agencies that only sell the first get fired over the second.",
      },
      {
        type: "p",
        text: "Start with [website availability monitoring](/website-availability-monitoring), then add journeys. Read the difference between [uptime](/glossary/uptime) and “working” in the glossary if you need shared language with clients.",
      },
      {
        type: "h2",
        text: "Green availability, red business",
      },
      {
        type: "ul",
        items: [
          "Contact form 500s behind a fine homepage",
          "SSL warning interstitial",
          "Checkout JS errors on mobile only",
          "noindex left on the campaign URL",
        ],
      },
      {
        type: "h2",
        text: "The minimum stack after availability",
      },
      {
        type: "p",
        text: "SSL/domain, one form journey, SEO hygiene on money pages, and a report. Criteria live in [best website monitoring tools for agencies](/guides/best-website-monitoring-tools-for-agencies).",
      },
      {
        type: "quote",
        text: "Availability is the floor. Working is the product.",
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
