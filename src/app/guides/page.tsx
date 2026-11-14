import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CtaBand, JsonLd, MarketingShell, MotionGrid, MotionTile, PageHero } from "@/components/marketing/Site";
import { GUIDES } from "@/lib/guides";
import { collectionPageLd, hierarchicalTitle, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: hierarchicalTitle("Website monitoring guides"),
  description: "Practical guides on uptime monitoring, fixing a down website, SSL expiry, broken contact forms and monthly website maintenance for agencies.",
  path: "/guides",
  keywords: ["website monitoring guide", "uptime monitoring guide", "website maintenance checklist", "agency guides"],
});

export default function GuidesPage() {
  return (
    <MarketingShell>
      <JsonLd data={collectionPageLd({
        name: "Website monitoring guides",
        description: "Guides for agencies and developers who look after websites",
        path: "/guides",
        children: GUIDES.map((g) => ({ name: g.h1, path: `/guides/${g.slug}` })),
      })} />
      <PageHero
        crumbs={[["Home", "/"], ["Guides", "/guides"]]}
        eyebrow="Guides"
        title="Guides for people who keep websites running"
        intro="Plain-English, practical guides on uptime, outages, SSL, forms and maintenance - written for agencies and freelancers."
      />
      <MotionGrid className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {GUIDES.map((g) => (
          <MotionTile key={g.slug}>
            <Link href={`/guides/${g.slug}`} className="group flex h-full flex-col rounded-[1.75rem] bg-cream p-7 ring-1 ring-plum/8 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:ring-magenta/20">
              <span className="text-xs text-plum/55">{g.readMins} min read</span>
              <h2 className="mt-2 text-lg font-medium text-ink group-hover:text-magenta">{g.h1}</h2>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-plum-2">{g.description}</p>
              <span className="mt-6 text-sm text-plum"><span className="link-underline">Read guide</span> <ArrowRight className="inline h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>
          </MotionTile>
        ))}
      </MotionGrid>
      <CtaBand />
    </MarketingShell>
  );
}
