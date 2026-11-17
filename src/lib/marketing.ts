export type Faq = { q: string; a: string };
export type Feature = {
  slug: string; name: string; short: string; title: string; description: string; h1: string; intro: string;
  keywords: string[]; steps: [string, string][]; benefits: string[]; faqs: Faq[]; related: string[];
};
export type UseCase = {
  slug: string; name: string; title: string; description: string; h1: string; intro: string;
  keywords: string[]; pains: string[]; outcomes: [string, string][]; features: string[]; faqs: Faq[];
};

export const FEATURES: Feature[] = [
  {
    slug: "uptime-monitoring", name: "Uptime & response time", short: "Know within a minute when a client site goes down - without false alarms.",
    title: "Uptime Monitoring with 1-Minute Checks & Alerts | Watchfront",
    description: "Website uptime monitoring with 1-minute checks, retries and confirmed-outage alerts for agencies. Response times and history included. Free 3-day trial.",
    keywords: ["uptime monitoring", "website uptime monitoring", "website downtime alerts", "monitor client websites", "response time monitoring"],
    h1: "Uptime monitoring that only wakes you for real outages",
    intro: "Watchfront is an uptime monitoring tool built for agencies that look after many client sites. We check each website as often as every minute, retry failures before alerting, and open incidents only for real downtime - not a single slow request.",
    steps: [["Add a website", "Paste the address. We start checking it straight away - no code or plugin needed."], ["We retry before alerting", "A failure is confirmed with an automatic retry and a failure threshold you control."], ["Get an incident with evidence", "Status code, response time, error and timeline are attached, and recovery closes it automatically."]],
    benefits: ["Checks as often as every minute", "Retries and failure thresholds prevent false alarms", "Response-time history and 24h / 7d / 30d uptime", "Email alerts today · WhatsApp coming soon", "Uptime figures flow straight into client reports"],
    faqs: [
      { q: "How often does Watchfront check my websites?", a: "As often as every minute. You can set a different interval per website." },
      { q: "How do you avoid false alarms?", a: "Every failure is retried, and an incident only opens after the number of consecutive failures you choose. Short blips are recorded as transient instead of paging your team." },
      { q: "Do I need to install anything on the website?", a: "No. Uptime, SSL and domain checks work from the outside. The optional error script is only needed for real-visitor JavaScript errors." },
    ],
    related: ["seo-audit", "ssl-domain-monitoring", "client-reports"],
  },
  {
    slug: "seo-audit", name: "SEO audit", short: "Score titles, meta, headings and social tags across sitemap pages - not just the homepage.",
    title: "Website SEO Audit Tool - Multi-Page Scores | Watchfront",
    description: "Multi-page website SEO audit for agencies: titles, meta, headings, canonicals and social tags scored 0-100 with a plain-English fix list. Free trial.",
    keywords: ["SEO audit", "website SEO audit", "on-page SEO check", "meta title checker", "seo audit tool"],
    h1: "SEO audits that cover the whole site, not just the homepage",
    intro: "A strong homepage can hide thin titles and missing meta on the pages that actually get traffic. Watchfront’s SEO audit crawls the sitemap and internal links, scores each page 0-100, and lists what to fix in plain English.",
    steps: [["We find the pages", "Sitemap.xml plus important internal links - up to dozens of pages per site."], ["Each page is scored", "HTTPS, title, meta description, H1, canonical, robots, viewport, language, Open Graph, Twitter card, image alt text and charset."], ["You get a grade and a list", "Site score, letter grade, and failed or warned items with tips - scheduled daily or run on demand."]],
    benefits: ["Multi-page crawl from sitemap and links", "On-page checks weighted into a 0-100 score and A-F grade", "Titles, meta, H1, canonical and indexing rules", "Open Graph and Twitter / X card tags", "Image alt coverage and mobile viewport", "Incidents when SEO needs attention", "Per-page results in the dashboard"],
    faqs: [
      { q: "Is this a ranking tool or keyword research?", a: "No. Watchfront audits on-page SEO hygiene across your client’s pages - titles, meta, structure and share tags - so agencies catch basics before they hurt search or social." },
      { q: "How many pages are checked?", a: "Up to dozens of pages per site. We prioritise the sitemap and important internal links. Want to check a single page right now? Use the free SEO checker." },
      { q: "Do I need to install a plugin?", a: "No. Audits run from the outside like uptime and SSL - nothing to install on the client site." },
    ],
    related: ["uptime-monitoring", "visual-regression-testing", "client-reports"],
  },
  {
    slug: "ssl-domain-monitoring", name: "SSL & domain expiry", short: "Never let a certificate or domain expire on a client again.",
    title: "SSL Certificate & Domain Expiry Monitoring | Watchfront",
    description: "Track certificate and domain expiry on every client site. Get warned before something lapses - and see HTTPS redirect issues early.",
    keywords: ["SSL certificate monitoring", "domain expiry monitoring", "HTTPS redirect check", "SSL expiry alerts"],
    h1: "SSL and domain expiry monitoring for every client",
    intro: "An expired SSL certificate shows visitors a full-page security warning; an expired domain takes the whole site offline. Watchfront’s SSL certificate monitoring and domain expiry checks warn you well before either happens.",
    steps: [["Automatic discovery", "Adding a website starts SSL and domain checks automatically."], ["Daily verification", "We validate the certificate chain, hostname, expiry date and HTTPS redirect, and look up the domain's registry expiry."], ["Early warnings", "You're alerted ahead of expiry - and if a registry hides the date, we show it as unknown instead of guessing."]],
    benefits: ["Certificate expiry, issuer and hostname match", "HTTP → HTTPS redirect check", "Domain registration expiry via RDAP/WHOIS", "Warnings before expiry, not after", "Honest “unknown” when a registry doesn't publish dates"],
    faqs: [
      { q: "How early will I be warned?", a: "You'll see a warning from 30 days before expiry and an alert as the date gets closer, so there is time to renew." },
      { q: "Does it work with Let's Encrypt auto-renewal?", a: "Yes. If auto-renewal fails silently, the certificate's expiry date stops moving and Watchfront warns you." },
    ],
    related: ["uptime-monitoring", "client-reports", "visual-regression-testing"],
  },
  {
    slug: "visual-regression-testing", name: "Content & visual checks", short: "Spot missing content, broken links and unexpected visual changes.",
    title: "Visual Regression & Content Monitoring | Watchfront",
    description: "Watch important text and layout on a schedule. Catch missing content, broken links and unexpected screenshot changes - without writing selectors.",
    keywords: ["visual regression testing", "broken link checker", "content monitoring", "website screenshot comparison"],
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
    title: "Contact Form & User Journey Monitoring | Watchfront",
    description: "Record a form or booking flow once, then replay it in a real browser. When a step fails, you get the screenshot and logs - not a vague “site is up”.",
    keywords: ["contact form monitoring", "journey testing", "form monitoring", "booking flow test"],
    h1: "Test the forms and journeys that bring in leads",
    intro: "A site can be “up” while its contact form silently fails. Watchfront’s contact form monitoring lets you record the journey once by clicking through it - then replays it in a real browser and tells you exactly which step broke.",
    steps: [["Record by clicking", "Open the site inside Watchfront and click through it like a visitor. Each action becomes a plain-English step."], ["Replay on a schedule", "A real browser repeats the journey hourly or daily, with retries and screenshots."], ["Know which step failed", "Alerts say “Step 3 failed - couldn't find the ‘Send’ button”, with the screenshot and console log attached."]],
    benefits: ["No-code recorder with plain-English steps", "Real Chromium browser under the hood", "Payment requests always blocked by default", "Unique test emails and a test-traffic header", "Per-step screenshots, console and network logs"],
    faqs: [
      { q: "Will test submissions spam my client?", a: "Each run uses a unique watchfront-test email and sends an x-watchfront-test header so submissions can be filtered. You confirm the form is safe to repeat before scheduling." },
      { q: "Can it test logins?", a: "Yes - use a dedicated test account. Passwords are stored encrypted and never shown again. OTP logins are verified up to the point of sending a code." },
    ],
    related: ["visual-regression-testing", "api-monitoring", "javascript-error-monitoring"],
  },
  {
    slug: "api-monitoring", name: "API monitoring", short: "Check backend endpoints and integrations, not just the homepage.",
    title: "API Monitoring for Endpoints & Integrations | Watchfront",
    description: "Schedule checks on the endpoints that matter. Import Postman or OpenAPI, assert status and body, and catch API failures the homepage never shows.",
    keywords: ["API monitoring", "endpoint monitoring", "Postman monitoring", "OpenAPI checks"],
    h1: "API monitoring that's easy to set up - for developers and everyone else",
    intro: "Booking engines, form handlers and CMS endpoints fail independently of the homepage. Watchfront calls them on a schedule and checks the answer, not just the status code.",
    steps: [["Add APIs your way", "Find them automatically by scanning the site, paste a cURL command, import Postman / OpenAPI / HAR, or upload a CSV."], ["Define “working”", "Expected status codes, maximum response time, and checks on response fields or text."], ["Get told when it breaks", "Plain-English answers like “401 - the token is missing or expired”, with history and alerts."]],
    benefits: ["Automatic endpoint discovery from the website", "Postman, OpenAPI/Swagger, HAR, CSV and cURL import", "Encrypted secret headers for tokens and API keys", "JSON field, text, header and response-time checks", "Real-visitor API failures from the browser script"],
    faqs: [
      { q: "Can I import my Postman collection?", a: "Yes. Postman v2/v2.1 collections, OpenAPI 3 / Swagger 2 JSON, HAR files and CSV sheets are supported. Variables like {{baseUrl}} are filled in during import." },
      { q: "How are API keys stored?", a: "Authorization, cookie and API-key headers are detected automatically and stored encrypted. They're never displayed again after saving." },
    ],
    related: ["javascript-error-monitoring", "form-journey-testing", "uptime-monitoring"],
  },
  {
    slug: "javascript-error-monitoring", name: "JavaScript error monitoring", short: "See the errors real visitors hit - with the steps they took before it broke.",
    title: "JavaScript Error Monitoring for Websites | Watchfront",
    description: "See crashes and failed requests from real visitors. Errors are grouped across browsers, with the clicks that led up to the bug.",
    keywords: ["JavaScript error monitoring", "JS error tracking", "client-side error monitoring", "browser error monitoring"],
    h1: "JavaScript error monitoring that shows what the visitor did",
    intro: "Add one ~3 KB script, or press “Re-check now” with no install. Watchfront groups the same bug across Chrome, Safari and Firefox, counts how many visitors were hit, and replays the steps they took before the crash - in language your whole team can follow.",
    steps: [["Install or re-check", "Paste a ~3 KB async script for real-visitor data, or run an on-demand re-check with no install."], ["Grouped across browsers", "The same bug is merged even when Chrome, Safari and Firefox word the message differently - with pages, devices, releases and visitors affected."], ["See the steps, then verify", "Open the clicks and requests before the crash, fix it, then re-check the pages to confirm."]],
    benefits: ["~3 KB gzipped script - batches many errors into one request", "Cross-browser grouping (Chrome, Safari, Firefox wording)", "Visitor counts, not just raw event totals", "Breadcrumbs: pages, clicks and failing requests before the crash", "On-demand re-check in a real browser", "Plain-English explanation and fix for each error", "Spike alerts and first-seen alerts on new errors"],
    faqs: [
      { q: "Does the script slow down the website?", a: "No. It's about 3 KB gzipped, loads asynchronously, batches errors into a single request, and ignores bots and browser extensions." },
      { q: "Is personal data collected?", a: "Query strings are stripped. Form values, cookies and request bodies are never collected. Emails and tokens are redacted on the server before anything is stored." },
      { q: "How is this different from a basic console log?", a: "Watchfront groups repeats, counts affected visitors, shows what they did before the error, and lets you re-check the pages after a fix." },
    ],
    related: ["api-monitoring", "uptime-monitoring", "form-journey-testing"],
  },
  {
    slug: "client-reports", name: "Client reports", short: "Turn monitoring into reports clients actually read.",
    title: "White-Label Website Uptime Reports | Watchfront",
    description: "Share uptime, incidents and fixes in a report clients can open without an account. Brand it with your agency name.",
    keywords: ["client website reports", "uptime reports", "white label monitoring reports", "agency monitoring reports"],
    h1: "Client reports that prove the value of your retainer",
    intro: "Turn monitoring into client website uptime reports your clients actually open - branded with your agency’s name (white-label on Agency), honest about coverage, and shareable without a login.",
    steps: [["Pick a client and period", "Watchfront pulls uptime, incidents, resolutions and checks automatically."], ["Add your notes", "Summarise the month in your own words alongside the data."], ["Share or schedule", "Send a secure link or schedule the report to go out every month."]],
    benefits: ["Uptime, response time and incident summaries", "Resolution notes from your team", "White-label branding on Agency", "Secure shareable links - no client login needed", "Scheduled monthly delivery"],
    faqs: [
      { q: "Do clients need an account?", a: "No. Reports open from a secure, unguessable link. You can revoke a link at any time." },
      { q: "Can I put my agency's branding on reports?", a: "Yes, white-label branding with your agency name and logo is available." },
    ],
    related: ["uptime-monitoring", "ssl-domain-monitoring", "visual-regression-testing"],
  },
];

