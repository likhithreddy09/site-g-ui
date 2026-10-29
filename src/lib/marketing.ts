export type Faq = { q: string; a: string };
export type Feature = {
  slug: string; name: string; short: string; title: string; description: string; h1: string; intro: string;
  steps: [string, string][]; benefits: string[]; faqs: Faq[]; related: string[];
};
export type UseCase = {
  slug: string; name: string; title: string; description: string; h1: string; intro: string;
  pains: string[]; outcomes: [string, string][]; features: string[]; faqs: Faq[];
};

export const FEATURES: Feature[] = [
  {
    slug: "uptime-monitoring", name: "Uptime & response time", short: "Know within a minute when a client site goes down — without false alarms.",
    title: "Uptime Monitoring for Agencies — 1-Minute Checks, No False Alarms",
    description: "Monitor every client website's uptime and response time with 1-minute checks, automatic retries and confirmed-outage alerts by email, Slack or Teams.",
    h1: "Uptime monitoring that only wakes you for real outages",
    intro: "Watchfront checks each website from our monitoring workers as often as every minute. A failed check is retried before anyone is alerted, so you hear about real outages — not a single slow request.",
    steps: [["Add a website", "Paste the address. We start checking it straight away — no code or plugin needed."], ["We retry before alerting", "A failure is confirmed with an automatic retry and a failure threshold you control."], ["Get an incident with evidence", "Status code, response time, error and timeline are attached, and recovery closes it automatically."]],
    benefits: ["Checks every 1–5 minutes depending on your plan", "Retries and failure thresholds prevent false alarms", "Response-time history and 24h / 7d / 30d uptime", "Alerts by email, Slack, Microsoft Teams or webhook", "Uptime figures flow straight into client reports"],
    faqs: [
      { q: "How often does Watchfront check my websites?", a: "Every 5 minutes on the Free plan and as often as every minute on paid plans. You can set a different interval per website." },
      { q: "How do you avoid false alarms?", a: "Every failure is retried, and an incident only opens after the number of consecutive failures you choose. Short blips are recorded as transient instead of paging your team." },
      { q: "Do I need to install anything on the website?", a: "No. Uptime, SSL and domain checks work from the outside. The optional error script is only needed for real-visitor JavaScript errors." },
    ],
    related: ["ssl-domain-monitoring", "client-reports", "javascript-error-monitoring"],
  },
  {
    slug: "ssl-domain-monitoring", name: "SSL & domain expiry", short: "Never let a certificate or domain expire on a client again.",
    title: "SSL Certificate & Domain Expiry Monitoring — Alerts Before It Expires",
    description: "Track SSL certificate validity, HTTPS redirects and domain registration expiry for every client website, with alerts 30, 14 and 7 days before anything lapses.",
    h1: "SSL and domain expiry monitoring for every client",
    intro: "An expired certificate shows visitors a full-page security warning; an expired domain takes the whole site offline. Watchfront watches both and warns you well before either happens.",
    steps: [["Automatic discovery", "Adding a website starts SSL and domain checks automatically."], ["Daily verification", "We validate the certificate chain, hostname, expiry date and HTTPS redirect, and look up the domain's registry expiry."], ["Early warnings", "You're alerted ahead of expiry — and if a registry hides the date, we show it as unknown instead of guessing."]],
    benefits: ["Certificate expiry, issuer and hostname match", "HTTP → HTTPS redirect check", "Domain registration expiry via RDAP/WHOIS", "Warnings before expiry, not after", "Honest “unknown” when a registry doesn't publish dates"],
    faqs: [
      { q: "How early will I be warned?", a: "You'll see a warning from 30 days before expiry and an alert as the date gets closer, so there is time to renew." },
      { q: "Does it work with Let's Encrypt auto-renewal?", a: "Yes. If auto-renewal fails silently, the certificate's expiry date stops moving and Watchfront warns you." },
    ],
    related: ["uptime-monitoring", "client-reports", "visual-regression-testing"],
  },
  {
    slug: "visual-regression-testing", name: "Content & visual checks", short: "Spot missing content, broken links and unexpected visual changes.",
    title: "Visual Regression Testing & Broken Link Checker for Client Websites",
    description: "Watch key pages for missing text, missing elements, broken links and unexpected visual changes. Point-and-click setup, screenshot comparison and one-click approval.",
    h1: "Content and visual checks without writing a single selector",
    intro: "Open a page in Watchfront, tick the words and parts that must always be there, and we check them on a schedule. Screenshots are compared with the version you approved, and broken links are listed in plain English.",
    steps: [["Pick what matters", "We suggest the main heading, key buttons and contact details. Click anything else on the preview to watch it."], ["We check on a schedule", "Missing text or parts open an incident. Look changes are compared against your approved screenshot."], ["You decide", "Was the change on purpose? Approve the new look, report a problem, or ignore it once."]],
    benefits: ["Point-and-click setup with automatic suggestions", "Screenshot comparison with adjustable sensitivity", "Cookie banners, chat bubbles and sliders ignored automatically", "Broken-link scan with plain-English reasons", "Side-by-side, slider and highlight views"],
    faqs: [
      { q: "Will dynamic content cause false alarms?", a: "Watchfront hides common moving parts (cookie banners, chat widgets, sliders) automatically, and you can hide any other area by dragging a box over it." },
      { q: "Is a visual change treated as an outage?", a: "No. Missing content is an incident; a visual change is flagged for review so a person decides if it was intentional." },
    ],
    related: ["form-journey-testing", "uptime-monitoring", "client-reports"],
  },
  {
    slug: "form-journey-testing", name: "Form & journey testing", short: "Prove contact forms, logins and booking flows still work.",
    title: "Automated Form & User Journey Testing — Record Without Code",
    description: "Record contact forms, logins and booking flows by clicking through the site. Watchfront replays them in a real browser on a schedule and alerts you with screenshots when a step fails.",
    h1: "Test the forms and journeys that bring in leads",
    intro: "A site can be “up” while its contact form silently fails. Record the journey once by clicking through it — Watchfront replays it in a real Chromium browser and tells you exactly which step broke.",
    steps: [["Record by clicking", "Open the site inside Watchfront and click through it like a visitor. Each action becomes a plain-English step."], ["Replay on a schedule", "A real browser repeats the journey hourly or daily, with retries and screenshots."], ["Know which step failed", "Alerts say “Step 3 failed — couldn't find the ‘Send’ button”, with the screenshot and console log attached."]],
    benefits: ["No-code recorder with plain-English steps", "Real Chromium browser (Playwright)", "Payment requests always blocked by default", "Unique test emails and a test-traffic header", "Per-step screenshots, console and network logs"],
    faqs: [
      { q: "Will test submissions spam my client?", a: "Each run uses a unique watchfront-test email and sends an x-watchfront-test header so submissions can be filtered. You confirm the form is safe to repeat before scheduling." },
      { q: "Can it test logins?", a: "Yes — use a dedicated test account. Passwords are stored encrypted and never shown again. OTP logins are verified up to the point of sending a code." },
    ],
    related: ["visual-regression-testing", "api-monitoring", "javascript-error-monitoring"],
  },
  {
    slug: "api-monitoring", name: "API monitoring", short: "Check backend endpoints and integrations, not just the homepage.",
    title: "API Monitoring — Import Postman, OpenAPI or CSV and Monitor Endpoints",
    description: "Monitor REST APIs and third-party integrations with status, response-time and response-content checks. Discover endpoints automatically or import Postman, OpenAPI, HAR, CSV or cURL.",
    h1: "API monitoring that's easy to set up — for developers and everyone else",
    intro: "Booking engines, form handlers and CMS endpoints fail independently of the homepage. Watchfront calls them on a schedule and checks the answer, not just the status code.",
    steps: [["Add APIs your way", "Find them automatically by scanning the site, paste a cURL command, import Postman / OpenAPI / HAR, or upload a CSV."], ["Define “working”", "Expected status codes, maximum response time, and checks on response fields or text."], ["Get told when it breaks", "Plain-English answers like “401 — the token is missing or expired”, with history and alerts."]],
    benefits: ["Automatic endpoint discovery from the website", "Postman, OpenAPI/Swagger, HAR, CSV and cURL import", "Encrypted secret headers for tokens and API keys", "JSON field, text, header and response-time checks", "Real-visitor API failures from the browser script"],
    faqs: [
      { q: "Can I import my Postman collection?", a: "Yes. Postman v2/v2.1 collections, OpenAPI 3 / Swagger 2 JSON, HAR files and CSV sheets are supported. Variables like {{baseUrl}} are filled in during import." },
      { q: "How are API keys stored?", a: "Authorization, cookie and API-key headers are detected automatically and stored encrypted. They're never displayed again after saving." },
    ],
    related: ["javascript-error-monitoring", "form-journey-testing", "uptime-monitoring"],
  },
  {
    slug: "javascript-error-monitoring", name: "JavaScript error monitoring", short: "See the errors real visitors hit — with the steps they took before it broke.",
    title: "JavaScript Error Monitoring for Websites — With Visitor Steps & Plain English",
    description: "Capture JavaScript crashes, missing files and failed API calls from real visitors. Errors are grouped across browsers, counted by visitors affected, and show the clicks and pages before they happened.",
    h1: "JavaScript error monitoring that shows what the visitor did",
    intro: "Add one ~3 KB script, or press “Re-check now” with no install. Watchfront groups the same bug across Chrome, Safari and Firefox, counts how many visitors were hit, and replays the steps they took before the crash — in language your whole team can follow.",
    steps: [["Install or re-check", "Paste a ~3 KB async script for real-visitor data, or run an on-demand re-check with no install."], ["Grouped across browsers", "The same bug is merged even when Chrome, Safari and Firefox word the message differently — with pages, devices, releases and visitors affected."], ["See the steps, then verify", "Open the clicks and requests before the crash, fix it, then re-check the pages to confirm."]],
    benefits: ["~3 KB gzipped script — batches many errors into one request", "Cross-browser grouping (Chrome, Safari, Firefox wording)", "Visitor counts, not just raw event totals", "Breadcrumbs: pages, clicks and failing requests before the crash", "On-demand re-check in a real browser", "Plain-English explanation and fix for each error", "Spike alerts and first-seen alerts on new errors"],
    faqs: [
      { q: "Does the script slow down the website?", a: "No. It's about 3 KB gzipped, loads asynchronously, batches errors into a single request, and ignores bots and browser extensions." },
      { q: "Is personal data collected?", a: "Query strings are stripped. Form values, cookies and request bodies are never collected. Emails and tokens are redacted on the server before anything is stored." },
      { q: "How is this different from a basic console log?", a: "Watchfront groups repeats, counts affected visitors, shows what they did before the error, and lets you re-check the pages after a fix." },
    ],
    related: ["api-monitoring", "uptime-monitoring", "form-journey-testing"],
  },
  {
    slug: "client-reports", name: "Client reports", short: "Turn monitoring into reports clients actually read.",
    title: "White-Label Website Monitoring Reports for Agency Clients",
    description: "Generate branded, shareable website reports with uptime, incidents, actions taken and coverage. Schedule them monthly or share a secure link in one click.",
    h1: "Client reports that prove the value of your retainer",
    intro: "Uptime, incidents and fixes become a clear report your client can open from a link — branded with your agency's name, and honest about exactly what was monitored.",
    steps: [["Pick a client and period", "Watchfront pulls uptime, incidents, resolutions and checks automatically."], ["Add your notes", "Summarise the month in your own words alongside the data."], ["Share or schedule", "Send a secure link or schedule the report to go out every month."]],
    benefits: ["Uptime, response time and incident summaries", "Resolution notes from your team", "White-label branding on Agency", "Secure shareable links — no client login needed", "Scheduled monthly delivery"],
    faqs: [
      { q: "Do clients need an account?", a: "No. Reports open from a secure, unguessable link. You can revoke a link at any time." },
      { q: "Can I put my agency's branding on reports?", a: "Yes, white-label branding is available on the Agency plan." },
    ],
    related: ["uptime-monitoring", "ssl-domain-monitoring", "visual-regression-testing"],
  },
];

