"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown, ArrowLeft, ArrowUp, CheckCircle2, CornerDownLeft, Eye, Globe, Keyboard, Link2, ListChecks, Loader2,
  MousePointerClick, ShieldCheck, Sparkles, Timer, Trash2, Type, X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "./toast";
import { Button, Input, Select, cn } from "./ui";
import { ApiError, del, post } from "@/lib/api";
import { useApi } from "@/lib/hooks";
import { isCheckStep } from "@/lib/steps";

type Box = { x: number; y: number; w: number; h: number };
type State = { url: string; title: string; screenshot: string; viewport: { width: number; height: number }; elements: Box[]; scroll_y: number; page_height: number };
type Info = { kind: string; tag: string; type: string; label: string; text: string; selector: string; options: { value: string; label: string }[]; is_submit: boolean; is_password: boolean; in_form: boolean; box: Box };
type Step = { action: string; selector?: string; value?: string; url?: string; secret?: boolean; description: string; label?: string; kind?: string };

const GOALS = [
  { id: "contact", label: "A contact or enquiry form", name: "Contact form works", tip: "Click each field to type test details, click Send, then check the thank-you message." },
  { id: "login", label: "Logging in", name: "Login works", tip: "Type a test account's details, click Log in, then check something only logged-in users see." },
  { id: "booking", label: "A booking or 'Get started' button", name: "Booking button works", tip: "Click the button, then check the next page or form appears." },
  { id: "custom", label: "Something else", name: "User journey", tip: "Click through the steps a visitor would take, then add a check at the end." },
];
const QUICK_VALUES = [
  { label: "Unique test email", value: "{{email}}" },
  { label: "Test name", value: "Watchfront Test" },
  { label: "Test phone", value: "9999999999" },
  { label: "Test message", value: "Automated website check — please ignore." },
];

const stepIcon = (a: string) =>
  a === "click" ? MousePointerClick : a === "fill" ? Type : a === "goto" ? Globe : a === "press" ? CornerDownLeft : a === "wait" ? Timer : a.startsWith("assert") ? CheckCircle2 : Keyboard;

