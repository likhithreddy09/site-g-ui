import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CtaBand, JsonLd, MarketingShell, MotionGrid, MotionTile, PageHero } from "@/components/marketing/Site";
import { collectionPageLd, pageMeta } from "@/lib/seo";
import { TOOLS } from "@/lib/tools";

export const metadata = pageMeta({
  title: "Free Website Tools: Down, SSL & SEO Checker | Watchfront",
  description: "Free website tools: check if a site is down, check SSL certificate expiry, and run an on-page SEO audit. Instant results, no signup.",
  path: "/tools",
  keywords: ["free website tools", "website checker", "ssl checker", "seo checker", "website down checker"],
  ogTitle: "Free Website Tools: Down, SSL & SEO Checker | Watchfront",
  ogDescription: "Free website down, SSL expiry and on-page SEO checkers. Instant results, no signup.",
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
        intro="Check whether a site is down, when its SSL certificate expires, or how its on-page SEO scores - the same engines that power Watchfront monitoring."
      />
      <MotionGrid className="mx-auto grid max-w-6xl gap-5 px-6 md:grid-cols-3">
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
          <Link href="/tools/website-down-checker" className="link-underline text-plum">website down checker</Link> fetches your page and reports the HTTP status, response time and any DNS or TLS errors, so you can tell whether a site is down for everyone or just for you. The{" "}
          <Link href="/tools/ssl-checker" className="link-underline text-plum">SSL checker</Link> reads the certificate chain and shows the issuer, expiry date and days remaining. The{" "}
          <Link href="/tools/seo-checker" className="link-underline text-plum">SEO checker</Link> audits titles, meta descriptions, headings, canonical tags, image alt text and structured data on one page.
        </p>
        <h2 className="mt-10 text-2xl font-medium text-ink">When a one-off check is not enough</h2>
        <p className="mt-4">
          A manual check tells you how a site looks right now. Outages, expiring certificates and SEO regressions happen at 3am, after a plugin update or when a client edits a page. Watchfront repeats these checks every minute or every day across all your client sites and alerts you with evidence. Read{" "}
          <Link href="/guides/what-is-uptime-monitoring" className="link-underline text-plum">what uptime monitoring is</Link>, see the{" "}
          <Link href="/features" className="link-underline text-plum">full feature list</Link>, or{" "}
          <Link href="/compare" className="link-underline text-plum">compare Watchfront with other monitoring tools</Link>.
        </p>
      </section>
      <CtaBand title="Checks once are good. Checks every minute are better." body="Monitor uptime, SSL, SEO and forms continuously - free for 3 days." />
    </MarketingShell>
  );
}
