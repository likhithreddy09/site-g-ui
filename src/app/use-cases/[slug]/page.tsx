import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FEATURE_ICONS } from "@/components/marketing/featureIcons";
import {
  CtaBand,
  FaqList,
  JsonLd,
  MarketingShell,
  MotionGrid,
  MotionSection,
  MotionTile,
  PageHero,
  SectionHeader,
} from "@/components/marketing/Site";
import { USE_CASES, audience, featureBySlug, getUseCase } from "@/lib/marketing";
import { breadcrumbLd, faqLd, pageMeta, webPageLd } from "@/lib/seo";

const USE_CASE_IMAGE: Record<string, { src: string; alt: string }> = {
  "web-agencies": { src: "/marketing/agency-team.jpg", alt: "Illustrated agency team collaborating on website care" },
  "wordpress-maintenance": { src: "/marketing/form-evidence.jpg", alt: "Illustration of catching a broken WordPress form" },
  "marketing-agencies": { src: "/marketing/agency-desk.jpg", alt: "Illustrated desk watching landing page health" },
  freelancers: { src: "/marketing/signal-abstract.jpg", alt: "Abstract illustration for solo developer monitoring" },
};

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
    image: `/use-cases/${u.slug}/opengraph-image`,
  });
}

export default async function UseCasePage({ params }: Props) {
  const u = getUseCase((await params).slug);
  if (!u) notFound();
  const features = u.features.map(featureBySlug).filter((f) => f !== undefined);
  const others = USE_CASES.filter((o) => o.slug !== u.slug);
  const heroImage = USE_CASE_IMAGE[u.slug];

  return (
    <MarketingShell>
      <JsonLd
        data={[
          faqLd(u.faqs),
          webPageLd({
            name: u.name,
            description: u.description,
            path: `/use-cases/${u.slug}`,
            parentName: "Use cases",
            parentPath: "/use-cases",
          }),
          breadcrumbLd([
            ["Home", "/"],
            ["Use cases", "/use-cases"],
            [u.name, `/use-cases/${u.slug}`],
          ]),
        ]}
      />

      <PageHero
        crumbs={[["Home", "/"], ["Use cases", "/use-cases"], [u.name, `/use-cases/${u.slug}`]]}
        eyebrow={`For ${audience(u)}`}
        title={u.h1}
        intro={u.intro}
        image={heroImage}
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/register"
            className="rounded-full bg-plum px-6 py-3 text-[15px] font-medium text-cream transition duration-300 hover:-translate-y-0.5 hover:bg-ink"
          >
            Start monitoring free
          </Link>
          <Link href="/contact#book" className="link-underline text-[15px] text-plum">
            Book a demo
          </Link>
        </div>
      </PageHero>

      <MotionGrid className="mx-auto mt-12 grid max-w-6xl gap-10 px-5 sm:mt-16 sm:px-6 md:grid-cols-2 md:gap-12" stagger={0.1}>
        <MotionTile>
          <SectionHeader title="Sound familiar?" description="The Monday surprises most teams still discover the hard way." />
          <ul className="mt-6 divide-y divide-plum/10 border-y border-plum/10">
            {u.pains.map((p) => (
              <li key={p} className="flex gap-3 py-3.5 text-[15px] text-ink">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-bad" />
                <span className="min-w-0">{p}</span>
              </li>
            ))}
          </ul>
        </MotionTile>
        <MotionTile>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-ink p-7 text-cream sm:rounded-[1.75rem] sm:p-9">
            <SectionHeader dark title="With Watchfront" description="Same portfolio — clearer signal, faster recovery." />
            <dl className="relative mt-6 space-y-4 border-t border-white/15 pt-5">
              {u.outcomes.map(([t, d]) => (
                <div key={t}>
                  <dt className="font-medium text-sky">{t}</dt>
                  <dd className="mt-1 text-[14px] leading-relaxed text-cream/75">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </MotionTile>
      </MotionGrid>

      <section className="mx-auto mt-16 max-w-6xl px-5 sm:mt-20 sm:px-6" aria-labelledby="features">
        <MotionSection>
          <SectionHeader
            id="features"
            title={`Features ${audience(u)} use most`}
            description="The checks that stop client calls before they start."
          />
        </MotionSection>
        <MotionGrid className="mt-6 divide-y divide-plum/10 border-y border-plum/10" stagger={0.05}>
          {features.map((f) => {
            const Icon = FEATURE_ICONS[f.slug];
            return (
              <MotionTile key={f.slug}>
                <Link href={`/features/${f.slug}`} className="group flex items-start gap-4 py-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-sky">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-medium text-ink transition group-hover:text-magenta">{f.name}</h3>
                    <p className="mt-1 line-clamp-2 text-[14px] text-plum-2">{f.short}</p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-plum transition group-hover:translate-x-1" />
                </Link>
              </MotionTile>
            );
          })}
        </MotionGrid>
      </section>

      <FaqList faqs={u.faqs} />

      <section className="mx-auto mt-16 max-w-3xl px-5 sm:px-6">
        <h2 className="text-xl font-medium text-ink">Resources for this workflow</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] text-plum-2">
          <li>
            <Link href="/website-monitoring-for-agencies" className="link-underline text-plum">
              Website monitoring for agencies
            </Link>
          </li>
          <li>
            <Link href="/resources/agency-monitoring-playbook-india" className="link-underline text-plum">
              India agency monitoring playbook
            </Link>
          </li>
          <li>
            <Link href="/resources/monitoring-sow-template" className="link-underline text-plum">
              Monitoring SOW template
            </Link>
          </li>
          <li>
            <Link href="/resources/sample-client-uptime-report" className="link-underline text-plum">
              Sample client uptime report
            </Link>
          </li>
          <li>
            <Link href="/guides/reduce-mean-time-to-detect" className="link-underline text-plum">
              How to reduce MTTD
            </Link>
          </li>
        </ul>
      </section>

      <MotionSection className="mx-auto mt-16 max-w-6xl px-5 sm:mt-20 sm:px-6" variant="up">
        <SectionHeader title="Also used by" description="Same product, different workflows." />
        <div className="mt-5 flex flex-wrap gap-2.5">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/use-cases/${o.slug}`}
              className="group inline-flex items-center gap-2 border-b border-plum/20 pb-0.5 text-[14px] text-plum transition hover:border-magenta hover:text-magenta"
            >
              {o.name} <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </MotionSection>

      <CtaBand />
    </MarketingShell>
  );
}
