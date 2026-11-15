"use client";

import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  AuthError,
  AuthFieldMotion,
  AuthFormMotion,
  AuthInput,
  AuthLayout,
  AuthSubmit,
} from "@/components/AuthLayout";
import { useAuth } from "@/lib/auth";

function LoginForm() {
  const { login, user, ready } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(
    params.get("expired") ? "Your session expired. Please sign in again." : null,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ready && user) router.replace("/app");
  }, [ready, user, router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      router.push("/app");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <AuthFormMotion>
        <AuthFieldMotion>
          <AuthError error={error} />
        </AuthFieldMotion>
        <AuthFieldMotion>
          <AuthInput
            label="Work email"
            type="email"
            icon={Mail}
            required
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@agency.com"
          />
        </AuthFieldMotion>
        <AuthFieldMotion>
          <AuthInput
            label="Password"
            type="password"
            icon={Lock}
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
        </AuthFieldMotion>
        <AuthFieldMotion>
          <AuthSubmit loading={loading}>Sign in</AuthSubmit>
        </AuthFieldMotion>
        <AuthFieldMotion>
          <p className="pt-1 text-center text-[13px] text-plum-2 sm:text-sm">
            New to Watchfront?{" "}
            <Link href="/register" className="font-medium text-magenta underline-offset-2 hover:underline">
              Create an account
            </Link>
          </p>
        </AuthFieldMotion>
      </AuthFormMotion>
    </form>
  );
}

export default function LoginPage() {
  return (
    <AuthLayout
      eyebrow="Agency workspace"
      title="Welcome back"
      subtitle="Sign in to your monitoring desk — same sites, same evidence, ready to go."
    >
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
