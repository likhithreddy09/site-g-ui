import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Watchfront security";

export default function Image() {
  return ogCard({
    eyebrow: "Security",
    title: "How we protect your data",
    subtitle: "Encrypted secrets, safe live-site tests, and workers that refuse private network targets.",
  });
}