export const USE_CASES: UseCase[] = [
  {
    slug: "web-agencies", name: "Web agencies",
    title: "Website Monitoring Software for Web Agencies",
    description: "Monitor every client website from one dashboard: uptime, SSL, forms, content and errors — with incidents your developers can act on and reports your clients understand.",
    h1: "Website monitoring built for web agencies",
    intro: "When you manage dozens of client sites, problems are found by clients first. Watchfront puts every site, journey and error on one screen — so your team hears about it first, with the evidence to fix it.",
    pains: ["Clients report broken forms before you notice", "Checking 40 sites by hand every Monday", "Expired SSL certificates on sites you thought were fine", "Hours spent writing monthly reports"],
    outcomes: [["One portfolio view", "Every client's websites grouped, with health at a glance."], ["Evidence, not guesswork", "Screenshots, console logs and timelines on every incident."], ["Reports in one click", "Uptime and fixes turned into a link your client can open."]],
    features: ["uptime-monitoring", "form-journey-testing", "client-reports", "visual-regression-testing"],
    faqs: [{ q: "How many client websites can I monitor?", a: "Starter covers 1–3 sites (₹999), Growth 4–10 (₹2,499), Agency up to 50 (₹4,999). Enterprise is custom — book a call." }, { q: "Can I give clients access?", a: "Yes — invite clients with a read-only role scoped to their own websites, or share report links." }],
  },
  {
    slug: "wordpress-maintenance", name: "WordPress maintenance",
    title: "WordPress Maintenance Monitoring — Catch Broken Plugin Updates",
    description: "Catch what WordPress plugin and theme updates break: contact forms, layouts, checkout and JavaScript errors. Visual checks and form tests run after every update.",
    h1: "Catch what plugin updates break — before your client does",
    intro: "A routine plugin update can quietly break a contact form or a page layout. Watchfront checks the forms, content and look of every WordPress site you maintain, so problems surface right after the update.",
    pains: ["Plugin updates that silently break forms", "Layout shifts nobody notices for weeks", "Clients asking “is the site OK?”", "No proof of the work in your care plan"],
    outcomes: [["Forms tested on schedule", "Contact Form 7, Gravity Forms, WPForms — any form, tested in a real browser."], ["Visual changes flagged", "Screenshots compared with the version you approved."], ["Care-plan reports", "Show clients the checks, uptime and fixes you delivered."]],
    features: ["form-journey-testing", "visual-regression-testing", "uptime-monitoring", "client-reports"],
    faqs: [{ q: "Do I need a WordPress plugin?", a: "No. Everything works from the outside — nothing to install or update on client sites." }, { q: "Does it work with page builders?", a: "Yes. Elementor, Divi, Gutenberg and any other builder are tested as real pages in a real browser." }],
  },
  {
    slug: "marketing-agencies", name: "Marketing agencies",
    title: "Landing Page & Lead Form Monitoring for Marketing Agencies",
    description: "Protect campaign spend by monitoring landing pages, lead forms and tracking scripts. Get alerted when a form, page or key message breaks during a campaign.",
    h1: "Protect campaign spend with landing page monitoring",
    intro: "Paid traffic sent to a broken landing page is money lost every minute. Watchfront watches the pages and forms your campaigns depend on, and alerts you the moment one stops converting.",
    pains: ["Ad spend wasted on broken landing pages", "Lead forms failing over a weekend", "Key offers or prices changed without notice", "Tracking scripts erroring on mobile"],
    outcomes: [["Lead forms tested hourly", "Know within the hour if submissions stop working."], ["Key messages watched", "Get alerted if the offer, price or CTA disappears."], ["Errors explained", "See JavaScript errors from real visitors in plain English."]],
    features: ["form-journey-testing", "visual-regression-testing", "javascript-error-monitoring", "uptime-monitoring"],
    faqs: [{ q: "Can I monitor landing pages on other platforms?", a: "Yes — Webflow, Unbounce, HubSpot, Shopify or custom builds. If it's a public page, Watchfront can test it." }],
  },
  {
    slug: "freelancers", name: "Freelancers",
    title: "Website Monitoring for Freelance Web Developers",
    description: "Affordable uptime, SSL and form monitoring for freelancers managing client websites. Start free with 3 sites and look like an agency with professional reports.",
    h1: "Look after every client site like a full agency would",
    intro: "You can't watch every client site yourself. Watchfront does it for you — uptime, certificates, forms and errors — and sends a professional report you can share with each client.",
    pains: ["No time to check client sites manually", "Finding out about downtime from an angry email", "Renewals and certificates slipping through", "Hard to show the value of a maintenance fee"],
    outcomes: [["Start free", "Monitor 3 websites free, forever."], ["Alerts you can trust", "Retries and thresholds mean no 3 a.m. false alarms."], ["Professional reports", "Share uptime and fixes with clients in one click."]],
    features: ["uptime-monitoring", "ssl-domain-monitoring", "form-journey-testing", "client-reports"],
    faqs: [{ q: "Is there really a free plan?", a: "Yes — 3 websites with 5-minute checks and email alerts, no credit card required." }],
  },
];

