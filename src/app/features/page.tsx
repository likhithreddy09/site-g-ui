import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FEATURE_ICONS } from "@/components/marketing/featureIcons";
import { CtaBand, JsonLd, MarketingShell, MotionGrid, MotionSection, MotionTile, PageHero } from "@/components/marketing/Site";
import { FEATURES } from "@/lib/marketing";
import { collectionPageLd, hierarchicalTitle, pageMeta } from "@/lib/seo";
import { abs } from "@/lib/site";

export const metadata = pageMeta({
  title: hierarchicalTitle("Features"),
  description: "See what Watchfront checks: uptime, SSL, SEO, forms, APIs, JS errors and client reports - built for agencies looking after many sites.",
  path: "/features",
  keywords: ["website monitoring features", "uptime monitoring", "SSL monitoring", "form monitoring", "SEO audit"],
  ogTitle: hierarchicalTitle("Features"),
  ogDescription: "Uptime, SSL, SEO, forms, APIs, JS errors and client reports - one toolkit for agency portfolios.",
});

const EXTRAS = [
  ["Incident management", "Related failures grouped into one incident with severity, owner, notes and a full timeline. Recurring problems reopen automatically."],
  ["AI-assisted diagnosis", "Plain-English summaries grounded in captured evidence, keeping what was observed separate from what is suspected."],
  ["Alerts where you work", "Email alerts today, with quiet hours and routing. WhatsApp notifications coming soon."],
  ["Team & client roles", "Owners, admins, developers and read-only client access scoped to their own websites."],
];

export default function FeaturesPage() {
  return (
    <MarketingShell>
      <JsonLd data={[
        collectionPageLd({
          name: "Features",
          description: "Watchfront website monitoring features",
          path: "/features",
          children: FEATURES.map((f) => ({ name: f.name, path: `/features/${f.slug}` })),
        }),
        {
          "@context": "https://schema.org", "@type": "ItemList", name: "Watchfront features",
          itemListElement: FEATURES.map((f, i) => ({ "@type": "ListItem", position: i + 1, name: f.name, url: abs(`/features/${f.slug}`) })),
        },
      ]} />
      <PageHero
        crumbs={[["Home", "/"], ["Features", "/features"]]}
        eyebrow="Features"
        title="Everything that can break on a client website - checked for you."
        intro="Uptime, SSL, forms, APIs, visual checks and JS errors - seven kinds of website monitoring in one record. Set up in minutes by anyone on your team."
      />
      <MotionGrid className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => {
          const Icon = FEATURE_ICONS[f.slug];
          return (
            <MotionTile key={f.slug}>
              <Link href={`/features/${f.slug}`} className="group flex h-full flex-col rounded-[1.75rem] bg-cream p-7 ring-1 ring-plum/8 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:ring-magenta/20">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-sky"><Icon className="h-5 w-5" /></span>
                <h2 className="mt-5 text-lg font-medium text-ink group-hover:text-magenta">{f.name}</h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-plum-2">{f.short}</p>
                <span className="mt-6 text-sm text-plum"><span className="link-underline">Learn more</span> <ArrowRight className="inline h-4 w-4 transition group-hover:translate-x-1" /></span>
              </Link>
            </MotionTile>
          );
        })}
      </MotionGrid>

      <MotionSection className="mx-auto mt-24 max-w-6xl px-6" variant="left">
        <div className="rounded-[2rem] bg-ink px-8 py-12 text-cream md:px-12">
          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">And the parts that tie it together</h2>
          <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {EXTRAS.map(([t, d]) => (
              <div key={t} className="border-t border-white/15 pt-6">
                <h3 className="text-base font-medium text-sky">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-cream/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>
      <CtaBand />
    </MarketingShell>
  );
}