export function JourneyRecorder({ onClose, onSaved, defaultWebsiteId }: { onClose: () => void; onSaved: (t: any) => void; defaultWebsiteId?: string }) {
  const toast = useToast();
  const { data: sites } = useApi<any[]>("/api/websites");
  const [phase, setPhase] = useState<"start" | "record" | "save">("start");
  const [goal, setGoal] = useState(GOALS[0]);
  const [websiteId, setWebsiteId] = useState(defaultWebsiteId || "");
  const [startUrl, setStartUrl] = useState("");
  const [sid, setSid] = useState<string | null>(null);
  const [state, setState] = useState<State | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<Info | null>(null);
  const [hover, setHover] = useState<Box | null>(null);
  const [address, setAddress] = useState("");
  const [askText, setAskText] = useState<"text" | "url" | null>(null);
  const sidRef = useRef<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!startUrl && websiteId && sites) setStartUrl(sites.find((s) => s.id === websiteId)?.url || "");
  }, [websiteId, sites, startUrl]);
  useEffect(() => () => { if (sidRef.current) del(`/api/recorder/sessions/${sidRef.current}`).catch(() => {}); }, []);
  useEffect(() => { if (state) setAddress(state.url); }, [state]);

  const fail = (e: any) => {
    if (e instanceof ApiError && e.status === 410) {
      setErr("The recording session timed out after 10 minutes of inactivity. Your steps are kept — click “Finish & save”, or start again.");
    } else setErr(e.message);
  };

  const open = async () => {
    setBusy("Opening the website in a secure browser…");
    setErr(null);
    try {
      const r = await post("/api/recorder/sessions", { url: startUrl });
      sidRef.current = r.session_id;
      setSid(r.session_id);
      setState(r.state);
      setStartUrl(r.start_url);
      setPhase("record");
    } catch (e: any) {
      fail(e);
    } finally {
      setBusy(null);
    }
  };

  const act = useCallback(async (payload: any, label: string) => {
    if (!sid) return;
    setBusy(label);
    setErr(null);
    setInfo(null);
    try {
      const r = await post(`/api/recorder/sessions/${sid}/action`, payload);
      setState(r.state);
      if (r.step) setSteps((s) => [...s, r.step]);
    } catch (e: any) {
      fail(e);
    } finally {
      setBusy(null);
    }
  }, [sid]);

  const toPage = (e: React.MouseEvent) => {
    const img = imgRef.current;
    if (!img || !state) return null;
    const r = img.getBoundingClientRect();
    return { x: Math.round(((e.clientX - r.left) / r.width) * state.viewport.width), y: Math.round(((e.clientY - r.top) / r.height) * state.viewport.height) };
  };

  const onMove = (e: React.MouseEvent) => {
    if (!state || info) return;
    const p = toPage(e);
    if (!p) return;
    const hits = state.elements.filter((b) => p.x >= b.x && p.x <= b.x + b.w && p.y >= b.y && p.y <= b.y + b.h);
    setHover(hits.sort((a, b) => a.w * a.h - b.w * b.h)[0] || null);
  };

  const onClick = async (e: React.MouseEvent) => {
    if (!sid || busy) return;
    if (info) { setInfo(null); return; }
    const p = toPage(e);
    if (!p) return;
    setBusy("Looking at what you clicked…");
    setErr(null);
    try {
      setInfo(await post(`/api/recorder/sessions/${sid}/inspect`, p));
    } catch (er: any) {
      fail(er);
    } finally {
      setBusy(null);
    }
  };

  const pct = (b: Box) => state && ({ left: `${(b.x / state.viewport.width) * 100}%`, top: `${(b.y / state.viewport.height) * 100}%`, width: `${(b.w / state.viewport.width) * 100}%`, height: `${(b.h / state.viewport.height) * 100}%` });

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-cream">
      <header className="flex items-center gap-4 border-b border-plum/10 bg-white px-5 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-magenta text-white"><MousePointerClick className="h-4 w-4" /></span> Record a user journey</div>
        <ol className="ml-4 hidden items-center gap-2 text-xs md:flex">
          {["Choose the page", "Click through it", "Save & schedule"].map((l, i) => {
            const idx = ["start", "record", "save"].indexOf(phase);
            return <li key={l} className={cn("flex items-center gap-1.5 rounded-full px-3 py-1", i === idx ? "bg-plum text-cream" : i < idx ? "bg-ok/10 text-ok" : "bg-plum/5 text-plum/50")}>{i < idx ? "✓" : i + 1}. {l}</li>;
          })}
        </ol>
        <button onClick={onClose} className="ml-auto rounded-lg p-2 text-plum/50 hover:bg-plum/5 hover:text-ink" aria-label="Close recorder"><X className="h-5 w-5" /></button>
      </header>

      {phase === "start" && (
        <div className="flex flex-1 items-center justify-center overflow-y-auto p-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-plum/10">
            <h2 className="text-2xl font-semibold text-ink">What should we test?</h2>
            <p className="mt-1 text-sm text-plum/70">No code needed. You&apos;ll click through the website like a visitor, and Watchfront repeats it on a schedule and alerts you if it stops working.</p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {GOALS.map((g) => (
                <button key={g.id} onClick={() => setGoal(g)} className={cn("rounded-2xl p-4 text-left text-sm ring-1 transition", goal.id === g.id ? "bg-plum text-cream ring-plum" : "bg-cream/50 text-ink ring-plum/10 hover:ring-magenta/40")}>{g.label}</button>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Select label="Website" value={websiteId} onChange={(e) => { setWebsiteId(e.target.value); setStartUrl(sites?.find((s) => s.id === e.target.value)?.url || ""); }}>
                <option value="">— choose —</option>{sites?.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </Select>
              <Input label="Page to start on" value={startUrl} onChange={(e) => setStartUrl(e.target.value)} placeholder="https://client.com/contact" />
            </div>
            <p className="mt-4 rounded-xl bg-sky/15 px-4 py-3 text-xs text-plum/80"><Sparkles className="mr-1 inline h-3.5 w-3.5 text-teal" />{goal.tip}</p>
            {err && <p className="mt-3 text-sm text-bad">{err}</p>}
            <div className="mt-6 flex justify-end"><Button onClick={open} loading={!!busy} disabled={!startUrl}>Open website <ArrowLeft className="h-4 w-4 rotate-180" /></Button></div>
          </motion.div>
        </div>
      )}

      {phase === "record" && state && (
        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          <section className="flex min-h-0 flex-1 flex-col p-4">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <form className="flex min-w-[260px] flex-1 items-center gap-2 rounded-xl bg-white px-3 ring-1 ring-plum/15" onSubmit={(e) => { e.preventDefault(); act({ action: "goto", value: address }, "Opening that address…"); }}>
                <Globe className="h-4 w-4 text-plum/40" />
                <input value={address} onChange={(e) => setAddress(e.target.value)} className="h-9 flex-1 bg-transparent text-sm outline-none" aria-label="Web address" />
              </form>
              <ToolBtn icon={ArrowUp} label="Scroll up" onClick={() => act({ action: "scroll", dy: -600 }, "Scrolling…")} disabled={!!busy || state.scroll_y <= 0} />
              <ToolBtn icon={ArrowDown} label="Scroll down" onClick={() => act({ action: "scroll", dy: 600 }, "Scrolling…")} disabled={!!busy || state.scroll_y + state.viewport.height >= state.page_height} />
              <ToolBtn icon={ListChecks} label="Check text" onClick={() => setAskText("text")} disabled={!!busy} highlight />
              <ToolBtn icon={Link2} label="Check address" onClick={() => setAskText("url")} disabled={!!busy} />
              <ToolBtn icon={CornerDownLeft} label="Press Enter" onClick={() => act({ action: "press", value: "Enter" }, "Pressing Enter…")} disabled={!!busy} />
              <ToolBtn icon={Timer} label="Wait 2s" onClick={() => act({ action: "wait", value: "2000" }, "Waiting…")} disabled={!!busy} />
            </div>

            <AnimatePresence>
              {askText && (
                <motion.form initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-3 flex items-center gap-2 rounded-xl bg-white p-2 ring-1 ring-magenta/30"
                  onSubmit={(e) => { e.preventDefault(); const v = String(new FormData(e.currentTarget).get("v") || "").trim(); if (v) act({ action: askText === "text" ? "assert_text" : "assert_url", value: v }, "Checking…"); setAskText(null); }}>
                  <span className="pl-2 text-sm text-plum">{askText === "text" ? "The page should show:" : "The web address should contain:"}</span>
                  <input name="v" autoFocus className="h-9 flex-1 rounded-lg bg-cream/60 px-3 text-sm outline-none ring-1 ring-plum/10" placeholder={askText === "text" ? "Thank you for your message" : "/thank-you"} />
                  <Button size="sm" type="submit">Add check</Button>
                  <Button size="sm" variant="ghost" type="button" onClick={() => setAskText(null)}>Cancel</Button>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="relative min-h-0 flex-1 overflow-auto rounded-2xl bg-white shadow-inner ring-1 ring-plum/10 scrollbar-thin">
              <div className="relative cursor-crosshair select-none" onMouseMove={onMove} onMouseLeave={() => setHover(null)} onClick={onClick}>
                <img ref={imgRef} src={state.screenshot} alt={`Live view of ${state.title}`} className="block w-full" draggable={false} />
                {hover && !info && <div className="pointer-events-none absolute rounded-md bg-magenta/10 ring-2 ring-magenta transition-all duration-75" style={pct(hover) || undefined} />}
                {info && <div className="pointer-events-none absolute rounded-md bg-sky/20 ring-2 ring-teal" style={pct(info.box) || undefined} />}
                {info && <ActionMenu info={info} state={state} onAct={act} onClose={() => setInfo(null)} />}
              </div>
              {busy && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
                  <div className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm text-cream shadow-lg"><Loader2 className="h-4 w-4 animate-spin" /> {busy}</div>
                </div>
              )}
            </div>
            {err && <div className="mt-2 rounded-xl bg-bad/8 px-4 py-2 text-sm text-bad">{err}</div>}
            <p className="mt-2 text-xs text-plum/55">Click anything on the page to choose what to do with it. Actions happen on the real website. Payment requests are always blocked.</p>
          </section>

          <aside className="flex w-full flex-col border-t border-plum/10 bg-white lg:w-[340px] lg:border-l lg:border-t-0">
            <div className="border-b border-plum/8 px-5 py-4">
              <h3 className="font-semibold text-ink">Your steps</h3>
              <p className="text-xs text-plum/60">Watchfront opens <span className="font-mono">{new URL(startUrl).pathname}</span> first, then repeats these.</p>
            </div>
            <ol className="flex-1 space-y-2 overflow-y-auto p-4 scrollbar-thin">
              {steps.length === 0 && (
                <li className="rounded-2xl bg-cream/60 p-4 text-sm text-plum/75">
                  <p className="font-medium text-ink">How to record</p>
                  <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs">
                    <li>Click a field on the page and type test details.</li>
                    <li>Click buttons and links like a visitor would.</li>
                    <li>Finish with a <b>check</b>, e.g. “Check text” → <i>Thank you</i>. A journey without a check only proves the clicks worked.</li>
                  </ol>
                </li>
              )}
              <AnimatePresence initial={false}>
                {steps.map((s, i) => {
                  const Icon = stepIcon(s.action);
                  return (
                    <motion.li key={i} layout initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, height: 0 }}
                      className={cn("group flex items-start gap-3 rounded-2xl p-3 text-sm ring-1", isCheckStep(s) ? "bg-ok/5 ring-ok/20" : "bg-cream/50 ring-plum/8")}>
                      <span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white", isCheckStep(s) ? "bg-ok" : "bg-plum")}><Icon className="h-3.5 w-3.5" /></span>
                      <span className="flex-1 text-ink"><span className="mr-1 font-mono text-[11px] text-plum/40">{i + 1}</span>{s.description}</span>
                      <button onClick={() => setSteps((x) => x.filter((_, j) => j !== i))} className="text-plum/30 opacity-0 transition group-hover:opacity-100 hover:text-bad" aria-label="Remove step"><Trash2 className="h-4 w-4" /></button>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ol>
            <div className="space-y-2 border-t border-plum/8 p-4">
              {steps.length > 0 && !steps.some(isCheckStep) && <p className="text-xs text-[#8a5b00]">Tip: add a check at the end so Watchfront knows what success looks like.</p>}
              <Button className="w-full" disabled={!steps.length} onClick={() => setPhase("save")}>Finish & save</Button>
            </div>
          </aside>
        </div>
      )}

      {phase === "save" && (
        <SaveStep steps={steps} startUrl={startUrl} websiteId={websiteId} defaultName={goal.name}
          onBack={() => setPhase(sid ? "record" : "start")} onSaved={(t) => { toast("Journey saved"); onSaved(t); }} />
      )}
    </div>
  );
}

function ToolBtn({ icon: Icon, label, onClick, disabled, highlight }: { icon: any; label: string; onClick: () => void; disabled?: boolean; highlight?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className={cn("flex h-9 items-center gap-1.5 rounded-xl px-3 text-xs font-medium ring-1 transition disabled:opacity-40", highlight ? "bg-ok/10 text-ok ring-ok/25 hover:bg-ok/15" : "bg-white text-plum ring-plum/15 hover:ring-magenta/40")}>
      <Icon className="h-3.5 w-3.5" /> {label}
    </button>
  );
}

function ActionMenu({ info, state, onAct, onClose }: { info: Info; state: State; onAct: (p: any, label: string) => void; onClose: () => void }) {
  const [value, setValue] = useState("");
  const [secret, setSecret] = useState(info.is_password);
  const base = { selector: info.selector, label: info.label, kind: info.kind };
  const below = info.box.y + info.box.h + 260 < state.viewport.height;
  const style = {
    left: `${Math.min(70, Math.max(0, (info.box.x / state.viewport.width) * 100))}%`,
    top: below ? `${((info.box.y + info.box.h + 8) / state.viewport.height) * 100}%` : undefined,
    bottom: below ? undefined : `${((state.viewport.height - info.box.y + 8) / state.viewport.height) * 100}%`,
  };
  const noun = { input: "field", select: "dropdown", checkbox: "checkbox", link: "link", button: "button" }[info.kind] || "item";

  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()}
      className="absolute z-10 w-[320px] cursor-default rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-plum/15" style={style}>
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-magenta">{noun}</div>
          <div className="text-sm font-semibold text-ink">“{info.label}”</div>
        </div>
        <button onClick={onClose} className="text-plum/40 hover:text-ink" aria-label="Close"><X className="h-4 w-4" /></button>
      </div>

      {info.kind === "input" && (
        <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); if (value) onAct({ ...base, action: "fill", value, secret }, "Typing…"); }}>
          <input autoFocus type={secret ? "password" : "text"} value={value} onChange={(e) => setValue(e.target.value)} placeholder="What should be typed?"
            className="h-10 w-full rounded-xl bg-cream/60 px-3 text-sm outline-none ring-1 ring-plum/15 focus:ring-magenta/50" />
          {!secret && (
            <div className="flex flex-wrap gap-1">
              {QUICK_VALUES.map((q) => <button type="button" key={q.label} onClick={() => setValue(q.value)} className="rounded-full bg-plum/5 px-2.5 py-1 text-[11px] text-plum hover:bg-plum/10">{q.label}</button>)}
            </div>
          )}
          <label className="flex items-center gap-2 text-xs text-plum/70"><input type="checkbox" className="accent-magenta" checked={secret} onChange={(e) => setSecret(e.target.checked)} /> Hide this value (passwords)</label>
          <Button size="sm" type="submit" className="w-full" disabled={!value}><Type className="h-3.5 w-3.5" /> Type it</Button>
        </form>
      )}

      {info.kind === "select" && (
        <div className="max-h-48 space-y-1 overflow-y-auto scrollbar-thin">
          {info.options.filter((o) => o.value).map((o) => (
            <button key={o.value} onClick={() => onAct({ ...base, action: "select", value: o.value }, "Choosing…")} className="block w-full rounded-lg px-3 py-1.5 text-left text-sm hover:bg-cream">{o.label}</button>
          ))}
        </div>
      )}

      {info.kind === "checkbox" && <Button size="sm" className="w-full" onClick={() => onAct({ ...base, action: "check" }, "Ticking…")}>Tick it</Button>}

      {(info.kind === "button" || info.kind === "link" || info.kind === "element") && (
        <div className="space-y-2">
          {info.kind === "element" && info.text && (
            <Button size="sm" className="w-full" variant="secondary" onClick={() => onAct({ action: "assert_text", value: info.text.slice(0, 80) }, "Checking…")}>
              <CheckCircle2 className="h-3.5 w-3.5" /> Check this text is shown
            </Button>
          )}
          <Button size="sm" className="w-full" onClick={() => onAct({ ...base, action: "click" }, "Clicking…")}><MousePointerClick className="h-3.5 w-3.5" /> Click it</Button>
          {(info.is_submit || info.in_form) && (
            <>
              <p className="flex gap-1.5 rounded-lg bg-gold/15 px-2.5 py-2 text-[11px] text-[#6b4700]"><ShieldCheck className="h-3.5 w-3.5 shrink-0" /> This looks like a form submit button. Clicking it really sends the form on the live site.</p>
              <Button size="sm" variant="secondary" className="w-full" onClick={() => onAct({ ...base, action: "click", execute: false }, "Adding step…")}>Add the click without sending now</Button>
            </>
          )}
        </div>
      )}

      <button onClick={() => onAct({ ...base, action: "assert_visible" }, "Checking…")} className="mt-3 flex w-full items-center justify-center gap-1.5 text-xs text-teal hover:underline">
        <Eye className="h-3.5 w-3.5" /> Just check this {noun} is shown
      </button>
    </motion.div>
  );
}

