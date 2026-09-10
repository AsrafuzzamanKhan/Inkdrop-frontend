"use client";
import { useEffect, useState, useCallback } from "react";
import { api } from "../../lib/api";
import Navbar from "../../components/Navbar";
import SalesDashboard from "../../components/admin/SalesDashboard";
import UsersTable from "../../components/admin/UsersTable";

const SECTIONS = [
  { key: "orders", label: "Orders" },
  { key: "sales", label: "Sales Dashboard" },
  { key: "users", label: "Users" },
];

const STATUS_TABS = [
  { key: "payment_submitted", label: "Awaiting Verification" },
  { key: "confirmed", label: "Confirmed" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
  { key: "rejected", label: "Rejected" },
  { key: "cancelled", label: "Cancelled" },
  { key: "", label: "All" },
];

export default function AdminPage() {
  const [section, setSection] = useState("orders");
  const [tab, setTab] = useState("payment_submitted");
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [{ orders }, st] = await Promise.all([api.adminOrders(tab), api.adminStats()]);
      setOrders(orders);
      setStats(st);
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => { if (section === "orders") load(); }, [load, section]);

  const verify = async (id) => {
    setBusy(id);
    try { await api.verifyOrder(id); await load(); }
    catch (e) { alert(e.message); } finally { setBusy(null); }
  };

  const reject = async (id) => {
    const reason = prompt("Reason for rejection (optional):") || "";
    setBusy(id);
    try { await api.rejectOrder(id, reason); await load(); }
    catch (e) { alert(e.message); } finally { setBusy(null); }
  };

  const setStatus = async (id, status) => {
    setBusy(id);
    try { await api.updateStatus(id, status); await load(); }
    catch (e) { alert(e.message); } finally { setBusy(null); }
  };

  const cancelOrder = async (id) => {
    if (!confirm("Cancel this order? If the advance was already paid, it will be marked as owed for refund.")) return;
    const reason = prompt("Reason for cancellation (optional):") || "";
    setBusy(id);
    try { await api.cancelOrder(id, reason); await load(); }
    catch (e) { alert(e.message); } finally { setBusy(null); }
  };

  const issueRefund = async (id) => {
    if (!confirm("Confirm you've manually sent the advance back via bKash/Rocket?")) return;
    setBusy(id);
    try { await api.issueRefund(id); await load(); }
    catch (e) { alert(e.message); } finally { setBusy(null); }
  };

  return (
    <div>
      <Navbar active="admin" />
      <div style={s.wrap}>
      <div style={s.container}>
        <h1 style={s.h1}>Admin Panel</h1>

        <div style={s.sectionTabs}>
          {SECTIONS.map((sec) => (
            <button key={sec.key} onClick={() => setSection(sec.key)} style={{ ...s.sectionTab, ...(section === sec.key ? s.sectionTabActive : {}) }}>
              {sec.label}
            </button>
          ))}
        </div>

        {section === "sales" && <SalesDashboard />}
        {section === "users" && <UsersTable />}

        {section === "orders" && (
        <>
        {stats && (
          <div style={s.statsRow}>
            <Stat label="Awaiting verification" value={stats.awaitingVerification} accent="#E8C547" />
            <Stat label="Confirmed" value={stats.confirmed} accent="#4CAF50" />
            <Stat label="Delivered" value={stats.delivered} accent="#2196F3" />
            <Stat label="Revenue (confirmed+)" value={`৳${stats.revenue}`} accent="#fff" />
          </div>
        )}

        <div style={s.tabs}>
          {STATUS_TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{ ...s.tab, ...(tab === t.key ? s.tabActive : {}) }}>
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ color: "#666" }}>Loading…</p>
        ) : orders.length === 0 ? (
          <p style={{ color: "#666" }}>No orders in this category.</p>
        ) : (
          orders.map((o) => (
            <div key={o._id} style={s.card}>
              <div style={s.cardHead}>
                <div>
                  <span style={{ color: "#E8C547", fontWeight: 700 }}>{o.orderNumber}</span>
                  <span style={{ ...s.badge, ...badgeStyle(o.status) }}>{o.status.replace("_", " ")}</span>
                </div>
                <span style={{ color: "#fff", fontWeight: 700 }}>৳{o.pricing.total}</span>
              </div>

              <div style={s.grid}>
                <Field label="Customer" value={`${o.user?.name || "—"} · ${o.user?.email || ""}`} />
                <Field label="Phone" value={o.shipping.phone} />
                <Field label="Area" value={o.shipping.area === "dhaka" ? `Dhaka (৳${o.pricing.deliveryCharge})` : `Outside (৳${o.pricing.deliveryCharge})`} />
                <Field label="Address" value={o.shipping.address} />
                <Field label="Payment method" value={o.payment.method?.toUpperCase() || "—"} />
                <Field label="Transaction ID" value={o.payment.transactionId || "—"} highlight />
                <Field label="Advance" value={`৳${o.pricing.advanceAmount}`} />
                <Field label="Cash on delivery" value={`৳${o.pricing.codBalance}`} />
                {o.payment.refund?.owed && (
                  <Field
                    label="Refund"
                    value={o.payment.refund.status === "issued" ? "Issued ✓" : `Owed — ৳${o.pricing.advanceAmount} pending`}
                    highlight={o.payment.refund.status !== "issued"}
                  />
                )}
              </div>

              <div style={s.items}>
                {o.items.map((it, i) => (
                  <span key={i} style={s.itemChip}>
                    {it.qty}× {it.colorName}/{it.size}
                    {(it.prints || []).map((p) => ` · ${p.location} (${p.size})`).join("")}
                  </span>
                ))}
              </div>

              <div style={s.actions}>
                {o.status === "payment_submitted" && (
                  <>
                    <button style={s.verify} disabled={busy === o._id} onClick={() => verify(o._id)}>
                      ✓ Verify &amp; Confirm
                    </button>
                    <button style={s.reject} disabled={busy === o._id} onClick={() => reject(o._id)}>
                      ✕ Reject
                    </button>
                  </>
                )}
                {o.status === "confirmed" && (
                  <button style={s.neutral} onClick={() => setStatus(o._id, "shipped")}>Mark Shipped</button>
                )}
                {o.status === "shipped" && (
                  <button style={s.neutral} onClick={() => setStatus(o._id, "delivered")}>Mark Delivered</button>
                )}
                {!["cancelled", "delivered"].includes(o.status) && (
                  <button style={s.reject} disabled={busy === o._id} onClick={() => cancelOrder(o._id)}>
                    ✕ Cancel Order
                  </button>
                )}
                {o.payment.refund?.owed && o.payment.refund.status !== "issued" && (
                  <button style={s.verify} disabled={busy === o._id} onClick={() => issueRefund(o._id)}>
                    ✓ Mark Refund Issued
                  </button>
                )}
              </div>
            </div>
          ))
        )}
        </>
        )}
      </div>
      </div>
    </div>
  );
}

