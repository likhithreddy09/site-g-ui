import Link from "next/link";
import { CtaBand, FaqList, JsonLd, MarketingShell, MotionSection, PageHero, PageSection } from "@/components/marketing/Site";
import { DowntimeCostCalculator } from "@/components/marketing/DowntimeCostCalculator";
import { breadcrumbLd, faqLd, pageMeta, webAppLd } from "@/lib/seo";

const FAQS = [
  {
    q: "Is this calculator exact?",
    a: "No. It is a planning estimate using revenue-per-hour × downtime hours × an impact factor. Use it for conversations, not accounting.",
  },
  {
    q: "Where do the inputs come from?",
    a: "You provide monthly revenue and estimated downtime hours. Impact factor defaults to 1.0 for full outages; lower it for partial degradation.",
  },
  {
    q: "How does monitoring reduce cost?",
    a: "Faster detection shortens downtime minutes. Pair uptime alerts with form journeys so “up but not converting” is not invisible.",
  },
];

export const metadata = pageMeta({
  title: "Cost of Website Downtime Calculator | Watchfront",
  description:
    "Free cost of website downtime calculator for agencies: estimate revenue at risk from outages, then pair with uptime monitoring and client reports.",
  path: "/resources/cost-of-downtime",
  keywords: [
    "cost of website downtime",
    "downtime cost calculator",
    "website downtime cost",
    "cost of downtime for agencies",
  ],
  image: "/resources/cost-of-downtime/opengraph-image",
});

export default function CostOfDowntimePage() {
  return (
    <MarketingShell>
      <JsonLd
        data={[
          webAppLd({
            name: "Cost of website downtime calculator",
            description: "Estimate revenue at risk from website downtime hours.",
            path: "/resources/cost-of-downtime",
          }),
          faqLd(FAQS),
          breadcrumbLd([
            ["Home", "/"],
            ["Resources", "/resources"],
            ["Cost of downtime", "/resources/cost-of-downtime"],
          ]),
        ]}
      />
      <PageHero
        crumbs={[
          ["Home", "/"],
          ["Resources", "/resources"],
          ["Cost of downtime", "/resources/cost-of-downtime"],
        ]}
        eyebrow="Calculator"
        title="Cost of website downtime (planning estimate)"
        intro="Translate downtime hours into a rupee/dollar conversation your client understands — then show how monitoring shortens detection."
      />

      <PageSection narrow className="!mt-12 sm:!mt-14">
      <MotionSection>
        <DowntimeCostCalculator />
        <p className="mt-8 text-[15px] leading-relaxed text-plum-2">
          Next: put continuous checks on the money URLs with the{" "}
          <Link href="/uptime-monitoring-tool" className="link-underline text-plum">
            uptime monitoring tool
          </Link>{" "}
          and show the outcome in a{" "}
          <Link href="/resources/sample-client-uptime-report" className="link-underline text-plum">
            client uptime report
          </Link>
          .
        </p>
      </MotionSection>
      </PageSection>

      <FaqList faqs={FAQS} />
      <CtaBand title="Estimates persuade. Monitoring proves." body="Start free for 3 days on a real client site." />
    </MarketingShell>
  );
}
