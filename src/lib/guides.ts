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
    description: "What Indian web and marketing agencies should monitor on client sites, how to price retainers around it, and how to prove value every month.",
    h1: "Agency website monitoring in India: a practical stack",
    intro: "Indian agencies often run dozens of WordPress and marketing sites for clients across time zones. Manual Monday checks do not scale. Here is a practical monitoring stack that fits agency retainers.",
    keywords: ["website monitoring india", "website monitoring for agencies india", "uptime monitoring india", "agency website monitoring india"],
    readMins: 6,
    published: "2026-11-15",
    updated: "2026-11-15",
    sections: [
      {
        h: "The failure modes Indian agencies see most",
        list: [
          "Hosting or DNS outages overnight",
          "SSL certificates that auto-renew fails to renew",
          "Contact forms that stop emailing after a plugin update",
          "Landing pages broken by theme or builder edits",
          "SEO titles and meta tags overwritten during content updates",
        ],
      },
      {
        h: "A stack that fits a retainer",
        p: [
          "Bundle continuous monitoring into care plans: uptime and SSL for every site, form journeys on lead pages, monthly SEO audits, and a short client report. That is easier to sell than “we will check your site when we remember”.",
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
];

export const guideBySlug = (s: string) => GUIDES.find((g) => g.slug === s);
