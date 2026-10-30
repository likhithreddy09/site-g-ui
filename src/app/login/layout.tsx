import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Sign in | Watchfront",
  description: "Sign in to your Watchfront workspace.",
  path: "/login",
  keywords: ["Watchfront login"],
  noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
