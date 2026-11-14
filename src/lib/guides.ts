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
    title: "What Is Uptime Monitoring? A Plain-English Guide | Watchfront",
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
    title: "Website Down? A Step-by-Step Checklist to Fix It Fast | Watchfront",
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
    title: "How to Stop SSL Certificates Expiring (Agency Guide) | Watchfront",
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
    title: "Contact Form Not Working? How to Detect It Before Clients Do | Watchfront",
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
    title: "Website Maintenance Checklist for Agencies (Monthly) | Watchfront",
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
];

export const guideBySlug = (s: string) => GUIDES.find((g) => g.slug === s);
