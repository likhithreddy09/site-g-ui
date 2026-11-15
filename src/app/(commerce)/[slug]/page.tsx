import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, FaqList, JsonLd, MarketingShell, MotionGrid, MotionSection, MotionTile, PageHero, SectionHeader, VisualBand } from "@/components/marketing/Site";

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
import { featureBySlug, USE_CASES, audience } from "@/lib/marketing";
import { PRODUCTS, productBySlug } from "@/lib/products";
import { faqLd, pageMeta, webPageLd } from "@/lib/seo";
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
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Watchfront",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description: p.description,
            url: `https://www.watchfront.in/${p.slug}`,
            offers: { "@type": "Offer", price: 0, priceCurrency: "INR", description: "3-day free trial" },
            featureList: p.bullets.join(". "),
          },
        ]}
      />
      <PageHero
        crumbs={[["Home", "/"], ["Features", "/features"], [p.nav, `/${p.slug}`]]}
        eyebrow={p.nav}
        title={p.h1}
        intro={p.intro}
        image={visual?.hero}
      >
        <div className="mt-8 flex flex-wrap items-center gap-5">
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

      {visual?.band && (
        <VisualBand src={visual.band.src} alt={visual.band.alt} caption={visual.band.caption} />
      )}

      <MotionSection className="mx-auto mt-16 max-w-6xl px-6" variant="up">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-12">
          <SectionHeader
            title="What you get"
            description="The checks and evidence that make this product useful from day one."
          />
          <ul className="space-y-3">
            {p.bullets.map((b) => (
              <li key={b} className="flex gap-3 rounded-2xl bg-cream p-4 text-[15px] text-ink ring-1 ring-plum/8">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-ok" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </MotionSection>

      {p.sections.map((s) => (
        <MotionSection key={s.h} className="mx-auto mt-16 max-w-3xl px-6 md:mt-20" variant="up">
          <SectionHeader title={s.h} description={s.p[0]} />
          {s.p.slice(1).map((para) => (
            <p key={para.slice(0, 40)} className="mt-4 text-[15px] leading-relaxed text-plum-2">
              {para}
            </p>
          ))}
        </MotionSection>
      ))}

      <section className="mx-auto mt-20 max-w-6xl px-6 md:mt-24" aria-labelledby="related-features">
        <MotionSection>
          <SectionHeader
            id="related-features"
            title="Related features"
            description="Connect this product to the rest of your monitoring stack."
          />
        </MotionSection>
        <MotionGrid className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <MotionTile key={f.slug}>
              <Link
                href={`/features/${f.slug}`}
                className="tile-lift group flex h-full flex-col rounded-[1.75rem] bg-cream p-6 ring-1 ring-plum/8 hover:bg-white hover:ring-magenta/20"
              >
                <h3 className="font-medium text-ink group-hover:text-magenta">{f.name}</h3>
                <p className="mt-2 line-clamp-2 flex-1 text-[14px] text-plum-2">{f.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-plum">
                  Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </MotionTile>
          ))}
        </MotionGrid>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-6 md:mt-20" aria-labelledby="who">
        <MotionSection>
          <SectionHeader id="who" title="Who this is for" description="Teams that look after more than one website." />
        </MotionSection>
        <div className="mt-6 flex flex-wrap gap-3">
          {audiences.map((u) => (
            <Link
              key={u.slug}
              href={`/use-cases/${u.slug}`}
              className="rounded-full bg-cream px-5 py-2.5 text-[14px] text-plum ring-1 ring-plum/10 transition duration-300 hover:bg-ink hover:text-cream hover:ring-ink"
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
      </section>

      <FaqList faqs={p.faqs} />
      <CtaBand title="Put it on a real client website." body="Free for 3 days. No card. Nothing to install for core checks." />
    </MarketingShell>
  );
}
