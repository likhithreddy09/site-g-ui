import type { Faq } from "./marketing";

export type ToolKind = "website-status" | "ssl" | "seo" | "headers";

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
    name: "Free website down checker",
    short: "Free — is it down for everyone or just you? Live status, response time and redirects. No signup.",
    title: "Free Website Down Checker — Is My Site Down? | Watchfront",
    description:
      "Free website down checker. See if a site is down for everyone or just you — HTTP status, response time and redirects. Instant, no signup.",
    keywords: [
      "free website down checker",
      "is my website down",
      "website down checker free",
      "check if website is down free",
      "is the website down for everyone",
      "website down for everyone or just me",
      "is it down right now",
    ],
    h1: "Free website down checker — is it down for everyone?",
    intro:
      "Free, no signup. Enter any URL. We request it from our servers (not your Wi-Fi) and show HTTP status, response time and redirects. If it loads here but not for you, the problem is probably local.",
    placeholder: "example.com",
    button: "Check free",
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
    name: "Free SSL checker",
    short: "Free SSL certificate check — expiry date, days left, issuer, SANs and browser trust. No signup.",
    title: "Free SSL Checker — Expiry Date & Days Left | Watchfront",
    description:
      "Free SSL checker: certificate expiry date, days left, issuer, covered domains (SANs), TLS version and browser trust. Instant, no signup.",
    keywords: [
      "free ssl checker",
      "ssl checker free",
      "ssl certificate checker",
      "check ssl certificate expiry",
      "ssl expiry checker",
      "ssl expiration checker",
      "https certificate check",
    ],
    h1: "Free SSL checker — expiry date & days left",
    intro:
      "Free, no signup. Enter a domain to see its SSL/TLS certificate in seconds: issuer, expiry date and days left, the domains it covers, the TLS version negotiated, and whether a standard browser would trust it.",
    placeholder: "example.com",
    button: "Check SSL free",
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
    name: "Free SEO checker",
    short: "Free on-page SEO audit — score 0–100 on titles, meta, H1, canonical, robots and social tags. No signup.",
    title: "Free SEO Checker — On-Page Audit Tool | Watchfront",
    description:
      "Free SEO checker. Score any URL 0–100 on title, meta description, H1, canonical, robots, viewport, Open Graph, Twitter card and image alt text. No signup.",
    keywords: [
      "free seo checker",
      "seo checker free",
      "on page seo checker",
      "free website seo audit",
      "meta tag checker",
      "website seo audit free",
    ],
    h1: "Free SEO checker — on-page audit in seconds",
    intro:
      "Free, no signup. Paste a URL for an instant on-page SEO audit: a 0–100 score, a letter grade, and a plain-English fix list — titles, meta, canonicals, indexing and social tags.",
    placeholder: "example.com/page",
    button: "Run free SEO check",
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
    name: "Free HTTP status checker",
    short: "Free HTTP status code check — live code, response time and redirect chain. No signup.",
    title: "Free HTTP Status Code Checker | Watchfront",
    description:
      "Free HTTP status checker. Instantly see status code, response time and redirects for any URL — from our servers, not your Wi-Fi. No signup.",
    keywords: [
      "free http status checker",
      "http status code checker free",
      "check http status",
      "website status code",
      "http response checker",
    ],
    h1: "Free HTTP status code checker",
    intro:
      "Free, no signup. Paste a URL to see the live HTTP status, how long the response took, and every redirect hop — from our monitoring servers so local network issues do not confuse the result.",
    placeholder: "example.com/page",
    button: "Check status free",
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
    name: "Free redirect checker",
    short: "Free redirect chain tracer — every hop, final URL and status codes. No signup.",
    title: "Free Redirect Checker — Trace URL Redirects | Watchfront",
    description:
      "Free redirect checker. Trace HTTP redirects, final URL and status codes for any link — catch chains, loops and mixed HTTP/HTTPS hops. No signup.",
    keywords: [
      "free redirect checker",
      "url redirect checker free",
      "http redirect checker",
      "check redirects free",
      "redirect chain checker",
    ],
    h1: "Free URL redirect checker",
    intro:
      "Free, no signup. Enter any URL to see the full redirect chain: each status code, each Location hop, and the final URL our servers land on. Useful after migrations, HTTPS cutovers and campaign link changes.",
    placeholder: "https://example.com/old-page",
    button: "Trace free",
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
    name: "Free meta tag checker",
    short: "Free meta tag check — title, description, robots, canonical, Open Graph and Twitter cards. No signup.",
    title: "Free Meta Tag Checker — Title & Description | Watchfront",
    description:
      "Free meta tag checker for title, meta description, robots, canonical, Open Graph and Twitter cards. Instant on-page SEO readout. No signup.",
    keywords: [
      "free meta tag checker",
      "meta description checker free",
      "title tag checker",
      "open graph checker free",
      "canonical tag checker",
    ],
    h1: "Free meta tag checker",
    intro:
      "Free, no signup. Paste a URL to inspect the title tag, meta description, robots directives, canonical, viewport, Open Graph and Twitter card tags — scored with a plain-English fix list.",
    placeholder: "example.com/landing",
    button: "Check meta free",
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
    name: "Free is-it-down checker",
    short: "Free “is it down?” check — up or down, HTTP code and speed from outside your network. No signup.",
    title: "Free Is It Down Checker — Website Up or Down? | Watchfront",
    description:
      "Free is it down checker. See if any website is up or down right now with HTTP code, response time and redirects — no account.",
    keywords: [
      "free is it down",
      "is it down checker free",
      "is it down",
      "is the site down",
      "website is down",
      "website up or down free",
    ],
    h1: "Free is-it-down checker — is the site up?",
    intro:
      "Free, no signup. Paste a URL for a live outside-network check. Use this when someone says “the site is down” and you need a fast, independent answer.",
    placeholder: "example.com",
    button: "Check free",
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
    name: "Free SSL expiry checker",
    short: "Free SSL expiry check — certificate end date and days left before browser warnings. No signup.",
    title: "Free SSL Expiry Checker — Days Left on Certificate | Watchfront",
    description:
      "Free SSL expiry checker. See certificate expiration date, days left, issuer and trust for any domain — instant, no signup.",
    keywords: [
      "free ssl expiry checker",
      "ssl expiry checker free",
      "ssl certificate expiry checker",
      "check ssl expiration date free",
      "ssl expiry date checker",
      "certificate expiry checker",
    ],
    h1: "Free SSL expiry checker — days left",
    intro:
      "Free, no signup. Enter a domain to read the live certificate: expiry date, days remaining, issuer, covered hostnames and whether a browser would trust it.",
    placeholder: "example.com",
    button: "Check expiry free",
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
    name: "Free website status checker",
    short: "Free live website status — HTTP code, timing and redirects from outside your Wi-Fi. No signup.",
    title: "Free Website Status Checker — Is the Site Up? | Watchfront",
    description:
      "Free website status checker. Instant HTTP status, response time and redirects for any URL — from our servers, not your Wi-Fi. No signup.",
    keywords: [
      "free website status checker",
      "website status checker free",
      "website status check",
      "check website status online free",
      "site status checker",
      "website online checker",
    ],
    h1: "Free website status checker — is the site up?",
    intro:
      "Free, no signup. Paste any public URL to see live status code, speed and redirect hops. Built for the moment someone asks “is the site up?”",
    placeholder: "example.com",
    button: "Check status free",
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
  {
    slug: "down-for-everyone-or-just-me",
    kind: "website-status",
    name: "Free down for everyone or just me",
    short: "Free — down for everyone, or just you? External check with status and speed. No signup.",
    title: "Free Down for Everyone or Just Me Checker | Watchfront",
    description:
      "Free down for everyone or just me checker. See if a website is down for everyone or only for you — live HTTP status and response time, no signup.",
    keywords: [
      "down for everyone or just me",
      "free down for everyone or just me",
      "is it down for everyone or just me",
      "website down for everyone or just me free",
      "down for me or everyone",
    ],
    h1: "Free: down for everyone, or just me?",
    intro:
      "Free, no signup. We check the URL from our servers. If it fails here too, it is down for everyone. If it works here but not on your phone or laptop, the problem is local (Wi-Fi, DNS, cache, VPN).",
    placeholder: "example.com",
    button: "Check free",
    sections: [
      {
        h: "How to read the free result",
        p: [
          "Up here, down for you → fix your network, DNS or browser first. Down here too → check hosting, SSL, DNS at the registrar, or the last deploy. One free check is a snapshot, not a worldwide outage map.",
        ],
      },
      {
        h: "What people usually search next",
        p: [
          "After “down for everyone or just me,” people often search for a free SSL expiry checker, free HTTP status checker, or a free website response time check — all available in this tools hub.",
        ],
      },
      {
        h: "When free is not enough",
        p: [
          "Clients message you after the outage. A free spot check helps triage; continuous uptime monitoring alerts you first.",
        ],
      },
    ],
    faqs: [
      { q: "Is this down-for-everyone checker free?", a: "Yes. No signup for fair-use spot checks." },
      { q: "Can one server prove a global outage?", a: "No — it proves the site is reachable or not from our network. That is usually enough to separate “just me” from “the origin is broken.”" },
      { q: "What if I need alerts next time?", a: "Add the URL to Watchfront uptime monitoring — free for 3 days." },
    ],
    feature: "uptime-monitoring",
    product: "uptime-monitoring-tool",
  },
  {
    slug: "check-if-website-is-up",
    kind: "website-status",
    name: "Free check if website is up",
    short: "Free check if a website is up — live reachability, HTTP code and speed. No signup.",
    title: "Free Check If Website Is Up | Watchfront",
    description:
      "Free check if website is up. Instant live status, HTTP code and response time from our servers — no signup required.",
    keywords: [
      "check if website is up free",
      "free check if website is up",
      "is website up",
      "check if site is up",
      "website up checker free",
      "is my website up",
    ],
    h1: "Free check if a website is up",
    intro:
      "Free, no signup. Paste a domain or URL. We hit it from outside your network and tell you if it is up, what status code came back, and how fast it answered.",
    placeholder: "example.com",
    button: "Check if it’s up",
    sections: [
      {
        h: "“Is my website up?” in one request",
        p: [
          "Browsers hide a lot of detail. A free external check shows the raw HTTP outcome — 200, redirect, 5xx, timeout or DNS failure — so you know whether the origin is answering.",
        ],
      },
      {
        h: "Up now, down at 2am",
        p: [
          "A free check answers this second. Overnight outages still need an uptime monitoring tool with retries and alerts.",
        ],
      },
    ],
    faqs: [
      { q: "Is check-if-website-is-up free?", a: "Yes. Fair-use limits keep it fast for everyone." },
      { q: "Does “up” mean the whole site works?", a: "It means the URL answered. Forms, checkout and login can still be broken — use journey monitoring for that." },
    ],
    feature: "uptime-monitoring",
    product: "website-uptime-monitor",
  },
  {
    slug: "website-response-time-checker",
    kind: "website-status",
    name: "Free website response time checker",
    short: "Free website response time / TTFB-style check from our servers. No signup.",
    title: "Free Website Response Time Checker | Watchfront",
    description:
      "Free website response time checker. Measure how fast a URL answers from our servers (status + ms) — instant, no signup.",
    keywords: [
      "free website response time checker",
      "website response time checker free",
      "check website response time",
      "website speed checker free",
      "ttfb checker free",
      "check website load time",
    ],
    h1: "Free website response time checker",
    intro:
      "Free, no signup. Enter a URL to see how many milliseconds our servers wait for a response, plus the HTTP status and redirects. Useful when a site “feels slow” and you want an outside number.",
    placeholder: "example.com",
    button: "Check response time",
    sections: [
      {
        h: "What this free speed check measures",
        p: [
          "It is a server response time for one request — not a full Lighthouse / Core Web Vitals lab run. Slow TTFB-style times still flag hosting, origin, or cold-start problems visitors feel.",
        ],
      },
      {
        h: "Good vs slow",
        p: [
          "Under ~500 ms is usually fine for marketing sites. Sustained multi-second responses hurt conversions and SEO. Pair this free check with continuous uptime monitoring to catch regressions after deploys.",
        ],
      },
    ],
    faqs: [
      { q: "Is the response time checker free?", a: "Yes. No account for spot checks." },
      { q: "Is this the same as PageSpeed Insights?", a: "No. This measures server answer time from our network. For LCP/CLS use a lab tool; for “is it up and how fast?” use this." },
    ],
    feature: "uptime-monitoring",
    product: "uptime-monitoring-tool",
  },
  {
    slug: "http-headers-checker",
    kind: "headers",
    name: "Free HTTP headers checker",
    short: "Free HTTP header check — every response header plus a security-headers grade. No signup.",
    title: "Free HTTP Headers Checker | Watchfront",
    description:
      "Free HTTP headers checker. See every response header, status code and security-header grade for any URL — instant, no signup.",
    keywords: [
      "free http headers checker",
      "http header checker free",
      "check http headers",
      "response headers checker",
      "website headers checker free",
    ],
    h1: "Free HTTP headers checker",
    intro:
      "Free, no signup. Paste a URL to read the live response headers from our servers, plus a plain-English security-headers grade (HSTS, CSP, XFO and more).",
    placeholder: "example.com",
    button: "Check headers free",
    sections: [
      {
        h: "Why people search “HTTP headers checker”",
        p: [
          "Headers explain caching, redirects, cookies, server type and security posture. When a CDN or host “looks fine” but browsers behave oddly, the response headers are usually the smoking gun.",
        ],
      },
      {
        h: "Security headers vs all headers",
        p: [
          "We show the full header set and score the common browser security headers. Missing HSTS or CSP is not an outage — but it is how agencies lose trust on a client security review.",
        ],
      },
    ],
    faqs: [
      { q: "Is the HTTP headers checker free?", a: "Yes. Fair-use limits apply. No signup." },
      { q: "Do you follow redirects?", a: "Yes — you see the final URL and the headers on the final response." },
    ],
    feature: "uptime-monitoring",
    product: "website-monitoring-tool",
  },
  {
    slug: "security-headers-checker",
    kind: "headers",
    name: "Free security headers checker",
    short: "Free security headers grade — HSTS, CSP, XFO, Referrer-Policy and more. No signup.",
    title: "Free Security Headers Checker — Grade A to F | Watchfront",
    description:
      "Free security headers checker. Grade HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy and more for any site — no signup.",
    keywords: [
      "free security headers checker",
      "security headers checker free",
      "http security headers check",
      "hsts checker free",
      "csp checker free",
    ],
    h1: "Free security headers checker",
    intro:
      "Free, no signup. We fetch the URL and grade the security-related response headers browsers look for — then list every header so you can verify the fix.",
    placeholder: "example.com",
    button: "Grade security headers",
    sections: [
      {
        h: "What we grade",
        p: [
          "Strict-Transport-Security, Content-Security-Policy, X-Content-Type-Options, X-Frame-Options (or CSP frame-ancestors), Referrer-Policy, Permissions-Policy and Cross-Origin-Opener-Policy when present.",
        ],
      },
      {
        h: "Not a penetration test",
        p: [
          "A free security headers checker is a quick hygiene score, not a full vuln scan. Pair it with continuous monitoring so certificate and uptime failures still page you first.",
        ],
      },
    ],
    faqs: [
      { q: "Is this security headers checker free?", a: "Yes — no account for spot checks." },
      { q: "What is a good grade?", a: "B or better usually means the common browser security headers are present. F means almost none are set." },
    ],
    feature: "uptime-monitoring",
    product: "website-monitoring-software",
  },
  {
    slug: "open-graph-checker",
    kind: "seo",
    name: "Free Open Graph checker",
    short: "Free Open Graph / social preview check — og:title, description and image. No signup.",
    title: "Free Open Graph Checker — Social Preview Tags | Watchfront",
    description:
      "Free Open Graph checker. See og:title, og:description, og:image and related on-page SEO tags for any URL — instant, no signup.",
    keywords: [
      "free open graph checker",
      "open graph checker free",
      "og tag checker",
      "facebook open graph checker",
      "social preview checker free",
    ],
    h1: "Free Open Graph checker",
    intro:
      "Free, no signup. Paste a URL to audit Open Graph and related meta tags so WhatsApp, LinkedIn and X previews do not look broken after a redesign.",
    placeholder: "example.com/landing",
    button: "Check Open Graph",
    sections: [
      {
        h: "Why OG tags break after publishes",
        p: [
          "Page builders and CMS themes drop og:image or leave staging titles. A free Open Graph checker before ads resume is cheaper than explaining a blank share card to a client.",
        ],
      },
      {
        h: "One page here, many pages on a schedule",
        p: [
          "This tool audits one URL. Watchfront SEO audit re-checks sitemap pages so a missing og:image after a deploy opens an incident.",
        ],
      },
    ],
    faqs: [
      { q: "Is the Open Graph checker free?", a: "Yes." },
      { q: "Does it refresh Facebook’s cache?", a: "No — it reads what your page currently serves. Use Meta’s debugger separately to purge a cached preview." },
    ],
    feature: "seo-audit",
    product: "website-monitoring",
  },
  {
    slug: "noindex-checker",
    kind: "seo",
    name: "Free noindex checker",
    short: "Free noindex / robots meta check — catch accidental staging noindex on live pages. No signup.",
    title: "Free Noindex Checker — Robots Meta Tag | Watchfront",
    description:
      "Free noindex checker. See if a page has robots noindex (or related meta issues) before it disappears from Google — no signup.",
    keywords: [
      "free noindex checker",
      "noindex checker free",
      "check if page is noindex",
      "robots meta checker",
      "meta robots checker free",
    ],
    h1: "Free noindex checker",
    intro:
      "Free, no signup. Paste a URL to see whether meta robots (or related on-page rules) tell search engines to skip the page — the classic “staging noindex left on production” failure.",
    placeholder: "example.com/page",
    button: "Check noindex",
    sections: [
      {
        h: "Why agencies search this weekly",
        p: [
          "A leftover noindex after go-live can wipe organic traffic for days. Spot-check money URLs after every migration, then schedule SEO audits so it cannot sneak back.",
        ],
      },
    ],
    faqs: [
      { q: "Is the noindex checker free?", a: "Yes." },
      { q: "Does it read robots.txt?", a: "This free check focuses on on-page meta/SEO signals from the HTML response. Pair with a crawl for full robots.txt coverage." },
    ],
    feature: "seo-audit",
    product: "website-monitoring-software",
  },
  {
    slug: "canonical-tag-checker",
    kind: "seo",
    name: "Free canonical tag checker",
    short: "Free canonical URL check — see the preferred URL search engines should treat as primary. No signup.",
    title: "Free Canonical Tag Checker | Watchfront",
    description:
      "Free canonical tag checker. Inspect the canonical URL and related on-page SEO signals for any page — instant, no signup.",
    keywords: [
      "free canonical tag checker",
      "canonical checker free",
      "check canonical url",
      "rel canonical checker",
      "canonical link checker",
    ],
    h1: "Free canonical tag checker",
    intro:
      "Free, no signup. Paste a URL to see whether a canonical is set, where it points, and the surrounding on-page SEO hygiene that usually travels with it.",
    placeholder: "example.com/product",
    button: "Check canonical",
    sections: [
      {
        h: "When canonicals go wrong",
        p: [
          "Self-canonicals are normal. Cross-domain or accidental “point everything at the homepage” canonicals quietly tank rankings. Catch them before the monthly report.",
        ],
      },
    ],
    faqs: [
      { q: "Is this canonical checker free?", a: "Yes." },
      { q: "What if there is no canonical?", a: "The audit flags it. Many sites rely on the requested URL; adding an explicit self-canonical is still best practice on money pages." },
    ],
    feature: "seo-audit",
    product: "website-monitoring",
  },
  {
    slug: "https-redirect-checker",
    kind: "website-status",
    name: "Free HTTPS redirect checker",
    short: "Free HTTPS redirect check — see if HTTP forces to HTTPS and how the chain looks. No signup.",
    title: "Free HTTPS Redirect Checker | Watchfront",
    description:
      "Free HTTPS redirect checker. Trace whether a site forces HTTPS and inspect every redirect hop — instant, no signup.",
    keywords: [
      "free https redirect checker",
      "https redirect checker free",
      "http to https redirect check",
      "force https checker",
      "ssl redirect checker",
    ],
    h1: "Free HTTPS redirect checker",
    intro:
      "Free, no signup. Enter a URL (try http://…) to see the redirect chain and whether visitors land on a secure final URL.",
    placeholder: "http://example.com",
    button: "Trace HTTPS redirect",
    sections: [
      {
        h: "HTTP without a redirect is still common",
        p: [
          "Hosts forget to force HTTPS after a cert install. Mixed chains and www/apex loops show up here in seconds.",
        ],
      },
      {
        h: "Certificate vs redirect",
        p: [
          "A redirect can look fine while the certificate is days from expiry. Pair this with the free SSL expiry checker.",
        ],
      },
    ],
    faqs: [
      { q: "Is the HTTPS redirect checker free?", a: "Yes." },
      { q: "Should I enter http or https?", a: "Try http:// first if you want to prove the force-HTTPS rule exists." },
    ],
    feature: "ssl-domain-monitoring",
    product: "ssl-certificate-monitoring",
  },
  {
    slug: "www-redirect-checker",
    kind: "website-status",
    name: "Free www redirect checker",
    short: "Free www vs non-www redirect check — see which host wins and every hop. No signup.",
    title: "Free WWW Redirect Checker — Apex vs WWW | Watchfront",
    description:
      "Free www redirect checker. Trace apex vs www redirects and status codes for any domain — instant, no signup.",
    keywords: [
      "free www redirect checker",
      "www redirect checker free",
      "www vs non www checker",
      "apex redirect checker",
      "check www redirect",
    ],
    h1: "Free www redirect checker",
    intro:
      "Free, no signup. Enter example.com or www.example.com to see which host is canonical and how the redirect chain behaves after DNS or CDN changes.",
    placeholder: "www.example.com",
    button: "Check www redirect",
    sections: [
      {
        h: "Why www vs apex breaks SEO",
        p: [
          "Split signals, duplicate content and cookie domain mismatches all start with a messy www policy. Prove the chain before you tell a client the migration is done.",
        ],
      },
    ],
    faqs: [
      { q: "Is this free?", a: "Yes — fair-use spot checks, no signup." },
    ],
    feature: "uptime-monitoring",
    product: "website-monitoring",
  },
  {
    slug: "website-ping-test",
    kind: "website-status",
    name: "Free website ping test",
    short: "Free website ping-style reachability test — up/down, status and ms from our servers. No signup.",
    title: "Free Website Ping Test Online | Watchfront",
    description:
      "Free website ping test online. Check if a site answers from our servers with HTTP status and response time — no signup.",
    keywords: [
      "free website ping test",
      "website ping test free",
      "ping website online free",
      "ping a website",
      "online ping website tool",
    ],
    h1: "Free website ping test",
    intro:
      "Free, no signup. “Ping website” searches usually want a quick outside reachability check — we request the URL and return status plus response time (HTTP ping, not ICMP).",
    placeholder: "example.com",
    button: "Ping website free",
    sections: [
      {
        h: "HTTP ping vs ICMP ping",
        p: [
          "Classic ping uses ICMP and is often blocked. This free tool does what people actually need for websites: can an external HTTP client reach the URL, and how fast?",
        ],
      },
    ],
    faqs: [
      { q: "Is the website ping test free?", a: "Yes." },
      { q: "Is this ICMP?", a: "No — it is an HTTP reachability check, which matches “is the website up?” better than ICMP for public sites." },
    ],
    feature: "uptime-monitoring",
    product: "uptime-monitoring-tool",
  },
  {
    slug: "website-online-checker",
    kind: "website-status",
    name: "Free website online checker",
    short: "Free website online checker — is the site online right now? Status + speed. No signup.",
    title: "Free Website Online Checker | Watchfront",
    description:
      "Free website online checker. See if any website is online right now with HTTP status and response time — no signup.",
    keywords: [
      "free website online checker",
      "website online checker free",
      "is website online",
      "check if website is online",
      "site online checker",
    ],
    h1: "Free website online checker",
    intro:
      "Free, no signup. Paste a URL when you need a straight answer: is this website online from outside your network?",
    placeholder: "example.com",
    button: "Check if online",
    sections: [
      {
        h: "Online ≠ healthy",
        p: [
          "Online means the URL answered. Forms, SSL and checkout can still be broken — use the other free checkers, then continuous monitoring for overnight failures.",
        ],
      },
    ],
    faqs: [
      { q: "Is this website online checker free?", a: "Yes." },
    ],
    feature: "uptime-monitoring",
    product: "website-uptime-monitor",
  },
  {
    slug: "ssl-certificate-validator",
    kind: "ssl",
    name: "Free SSL certificate validator",
    short: "Free SSL certificate validation — trust, expiry, issuer and hostnames covered. No signup.",
    title: "Free SSL Certificate Validator | Watchfront",
    description:
      "Free SSL certificate validator. Check trust, expiry date, days left, issuer and SANs for any domain — instant, no signup.",
    keywords: [
      "free ssl certificate validator",
      "ssl certificate validator free",
      "validate ssl certificate online",
      "ssl cert checker free",
      "check ssl certificate valid",
    ],
    h1: "Free SSL certificate validator",
    intro:
      "Free, no signup. Enter a domain to validate the live TLS certificate the same way a browser would — trust, dates, issuer and covered names.",
    placeholder: "example.com",
    button: "Validate SSL free",
    sections: [
      {
        h: "Validation failures that look like “the site is down”",
        p: [
          "Hostname mismatch, expired certs and broken chains all produce scary browser screens. Validate the cert before you restart the whole host.",
        ],
      },
    ],
    faqs: [
      { q: "Is the SSL certificate validator free?", a: "Yes." },
      { q: "Can I get alerts before expiry?", a: "Yes — Watchfront SSL monitoring warns at 30/14/7 days across client sites." },
    ],
    feature: "ssl-domain-monitoring",
    product: "ssl-certificate-monitoring",
  },
  {
    slug: "check-ssl-certificate",
    kind: "ssl",
    name: "Free check SSL certificate",
    short: "Free check SSL certificate online — expiry, issuer, trust. No signup.",
    title: "Free Check SSL Certificate Online | Watchfront",
    description:
      "Free check SSL certificate online. See expiry, days left, issuer and browser trust for any HTTPS site — no signup.",
    keywords: [
      "check ssl certificate free",
      "free check ssl certificate",
      "check ssl certificate online",
      "ssl certificate check free",
      "how to check ssl certificate",
    ],
    h1: "Free check SSL certificate online",
    intro:
      "Free, no signup. People search “check SSL certificate” when Chrome screams or a client asks “are we secure?” — paste the domain and read the live cert.",
    placeholder: "example.com",
    button: "Check certificate",
    sections: [
      {
        h: "What you’ll see",
        p: [
          "Expiry timestamp, days remaining, issuer, subject alternative names, TLS version and whether validation passed.",
        ],
      },
    ],
    faqs: [
      { q: "Is check SSL certificate free?", a: "Yes." },
    ],
    feature: "ssl-domain-monitoring",
    product: "ssl-certificate-monitoring",
  },
];

export const toolBySlug = (s: string) => TOOLS.find((t) => t.slug === s);
