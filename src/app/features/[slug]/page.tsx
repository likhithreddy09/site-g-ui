import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FEATURE_ICONS } from "@/components/marketing/featureIcons";
import { CtaBand, FaqList, JsonLd, MarketingShell, MotionGrid, MotionSection, MotionTile, PageHero } from "@/components/marketing/Site";
import { FEATURES, USE_CASES, audience, featureBySlug } from "@/lib/marketing";
import { faqLd, pageMeta } from "@/lib/seo";
import { SITE, abs } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => FEATURES.map((f) => ({ slug: f.slug }));

export async function generateMetadata({ params }: Props) {
  const f = featureBySlug((await params).slug);
  if (!f) return {};
  return pageMeta({
    title: f.title,
    description: f.description,
    path: `/features/${f.slug}`,
    keywords: f.keywords,
    ogTitle: f.title,
    ogDescription: f.description,
  });
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
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Link href="/register" className="rounded-full bg-plum px-6 py-3 text-[15px] font-medium text-cream transition hover:-translate-y-0.5 hover:bg-ink">Start free - no card needed</Link>
          <Link href="/pricing" className="link-underline text-[15px] text-plum">See pricing</Link>
        </div>
      </PageHero>

      <MotionSection className="mx-auto max-w-6xl px-6" aria-labelledby="how" variant="up">
        <div className="relative overflow-hidden rounded-[2rem] bg-cream p-8 ring-1 ring-plum/8 md:p-12">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-magenta/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 left-1/4 h-36 w-36 rounded-full bg-sky/20 blur-3xl" />
          <div className="relative flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-sky"><Icon className="h-5 w-5" /></span>
            <h2 id="how" className="text-2xl font-medium tracking-tight text-ink md:text-3xl">How it works</h2>
          </div>
          <ol className="relative mt-8 grid gap-5 md:grid-cols-3">
            {f.steps.map(([t, d], i) => (
              <li key={t} className="rounded-2xl bg-white p-6 ring-1 ring-plum/8">
                <span className="font-mono text-sm text-magenta">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-base font-medium text-ink">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-plum-2">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </MotionSection>

      <MotionSection className="mx-auto mt-24 grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1.15fr]" variant="left">
        <div>
          <h2 className="text-2xl font-medium tracking-tight text-ink md:text-3xl">What you get</h2>
          <p className="mt-4 text-base text-plum-2">{f.short}</p>
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
            <li key={b} className="flex gap-3 rounded-2xl bg-cream p-4 text-[15px] text-ink ring-1 ring-plum/8">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-ok" />{b}
            </li>
          ))}
        </ul>
      </MotionSection>

      <FaqList faqs={f.faqs} />

      {related.length > 0 && (
        <section className="mx-auto mt-24 max-w-6xl px-6" aria-labelledby="related">
          <MotionSection>
            <h2 id="related" className="text-2xl font-medium tracking-tight text-ink">Works well with</h2>
          </MotionSection>
          <MotionGrid className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((r) => {
              const RIcon = FEATURE_ICONS[r.slug];
              return (
                <MotionTile key={r.slug}>
                  <Link href={`/features/${r.slug}`} className="group block h-full rounded-[1.75rem] bg-cream p-6 ring-1 ring-plum/8 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:ring-magenta/20">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-sky"><RIcon className="h-4 w-4" /></span>
                    <h3 className="mt-4 font-medium text-ink group-hover:text-magenta">{r.name}</h3>
                    <p className="mt-1 text-sm text-plum-2">{r.short}</p>
                    <ArrowRight className="mt-4 h-4 w-4 text-plum transition group-hover:translate-x-1" />
                  </Link>
                </MotionTile>
              );
            })}
          </MotionGrid>
        </section>
      )}
      <CtaBand title="Try it on your own website." />
    </MarketingShell>
  );
}
