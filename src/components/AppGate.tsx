"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { Spinner } from "@/components/ui";
import { useAuth } from "@/lib/auth";

export function AppGate({ children }: { children: React.ReactNode }) {
  const { ready, user, workspace } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);
  if (!ready || !user || !workspace) {
    return <div className="flex min-h-screen items-center justify-center bg-cream"><Spinner className="h-8 w-8" /></div>;
  }
  return <AppShell key={workspace.id}>{children}</AppShell>;
}
