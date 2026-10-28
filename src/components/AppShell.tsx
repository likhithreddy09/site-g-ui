"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity, AlertOctagon, Bug, Building2, ChevronDown, FileBarChart, Globe, LayoutDashboard, LogOut, Menu, MousePointerClick,
  Plug, ScanEye, Settings, TriangleAlert, X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useApi } from "@/lib/hooks";
import { Logo } from "./Logo";
import { cn } from "./ui";

const NAV = [
  { href: "/app", label: "Overview", icon: LayoutDashboard },
  { href: "/app/websites", label: "Websites", icon: Globe },
  { href: "/app/clients", label: "Clients", icon: Building2 },
  { href: "/app/incidents", label: "Incidents", icon: AlertOctagon, badge: true },
  { section: "Testing & QA" },
  { href: "/app/tests", label: "User journeys", icon: MousePointerClick },
  { href: "/app/checks", label: "Content & visual", icon: ScanEye },
  { href: "/app/api-monitors", label: "API monitors", icon: Plug },
  { href: "/app/errors", label: "Browser errors", icon: Bug },
  { section: "Agency" },
  { href: "/app/reports", label: "Client reports", icon: FileBarChart },
  { href: "/app/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const { user, workspace, workspaces, switchWorkspace, logout } = useAuth();
  const [wsOpen, setWsOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { data: health } = useApi<any>("/api/system/health", { poll: 30000 });
  const { data: inc } = useApi<any>("/api/incidents?status=active&limit=1", { poll: 30000 });
  const openCount = inc ? (inc.counts?.open || 0) + (inc.counts?.investigating || 0) : 0;

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="px-5 pb-4 pt-5"><Logo href="/app" /></div>
      <div className="relative px-3">
        <button onClick={() => setWsOpen(!wsOpen)} className="flex w-full items-center gap-3 rounded-2xl bg-cream px-3 py-2.5 text-left ring-1 ring-plum/10 transition hover:ring-plum/25">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-plum text-sm font-semibold text-cream">{workspace?.name?.[0]?.toUpperCase()}</span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-ink">{workspace?.name}</span>
            <span className="block text-[11px] capitalize text-plum/55">{workspace?.plan?.replace("_", " ")} · {workspace?.role}</span>
          </span>
          <ChevronDown className={cn("h-4 w-4 text-plum/50 transition", wsOpen && "rotate-180")} />
        </button>
        <AnimatePresence>
          {wsOpen && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              className="absolute left-3 right-3 top-full z-30 mt-2 rounded-2xl bg-white p-1.5 shadow-xl ring-1 ring-plum/10">
              {workspaces.map((w) => (
                <button key={w.id} onClick={() => switchWorkspace(w.id)} className={cn("flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-cream", w.id === workspace?.id && "bg-cream")}>
                  <span className="truncate">{w.name}</span><span className="text-[10px] capitalize text-plum/50">{w.role}</span>
                </button>
              ))}
              <Link href="/app/settings?tab=workspaces" onClick={() => setWsOpen(false)} className="mt-1 block rounded-xl px-3 py-2 text-sm text-magenta hover:bg-cream">+ New workspace</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <nav className="mt-4 flex-1 space-y-0.5 overflow-y-auto px-3 scrollbar-thin">
        {NAV.map((n, i) => {
          if ("section" in n) return <div key={i} className="px-3 pb-1.5 pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-plum/40">{n.section}</div>;
          const active = n.href === "/app" ? path === "/app" : path.startsWith(n.href);
          const Icon = n.icon;
          return (
            <Link key={n.href} href={n.href} onClick={() => setMobile(false)}
              className={cn("relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition", active ? "font-medium text-cream" : "text-plum/75 hover:bg-plum/5 hover:text-plum")}>
              {active && <motion.span layoutId="nav-active" className="absolute inset-0 rounded-xl bg-plum" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
              <Icon className="relative h-[18px] w-[18px]" />
              <span className="relative flex-1">{n.label}</span>
              {"badge" in n && openCount > 0 && <span className="relative rounded-full bg-bad px-1.5 py-0.5 font-mono text-[10px] font-semibold text-white">{openCount}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-plum/8 p-3">
        <div className="flex items-center gap-3 rounded-xl px-2 py-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky/40 text-xs font-semibold text-teal">{(user?.name || user?.email || "?")[0].toUpperCase()}</span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-ink">{user?.name}</div>
            <div className="truncate text-[11px] text-plum/50">{user?.email}</div>
          </div>
          <button onClick={logout} className="rounded-lg p-1.5 text-plum/50 hover:bg-plum/5 hover:text-bad" title="Sign out"><LogOut className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] border-r border-plum/8 bg-white lg:block">{sidebar}</aside>
      <AnimatePresence>
        {mobile && (
          <>
            <motion.div className="fixed inset-0 z-40 bg-ink/40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobile(false)} />
            <motion.aside className="fixed inset-y-0 left-0 z-50 w-[280px] bg-white lg:hidden" initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ type: "spring", damping: 30, stiffness: 300 }}>
              <button className="absolute right-3 top-5 p-1" onClick={() => setMobile(false)}><X className="h-5 w-5" /></button>
              {sidebar}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <div className="lg:pl-[264px]">
        <div className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-plum/8 bg-white/80 px-4 backdrop-blur lg:hidden">
          <button onClick={() => setMobile(true)}><Menu className="h-5 w-5 text-plum" /></button>
          <Logo href="/app" />
        </div>
        {health?.degraded && (
          <div className="flex items-center gap-3 bg-gold/25 px-6 py-2.5 text-sm text-[#6b4700]">
            <TriangleAlert className="h-4 w-4 shrink-0" />
            <span><b>Monitoring coverage degraded.</b> {health.reasons?.join(" ")}</span>
            <Link href="/app/settings?tab=system" className="link-underline ml-auto shrink-0">System status</Link>
          </div>
        )}
        <main className="mx-auto max-w-[1280px] px-4 py-8 md:px-8">{children}</main>
        <footer className="mx-auto flex max-w-[1280px] items-center gap-2 px-8 pb-8 text-[11px] text-plum/40">
          <Activity className="h-3 w-3" /> Monitoring workers {health?.workers?.length ? `online (${health.workers.length})` : "offline"} · SiteGuard
        </footer>
      </div>
    </div>
  );
}
