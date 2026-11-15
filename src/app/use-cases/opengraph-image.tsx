import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Watchfront use cases";

export default function Image() {
  return ogCard({
    eyebrow: "Use cases",
    title: "Built for teams who look after client websites",
    subtitle: "Web agencies, WordPress maintainers, marketing teams and freelancers.",
  });
}
