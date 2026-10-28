"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, EyeOff, Link2, Loader2, MousePointerClick, Plus, ScanEye, Sparkles, Type, X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button, ChipInput, Input, Select, Toggle, cn } from "./ui";
import { patch, post } from "@/lib/api";
import { useApi } from "@/lib/hooks";

type Box = { x: number; y: number; w: number; h: number };
type El = { kind: string; label: string; text: string; selector: string; box: Box };
type Preview = {
  url: string; title: string; width: number; height: number; fold: number; screenshot: string; elements: El[];
  dynamic: { selector: string; label: string; box: Box }[];
  suggestions: { texts: { text: string; why: string; recommended: boolean }[]; elements: { label: string; selector: string; recommended: boolean; box: Box }[] };
};
type Part = { selector: string; label: string };

export const SENSITIVITY = [
  { value: 0.5, label: "Notice small changes", hint: "A changed word or icon will be flagged" },
  { value: 2, label: "Balanced", hint: "Recommended — ignores tiny rendering noise" },
  { value: 5, label: "Only big changes", hint: "For busy pages with lots of moving content" },
];
const FREQ = [[900, "Every 15 min"], [3600, "Every hour"], [21600, "Every 6 hours"], [86400, "Once a day"]] as const;

export const freqLabel = (sec: number) => FREQ.find(([v]) => v === sec)?.[1] || (sec < 3600 ? `Every ${sec / 60} min` : `Every ${sec / 3600} hours`);

const partLabel = (e: El) => (e.text && !["menu", "form", "logo", "footer"].includes(e.kind) ? `${e.label}: “${e.text.slice(0, 40)}${e.text.length > 40 ? "…" : ""}”` : e.label);

