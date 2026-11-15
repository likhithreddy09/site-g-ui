import { OG_SIZE, OG_TYPE, ogCard } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Watchfront comparisons";

export default function Image() {
  return ogCard({
    eyebrow: "Compare",
    title: "Watchfront vs other monitoring tools",
    subtitle: "Honest comparisons with UptimeRobot, Pingdom, StatusCake, Better Stack and Site24x7.",
  });
}
