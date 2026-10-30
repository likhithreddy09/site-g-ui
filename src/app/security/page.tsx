import { LegalPage } from "@/components/marketing/LegalPage";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: "Security | Watchfront",
  description: "How we protect secrets, keep live-site tests safe, and lock down workers. Read our practices and how to report a security issue.",
  path: "/security",
  keywords: ["Watchfront security", "monitoring security", "safe form testing"],
  ogTitle: "Security | Watchfront",
  ogDescription: "Encrypted secrets, safe live tests, and workers that refuse private network targets.",
});

export default function SecurityPage() {
  return (
    <LegalPage
      title="Security"
      path="/security"
      updated="2026-10-28"
      intro="Watchfront sees into your clients' websites, so we treat security as a product feature, not a checkbox. Here's how we protect your data and the sites we monitor."
      sections={[
        { id: "secrets", title: "Encrypted secrets", body: <><p>API keys, tokens, passwords and test credentials are encrypted at rest and are never shown again in full after you save them. They are masked in logs, incidents, AI summaries and client reports.</p></> },
        { id: "workers", title: "Isolated, SSRF-protected workers", body: <><p>Checks run on dedicated workers that refuse requests to private, loopback and cloud-metadata addresses, so a monitored URL can never be used to reach internal infrastructure.</p></> },
        { id: "live-sites", title: "Safe testing on live websites", body: <ul><li>Payment and checkout requests are blocked by default.</li><li>Every test run uses a unique test email address and sends an identifying header so you can filter it out.</li><li>A form must be marked safe to repeat before it can be scheduled.</li><li>Watchfront never changes content or settings on a production website.</li></ul> },
        { id: "access", title: "Access control", body: <><p>Workspaces use role-based access - owner, admin, member and read-only client - and clients only ever see the websites assigned to them. Shared report links are unguessable and can be revoked at any time.</p></> },
        { id: "retention", title: "Data retention", body: <><p>Check results, screenshots and error events are kept only for the history period of your plan (7 to 365 days) and are then deleted automatically. Deleting a website removes its data.</p></> },
        { id: "browser-script", title: "The browser error script", body: <><p>The optional script collects JavaScript error messages, stack traces, page URL and browser type. It does not record keystrokes, form values, cookies or session replays.</p></> },
        { id: "disclosure", title: "Responsible disclosure", body: <><p>Found a vulnerability? Email <a href={`mailto:${SITE.email.security}`}>{SITE.email.security}</a> with the details. We acknowledge reports within two business days and won&apos;t pursue good-faith research.</p></> },
      ]}
    />
  );
}
