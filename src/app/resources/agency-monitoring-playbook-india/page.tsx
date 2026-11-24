import Link from "next/link";
import { CtaBand, FaqList, JsonLd, MarketingShell, MotionSection, PageHero, PageSection } from "@/components/marketing/Site";
import { articleLd, breadcrumbLd, faqLd, howToLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Agency Website Monitoring Playbook for India | Watchfront",
  description:
    "Original playbook for Indian web agencies: monitoring stack, SOW language, alert routing, WordPress care-plan rhythm and monthly reporting — free to use.",
  path: "/resources/agency-monitoring-playbook-india",
  keywords: [
    "agency monitoring playbook",
    "website monitoring playbook India",
    "agency care plan monitoring",
    "Indian web agency monitoring",
  ],
  image: "/resources/agency-monitoring-playbook-india/opengraph-image",
});

const FAQS = [
  {
    q: "Is this a paid ranking study?",
    a: "No. It is an operating playbook based on how agency retainers actually fail and renew in India — not a fabricated survey.",
  },
  {
    q: "Can I use this in client proposals?",
    a: "Yes. Adapt the SOW language and stack. Link back if you republish substantial excerpts.",
  },
  {
    q: "Does Watchfront implement this playbook?",
    a: "Yes — uptime, SSL, forms, SEO and client reports map onto the stack below.",
  },
];

export default function PlaybookPage() {
  const published = "2026-11-17";
  return (
    <MarketingShell>
      <JsonLd
        data={[
          articleLd({
            title: "Agency website monitoring playbook for India",
            description: "Operating playbook for Indian agencies running website retainers.",
            path: "/resources/agency-monitoring-playbook-india",
            published,
            updated: published,
            keywords: ["agency monitoring playbook", "India"],
          }),
          howToLd({
            name: "Run an agency monitoring playbook",
            description: "Stack, SOW, alerts and monthly rhythm for Indian web agencies.",
            path: "/resources/agency-monitoring-playbook-india",
            totalTime: "PT20M",
            steps: [
              { name: "Define the stack", text: "Uptime, SSL/domain, form journeys, SEO hygiene, reports." },
              { name: "Write the SOW", text: "Name URLs, journeys, alert windows and out-of-scope lines." },
              { name: "Route alerts", text: "Owner per client, quiet hours, escalation after delay." },
              { name: "Ship the monthly report", text: "Uptime %, incidents, SSL days, next decision." },
            ],
          }),
          faqLd(FAQS),
          breadcrumbLd([
            ["Home", "/"],
            ["Resources", "/resources"],
            ["India playbook", "/resources/agency-monitoring-playbook-india"],
          ]),
        ]}
      />
      <PageHero
        crumbs={[
          ["Home", "/"],
          ["Resources", "/resources"],
          ["India playbook", "/resources/agency-monitoring-playbook-india"],
        ]}
        eyebrow="Original playbook"
        title="Agency website monitoring playbook for India"
        intro="A practical operating system for retainers — stack, SOW, alerts and reporting. Built for Indian agencies juggling WordPress and marketing sites across hosts and time zones."
      />

      <PageSection narrow className="!mt-12 sm:!mt-14">
      <MotionSection>
      <article className="space-y-12 text-[15px] leading-relaxed text-plum-2">
        <section>
          <h2 className="text-2xl font-medium tracking-tight text-ink">1. The non-negotiable stack</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[16px] leading-relaxed text-plum-2">
            <li>
              <Link href="/uptime-monitoring-tool" className="link-underline text-plum">
                Uptime
              </Link>{" "}
              on money URLs (1-minute, confirmed failures)
            </li>
            <li>
              <Link href="/ssl-certificate-monitoring" className="link-underline text-plum">
                SSL
              </Link>{" "}
              +{" "}
              <Link href="/domain-expiry-monitoring" className="link-underline text-plum">
                domain expiry
              </Link>
            </li>
            <li>
              At least one{" "}
              <Link href="/contact-form-monitoring" className="link-underline text-plum">
                form journey
              </Link>{" "}
              per lead-gen site
            </li>
            <li>
              Scheduled{" "}
              <Link href="/features/seo-audit" className="link-underline text-plum">
                SEO hygiene
              </Link>{" "}
              on campaign pages
            </li>
            <li>
              Monthly{" "}
              <Link href="/features/client-reports" className="link-underline text-plum">
                client report
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight text-ink">2. SOW language that survives WhatsApp</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-plum-2">
            Ambiguous “we’ll keep an eye on things” creates angry threads. Name URLs, journeys, alert channels, business hours vs 24/7, and what is out of scope. Steal structure from{" "}
            <Link href="/guides/how-to-write-monitoring-into-care-plans" className="link-underline text-plum">
              how to write monitoring into care plans
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight text-ink">3. Alert routing for small teams</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[16px] leading-relaxed text-plum-2">
            <li>One owner per client folder</li>
            <li>Quiet hours for non-critical noise</li>
            <li>Escalate unacknowledged critical incidents after a fixed delay</li>
            <li>Never page the whole agency for a single retryable blip</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight text-ink">4. Weekly / monthly rhythm</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[16px] leading-relaxed text-plum-2">
            <li>Continuous synthetics — not Monday tab theatre</li>
            <li>After plugin updates: re-run the money form journey before closing the ticket</li>
            <li>Month-end: export the report, add one recommended next step</li>
          </ul>
          <p className="mt-4 text-[16px] leading-relaxed text-plum-2">
            Template:{" "}
            <Link href="/resources/sample-client-uptime-report" className="link-underline text-plum">
              sample client uptime report
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-medium tracking-tight text-ink">5. Pricing posture</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-plum-2">
            Unpriced monitoring is unpaid emergency labour. Use tiers (essential / growth / protect) from{" "}
            <Link href="/blog/price-monitoring-into-the-retainer" className="link-underline text-plum">
              how to price monitoring into retainers
            </Link>
            .
          </p>
        </section>
      </article>
      </MotionSection>
      </PageSection>

      <FaqList faqs={FAQS} />
      <CtaBand title="Run the playbook on a real portfolio." body="Start free for 3 days — every feature, no card." />
    </MarketingShell>
  );
}
