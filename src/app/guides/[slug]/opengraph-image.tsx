import { GUIDES, guideBySlug } from "@/lib/guides";
import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Watchfront guide";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const g = guideBySlug((await params).slug);
  return ogCard({ eyebrow: g ? `Guide · ${g.readMins} min read` : "Guide", title: g?.h1 ?? "Website monitoring guide", subtitle: g?.description });
}
