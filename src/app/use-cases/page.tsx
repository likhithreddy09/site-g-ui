import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand, JsonLd, MarketingShell, PageHero } from "@/components/marketing/Site";
import { USE_CASES, audience } from "@/lib/marketing";
import { pageMeta } from "@/lib/seo";
import { abs } from "@/lib/site";

export const metadata = pageMeta({
  title: "Use Cases — Website Monitoring for Agencies, WordPress & Freelancers",
  description:
    "See how Watchfront fits web agencies, WordPress maintenance providers, marketing teams and freelance developers — portfolio monitoring, form tests and client reports.",
  path: "/use-cases",
  keywords: [
    "website monitoring for agencies",
    "WordPress maintenance monitoring",
    "marketing agency landing page monitoring",
    "freelance website monitoring",
  ],
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
        intro="Same product, different workflows — pick the path that matches how you work with clients."
      />
      <section className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2" aria-label="Use cases">
        {USE_CASES.map((u) => (
          <Link
            key={u.slug}
            href={`/use-cases/${u.slug}`}
            className="group flex flex-col rounded-3xl bg-cream p-7 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-sm font-medium text-magenta">For {audience(u)}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink group-hover:text-magenta">{u.name}</h2>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-plum-2">{u.description}</p>
            <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-plum">
              Read use case <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </section>
      <CtaBand title="Start with one client website." body="Free for 3 websites. No credit card, nothing to install on client sites." />
    </MarketingShell>
  );
}
