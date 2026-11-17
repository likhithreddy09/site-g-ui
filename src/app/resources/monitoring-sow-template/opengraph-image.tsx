import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Monitoring SOW template";

export default function Image() {
  return ogCard({
    eyebrow: "Template",
    title: "Website monitoring SOW",
    subtitle: "Scope, alerts, reporting — for care plans",
  });
}
