"use client";

import { Building2, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AuthError,
  AuthFieldMotion,
  AuthFormMotion,
  AuthInput,
  AuthLayout,
  AuthSubmit,
} from "@/components/AuthLayout";
import { useAuth } from "@/lib/auth";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [f, setF] = useState({ name: "", email: "", password: "", workspace_name: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register(f);
      router.push("/app?welcome=1");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="3-day free trial"
      title="Start monitoring"
      subtitle="Create your agency workspace. Every feature free for 3 days — no card required."
    >
      <form onSubmit={submit}>
        <AuthFormMotion>
          <AuthFieldMotion>
            <AuthError error={error} />
          </AuthFieldMotion>
          <AuthFieldMotion>
            <AuthInput
              label="Your name"
              icon={User}
              required
              autoComplete="name"
              value={f.name}
              onChange={(e) => setF({ ...f, name: e.target.value })}
              placeholder="Priya Sharma"
            />
          </AuthFieldMotion>
          <AuthFieldMotion>
            <AuthInput
              label="Agency / workspace"
              icon={Building2}
              required
              autoComplete="organization"
              value={f.workspace_name}
              onChange={(e) => setF({ ...f, workspace_name: e.target.value })}
              placeholder="Northline Digital"
            />
          </AuthFieldMotion>
          <AuthFieldMotion>
            <AuthInput
              label="Work email"
              type="email"
              icon={Mail}
              required
              autoComplete="email"
              inputMode="email"
              value={f.email}
              onChange={(e) => setF({ ...f, email: e.target.value })}
              placeholder="you@agency.com"
            />
          </AuthFieldMotion>
          <AuthFieldMotion>
            <AuthInput
              label="Password"
              type="password"
              icon={Lock}
              required
              minLength={8}
              autoComplete="new-password"
              value={f.password}
              onChange={(e) => setF({ ...f, password: e.target.value })}
              placeholder="At least 8 characters"
              hint="Use 8+ characters. You’ll need this to sign back in."
            />
          </AuthFieldMotion>
          <AuthFieldMotion>
            <AuthSubmit loading={loading}>Create workspace</AuthSubmit>
          </AuthFieldMotion>
          <AuthFieldMotion>
            <p className="pt-1 text-center text-[13px] text-plum-2 sm:text-sm">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-magenta underline-offset-2 hover:underline">
                Sign in
              </Link>
            </p>
          </AuthFieldMotion>
        </AuthFormMotion>
      </form>
    </AuthLayout>
  );
}
