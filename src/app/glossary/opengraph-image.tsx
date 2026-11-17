import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Watchfront glossary";

export default function Image() {
  return ogCard({
    eyebrow: "Glossary",
    title: "Website monitoring terms, explained",
    subtitle: "Uptime, SSL, noindex, synthetic monitoring and more",
  });
}
