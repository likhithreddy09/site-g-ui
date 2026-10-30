import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand, JsonLd, MarketingShell, MotionGrid, MotionTile, PageHero } from "@/components/marketing/Site";
import { USE_CASES, audience } from "@/lib/marketing";
import { pageMeta } from "@/lib/seo";
import { abs } from "@/lib/site";

export const metadata = pageMeta({
  title: "Who Watchfront is for | Agencies, WordPress & freelancers",
  description: "Built for web agencies, WordPress maintainers, marketing teams and freelancers who look after client websites every week.",
  path: "/use-cases",
  keywords: [
    "website monitoring for agencies",
    "WordPress website monitoring",
    "landing page monitoring",
    "website monitoring for freelancers",
  ],
  ogTitle: "Who Watchfront is for",
  ogDescription: "Web agencies, WordPress care plans, marketing teams and freelancers - monitor client sites without the Monday manual check.",
});

export default function UseCasesPage() {
  return (
    <MarketingShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Watchfront use cases",
          itemListElement: USE_CASES.map((u, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: u.name,
            url: abs(`/use-cases/${u.slug}`),
            description: u.description,
          })),
        }}
      />
      <PageHero
        crumbs={[["Home", "/"], ["Use cases", "/use-cases"]]}
        eyebrow="Who Watchfront is for"
        title="Built for teams who look after other people’s websites."
        intro="Same product, different workflows - pick the path that matches how you work with clients."
      />
      <MotionGrid className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2" stagger={0.1}>
        {USE_CASES.map((u, i) => (
          <MotionTile key={u.slug}>
            <Link
              href={`/use-cases/${u.slug}`}
              className={`group flex h-full flex-col rounded-[1.75rem] p-8 ring-1 transition hover:-translate-y-1 hover:shadow-xl ${
                i % 2 === 0
                  ? "bg-cream text-ink ring-plum/8 hover:ring-magenta/20"
                  : "bg-ink text-cream ring-ink hover:ring-sky/40"
              }`}
            >
              <p className={`text-sm font-medium ${i % 2 === 0 ? "text-magenta" : "text-sky"}`}>For {audience(u)}</p>
              <h2 className={`mt-2 text-2xl font-medium tracking-tight ${i % 2 === 0 ? "group-hover:text-magenta" : "group-hover:text-sky"}`}>{u.name}</h2>
              <p className={`mt-3 flex-1 text-[15px] leading-relaxed ${i % 2 === 0 ? "text-plum-2" : "text-cream/70"}`}>{u.description}</p>
              <span className={`mt-6 inline-flex items-center gap-1 text-sm font-medium ${i % 2 === 0 ? "text-plum" : "text-sky"}`}>
                Read use case <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          </MotionTile>
        ))}
      </MotionGrid>
      <CtaBand title="Start with one client website." body="Free for 3 websites. No credit card, nothing to install on client sites." />
    </MarketingShell>
  );
}
