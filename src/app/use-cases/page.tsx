import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand, JsonLd, MarketingShell, MotionGrid, MotionTile, PageHero } from "@/components/marketing/Site";
import { USE_CASES, audience } from "@/lib/marketing";
import { collectionPageLd, pageMeta } from "@/lib/seo";
import { abs } from "@/lib/site";

export const metadata = pageMeta({
  title: "Website Monitoring Use Cases for Agencies | Watchfront",
  description: "Built for web agencies, WordPress maintainers, marketing teams and freelancers who look after client websites every week.",
  path: "/use-cases",
  keywords: [
    "website monitoring for agencies",
    "WordPress website monitoring",
    "landing page monitoring",
    "website monitoring for freelancers",
  ],
  ogDescription: "Web agencies, WordPress care plans, marketing teams and freelancers - monitor client sites without the Monday manual check.",
  image: "/use-cases/opengraph-image",
});

export default function UseCasesPage() {
  return (
    <MarketingShell>
      <JsonLd
        data={[
          collectionPageLd({
            name: "Use cases",
            description: "Watchfront website monitoring by audience",
            path: "/use-cases",
            children: USE_CASES.map((u) => ({ name: u.name, path: `/use-cases/${u.slug}` })),
          }),
          {
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
          },
        ]}
      />
      <PageHero
        crumbs={[["Home", "/"], ["Use cases", "/use-cases"]]}
        eyebrow="Use cases"
        title="Built for people who look after websites."
        intro="Same product, different workflows — agencies, startups, freelancers and more."
        image={{
          src: "/marketing/agency-team.jpg",
          alt: "Illustrated team reviewing client websites together",
        }}
      />

      <MotionGrid className="mx-auto max-w-6xl px-5 sm:px-6" stagger={0.08}>
        <div className="divide-y divide-plum/10 border-y border-plum/10">
          {USE_CASES.map((u, i) => (
            <MotionTile key={u.slug}>
              <Link
                href={`/use-cases/${u.slug}`}
                className="group grid gap-2 py-7 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:items-start sm:gap-6 sm:py-8"
              >
                <span className="font-mono text-sm text-mauve">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-magenta">For {audience(u)}</p>
                  <h2 className="mt-1 text-xl font-medium tracking-tight text-ink transition group-hover:text-magenta sm:text-2xl">
                    {u.name}
                  </h2>
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-plum-2">{u.description}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-plum sm:pt-6">
                  Read use case <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            </MotionTile>
          ))}
        </div>
      </MotionGrid>

      <section className="mx-auto mt-16 max-w-3xl px-5 sm:mt-20 sm:px-6">
        <h2 className="text-2xl font-medium tracking-tight text-ink">Why agencies need more than a ping check</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-plum-2 sm:text-base">
          Client websites fail in ways a basic uptime tool never sees: SSL that expires overnight, a form that stops sending after a plugin update, a landing page that loses its title tag, or a JS error that breaks checkout on mobile. Watchfront is built for people who look after other people&apos;s sites.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-plum-2 sm:text-base">
          Start with the use case that matches your work, then explore{" "}
          <Link href="/features" className="link-underline text-plum">features</Link>, try a{" "}
          <Link href="/tools" className="link-underline text-plum">free check</Link>, or{" "}
          <Link href="/compare" className="link-underline text-plum">compare tools</Link>.
        </p>
      </section>
      <CtaBand title="Start with one client website." body="Free for 3 days. No credit card, nothing to install on client sites." />
    </MarketingShell>
  );
}
