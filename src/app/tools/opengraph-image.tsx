import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Free Watchfront tools";

export default function Image() {
  return ogCard({
    eyebrow: "Free tools",
    title: "Free website checkers",
    subtitle: "Website down checker, SSL certificate checker and on-page SEO audit - instant results, no signup.",
  });
}
