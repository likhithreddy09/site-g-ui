import Link from "next/link";
import {
  CtaBand,
  JsonLd,
  LinkRow,
  MarketingShell,
  MotionGrid,
  MotionTile,
  PageHero,
} from "@/components/marketing/Site";
import { collectionPageLd, pageMeta } from "@/lib/seo";

const ASSETS = [
  {
    href: "/resources/sample-client-uptime-report",
    title: "Sample client uptime report",
    body: "A concrete report outline agencies can copy into retainers — metrics, incidents, SSL, next steps.",
  },
  {
    href: "/resources/agency-monitoring-playbook-india",
    title: "Agency monitoring playbook (India)",
    body: "An original operating playbook: stack, SOW language, alert routing and monthly rhythm for Indian agencies.",
  },
  {
    href: "/resources/cost-of-downtime",
    title: "Cost of downtime calculator",
    body: "Turn outage hours into a revenue-at-risk estimate clients understand — planning math, not fake surveys.",
  },
  {
    href: "/resources/monitoring-sow-template",
    title: "Monitoring SOW template",
    body: "Copy-ready scope language for care plans: checks, SLAs, reporting cadence and exclusions.",
  },
  {
    href: "/resources/uptime-measurement-methodology",
    title: "Uptime measurement methodology",
    body: "How Watchfront defines checks, confirmation, uptime % and evidence — shareable with clients.",
  },
  {
    href: "/glossary",
    title: "Monitoring glossary",
    body: "Plain-English definitions for uptime, SSL, noindex, synthetic monitoring and more.",
  },
  {
    href: "/guides",
    title: "Guides & checklists",
    body: "Practical how-tos for outages, forms, SSL, WordPress and tool selection.",
  },
  {
    href: "/blog",
    title: "Blog",
    body: "Ops essays on silent failures, care plans and what renews retainers.",
  },
  {
    href: "/compare",
    title: "Comparisons",
    body: "Honest Watchfront vs UptimeRobot, Pingdom, ManageWP and more.",
  },
  {
    href: "/blog/best-website-monitoring-tools-india-2026",
    title: "Best monitoring tools for Indian agencies (2026)",
    body: "A practical shortlist for retainers — not a US mega-list for SaaS engineering teams.",
  },
  {
    href: "/guides/how-to-sell-website-monitoring",
    title: "How to sell website monitoring",
    body: "Pitch risk + SOW + first-month proof so the line item renews.",
  },
  {
    href: "/website-monitoring-tool-india",
    title: "Website monitoring tool (India)",
    body: "The India-focused product page for agencies who need IST-friendly monitoring.",
  },
];

export const metadata = pageMeta({
  title: "Agency Monitoring Resources & Playbooks | Watchfront",
  description:
    "Free agency monitoring resources: sample uptime report, India playbook, glossary, guides and comparisons — built for retainers, not vanity dashboards.",
  path: "/resources",
  keywords: [
    "website monitoring resources",
    "agency uptime report template",
    "monitoring playbook agencies",
    "website monitoring glossary",
  ],
  image: "/resources/opengraph-image",
});

export default function ResourcesPage() {
  return (
    <MarketingShell>
      <JsonLd
        data={collectionPageLd({
          name: "Agency monitoring resources",
          description: "Playbooks, sample reports, glossary and guides for agencies",
          path: "/resources",
          children: ASSETS.map((a) => ({ name: a.title, path: a.href })),
        })}
      />
      <PageHero
        crumbs={[["Home", "/"], ["Resources", "/resources"]]}
        eyebrow="Resources"
        title="Resources that help you sell and run monitoring"
        intro="Linkable assets for agencies: a sample client report, an India operating playbook, glossary definitions and the guides that back your SOW."
      >
        <p className="text-[14px] text-plum-2">
          Also see{" "}
          <Link href="/features" className="link-underline text-plum">
            features
          </Link>{" "}
          and{" "}
          <Link href="/tools" className="link-underline text-plum">
            free tools
          </Link>
          .
        </p>
      </PageHero>

      <MotionGrid className="mx-auto max-w-6xl px-5 sm:px-6" stagger={0.05}>
        <div className="divide-y divide-plum/10 border-b border-plum/10">
          {ASSETS.map((a, i) => (
            <MotionTile key={a.href}>
              <LinkRow
                href={a.href}
                index={String(i + 1).padStart(2, "0")}
                title={a.title}
                body={a.body}
                meta="Open"
              />
            </MotionTile>
          ))}
        </div>
      </MotionGrid>
      <CtaBand title="Resources teach. Monitoring delivers." body="Put the playbook on a real client site — free for 3 days." />
    </MarketingShell>
  );
}
