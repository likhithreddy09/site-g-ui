import Link from "next/link";
import {
  CtaBand,
  JsonLd,
  LinkRow,
  MarketingShell,
  MotionGrid,
  MotionSection,
  MotionTile,
  PageHero,
  PageSection,
  SectionHeader,
} from "@/components/marketing/Site";
import { USE_CASES, audience } from "@/lib/marketing";
import { collectionPageLd, pageMeta } from "@/lib/seo";
import { abs } from "@/lib/site";

export const metadata = pageMeta({
  title: "Website Monitoring Use Cases for Agencies | Watchfront",
  description:
    "Built for web agencies, WordPress maintainers, marketing teams, freelancers and ecommerce stores who look after client websites every week.",
  path: "/use-cases",
  keywords: [
    "website monitoring for agencies",
    "WordPress website monitoring",
    "landing page monitoring",
    "ecommerce website monitoring",
    "website monitoring for freelancers",
  ],
  ogTitle: "Website Monitoring Use Cases for Agencies | Watchfront",
  ogDescription: "Web agencies, WordPress, marketing, freelancers and ecommerce - monitor client sites without Monday manual checks.",
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

      <MotionGrid className="mx-auto max-w-6xl px-5 sm:px-6" stagger={0.07}>
        <div className="divide-y divide-plum/10 border-b border-plum/10">
          {USE_CASES.map((u, i) => (
            <MotionTile key={u.slug}>
              <LinkRow
                href={`/use-cases/${u.slug}`}
                index={String(i + 1).padStart(2, "0")}
                kicker={`For ${audience(u)}`}
                title={u.name}
                body={u.description}
                meta="Read use case"
              />
            </MotionTile>
          ))}
        </div>
      </MotionGrid>

      <PageSection narrow>
        <MotionSection>
          <SectionHeader
            eyebrow="Why this exists"
            title="Why agencies need more than a ping check"
            description="Client websites fail in ways a basic uptime tool never sees."
          />
          <p className="mt-5 text-[15px] leading-relaxed text-plum-2 sm:text-base">
            SSL that expires overnight, a form that stops sending after a plugin update, a landing page that loses its title tag, or a JS error that breaks checkout on mobile. Watchfront is built for people who look after other people&apos;s sites.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-plum-2 sm:text-base">
            Start with the use case that matches your work, then explore{" "}
            <Link href="/features" className="link-underline text-plum">
              features
            </Link>
            , try a{" "}
            <Link href="/tools" className="link-underline text-plum">
              free check
            </Link>
            , or{" "}
            <Link href="/compare" className="link-underline text-plum">
              compare tools
            </Link>
            .
          </p>
        </MotionSection>
      </PageSection>
      <CtaBand title="Start with one client website." body="Free for 3 days. No credit card, nothing to install on client sites." />
    </MarketingShell>
  );
}
