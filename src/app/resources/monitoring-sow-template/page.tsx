import Link from "next/link";
import { CtaBand, FaqList, JsonLd, MarketingShell, PageHero } from "@/components/marketing/Site";
import { articleLd, breadcrumbLd, faqLd, pageMeta } from "@/lib/seo";

const FAQS = [
  {
    q: "Is this legal advice?",
    a: "No. It is operational scope language for care-plan conversations. Have your counsel review before you put it in a contract.",
  },
  {
    q: "How specific should URLs be?",
    a: "Name the money URLs: homepage, checkout, booking form, lead form thank-you. Vague “we monitor the site” creates disputes.",
  },
  {
    q: "What belongs in exclusions?",
    a: "Host outages outside your control, DNS at the registrar, client-approved maintenance windows, and third-party SaaS login flows you cannot instrument.",
  },
];

const BLOCKS = [
  {
    h: "1. Scope — what we monitor",
    lines: [
      "HTTP(S) availability on named URLs at an agreed interval (e.g. every 1–5 minutes).",
      "SSL certificate days-remaining on every hostname we manage.",
      "Domain expiry where registry data is available.",
      "Critical form / booking journeys listed in Appendix A (steps + expected outcomes).",
      "Optional: API endpoints, broken-link crawls, SEO hygiene checks (title/meta/noindex).",
    ],
  },
  {
    h: "2. Detection & confirmation",
    lines: [
      "An incident opens after N consecutive failed checks (state N explicitly — e.g. 2).",
      "We re-check from a second vantage when available before paging the on-call.",
      "Partial degradation (5xx on checkout only) is treated as an incident if that URL is in scope.",
    ],
  },
  {
    h: "3. Alert routing",
    lines: [
      "Primary: email to {agency on-call}. Secondary: {client contact} for severity-1 only if agreed.",
      "Quiet hours / escalation ladder documented in Appendix B.",
      "False-positive review within one business day; threshold changes logged.",
    ],
  },
  {
    h: "4. Reporting cadence",
    lines: [
      "Monthly client report: uptime %, incidents, SSL days left, journeys passed, next decisions.",
      "Ad-hoc incident notes within 24 hours of resolution for severity-1.",
      "Report template available: sample client uptime report.",
    ],
  },
  {
    h: "5. Client responsibilities",
    lines: [
      "Provide staging access or approve production form test payloads.",
      "Notify us of planned maintenance ≥ 24 hours ahead.",
      "Keep DNS / registrar contacts current when domain monitoring is in scope.",
    ],
  },
  {
    h: "6. Exclusions (say them out loud)",
    lines: [
      "Upstream ISP / CDN / host platform outages we cannot remediate.",
      "Third-party payment or WhatsApp widgets we cannot instrument end-to-end.",
      "Content accuracy, legal compliance, or design QA unless separately scoped.",
    ],
  },
];

export const metadata = pageMeta({
  title: "Website Monitoring SOW Template for Agencies | Watchfront",
  description:
    "Free website monitoring SOW template for agencies: scope, confirmation rules, alert routing, reporting cadence and exclusions for care plans.",
  path: "/resources/monitoring-sow-template",
  keywords: [
    "website monitoring sow",
    "monitoring scope of work template",
    "agency care plan monitoring clause",
    "uptime monitoring contract language",
  ],
  image: "/resources/monitoring-sow-template/opengraph-image",
});

export default function MonitoringSowTemplatePage() {
  const published = "2026-11-17";
  return (
    <MarketingShell>
      <JsonLd
        data={[
          articleLd({
            title: "Website monitoring SOW template for agencies",
            description: "Copy-ready scope language for care plans and retainers.",
            path: "/resources/monitoring-sow-template",
            published,
            updated: published,
            keywords: ["monitoring sow", "care plan monitoring"],
          }),
          faqLd(FAQS),
          breadcrumbLd([
            ["Home", "/"],
            ["Resources", "/resources"],
            ["Monitoring SOW template", "/resources/monitoring-sow-template"],
          ]),
        ]}
      />
      <PageHero
        crumbs={[
          ["Home", "/"],
          ["Resources", "/resources"],
          ["Monitoring SOW", "/resources/monitoring-sow-template"],
        ]}
        eyebrow="Template"
        title="Website monitoring SOW template"
        intro="Paste into care plans so “we monitor your site” means named URLs, confirmation rules, alerts and a monthly report — not vibes."
      />

      <div className="mx-auto max-w-3xl space-y-10 px-6">
        {BLOCKS.map((b) => (
          <section key={b.h}>
            <h2 className="text-xl font-medium text-ink">{b.h}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-plum-2">
              {b.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        ))}

        <p className="text-[15px] leading-relaxed text-plum-2">
          Pair this SOW with the{" "}
          <Link href="/resources/sample-client-uptime-report" className="link-underline text-plum">
            sample uptime report
          </Link>
          , the{" "}
          <Link href="/resources/agency-monitoring-playbook-india" className="link-underline text-plum">
            India agency playbook
          </Link>
          , and the primary product page for{" "}
          <Link href="/website-monitoring-for-agencies" className="link-underline text-plum">
            website monitoring for agencies
          </Link>
          .
        </p>
      </div>

      <FaqList faqs={FAQS} />
      <CtaBand title="Scope on paper. Checks in production." body="Start free for 3 days — put the SOW URLs on real monitors." />
    </MarketingShell>
  );
}
