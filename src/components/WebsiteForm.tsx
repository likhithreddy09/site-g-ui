"use client";

import { useState } from "react";
import { post, patch } from "@/lib/api";
import { useApi } from "@/lib/hooks";
import { Button, ChipInput, ErrorBox, Input, Select, Toggle } from "./ui";

export type WebsiteInput = {
  url: string; name: string; client_id: string; interval_sec: number; timeout_sec: number; retries: number; retry_delay_sec: number;
  failure_threshold: number; expected_statuses: string[]; keyword_present: string[]; keyword_absent: string[]; labels: string[];
  notes: string; ssl_enabled: boolean; domain_enabled: boolean; slow_threshold_ms: number;
};

const INTERVALS = [30, 60, 120, 300, 600, 900, 1800, 3600];

export function WebsiteForm({ initial, onSaved, onCancel }: { initial?: any; onSaved: (site: any) => void; onCancel?: () => void }) {
  const { data: clients } = useApi<any[]>("/api/clients");
  const { data: ws } = useApi<any>("/api/workspace");
  const minInterval = ws?.limits?.min_interval_sec ?? 60;
  const [f, setF] = useState<WebsiteInput>({
    url: initial?.url || "", name: initial?.name || "", client_id: initial?.client_id || "", interval_sec: initial?.interval_sec || 300,
    timeout_sec: initial?.timeout_sec || 10, retries: initial?.retries ?? 2, retry_delay_sec: initial?.retry_delay_sec || 5,
    failure_threshold: initial?.failure_threshold || 2, expected_statuses: (initial?.expected_statuses || [200, 201, 202, 203, 204, 301, 302]).map(String),
    keyword_present: initial?.keyword_present || [], keyword_absent: initial?.keyword_absent || [], labels: initial?.labels || [],
    notes: initial?.notes || "", ssl_enabled: initial?.ssl_enabled ?? true, domain_enabled: initial?.domain_enabled ?? true,
    slow_threshold_ms: initial?.slow_threshold_ms || 0,
  });
  const [advanced, setAdvanced] = useState(!!initial);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const set = (k: keyof WebsiteInput, v: any) => setF((x) => ({ ...x, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = { ...f, client_id: f.client_id || null };
      const site = initial ? await patch(`/api/websites/${initial.id}`, payload) : await post("/api/websites", payload);
      onSaved(site);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <ErrorBox error={error} />
      <Input label="Website URL" required value={f.url} onChange={(e) => set("url", e.target.value)} placeholder="https://client-site.com" autoFocus={!initial} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Display name" value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Defaults to the domain" />
        <Select label="Client" value={f.client_id} onChange={(e) => set("client_id", e.target.value)}>
          <option value="">No client</option>
          {clients?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
      </div>
      <Select label="Check every" value={f.interval_sec} onChange={(e) => set("interval_sec", Number(e.target.value))}
        hint={`Your plan allows checks as often as every ${minInterval >= 60 ? minInterval / 60 + " min" : minInterval + "s"}.`}>
        {INTERVALS.filter((i) => i >= minInterval).map((i) => <option key={i} value={i}>{i < 60 ? `${i} seconds` : i === 60 ? "1 minute" : i < 3600 ? `${i / 60} minutes` : "1 hour"}</option>)}
      </Select>
      <button type="button" onClick={() => setAdvanced(!advanced)} className="text-sm font-medium text-magenta">{advanced ? "Hide" : "Show"} failure policy & content checks</button>
      {advanced && (
        <div className="space-y-4 rounded-2xl bg-cream/60 p-4 ring-1 ring-plum/8">
          <div className="grid gap-4 sm:grid-cols-4">
            <Input label="Timeout (s)" type="number" min={2} max={60} value={f.timeout_sec} onChange={(e) => set("timeout_sec", Number(e.target.value))} />
            <Input label="Retries" type="number" min={0} max={5} value={f.retries} onChange={(e) => set("retries", Number(e.target.value))} />
            <Input label="Retry delay (s)" type="number" min={1} max={30} value={f.retry_delay_sec} onChange={(e) => set("retry_delay_sec", Number(e.target.value))} />
            <Input label="Fail threshold" type="number" min={1} max={10} value={f.failure_threshold} onChange={(e) => set("failure_threshold", Number(e.target.value))} />
          </div>
          <p className="text-[11px] text-plum/55">A check is retried {f.retries}× before it counts as failed. An incident opens after {f.failure_threshold} consecutive failed checks.</p>
          <ChipInput label="Expected status codes" values={f.expected_statuses} onChange={(v) => set("expected_statuses", v)} placeholder="200" />
          <ChipInput label="Page must contain" values={f.keyword_present} onChange={(v) => set("keyword_present", v)} placeholder="e.g. Book an appointment" hint="Detects pages that return 200 but show the wrong content." />
          <ChipInput label="Page must NOT contain" values={f.keyword_absent} onChange={(v) => set("keyword_absent", v)} placeholder="e.g. Error establishing a database connection" />
          <Input label="Slow response threshold (ms)" type="number" min={0} value={f.slow_threshold_ms} onChange={(e) => set("slow_threshold_ms", Number(e.target.value))} hint="0 disables. Slow responses mark the site as degraded." />
          <div className="grid gap-3 sm:grid-cols-2">
            <Toggle checked={f.ssl_enabled} onChange={(v) => set("ssl_enabled", v)} label="SSL certificate monitoring" />
            <Toggle checked={f.domain_enabled} onChange={(v) => set("domain_enabled", v)} label="Domain expiry tracking" />
          </div>
          <ChipInput label="Labels" values={f.labels} onChange={(v) => set("labels", v)} placeholder="wordpress, retainer…" />
          <Input label="Notes" value={f.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Hosting, contacts, quirks…" />
        </div>
      )}
      <div className="flex justify-end gap-2 pt-2">
        {onCancel && <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>}
        <Button type="submit" loading={saving}>{initial ? "Save changes" : "Add & run first check"}</Button>
      </div>
    </form>
  );
}
