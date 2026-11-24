import Link from "next/link";
import { CtaBand, FaqList, JsonLd, MarketingShell, MotionSection, PageHero, PageSection } from "@/components/marketing/Site";
import { articleLd, breadcrumbLd, faqLd, pageMeta } from "@/lib/seo";

const FAQS = [
  {
    q: "Is 100% uptime realistic?",
    a: "Almost never for public internet sites. Honest reports show the measurement window, excluded maintenance, and which URLs were in scope.",
  },
  {
    q: "Do you invent industry averages?",
    a: "No. This page documents how Watchfront defines checks, confirmation and uptime % — not third-party survey numbers.",
  },
  {
    q: "Can agencies reuse this language?",
    a: "Yes. Point clients here or paraphrase it in your SOW so “uptime” means the same thing to both sides.",
  },
];

export const metadata = pageMeta({
  title: "How Watchfront Measures Website Uptime | Methodology",
  description:
    "Watchfront uptime measurement methodology: check intervals, confirmation rules, uptime %, exclusions and evidence — written for agencies and clients.",
  path: "/resources/uptime-measurement-methodology",
  keywords: [
    "uptime measurement methodology",
    "how uptime is calculated",
    "website uptime percentage",
    "uptime monitoring methodology",
  ],
  image: "/resources/uptime-measurement-methodology/opengraph-image",
});

export default function UptimeMethodologyPage() {
  const published = "2026-11-17";
  return (
    <MarketingShell>
      <JsonLd
        data={[
          articleLd({
            title: "How Watchfront measures website uptime",
            description: "Check intervals, confirmation, uptime % and exclusions.",
            path: "/resources/uptime-measurement-methodology",
            published,
            updated: published,
            keywords: ["uptime methodology", "uptime percentage"],
          }),
          faqLd(FAQS),
          breadcrumbLd([
            ["Home", "/"],
            ["Resources", "/resources"],
            ["Uptime methodology", "/resources/uptime-measurement-methodology"],
          ]),
        ]}
      />
      <PageHero
        crumbs={[
          ["Home", "/"],
          ["Resources", "/resources"],
          ["Methodology", "/resources/uptime-measurement-methodology"],
        ]}
        eyebrow="Methodology"
        title="How Watchfront measures website uptime"
        intro="Definitions first. If your SOW and your report disagree on what “up” means, the PDF is theatre."
      />

      <PageSection narrow className="!mt-12 sm:!mt-14">
      <MotionSection>
      <article className="space-y-10 text-[15px] leading-relaxed text-plum-2">
        <section>
          <h2 className="text-xl font-medium text-ink">1. What a check is</h2>
          <p className="mt-3">
            A check is an HTTP(S) request to a named URL on a schedule (commonly every 1–5 minutes). Success means an acceptable status code and, when configured, expected body or redirect behaviour. Failure means timeout, connection error, or unexpected status.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-medium text-ink">2. Confirmation before paging</h2>
          <p className="mt-3">
            A single failed probe is not an incident by default. Watchfront opens an incident after consecutive failures (threshold configurable). That reduces false pages without pretending brief blips never happened — they still appear in raw check history.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-medium text-ink">3. How uptime % is calculated</h2>
          <p className="mt-3">
            For a URL and period: uptime % = (time considered up ÷ total measured time) × 100. Time considered down starts when an incident opens and ends when recovery is confirmed. Planned maintenance windows marked in advance can be excluded when both parties agree.
          </p>
          <p className="mt-3">
            We do not average unrelated URLs into one vanity number without labelling them. Homepage uptime ≠ checkout uptime.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-medium text-ink">4. Evidence we keep</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Timestamp of first and last failed check</li>
            <li>Status code / error class when available</li>
            <li>Response timing for the failing probe</li>
            <li>Screenshot or content evidence on supported check types</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-medium text-ink">5. What this does not measure</h2>
          <p className="mt-3">
            Synthetic HTTP checks do not equal real-user experience everywhere. They do not replace RUM, SEO rankings, or conversion analytics. Pair them with{" "}
            <Link href="/contact-form-monitoring" className="link-underline text-plum">
              form journeys
            </Link>{" "}
            when “up but not converting” is the risk.
          </p>
        </section>
        <p>
          Related:{" "}
          <Link href="/uptime-monitoring-tool" className="link-underline text-plum">
            uptime monitoring tool
          </Link>
          ,{" "}
          <Link href="/resources/sample-client-uptime-report" className="link-underline text-plum">
            sample client report
          </Link>
          ,{" "}
          <Link href="/resources/monitoring-sow-template" className="link-underline text-plum">
            SOW template
          </Link>
          ,{" "}
          <Link href="/glossary/uptime" className="link-underline text-plum">
            uptime glossary
          </Link>
          .
        </p>
      </article>
      </MotionSection>
      </PageSection>

      <FaqList faqs={FAQS} />
      <CtaBand title="Methodology on paper. Checks in production." body="Start free for 3 days — measure the URLs in your SOW." />
    </MarketingShell>
  );
}
