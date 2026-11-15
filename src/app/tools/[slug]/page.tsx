import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, FaqList, JsonLd, MarketingShell, MotionSection, PageHero } from "@/components/marketing/Site";
import { ToolWidget } from "@/components/marketing/ToolWidget";
import { GUIDES } from "@/lib/guides";
import { featureBySlug } from "@/lib/marketing";
import { productBySlug } from "@/lib/products";
import { faqLd, pageMeta, webAppLd } from "@/lib/seo";
import { TOOLS, toolBySlug } from "@/lib/tools";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => TOOLS.map((t) => ({ slug: t.slug }));

export async function generateMetadata({ params }: Props) {
  const t = toolBySlug((await params).slug);
  if (!t) return {};
  return pageMeta({
    title: t.title,
    description: t.description,
    path: `/tools/${t.slug}`,
    keywords: t.keywords,
    ogTitle: t.title,
    ogDescription: t.description,
    image: `/tools/${t.slug}/opengraph-image`,
  });
}

export default async function ToolPage({ params }: Props) {
  const t = toolBySlug((await params).slug);
  if (!t) notFound();
  const feature = featureBySlug(t.feature);
  const product = productBySlug(t.product);
  const guides = GUIDES.filter((g) => g.tool === t.slug || g.feature === t.feature).slice(0, 3);
  const others = TOOLS.filter((o) => o.slug !== t.slug);

  return (
    <MarketingShell>
      <JsonLd data={[faqLd(t.faqs), webAppLd({ name: t.name, description: t.description, path: `/tools/${t.slug}` })]} />
      <PageHero crumbs={[["Home", "/"], ["Free tools", "/tools"], [t.name, `/tools/${t.slug}`]]} eyebrow="Free tool" title={t.h1} intro={t.intro}>
        <ToolWidget kind={t.kind} placeholder={t.placeholder} button={t.button} feature={t.feature} product={t.product} />
      </PageHero>

      <MotionSection className="mx-auto mt-16 max-w-3xl px-6">
        <article className="space-y-10">
          {t.sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-2xl font-medium tracking-tight text-ink">{s.h}</h2>
              {s.p.map((p) => (
                <p key={p.slice(0, 32)} className="mt-4 text-[16px] leading-relaxed text-plum-2">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </article>
      </MotionSection>

      <FaqList faqs={t.faqs} />

      <section className="mx-auto mt-20 max-w-6xl px-6" aria-labelledby="more">
        <h2 id="more" className="text-2xl font-medium tracking-tight text-ink">
          Keep going
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {product && (
            <Link href={`/${product.slug}`} className="group rounded-[1.75rem] bg-ink p-6 text-cream transition hover:-translate-y-1">
              <div className="text-xs uppercase tracking-[0.14em] text-sky">Product</div>
              <div className="mt-2 font-medium">{product.nav}</div>
              <p className="mt-1 text-sm text-cream/70">{product.intro.slice(0, 140)}…</p>
              <ArrowRight className="mt-4 h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          )}
          {feature && (
            <Link href={`/features/${feature.slug}`} className="group rounded-[1.75rem] bg-cream p-6 ring-1 ring-plum/8 transition hover:-translate-y-1 hover:bg-white">
              <div className="text-xs uppercase tracking-[0.14em] text-magenta">Feature</div>
              <div className="mt-2 font-medium text-ink group-hover:text-magenta">{feature.name}</div>
              <p className="mt-1 text-sm text-plum-2">{feature.short}</p>
            </Link>
          )}
          {guides.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="group rounded-[1.75rem] bg-cream p-6 ring-1 ring-plum/8 transition hover:-translate-y-1 hover:bg-white">
              <div className="text-xs uppercase tracking-[0.14em] text-magenta">Guide</div>
              <div className="mt-2 font-medium text-ink group-hover:text-magenta">{g.h1}</div>
              <ArrowRight className="mt-4 h-4 w-4 text-plum transition group-hover:translate-x-1" />
            </Link>
          ))}
          {others.map((o) => (
            <Link key={o.slug} href={`/tools/${o.slug}`} className="group rounded-[1.75rem] bg-cream p-6 ring-1 ring-plum/8 transition hover:-translate-y-1 hover:bg-white">
              <div className="text-xs uppercase tracking-[0.14em] text-magenta">Free tool</div>
              <div className="mt-2 font-medium text-ink group-hover:text-magenta">{o.name}</div>
              <p className="mt-1 text-sm text-plum-2">{o.short}</p>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand title="Don't check by hand. Get alerted." body="Watchfront watches every client site around the clock - free for 3 days, no card." />
    </MarketingShell>
  );
}
