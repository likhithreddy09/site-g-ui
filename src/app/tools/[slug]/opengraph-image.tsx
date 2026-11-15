import { TOOLS, toolBySlug } from "@/lib/tools";
import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Free Watchfront tool";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const t = toolBySlug((await params).slug);
  return ogCard({ eyebrow: "Free tool", title: t?.h1 ?? "Free website tool", subtitle: t?.short });
}
