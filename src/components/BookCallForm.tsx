"use client";

import { useMemo, useState } from "react";
import { Button, Input, Select } from "@/components/ui";
import { ApiError, api } from "@/lib/api";

const TOPICS = [
  "Sales / pricing",
  "Agency pilot",
  "Enterprise",
  "Product demo",
  "Support",
  "Other",
];

/** Next weekdays, slots 10:00–18:00 IST every hour. */
function buildSlots(count = 40): string[] {
  const out: string[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  while (out.length < count) {
    const day = d.getDay(); // 0 Sun … 6 Sat
    if (day !== 0) {
      for (let h = 10; h <= 18 && out.length < count; h++) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const dayNum = String(d.getDate()).padStart(2, "0");
        out.push(`${y}-${m}-${dayNum} ${String(h).padStart(2, "0")}:00 IST`);
      }
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}

export function BookCallForm({ compact = false }: { compact?: boolean }) {
  const slots = useMemo(() => buildSlots(), []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [slot, setSlot] = useState(slots[0] || "");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await api<{ message: string }>("/api/public/book-call", {
        method: "POST",
        body: { name, email, topic, slot, note },
        auth: false,
      });
      setDone(res.message);
    } catch (err: unknown) {
      setError(err instanceof ApiError ? err.message : "Could not book the call. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-3xl bg-ok/10 p-6 text-sm text-ink ring-1 ring-ok/25">
        <p className="text-lg font-semibold text-ink">You&apos;re booked.</p>
        <p className="mt-2 text-plum-2">{done}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`rounded-3xl bg-cream ${compact ? "p-5" : "p-6 md:p-8"}`}>
      <h2 className="text-xl font-semibold text-ink md:text-2xl">Book a call</h2>
      <p className="mt-1 text-sm text-plum-2">Pick a slot — we&apos;ll email you a confirmation right away.</p>
      <div className={`mt-5 grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Input label="Your name" className="bg-white" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your full name" />
        <Input label="Work email" className="bg-white" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@company.com" />
        <Select label="Topic" className="bg-white" value={topic} onChange={(e) => setTopic(e.target.value)}>
          {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
        </Select>
        <Select label="Time slot (IST)" className="bg-white" value={slot} onChange={(e) => setSlot(e.target.value)} required>
          {slots.map((s) => <option key={s} value={s}>{s}</option>)}
        </Select>
      </div>
      <div className="mt-4">
        <Input label="Anything we should know? (optional)" className="bg-white" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Agency size, number of sites…" />
      </div>
      {error && <p className="mt-3 text-sm text-bad">{error}</p>}
      <Button type="submit" className="mt-5 w-full sm:w-auto" loading={busy}>Confirm appointment</Button>
    </form>
  );
}
