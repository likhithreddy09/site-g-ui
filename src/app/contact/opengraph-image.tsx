import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Contact Watchfront";

export default function Image() {
  return ogCard({
    eyebrow: "Contact",
    title: "Talk to the Watchfront team",
    subtitle: "Sales, support and demos - we reply from India.",
  });
}
