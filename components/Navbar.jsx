"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, clearToken } from "../lib/api";

// Consistent header across every page — the one piece of brand furniture
// a visitor sees no matter where they land.
export default function Navbar({ active }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    api.me()
      .then(({ user }) => setUser(user))
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  const logout = () => {
    clearToken();
    setUser(null);
    router.push("/");
  };

  return (
    <header style={s.header}>
      <div className="container" style={s.inner}>
        <div style={s.brand} onClick={() => router.push("/")}>
          <span style={s.brandMark}>INKDROP</span>
          <span style={s.brandSub}>STUDIO</span>
        </div>

        <nav style={s.nav}>
          <button className="hide-mobile" style={{ ...s.navBtn, ...(active === "home" ? s.navBtnActive : {}) }} onClick={() => router.push("/")}>
            Home
          </button>
          <button style={s.navBtn} onClick={() => router.push(user ? "/checkout" : "/login")}>
            Design a Shirt
          </button>
          {ready && user ? (
            <>
              <button style={{ ...s.navBtn, ...(active === "dashboard" ? s.navBtnActive : {}) }} onClick={() => router.push("/dashboard")}>
                My Orders
              </button>
              {user.isAdmin && (
                <button className="hide-mobile" style={{ ...s.navBtn, ...(active === "admin" ? s.navBtnActive : {}) }} onClick={() => router.push("/admin")}>Admin</button>
              )}
              <button style={{ ...s.navBtn, color: "var(--danger)" }} onClick={logout}>Log out</button>
            </>
          ) : ready ? (
            <button style={s.navBtnPrimary} onClick={() => router.push("/login")}>Log in</button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

const s = {
  header: { position: "sticky", top: 0, zIndex: 100, background: "rgba(10,10,10,.85)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--border)" },
  inner: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px" },
  brand: { display: "flex", alignItems: "baseline", cursor: "pointer" },
  brandMark: { color: "var(--brand)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, letterSpacing: .5 },
  brandSub: { color: "var(--text-mute)", fontSize: 10, letterSpacing: 3, marginLeft: 6 },
  nav: { display: "flex", gap: 8, alignItems: "center" },
  navBtn: { background: "none", border: "1px solid transparent", borderRadius: 8, color: "var(--text-dim)", padding: "9px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600 },
  navBtnActive: { color: "var(--brand)" },
  navBtnPrimary: { background: "var(--brand)", border: "none", borderRadius: 8, color: "#000", padding: "10px 18px", cursor: "pointer", fontSize: 13, fontWeight: 800 },
};
