import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "About Watchfront";

export default function Image() {
  return ogCard({
    eyebrow: "About",
    title: "Website monitoring built in India",
    subtitle: "We help agencies spot broken client sites before clients do - with clear evidence, not noise.",
  });
}