const Stat = ({ label, value, accent }) => (
  <div style={s.stat}><div style={{ color: accent, fontSize: 26, fontWeight: 800 }}>{value}</div><div style={{ color: "#888", fontSize: 12 }}>{label}</div></div>
);
const Field = ({ label, value, highlight }) => (
  <div><div style={{ color: "var(--text-mute)", fontSize: 11, marginBottom: 2 }}>{label}</div><div style={{ color: highlight ? "var(--brand)" : "#ddd", fontSize: 13, fontWeight: highlight ? 700 : 400 }}>{value}</div></div>
);
const badgeStyle = (st) => ({
  payment_submitted: { background: "var(--brand-soft)", color: "var(--brand)" },
  confirmed: { background: "rgba(76,175,80,.15)", color: "var(--ok)" },
  rejected: { background: "rgba(255,80,80,.15)", color: "var(--danger)" },
  shipped: { background: "rgba(33,150,243,.15)", color: "var(--info)" },
  delivered: { background: "rgba(120,120,120,.2)", color: "#aaa" },
  cancelled: { background: "rgba(255,80,80,.15)", color: "var(--danger)" },
}[st] || { background: "#222", color: "#888" });

const s = {
  wrap: { minHeight: "80vh", padding: "32px 20px" },
  container: { maxWidth: 1040, margin: "0 auto" },
  h1: { fontFamily: "var(--font-display)", color: "#fff", fontSize: 26, marginBottom: 20 },
  sectionTabs: { display: "flex", gap: 8, marginBottom: 28, borderBottom: "1px solid var(--border)", paddingBottom: 16 },
  // borderWidth/Style/Color, not the `border` shorthand — lets the "active"
  // variant override just borderColor without mixing shorthand+longhand.
  sectionTab: { padding: "10px 18px", background: "var(--surface)", borderWidth: 1, borderStyle: "solid", borderColor: "var(--border-2)", borderRadius: 10, color: "var(--text-dim)", fontSize: 13, fontWeight: 700, cursor: "pointer" },
  sectionTabActive: { background: "var(--brand-soft)", borderColor: "var(--brand)", color: "var(--brand)" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 },
  stat: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 18 },
  tabs: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 },
  tab: { padding: "8px 16px", background: "var(--surface-2)", borderWidth: 1, borderStyle: "solid", borderColor: "var(--border-2)", borderRadius: 20, color: "var(--text-dim)", fontSize: 13, cursor: "pointer" },
  tabActive: { background: "var(--brand-soft)", borderColor: "var(--brand)", color: "var(--brand)" },
  card: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 20, marginBottom: 16 },
  cardHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  badge: { marginLeft: 10, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, textTransform: "capitalize" },
  grid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 14 },
  items: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 },
  itemChip: { background: "var(--surface-2)", border: "1px solid var(--border-2)", borderRadius: 8, padding: "5px 10px", color: "#bbb", fontSize: 12 },
  actions: { display: "flex", gap: 10, flexWrap: "wrap" },
  verify: { padding: "10px 20px", background: "var(--ok)", border: "none", borderRadius: 9, color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13 },
  reject: { padding: "10px 20px", background: "rgba(255,80,80,.15)", border: "1px solid var(--danger)", borderRadius: 9, color: "var(--danger)", fontWeight: 700, cursor: "pointer", fontSize: 13 },
  neutral: { padding: "10px 20px", background: "var(--surface-2)", border: "1px solid var(--border-2)", borderRadius: 9, color: "#ddd", fontWeight: 600, cursor: "pointer", fontSize: 13 },
};
