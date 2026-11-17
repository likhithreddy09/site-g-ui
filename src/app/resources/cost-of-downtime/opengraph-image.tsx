import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Cost of downtime calculator";

export default function Image() {
  return ogCard({
    eyebrow: "Calculator",
    title: "Cost of website downtime",
    subtitle: "Estimate revenue at risk from outage hours",
  });
}
