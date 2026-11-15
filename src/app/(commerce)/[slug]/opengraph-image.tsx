import { PRODUCTS, productBySlug } from "@/lib/products";
import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Watchfront product";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = productBySlug((await params).slug);
  return ogCard({
    eyebrow: "Product",
    title: p?.h1 ?? "Website monitoring",
    subtitle: p?.description,
  });
}
