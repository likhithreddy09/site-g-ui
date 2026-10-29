"use client";

import { Reorder } from "framer-motion";
import { GripVertical, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { useState } from "react";
import { patch, post } from "@/lib/api";
import { useApi } from "@/lib/hooks";
import { describeStep } from "@/lib/steps";
import { Button, ChipInput, ErrorBox, Input, Select, Toggle } from "./ui";

export const ACTIONS: Record<string, { label: string; selector?: boolean; value?: string; url?: boolean }> = {
  goto: { label: "Go to URL", url: true },
  fill: { label: "Fill field", selector: true, value: "Text (supports {{email}}, {{timestamp}}, {{random}})" },
  click: { label: "Click", selector: true },
  select: { label: "Select option", selector: true, value: "Option value" },
  check: { label: "Check checkbox", selector: true },
  press: { label: "Press key", value: "Key, e.g. Enter" },
  wait_for: { label: "Wait for element", selector: true },
  wait: { label: "Wait (ms)", value: "Milliseconds" },
  assert_visible: { label: "Assert visible", selector: true },
  assert_not_visible: { label: "Assert hidden", selector: true },
  assert_text: { label: "Assert text", value: "Expected text" },
  assert_url: { label: "Assert URL contains", value: "/thank-you" },
  screenshot: { label: "Take screenshot" },
};

type Step = { _k: string; action: string; selector?: string; value?: string; url?: string; description?: string; secret?: boolean; timeout_ms?: number };

const TEMPLATES: Record<string, Omit<Step, "_k">[]> = {
  "Contact form": [
    { action: "fill", selector: "input[name=name], input[name=full_name], #name", value: "SiteGuard Test" },
    { action: "fill", selector: "input[type=email], input[name=email]", value: "{{email}}" },
    { action: "fill", selector: "textarea, textarea[name=message]", value: "Automated monitoring test — please ignore." },
    { action: "click", selector: "button[type=submit], input[type=submit]" },
    { action: "assert_text", value: "Thank you" },
  ],
  Login: [
    { action: "fill", selector: "input[type=email], input[name=email], #email, #username", value: "test-user@example.com" },
    { action: "fill", selector: "input[type=password], #password", value: "", secret: true },
    { action: "click", selector: "button[type=submit]" },
    { action: "assert_url", value: "/dashboard" },
  ],
  Signup: [
    { action: "fill", selector: "input[name=name], #name", value: "SiteGuard Tester" },
    { action: "fill", selector: "input[type=email], input[name=email]", value: "{{email}}" },
    { action: "fill", selector: "input[type=password], #password", value: "Test-{{random}}!", secret: true },
    { action: "click", selector: "button[type=submit]" },
    { action: "assert_url", value: "/welcome" },
  ],
  "Search results": [
    { action: "fill", selector: "input[type=search], input[name=q], #search", value: "test" },
    { action: "press", value: "Enter" },
    { action: "assert_visible", selector: ".search-results, .results, [data-testid=results]" },
  ],
  "Add to cart": [
    { action: "click", selector: "button:has-text('Add to cart'), [data-add-to-cart], .add-to-cart" },
    { action: "assert_visible", selector: ".cart, [data-cart], a[href*='cart']" },
    { action: "click", selector: "a[href*='cart'], button:has-text('Cart')" },
    { action: "assert_text", value: "Cart" },
  ],
  "Booking / demo request": [
    { action: "fill", selector: "input[name=name], #name", value: "SiteGuard Test" },
    { action: "fill", selector: "input[type=email], input[name=email]", value: "{{email}}" },
    { action: "fill", selector: "input[type=tel], input[name=phone]", value: "+15555550100" },
    { action: "click", selector: "button[type=submit]" },
    { action: "assert_text", value: "Thank" },
  ],
};

let k = 0;
const key = () => `s${++k}`;

export function JourneyBuilder({ initial, onSaved }: { initial?: any; onSaved: (t: any) => void }) {
  const { data: sites } = useApi<any[]>("/api/websites");
  const [name, setName] = useState(initial?.name || "");
  const [startUrl, setStartUrl] = useState(initial?.start_url || "");
  const [websiteId, setWebsiteId] = useState(initial?.website_id || "");
  const [steps, setSteps] = useState<Step[]>((initial?.steps || []).map((s: any) => ({ ...s, _k: key() })));
  const [interval, setIntervalSec] = useState(initial?.interval_sec || 3600);
  const [retries, setRetries] = useState(initial?.retries ?? 1);
  const [threshold, setThreshold] = useState(initial?.failure_threshold || 1);
  const [severity, setSeverity] = useState(initial?.severity || "major");
  const [timeout, setTimeoutSec] = useState(initial?.timeout_sec || 90);
  const [safety, setSafety] = useState(initial?.safety || { test_mode_confirmed: false, allow_payments: false, blocked_patterns: [], cleanup_notes: "" });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const needsSafety = steps.some((s) => s.action === "fill") && steps.some((s) => s.action === "click" || s.action === "press");
  const upd = (i: number, patchS: Partial<Step>) => setSteps((x) => x.map((s, j) => (j === i ? { ...s, ...patchS } : s)));

  const save = async () => {
    setSaving(true);
    setError(null);
    const body = {
      name, start_url: startUrl, website_id: websiteId || null, interval_sec: interval, retries, failure_threshold: threshold, severity, timeout_sec: timeout, safety,
      steps: steps.map(({ _k, ...s }) => s),
    };
    try {
      onSaved(initial?.id ? await patch(`/api/browser-tests/${initial.id}`, body) : await post("/api/browser-tests", body));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <ErrorBox error={error} />
      <div className="grid gap-4 md:grid-cols-3">
        <Input label="Journey name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Contact form submits" />
        <Input label="Start URL" value={startUrl} onChange={(e) => setStartUrl(e.target.value)} placeholder="https://client.com/contact" />
        <Select label="Website" value={websiteId} onChange={(e) => setWebsiteId(e.target.value)}>
          <option value="">— none —</option>{sites?.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </Select>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-plum">Steps <span className="text-plum/45">(the start URL opens first)</span></span>
          <div className="flex gap-1.5">
            {Object.keys(TEMPLATES).map((t) => <button key={t} type="button" onClick={() => setSteps(TEMPLATES[t].map((s) => ({ ...s, _k: key() })))} className="rounded-full bg-cream px-3 py-1 text-[11px] text-plum ring-1 ring-plum/10 hover:ring-magenta/40">{t}</button>)}
          </div>
        </div>
        <Reorder.Group axis="y" values={steps} onReorder={setSteps} className="space-y-2">
          {steps.map((s, i) => {
            const meta = ACTIONS[s.action];
            return (
              <Reorder.Item key={s._k} value={s} className="flex items-start gap-2 rounded-2xl bg-cream/60 p-3 ring-1 ring-plum/8">
                <GripVertical className="mt-2.5 h-4 w-4 shrink-0 cursor-grab text-plum/30" />
                <span className="mt-2 w-5 shrink-0 font-mono text-xs text-plum/45">{i + 1}</span>
                <div className="flex-1">
                <div className="grid gap-2 md:grid-cols-[170px_1fr_1fr]">
                  <Select value={s.action} onChange={(e) => upd(i, { action: e.target.value })}>
                    {Object.entries(ACTIONS).map(([a, m]) => <option key={a} value={a}>{m.label}</option>)}
                  </Select>
                  {meta.url ? <Input value={s.url || ""} onChange={(e) => upd(i, { url: e.target.value })} placeholder="/pricing or full URL" /> :
                    meta.selector || s.action === "assert_text" || s.action === "press" ? <Input value={s.selector || ""} onChange={(e) => upd(i, { selector: e.target.value })} placeholder={meta.selector ? "CSS selector or text=Submit" : "Optional element selector"} /> : <div />}
                  {meta.value ? (
                    <div className="flex items-center gap-2">
                      <Input type={s.secret ? "password" : "text"} value={s.value || ""} onChange={(e) => upd(i, { value: e.target.value })} placeholder={meta.value} />
                      {s.action === "fill" && <label className="flex items-center gap-1 text-[10px] text-plum/60"><input type="checkbox" checked={!!s.secret} onChange={(e) => upd(i, { secret: e.target.checked })} />secret</label>}
                    </div>
                  ) : <div />}
                </div>
                <p className="mt-1.5 pl-1 text-[11px] text-plum/55">{describeStep(s)}</p>
                </div>
                <button type="button" onClick={() => setSteps((x) => x.filter((_, j) => j !== i))} className="mt-2 text-plum/40 hover:text-bad"><Trash2 className="h-4 w-4" /></button>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
        <Button type="button" variant="secondary" size="sm" className="mt-3" onClick={() => setSteps([...steps, { _k: key(), action: "click", selector: "" }])}><Plus className="h-4 w-4" /> Add step</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Select label="Run every" value={interval} onChange={(e) => setIntervalSec(Number(e.target.value))}>
          {[900, 1800, 3600, 7200, 21600, 43200, 86400].map((v) => <option key={v} value={v}>{v < 3600 ? `${v / 60} min` : `${v / 3600} h`}</option>)}
        </Select>
        <Input label="Retries" type="number" min={0} max={3} value={retries} onChange={(e) => setRetries(Number(e.target.value))} />
        <Input label="Incident after N fails" type="number" min={1} max={10} value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} />
        <Input label="Max duration (s)" type="number" min={10} max={300} value={timeout} onChange={(e) => setTimeoutSec(Number(e.target.value))} />
        <Select label="Severity" value={severity} onChange={(e) => setSeverity(e.target.value)}>{["minor", "major", "critical"].map((s) => <option key={s}>{s}</option>)}</Select>
      </div>

      <div className={`rounded-2xl p-4 ring-1 ${needsSafety && !safety.test_mode_confirmed ? "bg-gold/10 ring-gold/40" : "bg-teal/5 ring-teal/15"}`}>
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink"><ShieldCheck className="h-4 w-4 text-teal" /> Safety policy</div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <Toggle checked={safety.test_mode_confirmed} onChange={(v) => setSafety({ ...safety, test_mode_confirmed: v })}
              label="I confirm submissions are safe" hint="The form uses a test inbox / test mode, or test leads are filtered or cleaned up. Required to run journeys that submit forms." />
            <Toggle checked={safety.allow_payments} onChange={(v) => setSafety({ ...safety, allow_payments: v })}
              label="Allow payment endpoints" hint="Off by default — Stripe/PayPal/Razorpay/Square charge requests are blocked. Only enable against sandbox gateways." />
          </div>
          <div className="space-y-3">
            <ChipInput label="Block requests containing" values={safety.blocked_patterns || []} onChange={(v) => setSafety({ ...safety, blocked_patterns: v })} placeholder="/api/send-sms" hint="Requests matching any pattern are aborted." />
            <Input label="Cleanup notes" value={safety.cleanup_notes || ""} onChange={(e) => setSafety({ ...safety, cleanup_notes: e.target.value })} placeholder="Leads from siteguard-test+ are auto-deleted in CRM" />
          </div>
        </div>
        <p className="mt-3 text-[11px] text-plum/55">Requests to your site carry an <code className="font-mono">x-siteguard-test: 1</code> header so your backend can skip emails or CRM writes. Private networks are always blocked.</p>
      </div>

      <div className="flex justify-end"><Button onClick={save} loading={saving}>{initial?.id ? "Save journey" : "Create journey"}</Button></div>
    </div>
  );
}
