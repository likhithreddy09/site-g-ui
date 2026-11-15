import { COMPARISONS, comparisonBySlug } from "@/lib/compare";
import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Watchfront comparison";

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const c = comparisonBySlug((await params).slug);
  return ogCard({ eyebrow: "Comparison", title: c?.h1 ?? "Compare monitoring tools", subtitle: c?.description });
}
