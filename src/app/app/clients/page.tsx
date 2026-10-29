"use client";

import { Building2, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useToast } from "@/components/toast";
import { Button, Card, Empty, ErrorBox, Input, Loading, Modal, PageHeader, Textarea } from "@/components/ui";
import { del, patch, post } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useApi } from "@/lib/hooks";

type SiteRow = { id: string; name?: string; url?: string; client_id?: string | null };

export default function ClientsPage() {
  const { data, loading, reload } = useApi<any[]>("/api/clients");
  const { data: sites, reload: reloadSites } = useApi<SiteRow[]>("/api/websites");
  const [edit, setEdit] = useState<any | null>(null);
  const [f, setF] = useState({ name: "", contact_email: "", notes: "" });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const seededFor = useRef<string | "new" | null>(null);
  const { can } = useAuth();
  const toast = useToast();

  const siteList = sites || [];
  const assignable = useMemo(() => {
    if (!edit) return [];
    return [...siteList].sort((a, b) => {
      const an = (a.name || a.url || "").toLowerCase();
      const bn = (b.name || b.url || "").toLowerCase();
      return an.localeCompare(bn);
    });
  }, [edit, siteList]);

  const open = (c?: any) => {
    setF({ name: c?.name || "", contact_email: c?.contact_email || "", notes: c?.notes || "" });
    const assigned = c?.id
      ? siteList.filter((s) => s.client_id === c.id).map((s) => s.id)
      : [];
    setSelectedIds(assigned);
    seededFor.current = c?.id && siteList.length ? c.id : c?.id ? null : "new";
    setError(null);
    setEdit(c || {});
  };

  // If the website list arrives after the edit modal opened, seed checkboxes once.
  useEffect(() => {
    if (!edit?.id || !siteList.length || seededFor.current === edit.id) return;
    setSelectedIds(siteList.filter((s) => s.client_id === edit.id).map((s) => s.id));
    seededFor.current = edit.id;
  }, [edit, siteList]);

  const toggleSite = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const syncWebsiteAssignments = async (clientId: string) => {
    const previously = new Set(
      siteList.filter((s) => s.client_id === clientId).map((s) => s.id),
    );
    const next = new Set(selectedIds);
    const ops: Promise<unknown>[] = [];
    for (const id of next) {
      if (!previously.has(id)) ops.push(patch(`/api/websites/${id}`, { client_id: clientId }));
    }
    for (const id of previously) {
      if (!next.has(id)) ops.push(patch(`/api/websites/${id}`, { client_id: null }));
    }
    await Promise.all(ops);
  };

  const save = async () => {
    if (!f.name.trim()) {
      setError("Enter a client name");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      let clientId = edit?.id as string | undefined;
      if (clientId) {
        await patch(`/api/clients/${clientId}`, f);
      } else {
        const created = await post<any>("/api/clients", f);
        clientId = created.id;
      }
      if (clientId) await syncWebsiteAssignments(clientId);
      toast(edit?.id ? "Client updated" : "Client added");
      setEdit(null);
      reload();
      reloadSites();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Agency"
        title="Clients"
        subtitle="Group websites by the customer who owns them. Reports, incidents, and client-portal access are scoped per client."
        action={can("member") && (
          <Button onClick={() => open()}>
            <Plus className="h-4 w-4" /> Add client
          </Button>
        )}
      />
      {loading && !data ? (
        <Loading />
      ) : !data?.length ? (
        <Empty
          icon={<Building2 className="h-6 w-6" />}
          title="No clients yet"
          body="Create a client and pick which websites belong to them."
          action={can("member") && <Button onClick={() => open()}>Add client</Button>}
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {data.map((c, i) => (
            <Card
              key={c.id}
              className="group p-6 transition hover:-translate-y-1 hover:shadow-xl animate-fade-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-plum text-lg font-semibold text-cream">
                    {c.name[0]}
                  </span>
                  <div>
                    <div className="font-semibold text-ink">{c.name}</div>
                    <div className="text-xs text-plum/55">{c.contact_email || "No contact"}</div>
                  </div>
                </div>
                {can("member") && (
                  <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
                    <button onClick={() => open(c)} className="rounded-lg p-1.5 text-plum/50 hover:bg-plum/5">
                      <Pencil className="h-4 w-4" />
                    </button>
                    {can("admin") && (
                      <button
                        onClick={async () => {
                          if (confirm(`Delete ${c.name}? Websites stay but become unassigned.`)) {
                            await del(`/api/clients/${c.id}`);
                            reload();
                            reloadSites();
                          }
                        }}
                        className="rounded-lg p-1.5 text-plum/50 hover:bg-bad/10 hover:text-bad"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-cream/70 py-2">
                  <div className="font-mono text-lg font-semibold text-ink">{c.website_count}</div>
                  <div className="text-[10px] text-plum/55">websites</div>
                </div>
                <div className="rounded-xl bg-cream/70 py-2">
                  <div className={`font-mono text-lg font-semibold ${c.down_count ? "text-bad" : "text-ok"}`}>
                    {c.down_count}
                  </div>
                  <div className="text-[10px] text-plum/55">down</div>
                </div>
                <div className="rounded-xl bg-cream/70 py-2">
                  <div className={`font-mono text-lg font-semibold ${c.open_incidents ? "text-bad" : "text-ink"}`}>
                    {c.open_incidents}
                  </div>
                  <div className="text-[10px] text-plum/55">incidents</div>
                </div>
              </div>
              {c.notes && <p className="mt-4 line-clamp-2 text-xs text-plum/60">{c.notes}</p>}
              <div className="mt-5 flex gap-4 text-xs">
                <Link href={`/app/websites?client_id=${c.id}`} className="text-magenta">
                  Websites →
                </Link>
                <Link href={`/app/reports?client_id=${c.id}`} className="text-magenta">
                  Reports →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={!!edit}
        onClose={() => setEdit(null)}
        title={edit?.id ? "Edit client" : "Add client"}
        subtitle="Assign websites now, or leave empty and attach them later."
        wide
      >
        <div className="space-y-4">
          <ErrorBox error={error} />
          <Input
            label="Client name"
            value={f.name}
            onChange={(e) => setF({ ...f, name: e.target.value })}
            placeholder="Bright Law LLP"
            autoFocus
          />
          <Input
            label="Contact email"
            type="email"
            value={f.contact_email}
            onChange={(e) => setF({ ...f, contact_email: e.target.value })}
          />
          <Textarea
            label="Notes"
            rows={2}
            value={f.notes}
            onChange={(e) => setF({ ...f, notes: e.target.value })}
            placeholder="Retainer, hosting provider, key contacts…"
          />

          <div>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <label className="text-sm font-medium text-ink">Websites</label>
              <span className="text-xs text-plum/55">
                {selectedIds.length} selected
                {assignable.length ? ` · ${assignable.length} total` : ""}
              </span>
            </div>
            {!assignable.length ? (
              <div className="rounded-2xl bg-cream/70 px-4 py-3 text-sm text-plum/70 ring-1 ring-plum/8">
                No websites in this workspace yet.{" "}
                <Link href="/app/websites" className="font-medium text-magenta" onClick={() => setEdit(null)}>
                  Add a website
                </Link>{" "}
                first, then come back to assign it.
              </div>
            ) : (
              <div className="max-h-56 space-y-1 overflow-y-auto rounded-2xl bg-cream/50 p-2 ring-1 ring-plum/8">
                {assignable.map((s) => {
                  const checked = selectedIds.includes(s.id);
                  const otherClient =
                    s.client_id && s.client_id !== edit?.id
                      ? data?.find((c) => c.id === s.client_id)?.name
                      : null;
                  return (
                    <label
                      key={s.id}
                      className="flex cursor-pointer items-start gap-3 rounded-xl px-3 py-2 hover:bg-white/80"
                    >
                      <input
                        type="checkbox"
                        className="mt-1"
                        checked={checked}
                        onChange={() => toggleSite(s.id)}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-ink">
                          {s.name || s.url}
                        </span>
                        {s.name && s.url && (
                          <span className="block truncate text-xs text-plum/55">{s.url}</span>
                        )}
                        {otherClient && !checked && (
                          <span className="mt-0.5 block text-[11px] text-plum/50">
                            Currently on {otherClient} — checking moves it here
                          </span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" onClick={() => setEdit(null)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
