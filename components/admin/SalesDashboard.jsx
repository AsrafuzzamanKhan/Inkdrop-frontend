"use client";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

const STATUS_ORDER = ["pending_payment", "payment_submitted", "confirmed", "shipped", "delivered", "rejected", "cancelled"];
const STATUS_COLOR = {
  pending_payment: "var(--brand)",
  payment_submitted: "var(--warn)",
  confirmed: "var(--ok)",
  shipped: "var(--info)",
  delivered: "#aaa",
  rejected: "var(--danger)",
  cancelled: "var(--danger)",
};

export default function SalesDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.adminSales()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: "var(--text-mute)" }}>Loading sales data…</p>;
  if (error) return <div style={s.error}>{error}</div>;
  if (!data) return null;

  const maxDaily = Math.max(1, ...data.dailyTrend.map((d) => d.revenue));
  const totalStatusCount = Object.values(data.ordersByStatus).reduce((a, b) => a + b, 0) || 1;
  const maxColorQty = Math.max(1, ...data.topColors.map((c) => c.qty));

  return (
    <div>
      <div className="grid-auto" style={{ marginBottom: 24 }}>
        <Stat label="Revenue (confirmed+)" value={`৳${data.revenue}`} accent="var(--brand)" />
        <Stat label="Total orders" value={data.totalOrders} accent="#fff" />
        <Stat label="Avg order value" value={`৳${data.avgOrderValue}`} accent="var(--info)" />
        <Stat label="Total customers" value={data.totalCustomers} accent="var(--ok)" />
        <Stat label="Pending refunds" value={`${data.pendingRefunds.count} · ৳${data.pendingRefunds.amount}`} accent="var(--danger)" />
      </div>

      <div className="admin-grid2" style={s.grid2}>
        {/* 14-day revenue trend */}
        <div className="card" style={s.panel}>
          <div style={s.panelTitle}>Revenue — last 14 days</div>
          <div style={s.chart}>
            {data.dailyTrend.map((d) => (
              <div key={d.date} style={s.barCol} title={`${d.date}: ৳${d.revenue} (${d.orders} orders)`}>
                <div style={{ ...s.bar, height: `${Math.max(3, (d.revenue / maxDaily) * 100)}%` }} />
                <span style={s.barLabel}>{d.date.slice(5).replace("-", "/")}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders by status */}
        <div className="card" style={s.panel}>
          <div style={s.panelTitle}>Orders by status</div>
          {STATUS_ORDER.filter((st) => data.ordersByStatus[st]).map((st) => (
            <div key={st} style={s.statusRow}>
              <span style={{ ...s.statusLabel, color: STATUS_COLOR[st] }}>{st.replace(/_/g, " ")}</span>
              <div style={s.statusBarTrack}>
                <div style={{ ...s.statusBarFill, width: `${(data.ordersByStatus[st] / totalStatusCount) * 100}%`, background: STATUS_COLOR[st] }} />
              </div>
              <span style={s.statusCount}>{data.ordersByStatus[st]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top colors */}
      <div className="card" style={{ ...s.panel, marginTop: 20 }}>
        <div style={s.panelTitle}>Best-selling colors</div>
        {data.topColors.length === 0 ? (
          <p style={{ color: "var(--text-mute)", fontSize: 13 }}>No orders yet.</p>
        ) : (
          data.topColors.map((c) => (
            <div key={c.colorName} style={s.statusRow}>
              <span style={{ ...s.colorDot, background: c.colorHex }} />
              <span style={{ ...s.statusLabel, color: "#ddd", flex: "0 0 140px" }}>{c.colorName}</span>
              <div style={s.statusBarTrack}>
                <div style={{ ...s.statusBarFill, width: `${(c.qty / maxColorQty) * 100}%`, background: "var(--brand)" }} />
              </div>
              <span style={s.statusCount}>{c.qty}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const Stat = ({ label, value, accent }) => (
  <div className="card" style={{ padding: 18 }}>
    <div style={{ color: accent, fontSize: 22, fontWeight: 800 }}>{value}</div>
    <div style={{ color: "var(--text-mute)", fontSize: 12, marginTop: 4 }}>{label}</div>
  </div>
);

const s = {
  error: { color: "var(--danger)", fontSize: 13, background: "rgba(255,80,80,.1)", padding: "10px 14px", borderRadius: 8 },
  grid2: { display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 },
  panel: { padding: 20 },
  panelTitle: { color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 18 },
  chart: { display: "flex", alignItems: "flex-end", gap: 6, height: 140 },
  barCol: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" },
  bar: { width: "100%", background: "linear-gradient(180deg, var(--brand), var(--brand-dark))", borderRadius: "4px 4px 0 0", minHeight: 2 },
  barLabel: { color: "var(--text-mute)", fontSize: 9, marginTop: 6, writingMode: "vertical-rl", transform: "rotate(180deg)" },
  statusRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 },
  statusLabel: { fontSize: 12, fontWeight: 600, textTransform: "capitalize", flex: "0 0 110px" },
  statusBarTrack: { flex: 1, height: 8, background: "var(--surface-2)", borderRadius: 4, overflow: "hidden" },
  statusBarFill: { height: "100%", borderRadius: 4 },
  statusCount: { color: "#fff", fontWeight: 700, fontSize: 12, flex: "0 0 24px", textAlign: "right" },
  colorDot: { width: 12, height: 12, borderRadius: "50%", border: "1px solid var(--border-2)", flexShrink: 0 },
};
