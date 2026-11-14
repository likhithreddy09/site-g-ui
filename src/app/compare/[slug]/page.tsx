import { Check, Minus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, FaqList, JsonLd, MarketingShell, MotionSection, PageHero } from "@/components/marketing/Site";
import { COMPARISONS, comparisonBySlug } from "@/lib/compare";
import { faqLd, pageMeta, webPageLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => COMPARISONS.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: Props) {
  const c = comparisonBySlug((await params).slug);
  if (!c) return {};
  return pageMeta({ title: c.title, description: c.description, path: `/compare/${c.slug}`, keywords: c.keywords });
}

export default async function ComparisonPage({ params }: Props) {
  const c = comparisonBySlug((await params).slug);
  if (!c) notFound();
  const others = COMPARISONS.filter((o) => o.slug !== c.slug);

  return (
    <MarketingShell>
      <JsonLd data={[
        faqLd(c.faqs),
        webPageLd({ name: `${c.competitor} alternative`, description: c.description, path: `/compare/${c.slug}`, parentName: "Compare", parentPath: "/compare" }),
      ]} />
      <PageHero crumbs={[["Home", "/"], ["Compare", "/compare"], [`${c.competitor} alternative`, `/compare/${c.slug}`]]} eyebrow={`Watchfront vs ${c.competitor}`} title={c.h1} intro={c.intro}>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Link href="/register" className="rounded-full bg-plum px-6 py-3 text-[15px] font-medium text-cream transition hover:-translate-y-0.5 hover:bg-ink">Try Watchfront free for 3 days</Link>
          <Link href="/tools" className="link-underline text-[15px] text-plum">Try our free checkers</Link>
        </div>
      </PageHero>

      <MotionSection className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-2">
        <div className="rounded-[1.75rem] bg-cream p-7 ring-1 ring-plum/8">
          <h2 className="text-xl font-medium text-ink">What {c.competitor} is known for</h2>
          <ul className="mt-5 space-y-3">
            {c.theyDo.map((x) => <li key={x} className="flex gap-3 text-[15px] text-plum-2"><Minus className="mt-1 h-4 w-4 shrink-0 text-plum/40" />{x}</li>)}
          </ul>
        </div>
        <div className="rounded-[1.75rem] bg-ink p-7 text-cream">
          <h2 className="text-xl font-medium">Where Watchfront is different</h2>
          <ul className="mt-5 space-y-3">
            {c.weDo.map((x) => <li key={x} className="flex gap-3 text-[15px] text-cream/80"><Check className="mt-1 h-4 w-4 shrink-0 text-sky" />{x}</li>)}
          </ul>
        </div>
      </MotionSection>

      <MotionSection className="mx-auto mt-16 max-w-3xl px-6">
        <h2 className="text-2xl font-medium tracking-tight text-ink">When {c.competitor} might be the better pick</h2>
        <p className="mt-3 text-[15px] text-plum-2">We&apos;d rather you pick the right tool. {c.competitor} may suit you better if:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] text-plum-2">
          {c.pickThemIf.map((x) => <li key={x}>{x}</li>)}
        </ul>
        <p className="mt-6 text-xs text-plum/50">Based on publicly available information about {c.competitor}. Features change - check their website for the latest details. {c.competitor} is a trademark of its respective owner.</p>
      </MotionSection>

      <FaqList faqs={c.faqs} />

      <section className="mx-auto mt-20 max-w-6xl px-6">
        <h2 className="text-xl font-medium text-ink">Other comparisons</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {others.map((o) => (
            <Link key={o.slug} href={`/compare/${o.slug}`} className="rounded-full bg-cream px-4 py-2 text-sm text-plum ring-1 ring-plum/10 hover:text-magenta">
              {o.competitor} alternative
            </Link>
          ))}
        </div>
      </section>
      <CtaBand title={`Switching from ${c.competitor}?`} body="Add your sites in minutes and see what Watchfront catches - free for 3 days, no card." />
    </MarketingShell>
  );
}
