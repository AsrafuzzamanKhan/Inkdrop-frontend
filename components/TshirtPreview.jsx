"use client";
import { useState } from "react";

// A stylised t-shirt silhouette, recolored live to the chosen blank, with
// the uploaded design(s) composited on top at roughly the right spot.
// It's an approximation for feel/placement — not a print-ready mockup.

const PRINT_BOX = {
  small: 58,
  medium: 88,
  large: 122,
};

// Center points on the 300×340 viewBox, per print location.
const CENTER = {
  front: { x: 150, y: 195 },
  back: { x: 150, y: 195 },
  sleeve: { x: 219, y: 58 },
};
const SLEEVE_SCALE = 0.45;

export default function TshirtPreview({ colorHex, colorName, prints }) {
  const hasBack = !!prints.back;
  const [view, setView] = useState("front");
  const activeView = view === "back" && hasBack ? "back" : "front";
  const mainPrint = prints[activeView];
  const sleevePrint = prints.sleeve;

  return (
    <div style={s.wrap}>
      <div style={s.tabs}>
        <button type="button" style={{ ...s.tab, ...(activeView === "front" ? s.tabActive : {}) }} onClick={() => setView("front")}>
          Front
        </button>
        <button type="button" style={{ ...s.tab, ...(activeView === "back" ? s.tabActive : {}) }} disabled={!hasBack} onClick={() => setView("back")}>
          Back{!hasBack && " (no print)"}
        </button>
      </div>

      <svg viewBox="0 0 300 340" style={s.svg}>
        <TeeShape color={colorHex} back={activeView === "back"} />
        {mainPrint?.designUrl && <PrintOverlay href={mainPrint.designUrl} size={mainPrint.size} center={CENTER[activeView]} />}
        {sleevePrint?.designUrl && <PrintOverlay href={sleevePrint.designUrl} size={sleevePrint.size} center={CENTER.sleeve} scale={SLEEVE_SCALE} />}
      </svg>

      <div style={s.caption}>{colorName} · {activeView} view</div>
    </div>
  );
}

function PrintOverlay({ href, size, center, scale = 1 }) {
  const box = PRINT_BOX[size] || PRINT_BOX.medium;
  const w = box * scale;
  const h = box * scale;
  const x = center.x - w / 2;
  const y = center.y - h / 2;
  const clipId = `clip-${Math.round(x)}-${Math.round(y)}-${Math.round(w)}`;

  return (
    <>
      <clipPath id={clipId}>
        <rect x={x} y={y} width={w} height={h} rx={5} />
      </clipPath>
      <image href={href} x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice" clipPath={`url(#${clipId})`} />
      <rect x={x} y={y} width={w} height={h} rx={5} fill="none" stroke="rgba(0,0,0,.3)" strokeWidth="1" />
    </>
  );
}

// A clean, iconic tee outline traced clockwise from the left of the
// neckline: neckline dip → shoulder → sleeve (a distinct flap: cap, cuff,
// then a sharp cut back in at the underarm) → straight down the body →
// rounded hem → mirrored back up the left side → close.
const TEE_PATH =
  "M132,24 Q150,46 168,24 L204,14 L254,44 L240,92 L196,108 " +
  "L196,320 Q196,328 188,328 L112,328 Q104,328 104,320 " +
  "L104,108 L60,92 L46,44 L96,14 Z";

// Same silhouette, shallower neckline (a tee's back sits higher than the front).
const TEE_PATH_BACK =
  "M132,24 Q150,30 168,24 L204,14 L254,44 L240,92 L196,108 " +
  "L196,320 Q196,328 188,328 L112,328 Q104,328 104,320 " +
  "L104,108 L60,92 L46,44 L96,14 Z";

function TeeShape({ color, back }) {
  const gradId = `sheen-${color.replace("#", "")}`;
  return (
    <g>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="45%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      <path d={back ? TEE_PATH_BACK : TEE_PATH} fill={color} stroke="rgba(0,0,0,.4)" strokeWidth="2.5" strokeLinejoin="round" />
      {/* fabric sheen — subtle light/shadow so it doesn't read as a flat cutout */}
      <path d={back ? TEE_PATH_BACK : TEE_PATH} fill={`url(#${gradId})`} stroke="none" />

      {/* ribbed collar, traced just inside the neckline cut */}
      {!back ? (
        <path d="M132,25 Q150,44 168,25" fill="none" stroke="rgba(0,0,0,.32)" strokeWidth="3.5" strokeLinecap="round" />
      ) : (
        <path d="M132,23 Q150,29 168,23" fill="none" stroke="rgba(0,0,0,.32)" strokeWidth="3.5" strokeLinecap="round" />
      )}

      {/* center fold — a faint hint of fabric, purely decorative */}
      <line x1="150" y1={back ? 27 : 40} x2="150" y2="325" stroke="rgba(0,0,0,.06)" strokeWidth="1.5" />
    </g>
  );
}

const s = {
  wrap: { background: "var(--surface-2)", border: "1px solid var(--border-2)", borderRadius: 14, padding: 16, textAlign: "center" },
  tabs: { display: "flex", gap: 6, justifyContent: "center", marginBottom: 10 },
  // borderWidth/Style/Color (not the `border` shorthand) so the active
  // variant can override just borderColor without React warning about
  // mixing shorthand and longhand border properties between renders.
  tab: { padding: "6px 14px", borderRadius: 20, borderWidth: 1, borderStyle: "solid", borderColor: "var(--border-2)", background: "transparent", color: "var(--text-mute)", fontSize: 12, fontWeight: 600, cursor: "pointer" },
  tabActive: { borderColor: "var(--brand)", color: "var(--brand)", background: "var(--brand-soft)" },
  svg: { width: "100%", maxWidth: 220, height: "auto", margin: "0 auto", display: "block" },
  caption: { color: "var(--text-mute)", fontSize: 12, marginTop: 10, textTransform: "capitalize" },
};
