"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { storage } from "@/lib/api";
import { useAuth } from "@/lib/auth";

/** Prefer auth context; fall back to token so header doesn't flash Sign in after reload. */
function useSignedIn() {
  const { ready, user } = useAuth();
  const [tokenHint, setTokenHint] = useState(false);

  useEffect(() => {
    const sync = () => setTokenHint(!!storage.token);
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("watchfront:auth", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("watchfront:auth", sync);
    };
  }, [ready, user]);

  // Show Dashboard if we have a user OR a token (token survives API blips; 401 clears it).
  return !!user || tokenHint;
}

type Tone = "light" | "ink";

export function HeaderAuthCtas({ tone = "light" }: { tone?: Tone }) {
  const signedIn = useSignedIn();
  const ink = tone === "ink";

  if (signedIn) {
    return (
      <Link
        href="/app"
        className={
          ink
            ? "rounded-full bg-cream px-4 py-2 text-sm font-medium text-ink transition hover:bg-sky sm:px-5 sm:py-2.5 sm:text-[15px]"
            : "rounded-full bg-plum px-4 py-2 text-sm font-medium text-cream transition hover:bg-ink sm:px-5 sm:py-2.5 sm:text-[15px]"
        }
      >
        Dashboard
      </Link>
    );
  }

  return (
    <>
      <Link
        href="/login"
        className={`whitespace-nowrap text-[14px] sm:text-[15px] ${
          ink ? "text-cream/80 hover:text-cream" : "text-plum hover:text-magenta"
        }`}
      >
        Sign in
      </Link>
      <Link
        href="/register"
        className={
          ink
            ? "rounded-full bg-cream px-4 py-2 text-sm font-medium text-ink transition hover:bg-sky sm:px-5 sm:py-2.5 sm:text-[15px]"
            : "rounded-full bg-plum px-4 py-2 text-sm font-medium text-cream transition hover:bg-ink sm:px-5 sm:py-2.5 sm:text-[15px]"
        }
      >
        Start free
      </Link>
    </>
  );
}

export function MobileAuthLinks() {
  const signedIn = useSignedIn();
  if (signedIn) {
    return (
      <Link href="/app" className="block rounded-lg px-3 py-2.5 font-medium text-magenta hover:bg-cream">
        Dashboard
      </Link>
    );
  }
  return (
    <>
      <Link href="/login" className="block rounded-lg px-3 py-2.5 text-plum hover:bg-cream">
        Sign in
      </Link>
      <Link href="/register" className="block rounded-lg px-3 py-2.5 font-medium text-magenta hover:bg-cream">
        Start free
      </Link>
    </>
  );
}

export function FooterAuthLinks() {
  const signedIn = useSignedIn();
  if (signedIn) {
    return (
      <Link href="/app" className="block hover:text-sky">
        Dashboard
      </Link>
    );
  }
  return (
    <>
      <Link href="/login" className="block hover:text-sky">
        Sign in
      </Link>
      <Link href="/register" className="block hover:text-sky">
        Start free
      </Link>
    </>
  );
}

export function CtaPrimaryLink({
  className,
  signedInLabel = "Go to dashboard",
  guestLabel = "Start monitoring free",
}: {
  className?: string;
  signedInLabel?: ReactNode;
  guestLabel?: ReactNode;
}) {
  const signedIn = useSignedIn();
  return (
    <Link href={signedIn ? "/app" : "/register"} className={className}>
      {signedIn ? signedInLabel : guestLabel}
    </Link>
  );
}

export function ContactAuthPrompt() {
  const signedIn = useSignedIn();
  if (signedIn) {
    return (
      <p className="mt-3">
        Already signed in?{" "}
        <Link href="/app" className="link-underline font-medium text-plum">
          Open dashboard
        </Link>
        .
      </p>
    );
  }
  return (
    <p className="mt-3">
      Rather try it first?{" "}
      <Link href="/register" className="link-underline font-medium text-plum">
        Create a free account
      </Link>
      . Already a customer?{" "}
      <Link href="/login" className="link-underline font-medium text-plum">
        Sign in
      </Link>
      .
    </p>
  );
}

/** Trial strip CTA — dashboard when session exists. */
export function BannerAuthCta() {
  const signedIn = useSignedIn();
  return (
    <Link href={signedIn ? "/app" : "/register"} className="link-underline ml-1 font-medium">
      {signedIn ? "Open dashboard →" : "Start free →"}
    </Link>
  );
}
