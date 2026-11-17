import Link from "next/link";
import { CtaBand, JsonLd, MarketingShell, PageHero } from "@/components/marketing/Site";
import { articleLd, breadcrumbLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Sample Client Uptime Report Template | Watchfront",
  description:
    "Free sample client uptime report template for agencies: page-one metrics, incident table, SSL days left, journeys and recommended next steps.",
  path: "/resources/sample-client-uptime-report",
  keywords: [
    "client uptime report template",
    "sample uptime report",
    "agency monitoring report example",
    "white label uptime report template",
  ],
  image: "/resources/sample-client-uptime-report/opengraph-image",
});

const SECTIONS = [
  {
    h: "Page one — three numbers",
    p: [
      "Uptime % for the period (name the URLs: homepage vs checkout).",
      "Incidents opened / resolved and total downtime minutes.",
      "SSL days remaining on every hostname you manage.",
    ],
    note: "If a founder only reads one screen, this is it.",
  },
  {
    h: "Incident table (no thriller novel)",
    p: [
      "Detected at · Impact · Cause (or still investigating) · Action taken.",
      "Attach evidence when you have it: status code, screenshot, console error.",
      "Never hide an outage to look perfect — clients forgive downtime, not cover-ups.",
    ],
  },
  {
    h: "Preventive work (make quiet months look intentional)",
    p: [
      "Plugin/theme updates applied after staging.",
      "Form journeys that passed every day.",
      "SEO warnings fixed before ads resumed.",
      "Certificates renewed or auto-renew verified.",
    ],
  },
  {
    h: "Close with one decision",
    p: [
      "Add the booking form journey.",
      "Raise check frequency on the campaign landing page.",
      "Expand coverage to a new microsite.",
    ],
    note: "Decision prompts renewals. Soft fluff invites “can we pause?”",
  },
];

export default function SampleReportPage() {
  const published = "2026-11-17";
  return (
    <MarketingShell>
      <JsonLd
        data={[
          articleLd({
            title: "Sample client uptime report template",
            description: "A concrete uptime report outline agencies can copy into retainers.",
            path: "/resources/sample-client-uptime-report",
            published,
            updated: published,
            keywords: ["client uptime report template", "agency monitoring report"],
          }),
          breadcrumbLd([
            ["Home", "/"],
            ["Resources", "/resources"],
            ["Sample uptime report", "/resources/sample-client-uptime-report"],
          ]),
        ]}
      />
      <PageHero
        crumbs={[
          ["Home", "/"],
          ["Resources", "/resources"],
          ["Sample report", "/resources/sample-client-uptime-report"],
        ]}
        eyebrow="Linkable resource"
        title="Sample client uptime report (copy this structure)"
        intro="A practical template — not a screenshot of charts nobody asked for. Use it in proposals, then generate the real thing from Watchfront client reports."
      />

      <article className="mx-auto max-w-3xl px-6">
        <div className="rounded-[1.5rem] bg-ink p-6 text-cream sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-sky">Example — Acme Dental · Oct 2026</p>
          <dl className="mt-5 grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs text-cream/55">Uptime</dt>
              <dd className="mt-1 text-2xl font-medium">99.93%</dd>
            </div>
            <div>
              <dt className="text-xs text-cream/55">Incidents</dt>
              <dd className="mt-1 text-2xl font-medium">2 · 11 min</dd>
            </div>
            <div>
              <dt className="text-xs text-cream/55">Next SSL</dt>
              <dd className="mt-1 text-2xl font-medium">41 days</dd>
            </div>
          </dl>
          <p className="mt-5 text-sm text-cream/70">
            Summary: Two brief DNS blips; form journey caught a mail plugin failure on the 12th; certificate renews in 41 days.
          </p>
        </div>

        {SECTIONS.map((s) => (
          <section key={s.h} className="mt-12">
            <h2 className="text-2xl font-medium tracking-tight text-ink">{s.h}</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[16px] leading-relaxed text-plum-2">
              {s.p.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
            {s.note ? <p className="mt-3 text-sm italic text-plum/60">{s.note}</p> : null}
          </section>
        ))}

        <p className="mt-12 text-[16px] leading-relaxed text-plum-2">
          Want the narrative behind the template? Read{" "}
          <Link href="/blog/what-to-put-in-client-uptime-report" className="link-underline text-plum">
            what to put in a client uptime report
          </Link>{" "}
          and productise it with{" "}
          <Link href="/features/client-reports" className="link-underline text-plum">
            client reports
          </Link>
          .
        </p>
      </article>
      <CtaBand title="Stop rebuilding this in Canva." body="Watchfront turns monitoring into a shareable report — free for 3 days." />
    </MarketingShell>
  );
}
