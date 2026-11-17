import { GLOSSARY, glossaryBySlug } from "@/lib/glossary";
import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Watchfront glossary term";

export function generateStaticParams() {
  return GLOSSARY.map((t) => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const t = glossaryBySlug((await params).slug);
  return ogCard({
    eyebrow: "Definition",
    title: t ? `What is ${t.term}?` : "Glossary",
    subtitle: t?.definition,
  });
}
