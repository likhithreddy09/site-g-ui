import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FEATURE_ICONS } from "@/components/marketing/featureIcons";
import { CtaBand, FaqList, JsonLd, MarketingShell, PageHero } from "@/components/marketing/Site";
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
    keywords: [u.name, `website monitoring for ${u.name.toLowerCase()}`, "website monitoring India"],
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
        <div className="mt-9 flex flex-wrap items-center gap-6">
          <Link href="/register" className="rounded-full bg-plum px-7 py-3.5 font-medium text-cream transition hover:-translate-y-0.5 hover:bg-ink">Start monitoring free</Link>
          <Link href="/pricing" className="link-underline text-plum">See pricing</Link>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2">
        <div className="rounded-[2rem] bg-cream p-8 md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Sound familiar?</h2>
          <ul className="mt-6 space-y-4">
            {u.pains.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] text-ink"><X className="mt-0.5 h-5 w-5 shrink-0 text-bad" />{p}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[2rem] bg-plum p-8 text-cream md:p-10">
          <h2 className="text-2xl font-semibold tracking-tight">With Watchfront</h2>
          <dl className="mt-6 space-y-5">
            {u.outcomes.map(([t, d]) => (
              <div key={t}>
                <dt className="font-semibold text-sky">{t}</dt>
                <dd className="mt-1 text-[15px] leading-relaxed text-cream/80">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-6" aria-labelledby="features">
        <h2 id="features" className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">The features {audience(u)} use most</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {features.map((f) => {
            const Icon = FEATURE_ICONS[f.slug];
            return (
              <Link key={f.slug} href={`/features/${f.slug}`} className="group flex gap-5 rounded-3xl border border-plum/10 p-6 transition hover:border-magenta/30 hover:shadow-lg">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cream text-magenta"><Icon className="h-5 w-5" /></span>
                <div>
                  <h3 className="font-semibold text-ink group-hover:text-magenta">{f.name}</h3>
                  <p className="mt-1 text-[15px] text-plum-2">{f.short}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <FaqList faqs={u.faqs} />

      <section className="mx-auto mt-24 max-w-6xl px-6" aria-labelledby="others">
        <h2 id="others" className="text-2xl font-semibold tracking-tight text-ink">Watchfront is also used by</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {others.map((o) => (
            <Link key={o.slug} href={`/use-cases/${o.slug}`} className="group flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-[15px] text-plum hover:text-magenta">
              {o.name} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </MarketingShell>
  );
}
