import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CtaBand, JsonLd, MarketingShell, MotionGrid, MotionTile, PageHero } from "@/components/marketing/Site";
import { collectionPageLd, pageMeta } from "@/lib/seo";
import { TOOLS } from "@/lib/tools";

export const metadata = pageMeta({
  title: "Free Website Tools: Down, SSL, Headers, SEO | Watchfront",
  description:
    "Free website tools people search for: is my website down, SSL expiry, HTTP headers, security headers, Open Graph, noindex, HTTPS redirect, ping test — no signup.",
  path: "/tools",
  keywords: [
    "free website down checker",
    "down for everyone or just me free",
    "check if website is up free",
    "free ssl expiry checker",
    "free http headers checker",
    "free security headers checker",
    "free open graph checker",
    "free noindex checker",
    "free website ping test",
    "free seo checker",
  ],
  ogTitle: "Free Website Down, SSL, Headers & SEO Checkers | Watchfront",
  ogDescription: "Free is-it-down, SSL, headers, Open Graph, noindex and ping checkers — no signup.",
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
        eyebrow="Free · no signup"
        title="Free website tools for what people actually search."
        intro="Is my website down? SSL expiry? HTTP headers? Security headers? Open Graph? Noindex? HTTPS / www redirects? Ping test? Response time? Every checker is free — instant, no account."
      />
      <MotionGrid className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2 md:grid-cols-3">
        {TOOLS.map((t) => (
          <MotionTile key={t.slug}>
            <Link href={`/tools/${t.slug}`} className="group flex h-full flex-col rounded-[1.75rem] bg-cream p-7 ring-1 ring-plum/8 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:ring-magenta/20">
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-magenta">Free</span>
              <h2 className="mt-2 text-lg font-medium text-ink group-hover:text-magenta">{t.name.replace(/^Free\s+/i, "")}</h2>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-plum-2">{t.short}</p>
              <span className="mt-6 text-sm text-plum"><span className="link-underline">Try free</span> <ArrowRight className="inline h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>
          </MotionTile>
        ))}
      </MotionGrid>
      <section className="mx-auto mt-20 max-w-3xl px-6 text-[16px] leading-relaxed text-plum-2">
        <h2 className="text-2xl font-medium text-ink">What people search — and the free tool that matches</h2>
        <p className="mt-4">
          Search “is my website down” or “down for everyone or just me” →{" "}
          <Link href="/tools/website-down-checker" className="link-underline text-plum">free website down checker</Link>
          {" · "}
          <Link href="/tools/down-for-everyone-or-just-me" className="link-underline text-plum">down for everyone or just me</Link>
          {" · "}
          <Link href="/tools/check-if-website-is-up" className="link-underline text-plum">check if website is up</Link>
          . Search “SSL expiry” / “check SSL certificate” →{" "}
          <Link href="/tools/ssl-expiry-checker" className="link-underline text-plum">SSL expiry</Link>
          {" · "}
          <Link href="/tools/check-ssl-certificate" className="link-underline text-plum">check SSL certificate</Link>
          . Search “HTTP headers” / “security headers” →{" "}
          <Link href="/tools/http-headers-checker" className="link-underline text-plum">HTTP headers</Link>
          {" · "}
          <Link href="/tools/security-headers-checker" className="link-underline text-plum">security headers</Link>
          . Search “Open Graph” / “noindex” / “canonical” →{" "}
          <Link href="/tools/open-graph-checker" className="link-underline text-plum">Open Graph</Link>
          {" · "}
          <Link href="/tools/noindex-checker" className="link-underline text-plum">noindex</Link>
          {" · "}
          <Link href="/tools/canonical-tag-checker" className="link-underline text-plum">canonical</Link>
          . Also free:{" "}
          <Link href="/tools/https-redirect-checker" className="link-underline text-plum">HTTPS redirect</Link>,{" "}
          <Link href="/tools/www-redirect-checker" className="link-underline text-plum">www redirect</Link>,{" "}
          <Link href="/tools/website-ping-test" className="link-underline text-plum">ping test</Link>,{" "}
          <Link href="/tools/website-response-time-checker" className="link-underline text-plum">response time</Link>,{" "}
          <Link href="/tools/seo-checker" className="link-underline text-plum">SEO</Link>
          . Same engines as Watchfront monitoring — one live check each time.
        </p>
        <h2 className="mt-10 text-2xl font-medium text-ink">Guides that convert a check into a habit</h2>
        <p className="mt-4">
          Read{" "}
          <Link href="/blog/is-my-website-down-for-everyone-or-just-me" className="link-underline text-plum">is it down for everyone or just me?</Link>
          ,{" "}
          <Link href="/blog/how-to-check-ssl-certificate-expiry" className="link-underline text-plum">how to check SSL expiry</Link>
          ,{" "}
          <Link href="/blog/security-headers-checklist-for-client-sites" className="link-underline text-plum">security headers checklist</Link>
          , and{" "}
          <Link href="/blog/website-ping-test-vs-uptime-monitoring" className="link-underline text-plum">ping vs uptime monitoring</Link>
          — each one ends on a free tool and a trial CTA.
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