export type MarketingPlan = {
  name: string;
  price: number;
  priceInr: number;
  note: string;
  features: string[];
  featured?: boolean;
  /** Custom price label (e.g. Enterprise) */
  priceLabel?: string;
  cta?: string;
  href?: string;
};

export const PLANS: MarketingPlan[] = [
  {
    name: "Starter", price: 12, priceInr: 999, note: "1–3 websites",
    features: ["Up to 3 websites", "1-minute checks", "SSL & domain monitoring", "Content checks", "Email alerts", "30-day history"],
  },
  {
    name: "Growth", price: 30, priceInr: 2499, note: "4–10 websites", featured: true,
    features: ["Up to 10 websites", "Client grouping", "API & JS monitoring", "120 browser-test min", "Slack alerts", "Scheduled reports"],
  },
  {
    name: "Agency", price: 60, priceInr: 4999, note: "10+ websites",
    features: ["Up to 50 websites", "White-label reports", "400 browser-test min", "10 team members", "Priority support", "180-day history"],
  },
  {
    name: "Enterprise", price: 0, priceInr: 0, note: "Large portfolios & custom needs",
    priceLabel: "Custom", cta: "Book a call", href: "/contact#book",
    features: ["Unlimited scale", "SSO & audit needs", "Custom retention", "Dedicated support", "SLA options", "Onboarding help"],
  },
];

