"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { storage } from "@/lib/api";
import { useAuth } from "@/lib/auth";

/** Prefer auth context; fall back to token so header doesn't flash Sign in after reload. */
function useSignedIn() {
  const { ready, user } = useAuth();
  const [tokenHint, setTokenHint] = useState(false);
  useEffect(() => {
    setTokenHint(!!storage.token);
  }, []);
  if (ready) return !!user;
  return tokenHint;
}

export function HeaderAuthCtas() {
  const signedIn = useSignedIn();

  if (signedIn) {
    return (
      <Link
        href="/app"
        className="rounded-full bg-plum px-4 py-2 text-sm font-medium text-cream transition hover:bg-ink sm:px-5 sm:py-2.5 sm:text-[15px]"
      >
        Go to dashboard
      </Link>
    );
  }

  return (
    <>
      <Link href="/login" className="hidden text-[15px] text-plum hover:text-magenta sm:block">Sign in</Link>
      <Link href="/register" className="rounded-full bg-plum px-4 py-2 text-sm font-medium text-cream transition hover:bg-ink sm:px-5 sm:py-2.5 sm:text-[15px]">Start free</Link>
    </>
  );
}

export function MobileAuthLinks() {
  const signedIn = useSignedIn();
  if (signedIn) {
    return <Link href="/app" className="block rounded-lg px-3 py-2.5 font-medium text-magenta hover:bg-cream">Go to dashboard</Link>;
  }
  return (
    <>
      <Link href="/login" className="block rounded-lg px-3 py-2.5 text-plum hover:bg-cream">Sign in</Link>
      <Link href="/register" className="block rounded-lg px-3 py-2.5 font-medium text-magenta hover:bg-cream">Start free</Link>
    </>
  );
}

export function FooterAuthLinks() {
  const signedIn = useSignedIn();
  if (signedIn) {
    return <Link href="/app" className="block hover:text-sky">Go to dashboard</Link>;
  }
  return (
    <>
      <Link href="/login" className="block hover:text-sky">Sign in</Link>
      <Link href="/register" className="block hover:text-sky">Start free</Link>
    </>
  );
}

export function CtaPrimaryLink({ className, signedInLabel = "Go to dashboard", guestLabel = "Start monitoring free" }: {
  className?: string;
  signedInLabel?: string;
  guestLabel?: string;
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
        Already signed in? <Link href="/app" className="link-underline font-medium text-plum">Go to dashboard</Link>.
      </p>
    );
  }
  return (
    <p className="mt-3">
      Rather try it first? <Link href="/register" className="link-underline font-medium text-plum">Create a free account</Link>.
      Already a customer? <Link href="/login" className="link-underline font-medium text-plum">Sign in</Link>.
    </p>
  );
}
