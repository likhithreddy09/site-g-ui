import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FEATURE_ICONS } from "@/components/marketing/featureIcons";
import { CtaBand, FaqList, JsonLd, MarketingShell, PageHero } from "@/components/marketing/Site";
import { FEATURES, USE_CASES, audience, featureBySlug } from "@/lib/marketing";
import { faqLd, pageMeta } from "@/lib/seo";
import { SITE, abs } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => FEATURES.map((f) => ({ slug: f.slug }));

export async function generateMetadata({ params }: Props) {
  const f = featureBySlug((await params).slug);
  if (!f) return {};
  return pageMeta({ title: f.title, description: f.description, path: `/features/${f.slug}` });
}

export default async function FeaturePage({ params }: Props) {
  const f = featureBySlug((await params).slug);
  if (!f) notFound();
  const Icon = FEATURE_ICONS[f.slug];
  const related = f.related.map(featureBySlug).filter((r) => r !== undefined);
  const forWho = USE_CASES.filter((u) => u.features.includes(f.slug));

  return (
    <MarketingShell>
      <JsonLd data={[
        faqLd(f.faqs),
        {
          "@context": "https://schema.org", "@type": "WebPage", name: f.title, description: f.description, url: abs(`/features/${f.slug}`),
          about: { "@type": "SoftwareApplication", name: SITE.name, applicationCategory: "BusinessApplication", operatingSystem: "Web" },
        },
      ]} />
      <PageHero crumbs={[["Home", "/"], ["Features", "/features"], [f.name, `/features/${f.slug}`]]} eyebrow={f.name} title={f.h1} intro={f.intro}>
        <div className="mt-9 flex flex-wrap items-center gap-6">
          <Link href="/register" className="rounded-full bg-plum px-7 py-3.5 font-medium text-cream transition hover:-translate-y-0.5 hover:bg-ink">Start free — no card needed</Link>
          <Link href="/pricing" className="link-underline text-plum">See pricing</Link>
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-6" aria-labelledby="how">
        <div className="rounded-[2rem] bg-cream p-8 md:p-12">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-magenta ring-1 ring-plum/10"><Icon className="h-5 w-5" /></span>
            <h2 id="how" className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">How it works</h2>
          </div>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {f.steps.map(([t, d], i) => (
              <li key={t} className="rounded-2xl bg-white p-6 ring-1 ring-plum/8">
                <span className="font-mono text-sm text-magenta">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold text-ink">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-plum-2">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto mt-24 grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">What you get</h2>
          <p className="mt-4 text-lg text-plum-2">{f.short}</p>
          {forWho.length > 0 && (
            <p className="mt-6 text-[15px] text-plum-2">
              Popular with{" "}
              {forWho.map((u, i) => (
                <span key={u.slug}>{i > 0 && (i === forWho.length - 1 ? " and " : ", ")}<Link href={`/use-cases/${u.slug}`} className="link-underline text-plum">{audience(u)}</Link></span>
              ))}.
            </p>
          )}
        </div>
        <ul className="space-y-3">
          {f.benefits.map((b) => (
            <li key={b} className="flex gap-3 rounded-2xl border border-plum/10 p-4 text-[15px] text-ink">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-ok" />{b}
            </li>
          ))}
        </ul>
      </section>

      <FaqList faqs={f.faqs} />

      {related.length > 0 && (
        <section className="mx-auto mt-24 max-w-6xl px-6" aria-labelledby="related">
          <h2 id="related" className="text-2xl font-semibold tracking-tight text-ink">Works well with</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((r) => {
              const RIcon = FEATURE_ICONS[r.slug];
              return (
                <Link key={r.slug} href={`/features/${r.slug}`} className="group rounded-3xl bg-cream p-6 transition hover:-translate-y-1 hover:shadow-lg">
                  <RIcon className="h-5 w-5 text-magenta" />
                  <h3 className="mt-4 font-semibold text-ink group-hover:text-magenta">{r.name}</h3>
                  <p className="mt-1 text-sm text-plum-2">{r.short}</p>
                  <ArrowRight className="mt-4 h-4 w-4 text-plum transition group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>
        </section>
      )}
      <CtaBand title="Try it on your own website." />
    </MarketingShell>
  );
}