function SaveStep({ steps, startUrl, websiteId, defaultName, onBack, onSaved }: { steps: Step[]; startUrl: string; websiteId: string; defaultName: string; onBack: () => void; onSaved: (t: any) => void }) {
  const host = (() => { try { return new URL(startUrl).host; } catch { return ""; } })();
  const [name, setName] = useState(`${defaultName} — ${host}`);
  const [interval, setInterval_] = useState(3600);
  const [alertAfter, setAlertAfter] = useState(2);
  const submits = steps.some((s) => s.action === "fill") && steps.some((s) => s.action === "click" || s.action === "press");
  const [safe, setSafe] = useState<"yes" | "unsure" | null>(submits ? null : "yes");
  const [startNow, setStartNow] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const save = async () => {
    setSaving(true);
    setErr(null);
    try {
      const t = await post("/api/browser-tests", {
        name, start_url: startUrl, website_id: websiteId || null, interval_sec: interval, retries: 1, failure_threshold: alertAfter, severity: "major",
        steps: steps.map(({ action, selector, value, url, secret, description, label, kind }) => ({ action, selector, value, url, secret, description, label, kind })),
        safety: { test_mode_confirmed: safe === "yes", allow_payments: false, blocked_patterns: [], cleanup_notes: "" },
        schedule_enabled: startNow && safe === "yes",
      });
      onSaved(t);
    } catch (e: any) {
      setErr(e.message);
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-1 items-start justify-center overflow-y-auto p-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl space-y-6 rounded-3xl bg-white p-8 shadow-xl ring-1 ring-plum/10">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Almost done</h2>
          <p className="mt-1 text-sm text-plum/70">{steps.length} steps recorded. Choose how often to check and when to alert you.</p>
        </div>
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <div>
          <span className="mb-2 block text-xs font-medium text-plum">How often should we check?</span>
          <div className="grid grid-cols-3 gap-2">
            {[[3600, "Every hour"], [21600, "Every 6 hours"], [86400, "Once a day"]].map(([v, l]) => (
              <button key={v} onClick={() => setInterval_(v as number)} className={cn("rounded-xl px-3 py-2.5 text-sm ring-1", interval === v ? "bg-plum text-cream ring-plum" : "bg-cream/50 ring-plum/10 hover:ring-magenta/40")}>{l}</button>
            ))}
          </div>
        </div>
        <div>
          <span className="mb-2 block text-xs font-medium text-plum">When should we alert you?</span>
          <div className="grid grid-cols-2 gap-2">
            {[[1, "On the first failure"], [2, "After 2 failures in a row (fewer false alarms)"]].map(([v, l]) => (
              <button key={v} onClick={() => setAlertAfter(v as number)} className={cn("rounded-xl px-3 py-2.5 text-left text-sm ring-1", alertAfter === v ? "bg-plum text-cream ring-plum" : "bg-cream/50 ring-plum/10 hover:ring-magenta/40")}>{l}</button>
            ))}
          </div>
          <p className="mt-1.5 text-[11px] text-plum/55">Every failure is retried once automatically before it counts.</p>
        </div>
        {submits && (
          <div className={cn("rounded-2xl p-4 ring-1", safe === "yes" ? "bg-teal/5 ring-teal/20" : "bg-gold/10 ring-gold/40")}>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink"><ShieldCheck className="h-4 w-4 text-teal" /> This journey sends a form. Is that OK to repeat?</div>
            <p className="mb-3 text-xs text-plum/70">Each run submits the form for real. Only say yes if submissions go to a test inbox, test mode, or are easy to ignore (we use a unique <span className="font-mono">watchfront-test+…@example.com</span> email and add an <span className="font-mono">x-watchfront-test</span> header your developer can filter on).</p>
            <div className="grid gap-2 sm:grid-cols-2">
              <button onClick={() => setSafe("yes")} className={cn("rounded-xl px-3 py-2.5 text-left text-sm ring-1", safe === "yes" ? "bg-teal text-white ring-teal" : "bg-white ring-plum/10")}>Yes, it&apos;s safe to submit</button>
              <button onClick={() => setSafe("unsure")} className={cn("rounded-xl px-3 py-2.5 text-left text-sm ring-1", safe === "unsure" ? "bg-plum text-cream ring-plum" : "bg-white ring-plum/10")}>Not sure — save as a draft for now</button>
            </div>
          </div>
        )}
        {safe === "yes" && (
          <label className="flex items-center gap-2 text-sm text-ink"><input type="checkbox" className="accent-magenta" checked={startNow} onChange={(e) => setStartNow(e.target.checked)} /> Start checking on this schedule right away</label>
        )}
        {err && <p className="text-sm text-bad">{err}</p>}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}><ArrowLeft className="h-4 w-4" /> Back</Button>
          <Button onClick={save} loading={saving} disabled={!name || !safe}>Save journey</Button>
        </div>
      </motion.div>
    </div>
  );
}
