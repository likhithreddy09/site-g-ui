import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Watchfront features";

export default function Image() {
  return ogCard({
    eyebrow: "Features",
    title: "Website monitoring for agencies",
    subtitle: "Uptime, SSL, SEO audits, form journeys, APIs, JS errors and client reports in one workspace.",
  });
}
