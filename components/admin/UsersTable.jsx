"use client";
import { useEffect, useMemo, useState } from "react";
import { api } from "../../lib/api";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    api.adminUsers()
      .then(({ users }) => setUsers(users))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return users;
    return users.filter((u) => u.name?.toLowerCase().includes(query) || u.email?.toLowerCase().includes(query));
  }, [users, q]);

  if (loading) return <p style={{ color: "var(--text-mute)" }}>Loading users…</p>;
  if (error) return <div style={s.error}>{error}</div>;

  return (
    <div>
      <div style={s.toolbar}>
        <input style={s.search} placeholder="Search by name or email…" value={q} onChange={(e) => setQ(e.target.value)} />
        <span style={s.count}>{filtered.length} of {users.length} users</span>
      </div>

      <div className="card" style={{ overflow: "auto" }}>
        <table style={s.table}>
          <thead>
            <tr>
              {["Name", "Email", "Role", "Sign-in", "Orders", "Total spent", "Joined"].map((h) => (
                <th key={h} style={s.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u._id} style={s.tr}>
                <td style={s.td}>{u.name}</td>
                <td style={s.td}>{u.email}</td>
                <td style={s.td}>
                  <span style={{ ...s.pill, ...(u.isAdmin ? s.pillAdmin : s.pillCustomer) }}>{u.isAdmin ? "Admin" : "Customer"}</span>
                </td>
                <td style={s.td}>{u.authProvider === "google" ? "Google" : "Email"}</td>
                <td style={s.td}>{u.orderCount}</td>
                <td style={s.td}>৳{u.totalSpent}</td>
                <td style={s.td}>{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p style={{ color: "var(--text-mute)", padding: 20, textAlign: "center" }}>No users match "{q}".</p>}
      </div>
    </div>
  );
}

const s = {
  error: { color: "var(--danger)", fontSize: 13, background: "rgba(255,80,80,.1)", padding: "10px 14px", borderRadius: 8 },
  toolbar: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" },
  search: { padding: "10px 14px", background: "var(--surface-2)", border: "1px solid var(--border-2)", borderRadius: 10, color: "#fff", fontSize: 13, minWidth: 240, outline: "none" },
  count: { color: "var(--text-mute)", fontSize: 12 },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 640 },
  th: { textAlign: "left", padding: "12px 16px", color: "var(--text-mute)", fontSize: 11, textTransform: "uppercase", letterSpacing: .5, borderBottom: "1px solid var(--border)" },
  tr: { borderBottom: "1px solid var(--border)" },
  td: { padding: "12px 16px", color: "#ddd" },
  pill: { padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 },
  pillAdmin: { background: "var(--brand-soft)", color: "var(--brand)" },
  pillCustomer: { background: "var(--surface-2)", color: "var(--text-dim)" },
};
