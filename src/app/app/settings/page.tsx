"use client";

import { Send, Trash2, UserPlus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useToast } from "@/components/toast";
import { Badge, Button, Card, CardHeader, ChipInput, ErrorBox, Input, KV, Loading, Modal, PageHeader, Select, Table, Td, Tabs, Toggle } from "@/components/ui";
import { api, del, patch, post, put } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { fmtDate, timeAgo } from "@/lib/format";
import { useApi } from "@/lib/hooks";

type Tab = "general" | "workspaces" | "team" | "notifications" | "branding" | "audit" | "log" | "system";

function SettingsInner() {
  const sp = useSearchParams();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>((sp.get("tab") as Tab) || "general");
  const { data: ws, reload, setData } = useApi<any>("/api/workspace");
  const { can } = useAuth();

  useEffect(() => {
    if (sp.get("tab") === "billing") router.replace("/app/billing");
  }, [sp, router]);

  if (!ws) return <Loading rows={4} />;
  const tabs: { id: Tab; label: string }[] = [
    { id: "general", label: "General" }, { id: "workspaces", label: "Workspaces" }, { id: "team", label: "Team" },
    { id: "notifications", label: "Notifications" }, { id: "branding", label: "Branding" },
    ...(can("admin") ? [{ id: "audit" as Tab, label: "Audit log" }] : []), { id: "log", label: "Delivery log" }, { id: "system", label: "System status" },
  ];
  return (
    <div>
      <PageHeader eyebrow="Workspace" title="Settings" subtitle={`${ws.name} · ${ws.limits.name} plan · you are ${ws.role}`} />
      <div className="mb-6"><Tabs<Tab> value={tab} onChange={setTab} tabs={tabs} /></div>
      {tab === "general" && <General ws={ws} onSaved={setData} />}
      {tab === "workspaces" && <Workspaces />}
      {tab === "team" && <Team ws={ws} />}
      {tab === "notifications" && <Notifications ws={ws} onSaved={reload} />}
      {tab === "branding" && <Branding ws={ws} onSaved={setData} />}
      {tab === "audit" && <Audit />}
      {tab === "log" && <DeliveryLog />}
      {tab === "system" && <System />}
    </div>
  );
}

function General({ ws, onSaved }: { ws: any; onSaved: (w: any) => void }) {
  const [name, setName] = useState(ws.name);
  const [ai, setAi] = useState(ws.settings?.ai_enabled ?? true);
  const { can, user } = useAuth();
  const toast = useToast();
  const [pw, setPw] = useState({ current_password: "", new_password: "" });
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader title="Workspace" />
        <div className="space-y-4 p-5">
          <Input label="Workspace name" value={name} onChange={(e) => setName(e.target.value)} disabled={!can("admin")} />
          <Toggle checked={ai} onChange={setAi} disabled={!can("admin")} label="AI-assisted diagnosis" hint={`Engine: ${ws.ai_engine}. Evidence is redacted (emails, tokens, card numbers) before analysis.`} />
          {can("admin") && <Button onClick={async () => { onSaved(await patch("/api/workspace", { name, settings: { ai_enabled: ai } })); toast("Saved"); }}>Save</Button>}
        </div>
      </Card>
      <Card>
        <CardHeader title="Your account" subtitle={user?.email} />
        <div className="space-y-4 p-5">
          <Input label="Current password" type="password" value={pw.current_password} onChange={(e) => setPw({ ...pw, current_password: e.target.value })} />
          <Input label="New password" type="password" value={pw.new_password} onChange={(e) => setPw({ ...pw, new_password: e.target.value })} hint="At least 8 characters" />
          <Button variant="secondary" onClick={async () => { try { await patch("/api/auth/me", pw); toast("Password changed"); setPw({ current_password: "", new_password: "" }); } catch (e: any) { toast(e.message, "error"); } }}>Change password</Button>
        </div>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader title="Data handling & privacy" />
        <div className="grid gap-4 p-5 text-sm text-plum/75 md:grid-cols-3">
          <div><b className="text-ink">Retention.</b> Check results, journey runs, screenshots, and browser events are kept for {ws.limits.history_days} days on your plan, then deleted automatically.</div>
          <div><b className="text-ink">Secrets.</b> API credentials are encrypted at rest and never returned to the browser after saving.</div>
          <div><b className="text-ink">Network safety.</b> Monitoring workers refuse private, loopback, and cloud-metadata addresses and re-validate every redirect.</div>
        </div>
      </Card>
    </div>
  );
}

