import { USE_CASES, getUseCase } from "@/lib/marketing";
import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Watchfront use case";

export function generateStaticParams() {
  return USE_CASES.map((u) => ({ slug: u.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const u = getUseCase((await params).slug);
  return ogCard({ eyebrow: "Use case", title: u?.h1 ?? "Website monitoring", subtitle: u?.description });
}
