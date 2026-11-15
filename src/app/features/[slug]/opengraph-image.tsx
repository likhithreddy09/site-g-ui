import { FEATURES, featureBySlug } from "@/lib/marketing";
import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Watchfront feature";

export function generateStaticParams() {
  return FEATURES.map((f) => ({ slug: f.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const f = featureBySlug((await params).slug);
  return ogCard({ eyebrow: "Feature", title: f?.h1 ?? "Website monitoring", subtitle: f?.short });
}
