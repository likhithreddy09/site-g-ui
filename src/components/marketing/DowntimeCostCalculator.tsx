"use client";

import { useMemo, useState } from "react";

function money(n: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `${currency} ${Math.round(n).toLocaleString("en-IN")}`;
  }
}

/** Honest planning estimate: (monthlyRevenue / hoursInMonth) * downtimeHours * impact. */
export function DowntimeCostCalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(500000);
  const [downtimeHours, setDowntimeHours] = useState(2);
  const [impact, setImpact] = useState(1);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  const estimate = useMemo(() => {
    const hoursInMonth = 30 * 24;
    const perHour = monthlyRevenue / hoursInMonth;
    return perHour * downtimeHours * impact;
  }, [monthlyRevenue, downtimeHours, impact]);

  return (
    <div className="rounded-[1.75rem] bg-cream p-6 ring-1 ring-plum/8 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm text-plum-2">
          Monthly revenue
          <input
            type="number"
            min={0}
            value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue(Number(e.target.value) || 0)}
            className="mt-1.5 w-full rounded-xl border border-plum/15 bg-white px-3 py-2.5 text-ink outline-none focus:border-magenta/40"
          />
        </label>
        <label className="block text-sm text-plum-2">
          Currency
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as "INR" | "USD")}
            className="mt-1.5 w-full rounded-xl border border-plum/15 bg-white px-3 py-2.5 text-ink outline-none focus:border-magenta/40"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>
        </label>
        <label className="block text-sm text-plum-2">
          Downtime hours in the period
          <input
            type="number"
            min={0}
            step={0.1}
            value={downtimeHours}
            onChange={(e) => setDowntimeHours(Number(e.target.value) || 0)}
            className="mt-1.5 w-full rounded-xl border border-plum/15 bg-white px-3 py-2.5 text-ink outline-none focus:border-magenta/40"
          />
        </label>
        <label className="block text-sm text-plum-2">
          Impact factor (1 = full outage)
          <input
            type="number"
            min={0.1}
            max={1}
            step={0.1}
            value={impact}
            onChange={(e) => setImpact(Number(e.target.value) || 1)}
            className="mt-1.5 w-full rounded-xl border border-plum/15 bg-white px-3 py-2.5 text-ink outline-none focus:border-magenta/40"
          />
        </label>
      </div>

      <div className="mt-8 rounded-2xl bg-ink p-6 text-cream">
        <p className="text-xs uppercase tracking-[0.14em] text-sky">Estimated revenue at risk</p>
        <p className="mt-2 text-3xl font-medium sm:text-4xl">{money(estimate, currency)}</p>
        <p className="mt-3 text-sm text-cream/65">
          Formula: (monthly revenue ÷ 720 hours) × downtime hours × impact. Planning estimate only.
        </p>
      </div>
    </div>
  );
}