export function PageCheckWizard({ initial, defaultWebsiteId, onClose, onSaved }: { initial?: any; defaultWebsiteId?: string; onClose: () => void; onSaved: (c: any) => void }) {
  const { data: sites } = useApi<any[]>("/api/websites");
  const editing = !!initial?.id;
  const [phase, setPhase] = useState<"page" | "pick" | "settings">(editing ? "pick" : "page");
  const [websiteId, setWebsiteId] = useState<string>(initial?.website_id || defaultWebsiteId || "");
  const [url, setUrl] = useState<string>(initial?.url || "");
  const [name, setName] = useState<string>(initial?.name || "");
  const [preview, setPreview] = useState<Preview | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [texts, setTexts] = useState<string[]>(initial?.expected_texts || []);
  const [parts, setParts] = useState<Part[]>((initial?.required_selectors || []).map((s: string) => ({ selector: s, label: initial?.element_labels?.[s] || s })));
  const [ignores, setIgnores] = useState<Part[]>((initial?.ignore_selectors || []).map((s: string) => ({ selector: s, label: initial?.ignore_labels?.[s] || s })));
  const [visual, setVisual] = useState<boolean>(initial?.visual_enabled ?? true);
  const [threshold, setThreshold] = useState<number>(initial?.threshold_pct ?? 2);
  const [links, setLinks] = useState<boolean>(initial?.check_links ?? true);
  const [interval, setInterval_] = useState<number>(initial?.interval_sec || 3600);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!url && websiteId && sites) setUrl(sites.find((s) => s.id === websiteId)?.url || "");
  }, [websiteId, sites, url]);

  const load = async (first: boolean) => {
    setLoading(true);
    setErr(null);
    try {
      const p: Preview = await post("/api/page-checks/preview", { url });
      setPreview(p);
      setUrl(p.url);
      if (!name) {
        const u = new URL(p.url);
        const path = u.pathname.replace(/\/$/, "");
        setName(`${u.hostname.replace(/^www\./, "")} — ${path ? path.split("/").pop()!.replace(/[-_]/g, " ") : "Homepage"}`);
      }
      if (first && !editing) {
        setTexts(p.suggestions.texts.filter((t) => t.recommended).map((t) => t.text));
        setParts(p.suggestions.elements.filter((e) => e.recommended).map(({ selector, label }) => ({ selector, label })));
        setIgnores(p.dynamic.map(({ selector, label }) => ({ selector, label })));
      }
      setPhase("pick");
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { if (editing) load(false); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const save = async () => {
    setSaving(true);
    setErr(null);
    const body = {
      name: name || "Page check", url, website_id: websiteId || null, expected_texts: texts,
      required_selectors: parts.map((p) => p.selector), element_labels: Object.fromEntries(parts.map((p) => [p.selector, p.label])),
      ignore_selectors: ignores.map((p) => p.selector), ignore_labels: Object.fromEntries(ignores.map((p) => [p.selector, p.label])),
      visual_enabled: visual, threshold_pct: threshold, check_links: links, interval_sec: interval,
    };
    try {
      onSaved(editing ? await patch(`/api/page-checks/${initial.id}`, body) : await post("/api/page-checks", body));
    } catch (e: any) {
      setErr(e.message);
      setSaving(false);
    }
  };

  const steps = ["Choose the page", "Pick what matters", "How to watch it"];
  const idx = ["page", "pick", "settings"].indexOf(phase);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-cream">
      <header className="flex items-center gap-4 border-b border-plum/10 bg-white px-5 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-magenta text-white"><ScanEye className="h-4 w-4" /></span>
          {editing ? "Edit page check" : "Watch a page"}
        </div>
        <ol className="ml-4 hidden items-center gap-2 text-xs md:flex">
          {steps.map((l, i) => (
            <li key={l} className={cn("flex items-center gap-1.5 rounded-full px-3 py-1", i === idx ? "bg-plum text-cream" : i < idx ? "bg-ok/10 text-ok" : "bg-plum/5 text-plum/50")}>{i < idx ? "✓" : i + 1}. {l}</li>
          ))}
        </ol>
        <button onClick={onClose} className="ml-auto rounded-lg p-2 text-plum/50 hover:bg-plum/5 hover:text-ink" aria-label="Close"><X className="h-5 w-5" /></button>
      </header>

      {phase === "page" && (
        <div className="flex flex-1 items-center justify-center overflow-y-auto p-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-plum/10">
            <h2 className="text-2xl font-semibold text-ink">Which page should we keep an eye on?</h2>
            <p className="mt-1 text-sm text-plum/70">We&apos;ll open it, show you a picture of it, and suggest what to watch. You just tick or click — no code.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Select label="Website" value={websiteId} onChange={(e) => { setWebsiteId(e.target.value); setUrl(sites?.find((s) => s.id === e.target.value)?.url || ""); }}>
                <option value="">— choose —</option>{sites?.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </Select>
              <Input label="Page address" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://client.com/pricing" />
            </div>
            <div className="mt-5 grid gap-2 text-xs text-plum/70 sm:grid-cols-3">
              {[[Type, "Important words stay on the page"], [ScanEye, "The page still looks the way you approved"], [Link2, "No links lead to “page not found”"]].map(([Icon, t]: any) => (
                <div key={t} className="flex items-center gap-2 rounded-xl bg-cream/60 px-3 py-2.5"><Icon className="h-4 w-4 shrink-0 text-magenta" />{t}</div>
              ))}
            </div>
            {err && <p className="mt-4 rounded-xl bg-bad/8 px-4 py-2.5 text-sm text-bad">{err}</p>}
            <div className="mt-6 flex justify-end"><Button onClick={() => load(true)} loading={loading} disabled={!url}>Look at the page <ArrowRight className="h-4 w-4" /></Button></div>
          </motion.div>
        </div>
      )}

      {phase === "pick" && (
        <PickPhase preview={preview} loading={loading} err={err} retry={() => load(false)}
          texts={texts} setTexts={setTexts} parts={parts} setParts={setParts} ignores={ignores} setIgnores={setIgnores}
          onBack={editing ? undefined : () => setPhase("page")} onNext={() => setPhase("settings")} />
      )}

      {phase === "settings" && (
        <div className="flex flex-1 items-start justify-center overflow-y-auto p-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl space-y-6 rounded-3xl bg-white p-8 shadow-xl ring-1 ring-plum/10">
            <div>
              <h2 className="text-2xl font-semibold text-ink">How should we watch it?</h2>
              <p className="mt-1 text-sm text-plum/70">You can change any of this later.</p>
            </div>
            <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Homepage" />

            <div className="space-y-3 rounded-2xl bg-cream/50 p-4 ring-1 ring-plum/8">
              <Toggle checked={visual} onChange={setVisual} label="Tell me when the page looks different"
                hint="We take a picture of the top of the page each time and compare it with the version you approved." />
              {visual && (
                <div className="grid gap-2 sm:grid-cols-3">
                  {SENSITIVITY.map((s) => (
                    <button key={s.value} type="button" onClick={() => setThreshold(s.value)}
                      className={cn("rounded-xl p-3 text-left ring-1 transition", threshold === s.value ? "bg-plum text-cream ring-plum" : "bg-white ring-plum/10 hover:ring-magenta/40")}>
                      <div className="text-sm font-medium">{s.label}</div>
                      <div className={cn("mt-0.5 text-[11px]", threshold === s.value ? "text-cream/70" : "text-plum/55")}>{s.hint}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="rounded-2xl bg-cream/50 p-4 ring-1 ring-plum/8">
              <Toggle checked={links} onChange={setLinks} label="Find broken links" hint="We try up to 60 links on the page and tell you which ones lead nowhere." />
            </div>
            <div>
              <span className="mb-2 block text-xs font-medium text-plum">How often?</span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {FREQ.map(([v, l]) => (
                  <button key={v} type="button" onClick={() => setInterval_(v)} className={cn("rounded-xl px-3 py-2.5 text-sm ring-1", interval === v ? "bg-plum text-cream ring-plum" : "bg-cream/50 ring-plum/10 hover:ring-magenta/40")}>{l}</button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-sky/10 p-4 text-sm ring-1 ring-sky/30">
              <div className="mb-2 font-semibold text-ink">{freqLabel(interval)}, SiteGuard will:</div>
              <ul className="space-y-1.5 text-plum/80">
                {texts.length > 0 && <Li>Check {texts.length === 1 ? `“${texts[0]}” is` : `${texts.length} pieces of text are`} still on the page</Li>}
                {parts.length > 0 && <Li>Check {parts.map((p) => p.label).slice(0, 3).join(", ")}{parts.length > 3 ? ` and ${parts.length - 3} more` : ""} {parts.length === 1 ? "is" : "are"} still there</Li>}
                {visual && <Li>Compare how the page looks with the approved version{ignores.length ? ` (ignoring ${ignores.map((i) => i.label.toLowerCase()).join(", ")})` : ""}</Li>}
                {links && <Li>Test the links on the page</Li>}
                {!texts.length && !parts.length && !visual && !links && <li className="text-bad">Nothing selected — go back and pick at least one thing to watch.</li>}
              </ul>
              <p className="mt-3 text-xs text-plum/60">Missing text or parts open an incident and alert your team. A change in looks is only flagged for you to review — you decide if it was on purpose.</p>
            </div>

            <details className="rounded-2xl p-4 ring-1 ring-plum/10">
              <summary className="cursor-pointer text-xs font-medium text-plum/60">Technical settings (for developers)</summary>
              <div className="mt-4 space-y-4">
                <ChipInput label="Required elements (CSS selectors)" values={parts.map((p) => p.selector)}
                  onChange={(v) => setParts(v.map((s) => parts.find((p) => p.selector === s) || { selector: s, label: s }))} placeholder="form#contact" />
                <ChipInput label="Hidden before comparing (CSS selectors)" values={ignores.map((p) => p.selector)}
                  onChange={(v) => setIgnores(v.map((s) => ignores.find((p) => p.selector === s) || { selector: s, label: s }))} placeholder="#cookie-banner" />
                <Input label="Exact change threshold (% of pixels)" type="number" step="any" min={0.01} max={50} value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} />
              </div>
            </details>

            {err && <p className="rounded-xl bg-bad/8 px-4 py-2.5 text-sm text-bad">{err}</p>}
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => setPhase("pick")}><ArrowLeft className="h-4 w-4" /> Back</Button>
              <Button onClick={save} loading={saving} disabled={!url || (!texts.length && !parts.length && !visual && !links)}>
                {editing ? "Save changes" : "Start watching"}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ok" />{children}</li>;
}

function PickPhase({ preview, loading, err, retry, texts, setTexts, parts, setParts, ignores, setIgnores, onBack, onNext }: {
  preview: Preview | null; loading: boolean; err: string | null; retry: () => void;
  texts: string[]; setTexts: (v: string[]) => void; parts: Part[]; setParts: (v: Part[]) => void; ignores: Part[]; setIgnores: (v: Part[]) => void;
  onBack?: () => void; onNext: () => void;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [hover, setHover] = useState<El | null>(null);
  const [picked, setPicked] = useState<El | null>(null);
  const [own, setOwn] = useState("");

  const toPage = (e: React.MouseEvent) => {
    const r = imgRef.current?.getBoundingClientRect();
    if (!r || !preview) return null;
    return { x: ((e.clientX - r.left) / r.width) * preview.width, y: ((e.clientY - r.top) / r.height) * preview.height };
  };
  const hit = (e: React.MouseEvent) => {
    const p = toPage(e);
    if (!p || !preview) return null;
    return preview.elements.filter((el) => p.x >= el.box.x && p.x <= el.box.x + el.box.w && p.y >= el.box.y && p.y <= el.box.y + el.box.h)
      .sort((a, b) => a.box.w * a.box.h - b.box.w * b.box.h)[0] || null;
  };
  const pct = (b: Box) => preview && ({ left: `${(b.x / preview.width) * 100}%`, top: `${(b.y / preview.height) * 100}%`, width: `${(b.w / preview.width) * 100}%`, height: `${(b.h / preview.height) * 100}%` });
  const toggle = <T,>(list: T[], set: (v: T[]) => void, item: T, eq: (a: T) => boolean) => set(list.some(eq) ? list.filter((x) => !eq(x)) : [...list, item]);
  const textEls = preview?.elements.filter((e) => e.text && texts.some((t) => t.toLowerCase() === e.text.toLowerCase())) || [];
  const partBoxes = (preview?.elements || []).filter((e) => parts.some((p) => p.selector === e.selector));
  const ignoreBoxes = [...(preview?.dynamic.filter((d) => ignores.some((i) => i.selector === d.selector)) || []),
    ...(preview?.elements.filter((e) => ignores.some((i) => i.selector === e.selector)) || [])];
  const suggestedTexts = preview?.suggestions.texts || [];
  const suggestedParts = preview?.suggestions.elements || [];
  const extraParts = parts.filter((p) => !suggestedParts.some((s) => s.selector === p.selector));
  const dynamic = preview?.dynamic || [];
  const extraIgnores = ignores.filter((i) => !dynamic.some((d) => d.selector === i.selector));

  return (
    <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
      <section className="flex min-h-0 flex-1 flex-col p-4">
        <p className="mb-3 flex items-center gap-2 text-sm text-plum/75"><MousePointerClick className="h-4 w-4 text-magenta" /> Click anything on the page to watch it — or to ignore it if it changes on its own.</p>
        <div className="relative min-h-0 flex-1 overflow-auto rounded-2xl bg-white shadow-inner ring-1 ring-plum/10 scrollbar-thin">
          {loading && !preview && <div className="flex h-full items-center justify-center gap-2 text-sm text-plum/60"><Loader2 className="h-4 w-4 animate-spin" /> Opening the page in a secure browser…</div>}
          {!loading && !preview && (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center text-sm text-plum/70">
              {err && <p className="text-bad">{err}</p>}
              <p>You can still pick text to watch on the right without a preview.</p>
              <Button size="sm" variant="secondary" onClick={retry}>Try opening the page again</Button>
            </div>
          )}
          {preview && (
            <div className="relative cursor-crosshair select-none" onMouseMove={(e) => !picked && setHover(hit(e))} onMouseLeave={() => setHover(null)}
              onClick={(e) => { if (picked) { setPicked(null); return; } const h = hit(e); if (h) setPicked(h); }}>
              <img ref={imgRef} src={preview.screenshot} alt={`Preview of ${preview.title}`} className="block w-full" draggable={false} />
              <div className="pointer-events-none absolute inset-x-0 border-t-2 border-dashed border-teal/70" style={{ top: `${(preview.fold / preview.height) * 100}%` }}>
                <span className="absolute right-2 top-1 rounded-full bg-teal px-2 py-0.5 text-[10px] font-medium text-white">↑ This first screen is compared for look changes</span>
              </div>
              {[...textEls, ...partBoxes].map((e, i) => (
                <div key={`k${i}`} className="pointer-events-none absolute rounded-md bg-ok/10 ring-2 ring-ok" style={pct(e.box) || undefined}>
                  <span className="absolute -top-5 left-0 whitespace-nowrap rounded bg-ok px-1.5 text-[10px] font-medium text-white">must be shown</span>
                </div>
              ))}
              {ignoreBoxes.map((d, i) => (
                <div key={`i${i}`} className="pointer-events-none absolute rounded-md ring-2 ring-plum/50"
                  style={{ ...(pct(d.box) || {}), background: "repeating-linear-gradient(45deg, rgba(48,20,60,.18) 0 6px, transparent 6px 12px)" }}>
                  <span className="absolute -top-5 left-0 whitespace-nowrap rounded bg-plum px-1.5 text-[10px] font-medium text-cream">ignored</span>
                </div>
              ))}
              {hover && !picked && <div className="pointer-events-none absolute rounded-md bg-magenta/10 ring-2 ring-magenta transition-all duration-75" style={pct(hover.box) || undefined} />}
              {picked && (
                <>
                  <div className="pointer-events-none absolute rounded-md bg-sky/20 ring-2 ring-teal" style={pct(picked.box) || undefined} />
                  <PickMenu el={picked} preview={preview} texts={texts} parts={parts} ignores={ignores}
                    onText={() => { toggle(texts, setTexts, picked.text, (t) => t.toLowerCase() === picked.text.toLowerCase()); setPicked(null); }}
                    onPart={() => { toggle(parts, setParts, { selector: picked.selector, label: partLabel(picked) }, (p) => p.selector === picked.selector); setPicked(null); }}
                    onIgnore={() => { toggle(ignores, setIgnores, { selector: picked.selector, label: partLabel(picked) }, (p) => p.selector === picked.selector); setPicked(null); }}
                    onClose={() => setPicked(null)} />
                </>
              )}
            </div>
          )}
        </div>
      </section>

      <aside className="flex w-full flex-col border-t border-plum/10 bg-white lg:w-[380px] lg:border-l lg:border-t-0">
        <div className="flex-1 space-y-6 overflow-y-auto p-5 scrollbar-thin">
          <Section icon={Type} title="Words that must always be on the page" hint="If any of these disappear, we alert you.">
            {suggestedTexts.length > 0 && <p className="flex items-center gap-1 text-[11px] text-teal"><Sparkles className="h-3 w-3" /> Suggested from the page</p>}
            {suggestedTexts.map((s) => (
              <Check_ key={s.text} on={texts.some((t) => t.toLowerCase() === s.text.toLowerCase())} onClick={() => toggle(texts, setTexts, s.text, (t) => t.toLowerCase() === s.text.toLowerCase())}
                title={`“${s.text}”`} sub={s.why} />
            ))}
            {texts.filter((t) => !suggestedTexts.some((s) => s.text.toLowerCase() === t.toLowerCase())).map((t) => (
              <Check_ key={t} on onClick={() => setTexts(texts.filter((x) => x !== t))} title={`“${t}”`} sub="Added by you" />
            ))}
            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); const v = own.trim(); if (v && !texts.includes(v)) setTexts([...texts, v]); setOwn(""); }}>
              <input value={own} onChange={(e) => setOwn(e.target.value)} placeholder="Add your own, e.g. a phone number" className="h-9 flex-1 rounded-lg bg-cream/60 px-3 text-sm outline-none ring-1 ring-plum/10 focus:ring-magenta/40" />
              <Button size="sm" type="submit" variant="secondary" disabled={!own.trim()}><Plus className="h-3.5 w-3.5" /></Button>
            </form>
          </Section>

          <Section icon={CheckCircle2} title="Parts that must be there" hint="Like the menu or a contact form. Click the page to add more.">
            {suggestedParts.map((s) => (
              <Check_ key={s.selector} on={parts.some((p) => p.selector === s.selector)} onClick={() => toggle(parts, setParts, { selector: s.selector, label: s.label }, (p) => p.selector === s.selector)} title={s.label} />
            ))}
            {extraParts.map((p) => <Check_ key={p.selector} on onClick={() => setParts(parts.filter((x) => x.selector !== p.selector))} title={p.label} sub="Picked on the page" />)}
            {!suggestedParts.length && !extraParts.length && <p className="text-xs text-plum/50">Nothing yet — click a part of the page.</p>}
          </Section>

          <Section icon={EyeOff} title="Things that change on their own" hint="Hidden before comparing looks, so they don't cause false alarms.">
            {dynamic.map((d) => (
              <Check_ key={d.selector} on={ignores.some((i) => i.selector === d.selector)} onClick={() => toggle(ignores, setIgnores, { selector: d.selector, label: d.label }, (i) => i.selector === d.selector)} title={d.label} sub="Found automatically" />
            ))}
            {extraIgnores.map((p) => <Check_ key={p.selector} on onClick={() => setIgnores(ignores.filter((x) => x.selector !== p.selector))} title={p.label} sub="Picked on the page" />)}
            {!dynamic.length && !extraIgnores.length && <p className="text-xs text-plum/50">We didn&apos;t spot sliders, chat bubbles or cookie banners. If something else changes often (dates, offers), click it on the page and choose “Ignore”.</p>}
          </Section>
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-plum/8 p-4">
          {onBack ? <Button variant="ghost" onClick={onBack}><ArrowLeft className="h-4 w-4" /> Back</Button> : <span />}
          <Button onClick={onNext}>Next <ArrowRight className="h-4 w-4" /></Button>
        </div>
      </aside>
    </div>
  );
}

function Section({ icon: Icon, title, hint, children }: { icon: any; title: string; hint: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 text-sm font-semibold text-ink"><Icon className="h-4 w-4 text-magenta" /> {title}</h3>
      <p className="mb-2.5 mt-0.5 text-xs text-plum/60">{hint}</p>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Check_({ on, onClick, title, sub }: { on: boolean; onClick: () => void; title: string; sub?: string }) {
  return (
    <button type="button" onClick={onClick} className={cn("flex w-full items-start gap-2.5 rounded-xl px-3 py-2 text-left text-sm ring-1 transition", on ? "bg-ok/5 ring-ok/25" : "bg-white ring-plum/10 hover:ring-magenta/30")}>
      <span className={cn("mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded", on ? "bg-ok text-white" : "ring-1 ring-plum/25")}>{on && <Check className="h-3 w-3" />}</span>
      <span className="min-w-0 flex-1"><span className="block break-words text-ink">{title}</span>{sub && <span className="block text-[11px] text-plum/50">{sub}</span>}</span>
    </button>
  );
}

function PickMenu({ el, preview, texts, parts, ignores, onText, onPart, onIgnore, onClose }: {
  el: El; preview: Preview; texts: string[]; parts: Part[]; ignores: Part[]; onText: () => void; onPart: () => void; onIgnore: () => void; onClose: () => void;
}) {
  const hasText = !!el.text && el.text.length <= 120;
  const textOn = hasText && texts.some((t) => t.toLowerCase() === el.text.toLowerCase());
  const partOn = parts.some((p) => p.selector === el.selector);
  const ignOn = ignores.some((p) => p.selector === el.selector);
  const below = el.box.y + el.box.h + 220 < preview.height;
  const style = {
    left: `${Math.min(68, Math.max(0, (el.box.x / preview.width) * 100))}%`,
    top: below ? `${((el.box.y + el.box.h + 8) / preview.height) * 100}%` : undefined,
    bottom: below ? undefined : `${((preview.height - el.box.y + 8) / preview.height) * 100}%`,
  };
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()}
        className="absolute z-10 w-[300px] cursor-default space-y-2 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-plum/15" style={style}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-magenta">{el.label}</div>
            {el.text && <div className="line-clamp-2 text-sm font-semibold text-ink">“{el.text}”</div>}
          </div>
          <button onClick={onClose} className="text-plum/40 hover:text-ink" aria-label="Close"><X className="h-4 w-4" /></button>
        </div>
        {hasText && (
          <Button size="sm" className="w-full" variant={textOn ? "secondary" : "primary"} onClick={onText}>
            <Type className="h-3.5 w-3.5" /> {textOn ? "Stop watching this text" : "These words must always be shown"}
          </Button>
        )}
        <Button size="sm" className="w-full" variant={hasText || partOn ? "secondary" : "primary"} onClick={onPart}>
          <CheckCircle2 className="h-3.5 w-3.5" /> {partOn ? "Stop watching this part" : "This part must always be there"}
        </Button>
        <Button size="sm" className="w-full" variant="ghost" onClick={onIgnore}>
          <EyeOff className="h-3.5 w-3.5" /> {ignOn ? "Stop ignoring it" : "Ignore it — it changes on its own"}
        </Button>
      </motion.div>
    </AnimatePresence>
  );
}
