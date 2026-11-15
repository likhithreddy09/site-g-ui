import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Start Your Free 3-Day Trial | Watchfront",
  description: "Create a Watchfront account and add your first website in minutes. 3-day free trial with every feature, no credit card and no code to install.",
  path: "/register",
  keywords: ["start Watchfront", "free website monitoring", "create account"],
  ogTitle: "Start free with Watchfront",
  ogDescription: "Add a client site in minutes. No card required to evaluate.",
  image: "/register/opengraph-image",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
