import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FEATURE_ICONS } from "@/components/marketing/featureIcons";
import { CtaBand, JsonLd, MarketingShell, MotionGrid, MotionSection, MotionTile, PageHero, SectionHeader } from "@/components/marketing/Site";
import { FEATURES } from "@/lib/marketing";
import { collectionPageLd, pageMeta } from "@/lib/seo";
import { abs } from "@/lib/site";

export const metadata = pageMeta({
  title: "Website Monitoring Features: Uptime, SSL, SEO | Watchfront",
  description: "See what Watchfront checks: uptime, SSL, SEO, forms, APIs, JS errors and client reports - built for agencies looking after many sites.",
  path: "/features",
  keywords: ["website monitoring features", "uptime monitoring", "SSL monitoring", "form monitoring", "SEO audit", "website monitoring tool"],
  ogTitle: "Website Monitoring Features: Uptime, SSL, SEO | Watchfront",
  ogDescription: "Uptime, SSL, SEO, forms, APIs, JS errors and client reports - one toolkit for agency portfolios.",
  image: "/features/opengraph-image",
});

const EXTRAS = [
  ["Incident management", "Related failures grouped into one incident with severity, owner, notes and a full timeline."],
  ["AI-assisted diagnosis", "Plain-English summaries grounded in captured evidence — observed vs suspected."],
  ["Alerts where you work", "Email alerts today, with quiet hours and routing. WhatsApp coming soon."],
  ["Team & client roles", "Owners, admins, developers and read-only client access scoped to their sites."],
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
        title="Every check that keeps client sites honest."
        intro="Uptime, SSL, forms, APIs, visual checks and JS errors — one toolkit. Set up in minutes."
        image={{
          src: "/marketing/signal-abstract.jpg",
          alt: "Abstract illustration of monitoring signals in plum, magenta and sky",
        }}
      />

      <p className="mx-auto -mt-2 mb-6 max-w-6xl px-5 text-[14px] text-plum-2 sm:px-6">
        Jump to{" "}
        <Link href="/website-monitoring" className="link-underline text-plum">website monitoring</Link>,{" "}
        <Link href="/uptime-monitoring-tool" className="link-underline text-plum">uptime</Link>, or{" "}
        <Link href="/ssl-certificate-monitoring" className="link-underline text-plum">SSL monitoring</Link>.
      </p>

      {/* Editorial list — not a soft card grid */}
      <MotionGrid className="mx-auto max-w-6xl px-5 sm:px-6" stagger={0.05}>
        <div className="divide-y divide-plum/10 border-y border-plum/10">
          {FEATURES.map((f, i) => {
            const Icon = FEATURE_ICONS[f.slug];
            return (
              <MotionTile key={f.slug}>
                <Link
                  href={`/features/${f.slug}`}
                  className="group grid gap-3 py-6 transition sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-start sm:gap-5 sm:py-7"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-sky">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-[12px] text-mauve">{String(i + 1).padStart(2, "0")}</span>
                      <h2 className="text-lg font-medium text-ink transition group-hover:text-magenta sm:text-xl">
                        {f.name}
                      </h2>
                    </div>
                    <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-plum-2 sm:text-[15px]">
                      {f.short}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm text-plum sm:pt-1">
                    <span className="link-underline">Learn more</span>
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              </MotionTile>
            );
          })}
        </div>
      </MotionGrid>

      <MotionSection className="mx-auto mt-16 max-w-6xl px-5 sm:mt-20 sm:px-6" variant="left">
        <div className="rounded-[1.5rem] bg-ink px-6 py-10 text-cream sm:rounded-[2rem] sm:px-10 sm:py-12">
          <SectionHeader
            dark
            title="What ties it together"
            description="Incidents, diagnosis, alerts and roles — so checks become a workflow."
          />
          <div className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {EXTRAS.map(([t, d]) => (
              <div key={t} className="border-t border-white/15 pt-5">
                <h3 className="text-base font-medium text-sky">{t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-cream/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>
      <CtaBand />
    </MarketingShell>
  );
}