export const COMPARISON: [string, string, string, string, string][] = [
  ["Websites", "3", "10", "50", "Custom"],
  ["Best for", "Freelancers", "Growing teams", "Agencies", "Enterprise"],
  ["Price / month", "₹999", "₹2,499", "₹4,999", "Custom"],
  ["Check interval", "1 min", "1 min", "1 min", "Custom"],
  ["SSL & domain monitoring", "✓", "✓", "✓", "✓"],
  ["Content & visual checks", "✓", "✓", "✓", "✓"],
  ["Browser-test minutes / month", "30", "120", "400", "Custom"],
  ["JavaScript & API monitoring", "—", "✓", "✓", "✓"],
  ["Client / white-label reports", "—", "✓", "✓ white-label", "✓"],
  ["Slack, Teams & webhooks", "—", "✓", "✓", "✓"],
  ["Team members", "1", "3", "10", "Custom"],
];

export const HOME_FAQS: Faq[] = [
  { q: "What is Watchfront?", a: "Watchfront is a website monitoring and automated QA platform for agencies. It checks uptime, SSL, domains, content, forms, APIs and JavaScript errors across every client website, and turns the results into incidents and client reports." },
  { q: "How is it different from a basic uptime monitor?", a: "A site can be “up” while its contact form, checkout or layout is broken. Watchfront tests the things that matter to the business — forms, journeys, content and errors — and attaches evidence to every incident." },
  { q: "Do I need to install anything?", a: "No. Uptime, SSL, content, journey and API checks work from the outside. The optional browser script adds real-visitor JavaScript errors." },
  { q: "Is there a free plan?", a: "Yes. Start with 1 website free to evaluate. Paid plans begin at ₹999/month for up to 3 websites." },
  { q: "Is it safe to test forms on live sites?", a: "Yes. Payment requests are blocked by default, each run uses a unique test email and a test header, and you confirm a form is safe to repeat before it's scheduled." },
];

export const PRICING_FAQS: Faq[] = [
  { q: "Can I change plans later?", a: "Yes, upgrade or downgrade at any time. Changes take effect immediately and are prorated." },
  { q: "What currency do you charge in?", a: "Subscriptions are billed in Indian Rupees (INR) via Cashfree. Starter ₹999, Growth ₹2,499, Agency ₹4,999 per month." },
  { q: "What is your refund policy?", a: "You can cancel anytime. First paid purchase may be refundable within 7 days if unused; see our Refund & Cancellation Policy." },
  { q: "What are browser-test minutes?", a: "Journey tests, visual checks and re-checks run in a real browser. Minutes measure that browser time and are shown before you run anything." },
  { q: "Do you offer discounts for agencies?", a: "Annual billing saves two months. For larger portfolios, book an Enterprise call." },
  { q: "Do you offer enterprise plans?", a: "Yes — custom limits, SSO, audit requirements and dedicated support. Book a call from the pricing page." },
];


export const featureBySlug = (s: string) => FEATURES.find((f) => f.slug === s);
export const getUseCase = (s: string) => USE_CASES.find((u) => u.slug === s);
export const audience = (u: UseCase) => u.name.replace(/\b(?!WordPress\b)\w+/g, (w) => w.toLowerCase());
