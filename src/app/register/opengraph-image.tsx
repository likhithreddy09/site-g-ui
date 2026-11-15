import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Start Watchfront free trial";

export default function Image() {
  return ogCard({
    eyebrow: "Start free",
    title: "Start your free 3-day trial",
    subtitle: "Add a client website in minutes. No credit card. Nothing to install.",
  });
}