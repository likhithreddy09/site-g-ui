import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
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

  return (
    <MarketingShell>
      <JsonLd
        data={articleLd({
          title: post.h1,
          description: post.description,
          path: `/blog/${post.slug}`,
          published: post.published,
          updated: post.updated,
        })}
      />
      <PageHero
        crumbs={[["Home", "/"], ["Blog", "/blog"], [post.nav, `/blog/${post.slug}`]]}
        eyebrow={`${BLOG_CATEGORIES[post.category]} · ${post.readMins} min read`}
        title={post.h1}
        intro={post.excerpt}
      >
        <p className="mt-4 text-xs text-plum/55">
          By {post.author} · {post.authorRole} · Updated{" "}
          <time dateTime={post.updated}>
            {new Date(post.updated).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </time>
        </p>
      </PageHero>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article className="min-w-0 max-w-3xl">
          {post.body.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2 key={i} id={slugify(block.text)} className="mt-10 scroll-mt-24 text-2xl font-medium tracking-tight text-ink first:mt-0">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "p") {
              return (
                <p key={i} className="mt-4 text-[16px] leading-relaxed text-plum-2">
                  <RichText text={block.text} />
                </p>
              );
            }
            if (block.type === "ul") {
              return (
                <ul key={i} className="mt-4 list-disc space-y-2 pl-5 text-[16px] leading-relaxed text-plum-2">
                  {block.items.map((item) => (
                    <li key={item}>
                      <RichText text={item} />
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <blockquote
                key={i}
                className="mt-8 border-l-4 border-magenta/40 bg-cream px-5 py-4 text-[16px] leading-relaxed text-ink ring-1 ring-plum/8"
              >
                <RichText text={block.text} />
                {block.cite ? <footer className="mt-2 text-sm text-plum/55">— {block.cite}</footer> : null}
              </blockquote>
            );
          })}

          <div className="mt-12 rounded-[1.5rem] bg-cream p-6 text-[15px] leading-relaxed text-plum-2 ring-1 ring-plum/8">
            <div className="font-medium text-ink">Written by {post.author}</div>
            <p className="mt-2">
              {post.authorRole}. We build monitoring for agencies and write from the failures we see on real client portfolios.{" "}
              <Link href="/about" className="link-underline text-plum">About Watchfront</Link>
              {" · "}
              <Link href="/blog" className="link-underline text-plum">More from the blog</Link>
              {" · "}
              <Link href="/security" className="link-underline text-plum">Security</Link>
            </p>
          </div>
        </article>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          {headings.length > 0 && (
            <nav aria-label="On this page" className="rounded-[1.5rem] bg-cream p-5 ring-1 ring-plum/8">
              <div className="text-xs font-medium uppercase tracking-[0.14em] text-plum/55">On this page</div>
              <ol className="mt-3 space-y-2 text-sm">
                {headings.map((h) => (
                  <li key={h}>
                    <a href={`#${slugify(h)}`} className="text-plum hover:text-magenta">
                      {h}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {post.product && (
            <Link href={`/${post.product}`} className="group block rounded-[1.5rem] bg-ink p-5 text-cream">
              <div className="text-xs uppercase tracking-[0.14em] text-sky">Product</div>
              <div className="mt-2 font-medium">Open related product page</div>
              <p className="mt-1 text-sm text-cream/70">See how Watchfront covers this workflow.</p>
              <ArrowRight className="mt-3 h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          )}
          {feature && (
            <Link href={`/features/${feature.slug}`} className="group block rounded-[1.5rem] bg-cream p-5 ring-1 ring-plum/8 hover:bg-white">
              <div className="text-xs uppercase tracking-[0.14em] text-magenta">Feature</div>
              <div className="mt-2 font-medium text-ink group-hover:text-magenta">{feature.name}</div>
              <p className="mt-1 text-sm text-plum-2">{feature.short}</p>
            </Link>
          )}
          {tool && (
            <Link href={`/tools/${tool.slug}`} className="group block rounded-[1.5rem] bg-cream p-5 ring-1 ring-plum/8 hover:bg-white">
              <div className="text-xs uppercase tracking-[0.14em] text-magenta">Free tool</div>
              <div className="mt-2 font-medium text-ink group-hover:text-magenta">{tool.name}</div>
              <p className="mt-1 text-sm text-plum-2">{tool.short}</p>
            </Link>
          )}
          {guide && (
            <Link href={`/guides/${guide.slug}`} className="group block rounded-[1.5rem] bg-cream p-5 ring-1 ring-plum/8 hover:bg-white">
              <div className="text-xs uppercase tracking-[0.14em] text-magenta">Guide</div>
              <div className="mt-2 font-medium text-ink group-hover:text-magenta">{guide.h1}</div>
            </Link>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-6xl px-5 sm:px-6" aria-labelledby="more-posts">
          <h2 id="more-posts" className="text-2xl font-medium tracking-tight text-ink">
            More from the blog
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}`} className="group block rounded-2xl bg-cream p-5 ring-1 ring-plum/8 transition hover:bg-white hover:ring-magenta/20">
                  <span className="text-xs text-plum/55">{BLOG_CATEGORIES[r.category]} · {r.readMins} min</span>
                  <h3 className="mt-1 font-medium text-ink group-hover:text-magenta">{r.h1}</h3>
                  <p className="mt-1 text-sm text-plum-2">{r.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] text-plum-2">
            Prefer how-to checklists? Browse{" "}
            <Link href="/guides" className="link-underline text-plum">guides</Link>
            {" "}or{" "}
            <Link href="/compare" className="link-underline text-plum">compare monitoring tools</Link>.
          </p>
        </section>
      )}

      <CtaBand />
    </MarketingShell>
  );
}
