import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Start Free — Monitor 3 Websites, No Credit Card",
  description: "Create a free SiteGuard account and monitor 3 websites with uptime checks and email alerts. Set up in minutes, no credit card or code required.",
  path: "/register",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
