import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, FaqList, JsonLd, MarketingShell, PageHero } from "@/components/marketing/Site";
import { GUIDES, guideBySlug } from "@/lib/guides";
import { featureBySlug } from "@/lib/marketing";
import { articleLd, faqLd, pageMeta } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => GUIDES.map((g) => ({ slug: g.slug }));

export async function generateMetadata({ params }: Props) {
  const g = guideBySlug((await params).slug);
  if (!g) return {};
  const meta = pageMeta({
    title: g.title,
    description: g.description,
    path: `/guides/${g.slug}`,
    keywords: g.keywords,
    ogTitle: g.title,
    ogDescription: g.description,
    image: `/guides/${g.slug}/opengraph-image`,
  });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: g.published, modifiedTime: g.updated } };
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function GuidePage({ params }: Props) {
  const g = guideBySlug((await params).slug);
  if (!g) notFound();
  const tool = g.tool ? toolBySlug(g.tool) : undefined;
  const feature = g.feature ? featureBySlug(g.feature) : undefined;
  const more = GUIDES.filter((o) => o.slug !== g.slug).slice(0, 3);

  return (
    <MarketingShell>
      <JsonLd data={[
        articleLd({ title: g.h1, description: g.description, path: `/guides/${g.slug}`, published: g.published, updated: g.updated }),
        faqLd(g.faqs),
      ]} />
      <PageHero crumbs={[["Home", "/"], ["Guides", "/guides"], [g.h1, `/guides/${g.slug}`]]} eyebrow={`Guide · ${g.readMins} min read`} title={g.h1} intro={g.intro}>
        <p className="mt-4 text-xs text-plum/55">Updated <time dateTime={g.updated}>{new Date(g.updated).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</time> · Watchfront team</p>
      </PageHero>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_280px]">
        <article className="max-w-3xl">
          {g.sections.map((s) => (
            <section key={s.h} id={slugify(s.h)} className="scroll-mt-24 pb-10">
              <h2 className="text-2xl font-medium tracking-tight text-ink">{s.h}</h2>
              {s.p?.map((p) => <p key={p.slice(0, 32)} className="mt-4 text-[16px] leading-relaxed text-plum-2">{p}</p>)}
              {s.list && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-[16px] leading-relaxed text-plum-2">
                  {s.list.map((li) => <li key={li}>{li}</li>)}
                </ul>
              )}
            </section>
          ))}
          <div className="rounded-[1.5rem] bg-cream p-6 text-[15px] leading-relaxed text-plum-2 ring-1 ring-plum/8">
            <div className="font-medium text-ink">Written by the Watchfront team</div>
            <p className="mt-2">
              We build website monitoring for agencies in India. This guide reflects what we see running uptime, SSL, form and SEO checks on client websites.{" "}
              <Link href="/guides" className="link-underline text-plum">More guides</Link> ·{" "}
              <Link href="/about" className="link-underline text-plum">About us</Link> ·{" "}
              <Link href="/security" className="link-underline text-plum">How we handle your data</Link>
            </p>
          </div>
        </article>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <nav aria-label="On this page" className="rounded-[1.5rem] bg-cream p-5 ring-1 ring-plum/8">
            <div className="text-xs font-medium uppercase tracking-[0.14em] text-plum/55">On this page</div>
            <ol className="mt-3 space-y-2 text-sm">
              {g.sections.map((s) => <li key={s.h}><a href={`#${slugify(s.h)}`} className="text-plum hover:text-magenta">{s.h}</a></li>)}
            </ol>
          </nav>
          {tool && (
            <Link href={`/tools/${tool.slug}`} className="group block rounded-[1.5rem] bg-ink p-5 text-cream">
              <div className="text-xs uppercase tracking-[0.14em] text-sky">Free tool</div>
              <div className="mt-2 font-medium">{tool.name}</div>
              <p className="mt-1 text-sm text-cream/70">{tool.short}</p>
              <ArrowRight className="mt-3 h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          )}
          {feature && (
            <Link href={`/features/${feature.slug}`} className="group block rounded-[1.5rem] bg-cream p-5 ring-1 ring-plum/8 hover:bg-white">
              <div className="text-xs uppercase tracking-[0.14em] text-magenta">Automate it</div>
              <div className="mt-2 font-medium text-ink group-hover:text-magenta">{feature.name}</div>
              <p className="mt-1 text-sm text-plum-2">{feature.short}</p>
            </Link>
          )}
        </aside>
      </div>

      <FaqList faqs={g.faqs} />

      <section className="mx-auto mt-20 max-w-6xl px-6" aria-labelledby="more-guides">
        <h2 id="more-guides" className="text-2xl font-medium tracking-tight text-ink">More guides</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {more.map((o) => (
            <Link key={o.slug} href={`/guides/${o.slug}`} className="group rounded-[1.75rem] bg-cream p-6 ring-1 ring-plum/8 transition hover:-translate-y-1 hover:bg-white">
              <div className="text-xs text-plum/55">{o.readMins} min read</div>
              <div className="mt-2 font-medium text-ink group-hover:text-magenta">{o.h1}</div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </MarketingShell>
  );
}
