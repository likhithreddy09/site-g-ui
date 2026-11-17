import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Agency monitoring playbook India";

export default function Image() {
  return ogCard({
    eyebrow: "Playbook",
    title: "Agency monitoring playbook for India",
    subtitle: "Stack · SOW · alerts · monthly rhythm",
  });
}
