import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Sample client uptime report";

export default function Image() {
  return ogCard({
    eyebrow: "Resource",
    title: "Sample client uptime report",
    subtitle: "Copy this structure into your retainer PDF",
  });
}