export const USE_CASES: UseCase[] = [
  {
    slug: "web-agencies", name: "Web agencies",
    title: "Website Monitoring for Web Agencies | Watchfront",
    description: "One place for every client site: uptime, SSL, forms, SEO and errors. Your team sees the problem first - with evidence and a report you can share.",
    keywords: ["website monitoring for agencies", "agency website monitoring", "monitor client websites", "web agency monitoring"],
    h1: "Website monitoring built for web agencies",
    intro: "When you manage dozens of client sites, problems are found by clients first. Watchfront is website monitoring software for web agencies - every site, journey and error on one screen, so your team hears about it first with the evidence to fix it.",
    pains: ["Clients report broken forms before you notice", "Checking 40 sites by hand every Monday", "Expired SSL certificates on sites you thought were fine", "Hours spent writing monthly reports"],
    outcomes: [["One portfolio view", "Every client's websites grouped, with health at a glance."], ["Evidence, not guesswork", "Screenshots, console logs and timelines on every incident."], ["Reports in one click", "Uptime and fixes turned into a link your client can open."]],
    features: ["uptime-monitoring", "form-journey-testing", "seo-audit", "client-reports", "visual-regression-testing"],
    faqs: [{ q: "How many client websites can I monitor?", a: "As many as your portfolio needs - try it free for 3 days, and book a call if you manage 50+ sites." }, { q: "Can I give clients access?", a: "Yes - invite clients with a read-only role scoped to their own websites, or share report links." }],
  },
  {
    slug: "wordpress-maintenance", name: "WordPress maintenance",
    title: "WordPress Site Monitoring for Maintenance | Watchfront",
    description: "Catch what plugin and theme updates break - forms, layouts and JS errors - before the client notices. No WordPress plugin to install.",
    keywords: ["WordPress website monitoring", "WordPress maintenance monitoring", "plugin update monitoring", "WordPress form monitoring"],
    h1: "Catch what plugin updates break - before your client does",
    intro: "A routine WordPress plugin update can quietly break a contact form or layout. Watchfront’s WordPress website monitoring checks forms, content and look on every site you maintain, so problems surface right after the update.",
    pains: ["Plugin updates that silently break forms", "Layout shifts nobody notices for weeks", "Clients asking “is the site OK?”", "No proof of the work in your care plan"],
    outcomes: [["Forms tested on schedule", "Contact Form 7, Gravity Forms, WPForms - any form, tested in a real browser."], ["Visual changes flagged", "Screenshots compared with the version you approved."], ["Care-plan reports", "Show clients the checks, uptime and fixes you delivered."]],
    features: ["form-journey-testing", "visual-regression-testing", "seo-audit", "uptime-monitoring", "client-reports"],
    faqs: [{ q: "Do I need a WordPress plugin?", a: "No. Everything works from the outside - nothing to install or update on client sites." }, { q: "Does it work with page builders?", a: "Yes. Elementor, Divi, Gutenberg and any other builder are tested as real pages in a real browser." }],
  },
  {
    slug: "marketing-agencies", name: "Marketing agencies",
    title: "Website Monitoring for Marketing Agencies | Watchfront",
    description: "Watch campaign pages and lead forms. Get alerted when a page goes down or a form stops converting - before ad spend is wasted.",
    keywords: ["landing page monitoring", "lead form monitoring", "marketing agency monitoring", "campaign page uptime"],
    h1: "Protect campaign spend with landing page monitoring",
    intro: "Paid traffic sent to a broken landing page is money lost every minute. Watchfront’s landing page monitoring watches the pages and lead forms your campaigns depend on, and alerts you the moment one stops converting.",
    pains: ["Ad spend wasted on broken landing pages", "Lead forms failing over a weekend", "Key offers or prices changed without notice", "Tracking scripts erroring on mobile"],
    outcomes: [["Lead forms tested hourly", "Know within the hour if submissions stop working."], ["Key messages watched", "Get alerted if the offer, price or CTA disappears."], ["Errors explained", "See JavaScript errors from real visitors in plain English."]],
    features: ["form-journey-testing", "visual-regression-testing", "seo-audit", "javascript-error-monitoring", "uptime-monitoring"],
    faqs: [{ q: "Can I monitor landing pages on other platforms?", a: "Yes - Webflow, Unbounce, HubSpot, Shopify or custom builds. If it's a public page, Watchfront can test it." }],
  },
  {
    slug: "freelancers", name: "Freelancers",
    title: "Website Monitoring for Freelancers | Watchfront",
    description: "Affordable uptime, SSL and form checks for the sites you maintain. Start free, and share a clean report with each client.",
    keywords: ["website monitoring for freelancers", "freelancer uptime monitoring", "client site monitoring", "solo developer monitoring"],
    h1: "Look after every client site like a full agency would",
    intro: "You can’t watch every client site yourself. Watchfront is website monitoring for freelancers - uptime, certificates, forms and errors - plus professional reports you can share with each client.",
    pains: ["No time to check client sites manually", "Finding out about downtime from an angry email", "Renewals and certificates slipping through", "Hard to show the value of a maintenance fee"],
    outcomes: [["Start free", "Monitor 3 websites free, forever."], ["Alerts you can trust", "Retries and thresholds mean no 3 a.m. false alarms."], ["Professional reports", "Share uptime and fixes with clients in one click."]],
    features: ["uptime-monitoring", "ssl-domain-monitoring", "seo-audit", "form-journey-testing", "client-reports"],
    faqs: [{ q: "Is there a free trial?", a: "Yes - 3 days with every feature, no credit card required." }],
  },
  {
    slug: "ecommerce-stores",
    name: "Ecommerce stores",
    title: "Ecommerce Website Monitoring | Watchfront",
    description:
      "Ecommerce website monitoring for agencies: uptime, SSL, checkout and lead journeys, SEO and JS errors so store outages do not burn ad spend.",
    keywords: [
      "ecommerce website monitoring",
      "online store uptime monitoring",
      "shopify website monitoring",
      "woocommerce monitoring",
      "checkout monitoring",
    ],
    h1: "Ecommerce website monitoring that watches the path to purchase",
    intro:
      "A store can look fine on the homepage while cart, checkout or payment steps are broken. Watchfront monitors uptime, certificates, key journeys and JS errors so agencies protecting ecommerce clients catch revenue-killing failures first.",
    pains: [
      "Checkout breaks after a plugin or theme update",
      "SSL warnings that kill trust at payment",
      "Campaign traffic hitting a slow or down PDP",
      "No clear monthly proof for the retainer",
    ],
    outcomes: [
      ["Uptime on money URLs", "Homepage, collection and key product pages checked every minute."],
      ["Journey coverage", "Watch critical paths (add-to-cart / lead capture) with payment steps blocked by default."],
      ["Store-ready reports", "Uptime, incidents and SSL days left in a shareable client report."],
    ],
    features: ["uptime-monitoring", "form-journey-testing", "ssl-domain-monitoring", "javascript-error-monitoring", "client-reports"],
    faqs: [
      {
        q: "Can Watchfront monitor Shopify and WooCommerce?",
        a: "Yes. Any public storefront URL can be monitored. Journey tests work on browser-reachable flows; payment requests stay blocked by default.",
      },
      {
        q: "Will journey tests create real orders?",
        a: "Payment steps are blocked by default. Use safe test modes or stop before paid checkout on live stores.",
      },
    ],
  },
];

