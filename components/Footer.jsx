export default function Footer() {
  return (
    <footer style={s.footer}>
      <div className="container grid-3" style={{ marginBottom: 40 }}>
        <div>
          <div style={s.brand}>
            <span style={{ color: "var(--brand)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18 }}>INKDROP</span>
            <span style={{ color: "var(--text-mute)", fontSize: 10, letterSpacing: 3, marginLeft: 6 }}>STUDIO</span>
          </div>
          <p style={s.blurb}>
            Premium DTF-printed T-shirts, designed by you. Every shirt is
            printed to order — no minimums, no stock rooms, just your art on
            quality cotton, delivered anywhere in Bangladesh.
          </p>
        </div>

        <div>
          <div style={s.heading}>How it works</div>
          <ul style={s.list}>
            <li>1. Pick a blank shirt &amp; upload your design</li>
            <li>2. Choose print size &amp; placement</li>
            <li>3. Pay ৳100 advance via bKash/Rocket</li>
            <li>4. Rest is Cash on Delivery</li>
          </ul>
        </div>

        <div>
          <div style={s.heading}>Get in touch</div>
          <ul style={s.list}>
            <li>Facebook &amp; Instagram — @inkdropstudio</li>
            <li>Delivery: ৳80 inside Dhaka · ৳120 outside</li>
            <li>Reply to any order email — a human reads it</li>
          </ul>
        </div>
      </div>

      <div className="container" style={s.bottom}>
        <span>© {new Date().getFullYear()} INKDROP STUDIO. All rights reserved.</span>
        <span style={{ color: "var(--brand)" }}>Printed on demand in Bangladesh 🇧🇩</span>
      </div>
    </footer>
  );
}

const s = {
  footer: { borderTop: "1px solid var(--border)", marginTop: 80, padding: "56px 0 28px" },
  brand: { marginBottom: 14 },
  blurb: { color: "var(--text-mute)", fontSize: 13, lineHeight: 1.7, maxWidth: 320 },
  heading: { color: "var(--text)", fontWeight: 700, fontSize: 13, marginBottom: 14, letterSpacing: .5 },
  list: { display: "flex", flexDirection: "column", gap: 10, listStyle: "none", color: "var(--text-mute)", fontSize: 13, lineHeight: 1.6 },
  bottom: { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, paddingTop: 24, borderTop: "1px solid var(--border)", color: "var(--text-mute)", fontSize: 12 },
};
