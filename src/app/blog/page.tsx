import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MediaFrame } from "@/components/marketing/MediaFrame";
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
  ogTitle: "Watchfront Blog - Agency Monitoring Resources",
  ogDescription: "Practical posts for agencies: care-plan monitoring, broken forms and client uptime reports.",
  image: "/blog/opengraph-image",
});

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.published.localeCompare(a.published));
  const [featured, ...rest] = posts;

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
        title="Field notes for teams who keep sites alive."
        intro="Practical posts on monitoring, care plans and client reports — not generic SEO filler."
      />

      <div className="mx-auto mt-2 grid max-w-6xl gap-10 px-5 pb-8 sm:mt-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-14">
        <div className="min-w-0">
          {featured && (
            <article className="border-b border-plum/10 pb-10">
              <Link href={`/blog/${featured.slug}`} className="block min-w-0">
                <MediaFrame
                  src={featured.image.src}
                  alt={featured.image.alt}
                  priority
                  fit="contain"
                  aspect="aspect-[16/9] min-h-[11rem] sm:min-h-[14rem]"
                  sizes="(max-width: 1024px) 100vw, 720px"
                />
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-mauve">
                <span className="text-magenta">{BLOG_CATEGORIES[featured.category]}</span>
                <span aria-hidden>·</span>
                <time dateTime={featured.published}>
                  {new Date(featured.published).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </time>
                <span aria-hidden>·</span>
                <span>{featured.readMins} min</span>
              </div>
              <h2 className="mt-3 text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                <Link href={`/blog/${featured.slug}`} className="transition hover:text-magenta">
                  {featured.h1}
                </Link>
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-plum-2 sm:text-base">{featured.excerpt}</p>
              <Link
                href={`/blog/${featured.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-plum"
              >
                Read post <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          )}

          <ul className="divide-y divide-plum/10">
            {rest.map((p) => (
              <li key={p.slug} className="group py-7">
                <div className="grid gap-5 sm:grid-cols-[140px_minmax(0,1fr)] sm:items-start sm:gap-6">
                  <Link href={`/blog/${p.slug}`} className="min-w-0">
                    <MediaFrame
                      src={p.image.src}
                      alt={p.image.alt}
                      fit="contain"
                      aspect="aspect-[4/3]"
                      sizes="140px"
                      className="max-sm:max-w-[220px]"
                    />
                  </Link>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-mauve">
                      <span className="text-magenta">{BLOG_CATEGORIES[p.category]}</span>
                      <span aria-hidden>·</span>
                      <time dateTime={p.published}>
                        {new Date(p.published).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </time>
                      <span aria-hidden>·</span>
                      <span>{p.readMins} min</span>
                    </div>
                    <h2 className="mt-2 text-lg font-medium tracking-tight text-ink transition group-hover:text-magenta sm:text-xl">
                      <Link href={`/blog/${p.slug}`}>{p.h1}</Link>
                    </h2>
                    <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-plum-2 sm:text-[15px]">{p.excerpt}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-8 border-t border-plum/10 pt-8 lg:sticky lg:top-24 lg:self-start lg:border-t-0 lg:pt-0">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-mauve">Also in resources</div>
            <ul className="mt-3 space-y-2.5 text-sm text-plum-2">
              <li><Link href="/guides" className="link-underline text-plum">Practical guides</Link></li>
              <li><Link href="/compare" className="link-underline text-plum">Compare tools</Link></li>
              <li><Link href="/tools" className="link-underline text-plum">Free checkers</Link></li>
              <li><Link href="/website-monitoring" className="link-underline text-plum">Website monitoring</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-mauve">Popular guides</div>
            <ul className="mt-3 space-y-2.5 text-sm">
              {GUIDES.slice(0, 4).map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/${g.slug}`} className="text-plum transition hover:text-magenta">{g.nav}</Link>
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
