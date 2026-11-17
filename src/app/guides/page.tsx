import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CtaBand, JsonLd, MarketingShell, MotionGrid, MotionTile, PageHero } from "@/components/marketing/Site";
import { GUIDES } from "@/lib/guides";
import { collectionPageLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Website Monitoring Guides & Checklists | Watchfront",
  description:
    "Practical guides on uptime, WordPress monitoring, SSL expiry, API checks, broken links, contact forms and how to choose a website monitoring tool.",
  path: "/guides",
  keywords: [
    "website monitoring guide",
    "wordpress uptime monitoring",
    "how to choose website monitoring tool",
    "ssl monitoring",
    "fix broken links",
    "contact form monitoring",
  ],
  ogTitle: "Website Monitoring Guides & Checklists | Watchfront",
  ogDescription: "Guides for agencies: WordPress uptime, SSL, APIs, broken links, forms and tool selection.",
  image: "/guides/opengraph-image",
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
        intro="Plain-English, practical guides on uptime, outages, SSL, forms and maintenance - written for agencies and freelancers. New to a term? Start in the glossary."
      />
      <p className="mx-auto -mt-6 mb-10 max-w-6xl px-6 text-sm text-plum-2">
        <Link href="/glossary" className="link-underline text-plum">
          Open the website monitoring glossary
        </Link>
        {" — uptime, SSL, noindex, synthetic monitoring and more."}
      </p>
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
