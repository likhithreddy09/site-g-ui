import { buildLlmsTxt } from "@/lib/llms";

export const dynamic = "force-static";

/** llmstxt.org-style brief for ChatGPT, Gemini, Perplexity and other AI crawlers. */
export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "all",
    },
  });
}