export const HOME_FAQS: Faq[] = [
  { q: "What is Watchfront?", a: "Watchfront is website monitoring software for agencies and freelancers in India. It monitors client website uptime, SSL certificates, domain expiry, SEO hygiene, content, contact forms, APIs and JavaScript errors - then turns failures into incidents with evidence and client-ready uptime reports." },
  { q: "How is Watchfront different from UptimeRobot or basic uptime tools?", a: "Basic uptime monitors only ask if the homepage responds. A site can be “up” while its contact form, booking flow or layout is broken. Watchfront adds form and journey testing, visual checks, SEO audits, API monitoring and JS error tracking - with screenshots and logs on every incident." },
  { q: "Is Watchfront built for Indian agencies?", a: "Yes. Support is India-friendly, and workflows are designed for agencies managing many client websites - including client grouping and shareable reports." },
  { q: "Do I need to install anything?", a: "No. Uptime, SSL, SEO, content, journey and API checks work from the outside. An optional lightweight script adds real-visitor JavaScript error monitoring." },
  { q: "Is there a free trial?", a: "Yes. Every new workspace gets 3 days with every feature, no card required. If you love it, join the waitlist from your dashboard and we'll reach out to keep you going." },
  { q: "Is it safe to test forms on live sites?", a: "Yes. Payment requests are blocked by default, each run uses a unique test email and a test header, and you confirm a form is safe to repeat before it's scheduled." },
  { q: "What is the best website monitoring tool for agencies?", a: "Look for confirmed uptime, SSL/domain expiry, real-browser form journeys, SEO hygiene checks and client reports - not just a ping. Watchfront is built around that agency checklist." },
  { q: "Can Watchfront monitor WordPress and ecommerce stores?", a: "Yes. WordPress care-plan sites, marketing landers and ecommerce storefronts (Shopify, WooCommerce and custom) can all be monitored from the outside." },
  { q: "Does Watchfront replace ManageWP or update tools?", a: "No. Keep your update/backup stack. Watchfront is the runtime monitoring layer for downtime, SSL, forms, SEO and reports." },
  { q: "What is synthetic monitoring?", a: "Scheduled checks from outside your site — uptime, SSL, form journeys and APIs — that catch failures even when nobody is visiting. See the glossary for a plain-English definition." },
  { q: "Where can I learn monitoring terms?", a: "The Watchfront glossary explains uptime, downtime, SSL, noindex, TTFB, MTTR and more in plain English." },
];

export const featureBySlug = (s: string) => FEATURES.find((f) => f.slug === s);
export const getUseCase = (s: string) => USE_CASES.find((u) => u.slug === s);
export const audience = (u: UseCase) => u.name.replace(/\b(?!WordPress\b)\w+/g, (w) => w.toLowerCase());
