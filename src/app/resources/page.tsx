import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CtaBand, JsonLd, MarketingShell, MotionGrid, MotionTile, PageHero } from "@/components/marketing/Site";
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
      />
      <MotionGrid className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {ASSETS.map((a) => (
          <MotionTile key={a.href}>
            <Link
              href={a.href}
              className="group flex h-full flex-col rounded-[1.75rem] bg-cream p-7 ring-1 ring-plum/8 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
            >
              <h2 className="text-lg font-medium text-ink group-hover:text-magenta">{a.title}</h2>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-plum-2">{a.body}</p>
              <span className="mt-6 text-sm text-plum">
                <span className="link-underline">Open</span> <ArrowRight className="inline h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          </MotionTile>
        ))}
      </MotionGrid>
      <CtaBand title="Resources teach. Monitoring delivers." body="Put the playbook on a real client site — free for 3 days." />
    </MarketingShell>
  );
}
