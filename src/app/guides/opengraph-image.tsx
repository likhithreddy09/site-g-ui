import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Watchfront guides";

export default function Image() {
  return ogCard({
    eyebrow: "Guides",
    title: "Website monitoring guides",
    subtitle: "Uptime, outages, SSL expiry, broken forms and monthly maintenance for agencies.",
  });
}
