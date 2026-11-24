import { Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FEATURE_ICONS } from "@/components/marketing/featureIcons";
import {
  CtaBand,
  FaqList,
  JsonLd,
  LinkRow,
  MarketingShell,
  MotionGrid,
  MotionSection,
  MotionTile,
  PageHero,
  PageSection,
  SectionHeader,
  VisualBand,
} from "@/components/marketing/Site";

const PRODUCT_VISUAL: Record<string, { hero: { src: string; alt: string }; band?: { src: string; alt: string; caption: string } }> = {
  "website-monitoring": {
    hero: { src: "/marketing/signal-abstract.jpg", alt: "Abstract illustration of website monitoring signals" },
    band: {
      src: "/marketing/agency-desk.jpg",
      alt: "Illustrated desk with soft status signals for client sites",
      caption: "One portfolio desk for every client site — uptime, SSL, journeys and errors in the same place.",
    },
  },
  "contact-form-monitoring": {
    hero: { src: "/marketing/form-evidence.jpg", alt: "Illustration of catching a broken contact form" },
  },
  "uptime-monitoring-tool": {
    hero: { src: "/marketing/agency-desk.jpg", alt: "Illustrated monitoring desk with uptime signals" },
  },
  "ssl-certificate-monitoring": {
    hero: { src: "/marketing/checks-stack.jpg", alt: "Illustrated cards for SSL and uptime checks" },
  },
};
import { TopicClusterNav } from "@/components/marketing/TopicCluster";
import { GLOSSARY } from "@/lib/glossary";
import { featureBySlug, USE_CASES, audience } from "@/lib/marketing";
import { PRODUCTS, productBySlug } from "@/lib/products";
import { breadcrumbLd, faqLd, pageMeta, softwareAppLd, webPageLd } from "@/lib/seo";
import { PRODUCT_CLUSTER, clusterById } from "@/lib/seoClusters";
import { guideBySlug } from "@/lib/guides";
import { toolBySlug } from "@/lib/tools";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => PRODUCTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props) {
  const p = productBySlug((await params).slug);
  if (!p) return {};
  return pageMeta({
    title: p.title,
    description: p.description,
    path: `/${p.slug}`,
    keywords: p.keywords,
    ogTitle: p.title,
    ogDescription: p.description,
    image: `/${p.slug}/opengraph-image`,
  });
}

