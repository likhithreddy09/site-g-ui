import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FEATURE_ICONS } from "@/components/marketing/featureIcons";
import { CtaBand, JsonLd, MarketingShell, PageHero } from "@/components/marketing/Site";
import { FEATURES } from "@/lib/marketing";
import { pageMeta } from "@/lib/seo";
import { abs } from "@/lib/site";

export const metadata = pageMeta({
  title: "Website Monitoring Features — Uptime, SSL, Forms, API & JS Errors",
  description: "Website monitoring features for agencies: uptime monitoring, SSL & domain expiry, broken link & visual checks, contact form monitoring, API monitoring, JavaScript error tracking and white-label client reports.",
  path: "/features",
  keywords: ["website monitoring features", "uptime SSL form monitoring", "API monitoring", "JavaScript error monitoring", "client website reports"],
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
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "ItemList", name: "Watchfront features",
        itemListElement: FEATURES.map((f, i) => ({ "@type": "ListItem", position: i + 1, name: f.name, url: abs(`/features/${f.slug}`) })),
      }} />
      <PageHero
        crumbs={[["Home", "/"], ["Features", "/features"]]}
        eyebrow="Website monitoring features"
        title="Everything that can break on a client website — checked for you."
        intro="Uptime, SSL, forms, APIs, visual checks and JS errors — seven kinds of website monitoring in one record. Set up in minutes by anyone on your team."
      />
      <section className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => {
          const Icon = FEATURE_ICONS[f.slug];
          return (
            <Link key={f.slug} href={`/features/${f.slug}`} className="group flex flex-col rounded-3xl bg-cream p-7 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-magenta ring-1 ring-plum/10"><Icon className="h-5 w-5" /></span>
              <h2 className="mt-5 text-xl font-semibold text-ink group-hover:text-magenta">{f.name}</h2>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-plum-2">{f.short}</p>
              <span className="mt-6 text-sm text-plum"><span className="link-underline">Learn more</span> <ArrowRight className="inline h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>
          );
        })}
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-6">
        <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">And the parts that tie it together</h2>
        <div className="mt-10 grid gap-x-12 md:grid-cols-2">
          {EXTRAS.map(([t, d]) => (
            <div key={t} className="border-t border-plum/10 py-6">
              <h3 className="text-lg font-semibold text-ink">{t}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-plum-2">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </MarketingShell>
  );
}
