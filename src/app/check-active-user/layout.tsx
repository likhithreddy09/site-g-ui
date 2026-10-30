import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Active users",
  robots: { index: false, follow: false, nocache: true },
};

export default function CheckActiveUserLayout({ children }: { children: React.ReactNode }) {
  return children;
}
