"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api, setToken } from "../../lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Capture token returned from Google OAuth redirect (?token=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const err = params.get("error");
    if (token) {
      setToken(token);
      router.push("/");
    }
    if (err) setError("Google sign-in failed. Please try again.");
  }, [router]);

  const submit = async () => {
    setError("");
    setLoading(true);
    try {
      const fn = mode === "login" ? api.login : api.register;
      const { token } = await fn(form);
      setToken(token);
      router.push("/");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.wrap}>
      <div className="card" style={s.card}>
        <div style={s.brand} onClick={() => router.push("/")}>
          <span style={{ color: "var(--brand)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22 }}>INKDROP</span>
          <span style={{ color: "var(--text-mute)", fontSize: 11, letterSpacing: 3, marginLeft: 6 }}>STUDIO</span>
        </div>
        <h1 style={s.h1}>{mode === "login" ? "Welcome back" : "Create your account"}</h1>

        {/* Google login */}
        <a href={api.googleUrl()} style={s.google}>
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C41 36.3 44 30.7 44 24c0-1.3-.1-2.3-.4-3.5z"/>
          </svg>
          Continue with Google
        </a>

        <div style={s.divider}><span style={s.dividerText}>or</span></div>

        {mode === "register" && (
          <input style={s.input} placeholder="Full name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />
        )}
        <input style={s.input} placeholder="Email" type="email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <div style={s.passwordWrap}>
          <input style={{ ...s.input, marginBottom: 0, paddingRight: 44 }} placeholder="Password"
            type={showPassword ? "text" : "password"} value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && submit()} />
          <button type="button" style={s.eyeBtn} onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"} tabIndex={-1}>
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>

        {error && <div style={s.error}>{error}</div>}

        <button className="btn btn-primary" style={{ width: "100%", marginTop: 4 }} onClick={submit} disabled={loading}>
          {loading ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
        </button>

        <p style={s.switch}>
          {mode === "login" ? "New here? " : "Already have an account? "}
          <span style={s.link} onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>
            {mode === "login" ? "Create an account" : "Log in"}
          </span>
        </p>
      </div>
    </div>
  );
}

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.3 20.3 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a20.3 20.3 0 0 1-4.22 5.06M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    <path d="M1 1l22 22" />
  </svg>
);

const s = {
  wrap: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  card: { width: "100%", maxWidth: 400, padding: 36 },
  brand: { marginBottom: 24, cursor: "pointer" },
  h1: { fontFamily: "var(--font-display)", color: "#fff", fontSize: 22, marginBottom: 24 },
  google: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", padding: "12px", background: "#fff", color: "#1a1a1a", borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: "none", marginBottom: 20 },
  divider: { display: "flex", alignItems: "center", margin: "8px 0 20px", borderTop: "1px solid var(--border)", position: "relative" },
  dividerText: { position: "absolute", left: "50%", transform: "translateX(-50%)", top: -10, background: "var(--surface)", padding: "0 12px", color: "var(--text-mute)", fontSize: 12 },
  input: { width: "100%", padding: "13px 14px", marginBottom: 12, background: "var(--surface-2)", border: "1px solid var(--border-2)", borderRadius: 10, color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" },
  passwordWrap: { position: "relative", marginBottom: 12 },
  eyeBtn: { position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-mute)", cursor: "pointer", padding: 8, display: "flex", alignItems: "center", justifyContent: "center" },
  error: { color: "var(--danger)", fontSize: 13, marginBottom: 12, background: "rgba(255,80,80,0.1)", padding: "8px 12px", borderRadius: 8 },
  switch: { textAlign: "center", color: "var(--text-dim)", fontSize: 13, marginTop: 18 },
  link: { color: "var(--brand)", cursor: "pointer", fontWeight: 600 },
};
