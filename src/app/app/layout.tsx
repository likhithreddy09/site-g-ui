import type { Metadata } from "next";
import { AppGate } from "@/components/AppGate";

export const metadata: Metadata = { title: { default: "Dashboard", template: "%s | Watchfront" }, robots: { index: false, follow: false } };

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppGate>{children}</AppGate>;
}
