import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CtaBand, JsonLd, MarketingShell, MotionGrid, MotionTile, PageHero } from "@/components/marketing/Site";
import { GLOSSARY } from "@/lib/glossary";
import { collectionPageLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Website Monitoring Glossary: Uptime, SSL, SEO Terms | Watchfront",
  description:
    "Plain-English glossary of website monitoring terms: uptime, downtime, SSL, noindex, canonicals, synthetic monitoring, MTTR, SLA and more.",
  path: "/glossary",
  keywords: [
    "website monitoring glossary",
    "uptime definition",
    "SSL certificate meaning",
    "what is synthetic monitoring",
    "HTTP status code",
  ],
  ogTitle: "Website Monitoring Glossary | Watchfront",
  ogDescription: "Definitions for uptime, SSL, noindex, synthetic monitoring and more — written for agencies.",
  image: "/glossary/opengraph-image",
});

export default function GlossaryPage() {
  const terms = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));
  return (
    <MarketingShell>
      <JsonLd
        data={collectionPageLd({
          name: "Website monitoring glossary",
          description: "Plain-English definitions for monitoring, SSL and SEO terms",
          path: "/glossary",
          children: terms.map((t) => ({ name: t.term, path: `/glossary/${t.slug}` })),
        })}
      />
      <PageHero
        crumbs={[["Home", "/"], ["Glossary", "/glossary"]]}
        eyebrow="Glossary"
        title="Website monitoring terms, explained plainly"
        intro="Short definitions for the words agencies actually use — uptime, SSL, noindex, synthetic checks and more — so proposals and client reports stay clear."
      />
      <MotionGrid className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {terms.map((t) => (
          <MotionTile key={t.slug}>
            <Link
              href={`/glossary/${t.slug}`}
              className="group flex h-full flex-col rounded-[1.75rem] bg-cream p-7 ring-1 ring-plum/8 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:ring-magenta/20"
            >
              <h2 className="text-lg font-medium text-ink group-hover:text-magenta">{t.term}</h2>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-plum-2">{t.definition}</p>
              <span className="mt-6 text-sm text-plum">
                <span className="link-underline">Read definition</span>{" "}
                <ArrowRight className="inline h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          </MotionTile>
        ))}
      </MotionGrid>
      <CtaBand title="Definitions are step one. Monitoring is the job." body="Put uptime, SSL, forms and SEO checks on every client site — free for 3 days." />
    </MarketingShell>
  );
}
