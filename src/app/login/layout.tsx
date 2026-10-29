import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Sign in", description: "Sign in to Watchfront to see the health of every client website, incidents and reports.", path: "/login" });

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
