import type { Faq } from "./marketing";

export type ToolKind = "website-status" | "ssl" | "seo";

export type Tool = {
  slug: string;
  kind: ToolKind;
  name: string;
  short: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  keywords: string[];
  placeholder: string;
  button: string;
  sections: { h: string; p: string[] }[];
  faqs: Faq[];
  /** Marketing feature slug under /features/... */
  feature: string;
  /** Money page under /{slug} for stronger SEO CTAs */
  product: string;
};

export const TOOLS: Tool[] = [
  {
    slug: "website-down-checker",
    kind: "website-status",
    name: "Website down checker",
    short: "Is it down for everyone or just you? Check any site's status, response time and redirects.",
    title: "Is My Website Down? Free Checker (Everyone or Just Me) | Watchfront",
    description:
      "Check if a website is down for everyone or just you. Free instant website down checker with HTTP status, response time and redirects — no signup.",
    keywords: [
      "is my website down",
      "website down checker",
      "check if website is down",
      "is the website down for everyone",
      "website down for everyone or just me",
      "is it down right now",
    ],
    h1: "Is my website down — for everyone, or just me?",
    intro:
      "Enter any URL. We request it from our servers (not your Wi-Fi) and show HTTP status, response time and redirects. If it loads here but not for you, the problem is probably local.",
    placeholder: "example.com",
    button: "Check status",
    sections: [
      {
        h: "How this website down checker works",
        p: [
          "We send a real HTTP request to the address you enter from our monitoring servers, follow up to five redirects, and record the final status code and how long the response took. Because the request comes from outside your network, it separates \"the site is down\" from \"my Wi-Fi, DNS or browser cache is broken\".",
          "A 2xx or 3xx response means the server is answering. A 4xx usually means the page is missing or blocked, and a 5xx means the server itself is failing. Timeouts, DNS failures and refused connections are reported in plain English so you know where to look.",
        ],
      },
      {
        h: "Website is down for me but up here - what now?",
        p: [
          "Clear your browser cache or try a private window, switch from Wi-Fi to mobile data, and flush your DNS cache. Corporate firewalls, VPNs and ad blockers can also block specific sites. If only some visitors are affected, a CDN or regional DNS issue is a common cause.",
        ],
      },
      {
        h: "Website is down everywhere - common causes",
        p: [
          "Expired domains and SSL certificates, hosting outages, a failed deploy, a full disk, an overloaded database, or a plugin update that broke the site are the usual suspects. Check your hosting status page first, then recent changes.",
          "A one-off check tells you what's happening now. To find out the moment it happens again - before a client or customer tells you - set up continuous uptime monitoring that retries before alerting so you don't get false alarms.",
        ],
      },
    ],
    faqs: [
      { q: "Is this website down checker free?", a: "Yes. You can run checks without an account. There's a fair-use limit per hour to keep the tool fast for everyone." },
      { q: "Why does a site load for me but show as down here?", a: "Some sites block automated requests or specific regions. If you get a 403 here but the site works in your browser, it's likely bot protection rather than an outage." },
      { q: "What is a good website response time?", a: "Under about 500 ms for the first byte is good, under 200 ms is excellent. Consistently above 1-2 seconds hurts conversions and search rankings." },
      { q: "How can I get alerted when my website goes down?", a: "Use an uptime monitor. Watchfront checks every minute, retries before alerting, and emails you with the status code, error and timeline - free for 3 days." },
    ],
    feature: "uptime-monitoring",
    product: "uptime-monitoring-tool",
  },
  {
    slug: "ssl-checker",
    kind: "ssl",
    name: "SSL certificate checker",
    short: "See who issued a certificate, when it expires, which domains it covers and whether browsers trust it.",
    title: "Free SSL Checker - Expiry Date & Days Left | Watchfront",
    description:
      "Free SSL checker: certificate expiry date, days left, issuer, covered domains (SANs), TLS version and browser trust. Instant, no signup.",
    keywords: [
      "ssl checker",
      "ssl certificate checker",
      "check ssl certificate expiry",
      "ssl expiry checker",
      "ssl expiration checker",
      "https certificate check",
    ],
    h1: "Free SSL checker — expiry date & days left",
    intro: "Enter a domain to see its SSL/TLS certificate in seconds: issuer, expiry date and days left, the domains it covers, the TLS version negotiated, and whether a standard browser would trust it.",
    placeholder: "example.com",
    button: "Check SSL",
    sections: [
      {
        h: "What this SSL checker tests",
        p: [
          "We open a TLS connection to the domain on port 443, read the certificate the server presents, and then validate it the same way a browser does. You'll see the subject, issuer, validity window, Subject Alternative Names (every hostname the certificate covers), the protocol version and any verification error.",
        ],
      },
      {
        h: "Why SSL certificates expire - and why it hurts",
        p: [
          "Certificates are valid for a limited time - free Let's Encrypt certificates last 90 days, and the industry is moving to even shorter lifetimes. Auto-renewal fails more often than people expect: a DNS change, a moved server, a firewall rule or a billing issue at the host can quietly stop it.",
          "When a certificate expires, browsers show a full-page security warning. Most visitors leave immediately, forms stop converting, and APIs that call the site start failing. It's one of the most avoidable outages there is.",
        ],
      },
      {
        h: "Common SSL errors explained",
        p: [
          "\"Hostname mismatch\" means the certificate doesn't list the domain you visited - often www vs non-www. \"Unable to get local issuer certificate\" usually means the server isn't sending the intermediate chain. \"Certificate has expired\" is exactly what it sounds like. Each of these is shown in the result above when it applies.",
          "To avoid surprises, monitor certificates continuously and get warned 30, 14 and 7 days before expiry - especially across many client sites where renewals are easy to lose track of.",
        ],
      },
    ],
    faqs: [
      { q: "How do I check when an SSL certificate expires?", a: "Enter the domain above. The result shows the exact expiry date and the number of days left." },
      { q: "Does this check the full certificate chain?", a: "Yes. We validate the certificate against standard trusted roots, so a missing intermediate certificate shows up as a verification error." },
      { q: "Why does my certificate show as valid in my browser but fail here?", a: "Browsers sometimes fetch missing intermediates or cache them. Many API clients and older devices don't, so a chain problem flagged here is worth fixing." },
      { q: "Can I get alerts before my SSL certificate expires?", a: "Yes. Watchfront checks SSL and domain expiry for every site you add and warns you well before anything lapses." },
    ],
    feature: "ssl-domain-monitoring",
    product: "ssl-certificate-monitoring",
  },
  {
    slug: "seo-checker",
    kind: "seo",
    name: "SEO checker",
    short: "Score any page 0-100 on titles, meta description, headings, canonical, indexing and social tags.",
    title: "Free SEO Checker - On-Page SEO Audit Tool | Watchfront",
    description: "Free on-page SEO checker. Score any URL 0-100 on title, meta description, H1, canonical, robots, viewport, Open Graph, Twitter card and image alt text.",
    keywords: ["free seo checker", "seo checker", "on page seo checker", "meta tag checker", "website seo audit free"],
    h1: "Free on-page SEO checker",
    intro: "Paste a URL to get an instant on-page SEO audit: a 0-100 score, a letter grade, and a plain-English list of what to fix - from titles and meta descriptions to canonicals, indexing rules and social share tags.",
    placeholder: "example.com/page",
    button: "Run SEO check",
    sections: [
      {
        h: "What the SEO checker looks at",
        p: [
          "HTTPS, page title length, meta description, a single clear H1, canonical URL, meta robots (so you catch accidental noindex), mobile viewport, html lang, Open Graph title/description/image, Twitter card, image alt text coverage and character encoding. Each check is weighted into the overall score.",
        ],
      },
      {
        h: "The on-page basics that still matter",
        p: [
          "Titles and meta descriptions decide whether someone clicks your result. A missing or duplicated H1 muddies what a page is about. A stray noindex - often left over from a staging site - can remove a page from Google entirely. Missing Open Graph tags make links look broken when shared on WhatsApp, LinkedIn or X.",
          "None of this replaces great content or backlinks, but these are the cheapest wins in SEO and the easiest things to break during a redesign or plugin update.",
        ],
      },
      {
        h: "Audit one page here, or a whole site automatically",
        p: [
          "This free tool checks a single URL. Agencies usually need more: every important page from the sitemap, re-checked on a schedule, with an alert when a deploy removes a title or flips a page to noindex. That's what Watchfront's SEO audit does across all your client sites.",
        ],
      },
    ],
    faqs: [
      { q: "Is this SEO checker really free?", a: "Yes. No signup is needed to audit a page. There's an hourly fair-use limit per visitor." },
      { q: "What is a good SEO score?", a: "80+ (grade A or B) means the on-page basics are in good shape. Below 60 usually means missing titles, descriptions or indexing problems worth fixing first." },
      { q: "Does a high score guarantee rankings?", a: "No. This checks on-page hygiene. Rankings also depend on content quality, search intent, backlinks and site speed." },
      { q: "Can I audit every page on my site?", a: "Watchfront's SEO audit crawls the sitemap and internal links, scores each page, and re-runs on a schedule. Try it free for 3 days." },
    ],
    feature: "seo-audit",
    product: "website-monitoring",
  },
  {
    slug: "http-status-checker",
    kind: "website-status",
    name: "HTTP status checker",
    short: "See the live HTTP status code, response time and redirect chain for any URL.",
    title: "Free HTTP Status Code Checker | Watchfront",
    description:
      "Free HTTP status checker. Instantly see status code, response time and redirects for any URL - from our servers, not your Wi-Fi.",
    keywords: [
      "http status checker",
      "http status code checker",
      "check http status",
      "website status code",
      "http response checker",
    ],
    h1: "Free HTTP status code checker",
    intro:
      "Paste a URL to see the live HTTP status, how long the response took, and every redirect hop - requested from our monitoring servers so local network issues do not confuse the result.",
    placeholder: "example.com/page",
    button: "Check HTTP status",
    sections: [
      {
        h: "What the status codes mean",
        p: [
          "2xx means success. 3xx means a redirect (we show the chain). 4xx usually means the page is missing, blocked or unauthorised. 5xx means the server or upstream failed. Timeouts and DNS errors are reported in plain English.",
        ],
      },
      {
        h: "Why check from outside your network",
        p: [
          "Your laptop can cache DNS, hit a VPN filter, or use a different route than your visitors. An external HTTP status checker separates “down for everyone” from “down for me.”",
        ],
      },
      {
        h: "From one-off status to continuous monitoring",
        p: [
          "Use this tool when someone says the site is broken. Then put a website uptime monitor on the URLs that matter so you are alerted automatically next time.",
        ],
      },
    ],
    faqs: [
      { q: "Is this HTTP status checker free?", a: "Yes. No signup required. Fair-use limits apply per hour." },
      { q: "Does it follow redirects?", a: "Yes. We follow up to five redirects and show each hop with its status." },
      { q: "What is a good response time?", a: "Under ~500 ms to first byte is good for marketing sites. Consistently above 1–2 seconds hurts conversions." },
    ],
    feature: "uptime-monitoring",
    product: "website-uptime-monitor",
  },
  {
    slug: "redirect-checker",
    kind: "website-status",
    name: "Redirect checker",
    short: "Trace every redirect hop, final URL and status codes for any link.",
    title: "Free Redirect Checker - Trace URL Redirects | Watchfront",
    description:
      "Free redirect checker. Trace HTTP redirects, final URL and status codes for any link - catch chains, loops and mixed-content hops.",
    keywords: [
      "redirect checker",
      "url redirect checker",
      "http redirect checker",
      "check redirects",
      "redirect chain checker",
    ],
    h1: "Free URL redirect checker",
    intro:
      "Enter any URL to see the full redirect chain: each status code, each Location hop, and the final URL our servers land on. Useful after migrations, HTTPS cutovers and campaign link changes.",
    placeholder: "https://example.com/old-page",
    button: "Trace redirects",
    sections: [
      {
        h: "Why redirect chains hurt",
        p: [
          "Long chains slow pages, confuse analytics, and dilute link equity. Mixed HTTP→HTTPS hops still surprise teams after a domain move. A redirect checker makes the path visible in seconds.",
        ],
      },
      {
        h: "Common agency use cases",
        p: [
          "Verify www vs apex, force-HTTPS, vanity campaign URLs, and post-migration maps before you tell the client “everything redirects correctly.”",
        ],
      },
      {
        h: "Keep watching after go-live",
        p: [
          "One check proves today’s chain. Continuous uptime and content monitoring catch when a deploy removes a redirect or points a CTA at a 404.",
        ],
      },
    ],
    faqs: [
      { q: "Is the redirect checker free?", a: "Yes. No account needed for spot checks." },
      { q: "Can it detect redirect loops?", a: "If the chain does not resolve cleanly within the hop limit, you will see the failure instead of a clean final URL." },
      { q: "Does it check HTTPS redirects?", a: "Yes. HTTP to HTTPS hops appear in the chain with their status codes." },
    ],
    feature: "uptime-monitoring",
    product: "website-monitoring",
  },
  {
    slug: "meta-tag-checker",
    kind: "seo",
    name: "Meta tag checker",
    short: "Inspect title, meta description, robots, canonical and social tags on any page.",
    title: "Free Meta Tag Checker - Title & Description | Watchfront",
    description:
      "Free meta tag checker for title, meta description, robots, canonical, Open Graph and Twitter cards. Instant on-page SEO readout.",
    keywords: [
      "meta tag checker",
      "meta description checker",
      "title tag checker",
      "open graph checker",
      "canonical tag checker",
    ],
    h1: "Free meta tag checker",
    intro:
      "Paste a URL to inspect the title tag, meta description, robots directives, canonical, viewport, Open Graph and Twitter card tags - scored with a plain-English fix list.",
    placeholder: "example.com/landing",
    button: "Check meta tags",
    sections: [
      {
        h: "What we read on the page",
        p: [
          "Title length, meta description, H1, canonical, meta robots (including accidental noindex), html lang, Open Graph title/description/image, Twitter card, and related on-page hygiene that affects SERPs and social shares.",
        ],
      },
      {
        h: "Why agencies check meta after every publish",
        p: [
          "CMS edits and page builders silently drop descriptions or leave staging noindex on. A 30-second meta tag check before ads resume saves expensive “why did traffic drop?” calls.",
        ],
      },
      {
        h: "One page here, whole site on a schedule",
        p: [
          "This tool audits a single URL. Watchfront’s SEO audit crawls sitemap pages across client sites and re-checks on a schedule so regressions open incidents.",
        ],
      },
    ],
    faqs: [
      { q: "Is this meta tag checker free?", a: "Yes. Fair-use limits apply. No signup for a single-page check." },
      { q: "Does it check Open Graph tags?", a: "Yes. OG title, description and image are part of the score." },
      { q: "Can I audit every page automatically?", a: "Use Watchfront SEO audit in the 3-day trial to crawl and re-score sitemap pages." },
    ],
    feature: "seo-audit",
    product: "website-monitoring-software",
  },
  {
    slug: "is-it-down",
    kind: "website-status",
    name: "Is it down?",
    short: "Instant “is it down?” check — status code, speed and redirects from outside your network.",
    title: "Is It Down? Free Website Status Check | Watchfront",
    description:
      "Is it down? Free website status check. See if any site is up right now with HTTP code, response time and redirect chain — no account.",
    keywords: [
      "is it down",
      "is the site down",
      "website is down",
      "check website status",
      "website up or down",
    ],
    h1: "Is it down? Check any website right now",
    intro:
      "Paste a URL for a live outside-network check. Use this when someone says “the site is down” and you need a fast, independent answer.",
    placeholder: "example.com",
    button: "Check if it’s down",
    sections: [
      {
        h: "What “is it down?” really means",
        p: [
          "A site can fail for you (DNS, Wi-Fi, VPN) while the origin is fine — or fail for everyone. An external check separates those cases in seconds.",
          "If our check succeeds and your browser fails, fix the local side first. If our check fails too, dig into hosting, SSL, DNS or the last deploy.",
        ],
      },
      {
        h: "From one check to continuous monitoring",
        p: [
          "A one-off “is it down?” answer is useful. An uptime monitoring tool alerts you the next time it happens — before a client forwards a screenshot.",
        ],
      },
    ],
    faqs: [
      { q: "Is this free?", a: "Yes. No signup for fair-use spot checks." },
      { q: "Is it the same as the website down checker?", a: "Same engine, different search phrasing. Both run an external HTTP check." },
      { q: "How do I get alerts next time?", a: "Add the URL to Watchfront uptime monitoring — free for 3 days." },
    ],
    feature: "uptime-monitoring",
    product: "uptime-monitoring-tool",
  },
  {
    slug: "ssl-expiry-checker",
    kind: "ssl",
    name: "SSL expiry checker",
    short: "See SSL certificate expiry date and days left before browsers show a warning.",
    title: "Free SSL Expiry Checker - Certificate Days Left | Watchfront",
    description:
      "Free SSL expiry checker. See certificate expiration date, days left, issuer and trust for any domain — instant, no signup.",
    keywords: [
      "ssl expiry checker",
      "ssl certificate expiry checker",
      "check ssl expiration date",
      "ssl expiry date checker",
      "certificate expiry checker",
    ],
    h1: "Free SSL expiry checker",
    intro:
      "Enter a domain to read the live certificate: expiry date, days remaining, issuer, covered hostnames and whether a browser would trust it.",
    placeholder: "example.com",
    button: "Check SSL expiry",
    sections: [
      {
        h: "Why people search “SSL expiry checker”",
        p: [
          "Expired certificates cause full-page browser warnings and kill conversions. Auto-renewal fails quietly after DNS or host changes — an external expiry check catches what your laptop may still cache.",
        ],
      },
      {
        h: "One check vs continuous SSL monitoring",
        p: [
          "Use this for a spot check. Then enable SSL certificate monitoring across every client site so you get warned at 30/14/7 days left.",
        ],
      },
    ],
    faqs: [
      { q: "Is the SSL expiry checker free?", a: "Yes. Fair-use limits apply." },
      { q: "Does it show days left?", a: "Yes — expiry timestamp and whole days remaining." },
      { q: "Can I monitor many domains?", a: "Yes in Watchfront — SSL and domain expiry for the whole portfolio." },
    ],
    feature: "ssl-domain-monitoring",
    product: "ssl-certificate-monitoring",
  },
  {
    slug: "website-status-checker",
    kind: "website-status",
    name: "Website status checker",
    short: "Live website status: HTTP code, timing and redirects from an external check.",
    title: "Free Website Status Checker | Watchfront",
    description:
      "Free website status checker. Instant HTTP status, response time and redirects for any URL — from our servers, not your Wi-Fi.",
    keywords: [
      "website status checker",
      "website status check",
      "check website status online",
      "site status checker",
      "website online checker",
    ],
    h1: "Free website status checker",
    intro:
      "Paste any public URL to see live status code, speed and redirect hops. Built for the moment someone asks “is the site up?”",
    placeholder: "example.com",
    button: "Check website status",
    sections: [
      {
        h: "Status checker vs uptime monitor",
        p: [
          "A status checker answers once. An uptime monitoring tool answers every minute and pages you when confirmation rules say it is real.",
        ],
      },
      {
        h: "What agencies use it for",
        p: [
          "Triage client “site down” messages in Slack, verify a deploy, or confirm a CDN edge before escalating to the host.",
        ],
      },
    ],
    faqs: [
      { q: "Is this website status checker free?", a: "Yes — no signup for spot checks." },
      { q: "Does it work worldwide?", a: "The check runs from our monitoring servers, so it reflects external reachability, not your office network." },
    ],
    feature: "uptime-monitoring",
    product: "website-uptime-monitor",
  },
];

export const toolBySlug = (s: string) => TOOLS.find((t) => t.slug === s);
