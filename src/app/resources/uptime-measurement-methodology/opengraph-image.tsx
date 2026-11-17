import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Uptime measurement methodology";

export default function Image() {
  return ogCard({
    eyebrow: "Methodology",
    title: "How we measure uptime",
    subtitle: "Checks, confirmation, uptime % — defined",
  });
}
