"use client";

import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/toast";
import { Badge, Button, Card, CardHeader, ErrorBox, Loading } from "@/components/ui";
import { ApiError, api, formatApiError, post } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useApi } from "@/lib/hooks";

export function BillingPanel({ ws, onSaved }: { ws: any; onSaved: (w: any) => void }) {
  const { data, reload: reloadPlans } = useApi<any>("/api/workspace/plans");
  const { data: billing } = useApi<any>("/api/billing/config");
  const { can, refresh } = useAuth();
  const toast = useToast();
  const [busy, setBusy] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [checkoutError, setCheckoutError] = useState<{ message: string; code?: string } | null>(null);
  const sp = useSearchParams();

  useEffect(() => {
    const orderId = sp.get("order_id");
    if (!orderId || !can("owner")) return;
    let cancelled = false;
    setConfirming(true);
    (async () => {
      for (let i = 0; i < 8 && !cancelled; i++) {
        try {
          const st = await api<any>(`/api/billing/orders/${orderId}`);
          if (st.paid) {
            toast(`Payment received - plan is now ${String(st.workspace_plan || "").replace("_", " ")}`);
            await refresh();
            reloadPlans();
            onSaved(await api("/api/workspace"));
            setConfirming(false);
            return;
          }
        } catch {
          /* retry */
        }
        await new Promise((r) => setTimeout(r, 1500));
      }
      if (!cancelled) {
        toast("Payment not confirmed yet. If you paid, refresh this page in a minute.", "error");
        setConfirming(false);
      }
    })();
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!data) return <Loading />;
  const u = ws.usage;
  const paymentsOn = !!billing?.enabled;
  const methodLabels: { id: string; label: string }[] = billing?.payment_methods_labels || [];

  const startCheckout = async (planId: string, planName: string) => {
    setBusy(planId);
    setCheckoutError(null);
    try {
      if (!paymentsOn || planId === "free") {
        onSaved(await post("/api/workspace/plan", { plan: planId }));
        await refresh();
        toast(planId === "free" ? "Moved to Free" : `Switched to ${planName}`);
        return;
      }
      const session = await post<any>("/api/billing/checkout", { plan: planId });
      if (!session.checkout_url) {
        throw new ApiError("Dodo did not return a checkout URL. Try again or contact support.", 502, "dodo_missing_session");
      }
      window.location.href = session.checkout_url;
    } catch (e: unknown) {
      const message = formatApiError(e, "Payment could not be started");
      const code = e instanceof ApiError ? e.code : "checkout_failed";
      setCheckoutError({ message: e instanceof ApiError ? e.message : message, code });
      toast(message, "error");
    } finally {
      setBusy(null);
    }
  };

  const locked = !!(ws?.locked || ws?.access?.locked);
  const trialActive = !!(ws?.trial_active || ws?.access?.trial_active);
  const billingActive = !!(ws?.billing_active || ws?.access?.billing_active);
  const lockReason = ws?.lock_reason || ws?.access?.reason;
  const paidUntil = ws?.paid_until || ws?.access?.paid_until;

  return (
    <div>
      {locked && (
        <Card className="mb-4 border border-bad/25 bg-bad/5 p-4 text-sm text-ink sm:p-5">
          <div className="font-semibold text-bad">
            {lockReason === "subscription_ended" ? "Plan expired - renew to continue" : "Trial ended - unlock to continue"}
          </div>
          <p className="mt-1 text-plum-2">
            {lockReason === "subscription_ended"
              ? "Your 30-day access window ended. Pay again below to restore monitoring for another 30 days."
              : "Your 24-hour free trial is over. Choose a plan below - each payment unlocks 30 days of access."}
          </p>
        </Card>
      )}
      {trialActive && !locked && (
        <Card className="mb-4 border border-magenta/20 bg-magenta/5 p-4 text-sm text-plum sm:p-5">
          You&apos;re on a <b className="text-ink">24-hour free trial</b> with full Growth features. Pick a plan anytime - payment unlocks <b className="text-ink">30 days</b> of access.
        </Card>
      )}
      {billingActive && !locked && paidUntil && (
        <Card className="mb-4 border border-ok/25 bg-ok/5 p-4 text-sm text-plum sm:p-5">
          Access active until <b className="text-ink">{new Date(paidUntil).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</b>.
          {" "}Renew before then to keep monitoring without interruption (early renewals add another 30 days).
        </Card>
      )}
      {confirming && (
        <Card className="mb-4 border border-magenta/20 bg-magenta/5 p-4 text-sm text-plum">
          Confirming your Dodo Payments payment…
        </Card>
      )}
      {checkoutError && (
        <div className="mb-4">
          <ErrorBox error={checkoutError.message} code={checkoutError.code} />
        </div>
      )}
      <Card className="mb-6 grid gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
        {[["Browser-test minutes", (u.browser_seconds / 60).toFixed(1), ws.limits.browser_minutes], ["AI analyses", u.ai_calls, ws.limits.ai_calls], ["Browser events ingested", u.ingest_events, ws.limits.ingest_events], ["History retention", ws.limits.history_days, "days"]].map(([k, v, cap]) => (
          <div key={k as string}><div className="font-mono text-[10px] uppercase tracking-[0.12em] text-plum/50">{k}</div><div className="mt-1 font-mono text-2xl font-semibold text-ink">{v}<span className="text-sm text-plum/45"> / {cap}</span></div></div>
        ))}
      </Card>

      {paymentsOn && can("owner") && (
        <Card className="mb-6 p-5 sm:p-6">
          <CardHeader title="Checkout" subtitle="Secure payment via Dodo Payments (UPI, cards, netbanking)" />
          <div className="mt-3 flex flex-wrap gap-2">
            {(methodLabels.length ? methodLabels : [
              { id: "upi", label: "UPI" }, { id: "cc", label: "Credit card" },
              { id: "dc", label: "Debit card" }, { id: "nb", label: "Netbanking" },
            ]).map((m) => (
              <span key={m.id} className="rounded-full bg-cream px-3 py-1 text-xs text-ink">{m.label}</span>
            ))}
          </div>
          {billing?.mode === "test" && (
            <p className="mt-3 text-xs text-plum/55">Test mode - use Dodo test cards / UPI VPAs. No real money is charged.</p>
          )}
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Object.entries(data.plans).filter(([id]) => id !== "enterprise").map(([id, p]: any) => {
          const current = data.current === id;
          const inr = p.price_inr ?? 0;
          return (
            <Card key={id} className={`flex flex-col p-5 sm:p-6 ${current ? "ring-2 ring-magenta" : ""}`}>
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-ink">{p.name}</h3>
                {current && <Badge tone="active">current{trialActive ? " · trial" : locked ? " · locked" : ""}</Badge>}
              </div>
              <div className="mt-3 text-3xl font-semibold text-ink">
                {inr > 0 ? <>₹{inr.toLocaleString("en-IN")}</> : <>Free</>}
                {inr > 0 && <span className="text-sm font-normal text-plum/50">/mo</span>}
              </div>
              {inr > 0 && <div className="mt-1 text-[11px] text-plum/45">INR · billed monthly</div>}
              <ul className="mt-4 flex-1 space-y-1.5 text-xs text-plum/75">
                <li>{p.websites} websites · checks every {p.min_interval_sec >= 60 ? `${p.min_interval_sec / 60} min` : `${p.min_interval_sec}s`}</li>
                <li>{p.history_days}-day history</li>
                <li>{p.ssl ? "SSL & domain monitoring" : "No SSL monitoring"}</li>
                <li>{p.content_checks} content checks · {p.api_monitors} API monitors</li>
                <li>{p.browser_tests} journeys · {p.browser_minutes} browser min</li>
                <li>{p.js_monitoring ? "Browser error monitoring" : "No browser error monitoring"}</li>
                <li>{p.team_members} team member(s) · Email alerts</li>
                <li>{p.reports ? (p.scheduled_reports ? "Scheduled reports" : "Reports") : "No reports"}{p.white_label ? " · white-label" : ""}</li>
                <li>{p.ai_calls} AI analyses / month</li>
              </ul>
              {can("owner") && id === "free" && !current && (
                <Button className="mt-5 w-full" variant="secondary" loading={busy === id}
                  onClick={() => startCheckout(id, p.name)}>
                  Switch to Free
                </Button>
              )}
              {can("owner") && id !== "free" && (!current || locked || paymentsOn) && (
                <Button
                  className="mt-5 w-full whitespace-normal text-center leading-snug"
                  variant={id === "agency" || (current && locked) ? "primary" : "secondary"}
                  loading={busy === id}
                  onClick={() => startCheckout(id, p.name)}
                >
                  {!paymentsOn
                    ? `Switch to ${p.name}`
                    : current && locked
                      ? `Renew ₹${inr.toLocaleString("en-IN")} · 30 days`
                      : current
                        ? `Extend ₹${inr.toLocaleString("en-IN")} · +30 days`
                        : locked || trialActive
                          ? `Pay ₹${inr.toLocaleString("en-IN")} · 30 days`
                          : `Pay ₹${inr.toLocaleString("en-IN")} & unlock`}
                </Button>
              )}
              {current && !locked && !paymentsOn && (
                <div className="mt-5 flex items-center gap-2 text-sm text-ok"><Check className="h-4 w-4" /> Current plan</div>
              )}
            </Card>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-plum/55">
        {paymentsOn
          ? <>Payments via Dodo Payments in INR. See <a className="underline hover:text-magenta" href="/refund" target="_blank" rel="noreferrer">refund policy</a>, <a className="underline hover:text-magenta" href="/terms" target="_blank" rel="noreferrer">terms</a> and <a className="underline hover:text-magenta" href="/privacy" target="_blank" rel="noreferrer">privacy</a>.</>
          : "Payments are not configured yet - plan switches are free until billing is enabled."}
      </p>
      <p className="mt-2 text-xs text-plum/55">
        Need Enterprise? <a className="underline hover:text-magenta" href="/contact#book">Book a call</a>.
      </p>
    </div>
  );
}
