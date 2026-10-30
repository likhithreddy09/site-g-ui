"use client";

import { useState } from "react";
import { patch, post } from "@/lib/api";
import { useApi } from "@/lib/hooks";
import { Button, ChipInput, ErrorBox, Input, Select, Toggle } from "./ui";

export function PageCheckForm({ initial, onSaved }: { initial?: any; onSaved: (c: any) => void }) {
  const { data: sites } = useApi<any[]>("/api/websites");
  const [f, setF] = useState({
    name: initial?.name || "", url: initial?.url || "", website_id: initial?.website_id || "",
    expected_texts: initial?.expected_texts || [], required_selectors: initial?.required_selectors || [], ignore_selectors: initial?.ignore_selectors || [],
    threshold_pct: initial?.threshold_pct ?? 1, interval_sec: initial?.interval_sec || 3600, visual_enabled: initial?.visual_enabled ?? true, check_links: initial?.check_links ?? false,
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const set = (k: string, v: any) => setF((x) => ({ ...x, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const body = { ...f, website_id: f.website_id || null };
      onSaved(initial ? await patch(`/api/page-checks/${initial.id}`, body) : await post("/api/page-checks", body));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={save} className="space-y-4">
      <ErrorBox error={error} />
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Name" value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="Homepage hero & CTA" />
        <Select label="Website" value={f.website_id} onChange={(e) => set("website_id", e.target.value)}>
          <option value="">- none -</option>{sites?.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </Select>
      </div>
      <Input label="Page URL" required value={f.url} onChange={(e) => set("url", e.target.value)} placeholder="https://client.com/" />
      <ChipInput label="Expected text" values={f.expected_texts} onChange={(v) => set("expected_texts", v)} placeholder="Book a free consultation" hint="Missing text is a functional failure and opens an incident." />
      <ChipInput label="Required elements (CSS selectors)" values={f.required_selectors} onChange={(v) => set("required_selectors", v)} placeholder="form#contact, a.cta-button" />
      <div className="rounded-2xl bg-cream/60 p-4 ring-1 ring-plum/8 space-y-4">
        <Toggle checked={f.visual_enabled} onChange={(v) => set("visual_enabled", v)} label="Visual comparison" hint="Screenshot compared against an approved baseline. A visual change is flagged for review - never treated as a functional failure automatically." />
        {f.visual_enabled && (
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Change threshold (% of pixels)" type="number" step="any" min={0.01} max={50} value={f.threshold_pct} onChange={(e) => set("threshold_pct", Number(e.target.value))} />
            <ChipInput label="Hide dynamic elements" values={f.ignore_selectors} onChange={(v) => set("ignore_selectors", v)} placeholder=".carousel, #cookie-banner" />
          </div>
        )}
        <Toggle checked={f.check_links} onChange={(v) => set("check_links", v)} label="Broken-link scan" hint="Checks up to 60 links on the page." />
      </div>
      <Select label="Run every" value={f.interval_sec} onChange={(e) => set("interval_sec", Number(e.target.value))}>
        {[900, 1800, 3600, 21600, 43200, 86400].map((v) => <option key={v} value={v}>{v < 3600 ? `${v / 60} minutes` : v === 3600 ? "1 hour" : `${v / 3600} hours`}</option>)}
      </Select>
      <div className="flex justify-end"><Button type="submit" loading={saving}>{initial ? "Save" : "Create check"}</Button></div>
    </form>
  );
}
