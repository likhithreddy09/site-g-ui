import Link from "next/link";
import { CtaBand, JsonLd, MarketingShell, PageHero } from "@/components/marketing/Site";
import { breadcrumbLd, editorialPersonLd, pageMeta } from "@/lib/seo";
import { SITE, abs } from "@/lib/site";

export const metadata = pageMeta({
  title: "Editorial Team & Review Standards | Watchfront",
  description:
    "How Watchfront’s editorial team writes and reviews monitoring guides: experience from Indian agency support, evidence-first claims, and update policy.",
  path: "/about/editorial",
  keywords: ["Watchfront editorial", "E-E-A-T monitoring guides", "who writes Watchfront blog"],
  image: "/about/opengraph-image",
});

export default function EditorialPage() {
  return (
    <MarketingShell>
      <JsonLd
        data={[
          editorialPersonLd,
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "Watchfront editorial standards",
            url: abs("/about/editorial"),
            mainEntity: { "@id": `${SITE.url}/#editorial-team` },
          },
          breadcrumbLd([
            ["Home", "/"],
            ["About", "/about"],
            ["Editorial", "/about/editorial"],
          ]),
        ]}
      />
      <PageHero
        crumbs={[
          ["Home", "/"],
          ["About", "/about"],
          ["Editorial", "/about/editorial"],
        ]}
        eyebrow="E-E-A-T"
        title="Who writes this — and how we review it"
        intro="Guides and resources are written by the Watchfront product + support team in India, based on real agency portfolios — not keyword filler farms."
      />

      <article className="mx-auto max-w-3xl px-6 space-y-10 text-[16px] leading-relaxed text-plum-2">
        <section>
          <h2 className="text-2xl font-medium tracking-tight text-ink">Experience</h2>
          <p className="mt-4">
            We support agencies monitoring WordPress and marketing sites: broken forms after plugin updates, SSL auto-renew failures, false uptime alerts and retainer reporting. That ops reality shapes every guide.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-medium tracking-tight text-ink">Expertise & standards</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Claims tie to observable checks (status codes, certificates, journeys) — not ranking guarantees</li>
            <li>No fabricated survey statistics; playbooks use transparent methodology</li>
            <li>Product mentions link to the feature that actually does the work</li>
            <li>Pages show last updated dates when content changes meaningfully</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-medium tracking-tight text-ink">Trust & contact</h2>
          <p className="mt-4">
            Corrections and security issues:{" "}
            <a href={`mailto:${SITE.email.security}`} className="link-underline text-plum">
              {SITE.email.security}
            </a>
            . Company context on{" "}
            <Link href="/about" className="link-underline text-plum">
              About
            </Link>{" "}
            and{" "}
            <Link href="/security" className="link-underline text-plum">
              Security
            </Link>
            .
          </p>
        </section>
      </article>
      <CtaBand />
    </MarketingShell>
  );
}
