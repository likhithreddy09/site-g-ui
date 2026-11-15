import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, FaqList, JsonLd, MarketingShell, MotionGrid, MotionSection, MotionTile, PageHero } from "@/components/marketing/Site";
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

      <MotionSection className="mx-auto max-w-6xl px-6" variant="up">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-2xl font-medium tracking-tight text-ink md:text-3xl">What you get</h2>
            <p className="mt-4 text-base text-plum-2">
              Product search is how most agencies find monitoring tools - this page is built for that intent, then connects you to the full Watchfront feature set.
            </p>
          </div>
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
        <MotionSection key={s.h} className="mx-auto mt-20 max-w-3xl px-6" variant="up">
          <h2 className="text-2xl font-medium tracking-tight text-ink">{s.h}</h2>
          {s.p.map((para) => (
            <p key={para.slice(0, 40)} className="mt-4 text-[16px] leading-relaxed text-plum-2">
              {para}
            </p>
          ))}
        </MotionSection>
      ))}

      <section className="mx-auto mt-24 max-w-6xl px-6" aria-labelledby="related-features">
        <h2 id="related-features" className="text-2xl font-medium tracking-tight text-ink">
          Related Watchfront features
        </h2>
        <MotionGrid className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <MotionTile key={f.slug}>
              <Link
                href={`/features/${f.slug}`}
                className="group flex h-full flex-col rounded-[1.75rem] bg-cream p-6 ring-1 ring-plum/8 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:ring-magenta/20"
              >
                <h3 className="font-medium text-ink group-hover:text-magenta">{f.name}</h3>
                <p className="mt-2 flex-1 text-[15px] text-plum-2">{f.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-plum">
                  Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </MotionTile>
          ))}
        </MotionGrid>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-6" aria-labelledby="who">
        <h2 id="who" className="text-2xl font-medium tracking-tight text-ink">
          Who this is for
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {audiences.map((u) => (
            <Link
              key={u.slug}
              href={`/use-cases/${u.slug}`}
              className="rounded-full bg-cream px-5 py-2.5 text-[15px] text-plum ring-1 ring-plum/10 transition hover:bg-ink hover:text-cream hover:ring-ink"
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