function Workspaces() {
  const { workspaces, switchWorkspace, workspace } = useAuth();
  const [name, setName] = useState("");
  const toast = useToast();
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader title="Your workspaces" subtitle="Each workspace is a separate tenant with its own plan, clients, and data." />
        <div className="divide-y divide-plum/6">
          {workspaces.map((w) => (
            <div key={w.id} className="flex items-center justify-between px-5 py-3 text-sm">
              <div><div className="font-medium text-ink">{w.name}</div><div className="text-xs capitalize text-plum/55">{w.role} · {w.plan.replace("_", " ")}</div></div>
              {w.id === workspace?.id ? <Badge tone="active">current</Badge> : <Button size="sm" variant="secondary" onClick={() => switchWorkspace(w.id)}>Switch</Button>}
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <CardHeader title="Create workspace" />
        <div className="space-y-4 p-5">
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Second agency brand" />
          <Button onClick={async () => { try { const w = await post("/api/auth/workspaces", { name }); toast("Workspace created"); switchWorkspace(w.id); } catch (e: any) { toast(e.message, "error"); } }} disabled={!name.trim()}>Create & switch</Button>
        </div>
      </Card>
    </div>
  );
}

function Team({ ws }: { ws: any }) {
  const { data: members, reload } = useApi<any[]>("/api/workspace/members");
  const { data: clients } = useApi<any[]>("/api/clients");
  const { can } = useAuth();
  const toast = useToast();
  const [inv, setInv] = useState<{ email: string; role: string; client_ids: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  return (
    <div>
      <Card>
        <CardHeader title="Members" subtitle={`${members?.filter((m) => m.role !== "client").length || 0} of ${ws.limits.team_members} team seats used. Client viewers don't use seats.`}
          action={can("admin") && <Button size="sm" onClick={() => { setError(null); setInv({ email: "", role: "member", client_ids: [] }); }}><UserPlus className="h-4 w-4" /> Invite</Button>} />
        <Table head={["Member", "Role", "Client access", "Status", ""]}>
          {members?.map((m) => (
            <tr key={m.id}>
              <Td><div className="font-medium text-ink">{m.name || m.email}</div><div className="text-xs text-plum/55">{m.email}</div></Td>
              <Td>
                {m.role === "owner" || !can("admin") ? <Badge tone="info">{m.role}</Badge> : (
                  <select value={m.role} onChange={async (e) => { await patch(`/api/workspace/members/${m.id}`, { role: e.target.value }); reload(); toast("Role updated"); }} className="rounded-lg bg-cream px-2 py-1 text-xs ring-1 ring-plum/10">
                    <option value="admin">admin</option><option value="member">member</option><option value="client">client viewer</option>
                  </select>
                )}
              </Td>
              <Td className="text-xs text-plum/65">{m.role === "client" ? (m.client_ids?.map((c: string) => clients?.find((x) => x.id === c)?.name).filter(Boolean).join(", ") || "none") : "All"}</Td>
              <Td><Badge>{m.status}</Badge></Td>
              <Td>{can("admin") && m.role !== "owner" && <button onClick={async () => { if (confirm(`Remove ${m.email}?`)) { await del(`/api/workspace/members/${m.id}`); reload(); } }} className="text-plum/40 hover:text-bad"><Trash2 className="h-4 w-4" /></button>}</Td>
            </tr>
          ))}
        </Table>
      </Card>
      <Card className="mt-6 p-5 text-sm text-plum/75">
        <b className="text-ink">Roles.</b> <b>Owner</b> — billing & everything. <b>Admin</b> — settings, team, deletes. <b>Member</b> — create & manage monitors, incidents, reports. <b>Client viewer</b> — read-only access limited to their assigned clients&apos; websites, incidents, and reports.
      </Card>
      <Modal open={!!inv} onClose={() => setInv(null)} title="Invite to workspace" subtitle="If they don't have an account yet, they'll join when they sign up with this email.">
        {inv && (
          <div className="space-y-4">
            <ErrorBox error={error} />
            <Input label="Email" type="email" value={inv.email} onChange={(e) => setInv({ ...inv, email: e.target.value })} />
            <Select label="Role" value={inv.role} onChange={(e) => setInv({ ...inv, role: e.target.value })}>
              <option value="member">Member</option><option value="admin">Admin</option><option value="client">Client viewer (read-only)</option>
            </Select>
            {inv.role === "client" && (
              <div>
                <span className="mb-1.5 block text-xs font-medium text-plum">Can view clients</span>
                <div className="space-y-1.5">{clients?.map((c) => (
                  <label key={c.id} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={inv.client_ids.includes(c.id)} onChange={(e) => setInv({ ...inv, client_ids: e.target.checked ? [...inv.client_ids, c.id] : inv.client_ids.filter((x) => x !== c.id) })} />{c.name}</label>
                ))}</div>
              </div>
            )}
            <div className="flex justify-end"><Button onClick={async () => { try { await post("/api/workspace/members", inv); toast("Invitation sent"); setInv(null); reload(); } catch (e: any) { setError(e.message); } }}>Send invite</Button></div>
          </div>
        )}
      </Modal>
    </div>
  );
}

const EVENTS: [string, string][] = [
  ["incident_opened", "Incident opened"], ["incident_resolved", "Incident recovered / resolved"], ["incident_reopened", "Incident reopened"],
  ["visual_change", "Visual change detected"], ["report_ready", "Scheduled report sent"],
];

function Notifications({ ws, onSaved }: { ws: any; onSaved: () => void }) {
  const n = ws.notifications;
  const [f, setF] = useState({ ...n, escalation: { ...n.escalation }, events: { ...n.events }, quiet_hours: { enabled: false, start: "22:00", end: "07:00", ...n.quiet_hours } });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { can } = useAuth();
  const toast = useToast();
  useEffect(() => setF({ ...n, escalation: { ...n.escalation }, events: { ...n.events }, quiet_hours: { enabled: false, start: "22:00", end: "07:00", ...n.quiet_hours } }), [ws]); // eslint-disable-line react-hooks/exhaustive-deps
  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      await put("/api/workspace/notifications", f);
      toast("Notification settings saved");
      onSaved();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader title="Channels" subtitle={ws.smtp_configured ? "SMTP configured — emails are delivered." : "SMTP not configured — emails are logged on the server (see Delivery log)."} />
        <div className="space-y-4 p-5">
          <ErrorBox error={error} />
          <ChipInput
            label="Alert email recipients"
            values={f.emails}
            onChange={(v) => setF({ ...f, emails: v })}
            placeholder="ops@agency.com"
            hint="If empty, workspace owners are notified. Alerts use subjects like [Watchfront · Critical · JS] so mail apps can play a custom sound."
          />
          <div className="rounded-2xl bg-cream/60 p-4 text-xs leading-relaxed text-plum-2 ring-1 ring-plum/8">
            <b className="text-ink">Custom alert sounds.</b> Email can&apos;t force a ringtone by itself.
            On iPhone/Android/Gmail, create a filter for subjects containing{" "}
            <code className="font-mono text-[11px] text-ink">[Watchfront · Critical]</code>
            {" "}or{" "}
            <code className="font-mono text-[11px] text-ink">[Watchfront · Major · JS]</code>
            {" "}and set a unique notification sound for that filter. Critical/major also set high-priority headers.
          </div>
          <Input label={`Slack incoming webhook ${ws.limits.slack ? "" : "(Agency plan)"}`} value={f.slack_webhook} disabled={!ws.limits.slack} onChange={(e) => setF({ ...f, slack_webhook: e.target.value })} placeholder="https://hooks.slack.com/services/…" />
          <Input label="Microsoft Teams webhook" value={f.teams_webhook} disabled={!ws.limits.slack} onChange={(e) => setF({ ...f, teams_webhook: e.target.value })} placeholder="https://…webhook.office.com/…" />
          <Input label="Generic webhook (JSON POST)" value={f.webhook_url} onChange={(e) => setF({ ...f, webhook_url: e.target.value })} placeholder="https://your-system.com/hooks/watchfront" />
        </div>
      </Card>
      <Card>
        <CardHeader title="Rules" />
        <div className="space-y-4 p-5">
          {EVENTS.map(([k, label]) => <Toggle key={k} checked={f.events[k] ?? true} onChange={(v) => setF({ ...f, events: { ...f.events, [k]: v } })} label={label} />)}
          <Select label="Minimum severity for new incidents" value={f.min_severity} onChange={(e) => setF({ ...f, min_severity: e.target.value })}>
            {["info", "minor", "major", "critical"].map((s) => <option key={s}>{s}</option>)}
          </Select>
          <div className="rounded-2xl bg-cream/60 p-4 ring-1 ring-plum/8 space-y-3">
            <Toggle checked={f.escalation.enabled} onChange={(v) => setF({ ...f, escalation: { ...f.escalation, enabled: v } })} label="Escalate unacknowledged incidents" hint="Major and critical incidents not acknowledged (investigating or assigned) within the window." />
            {f.escalation.enabled && <>
              <Input label="Escalate after (minutes)" type="number" min={5} value={f.escalation.after_minutes} onChange={(e) => setF({ ...f, escalation: { ...f.escalation, after_minutes: Number(e.target.value) } })} />
              <ChipInput label="Escalation recipients" values={f.escalation.emails} onChange={(v) => setF({ ...f, escalation: { ...f.escalation, emails: v } })} placeholder="founder@agency.com" />
            </>}
          </div>
          <div className="rounded-2xl bg-cream/60 p-4 ring-1 ring-plum/8 space-y-3">
            <Toggle checked={!!f.quiet_hours?.enabled} onChange={(v) => setF({ ...f, quiet_hours: { ...f.quiet_hours, enabled: v } })} label="Quiet hours" hint="Suppress non-critical alerts overnight. Critical severity and escalations still go through." />
            {f.quiet_hours?.enabled && (
              <div className="grid gap-3 sm:grid-cols-2">
                <Input label="Starts" type="time" value={f.quiet_hours.start || "22:00"} onChange={(e) => setF({ ...f, quiet_hours: { ...f.quiet_hours, start: e.target.value } })} />
                <Input label="Ends" type="time" value={f.quiet_hours.end || "07:00"} onChange={(e) => setF({ ...f, quiet_hours: { ...f.quiet_hours, end: e.target.value } })} />
              </div>
            )}
          </div>
        </div>
      </Card>
      {can("admin") && (
        <div className="flex gap-2 lg:col-span-2">
          <Button onClick={save} loading={saving}>Save notification settings</Button>
          <Button variant="secondary" onClick={async () => { const r = await post("/api/workspace/notifications/test"); toast(`Test sent: ${r.map((x: any) => `${x.channel} ${x.status}`).join(", ")}`); }}><Send className="h-4 w-4" /> Send test alert</Button>
        </div>
      )}
    </div>
  );
}

function Branding({ ws, onSaved }: { ws: any; onSaved: (w: any) => void }) {
  const [b, setB] = useState({ company_name: ws.branding?.company_name || "", logo_url: ws.branding?.logo_url || "", primary_color: ws.branding?.primary_color || "#9b1b67" });
  const allowed = ws.limits.white_label;
  const toast = useToast();
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader title="White-label reports" subtitle={allowed ? "Your brand replaces Watchfront on shared reports." : "Available on Agency and Enterprise."} />
        <div className="space-y-4 p-5">
          <Input label="Company name" value={b.company_name} disabled={!allowed} onChange={(e) => setB({ ...b, company_name: e.target.value })} />
          <Input label="Logo URL" value={b.logo_url} disabled={!allowed} onChange={(e) => setB({ ...b, logo_url: e.target.value })} placeholder="https://agency.com/logo.png" />
          <label className="block"><span className="mb-1.5 block text-xs font-medium text-plum">Brand colour</span>
            <div className="flex items-center gap-3"><input type="color" value={b.primary_color} disabled={!allowed} onChange={(e) => setB({ ...b, primary_color: e.target.value })} className="h-10 w-16 cursor-pointer rounded-lg" /><span className="font-mono text-sm">{b.primary_color}</span></div>
          </label>
          <Button disabled={!allowed} onClick={async () => { try { onSaved(await patch("/api/workspace", { branding: b })); toast("Branding saved"); } catch (e: any) { toast(e.message, "error"); } }}>Save branding</Button>
        </div>
      </Card>
      <Card className="overflow-hidden">
        <div className="px-8 py-8 text-white" style={{ background: allowed ? b.primary_color : "#9b1b67" }}>
          <div className="flex items-center gap-3">{allowed && b.logo_url ? <img src={b.logo_url} alt="" className="h-9 rounded bg-white/90 p-1" /> : <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 font-semibold">{(allowed && b.company_name || ws.name)[0]}</span>}<span className="font-semibold">{allowed && b.company_name || ws.name}</span></div>
          <div className="mt-8 text-2xl font-semibold">Website health report — Preview</div>
        </div>
        <div className="p-6 text-sm text-plum/60">Report preview with your branding.{!allowed && " Watchfront attribution is shown on lower plans."}</div>
      </Card>
    </div>
  );
}

function Audit() {
  const { data } = useApi<any[]>("/api/workspace/audit");
  return (
    <Card>
      <CardHeader title="Audit log" subtitle="Security and configuration changes" />
      <Table head={["Time", "Actor", "Action", "Target", "Details", "IP"]}>
        {data?.map((a) => (
          <tr key={a.id}>
            <Td className="whitespace-nowrap font-mono text-xs">{fmtDate(a.at)}</Td>
            <Td className="text-xs">{a.actor_email}</Td>
            <Td><code className="rounded bg-cream px-1.5 py-0.5 font-mono text-[11px] text-plum">{a.action}</code></Td>
            <Td className="text-xs text-plum/65">{a.target_type}</Td>
            <Td className="max-w-xs truncate font-mono text-[10px] text-plum/55">{JSON.stringify(a.details)}</Td>
            <Td className="font-mono text-[11px] text-plum/50">{a.ip}</Td>
          </tr>
        ))}
      </Table>
    </Card>
  );
}

function DeliveryLog() {
  const { data } = useApi<any[]>("/api/workspace/notifications/log", { poll: 20000 });
  return (
    <Card>
      <CardHeader title="Notification delivery" subtitle="Every alert, its channel, and whether delivery succeeded" />
      <Table head={["Time", "Event", "Channel", "Recipient", "Subject", "Status"]}>
        {data?.map((n) => (
          <tr key={n.id}>
            <Td className="whitespace-nowrap font-mono text-xs">{fmtDate(n.at)}</Td>
            <Td className="text-xs">{n.event?.replace(/_/g, " ")}</Td>
            <Td className="text-xs capitalize">{n.channel}</Td>
            <Td className="max-w-[180px] truncate text-xs text-plum/65">{n.target}</Td>
            <Td className="max-w-xs truncate text-xs">{n.subject}</Td>
            <Td><Badge>{n.status}</Badge>{n.error && <div className="text-[10px] text-bad">{n.error}</div>}</Td>
          </tr>
        ))}
        {data && !data.length && <tr><Td colSpan={6} className="py-8 text-center text-plum/50">No notifications sent yet.</Td></tr>}
      </Table>
    </Card>
  );
}

function System() {
  const { data } = useApi<any>("/api/system/health", { poll: 10000 });
  if (!data) return <Loading />;
  return (
    <div className="space-y-6">
      <Card className={`p-5 ${data.degraded ? "ring-2 ring-gold" : ""}`}>
        <div className="flex items-center gap-3">
          <span className={`h-3 w-3 rounded-full ${data.degraded ? "bg-gold" : "bg-ok animate-pulse-ring text-ok/40"}`} />
          <span className="font-semibold text-ink">{data.degraded ? "Monitoring coverage degraded" : "All monitoring systems operational"}</span>
        </div>
        {data.reasons?.map((r: string) => <p key={r} className="mt-2 text-sm text-plum/75">{r}</p>)}
      </Card>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-5"><KV k="Overdue checks" v={data.overdue_checks} mono /><KV k="Failed jobs (1h)" v={data.failed_jobs_1h} mono /><KV k="Failed notifications (24h)" v={data.failed_notifications_24h} mono /></Card>
        {data.workers.map((w: any) => (
          <Card key={w.id} className="p-5">
            <div className="mb-2 font-mono text-xs text-ink">{w.worker}</div>
            <KV k="Heartbeat" v={timeAgo(w.heartbeat_at)} />
            <KV k="Avg dispatch lag" v={`${w.avg_dispatch_lag_sec}s`} mono />
            {Object.entries(w.pools).map(([k, p]: any) => <KV key={k} k={`${k} pool`} v={`${p.in_flight}/${p.size} busy · ${p.completed} done · ${p.failed} failed`} mono />)}
          </Card>
        ))}
      </div>
      {data.recent_job_failures?.length > 0 && (
        <Card>
          <CardHeader title="Recent job failures" />
          <Table head={["Time", "Job", "Error"]}>
            {data.recent_job_failures.map((j: any) => <tr key={j.id}><Td className="font-mono text-xs">{fmtDate(j.at)}</Td><Td className="text-xs">{j.job}</Td><Td className="font-mono text-[11px] text-bad">{j.error}</Td></tr>)}
          </Table>
        </Card>
      )}
    </div>
  );
}

export default function SettingsPage() {
  return <Suspense><SettingsInner /></Suspense>;
}
