import { ArrowRight, Check } from "lucide-react";
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
import { FEATURES, USE_CASES, audience, featureBySlug } from "@/lib/marketing";
import { faqLd, pageMeta, webPageLd } from "@/lib/seo";
import { GUIDES } from "@/lib/guides";
import { TOOLS } from "@/lib/tools";

const FEATURE_IMAGE: Record<string, { src: string; alt: string }> = {
  "uptime-monitoring": { src: "/marketing/agency-desk.jpg", alt: "Illustration of an uptime monitoring desk" },
  "ssl-domain-monitoring": { src: "/marketing/signal-abstract.jpg", alt: "Abstract illustration for SSL and domain signals" },
  "form-journey-testing": { src: "/marketing/form-evidence.jpg", alt: "Illustration of a broken form being caught" },
  "javascript-error-monitoring": { src: "/marketing/checks-stack.jpg", alt: "Illustrated monitoring check cards" },
  "client-reports": { src: "/marketing/agency-team.jpg", alt: "Illustrated team preparing client reports" },
};

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
    image: `/features/${f.slug}/opengraph-image`,
  });
}

export default async function FeaturePage({ params }: Props) {
  const f = featureBySlug((await params).slug);
  if (!f) notFound();
  const Icon = FEATURE_ICONS[f.slug];
  const related = f.related.map(featureBySlug).filter((r) => r !== undefined);
  const forWho = USE_CASES.filter((u) => u.features.includes(f.slug));
  const tool = TOOLS.find((t) => t.feature === f.slug);
  const guides = GUIDES.filter((g) => g.feature === f.slug);
  const heroImage = FEATURE_IMAGE[f.slug];

  return (
    <MarketingShell>
      <JsonLd
        data={[
          faqLd(f.faqs),
          webPageLd({
            name: f.name,
            description: f.description,
            path: `/features/${f.slug}`,
            parentName: "Features",
            parentPath: "/features",
          }),
        ]}
      />

      <PageHero
        crumbs={[["Home", "/"], ["Features", "/features"], [f.name, `/features/${f.slug}`]]}
        eyebrow={f.name}
        title={f.h1}
        intro={f.intro}
        image={heroImage}
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/register"
            className="rounded-full bg-plum px-6 py-3 text-[15px] font-medium text-cream transition duration-300 hover:-translate-y-0.5 hover:bg-ink"
          >
            Start free - no card needed
          </Link>
          {tool ? (
            <Link href={`/tools/${tool.slug}`} className="link-underline text-[15px] text-plum">
              Try the free {tool.name.toLowerCase()}
            </Link>
          ) : (
            <Link href="/contact#book" className="link-underline text-[15px] text-plum">
              Book a demo
            </Link>
          )}
        </div>
      </PageHero>

      <MotionSection className="mx-auto max-w-6xl px-5 sm:px-6" variant="up">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-sky">
            <Icon className="h-5 w-5" />
          </span>
          <SectionHeader
            id="how"
            title="How it works"
            description="Three steps from setup to evidence — no engineering sprint required."
          />
        </div>
        <ol className="mt-8 grid gap-6 border-t border-plum/10 pt-8 sm:grid-cols-3 sm:gap-8">
          {f.steps.map(([t, d], i) => (
            <li key={t} className="min-w-0">
              <span className="font-mono text-sm text-magenta">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-base font-medium text-ink">{t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-plum-2">{d}</p>
            </li>
          ))}
        </ol>
      </MotionSection>

      <MotionSection className="mx-auto mt-16 max-w-6xl px-5 sm:mt-20 sm:px-6" variant="left">
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12">
          <SectionHeader title="What you get" description={f.short} />
          <ul className="divide-y divide-plum/10 border-y border-plum/10">
            {f.benefits.map((b) => (
              <li key={b} className="flex gap-3 py-4 text-[15px] text-ink">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-ok" />
                <span className="min-w-0">{b}</span>
              </li>
            ))}
          </ul>
        </div>
        {forWho.length > 0 && (
          <p className="mt-8 text-[14px] text-plum-2">
            Popular with{" "}
            {forWho.map((u, i) => (
              <span key={u.slug}>
                {i > 0 && (i === forWho.length - 1 ? " and " : ", ")}
                <Link href={`/use-cases/${u.slug}`} className="link-underline text-plum">
                  {audience(u)}
                </Link>
              </span>
            ))}
            .
          </p>
        )}
      </MotionSection>

      <FaqList faqs={f.faqs} />

      {related.length > 0 && (
        <section className="mx-auto mt-16 max-w-6xl px-5 sm:mt-20 sm:px-6" aria-labelledby="related">
          <MotionSection>
            <SectionHeader
              id="related"
              title="Works well with"
              description="Pair this check with the rest of your monitoring stack."
            />
          </MotionSection>
          <MotionGrid className="mt-6 divide-y divide-plum/10 border-y border-plum/10" stagger={0.05}>
            {related.map((r) => {
              const RIcon = FEATURE_ICONS[r.slug];
              return (
                <MotionTile key={r.slug}>
                  <Link
                    href={`/features/${r.slug}`}
                    className="group flex items-start gap-4 py-5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-sky">
                      <RIcon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-ink transition group-hover:text-magenta">{r.name}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-plum-2">{r.short}</p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-plum transition duration-300 group-hover:translate-x-1" />
                  </Link>
                </MotionTile>
              );
            })}
          </MotionGrid>
        </section>
      )}

      {guides.length > 0 && (
        <section className="mx-auto mt-20 max-w-6xl px-6 md:mt-24" aria-labelledby="guides">
          <MotionSection>
            <SectionHeader
              id="guides"
              title="Related guides"
              description="Short reads that pair with this feature."
            />
          </MotionSection>
          <MotionGrid className="mt-8 grid gap-4 md:grid-cols-2">
            {guides.map((g) => (
              <MotionTile key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="tile-lift group block rounded-2xl bg-cream p-5 ring-1 ring-plum/8 hover:bg-white hover:ring-magenta/20"
                >
                  <span className="text-xs text-plum/55">{g.readMins} min read</span>
                  <h3 className="mt-1 font-medium text-ink group-hover:text-magenta">{g.h1}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-plum-2">{g.description}</p>
                </Link>
              </MotionTile>
            ))}
          </MotionGrid>
        </section>
      )}

      <CtaBand title="Try it on your own website." />
    </MarketingShell>
  );
}
