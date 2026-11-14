import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CtaBand, JsonLd, MarketingShell, MotionGrid, MotionTile, PageHero } from "@/components/marketing/Site";
import { COMPARISONS } from "@/lib/compare";
import { collectionPageLd, hierarchicalTitle, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: hierarchicalTitle("Compare website monitoring tools"),
  description: "Compare Watchfront with UptimeRobot, Pingdom, StatusCake, Better Stack and Site24x7 - honest notes on who each tool suits best.",
  path: "/compare",
  keywords: ["website monitoring tools comparison", "uptimerobot alternative", "pingdom alternative", "best uptime monitoring tool"],
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
      <CtaBand />
    </MarketingShell>
  );
}
