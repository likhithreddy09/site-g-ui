import { X } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FEATURE_ICONS } from "@/components/marketing/featureIcons";
import {
  CtaBand,
  FaqList,
  JsonLd,
  LinkRow,
  MarketingShell,
  MotionGrid,
  MotionSection,
  MotionTile,
  PageHero,
  PageSection,
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
        <div className="flex flex-wrap items-center gap-4">
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

      <PageSection>
        <MotionGrid className="grid gap-10 md:grid-cols-2 md:gap-12" stagger={0.1}>
          <MotionTile>
            <SectionHeader
              eyebrow="Pain"
              title="Sound familiar?"
              description="The Monday surprises most teams still discover the hard way."
            />
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
            <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-ink p-7 text-cream sm:p-9">
              <SectionHeader dark eyebrow="Outcome" title="With Watchfront" description="Same portfolio — clearer signal, faster recovery." />
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
      </PageSection>

      <PageSection aria-labelledby="features">
        <MotionSection>
          <SectionHeader
            id="features"
            eyebrow="Features"
            title={`Features ${audience(u)} use most`}
            description="The checks that stop client calls before they start."
          />
        </MotionSection>
        <MotionGrid className="mt-6 divide-y divide-plum/10 border-y border-plum/10" stagger={0.05}>
          {features.map((f) => {
            const Icon = FEATURE_ICONS[f.slug];
            return (
              <MotionTile key={f.slug}>
                <LinkRow
                  href={`/features/${f.slug}`}
                  title={f.name}
                  body={f.short}
                  icon={<Icon className="h-5 w-5" />}
                />
              </MotionTile>
            );
          })}
        </MotionGrid>
      </PageSection>

      <FaqList faqs={u.faqs} />

      <PageSection narrow>
        <MotionSection>
          <SectionHeader eyebrow="Resources" title="Resources for this workflow" />
          <ul className="mt-6 divide-y divide-plum/10 border-y border-plum/10 text-[15px] text-plum-2">
            {[
              ["/website-monitoring-for-agencies", "Website monitoring for agencies"],
              ["/resources/agency-monitoring-playbook-india", "India agency monitoring playbook"],
              ["/resources/monitoring-sow-template", "Monitoring SOW template"],
              ["/resources/sample-client-uptime-report", "Sample client uptime report"],
              ["/guides/reduce-mean-time-to-detect", "How to reduce MTTD"],
            ].map(([href, label]) => (
              <li key={href} className="py-3.5">
                <Link href={href} className="link-underline text-plum">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </MotionSection>
      </PageSection>

      <PageSection>
        <MotionSection variant="up">
          <SectionHeader eyebrow="More" title="Also used by" description="Same product, different workflows." />
          <div className="mt-6 flex flex-wrap gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/use-cases/${o.slug}`}
                className="rounded-full bg-white px-5 py-2.5 text-[14px] text-plum ring-1 ring-plum/10 transition hover:bg-ink hover:text-cream"
              >
                {o.name}
              </Link>
            ))}
          </div>
        </MotionSection>
      </PageSection>

      <CtaBand />
    </MarketingShell>
  );
}
