"use client";

import { Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui";

export type WorkspaceAccess = {
  locked?: boolean;
  trial_active?: boolean;
  trial_ends_at?: string | null;
  trial_seconds_left?: number;
  access?: {
    locked?: boolean;
    trial_active?: boolean;
    seconds_left?: number;
    trial_ends_at?: string | null;
  };
};

function secondsLeft(ws: WorkspaceAccess | null | undefined): number {
  if (!ws) return 0;
  const ends = ws.trial_ends_at || ws.access?.trial_ends_at;
  if (ends) return Math.max(0, Math.floor((new Date(ends).getTime() - Date.now()) / 1000));
  if (typeof ws.trial_seconds_left === "number") return Math.max(0, ws.trial_seconds_left);
  if (typeof ws.access?.seconds_left === "number") return Math.max(0, ws.access.seconds_left);
  return 0;
}

export function isTrialLocked(ws: WorkspaceAccess | null | undefined): boolean {
  return !!(ws?.locked || ws?.access?.locked);
}

export function isTrialActive(ws: WorkspaceAccess | null | undefined): boolean {
  if (isTrialLocked(ws)) return false;
  return !!(ws?.trial_active || ws?.access?.trial_active || secondsLeft(ws) > 0);
}

function formatRemaining(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  if (h >= 1) return `${h}h ${m}m`;
  if (m >= 1) return `${m}m`;
  return `${Math.max(total, 0)}s`;
}

/** Slim banner while the 24h trial is running. */
export function TrialBanner({ ws }: { ws: WorkspaceAccess | null | undefined }) {
  const [left, setLeft] = useState(() => secondsLeft(ws));
  useEffect(() => {
    setLeft(secondsLeft(ws));
    if (!isTrialActive(ws)) return;
    const t = setInterval(() => setLeft(secondsLeft(ws)), 30_000);
    return () => clearInterval(t);
  }, [ws]);

  if (!isTrialActive(ws) || left <= 0) return null;

  return (
    <div className="flex flex-col gap-2 bg-plum px-4 py-2.5 text-sm text-cream sm:flex-row sm:items-center sm:gap-3 sm:px-6">
      <div className="flex items-start gap-2 sm:items-center">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold sm:mt-0" />
        <span>
          <b>Free trial</b> — {formatRemaining(left)} left. Add websites and explore; unlock to keep monitoring after 24 hours.
        </span>
      </div>
      <Link href="/app/billing" className="shrink-0 rounded-full bg-cream px-3 py-1 text-xs font-medium text-ink hover:bg-sky sm:ml-auto">
        See plans
      </Link>
    </div>
  );
}

/** Blurred dashboard + unlock card when trial has ended. */
export function TrialLockOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="pointer-events-none select-none blur-[5px] brightness-95 saturate-50" aria-hidden>
        {children}
      </div>
      <div className="absolute inset-0 z-10 flex min-h-[min(70vh,560px)] items-start justify-center px-3 pt-8 sm:px-6 sm:pt-14">
        <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-plum/15 sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-magenta/10 text-magenta">
            <Lock className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-center text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            Your free day is over
          </h2>
          <p className="mt-2 text-center text-sm leading-relaxed text-plum-2">
            You can still see your dashboard, but monitoring stays locked until you choose a plan.
            Keep what you set up — pick Starter, Growth, or Agency to unlock.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-plum">
            {["Continue checks & alerts", "Keep your websites and history", "Cancel anytime"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-magenta" />
                {t}
              </li>
            ))}
          </ul>
          <Button href="/app/billing" className="mt-6 w-full" size="lg">
            Unlock with a plan
          </Button>
          <p className="mt-3 text-center text-xs text-plum/50">
            Questions? <Link href="/contact#book" className="underline hover:text-magenta">Book a call</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
