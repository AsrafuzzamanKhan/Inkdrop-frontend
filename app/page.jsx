"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialChat from "../components/SocialChat";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [basePrice, setBasePrice] = useState(600);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    api.me()
      .then(({ user }) => {
        setUser(user);
        return api.myOrders();
      })
      .then(({ orders }) => setOrders(orders))
      .catch(() => {})
      .finally(() => setLoadingOrders(false));

    api.products()
      .then(({ products, basePrice }) => {
        setProducts(products);
        if (basePrice) setBasePrice(basePrice);
      })
      .catch(() => {});
  }, []);

  return (
    <div style={s.wrap}>
      <Navbar active="home" />

      {/* ── HERO ── */}
      <section style={s.hero}>
        <div className="container fade-up" style={s.heroInner}>
          <span className="eyebrow">Custom DTF Printing · Bangladesh</span>
          <h1 style={s.heroTitle}>
            Your design.<br />
            <span style={s.heroGold}>Our print.</span> Any color, any size.
          </h1>
          <p style={s.heroSub}>
            Upload your own artwork onto a premium blank tee, pick where and
            how big it prints, and we handle the rest — DTF printing,
            packing, and delivery anywhere in Bangladesh.
          </p>
          <div style={s.heroBtns}>
            <button className="btn btn-primary" onClick={() => router.push(user ? "/checkout" : "/login")}>
              Start Designing →
            </button>
            <button className="btn btn-ghost" onClick={() => document.getElementById("shirts")?.scrollIntoView({ behavior: "smooth" })}>
              See blank shirts
            </button>
          </div>
          <div style={s.heroStats}>
            <Stat value="৳100" label="advance to lock your order" />
            <Stat value="COD" label="pay the rest on delivery" />
            <Stat value="8+" label="blank shirt colors in stock" />
          </div>
        </div>
      </section>

      {/* ── WHY INKDROP ── */}
      <section className="container" style={s.section}>
        <span className="eyebrow">Why INKDROP</span>
        <h2 style={s.h2}>Built for people who design their own drip.</h2>
        <div className="grid-auto" style={{ marginTop: 32 }}>
          {VALUES.map((v) => (
            <div key={v.title} className="card" style={s.valueCard}>
              <div style={s.valueIcon}>{v.icon}</div>
              <div style={s.valueTitle}>{v.title}</div>
              <div style={s.valueDesc}>{v.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BLANK SHIRTS ── */}
      <section id="shirts" className="container" style={s.section}>
        <span className="eyebrow">The Canvas</span>
        <h2 style={s.h2}>Pick a blank, make it yours.</h2>
        <p style={s.sectionSub}>
          Every color below is in stock right now — S to XXL. Your design
          goes on top; we take care of the DTF print and delivery.
        </p>

        {products.length === 0 ? (
          <p style={{ color: "var(--text-mute)", marginTop: 24 }}>Loading the rack…</p>
        ) : (
          <div className="grid-auto" style={{ marginTop: 28 }}>
            {products.map((p) => (
              <div key={p._id} className="card" style={s.shirtCard} onClick={() => router.push(user ? "/checkout" : "/login")}>
                <div style={{ ...s.shirtSwatch, background: p.colorHex }}>
                  <img src={p.imageUrl} alt={p.colorName} style={s.shirtImg} loading="lazy" />
                </div>
                <div style={s.shirtInfo}>
                  <span style={{ ...s.colorDot, background: p.colorHex }} />
                  <div>
                    <div style={s.shirtColorName}>{p.colorName}</div>
                    <div style={s.shirtMeta}>S–XXL · from ৳{p.basePrice || basePrice}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="container" style={s.section}>
        <span className="eyebrow">The Process</span>
        <h2 style={s.h2}>From upload to doorstep — 4 steps.</h2>
        <div className="grid-auto" style={{ marginTop: 32 }}>
          {STEPS.map((st, i) => (
            <div key={st.title} style={s.step}>
              <div style={s.stepNum}>{String(i + 1).padStart(2, "0")}</div>
              <div style={s.stepTitle}>{st.title}</div>
              <div style={s.stepDesc}>{st.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="container" style={s.section}>
        <span className="eyebrow">Pricing</span>
        <h2 style={s.h2}>Simple, transparent, per print.</h2>
        <div className="grid-auto" style={{ marginTop: 28 }}>
          {PRICING.map((c) => (
            <div key={c.label} className="card" style={s.priceCard}>
              <div style={s.priceValue}>{c.price}</div>
              <div style={s.priceLabel}>{c.label}</div>
              <div style={s.priceDesc}>{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MY ORDERS ── */}
      {user && (
        <section className="container" style={s.section}>
          <span className="eyebrow">Your Account</span>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12 }}>
            <h2 style={s.h2}>My Orders</h2>
            {orders.length > 0 && (
              <button className="btn btn-ghost" onClick={() => router.push("/dashboard")}>View full order history →</button>
            )}
          </div>
          <div className="card" style={{ marginTop: 24, padding: 8 }}>
            {loadingOrders ? (
              <p style={{ color: "var(--text-mute)", padding: 20 }}>Loading…</p>
            ) : orders.length === 0 ? (
              <p style={{ color: "var(--text-mute)", padding: 20 }}>
                No orders yet.{" "}
                <span style={{ color: "var(--brand)", cursor: "pointer" }} onClick={() => router.push("/checkout")}>
                  Place your first order →
                </span>
              </p>
            ) : (
              orders.slice(0, 3).map((o) => (
                <div key={o._id} style={s.orderRow}>
                  <span style={{ color: "var(--brand)", fontWeight: 700 }}>{o.orderNumber}</span>
                  <span style={badge(o.status)}>{o.status.replace(/_/g, " ")}</span>
                  <span style={{ color: "var(--text-dim)" }}>৳{o.pricing.total}</span>
                  <span style={{ color: "var(--text-mute)", fontSize: 12 }}>{new Date(o.createdAt).toLocaleDateString()}</span>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      <Footer />
      <SocialChat />
    </div>
  );
}

const Stat = ({ value, label }) => (
  <div style={s.stat}>
    <div style={s.statValue}>{value}</div>
    <div style={s.statLabel}>{label}</div>
  </div>
);

const VALUES = [
  { icon: "🎨", title: "True to your art", desc: "Full-colour DTF prints hold detail and vibrancy that vinyl and screen printing can't match." },
  { icon: "🧵", title: "Premium blanks", desc: "Heavyweight cotton tees in 8+ colors, sized S to XXL, always in stock." },
  { icon: "🛵", title: "Bangladesh-wide delivery", desc: "৳80 inside Dhaka, ৳120 outside — tracked and reliable." },
  { icon: "💳", title: "Low-risk checkout", desc: "Just ৳100 advance via bKash/Rocket locks your order. Pay the rest on delivery." },
];

const STEPS = [
  { title: "Pick a blank", desc: "Choose your shirt color and size from the rack." },
  { title: "Upload your design", desc: "Drop your artwork onto front, back, or sleeve — pick a size tier for each." },
  { title: "Pay ৳100 advance", desc: "Send it via bKash or Rocket and submit your transaction ID." },
  { title: "We print & deliver", desc: "Once verified, your order is DTF-printed and shipped. Pay the rest on delivery." },
];

const PRICING = [
  { price: "৳600", label: "Base Shirt", desc: "Premium blank tee, any color" },
  { price: "৳50–180", label: "Per Print", desc: "By location (front/back/sleeve) and size" },
  { price: "৳80 / ৳120", label: "Delivery", desc: "Inside Dhaka / outside Dhaka" },
  { price: "৳100", label: "Advance", desc: "Non-refundable, unless we cancel your order" },
];

const badge = (st) => {
  const map = {
    pending_payment: "var(--brand)",
    payment_submitted: "var(--warn)",
    confirmed: "var(--ok)",
    shipped: "var(--info)",
    delivered: "var(--text-mute)",
    rejected: "var(--danger)",
    cancelled: "var(--danger)",
  };
  return { color: map[st] || "var(--text-dim)", fontWeight: 600, fontSize: 12, textTransform: "capitalize" };
};

const s = {
  wrap: { minHeight: "100vh" },
  hero: { borderBottom: "1px solid var(--border)", background: "radial-gradient(circle at 50% 0%, rgba(232,197,71,.08), transparent 60%)" },
  heroInner: { padding: "88px 24px 64px", textAlign: "center", maxWidth: 780, margin: "0 auto" },
  heroTitle: { fontFamily: "var(--font-display)", color: "var(--text)", fontSize: "clamp(34px, 6vw, 56px)", lineHeight: 1.1, fontWeight: 700, margin: "20px 0" },
  heroGold: { color: "var(--brand)" },
  heroSub: { color: "var(--text-dim)", fontSize: 16, lineHeight: 1.6, maxWidth: 560, margin: "0 auto 32px" },
  heroBtns: { display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" },
  heroStats: { display: "flex", gap: 40, justifyContent: "center", marginTop: 56, flexWrap: "wrap" },
  stat: { textAlign: "center" },
  statValue: { fontFamily: "var(--font-display)", color: "var(--brand)", fontSize: 26, fontWeight: 700 },
  statLabel: { color: "var(--text-mute)", fontSize: 12, marginTop: 4, maxWidth: 140 },

  section: { padding: "72px 24px" },
  h2: { fontFamily: "var(--font-display)", color: "var(--text)", fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, marginTop: 10, maxWidth: 640 },
  sectionSub: { color: "var(--text-mute)", fontSize: 14, marginTop: 12, maxWidth: 560 },

  valueCard: { padding: 24 },
  valueIcon: { fontSize: 28, marginBottom: 14 },
  valueTitle: { color: "var(--text)", fontWeight: 700, fontSize: 15, marginBottom: 8 },
  valueDesc: { color: "var(--text-mute)", fontSize: 13, lineHeight: 1.6 },

  shirtCard: { overflow: "hidden", cursor: "pointer", transition: "transform .15s ease" },
  shirtSwatch: { aspectRatio: "4 / 5", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  shirtImg: { width: "100%", height: "100%", objectFit: "cover" },
  shirtInfo: { display: "flex", alignItems: "center", gap: 10, padding: 16 },
  colorDot: { width: 14, height: 14, borderRadius: "50%", border: "2px solid var(--border-2)", flexShrink: 0 },
  shirtColorName: { color: "var(--text)", fontWeight: 700, fontSize: 14 },
  shirtMeta: { color: "var(--text-mute)", fontSize: 12, marginTop: 2 },

  step: { padding: "0 4px" },
  stepNum: { fontFamily: "var(--font-display)", color: "var(--brand)", fontSize: 28, fontWeight: 700, opacity: .7 },
  stepTitle: { color: "var(--text)", fontWeight: 700, fontSize: 15, margin: "10px 0 8px" },
  stepDesc: { color: "var(--text-mute)", fontSize: 13, lineHeight: 1.6 },

  priceCard: { padding: 22, textAlign: "center" },
  priceValue: { fontFamily: "var(--font-display)", color: "var(--brand)", fontSize: 24, fontWeight: 700 },
  priceLabel: { color: "var(--text)", fontWeight: 700, fontSize: 13, margin: "8px 0 4px" },
  priceDesc: { color: "var(--text-mute)", fontSize: 12 },

  orderRow: { display: "flex", gap: 16, alignItems: "center", padding: "16px 20px", borderBottom: "1px solid var(--border)", flexWrap: "wrap" },
};
