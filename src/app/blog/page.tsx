import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand, JsonLd, MarketingShell, PageHero } from "@/components/marketing/Site";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/lib/blog";
import { GUIDES } from "@/lib/guides";
import { collectionPageLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Watchfront Blog - Agency Monitoring Resources",
  description:
    "Practical blog posts for web agencies: care-plan monitoring, broken forms, client uptime reports, and the ops habits that protect retainers.",
  path: "/blog",
  keywords: [
    "website monitoring blog",
    "agency monitoring resources",
    "wordpress care plan monitoring",
    "client uptime report",
    "website monitoring for agencies",
  ],
  image: "/blog/opengraph-image",
});

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.published.localeCompare(a.published));

  return (
    <MarketingShell>
      <JsonLd
        data={collectionPageLd({
          name: "Watchfront blog",
          description: "Resources for agencies who monitor client websites",
          path: "/blog",
          children: posts.map((p) => ({ name: p.h1, path: `/blog/${p.slug}` })),
        })}
      />
      <PageHero
        crumbs={[["Home", "/"], ["Blog", "/blog"]]}
        eyebrow="Blog & resources"
        title="Field notes for agencies who keep sites alive"
        intro="Not generic “10 tips” filler. Practical posts on monitoring, care plans and client reports — written the way agency teams actually work."
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-8 sm:px-6 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0 space-y-6">
          {posts.map((p, i) => (
            <article
              key={p.slug}
              className={`group rounded-[1.75rem] p-6 ring-1 transition sm:p-8 ${
                i === 0
                  ? "bg-ink text-cream ring-ink"
                  : "bg-cream text-ink ring-plum/8 hover:bg-white hover:ring-magenta/20"
              }`}
            >
              <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs ${i === 0 ? "text-cream/55" : "text-plum/55"}`}>
                <span className={i === 0 ? "text-sky" : "text-magenta"}>{BLOG_CATEGORIES[p.category]}</span>
                <span aria-hidden>·</span>
                <time dateTime={p.published}>
                  {new Date(p.published).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </time>
                <span aria-hidden>·</span>
                <span>{p.readMins} min read</span>
              </div>
              <h2 className={`mt-3 text-xl font-medium tracking-tight sm:text-2xl ${i === 0 ? "text-cream" : "text-ink group-hover:text-magenta"}`}>
                <Link href={`/blog/${p.slug}`}>{p.h1}</Link>
              </h2>
              <p className={`mt-3 max-w-2xl text-[15px] leading-relaxed ${i === 0 ? "text-cream/70" : "text-plum-2"}`}>{p.excerpt}</p>
              <Link
                href={`/blog/${p.slug}`}
                className={`mt-5 inline-flex items-center gap-1 text-sm font-medium ${i === 0 ? "text-sky" : "text-plum"}`}
              >
                Read post <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[1.5rem] bg-cream p-5 ring-1 ring-plum/8">
            <div className="text-xs font-medium uppercase tracking-[0.14em] text-plum/55">Also in resources</div>
            <ul className="mt-3 space-y-2 text-sm text-plum-2">
              <li><Link href="/guides" className="link-underline text-plum">Practical guides</Link></li>
              <li><Link href="/compare" className="link-underline text-plum">Compare monitoring tools</Link></li>
              <li><Link href="/tools" className="link-underline text-plum">Free website checkers</Link></li>
              <li><Link href="/website-monitoring" className="link-underline text-plum">Website monitoring product</Link></li>
            </ul>
          </div>
          <div className="rounded-[1.5rem] bg-cream p-5 ring-1 ring-plum/8">
            <div className="text-xs font-medium uppercase tracking-[0.14em] text-plum/55">Popular guides</div>
            <ul className="mt-3 space-y-2.5 text-sm">
              {GUIDES.slice(0, 4).map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/${g.slug}`} className="text-plum hover:text-magenta">{g.nav}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <CtaBand title="Prefer checks over blog posts?" body="Start a free 3-day trial and put monitoring on a real client site." />
    </MarketingShell>
  );
}
