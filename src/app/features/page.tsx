import { FEATURE_ICONS } from "@/components/marketing/featureIcons";
import {
  CtaBand,
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
import { FEATURES } from "@/lib/marketing";
import { collectionPageLd, pageMeta } from "@/lib/seo";
import { abs } from "@/lib/site";
import Link from "next/link";

export const metadata = pageMeta({
  title: "Website Monitoring Features: Uptime, SSL, Forms, SEO | Watchfront",
  description:
    "Full website monitoring feature list for agencies: 1-minute uptime, SSL/domain expiry, form journeys, SEO audits, APIs, JS errors and client reports.",
  path: "/features",
  keywords: [
    "website monitoring features",
    "uptime monitoring",
    "SSL monitoring",
    "contact form monitoring",
    "SEO audit",
    "API monitoring",
    "website monitoring tool",
  ],
  ogTitle: "Website Monitoring Features: Uptime, SSL, Forms, SEO | Watchfront",
  ogDescription: "Uptime, SSL, forms, SEO, APIs, JS errors and client reports - one toolkit for agency portfolios.",
  image: "/features/opengraph-image",
});

const EXTRAS = [
  ["Incident management", "Related failures grouped into one incident with severity, owner, notes and a full timeline."],
  ["AI-assisted diagnosis", "Plain-English summaries grounded in captured evidence — observed vs suspected."],
  ["Alerts where you work", "Email alerts today, with quiet hours and routing. WhatsApp coming soon."],
  ["Team & client roles", "Owners, admins, developers and read-only client access scoped to their sites."],
];

export default function FeaturesPage() {
  return (
    <MarketingShell>
      <JsonLd
        data={[
          collectionPageLd({
            name: "Features",
            description: "Watchfront website monitoring features",
            path: "/features",
            children: FEATURES.map((f) => ({ name: f.name, path: `/features/${f.slug}` })),
          }),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Watchfront features",
            itemListElement: FEATURES.map((f, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: f.name,
              url: abs(`/features/${f.slug}`),
            })),
          },
        ]}
      />
      <PageHero
        crumbs={[["Home", "/"], ["Features", "/features"]]}
        eyebrow="Features"
        title="Every check that keeps client sites honest."
        intro="Uptime, SSL, forms, APIs, visual checks and JS errors — one toolkit. Set up in minutes."
        image={{
          src: "/marketing/signal-abstract.jpg",
          alt: "Abstract illustration of monitoring signals in plum, magenta and sky",
        }}
      >
        <p className="text-[14px] text-plum-2">
          Jump to{" "}
          <Link href="/website-monitoring" className="link-underline text-plum">
            website monitoring
          </Link>
          ,{" "}
          <Link href="/uptime-monitoring-tool" className="link-underline text-plum">
            uptime
          </Link>
          , or{" "}
          <Link href="/ssl-certificate-monitoring" className="link-underline text-plum">
            SSL monitoring
          </Link>
          .
        </p>
      </PageHero>

      <MotionGrid className="mx-auto max-w-6xl px-5 sm:px-6" stagger={0.05}>
        <div className="divide-y divide-plum/10 border-b border-plum/10">
          {FEATURES.map((f) => {
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
        </div>
      </MotionGrid>

      <PageSection>
        <MotionSection variant="left">
          <div className="overflow-hidden rounded-[1.75rem] bg-ink px-6 py-10 text-cream sm:rounded-[2rem] sm:px-10 sm:py-12">
            <SectionHeader
              dark
              eyebrow="Platform"
              title="What ties it together"
              description="Incidents, diagnosis, alerts and roles — so checks become a workflow."
            />
            <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {EXTRAS.map(([t, d]) => (
                <div key={t} className="border-t border-white/15 pt-5">
                  <h3 className="text-base font-medium text-sky">{t}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-cream/70">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </MotionSection>
      </PageSection>

      <PageSection narrow>
        <MotionSection>
          <SectionHeader
            eyebrow="Retainers"
            title="Put features into a retainer"
            description="Scope checks, measure detection, and show outcomes with assets clients understand."
          />
          <p className="mt-5 text-[15px] leading-relaxed text-plum-2">
            Scope checks with the{" "}
            <Link href="/resources/monitoring-sow-template" className="link-underline text-plum">
              monitoring SOW template
            </Link>
            , measure detection with the{" "}
            <Link href="/guides/reduce-mean-time-to-detect" className="link-underline text-plum">
              MTTD guide
            </Link>
            , and show outcomes via the{" "}
            <Link href="/resources/sample-client-uptime-report" className="link-underline text-plum">
              sample client uptime report
            </Link>
            . Full stack for agencies:{" "}
            <Link href="/website-monitoring-for-agencies" className="link-underline text-plum">
              website monitoring for agencies
            </Link>
            .
          </p>
        </MotionSection>
      </PageSection>
      <CtaBand />
    </MarketingShell>
  );
}
