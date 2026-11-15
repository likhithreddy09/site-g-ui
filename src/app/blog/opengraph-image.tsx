import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Watchfront blog";

export default function Image() {
  return ogCard({
    eyebrow: "Blog",
    title: "Field notes for agencies who keep sites alive",
    subtitle: "Care plans, broken forms, client reports — written for operators, not buzzword bingo.",
  });
}
