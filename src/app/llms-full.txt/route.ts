import { buildLlmsFullTxt } from "@/lib/llms";

export const dynamic = "force-static";

/** Exhaustive URL index for AI / RAG ingestion — mirrors sitemap inventory. */
export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "all",
    },
  });
}