export default async function ProductPage({ params }: Props) {
  const p = productBySlug((await params).slug);
  if (!p) notFound();
  const features = p.features.map(featureBySlug).filter((f) => f !== undefined);
  const primary = featureBySlug(p.feature);
  const tool = p.tool ? toolBySlug(p.tool) : undefined;
  const guide = p.guide ? guideBySlug(p.guide) : undefined;
  const audiences = USE_CASES.slice(0, 4);
  const visual = PRODUCT_VISUAL[p.slug];
  const cluster = clusterById(PRODUCT_CLUSTER[p.slug] || "");

  return (
    <MarketingShell>
      <JsonLd
        data={[
          faqLd(p.faqs),
          webPageLd({
            name: p.h1,
            description: p.description,
            path: `/${p.slug}`,
            parentName: "Features",
            parentPath: "/features",
          }),
          {
            ...softwareAppLd({
              name: `Watchfront — ${p.nav}`,
              description: p.description,
              path: `/${p.slug}`,
            }),
            featureList: p.bullets,
            alternateName: p.keywords.slice(0, 3),
          },
          breadcrumbLd([["Home", "/"], [p.nav, `/${p.slug}`]]),
        ]}
      />
      <PageHero
        crumbs={[["Home", "/"], [p.nav, `/${p.slug}`]]}
        eyebrow={p.nav}
        title={p.h1}
        intro={p.intro}
        image={visual?.hero}
      >
        <div className="flex flex-wrap items-center gap-5">
          <Link href="/register" className="rounded-full bg-plum px-6 py-3 text-[15px] font-medium text-cream transition hover:-translate-y-0.5 hover:bg-ink">
            Start free - 3-day trial
          </Link>
          {tool ? (
            <Link href={`/tools/${tool.slug}`} className="link-underline text-[15px] text-plum">
              Try the free {tool.name.toLowerCase()}
            </Link>
          ) : primary ? (
            <Link href={`/features/${primary.slug}`} className="link-underline text-[15px] text-plum">
              See how {primary.name.toLowerCase()} works
            </Link>
          ) : null}
        </div>
      </PageHero>

      {visual?.band ? <VisualBand src={visual.band.src} alt={visual.band.alt} caption={visual.band.caption} /> : null}

      <PageSection>
        <MotionSection variant="up">
          <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-12">
            <SectionHeader
              eyebrow="Included"
              title="What you get"
              description="The checks and evidence that make this product useful from day one."
            />
            <ul className="divide-y divide-plum/10 border-y border-plum/10">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-3 py-4 text-[15px] text-ink">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-ok" />
                  <span className="min-w-0">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </MotionSection>
      </PageSection>

      {p.sections.map((s) => (
        <PageSection key={s.h} narrow>
          <MotionSection variant="up">
            <SectionHeader title={s.h} description={s.p[0]} />
            {s.p.slice(1).map((para) => (
              <p key={para.slice(0, 40)} className="mt-4 text-[15px] leading-relaxed text-plum-2">
                {para}
              </p>
            ))}
          </MotionSection>
        </PageSection>
      ))}

      <PageSection aria-labelledby="related-features">
        <MotionSection>
          <SectionHeader
            id="related-features"
            eyebrow="Stack"
            title="Related features"
            description="Connect this product to the rest of your monitoring stack."
          />
        </MotionSection>
        <MotionGrid className="mt-6 divide-y divide-plum/10 border-y border-plum/10" stagger={0.05}>
          {features.map((f) => {
            const Icon = FEATURE_ICONS[f.slug];
            return (
              <MotionTile key={f.slug}>
                <LinkRow
                  href={`/features/${f.slug}`}
                  title={f.name}
                  body={f.short}
                  icon={Icon ? <Icon className="h-5 w-5" /> : undefined}
                />
              </MotionTile>
            );
          })}
        </MotionGrid>
      </PageSection>

      <PageSection aria-labelledby="who">
        <MotionSection>
          <SectionHeader id="who" eyebrow="Audience" title="Who this is for" description="Teams that look after more than one website." />
        </MotionSection>
        <div className="mt-6 flex flex-wrap gap-3">
          {audiences.map((u) => (
            <Link
              key={u.slug}
              href={`/use-cases/${u.slug}`}
              className="rounded-full bg-white px-5 py-2.5 text-[14px] text-plum ring-1 ring-plum/10 transition duration-300 hover:bg-ink hover:text-cream hover:ring-ink"
            >
              {audience(u)}
            </Link>
          ))}
        </div>
        <p className="mt-8 text-[15px] leading-relaxed text-plum-2">
          Compare options in our{" "}
          <Link href="/compare" className="link-underline text-plum">
            website monitoring tools comparison
          </Link>
          {guide ? (
            <>
              , or read{" "}
              <Link href={`/guides/${guide.slug}`} className="link-underline text-plum">
                {guide.h1}
              </Link>
            </>
          ) : null}
          . Browse every capability on the{" "}
          <Link href="/features" className="link-underline text-plum">
            features hub
          </Link>
          .
        </p>
      </PageSection>

      {cluster ? <TopicClusterNav cluster={cluster} currentPath={`/${p.slug}`} /> : null}

      <PageSection narrow aria-labelledby="agency-assets">
        <MotionSection>
          <SectionHeader id="agency-assets" eyebrow="Resources" title="Agency assets that support this page" />
          <ul className="mt-6 divide-y divide-plum/10 border-y border-plum/10 text-[15px] text-plum-2">
            {[
              ["/resources/monitoring-sow-template", "Monitoring SOW template"],
              ["/resources/cost-of-downtime", "Cost of downtime calculator"],
              ["/resources/sample-client-uptime-report", "Sample client uptime report"],
              ["/resources/uptime-measurement-methodology", "Uptime measurement methodology"],
              ["/resources/agency-monitoring-playbook-india", "India agency monitoring playbook"],
            ].map(([href, label]) => (
              <li key={href} className="py-3.5">
                <Link href={href} className="link-underline text-plum">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </MotionSection>
      </PageSection>

      <PageSection aria-labelledby="glossary-terms">
        <MotionSection>
          <SectionHeader
            id="glossary-terms"
            eyebrow="Glossary"
            title="Key terms"
            description="Plain-English definitions — full glossary linked below."
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {GLOSSARY.slice(0, 8).map((t) => (
              <Link
                key={t.slug}
                href={`/glossary/${t.slug}`}
                className="rounded-full bg-white px-4 py-2 text-[13px] text-plum ring-1 ring-plum/10 transition hover:bg-ink hover:text-cream"
              >
                {t.term}
              </Link>
            ))}
          </div>
          <p className="mt-5 text-[14px] text-plum-2">
            <Link href="/glossary" className="link-underline text-plum">
              Full glossary
            </Link>
          </p>
        </MotionSection>
      </PageSection>

      <FaqList faqs={p.faqs} />
      <CtaBand title="Put it on a real client website." body="Free for 3 days. No card. Nothing to install for core checks." />
    </MarketingShell>
  );
}
