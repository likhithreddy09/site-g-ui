import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Watchfront resources";

export default function Image() {
  return ogCard({
    eyebrow: "Resources",
    title: "Agency monitoring playbooks & reports",
    subtitle: "Sample uptime report · India playbook · glossary",
  });
}
