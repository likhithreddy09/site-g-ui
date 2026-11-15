import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Sign in | Watchfront",
  description: "Sign in to your Watchfront workspace to manage websites, monitors, incidents and client reports.",
  path: "/login",
  keywords: ["Watchfront login", "sign in"],
  ogTitle: "Sign in | Watchfront",
  ogDescription: "Access your Watchfront monitoring workspace.",
  image: "/opengraph-image",
  noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
