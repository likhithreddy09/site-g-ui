import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Start free | Watchfront",
  description: "Create a Watchfront account and add your first website. No credit card. No code to install for uptime and SSL checks.",
  path: "/register",
  keywords: ["start Watchfront", "free website monitoring", "create account"],
  ogTitle: "Start free with Watchfront",
  ogDescription: "Add a client site in minutes. No card required to evaluate.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
