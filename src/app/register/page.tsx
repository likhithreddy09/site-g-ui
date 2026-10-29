"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthLayout } from "@/components/AuthLayout";
import { Button, ErrorBox, Input } from "@/components/ui";
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
    <AuthLayout title="Start monitoring" subtitle="Create your workspace. Full access for 24 hours — then pick a plan to keep monitoring.">
      <form onSubmit={submit} className="space-y-4">
        <ErrorBox error={error} />
        <Input label="Your name" required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Priya Sharma" />
        <Input label="Agency / workspace name" required value={f.workspace_name} onChange={(e) => setF({ ...f, workspace_name: e.target.value })} placeholder="Northline Digital" />
        <Input label="Work email" type="email" required value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="you@agency.com" />
        <Input label="Password" type="password" required minLength={8} value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} hint="At least 8 characters" />
        <Button type="submit" loading={loading} className="w-full" size="lg">Create workspace</Button>
        <p className="text-center text-sm text-plum-2">Already have an account? <Link href="/login" className="link-underline text-magenta">Sign in</Link></p>
      </form>
    </AuthLayout>
  );
}
