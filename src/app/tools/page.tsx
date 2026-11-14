import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CtaBand, JsonLd, MarketingShell, MotionGrid, MotionTile, PageHero } from "@/components/marketing/Site";
import { collectionPageLd, hierarchicalTitle, pageMeta } from "@/lib/seo";
import { TOOLS } from "@/lib/tools";

export const metadata = pageMeta({
  title: hierarchicalTitle("Free website tools"),
  description: "Free website tools: check if a site is down, check SSL certificate expiry, and run an on-page SEO audit. Instant results, no signup.",
  path: "/tools",
  keywords: ["free website tools", "website checker", "ssl checker", "seo checker", "website down checker"],
});

export default function ToolsPage() {
  return (
    <MarketingShell>
      <JsonLd data={collectionPageLd({
        name: "Free website tools",
        description: "Free website status, SSL and SEO checkers",
        path: "/tools",
        children: TOOLS.map((t) => ({ name: t.name, path: `/tools/${t.slug}` })),
      })} />
      <PageHero
        crumbs={[["Home", "/"], ["Free tools", "/tools"]]}
        eyebrow="Free tools"
        title="Free website checkers. Instant answers, no signup."
        intro="Check whether a site is down, when its SSL certificate expires, or how its on-page SEO scores - the same engines that power Watchfront monitoring."
      />
      <MotionGrid className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-3">
        {TOOLS.map((t) => (
          <MotionTile key={t.slug}>
            <Link href={`/tools/${t.slug}`} className="group flex h-full flex-col rounded-[1.75rem] bg-cream p-7 ring-1 ring-plum/8 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:ring-magenta/20">
              <h2 className="text-lg font-medium text-ink group-hover:text-magenta">{t.name}</h2>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-plum-2">{t.short}</p>
              <span className="mt-6 text-sm text-plum"><span className="link-underline">Open tool</span> <ArrowRight className="inline h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>
          </MotionTile>
        ))}
      </MotionGrid>
      <CtaBand title="Checks once are good. Checks every minute are better." body="Monitor uptime, SSL, SEO and forms continuously - free for 3 days." />
    </MarketingShell>
  );
}
