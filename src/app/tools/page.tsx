import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CtaBand, JsonLd, MarketingShell, MotionGrid, MotionTile, PageHero } from "@/components/marketing/Site";
import { collectionPageLd, pageMeta } from "@/lib/seo";
import { TOOLS } from "@/lib/tools";

export const metadata = pageMeta({
  title: "Free Website Tools: Down, SSL, SEO, Redirects | Watchfront",
  description:
    "Free website tools: down checker, HTTP status, redirect tracer, SSL expiry, SEO and meta tag checkers. Instant results, no signup.",
  path: "/tools",
  keywords: [
    "free website tools",
    "website down checker",
    "http status checker",
    "redirect checker",
    "ssl checker",
    "meta tag checker",
    "seo checker",
  ],
  ogTitle: "Free Website Tools: Down, SSL, SEO & Redirects | Watchfront",
  ogDescription: "Free down, HTTP status, redirect, SSL, SEO and meta tag checkers. Instant results, no signup.",
  image: "/tools/opengraph-image",
});

export default function ToolsPage() {
  return (
    <MarketingShell>
      <JsonLd data={collectionPageLd({
        name: "Free website tools",
        description: "Free website status, SSL and SEO checkers",
        path: "/tools",
        children: TOOLS.map((t) => ({ name: t.name, path: `/tools/${t.slug}` })),
      })} />
      <PageHero
        crumbs={[["Home", "/"], ["Free tools", "/tools"]]}
        eyebrow="Free tools"
        title="Free website checkers. Instant answers, no signup."
        intro="Check whether a site is down, trace redirects, read HTTP status, inspect SSL expiry, or audit meta tags and on-page SEO - the same engines that power Watchfront monitoring."
      />
      <MotionGrid className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2 md:grid-cols-3">
        {TOOLS.map((t) => (
          <MotionTile key={t.slug}>
            <Link href={`/tools/${t.slug}`} className="group flex h-full flex-col rounded-[1.75rem] bg-cream p-7 ring-1 ring-plum/8 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:ring-magenta/20">
              <h2 className="text-lg font-medium text-ink group-hover:text-magenta">{t.name}</h2>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-plum-2">{t.short}</p>
              <span className="mt-6 text-sm text-plum"><span className="link-underline">Open tool</span> <ArrowRight className="inline h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>
          </MotionTile>
        ))}
      </MotionGrid>
      <section className="mx-auto mt-20 max-w-3xl px-6 text-[16px] leading-relaxed text-plum-2">
        <h2 className="text-2xl font-medium text-ink">What these free checkers do</h2>
        <p className="mt-4">
          Each tool runs a single live check from our servers, the same way Watchfront monitoring does. The{" "}
          <Link href="/tools/website-down-checker" className="link-underline text-plum">website down checker</Link> and{" "}
          <Link href="/tools/http-status-checker" className="link-underline text-plum">HTTP status checker</Link> fetch your page and report status, response time and DNS/TLS errors. The{" "}
          <Link href="/tools/redirect-checker" className="link-underline text-plum">redirect checker</Link> traces every hop after migrations. The{" "}
          <Link href="/tools/ssl-checker" className="link-underline text-plum">SSL checker</Link> reads issuer, expiry and days remaining. The{" "}
          <Link href="/tools/seo-checker" className="link-underline text-plum">SEO checker</Link> and{" "}
          <Link href="/tools/meta-tag-checker" className="link-underline text-plum">meta tag checker</Link> audit titles, descriptions, canonicals, robots and social tags on one page.
        </p>
        <h2 className="mt-10 text-2xl font-medium text-ink">When a one-off check is not enough</h2>
        <p className="mt-4">
          A manual check tells you how a site looks right now. Outages, expiring certificates and SEO regressions happen at 3am, after a plugin update or when a client edits a page. Watchfront repeats these checks every minute or every day across all your client sites and alerts you with evidence. Read{" "}
          <Link href="/guides/what-is-uptime-monitoring" className="link-underline text-plum">what uptime monitoring is</Link>, learn how to{" "}
          <Link href="/guides/reduce-mean-time-to-detect" className="link-underline text-plum">reduce mean time to detect</Link>, see the{" "}
          <Link href="/features" className="link-underline text-plum">full feature list</Link>, or{" "}
          <Link href="/compare" className="link-underline text-plum">compare Watchfront with other monitoring tools</Link>.
        </p>
        <h2 className="mt-10 text-2xl font-medium text-ink">Turn a free check into a retainer conversation</h2>
        <p className="mt-4">
          Spot-check with these tools, then price risk with the{" "}
          <Link href="/resources/cost-of-downtime" className="link-underline text-plum">cost of downtime calculator</Link>, scope it with the{" "}
          <Link href="/resources/monitoring-sow-template" className="link-underline text-plum">monitoring SOW template</Link>, and show the monthly deliverable via the{" "}
          <Link href="/resources/sample-client-uptime-report" className="link-underline text-plum">sample client uptime report</Link>. Continuous coverage lives on the{" "}
          <Link href="/uptime-monitoring-tool" className="link-underline text-plum">uptime monitoring tool</Link> page.
        </p>
      </section>
      <CtaBand title="Checks once are good. Checks every minute are better." body="Monitor uptime, SSL, SEO and forms continuously - free for 3 days." />
    </MarketingShell>
  );
}
