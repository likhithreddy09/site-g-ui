import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MediaFrame } from "@/components/marketing/MediaFrame";
import { RichText } from "@/components/marketing/RichText";
import { CtaBand, JsonLd, MarketingShell, PageHero } from "@/components/marketing/Site";
import { BLOG_CATEGORIES, BLOG_POSTS, blogBySlug } from "@/lib/blog";
import { guideBySlug } from "@/lib/guides";
import { featureBySlug } from "@/lib/marketing";
import { articleLd, pageMeta } from "@/lib/seo";
import { toolBySlug } from "@/lib/tools";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => BLOG_POSTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props) {
  const post = blogBySlug((await params).slug);
  if (!post) return {};
  const meta = pageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    ogTitle: post.title,
    ogDescription: post.description,
    image: `/blog/${post.slug}/opengraph-image`,
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: post.published,
      modifiedTime: post.updated,
      authors: [post.author],
    },
  };
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function BlogPostPage({ params }: Props) {
  const post = blogBySlug((await params).slug);
  if (!post) notFound();

  const feature = post.feature ? featureBySlug(post.feature) : undefined;
  const tool = post.tool ? toolBySlug(post.tool) : undefined;
  const guide = post.guide ? guideBySlug(post.guide) : undefined;
  const related = (post.relatedSlugs || [])
    .map(blogBySlug)
    .filter((p): p is NonNullable<typeof p> => !!p);
  const headings = post.body.filter((b) => b.type === "h2").map((b) => (b as { type: "h2"; text: string }).text);
  const publishedLabel = new Date(post.updated).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const nextReads = [
    feature ? { href: `/features/${feature.slug}`, label: feature.name, kind: "Feature" } : null,
    tool ? { href: `/tools/${tool.slug}`, label: tool.name, kind: "Free tool" } : null,
    guide ? { href: `/guides/${guide.slug}`, label: guide.nav || guide.h1, kind: "Guide" } : null,
    post.product ? { href: `/${post.product}`, label: "Related product page", kind: "Product" } : null,
  ].filter((x): x is { href: string; label: string; kind: string } => !!x);

  return (
    <MarketingShell>
      <JsonLd
        data={articleLd({
          title: post.h1,
          description: post.description,
          path: `/blog/${post.slug}`,
          published: post.published,
          updated: post.updated,
          keywords: post.keywords,
        })}
      />

      <PageHero
        crumbs={[["Home", "/"], ["Blog", "/blog"], [post.nav, `/blog/${post.slug}`]]}
        eyebrow={`${BLOG_CATEGORIES[post.category]} · ${post.readMins} min read`}
        title={post.h1}
        intro={post.excerpt}
      >
        <p className="mt-5 font-mono text-[12px] text-plum/60">
          By{" "}
          <Link href="/about/editorial" className="link-underline">
            {post.author}
          </Link>{" "}
          · {post.authorRole} · Updated <time dateTime={post.updated}>{publishedLabel}</time>
        </p>
      </PageHero>

      {/* One featured image — full article width, contained */}
      <figure className="mx-auto max-w-4xl px-5 sm:px-6">
        <MediaFrame
          src={post.image.src}
          alt={post.image.alt}
          priority
          fit="contain"
          aspect="aspect-[16/10] min-h-[12rem] sm:min-h-[16rem]"
          sizes="(max-width: 896px) 100vw, 896px"
        />
        <figcaption className="mt-3 px-1 text-[13px] leading-relaxed text-plum/55">
          {post.image.alt}
        </figcaption>
      </figure>

      <div className="mx-auto mt-12 grid max-w-6xl gap-12 px-5 sm:mt-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-16">
        <article className="min-w-0 max-w-2xl">
          {post.body.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  id={slugify(block.text)}
                  className="mt-12 scroll-mt-24 border-t border-plum/10 pt-8 text-xl font-medium tracking-tight text-ink first:mt-0 first:border-t-0 first:pt-0 sm:text-2xl"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "p") {
              return (
                <p key={i} className="mt-4 text-[16px] leading-[1.7] text-plum-2 sm:text-[17px]">
                  <RichText text={block.text} />
                </p>
              );
            }
            if (block.type === "ul") {
              return (
                <ul key={i} className="mt-5 space-y-3 border-l-2 border-magenta/25 pl-5 text-[16px] leading-[1.65] text-plum-2">
                  {block.items.map((item) => (
                    <li key={item} className="min-w-0">
                      <RichText text={item} />
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <blockquote
                key={i}
                className="mt-10 border-l-2 border-magenta pl-5 text-[17px] leading-relaxed text-ink sm:text-lg"
              >
                <RichText text={block.text} />
                {block.cite ? <footer className="mt-2 text-sm text-plum/55">— {block.cite}</footer> : null}
              </blockquote>
            );
          })}

          <footer className="mt-14 border-t border-plum/10 pt-8">
            <div className="text-sm font-medium text-ink">Written by {post.author}</div>
            <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-plum-2">
              {post.authorRole}. We build monitoring for agencies and write from failures on real client portfolios.{" "}
              <Link href="/about" className="link-underline text-plum">
                About Watchfront
              </Link>
              {" · "}
              <Link href="/blog" className="link-underline text-plum">
                More posts
              </Link>
            </p>
          </footer>
        </article>

        <aside className="min-w-0 space-y-10 border-t border-plum/10 pt-8 lg:sticky lg:top-24 lg:self-start lg:border-t-0 lg:pt-0">
          {headings.length > 0 && (
            <nav aria-label="On this page">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-mauve">On this page</div>
              <ol className="mt-3 space-y-2.5 border-l border-plum/15 pl-3.5 text-[13px] leading-snug">
                {headings.map((h) => (
                  <li key={h}>
                    <a href={`#${slugify(h)}`} className="text-plum transition hover:text-magenta">
                      {h}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {nextReads.length > 0 && (
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-mauve">Keep going</div>
              <ul className="mt-3 space-y-3 text-[13px]">
                {nextReads.map((item) => (
                  <li key={item.href}>
                    <span className="block text-[11px] uppercase tracking-[0.12em] text-plum/45">{item.kind}</span>
                    <Link href={item.href} className="mt-0.5 inline-flex items-center gap-1 text-plum transition hover:text-magenta">
                      {item.label}
                      <ArrowRight className="h-3 w-3 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-16 max-w-6xl border-t border-plum/10 px-5 pt-12 sm:mt-20 sm:px-6" aria-labelledby="more-posts">
          <h2 id="more-posts" className="text-xl font-medium tracking-tight text-ink sm:text-2xl">
            More from the blog
          </h2>
          <ul className="mt-6 divide-y divide-plum/10 border-y border-plum/10">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}`} className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <div className="min-w-0">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mauve">
                      {BLOG_CATEGORIES[r.category]} · {r.readMins} min
                    </span>
                    <h3 className="mt-1 text-[16px] font-medium text-ink transition group-hover:text-magenta sm:text-lg">
                      {r.h1}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[14px] leading-relaxed text-plum-2">{r.excerpt}</p>
                  </div>
                  <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-plum transition group-hover:translate-x-1 sm:mt-0" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tool ? (
        <CtaBand
          title={`Try the free tool: ${tool.name.replace(/^Free\s+/i, "")}`}
          body="No signup. Instant result from our servers — then start a 3-day monitoring trial if you want alerts overnight."
        />
      ) : (
        <CtaBand title="Check a site free, then monitor it." body="Free down / SSL / SEO checkers — no signup. Full monitoring free for 3 days." />
      )}
      {tool ? (
        <p className="mx-auto -mt-8 mb-16 max-w-6xl px-5 text-center sm:px-6">
          <Link
            href={`/tools/${tool.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-magenta px-7 py-3.5 text-[15px] font-medium text-cream transition hover:bg-ink"
          >
            Open free checker <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      ) : (
        <p className="mx-auto -mt-8 mb-16 max-w-6xl px-5 text-center sm:px-6">
          <Link href="/tools" className="inline-flex items-center gap-2 text-[15px] font-medium text-plum transition hover:text-magenta">
            Browse all free tools <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      )}
    </MarketingShell>
  );
}
