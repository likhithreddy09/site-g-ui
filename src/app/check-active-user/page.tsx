"use client";

import { useState } from "react";
import { Button, ErrorBox, Input } from "@/components/ui";
import { api } from "@/lib/api";

type UserRow = {
  id?: string;
  email?: string;
  name?: string;
  last_seen_at?: string | null;
  last_login_at?: string | null;
  created_at?: string | null;
};

type ActivePayload = {
  live_minutes: number;
  total_users: number;
  live_count: number;
  live_users: UserRow[];
  recent_login_only: UserRow[];
  all_users: UserRow[];
  as_of: string;
};

function fmt(iso?: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function CheckActiveUserPage() {
  const [pin, setPin] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ActivePayload | null>(null);

  const unlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api<ActivePayload>("/api/ops/active-users", {
        method: "POST",
        auth: false,
        body: { pin: pin.trim(), city: city.trim() },
      });
      setData(res);
    } catch (err: any) {
      setData(null);
      setError(err?.message || "Could not unlock");
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    if (!pin.trim() || !city.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api<ActivePayload>("/api/ops/active-users", {
        method: "POST",
        auth: false,
        body: { pin: pin.trim(), city: city.trim() },
      });
      setData(res);
    } catch (err: any) {
      setError(err?.message || "Refresh failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-cream px-4 py-10 text-ink">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <header className="space-y-1">
          <p className="text-xs uppercase tracking-[0.18em] text-plum-2">Ops</p>
          <h1 className="font-display text-3xl text-plum">Active users</h1>
          <p className="text-sm text-plum-2">Enter the PIN and city of birth to view live accounts.</p>
        </header>

        {!data ? (
          <form onSubmit={unlock} className="space-y-4 rounded-2xl border border-plum/10 bg-white p-5 shadow-sm">
            <ErrorBox error={error} />
            <Input
              label="5-digit PIN"
              type="password"
              inputMode="numeric"
              autoComplete="off"
              required
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••••"
            />
            <Input
              label="City of birth"
              type="text"
              autoComplete="off"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
            <Button type="submit" loading={loading} className="w-full" size="lg">
              Unlock
            </Button>
          </form>
        ) : (
          <div className="space-y-5">
            <ErrorBox error={error} />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-plum/10 bg-white p-4">
                <p className="text-xs uppercase tracking-wide text-plum-2">Live now</p>
                <p className="mt-1 font-display text-3xl text-plum">{data.live_count}</p>
                <p className="text-xs text-plum-2">last {data.live_minutes} min</p>
              </div>
              <div className="rounded-2xl border border-plum/10 bg-white p-4">
                <p className="text-xs uppercase tracking-wide text-plum-2">Total users</p>
                <p className="mt-1 font-display text-3xl text-plum">{data.total_users}</p>
              </div>
              <div className="col-span-2 rounded-2xl border border-plum/10 bg-white p-4 sm:col-span-1">
                <p className="text-xs uppercase tracking-wide text-plum-2">As of</p>
                <p className="mt-1 text-sm text-plum">{fmt(data.as_of)}</p>
                <Button type="button" variant="secondary" size="sm" className="mt-3" loading={loading} onClick={refresh}>
                  Refresh
                </Button>
              </div>
            </div>

            <section className="overflow-hidden rounded-2xl border border-plum/10 bg-white">
              <div className="border-b border-plum/10 px-4 py-3">
                <h2 className="text-sm font-medium text-plum">Live users ({data.live_users.length})</h2>
              </div>
              {data.live_users.length === 0 ? (
                <p className="px-4 py-6 text-sm text-plum-2">No users active in the last {data.live_minutes} minutes.</p>
              ) : (
                <ul className="divide-y divide-plum/10">
                  {data.live_users.map((u) => (
                    <li key={u.id || u.email} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-plum">{u.name || "—"}</p>
                        <p className="text-xs text-plum-2">{u.email || "—"}</p>
                      </div>
                      <p className="text-xs text-plum-2">Seen {fmt(u.last_seen_at)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {data.recent_login_only.length > 0 ? (
              <section className="overflow-hidden rounded-2xl border border-plum/10 bg-white">
                <div className="border-b border-plum/10 px-4 py-3">
                  <h2 className="text-sm font-medium text-plum">
                    Recent login only ({data.recent_login_only.length})
                  </h2>
                  <p className="text-xs text-plum-2">Logged in recently but no API activity yet this window.</p>
                </div>
                <ul className="divide-y divide-plum/10">
                  {data.recent_login_only.map((u) => (
                    <li key={u.id || u.email} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-plum">{u.name || "—"}</p>
                        <p className="text-xs text-plum-2">{u.email || "—"}</p>
                      </div>
                      <p className="text-xs text-plum-2">Login {fmt(u.last_login_at)}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="overflow-hidden rounded-2xl border border-plum/10 bg-white">
              <div className="border-b border-plum/10 px-4 py-3">
                <h2 className="text-sm font-medium text-plum">All users ({data.all_users?.length ?? data.total_users})</h2>
                <p className="text-xs text-plum-2">Name and email for every account.</p>
              </div>
              {(data.all_users?.length ?? 0) === 0 ? (
                <p className="px-4 py-6 text-sm text-plum-2">No users found.</p>
              ) : (
                <ul className="divide-y divide-plum/10">
                  {data.all_users.map((u) => (
                    <li key={u.id || u.email} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-plum">{u.name || "—"}</p>
                        <p className="text-xs text-plum-2">{u.email || "—"}</p>
                      </div>
                      <div className="text-xs text-plum-2 sm:text-right">
                        <p>Login {fmt(u.last_login_at)}</p>
                        <p>Seen {fmt(u.last_seen_at)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <button
              type="button"
              className="text-sm text-plum-2 underline-offset-2 hover:underline"
              onClick={() => {
                setData(null);
                setPin("");
                setCity("");
              }}
            >
              Lock again
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
