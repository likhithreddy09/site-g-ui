import type { Faq } from "./marketing";

export type GuideSection = { h: string; p?: string[]; list?: string[] };

export type Guide = {
  slug: string;
  /** Short label for footer / nav links. */
  nav: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  keywords: string[];
  readMins: number;
  published: string;
  updated: string;
  sections: GuideSection[];
  faqs: Faq[];
  tool?: string;
  feature?: string;
};

export const GUIDES: Guide[] = [
  {
    slug: "what-is-uptime-monitoring",
    nav: "What is uptime monitoring?",
    title: "What Is Uptime Monitoring? Plain-English Guide | Watchfront",
    description: "What uptime monitoring is, how it works, what 99.9% uptime really means, and how to set it up without drowning in false alarms.",
    h1: "What is uptime monitoring? A plain-English guide",
    intro: "Uptime monitoring is an automated service that visits your website on a schedule and alerts you when it stops responding properly. Here's how it works, what the numbers mean, and how to set it up so it only wakes you for real problems.",
    keywords: ["what is uptime monitoring", "uptime monitoring", "website uptime", "99.9 uptime meaning"],
    readMins: 6,
    published: "2026-11-15",
    updated: "2026-11-15",
    sections: [
      {
        h: "How uptime monitoring works",
        p: [
          "A monitor sends an HTTP request to your URL every one to five minutes from servers outside your network. It records the status code, how long the response took, and whether the page contains what it should. If the request fails, a good monitor retries before deciding the site is really down - then sends an alert by email, Slack or another channel.",
          "When the site recovers, the incident closes automatically and the downtime is logged, so you can report uptime over a day, week or month.",
        ],
      },
      {
        h: "What 99.9% uptime actually means",
        list: [
          "99% uptime ≈ 7 hours 18 minutes of downtime per month",
          "99.9% uptime ≈ 43 minutes per month",
          "99.95% uptime ≈ 22 minutes per month",
          "99.99% uptime ≈ 4 minutes per month",
        ],
        p: ["Hosting providers often promise 99.9%. Monitoring is how you find out whether you're actually getting it - and when the missing minutes happen."],
      },
      {
        h: "Up isn't the same as working",
        p: [
          "A basic monitor asks one question: did the homepage answer? But a site can return 200 OK while the contact form throws an error, the checkout button does nothing, or a deploy left a blank page. Keyword checks, content checks and real-browser journey tests close that gap by verifying what users actually do.",
        ],
      },
      {
        h: "How to avoid false alarms",
        list: [
          "Retry each failure before alerting - most blips resolve in seconds",
          "Require two or more consecutive failures before opening an incident",
          "Set sensible timeouts (10 seconds is typical)",
          "Use quiet hours for non-critical alerts so your team can sleep",
          "Route critical alerts to the people who can fix them",
        ],
      },
      {
        h: "What to monitor beyond uptime",
        list: [
          "SSL certificate expiry - an expired certificate blocks visitors completely",
          "Domain expiry - a lapsed domain can take the whole site and email offline",
          "Forms and key journeys - the pages that make money",
          "JavaScript errors from real visitors",
          "On-page SEO basics like titles, meta and accidental noindex",
        ],
      },
    ],
    faqs: [
      { q: "How often should uptime be checked?", a: "Every 1-5 minutes is standard. One-minute checks catch short outages; five minutes is fine for low-traffic sites." },
      { q: "Is uptime monitoring free?", a: "Many tools offer a free tier or trial. Watchfront includes a 3-day free trial with every feature." },
      { q: "Do I need to install anything?", a: "No. Uptime monitoring works from outside your site - you just add the URL." },
    ],
    tool: "website-down-checker",
    feature: "uptime-monitoring",
  },
  {
    slug: "website-down-what-to-do",
    nav: "Website down checklist",
    title: "Website Down? Step-by-Step Fix Checklist | Watchfront",
    description: "Your website is down. Follow this step-by-step checklist to confirm the outage, find the cause (DNS, SSL, hosting, deploy) and get back online fast.",
    h1: "Website down? A step-by-step checklist to fix it fast",
    intro: "When a site goes down, the first ten minutes decide how bad it gets. Work through this checklist in order - it's the same sequence experienced agency developers use to go from \"it's broken\" to \"it's fixed\".",
    keywords: ["website down what to do", "website not working", "site down fix", "why is my website down"],
    readMins: 7,
    published: "2026-11-15",
    updated: "2026-11-15",
    sections: [
      {
        h: "1. Confirm it's really down",
        p: ["Check from outside your network with a website down checker. If it loads there, the problem is local: clear your cache, try mobile data, flush DNS or disable your VPN. If it fails from outside too, note the exact error - it tells you where to look next."],
      },
      {
        h: "2. Read the error",
        list: [
          "DNS resolution failed → domain expired, nameservers changed, or DNS provider outage",
          "Connection refused or timeout → server down, firewall, or hosting outage",
          "SSL / certificate error → certificate expired or misconfigured",
          "HTTP 500-504 → application crash, database down, or upstream/CDN problem",
          "HTTP 403/404 on the homepage → permissions, a bad redirect, or a failed deploy",
        ],
      },
      {
        h: "3. Check what changed",
        p: ["Most outages follow a change: a deploy, plugin or theme update, DNS edit, hosting migration, or an expired card at the host or registrar. Roll back the most recent change first - it's usually the fastest fix."],
      },
      {
        h: "4. Check your providers",
        p: ["Look at the status pages for your host, CDN, DNS provider and registrar. If they're having an incident, there's little to do but communicate and wait - which is why step 5 matters."],
      },
      {
        h: "5. Tell the client before they tell you",
        p: ["A short, factual message - what's affected, what you're doing, when you'll update next - builds far more trust than silence. Agencies with monitoring in place usually send this message before the client notices."],
      },
      {
        h: "6. Prevent the next one",
        list: [
          "Set up uptime monitoring with retries so you're alerted within minutes",
          "Monitor SSL and domain expiry with warnings weeks in advance",
          "Test the contact form and key journeys automatically after every deploy",
          "Keep a simple incident log so patterns become obvious",
        ],
      },
    ],
    faqs: [
      { q: "Why is my website down but not for others?", a: "It's usually local - DNS cache, browser cache, a VPN, firewall or ISP routing. Check from an external website down checker to confirm." },
      { q: "How do I know when my website goes down?", a: "Use uptime monitoring. It checks the site every minute and alerts you with the error and timeline." },
    ],
    tool: "website-down-checker",
    feature: "uptime-monitoring",
  },
  {
    slug: "ssl-certificate-expiry",
    nav: "Stop SSL expiry",
    title: "How to Stop SSL Certificates Expiring | Watchfront",
    description: "Why SSL certificates expire, why auto-renewal fails, how to check expiry dates, and a simple system to never let a client's certificate lapse again.",
    h1: "How to stop SSL certificates expiring on client sites",
    intro: "An expired SSL certificate turns a working website into a full-page browser warning. It's one of the most common - and most avoidable - outages agencies deal with. Here's why it happens and how to make sure it doesn't.",
    keywords: ["ssl certificate expiry", "ssl certificate expired", "check ssl expiry date", "lets encrypt renewal failed"],
    readMins: 6,
    published: "2026-11-15",
    updated: "2026-11-15",
    sections: [
      {
        h: "Why certificates expire at all",
        p: ["Certificates are deliberately short-lived so compromised keys can't be abused for long. Free Let's Encrypt certificates last 90 days, paid certificates usually a year at most, and the industry is moving towards even shorter lifetimes. That means more renewals - and more chances for one to fail."],
      },
      {
        h: "Why auto-renewal fails",
        list: [
          "DNS moved to a new provider and the validation record no longer resolves",
          "The site moved servers and the renewal job didn't come with it",
          "A firewall or CDN blocks the validation request",
          "The renewal email went to someone who left the company",
          "Billing failed at the host or certificate provider",
          "www and non-www are covered by different certificates and only one renews",
        ],
      },
      {
        h: "How to check when a certificate expires",
        p: ["Use an SSL checker: enter the domain and you'll see the expiry date, days remaining, issuer and every hostname the certificate covers. In a browser, click the padlock and view the certificate. For many sites, checking by hand doesn't scale - that's what monitoring is for."],
      },
      {
        h: "A simple system that works",
        list: [
          "Add every client domain (and its www variant) to SSL monitoring",
          "Get warnings at 30, 14 and 7 days before expiry",
          "Check the full chain, not just the leaf certificate",
          "Monitor domain registration expiry at the same time",
          "Assign an owner for each client's renewals",
        ],
      },
    ],
    faqs: [
      { q: "What happens when an SSL certificate expires?", a: "Browsers show a security warning and most visitors leave. Forms, logins and API calls to the site can fail outright." },
      { q: "How early should I renew?", a: "Automated renewals typically run 30 days before expiry. Alert yourself at 30, 14 and 7 days so a failed renewal is caught with time to spare." },
    ],
    tool: "ssl-checker",
    feature: "ssl-domain-monitoring",
  },
  {
    slug: "contact-form-not-working",
    nav: "Contact form not working",
    title: "Contact Form Not Working? How to Detect It | Watchfront",
    description: "Broken contact forms silently lose leads. Learn the common causes, how to test forms safely on live sites, and how to get alerted when a form breaks.",
    h1: "Contact form not working? Catch it before your client does",
    intro: "A broken contact form is the worst kind of outage: the site looks fine, uptime is 100%, and leads quietly disappear for weeks. Here's why forms break and how to know the moment one does.",
    keywords: ["contact form not working", "contact form not sending emails", "test contact form", "form monitoring"],
    readMins: 6,
    published: "2026-11-15",
    updated: "2026-11-15",
    sections: [
      {
        h: "Why contact forms break",
        list: [
          "Email delivery fails - SMTP credentials changed, or messages land in spam",
          "A plugin, theme or framework update changes the form markup or handler",
          "reCAPTCHA or anti-spam keys expire or the domain isn't whitelisted",
          "A JavaScript error elsewhere on the page stops the submit handler",
          "The form endpoint or CRM integration starts returning errors",
          "A redesign removes the success message or redirect",
        ],
      },
      {
        h: "Why uptime monitoring misses it",
        p: ["A normal uptime check loads the page and sees HTTP 200. It never fills in the form, never clicks submit, and never checks for \"Thank you\". The page is up; the business outcome is broken."],
      },
      {
        h: "How to test forms safely on a live site",
        list: [
          "Use a dedicated test email address on every run so test leads are easy to filter",
          "Send a recognisable header or field so the client's CRM can ignore test entries",
          "Never run journeys that trigger payments",
          "Assert the success message or redirect - not just that the button was clicked",
          "Capture a screenshot and console log on failure so the fix is quick",
        ],
      },
      {
        h: "Automate it",
        p: ["Real-browser journey tests can fill the form, submit it, and confirm the success message on a schedule - hourly or daily - and open an incident with evidence the moment it fails. That turns a weeks-long silent failure into a same-day fix."],
      },
    ],
    faqs: [
      { q: "Why is my contact form not sending emails?", a: "Most often it's email delivery: changed SMTP credentials, missing SPF/DKIM records, or messages going to spam. Check the form plugin's logs and your mail provider." },
      { q: "Can I monitor a contact form automatically?", a: "Yes. Journey tests submit the form in a real browser on a schedule and alert you if the success message doesn't appear." },
    ],
    tool: "website-down-checker",
    feature: "form-journey-testing",
  },
  {
    slug: "website-maintenance-checklist",
    nav: "Maintenance checklist",
    title: "Website Maintenance Checklist for Agencies | Watchfront",
    description: "A practical monthly website maintenance checklist for agencies and freelancers: uptime, SSL, domains, forms, SEO, errors, backups and client reporting.",
    h1: "The monthly website maintenance checklist for agencies",
    intro: "Maintenance retainers are only valuable if the work is consistent and visible. Use this checklist every month for each client site - and automate as much of it as you can.",
    keywords: ["website maintenance checklist", "wordpress maintenance checklist", "agency website maintenance", "monthly website maintenance"],
    readMins: 7,
    published: "2026-11-15",
    updated: "2026-11-15",
    sections: [
      {
        h: "Availability",
        list: [
          "Review uptime for the month and any incidents",
          "Check response-time trends for slowdowns",
          "Confirm SSL certificates have 30+ days left",
          "Confirm domain registration has 60+ days left",
        ],
      },
      {
        h: "Functionality",
        list: [
          "Submit every contact and booking form and confirm delivery",
          "Click through key journeys - signup, checkout, enquiry",
          "Check for new JavaScript errors from real visitors",
          "Scan for broken links on important pages",
        ],
      },
      {
        h: "Updates and security",
        list: [
          "Update CMS core, plugins and themes on staging first",
          "Re-test forms and journeys after updates",
          "Remove unused plugins and admin accounts",
          "Verify backups exist and a restore actually works",
        ],
      },
      {
        h: "SEO hygiene",
        list: [
          "Check titles and meta descriptions on key pages",
          "Make sure no important page is accidentally noindexed",
          "Confirm the sitemap is reachable and listed in robots.txt",
          "Check Open Graph tags so shared links look right",
        ],
      },
      {
        h: "Reporting",
        p: ["Send each client a short report: uptime, incidents and how they were resolved, updates applied, and anything that needs a decision. A consistent monthly report is what makes a retainer feel worth renewing."],
      },
    ],
    faqs: [
      { q: "How often should website maintenance be done?", a: "Monitoring should run continuously; updates, form tests and reporting monthly at a minimum - weekly for high-traffic or e-commerce sites." },
      { q: "Can website maintenance be automated?", a: "Much of it can: uptime, SSL, domain, form journeys, SEO checks and error tracking can all run automatically, leaving updates and client communication to you." },
    ],
    tool: "seo-checker",
    feature: "client-reports",
  },
  {
    slug: "monitor-multiple-client-websites",
    nav: "Multi-client monitoring",
    title: "How to Monitor Multiple Client Websites | Watchfront",
    description: "A practical system for agencies: group sites by client, pick the right checks, cut false alarms and send monthly reports clients understand.",
    h1: "How to monitor multiple client websites without drowning in alerts",
    intro: "Once you look after more than a handful of sites, ad-hoc checks stop working. You need a repeatable system: group by client, choose the checks that matter, and turn results into reports - not a flood of emails.",
    keywords: ["monitor multiple websites", "agency website monitoring", "multi client website monitoring", "website portfolio monitoring"],
    readMins: 6,
    published: "2026-11-15",
    updated: "2026-11-15",
    sections: [
      {
        h: "Group every site by client",
        p: [
          "Flat lists of 40 URLs hide ownership. Create a client (or workspace group) per account, then attach their domains. When something breaks, you immediately know who to tell and which report to update.",
          "Invite the client as read-only if they want visibility, or keep reports shareable via a link so they never need a login.",
        ],
      },
      {
        h: "Pick checks that match real failures",
        list: [
          "Uptime every minute on the homepage and key landing pages",
          "SSL and domain expiry on every hostname you manage",
          "Journey tests on contact forms, booking and login flows",
          "Scheduled SEO audits on money pages",
          "Optional JS error tracking on high-traffic marketing sites",
        ],
      },
      {
        h: "Cut noise before it trains people to ignore alerts",
        p: [
          "Confirm consecutive failures before paging someone, use quiet hours for non-critical checks, and escalate only when an incident stays open. Alerts should include evidence - status code, screenshot, console log - so the first person who sees it can act.",
        ],
      },
      {
        h: "Close the loop with a monthly report",
        p: [
          "Clients renew retainers when they see work. A short monthly report - uptime, incidents fixed, certificates renewed, forms tested - turns invisible monitoring into visible value. Automate the data collection; write the narrative yourself.",
        ],
      },
    ],
    faqs: [
      { q: "How many websites can an agency monitor?", a: "As many as your plan and workflow allow. The hard part is organisation: group by client and standardise which checks every site gets." },
      { q: "What should I monitor on every client site?", a: "At minimum: uptime, SSL expiry, domain expiry and the primary contact form. Add SEO and JS errors for sites that drive leads or revenue." },
    ],
    tool: "website-down-checker",
    feature: "client-reports",
  },
  {
    slug: "reduce-false-uptime-alerts",
    nav: "False uptime alerts",
    title: "How to Reduce False Uptime Alerts | Watchfront",
    description: "Why uptime monitors cry wolf, how to tell a real outage from a blip, and the settings that keep agency teams from ignoring alerts.",
    h1: "How to reduce false uptime alerts (without missing real outages)",
    intro: "False alarms are worse than silence - teams mute them and then miss the real outage. Most “false” uptime alerts are configuration problems: one location, one fail, or checking a page that rate-limits bots.",
    keywords: ["false uptime alerts", "reduce monitoring false positives", "uptime alert fatigue", "website monitoring false alarms"],
    readMins: 5,
    published: "2026-11-15",
    updated: "2026-11-15",
    sections: [
      {
        h: "Why monitors false-alarm",
        list: [
          "A single failed probe from one network path",
          "CDN or WAF briefly challenging automated traffic",
          "Maintenance windows you forgot to mute",
          "Checking a URL that redirects, requires cookies, or returns 403 to datacenter IPs",
        ],
      },
      {
        h: "Confirm before you wake someone",
        p: [
          "Require consecutive failures, or agreement across locations, before opening an incident. A one-second blip should not page a developer at 2am. Real outages almost always fail more than once.",
        ],
      },
      {
        h: "Check what users actually hit",
        p: [
          "Monitor the public homepage and key landing pages over HTTPS, follow redirects, and accept the status codes your site intentionally returns. If a page needs a login, use a dedicated journey test instead of a bare HTTP check.",
        ],
      },
      {
        h: "Keep evidence in the alert",
        p: [
          "When an alert includes the status code, response time and a screenshot, people can tell a WAF challenge from a real 500 in seconds - and stop guessing.",
        ],
      },
    ],
    faqs: [
      { q: "Should I turn off uptime alerts?", a: "No. Fix the check configuration and confirmation rules. Silent monitoring is how clients become your alert system." },
      { q: "How many failures before an incident?", a: "Two or three consecutive failures is a common starting point for marketing sites. Lower it for checkout or payment pages." },
    ],
    tool: "website-down-checker",
    feature: "uptime-monitoring",
  },
  {
    slug: "website-monitoring-india-agencies",
    nav: "India agency guide",
    title: "Agency Website Monitoring Guide for India | Watchfront",
    description:
      "What Indian web and marketing agencies should monitor on client sites, how to price retainers around it, and how to prove value every month with reports.",
    h1: "Agency website monitoring in India: a practical stack",
    intro:
      "Indian agencies often run dozens of WordPress and marketing sites for clients across time zones. Manual Monday checks do not scale. Here is a practical monitoring stack that fits agency retainers.",
    keywords: [
      "website monitoring india",
      "website monitoring for agencies india",
      "uptime monitoring india",
      "agency website monitoring india",
      "best website monitoring tool india",
    ],
    readMins: 7,
    published: "2026-11-15",
    updated: "2026-11-17",
    sections: [
      {
        h: "The failure modes Indian agencies see most",
        list: [
          "Hosting or DNS outages overnight",
          "SSL certificates that auto-renew fails to renew",
          "Contact forms that stop emailing after a plugin update",
          "Landing pages broken by theme or builder edits",
          "SEO titles and meta tags overwritten during content updates",
          "Ecommerce checkout paths that break while the homepage stays up",
        ],
      },
      {
        h: "A stack that fits a retainer",
        p: [
          "Bundle continuous monitoring into care plans: uptime and SSL for every site, form journeys on lead pages, monthly SEO audits, and a short client report. That is easier to sell than “we will check your site when we remember”.",
          "Map the stack to WordPress care plans, marketing landers and ecommerce stores so each retainer tier has named checks - not vibes.",
        ],
      },
      {
        h: "Support and billing that match how you work",
        p: [
          "Pick tools that speak your language, invoice cleanly, and do not need a DevOps hire to configure. Watchfront is built and supported from India for this workflow - start with a 3-day trial on a real client portfolio.",
        ],
      },
    ],
    faqs: [
      { q: "Is website monitoring worth it for small Indian agencies?", a: "Yes if you manage more than a few client sites. One missed outage or expired SSL usually costs more trust than a monitoring tool." },
      { q: "What should I include in a maintenance retainer?", a: "Updates, backups, uptime/SSL monitoring, form tests and a monthly report are a solid baseline." },
    ],
    tool: "website-down-checker",
    feature: "uptime-monitoring",
  },
  {
    slug: "contact-form-monitoring-for-agencies",
    nav: "Form monitoring for agencies",
    title: "Contact Form Monitoring for Agencies | Watchfront",
    description: "How agencies catch broken contact forms on client sites before leads disappear. Real-browser form checks, safe testing on live sites, and what to put in a retainer.",
    h1: "Contact form monitoring for agencies",
    intro: "Uptime can be green while the contact form silently fails. For agencies, that means lost leads and an awkward client call. This guide covers how form monitoring works, how to test safely on live sites, and how to sell it inside a maintenance retainer.",
    keywords: [
      "contact form monitoring",
      "contact form monitoring for agencies",
      "marketing agency form monitoring",
      "monitor contact form",
      "broken contact form detection",
    ],
    readMins: 7,
    published: "2026-11-15",
    updated: "2026-11-15",
    sections: [
      {
        h: "Why agencies miss broken forms",
        p: [
          "Homepage uptime only proves the server answered. A form can return 200 while the mail plugin is misconfigured, CAPTCHA keys expired, or a redesign removed the success state. Clients notice weeks later when the inbox is empty.",
          "Manual “submit a test lead on Monday” checks do not scale across twenty WordPress sites. You need an automated journey that fills the form like a real browser and asserts a success message or thank-you URL.",
        ],
      },
      {
        h: "What good form monitoring checks",
        list: [
          "The form page loads over HTTPS",
          "Required fields accept input without JS errors",
          "Submit produces the expected success message or redirect",
          "No unexpected 4xx/5xx on the form endpoint",
          "Optional: spam traps and honeypots still behave",
        ],
      },
      {
        h: "How to test live client sites safely",
        p: [
          "Use a clearly labelled test payload (for example “Watchfront form check - ignore”) so real sales teams can filter it. Prefer a staging copy when clients insist, but most lead forms need a production check because staging mail and CAPTCHA differ.",
          "Run checks after deploys and on a daily or hourly schedule for high-value landing pages. Alert on consecutive failures so a single flaky CAPTCHA does not wake the team.",
        ],
      },
      {
        h: "Packaging it in a retainer",
        p: [
          "Bundle form journeys with uptime and SSL: “we watch the pages that make you money.” Show clients a monthly count of successful checks and any incidents. That proof is easier to renew than a vague maintenance line item.",
        ],
      },
    ],
    faqs: [
      { q: "Is contact form monitoring different from uptime monitoring?", a: "Yes. Uptime checks whether the page responds. Form monitoring submits the form in a real browser and verifies the success path." },
      { q: "Will form checks create spam leads?", a: "Use a labelled test identity and tell the client once. Filters or a dedicated test inbox keep noise low." },
      { q: "Which forms should agencies monitor first?", a: "Homepage contact, paid landing pages, and booking or demo request forms. Start where lead value is highest." },
    ],
    tool: "website-down-checker",
    feature: "form-journey-testing",
  },
  {
    slug: "ssl-expiry-alerts-for-client-websites",
    nav: "SSL expiry alerts",
    title: "SSL Expiry Alerts for Client Websites | Watchfront",
    description: "Set up SSL expiry alerts across every client domain. Why auto-renewal fails, when to warn (30/14/7 days), and how agencies stop certificate outages.",
    h1: "SSL expiry alerts for client websites",
    intro: "An expired certificate is a full-page browser warning. Agencies that manage many client domains need expiry alerts in one place - not calendar reminders that get missed.",
    keywords: [
      "ssl expiry alerts",
      "ssl certificate expiry alerts",
      "ssl expiry monitoring",
      "client website ssl monitoring",
      "certificate expiry warning",
    ],
    readMins: 6,
    published: "2026-11-15",
    updated: "2026-11-15",
    sections: [
      {
        h: "Why client certificates still expire",
        p: [
          "Let’s Encrypt lasts 90 days. Auto-renewal fails after DNS moves, host migrations, firewall changes, or a failed billing event. www and apex can use different certificates. Someone who left the agency still owns the renewal email.",
        ],
      },
      {
        h: "Alert timing that actually helps",
        list: [
          "30 days - enough time to fix DNS or hosting issues",
          "14 days - escalate if renewal still failing",
          "7 days - treat as urgent; manually issue if needed",
          "Also watch domain registration expiry - a lapsed domain takes HTTPS with it",
        ],
      },
      {
        h: "What to monitor beyond the expiry date",
        p: [
          "Hostname match (www vs non-www), intermediate chain completeness, and HTTP→HTTPS redirects. A certificate can be “valid” in one browser and fail for API clients if the chain is incomplete.",
        ],
      },
      {
        h: "Agency workflow",
        p: [
          "Add every client hostname once. Route SSL alerts to the person who can renew. Include “certificates checked / days to next expiry” in the monthly client report so renewals feel proactive instead of reactive.",
        ],
      },
    ],
    faqs: [
      { q: "How do I check SSL expiry right now?", a: "Use a free SSL checker for a one-off lookup, then put continuous alerts on every client domain." },
      { q: "Should I monitor staging certificates too?", a: "Optional. Prioritise production hostnames clients and Googlebot hit." },
      { q: "What is a good warning window?", a: "30, 14 and 7 days covers most renewal failures without alert fatigue." },
    ],
    tool: "ssl-checker",
    feature: "ssl-domain-monitoring",
  },
  {
    slug: "website-down-for-everyone-or-just-me",
    nav: "Down for everyone?",
    title: "Website Down for Everyone or Just Me? | Watchfront",
    description: "How to tell if a website is down for everyone or just you. Free checks, common local causes, and how to get alerted when it is down for real.",
    h1: "Is the website down for everyone or just me?",
    intro: "When a site fails on your laptop, the first question is whether it is a real outage or a local glitch. Here is how to separate the two in under a minute - and how to know next time without refreshing manually.",
    keywords: [
      "website down for everyone or just me",
      "is the website down for everyone",
      "down for everyone or just me",
      "website down checker",
      "is my website down",
    ],
    readMins: 5,
    published: "2026-11-15",
    updated: "2026-11-15",
    sections: [
      {
        h: "Check from outside your network",
        p: [
          "Use a website down checker that requests the URL from datacenter servers, not your Wi-Fi. If it succeeds there, the site is up for the internet and your problem is local. If it fails there too, treat it as a real outage and note the HTTP status or error.",
        ],
      },
      {
        h: "Common “just me” causes",
        list: [
          "Browser cache or a stuck service worker",
          "DNS cache still pointing at an old IP",
          "VPN, corporate firewall or school/office filter",
          "ISP routing issues on one network",
          "Ad blockers or privacy extensions blocking the domain",
        ],
      },
      {
        h: "Common “everyone” causes",
        list: [
          "Hosting or cloud provider outage",
          "Expired domain or SSL certificate",
          "Failed deploy or plugin update",
          "Overloaded origin or database",
          "CDN misconfiguration",
        ],
      },
      {
        h: "Stop checking by hand",
        p: [
          "A one-off checker answers “is it down now?” Continuous uptime monitoring answers “tell me the moment it is down for everyone,” with retries so brief blips do not become false alarms. That is what agencies need across a client portfolio.",
        ],
      },
    ],
    faqs: [
      { q: "Why does a site work on mobile data but not Wi-Fi?", a: "Usually DNS or a network filter on Wi-Fi. Compare both networks and an external checker." },
      { q: "What does HTTP 502 or 503 mean?", a: "The edge or proxy could not get a good response from the origin - often a hosting or application crash." },
      { q: "How fast should I be alerted?", a: "One-minute checks with a short consecutive-failure threshold balance speed and noise for most business sites." },
    ],
    tool: "website-down-checker",
    feature: "uptime-monitoring",
  },
  {
    slug: "wordpress-uptime-monitoring",
    nav: "WordPress uptime",
    title: "WordPress Uptime Monitoring Guide for Agencies | Watchfront",
    description:
      "How to set up WordPress uptime monitoring for care plans: which URLs to watch, form journeys after plugin updates, SSL, and what to put in the SOW.",
    h1: "WordPress uptime monitoring for agencies",
    intro:
      "WordPress care plans promise peace of mind. Without uptime monitoring - plus form and SSL checks - you are hoping Mondays catch what broke on Thursday night. Here is a practical setup for Indian agencies.",
    keywords: [
      "wordpress uptime monitoring",
      "wordpress website monitoring",
      "monitor wordpress site",
      "wordpress care plan uptime",
      "wordpress downtime alerts",
    ],
    readMins: 7,
    published: "2026-11-17",
    updated: "2026-11-17",
    sections: [
      {
        h: "Which WordPress URLs to monitor",
        list: [
          "Homepage and primary landing pages that run ads",
          "Contact / quote / booking thank-you paths (via journey tests)",
          "Key category or product pages if they drive revenue",
          "www and apex if both resolve publicly",
        ],
      },
      {
        h: "After every plugin or theme update",
        p: [
          "Re-run the lead form journey before you close the ticket. Homepage uptime can pass while Contact Form 7 or SMTP is broken. Treat the journey as part of the update checklist, not an optional extra.",
        ],
      },
      {
        h: "SSL and domain on every retained host",
        p: [
          "Let’s Encrypt auto-renew fails after DNS or host moves. Put SSL expiry alerts on every production hostname and include days-to-expiry in the monthly report.",
        ],
      },
      {
        h: "Write it into the care-plan SOW",
        list: [
          "Check frequency and alert channel",
          "Named form journeys",
          "SSL/domain lead times (30/14/7 days)",
          "What is out of scope (server agents, email deliverability deep dives)",
        ],
      },
    ],
    faqs: [
      { q: "Do I need a WordPress plugin for uptime monitoring?", a: "No. Outside checks cover uptime, SSL, SEO and form journeys. An optional script adds real-visitor JS errors." },
      { q: "How often should WordPress sites be checked?", a: "Every 1 minute for retained marketing sites, with confirmation so brief blips do not page the team." },
      { q: "Can I monitor staging?", a: "Optional. Prioritise production URLs clients and Googlebot hit." },
    ],
    tool: "website-down-checker",
    feature: "uptime-monitoring",
  },
  {
    slug: "how-to-monitor-website-apis",
    nav: "Monitor website APIs",
    title: "How to Monitor Website APIs (Agency Guide) | Watchfront",
    description:
      "How to monitor website APIs and form endpoints: what to assert, how to import Postman, and how agencies catch integration failures the homepage hides.",
    h1: "How to monitor website APIs without an observability tax",
    intro:
      "Booking engines, CRM webhooks and form handlers fail independently of the homepage. This guide shows agencies how to pick endpoints, assert “working,” and alert without standing up a full APM stack.",
    keywords: [
      "how to monitor website APIs",
      "API monitoring for websites",
      "monitor API endpoints",
      "Postman monitoring",
      "form endpoint monitoring",
    ],
    readMins: 6,
    published: "2026-11-17",
    updated: "2026-11-17",
    sections: [
      {
        h: "Pick the endpoints that make money",
        list: [
          "Form submit / lead capture APIs",
          "Booking availability and create-booking routes",
          "Headless CMS content APIs used by the frontend",
          "Auth token refresh if the site depends on it",
        ],
      },
      {
        h: "Define what “working” means",
        p: [
          "Status code alone is weak. Assert expected JSON fields, maximum latency, and auth headers. Store secrets encrypted. Prefer read-only or clearly marked test payloads on production.",
        ],
      },
      {
        h: "Import what developers already have",
        p: [
          "Postman collections, OpenAPI specs, HAR exports and cURL snippets beat reinventing checks. Import once, schedule, and route alerts to the person who can fix the integration.",
        ],
      },
      {
        h: "Pair APIs with journeys",
        p: [
          "API monitors catch contract breaks. Real-browser form journeys catch UI and client-side failures. Use both on lead-gen sites.",
        ],
      },
    ],
    faqs: [
      { q: "How often should APIs be checked?", a: "Every 1–5 minutes for critical booking or lead endpoints; less often for rarely used admin APIs." },
      { q: "Will API monitors create fake bookings?", a: "Use safe read endpoints or sandboxed test modes. Never fire paid transactions from monitors." },
      { q: "Do I need Datadog for this?", a: "Not for client marketing sites. A focused API monitoring tool is enough for most agency portfolios." },
    ],
    feature: "api-monitoring",
  },
  {
    slug: "fix-javascript-errors-on-client-sites",
    nav: "Fix JS errors",
    title: "Fix JavaScript Errors on Client Websites | Watchfront",
    description:
      "How agencies find and fix JavaScript errors on client sites: real-visitor monitoring, common WordPress causes, and what to report without panic.",
    h1: "How to find and fix JavaScript errors on client sites",
    intro:
      "Clients rarely say “there’s a TypeError.” They say the button does nothing. Here is how to catch browser errors, group the noise, and fix what actually hurts conversions.",
    keywords: [
      "javascript errors on website",
      "fix javascript errors",
      "website js errors",
      "frontend error monitoring",
      "wordpress javascript errors",
    ],
    readMins: 6,
    published: "2026-11-17",
    updated: "2026-11-17",
    sections: [
      {
        h: "Why synthetic uptime misses JS bugs",
        p: [
          "Outside checks request HTML. They do not run every visitor’s browser extensions, ad tags, or mobile WebViews. Real-visitor error monitoring fills that gap.",
        ],
      },
      {
        h: "Common causes on WordPress marketing sites",
        list: [
          "Plugin conflicts after updates",
          "Broken third-party pixels and chat widgets",
          "Theme scripts assuming jQuery is present",
          "Minification / combine plugins corrupting order",
          "Consent banners blocking required scripts inconsistently",
        ],
      },
      {
        h: "Triage without drowning",
        p: [
          "Group by fingerprint. Fix high-volume errors on money pages first. Ignore one-off noise from obscure browsers until it repeats. Attach the steps before the error when you update the client.",
        ],
      },
      {
        h: "Prove the fix",
        p: [
          "After deploying, watch the error group drop and re-run the form journey. Uptime alone will not tell you the CTA works again.",
        ],
      },
    ],
    faqs: [
      { q: "Do I need a heavy APM agent?", a: "Usually no. A lightweight error script plus journey tests covers most agency sites." },
      { q: "Should every JS error be an incident?", a: "No. Threshold on volume and affected URLs so you do not cry wolf." },
      { q: "Can clients see raw stack traces?", a: "Prefer plain-English summaries in reports; keep stacks internal unless they ask." },
    ],
    feature: "javascript-error-monitoring",
  },
  {
    slug: "fix-broken-links-on-client-websites",
    nav: "Fix broken links",
    title: "Find & Fix Broken Links on Client Websites | Watchfront",
    description:
      "How to find and fix broken links on client websites: prioritise money pages, set redirects, and keep monitoring after the one-off crawl.",
    h1: "Find and fix broken links before clients (or Google) do",
    intro:
      "Dead CTAs and 404 blog links leak trust and SEO. Agencies need a repeatable way to find broken links, fix or redirect them, and keep watching after the next content edit.",
    keywords: [
      "fix broken links",
      "broken links on website",
      "dead link checker",
      "fix 404 errors",
      "broken link audit",
    ],
    readMins: 5,
    published: "2026-11-17",
    updated: "2026-11-17",
    sections: [
      {
        h: "Start with money pages",
        list: [
          "Primary nav and footer links",
          "Campaign landing pages running ads",
          "Contact and booking CTAs",
          "Top blog posts that still get traffic",
        ],
      },
      {
        h: "Fix vs redirect",
        p: [
          "Restore the page when content still matters. 301 to the closest live equivalent when it moved. Remove or update the link when the offer is gone. Do not leave soft-404s that return 200 with “not found” copy.",
        ],
      },
      {
        h: "One audit is not a strategy",
        p: [
          "Migrations and page-builder edits reintroduce rot. Schedule content and link checks on key pages, and re-run after launches. Pair with an SEO audit so titles and indexability stay sane too.",
        ],
      },
    ],
    faqs: [
      { q: "How often should I crawl for broken links?", a: "After every major content launch, and on a weekly or monthly schedule for retained sites." },
      { q: "Do broken links hurt SEO?", a: "Excess 404s and dead internal links waste crawl budget and hurt UX signals. Fix high-traffic paths first." },
      { q: "Is a free checker enough?", a: "For a spot check, yes. Continuous monitoring is what stops the same 404 coming back next month." },
    ],
    tool: "seo-checker",
    feature: "visual-regression-testing",
  },
  {
    slug: "how-to-choose-website-monitoring-tool",
    nav: "Choose a monitoring tool",
    title: "How to Choose a Website Monitoring Tool | Watchfront",
    description:
      "How to choose a website monitoring tool for agencies: uptime depth, forms, SSL, reports, false alarms, and what to ignore in vendor marketing.",
    h1: "How to choose a website monitoring tool (agency checklist)",
    intro:
      "Most comparison pages list probe locations and forget the failures that burn retainers. Use this checklist to pick website monitoring software that fits agency work - not just engineering vanity metrics.",
    keywords: [
      "how to choose website monitoring tool",
      "best website monitoring tool for agencies",
      "website monitoring software comparison",
      "uptime monitoring tool checklist",
    ],
    readMins: 7,
    published: "2026-11-17",
    updated: "2026-11-17",
    sections: [
      {
        h: "Must-haves for agencies",
        list: [
          "Confirmed uptime (retries / thresholds) so you do not mute alerts",
          "SSL and domain expiry across many hostnames",
          "Real-browser form or journey tests on lead paths",
          "Client grouping and shareable reports",
          "Evidence in incidents (status, screenshot, timeline)",
        ],
      },
      {
        h: "Nice-to-haves",
        list: [
          "SEO hygiene audits on a schedule",
          "API monitors for booking/CRM endpoints",
          "JavaScript error grouping for heavy themes",
          "Quiet hours and escalations",
        ],
      },
      {
        h: "What to ignore in demos",
        p: [
          "World maps of 80 probe cities rarely save a retainer. Fancy percentile charts rarely renew clients. Ask: will this catch a dead contact form on a WordPress care-plan site, and can I show proof in a PDF?",
        ],
      },
      {
        h: "Trial like you work",
        p: [
          "Add a real client site, enable the money form journey, and compare what your current stack misses for three days. Marketing pages lie; production portfolios do not.",
        ],
      },
    ],
    faqs: [
      { q: "Is the cheapest uptime tool enough?", a: "For a hobby site, maybe. For paid care plans, forms/SSL/reports usually matter more than saving a few dollars." },
      { q: "Do I need multi-location checks?", a: "One solid external location with confirmation is enough for most Indian agency portfolios. Add more only if you have a real regional failure pattern." },
      { q: "Should monitoring replace ManageWP?", a: "No. Keep update/backup tools; add monitoring for runtime failures." },
    ],
    feature: "uptime-monitoring",
  },
  {
    slug: "what-is-ssl-monitoring",
    nav: "What is SSL monitoring?",
    title: "What Is SSL Monitoring? Plain-English Guide | Watchfront",
    description:
      "What SSL monitoring is, how certificate expiry alerts work, what else to check (chain, hostname, HTTPS redirect), and how agencies set it up.",
    h1: "What is SSL monitoring?",
    intro:
      "SSL monitoring is the practice of continuously checking a site’s TLS certificate so you learn about expiry, trust and hostname problems before browsers warn visitors. Here is what to monitor and why agencies need it on every client domain.",
    keywords: [
      "what is SSL monitoring",
      "SSL monitoring",
      "SSL certificate monitoring explained",
      "certificate expiry monitoring",
    ],
    readMins: 5,
    published: "2026-11-17",
    updated: "2026-11-17",
    sections: [
      {
        h: "What SSL monitoring checks",
        list: [
          "Certificate validity window and days left",
          "Hostname match (www vs apex, SANs)",
          "Chain / intermediate trust",
          "HTTP to HTTPS redirect behaviour",
          "Often paired with domain registration expiry",
        ],
      },
      {
        h: "Why auto-renewal is not enough",
        p: [
          "Let’s Encrypt and host auto-renew fail after DNS changes, migrations, firewall rules and billing issues. Monitoring watches the certificate’s dates, not the renewal email inbox of someone who left the agency.",
        ],
      },
      {
        h: "Alert windows that work",
        p: ["Warn at 30 and 14 days, escalate at 7. Include SSL status in the monthly client report so renewals look proactive."],
      },
    ],
    faqs: [
      { q: "Is SSL monitoring the same as uptime monitoring?", a: "No. A site can be “up” while browsers block visitors with a certificate warning. You need both." },
      { q: "How do I check SSL once right now?", a: "Use a free SSL checker, then enable continuous SSL certificate monitoring on every client hostname." },
      { q: "Does SSL monitoring require a plugin?", a: "No. It works from outside the site over HTTPS." },
    ],
    tool: "ssl-checker",
    feature: "ssl-domain-monitoring",
  },
  {
    slug: "ecommerce-website-monitoring",
    nav: "Ecommerce monitoring",
    title: "Ecommerce Website Monitoring Checklist | Watchfront",
    description:
      "Ecommerce website monitoring checklist for agencies: which URLs to watch, checkout journeys, SSL, JS errors and what to put in the monthly store report.",
    h1: "Ecommerce website monitoring checklist for agencies",
    intro:
      "Online stores lose money quietly when cart, checkout or payment steps break while the homepage stays up. Use this checklist to scope monitoring for Shopify, WooCommerce and custom storefronts.",
    keywords: [
      "ecommerce website monitoring",
      "woocommerce monitoring",
      "shopify uptime monitoring",
      "checkout monitoring",
      "online store monitoring",
    ],
    readMins: 6,
    published: "2026-11-17",
    updated: "2026-11-17",
    sections: [
      {
        h: "URLs that must stay green",
        list: [
          "Homepage and primary collection / category pages",
          "Top product pages running ads",
          "Cart and checkout entry URLs (monitor carefully on live stores)",
          "Account login if retainers include it",
        ],
      },
      {
        h: "Journeys vs payments",
        p: [
          "Test add-to-cart and lead capture in a real browser. Block payment requests by default. Prefer staging or sandbox gateways when you need deeper checkout coverage.",
        ],
      },
      {
        h: "SSL is a conversion feature",
        p: [
          "Certificate warnings kill checkout trust instantly. Put SSL expiry alerts on every storefront hostname, including www, apex and checkout subdomains.",
        ],
      },
      {
        h: "What to show the merchant monthly",
        list: [
          "Uptime % on money URLs",
          "Incidents and time-to-fix",
          "SSL days remaining",
          "Form/journey pass rate",
          "Notable JS error groups on PDP/cart",
        ],
      },
    ],
    faqs: [
      { q: "Can I monitor Shopify stores?", a: "Yes. Public storefront URLs work like any other site. Use safe journey scopes on live checkouts." },
      { q: "How is this different from host monitoring?", a: "Host tools watch servers. Ecommerce monitoring watches the customer path - pages, SSL, journeys and browser errors." },
      { q: "Do I need a plugin?", a: "No for synthetic checks. An optional script adds real-visitor JavaScript errors." },
    ],
    feature: "form-journey-testing",
  },
  {
    slug: "domain-expiry-monitoring",
    nav: "Domain expiry monitoring",
    title: "Domain Expiry Monitoring for Client Sites | Watchfront",
    description:
      "Domain expiry monitoring for agencies: why domains lapse, how to alert early, and how to pair domain checks with SSL and uptime.",
    h1: "Domain expiry monitoring for every client site",
    intro:
      "An expired domain takes the website and often email offline. Agencies need domain expiry monitoring across the portfolio - not calendar reminders owned by whoever left last year.",
    keywords: [
      "domain expiry monitoring",
      "domain expiration alerts",
      "monitor domain expiry",
      "client domain expiry",
      "website domain monitoring",
    ],
    readMins: 5,
    published: "2026-11-17",
    updated: "2026-11-17",
    sections: [
      {
        h: "Why client domains still expire",
        list: [
          "Registrar auto-renew fails after card changes",
          "Whois privacy hides reminders from the agency",
          "Ownership sits with the client’s personal email",
          "Transfers mid-project leave renewal in limbo",
        ],
      },
      {
        h: "Alert early, report monthly",
        p: [
          "Warn at 60/30/14 days when the registry publishes dates. If the date is hidden, show unknown - never invent a value. Put next domain expiry on the client report alongside SSL.",
        ],
      },
      {
        h: "Pair with SSL and uptime",
        p: [
          "Domain expiry, certificate expiry and downtime are three different failures with the same client-facing outcome: “the site is broken.” Monitor all three in one workspace.",
        ],
      },
    ],
    faqs: [
      { q: "Can every domain’s expiry be read automatically?", a: "Not always. Some registries hide dates. Good tools show unknown instead of guessing." },
      { q: "Is domain monitoring the same as DNS monitoring?", a: "No. Domain expiry is registration lifetime. DNS monitoring watches resolution and records." },
      { q: "Where does Watchfront show domain expiry?", a: "On each site’s SSL & domain checks, with alerts and report fields when the date is known." },
    ],
    tool: "ssl-checker",
    feature: "ssl-domain-monitoring",
  },
  {
    slug: "synthetic-monitoring-vs-real-user-monitoring",
    nav: "Synthetic vs RUM",
    title: "Synthetic Monitoring vs Real User Monitoring | Watchfront",
    description:
      "Synthetic monitoring vs real user monitoring (RUM): what each catches, what each misses, and the stack agencies should run on client sites.",
    h1: "Synthetic monitoring vs real user monitoring",
    intro:
      "Synthetic checks run on a schedule whether anyone visits or not. Real user monitoring watches actual browsers. Agencies need both — here is how to split the job without buying an enterprise APM suite.",
    keywords: [
      "synthetic monitoring vs RUM",
      "synthetic vs real user monitoring",
      "RUM vs synthetic",
      "proactive vs real user monitoring",
    ],
    readMins: 6,
    published: "2026-11-17",
    updated: "2026-11-17",
    sections: [
      {
        h: "What synthetic monitoring catches",
        list: [
          "Full outages overnight and on weekends",
          "SSL expiry before browsers warn visitors",
          "Broken contact forms via scheduled journeys",
          "API contract breaks on booking endpoints",
        ],
      },
      {
        h: "What real-user monitoring catches",
        list: [
          "Browser-only JavaScript exceptions",
          "Device or extension-specific failures",
          "Errors tied to a specific page path visitors hit",
        ],
      },
      {
        h: "A practical agency split",
        p: [
          "Run synthetics on every retained site. Add JS error monitoring where themes, pixels and page builders are heavy. Do not skip synthetics because you have RUM — empty-traffic hours still break.",
        ],
      },
    ],
    faqs: [
      { q: "Is uptime synthetic monitoring?", a: "Yes — a basic form of it. Journeys and API checks are richer synthetics." },
      { q: "Do I need RUM for every brochure site?", a: "Optional. Prioritise RUM/JS on high-traffic or JS-heavy sites." },
      { q: "Will synthetics replace client bug reports?", a: "They reduce surprises. Odd browser bugs may still need RUM or a human repro." },
    ],
    feature: "javascript-error-monitoring",
  },
  {
    slug: "how-to-write-monitoring-into-care-plans",
    nav: "Monitoring in care plans",
    title: "How to Write Monitoring into Care Plans | Watchfront",
    description:
      "How to write website monitoring into agency care plans and SOWs: named checks, alert expectations, report contents and out-of-scope lines.",
    h1: "How to write monitoring into your care plan (so renewals stick)",
    intro:
      "Vague “we’ll keep an eye on your site” language creates angry WhatsApp threads. Named monitors create calm renewals. Use this SOW checklist.",
    keywords: [
      "website monitoring care plan",
      "monitoring in SOW",
      "agency care plan monitoring",
      "website retainer monitoring",
    ],
    readMins: 6,
    published: "2026-11-17",
    updated: "2026-11-17",
    sections: [
      {
        h: "Name the checks",
        list: [
          "URLs covered (prod only unless staging is priced)",
          "Uptime interval and confirmation rules",
          "SSL/domain alert windows",
          "Named form journeys",
          "SEO audit cadence on money pages",
        ],
      },
      {
        h: "Name the response",
        list: [
          "Alert channel and business hours vs 24/7",
          "Who acknowledges incidents",
          "Client communication SLA",
        ],
      },
      {
        h: "Name the report",
        p: [
          "Uptime %, incidents, SSL days left, journeys passed, preventive work. Link to a white-label report instead of rebuilding slides.",
        ],
      },
      {
        h: "Name what is out of scope",
        list: [
          "Server agents / full APM",
          "Email deliverability deep dives",
          "Redesign QA",
          "Security penetration testing",
        ],
      },
    ],
    faqs: [
      { q: "Should monitoring be a separate line item?", a: "Yes when possible — it makes renewals clearer and under-scoping harder." },
      { q: "What if the client refuses monitoring?", a: "Document that uptime/form failures may be found by their customers first." },
      { q: "Can freelancers use the same SOW?", a: "Yes — shrink the URL list and keep the same structure." },
    ],
    feature: "client-reports",
  },
  {
    slug: "best-website-monitoring-tools-for-agencies",
    nav: "Best tools for agencies",
    title: "Best Website Monitoring Tools for Agencies (2026) | Watchfront",
    description:
      "How to pick the best website monitoring tools for agencies in 2026: evaluation criteria, must-have checks, and where Watchfront fits — without fake rankings.",
    h1: "Best website monitoring tools for agencies — how to choose in 2026",
    intro:
      "“Best” depends on whether you manage one product or fifty client sites. This guide is a criteria-first shortlist for agencies — not a paid ranking list.",
    keywords: [
      "best website monitoring tools for agencies",
      "best uptime monitoring for agencies",
      "website monitoring tools 2026",
      "agency monitoring software",
    ],
    readMins: 8,
    published: "2026-11-17",
    updated: "2026-11-17",
    sections: [
      {
        h: "Criteria that actually matter",
        list: [
          "Confirmed uptime (retries / thresholds)",
          "SSL + domain expiry across many hosts",
          "Real-browser form journeys",
          "Client grouping + white-label reports",
          "Evidence in incidents",
          "Honest pricing / trial on real portfolios",
        ],
      },
      {
        h: "Tool shapes you will meet",
        list: [
          "Ping-only uptime tools — cheap, shallow",
          "Enterprise APM / observability — powerful, wrong buyer for care plans",
          "WP maintenance suites — updates/backups first, monitoring secondary",
          "Agency monitoring platforms — portfolio + forms + reports (Watchfront’s lane)",
        ],
      },
      {
        h: "How to trial without lying to yourself",
        p: [
          "Add a real client site. Enable the money form. Compare what your current stack misses for three days. Read comparisons only after you have evidence from production.",
        ],
      },
      {
        h: "Where Watchfront fits",
        p: [
          "If you sell retainers on WordPress and marketing sites in India, Watchfront is built for that workflow. If you need server APM or cron heartbeats, keep a specialist tool alongside.",
        ],
      },
    ],
    faqs: [
      { q: "What is the best website monitoring tool overall?", a: "There isn’t one. For agencies, prioritise forms, SSL, reports and false-alarm control over probe-count bragging." },
      { q: "Is UptimeRobot enough?", a: "For basic uptime on a few sites, often yes. For care plans with forms and client PDFs, usually not." },
      { q: "Should I use multiple tools?", a: "Sometimes — updates in ManageWP + runtime monitoring in Watchfront is a common split." },
    ],
    feature: "uptime-monitoring",
  },
  {
    slug: "reduce-mean-time-to-detect",
    nav: "Reduce MTTD",
    title: "How to Reduce Mean Time to Detect (MTTD) | Watchfront",
    description:
      "Lower website outage MTTD for agencies: check intervals, confirmation rules, alert routing and evidence — without drowning in false positives.",
    h1: "How to reduce mean time to detect (MTTD) on client websites",
    intro:
      "Mean time to detect is how long an outage sits unnoticed. For agencies, Monday tab-checks create multi-day MTTD. Here is how to shrink it to minutes without paging the whole team for every blip.",
    keywords: [
      "mean time to detect",
      "reduce MTTD",
      "how to lower MTTD",
      "outage detection time",
      "website monitoring MTTD",
    ],
    readMins: 7,
    published: "2026-11-17",
    updated: "2026-11-17",
    tool: "website-down-checker",
    feature: "uptime-monitoring",
    sections: [
      {
        h: "What MTTD actually measures",
        p: [
          "MTTD starts when the failure begins and ends when a human (or automated page) knows. It is not the same as downtime duration or MTTR. If you only notice when the client forwards a screenshot, MTTD is already a business failure.",
          "Read the plain definition of mean time to detect, then pair it with how Watchfront calculates uptime so your SOW and your PDF agree.",
        ],
      },
      {
        h: "The four levers that cut MTTD",
        list: [
          "Check money URLs every 1–5 minutes (not once a week)",
          "Confirm with consecutive failures so one blip is not a page — but two or three still wake someone",
          "Route alerts to a reachable on-call, not a shared inbox nobody opens at night",
          "Put status code, timing and screenshot in the alert so the first responder can act",
        ],
      },
      {
        h: "Where agencies waste detection time",
        list: [
          "Monitoring only the homepage while checkout or the lead form is down",
          "Muting alerts after false positives instead of fixing confirmation rules",
          "No named URLs in the SOW — so nobody knows what “up” means",
          "Relying on the host status page as the only signal",
        ],
      },
      {
        h: "Sell the outcome, not the interval",
        p: [
          "Clients buy shorter MTTD when they understand downtime cost. Use the cost of downtime calculator as a planning estimate, then show detection minutes collapsing after you enable continuous checks.",
          "Write the interval and confirmation rules into the monitoring SOW template so the retainer matches the ops reality.",
        ],
      },
      {
        h: "Minimum stack after availability",
        p: [
          "Availability alone misses soft 404s and dead forms. Add SSL days-remaining, one real-browser journey, and SEO hygiene on campaign URLs. That is the agency path from “reachable” to “working.”",
        ],
      },
    ],
    faqs: [
      {
        q: "What is a good MTTD for marketing sites?",
        a: "Minutes, not hours. With 1-minute checks and a 2–3 failure confirmation, most agencies land in a few minutes of detection time.",
      },
      {
        q: "Will faster checks create more false alerts?",
        a: "Only if you page on a single failure. Confirmation rules keep MTTD low and noise manageable.",
      },
      {
        q: "How is MTTD different from MTTR?",
        a: "MTTD is time to notice. MTTR is time to restore after you start fixing. Evidence in alerts mainly helps MTTR; check frequency mainly helps MTTD.",
      },
    ],
  },
];

export const guideBySlug = (s: string) => GUIDES.find((g) => g.slug === s);
