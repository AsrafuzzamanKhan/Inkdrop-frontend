"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../lib/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const FILTERS = [
  { key: "", label: "All" },
  { key: "pending_payment", label: "Pending Payment" },
  { key: "payment_submitted", label: "Awaiting Verification" },
  { key: "confirmed", label: "Confirmed" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
  { key: "rejected", label: "Rejected" },
  { key: "cancelled", label: "Cancelled" },
];

const FLOW = ["pending_payment", "payment_submitted", "confirmed", "shipped", "delivered"];
const FLOW_LABEL = { pending_payment: "Placed", payment_submitted: "Payment sent", confirmed: "Confirmed", shipped: "Shipped", delivered: "Delivered" };

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [expanded, setExpanded] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { orders } = await api.myOrders();
      setOrders(orders);
    } catch (e) {
      // handled by the me() redirect below if it's an auth issue
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    api.me()
      .then(({ user }) => { setUser(user); return load(); })
      .catch(() => router.push("/login"))
      .finally(() => setReady(true));
  }, [load, router]);

  const visible = filter ? orders.filter((o) => o.status === filter) : orders;

  if (!ready) return null;

  return (
    <div>
      <Navbar active="dashboard" />
      <div className="container" style={s.wrap}>
        <span className="eyebrow">Your Account</span>
        <h1 style={s.h1}>Order History</h1>
        <p style={s.sub}>Every order you've placed, its live status, and what happens next.</p>

        <SummaryRow orders={orders} />

        <div style={s.tabs}>
          {FILTERS.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} style={{ ...s.tab, ...(filter === f.key ? s.tabActive : {}) }}>
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ color: "var(--text-mute)", padding: "24px 0" }}>Loading your orders…</p>
        ) : visible.length === 0 ? (
          <div className="card" style={{ padding: 32, textAlign: "center" }}>
            <p style={{ color: "var(--text-mute)", marginBottom: 16 }}>No orders in this category yet.</p>
            <button className="btn btn-primary" onClick={() => router.push("/checkout")}>Design a shirt →</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {visible.map((o) => (
              <OrderCard key={o._id} order={o} open={expanded === o._id}
                onToggle={() => setExpanded(expanded === o._id ? null : o._id)} onChanged={load} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

function SummaryRow({ orders }) {
  const settled = orders.filter((o) => ["confirmed", "shipped", "delivered"].includes(o.status));
  const totalSpent = settled.reduce((sum, o) => sum + o.pricing.total, 0);
  const active = orders.filter((o) => ["pending_payment", "payment_submitted", "confirmed", "shipped"].includes(o.status)).length;

  return (
    <div className="grid-auto" style={{ margin: "24px 0 28px" }}>
      <div className="card" style={s.statCard}><div style={s.statVal}>{orders.length}</div><div style={s.statLabel}>Total orders</div></div>
      <div className="card" style={s.statCard}><div style={s.statVal}>{active}</div><div style={s.statLabel}>In progress</div></div>
      <div className="card" style={s.statCard}><div style={s.statVal}>৳{totalSpent}</div><div style={s.statLabel}>Spent (confirmed+)</div></div>
    </div>
  );
}

function OrderCard({ order, open, onToggle, onChanged }) {
  const refundOwed = order.payment.refund?.owed && order.payment.refund.status !== "issued";

  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <div style={s.cardHead} onClick={onToggle}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ color: "var(--brand)", fontWeight: 700 }}>{order.orderNumber}</span>
          <span style={{ color: "var(--text-mute)", fontSize: 12 }}>{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {refundOwed && <span style={s.refundPill}>Refund owed</span>}
          <span style={{ ...s.badge, ...badgeStyle(order.status) }}>{order.status.replace(/_/g, " ")}</span>
          <span style={{ color: "#fff", fontWeight: 700 }}>৳{order.pricing.total}</span>
          <span style={{ color: "var(--text-mute)", transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }}>▾</span>
        </div>
      </div>

      {open && (
        <div style={s.cardBody}>
          <Timeline status={order.status} />

          <div className="grid-auto" style={{ marginTop: 20 }}>
            <div>
              <div style={s.blockLabel}>Items</div>
              {order.items.map((it, i) => (
                <div key={i} style={s.itemRow}>
                  <span style={{ ...s.colorDot, background: it.color }} />
                  <span style={{ color: "#ddd" }}>{it.qty}× {it.colorName} / {it.size}</span>
                  <span style={{ color: "var(--text-mute)", fontSize: 12 }}>
                    {(it.prints || []).map((p) => `${p.location} (${p.size})`).join(", ")}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <div style={s.blockLabel}>Shipping</div>
              <p style={s.text}>{order.shipping.name} · {order.shipping.phone}</p>
              <p style={s.text}>{order.shipping.address}</p>
              <p style={s.text}>{order.shipping.area === "dhaka" ? "Inside Dhaka" : "Outside Dhaka"}</p>
            </div>
            <div>
              <div style={s.blockLabel}>Payment</div>
              <p style={s.text}>Advance: ৳{order.pricing.advanceAmount} {order.payment.advancePaid ? "(verified ✓)" : "(pending)"}</p>
              <p style={s.text}>Cash on delivery: ৳{order.pricing.codBalance}</p>
              {order.payment.transactionId && <p style={s.text}>Txn ID: {order.payment.transactionId}</p>}
              {order.payment.rejectionReason && <p style={{ ...s.text, color: "var(--danger)" }}>{order.payment.rejectionReason}</p>}
              {refundOwed && <p style={{ ...s.text, color: "var(--brand)" }}>Refund of ৳{order.pricing.advanceAmount} is owed to you — we'll send it via {order.payment.method.toUpperCase()}.</p>}
              {order.payment.refund?.status === "issued" && <p style={{ ...s.text, color: "var(--ok)" }}>Refund issued ✓</p>}
            </div>
          </div>

          {["pending_payment", "rejected"].includes(order.status) && (
            <SubmitTxn order={order} onChanged={onChanged} />
          )}
        </div>
      )}
    </div>
  );
}

function SubmitTxn({ order, onChanged }) {
  const [method, setMethod] = useState(order.payment.method || "bkash");
  const [txn, setTxn] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setError(""); setBusy(true);
    try {
      await api.submitTransaction(order._id, { method, transactionId: txn });
      setTxn("");
      onChanged();
    } catch (e) { setError(e.message); } finally { setBusy(false); }
  };

  return (
    <div style={s.txnBox}>
      <div style={s.blockLabel}>{order.status === "rejected" ? "Resubmit your transaction ID" : "Submit your advance payment"}</div>
      <p style={s.text}>Send ৳{order.pricing.advanceAmount} via bKash/Rocket, then submit the transaction ID below.</p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <select value={method} onChange={(e) => setMethod(e.target.value)} style={s.select}>
          <option value="bkash">bKash</option>
          <option value="rocket">Rocket</option>
        </select>
        <input style={{ ...s.input, flex: 1, minWidth: 160 }} placeholder="Transaction ID" value={txn} onChange={(e) => setTxn(e.target.value)} />
        <button className="btn btn-primary" disabled={busy || txn.trim().length < 4} onClick={submit}>
          {busy ? "Submitting…" : "Submit"}
        </button>
      </div>
      {error && <div style={{ color: "var(--danger)", fontSize: 12, marginTop: 8 }}>{error}</div>}
    </div>
  );
}

function Timeline({ status }) {
  if (status === "cancelled") {
    return <div style={s.timelineFlat}><span style={{ color: "var(--danger)", fontWeight: 700 }}>✕ Order cancelled</span></div>;
  }

  const isRejected = status === "rejected";
  const activeIndex = isRejected ? 1 : FLOW.indexOf(status);

  return (
    <div style={s.timeline}>
      {FLOW.map((step, i) => {
        const reached = i <= activeIndex;
        const isRejectedStep = isRejected && i === 1;
        return (
          <div key={step} style={s.timelineStep}>
            <div style={{ ...s.timelineDot, ...(reached ? s.timelineDotActive : {}), ...(isRejectedStep ? s.timelineDotError : {}) }}>
              {isRejectedStep ? "✕" : reached ? "✓" : ""}
            </div>
            <div style={{ ...s.timelineLabel, color: reached ? (isRejectedStep ? "var(--danger)" : "var(--brand)") : "var(--text-mute)" }}>
              {isRejectedStep ? "Rejected" : FLOW_LABEL[step]}
            </div>
            {i < FLOW.length - 1 && <div style={{ ...s.timelineLine, ...(i < activeIndex ? s.timelineLineActive : {}) }} />}
          </div>
        );
      })}
    </div>
  );
}

const badgeStyle = (st) => ({
  pending_payment: { background: "var(--brand-soft)", color: "var(--brand)" },
  payment_submitted: { background: "rgba(255,152,0,.15)", color: "var(--warn)" },
  confirmed: { background: "rgba(76,175,80,.15)", color: "var(--ok)" },
  rejected: { background: "rgba(255,80,80,.15)", color: "var(--danger)" },
  shipped: { background: "rgba(33,150,243,.15)", color: "var(--info)" },
  delivered: { background: "rgba(120,120,120,.2)", color: "#aaa" },
  cancelled: { background: "rgba(255,80,80,.15)", color: "var(--danger)" },
}[st] || { background: "#222", color: "#888" });

const s = {
  wrap: { padding: "40px 24px 80px" },
  h1: { fontFamily: "var(--font-display)", color: "#fff", fontSize: 30, margin: "10px 0 8px" },
  sub: { color: "var(--text-mute)", fontSize: 14 },
  statCard: { padding: 20, textAlign: "center" },
  statVal: { fontFamily: "var(--font-display)", color: "var(--brand)", fontSize: 24, fontWeight: 700 },
  statLabel: { color: "var(--text-mute)", fontSize: 12, marginTop: 6 },
  tabs: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 },
  // borderWidth/Style/Color, not the `border` shorthand — see timelineDot below.
  tab: { padding: "8px 16px", background: "var(--surface-2)", borderWidth: 1, borderStyle: "solid", borderColor: "var(--border-2)", borderRadius: 20, color: "var(--text-dim)", fontSize: 13, cursor: "pointer" },
  tabActive: { background: "var(--brand-soft)", borderColor: "var(--brand)", color: "var(--brand)" },
  cardHead: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: 20, cursor: "pointer", flexWrap: "wrap", gap: 10 },
  cardBody: { padding: "0 20px 24px", borderTop: "1px solid var(--border)" },
  badge: { padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, textTransform: "capitalize" },
  refundPill: { padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: "var(--brand-soft)", color: "var(--brand)" },
  blockLabel: { color: "var(--text)", fontWeight: 700, fontSize: 12, marginBottom: 10, marginTop: 20, textTransform: "uppercase", letterSpacing: .5 },
  itemRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" },
  colorDot: { width: 12, height: 12, borderRadius: "50%", border: "1px solid var(--border-2)", flexShrink: 0 },
  text: { color: "var(--text-dim)", fontSize: 13, lineHeight: 1.6 },
  txnBox: { marginTop: 8, padding: 16, background: "var(--surface-2)", borderRadius: 12 },
  select: { padding: "12px 14px", background: "var(--surface)", border: "1px solid var(--border-2)", borderRadius: 10, color: "#fff", fontSize: 14 },
  input: { padding: "12px 14px", background: "var(--surface)", border: "1px solid var(--border-2)", borderRadius: 10, color: "#fff", fontSize: 14, outline: "none" },

  timeline: { display: "flex", alignItems: "flex-start", marginTop: 20 },
  timelineStep: { display: "flex", flexDirection: "column", alignItems: "center", position: "relative", flex: 1 },
  // borderWidth/Style/Color instead of `border` shorthand — the active/error
  // variants override only borderColor, and mixing shorthand with a longhand
  // override causes React to warn (and can leave a stale border on toggle).
  timelineDot: { width: 26, height: 26, borderRadius: "50%", borderWidth: 2, borderStyle: "solid", borderColor: "var(--border-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "var(--text-mute)", background: "var(--surface)", zIndex: 1 },
  timelineDotActive: { borderColor: "var(--brand)", color: "var(--brand)" },
  timelineDotError: { borderColor: "var(--danger)", color: "var(--danger)" },
  timelineLabel: { fontSize: 11, marginTop: 6, textAlign: "center" },
  timelineLine: { position: "absolute", top: 13, left: "50%", width: "100%", height: 2, background: "var(--border-2)", zIndex: 0 },
  timelineLineActive: { background: "var(--brand)" },
  timelineFlat: { marginTop: 20, padding: 14, background: "rgba(255,80,80,.08)", borderRadius: 10, textAlign: "center" },
};
