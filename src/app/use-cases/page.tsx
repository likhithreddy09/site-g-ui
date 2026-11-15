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
      <section className="mx-auto mt-20 max-w-3xl px-6 text-[16px] leading-relaxed text-plum-2">
        <h2 className="text-2xl font-medium text-ink">Why agencies need more than a ping check</h2>
        <p className="mt-4">
          Client websites fail in ways a basic uptime tool never sees: an SSL certificate that expires overnight, a contact form that stops sending mail after a plugin update, a landing page that loses its title tag, or a JavaScript error that breaks checkout for mobile visitors. Watchfront is built for people who look after other people&apos;s sites - not for a single product engineering team watching one app.
        </p>
        <p className="mt-4">
          Start with the use case that matches your work, then explore the matching{" "}
          <Link href="/features" className="link-underline text-plum">monitoring features</Link>, try a{" "}
          <Link href="/tools" className="link-underline text-plum">free website check</Link>, or follow the{" "}
          <Link href="/guides/website-maintenance-checklist" className="link-underline text-plum">monthly maintenance checklist</Link>. If you already use another tool,{" "}
          <Link href="/compare" className="link-underline text-plum">see how Watchfront compares</Link>.
        </p>
      </section>
      <CtaBand title="Start with one client website." body="Free for 3 days. No credit card, nothing to install on client sites." />
    </MarketingShell>
  );
}
