import { BLOG_POSTS, blogBySlug } from "@/lib/blog";
import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Watchfront blog post";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = blogBySlug((await params).slug);
  return ogCard({
    eyebrow: post ? `Blog · ${post.readMins} min` : "Blog",
    title: post?.h1 ?? "Watchfront blog",
    subtitle: post?.excerpt,
  });
}
