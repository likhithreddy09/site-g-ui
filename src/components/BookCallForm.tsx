"use client";

import { useMemo, useState } from "react";
import { Button, Input, Select, cn } from "@/components/ui";
import { ApiError, api } from "@/lib/api";

const TOPICS = [
  "Sales / pricing",
  "Agency pilot",
  "Enterprise",
  "Product demo",
  "Support",
  "Other",
];

const HOURS = [10, 11, 12, 13, 14, 15, 16, 17, 18];

type DaySlots = { key: string; label: string; weekday: string; dayNum: number; month: string; hours: number[] };

/** Next weekdays (Mon-Sat), hours 10:00-18:00 IST. */
function buildDays(dayCount = 14): DaySlots[] {
  const out: DaySlots[] = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  while (out.length < dayCount) {
    const day = d.getDay(); // 0 Sun
    if (day !== 0) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const dayNum = String(d.getDate()).padStart(2, "0");
      const key = `${y}-${m}-${dayNum}`;
      out.push({
        key,
        label: d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
        weekday: d.toLocaleDateString("en-IN", { weekday: "short" }),
        dayNum: d.getDate(),
        month: d.toLocaleDateString("en-IN", { month: "short" }),
        hours: [...HOURS],
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}

function slotValue(dayKey: string, hour: number) {
  return `${dayKey} ${String(hour).padStart(2, "0")}:00 IST`;
}

function formatHour(h: number) {
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:00 ${ampm}`;
}

export function BookCallForm({ compact = false }: { compact?: boolean }) {
  const days = useMemo(() => buildDays(), []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [dayKey, setDayKey] = useState(days[0]?.key || "");
  const [hour, setHour] = useState<number | null>(days[0]?.hours[0] ?? null);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedDay = days.find((d) => d.key === dayKey) || days[0];
  const slot = dayKey && hour != null ? slotValue(dayKey, hour) : "";

  const pickDay = (key: string) => {
    setDayKey(key);
    const day = days.find((d) => d.key === key);
    if (day && (hour == null || !day.hours.includes(hour))) {
      setHour(day.hours[0] ?? null);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slot) {
      setError("Pick a date and time slot.");
      return;
    }
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
        <p className="text-lg font-medium text-ink">You&apos;re booked.</p>
        <p className="mt-2 text-plum-2">{done}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`rounded-3xl bg-cream ring-1 ring-plum/8 ${compact ? "p-5" : "p-6 md:p-8"}`}>
      <h2 className="text-xl font-medium text-ink md:text-2xl">Book a call</h2>
      <p className="mt-1 text-sm text-plum-2">Pick a date and time - we&apos;ll email you a confirmation right away.</p>

      <div className={`mt-5 grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Input label="Your name" className="bg-white" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your full name" />
        <Input label="Work email" className="bg-white" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@company.com" />
        <div className={compact ? "" : "sm:col-span-2"}>
          <Select label="Topic" className="bg-white" value={topic} onChange={(e) => setTopic(e.target.value)}>
            {TOPICS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Select>
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-medium text-ink">Pick a date (IST)</legend>
        <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-thin">
          {days.map((d) => {
            const active = d.key === dayKey;
            return (
              <button
                key={d.key}
                type="button"
                onClick={() => pickDay(d.key)}
                className={cn(
                  "flex min-w-[4.5rem] shrink-0 flex-col items-center rounded-2xl px-3 py-3 text-center transition",
                  active
                    ? "bg-ink text-cream shadow-md"
                    : "bg-white text-ink ring-1 ring-plum/10 hover:ring-magenta/30",
                )}
              >
                <span className={cn("text-[11px] uppercase tracking-wide", active ? "text-sky" : "text-plum/55")}>{d.weekday}</span>
                <span className="mt-1 text-xl font-medium leading-none">{d.dayNum}</span>
                <span className={cn("mt-1 text-[11px]", active ? "text-cream/70" : "text-plum/55")}>{d.month}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="text-sm font-medium text-ink">
          Time slot{selectedDay ? ` · ${selectedDay.label}` : ""} (IST)
        </legend>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {(selectedDay?.hours || []).map((h) => {
            const active = hour === h;
            return (
              <button
                key={h}
                type="button"
                onClick={() => setHour(h)}
                className={cn(
                  "rounded-xl px-2 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-plum text-cream"
                    : "bg-white text-ink ring-1 ring-plum/10 hover:ring-magenta/30",
                )}
              >
                {formatHour(h)}
              </button>
            );
          })}
        </div>
        {slot && (
          <p className="mt-3 text-xs text-plum/60">
            Selected: <span className="font-medium text-ink">{selectedDay?.label}</span> at{" "}
            <span className="font-medium text-ink">{hour != null ? formatHour(hour) : ""} IST</span>
          </p>
        )}
      </fieldset>

      <div className="mt-4">
        <Input label="Anything we should know? (optional)" className="bg-white" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Agency size, number of sites…" />
      </div>
      {error && <p className="mt-3 text-sm text-bad">{error}</p>}
      <Button type="submit" className="mt-5 w-full sm:w-auto" loading={busy} disabled={!slot}>
        Confirm appointment
      </Button>
    </form>
  );
}
