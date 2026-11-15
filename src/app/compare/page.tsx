import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CtaBand, JsonLd, MarketingShell, MotionGrid, MotionTile, PageHero } from "@/components/marketing/Site";
import { COMPARISONS } from "@/lib/compare";
import { collectionPageLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Website Monitoring Tools Compared | Watchfront",
  description: "Compare Watchfront with UptimeRobot, Pingdom, StatusCake, Better Stack and Site24x7 - honest notes on who each tool suits best.",
  path: "/compare",
  keywords: ["website monitoring tools comparison", "uptimerobot alternative", "pingdom alternative", "best uptime monitoring tool"],
  ogTitle: "Website Monitoring Tools Compared | Watchfront",
  ogDescription: "Honest comparisons of Watchfront vs UptimeRobot, Pingdom, StatusCake and more.",
  image: "/compare/opengraph-image",
});

export default function ComparePage() {
  return (
    <MarketingShell>
      <JsonLd data={collectionPageLd({
        name: "Compare website monitoring tools",
        description: "Watchfront compared with popular monitoring tools",
        path: "/compare",
        children: COMPARISONS.map((c) => ({ name: `${c.competitor} alternative`, path: `/compare/${c.slug}` })),
      })} />
      <PageHero
        crumbs={[["Home", "/"], ["Compare", "/compare"]]}
        eyebrow="Compare"
        title="How Watchfront compares to other monitoring tools"
        intro="Honest comparisons - including when another tool is the better fit. Watchfront is built for agencies watching many client websites."
      />
      <MotionGrid className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {COMPARISONS.map((c) => (
          <MotionTile key={c.slug}>
            <Link href={`/compare/${c.slug}`} className="group flex h-full flex-col rounded-[1.75rem] bg-cream p-7 ring-1 ring-plum/8 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:ring-magenta/20">
              <h2 className="text-lg font-medium text-ink group-hover:text-magenta">Watchfront vs {c.competitor}</h2>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-plum-2">{c.intro.split(". ")[0]}.</p>
              <span className="mt-6 text-sm text-plum"><span className="link-underline">Read comparison</span> <ArrowRight className="inline h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>
          </MotionTile>
        ))}
      </MotionGrid>
      <section className="mx-auto mt-20 max-w-3xl px-6 text-[16px] leading-relaxed text-plum-2">
        <h2 className="text-2xl font-medium text-ink">How to choose a website monitoring tool</h2>
        <p className="mt-4">
          Most monitoring tools check whether a URL answers. That catches full outages but misses the problems clients actually notice: an expired SSL certificate, a contact form that silently stops sending, a layout broken by a theme update, or a page that lost its title tag. Before you pick a tool, list what has gone wrong on your sites in the last year and check which tool would have caught it.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li><strong className="text-ink">Check frequency and locations</strong> - how quickly you hear about downtime, and whether false alarms are filtered out.</li>
          <li><strong className="text-ink">Depth of checks</strong> - SSL and domain expiry, <Link href="/features/form-journey-testing" className="link-underline text-plum">form and journey testing</Link>, visual changes, APIs and JavaScript errors.</li>
          <li><strong className="text-ink">Multi-client workflow</strong> - grouping sites by client and sending <Link href="/features/client-reports" className="link-underline text-plum">client-ready reports</Link>.</li>
          <li><strong className="text-ink">Alert channels</strong> - email, Slack or WhatsApp, with enough evidence to fix the problem fast.</li>
        </ul>
        <p className="mt-4">
          Watchfront is built for <Link href="/use-cases/web-agencies" className="link-underline text-plum">agencies looking after many client websites</Link>. If you only need a ping check on one personal site, a simpler tool may suit you better, and the comparisons above say so. You can also try our <Link href="/tools" className="link-underline text-plum">free website checkers</Link> first.
        </p>
      </section>
      <CtaBand />
    </MarketingShell>
  );
}
