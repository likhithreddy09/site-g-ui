import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FEATURE_ICONS } from "@/components/marketing/featureIcons";
import { CtaBand, FaqList, JsonLd, MarketingShell, MotionGrid, MotionSection, MotionTile, PageHero } from "@/components/marketing/Site";
import { USE_CASES, audience, featureBySlug, getUseCase } from "@/lib/marketing";
import { faqLd, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => USE_CASES.map((u) => ({ slug: u.slug }));

export async function generateMetadata({ params }: Props) {
  const u = getUseCase((await params).slug);
  if (!u) return {};
  return pageMeta({
    title: u.title,
    description: u.description,
    path: `/use-cases/${u.slug}`,
    keywords: u.keywords,
    ogTitle: u.title,
    ogDescription: u.description,
  });
}

export default async function UseCasePage({ params }: Props) {
  const u = getUseCase((await params).slug);
  if (!u) notFound();
  const features = u.features.map(featureBySlug).filter((f) => f !== undefined);
  const others = USE_CASES.filter((o) => o.slug !== u.slug);

  return (
    <MarketingShell>
      <JsonLd data={faqLd(u.faqs)} />
      <PageHero crumbs={[["Home", "/"], ["Use cases", "/use-cases"], [`For ${audience(u)}`, `/use-cases/${u.slug}`]]} eyebrow={`For ${audience(u)}`} title={u.h1} intro={u.intro}>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Link href="/register" className="rounded-full bg-plum px-6 py-3 text-[15px] font-medium text-cream transition hover:-translate-y-0.5 hover:bg-ink">Start monitoring free</Link>
          <Link href="/pricing" className="link-underline text-[15px] text-plum">See pricing</Link>
        </div>
      </PageHero>

      <MotionGrid className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-2" stagger={0.12}>
        <MotionTile>
          <div className="h-full rounded-[2rem] bg-cream p-8 ring-1 ring-plum/8 md:p-10">
            <h2 className="text-2xl font-medium tracking-tight text-ink">Sound familiar?</h2>
            <ul className="mt-6 space-y-4">
              {u.pains.map((p) => (
                <li key={p} className="flex gap-3 text-[15px] text-ink"><X className="mt-0.5 h-5 w-5 shrink-0 text-bad" />{p}</li>
              ))}
            </ul>
          </div>
        </MotionTile>
        <MotionTile>
          <div className="relative h-full overflow-hidden rounded-[2rem] bg-ink p-8 text-cream md:p-10">
            <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-magenta/30 blur-3xl" />
            <h2 className="relative text-2xl font-medium tracking-tight">With Watchfront</h2>
            <dl className="relative mt-6 space-y-5">
              {u.outcomes.map(([t, d]) => (
                <div key={t}>
                  <dt className="font-medium text-sky">{t}</dt>
                  <dd className="mt-1 text-[15px] leading-relaxed text-cream/75">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </MotionTile>
      </MotionGrid>

      <section className="mx-auto mt-24 max-w-6xl px-6" aria-labelledby="features">
        <MotionSection>
          <h2 id="features" className="text-2xl font-medium tracking-tight text-ink md:text-3xl">The features {audience(u)} use most</h2>
        </MotionSection>
        <MotionGrid className="mt-10 grid gap-5 sm:grid-cols-2">
          {features.map((f) => {
            const Icon = FEATURE_ICONS[f.slug];
            return (
              <MotionTile key={f.slug}>
                <Link href={`/features/${f.slug}`} className="group flex h-full gap-5 rounded-[1.75rem] bg-cream p-6 ring-1 ring-plum/8 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:ring-magenta/20">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-sky"><Icon className="h-5 w-5" /></span>
                  <div>
                    <h3 className="font-medium text-ink group-hover:text-magenta">{f.name}</h3>
                    <p className="mt-1 text-[15px] text-plum-2">{f.short}</p>
                  </div>
                </Link>
              </MotionTile>
            );
          })}
        </MotionGrid>
      </section>

      <FaqList faqs={u.faqs} />

      <MotionSection className="mx-auto mt-24 max-w-6xl px-6" aria-labelledby="others">
        <h2 id="others" className="text-2xl font-medium tracking-tight text-ink">Watchfront is also used by</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {others.map((o) => (
            <Link key={o.slug} href={`/use-cases/${o.slug}`} className="group flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-[15px] text-plum ring-1 ring-plum/10 transition hover:bg-ink hover:text-cream hover:ring-ink">
              {o.name} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </MotionSection>
      <CtaBand />
    </MarketingShell>
  );
}
