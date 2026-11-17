import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, FaqList, JsonLd, MarketingShell, PageHero } from "@/components/marketing/Site";
import { GLOSSARY, glossaryBySlug } from "@/lib/glossary";
import { guideBySlug } from "@/lib/guides";
import { featureBySlug } from "@/lib/marketing";
import { productBySlug } from "@/lib/products";
import { breadcrumbLd, definedTermLd, faqLd, pageMeta } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => GLOSSARY.map((t) => ({ slug: t.slug }));

export async function generateMetadata({ params }: Props) {
  const t = glossaryBySlug((await params).slug);
  if (!t) return {};
  return pageMeta({
    title: t.title,
    description: t.description,
    path: `/glossary/${t.slug}`,
    keywords: t.keywords,
    ogTitle: t.title,
    ogDescription: t.description,
    image: `/glossary/${t.slug}/opengraph-image`,
  });
}

export default async function GlossaryTermPage({ params }: Props) {
  const t = glossaryBySlug((await params).slug);
  if (!t) notFound();
  const product = t.relatedProduct ? productBySlug(t.relatedProduct) : undefined;
  const feature = t.relatedFeature ? featureBySlug(t.relatedFeature) : undefined;
  const tool = t.relatedTool ? toolBySlug(t.relatedTool) : undefined;
  const guide = t.relatedGuide ? guideBySlug(t.relatedGuide) : undefined;
  const more = GLOSSARY.filter((o) => o.slug !== t.slug).slice(0, 4);

  return (
    <MarketingShell>
      <JsonLd
        data={[
          definedTermLd({
            term: t.term,
            definition: t.definition,
            description: t.description,
            path: `/glossary/${t.slug}`,
          }),
          breadcrumbLd([
            ["Home", "/"],
            ["Glossary", "/glossary"],
            [t.term, `/glossary/${t.slug}`],
          ]),
          ...(t.faqs?.length ? [faqLd(t.faqs)] : []),
        ]}
      />
      <PageHero
        crumbs={[
          ["Home", "/"],
          ["Glossary", "/glossary"],
          [t.term, `/glossary/${t.slug}`],
        ]}
        eyebrow="Definition"
        title={`What is ${t.term}?`}
        intro={t.definition}
      >
        <p data-definition className="sr-only">
          {t.definition}
        </p>
      </PageHero>

      <article className="mx-auto max-w-3xl px-6">
        <section className="rounded-[1.5rem] bg-cream p-6 ring-1 ring-plum/8 sm:p-8">
          <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-plum/55">Definition</h2>
          <p data-definition className="mt-3 text-xl leading-relaxed text-ink">
            {t.definition}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-medium tracking-tight text-ink">In plain English</h2>
          {t.body.map((p) => (
            <p key={p.slice(0, 40)} className="mt-4 text-[16px] leading-relaxed text-plum-2">
              {p}
            </p>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-medium tracking-tight text-ink">Why agencies care</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[16px] leading-relaxed text-plum-2">
            {t.whyItMatters.map((li) => (
              <li key={li}>{li}</li>
            ))}
          </ul>
        </section>

        <aside className="mt-12 grid gap-4 sm:grid-cols-2">
          {product && (
            <Link href={`/${product.slug}`} className="group rounded-[1.5rem] bg-ink p-5 text-cream">
              <div className="text-xs uppercase tracking-[0.14em] text-sky">Product</div>
              <div className="mt-2 font-medium">{product.nav}</div>
              <p className="mt-1 text-sm text-cream/70">{product.description}</p>
              <ArrowRight className="mt-3 h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          )}
          {feature && (
            <Link
              href={`/features/${feature.slug}`}
              className="group rounded-[1.5rem] bg-cream p-5 ring-1 ring-plum/8 hover:bg-white"
            >
              <div className="text-xs uppercase tracking-[0.14em] text-magenta">Feature</div>
              <div className="mt-2 font-medium text-ink group-hover:text-magenta">{feature.name}</div>
              <p className="mt-1 text-sm text-plum-2">{feature.short}</p>
            </Link>
          )}
          {tool && (
            <Link
              href={`/tools/${tool.slug}`}
              className="group rounded-[1.5rem] bg-cream p-5 ring-1 ring-plum/8 hover:bg-white"
            >
              <div className="text-xs uppercase tracking-[0.14em] text-magenta">Free tool</div>
              <div className="mt-2 font-medium text-ink group-hover:text-magenta">{tool.name}</div>
              <p className="mt-1 text-sm text-plum-2">{tool.short}</p>
            </Link>
          )}
          {guide && (
            <Link
              href={`/guides/${guide.slug}`}
              className="group rounded-[1.5rem] bg-cream p-5 ring-1 ring-plum/8 hover:bg-white"
            >
              <div className="text-xs uppercase tracking-[0.14em] text-magenta">Guide</div>
              <div className="mt-2 font-medium text-ink group-hover:text-magenta">{guide.h1}</div>
              <p className="mt-1 text-sm text-plum-2">{guide.description}</p>
            </Link>
          )}
        </aside>
      </article>

      {t.faqs?.length ? <FaqList faqs={t.faqs} /> : null}

      <section className="mx-auto mt-20 max-w-6xl px-6" aria-labelledby="more-terms">
        <h2 id="more-terms" className="text-2xl font-medium tracking-tight text-ink">
          More glossary terms
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {more.map((o) => (
            <Link
              key={o.slug}
              href={`/glossary/${o.slug}`}
              className="group rounded-[1.5rem] bg-cream p-5 ring-1 ring-plum/8 transition hover:-translate-y-1 hover:bg-white"
            >
              <div className="font-medium text-ink group-hover:text-magenta">{o.term}</div>
              <p className="mt-2 line-clamp-3 text-sm text-plum-2">{o.definition}</p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </MarketingShell>
  );
}
