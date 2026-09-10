"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../lib/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TshirtPreview from "../../components/TshirtPreview";

const MAX_UPLOAD_MB = 8;

const DELIVERY = { dhaka: 80, outside: 120 };
const ADVANCE = 100;

// Mirrors backend/utils/delivery.js — keep these two in sync.
const PRINT_PRICES = {
  front: { small: 80, medium: 130, large: 180 },
  back: { small: 80, medium: 130, large: 180 },
  sleeve: { small: 50, medium: 80, large: 110 },
};
const LOCATIONS = ["front", "back", "sleeve"];
const SIZES = ["small", "medium", "large"];

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState("design"); // design → shipping → payment → done
  const [products, setProducts] = useState([]);
  const [basePrice, setBasePrice] = useState(600);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // ── shirt configuration ──
  const [productId, setProductId] = useState(null);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [prints, setPrints] = useState({}); // { front: { size: "medium", designUrl: "" }, ... }

  const [shipping, setShipping] = useState({ name: "", phone: "", address: "", area: "dhaka", city: "", notes: "" });
  const [order, setOrder] = useState(null);
  const [pay, setPay] = useState({ method: "bkash", transactionId: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.products()
      .then(({ products, basePrice }) => {
        setProducts(products);
        if (basePrice) setBasePrice(basePrice);
        if (products[0]) setProductId(products[0]._id);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoadingProducts(false));
  }, []);

  const product = products.find((p) => p._id === productId);
  const activePrints = Object.entries(prints).filter(([, p]) => p.enabled);
  const printTotal = activePrints.reduce((sum, [loc, p]) => sum + (PRINT_PRICES[loc]?.[p.size] || 0), 0);
  const unitPrice = (product?.basePrice || basePrice) + printTotal;
  const subtotal = unitPrice * qty;
  const deliveryCharge = DELIVERY[shipping.area];
  const total = subtotal + deliveryCharge;
  const codBalance = Math.max(total - ADVANCE, 0);

  const togglePrint = (loc) => {
    setPrints((prev) => {
      const cur = prev[loc];
      if (cur?.enabled) {
        const { [loc]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [loc]: { enabled: true, size: "medium", designUrl: "", previewUrl: "", uploading: false, error: "" } };
    });
  };
  const updatePrint = (loc, patch) => setPrints((prev) => ({ ...prev, [loc]: { ...prev[loc], ...patch } }));

  const handleFileSelect = async (loc, file) => {
    if (!file) return;
    if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
      updatePrint(loc, { error: `File is too big — max ${MAX_UPLOAD_MB}MB` });
      return;
    }
    // Show it instantly while the real upload happens in the background.
    const localPreview = URL.createObjectURL(file);
    updatePrint(loc, { previewUrl: localPreview, designUrl: "", uploading: true, error: "" });
    try {
      const { url } = await api.uploadDesign(file);
      updatePrint(loc, { designUrl: url, uploading: false });
    } catch (e) {
      updatePrint(loc, { uploading: false, error: e.message || "Upload failed" });
    }
  };

  const canContinueDesign =
    product && size && qty >= 1 && activePrints.length > 0 &&
    activePrints.every(([, p]) => !p.uploading && p.designUrl);

  const placeOrder = async () => {
    setError(""); setLoading(true);
    try {
      const items = [
        {
          color: product.colorHex,
          colorName: product.colorName,
          size,
          qty,
          prints: activePrints.map(([location, p]) => ({ location, size: p.size, designUrl: p.designUrl.trim() })),
        },
      ];
      const { order } = await api.createOrder({ items, shipping });
      setOrder(order);
      setStep("payment");
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  };

  const submitTxn = async () => {
    setError(""); setLoading(true);
    try {
      await api.submitTransaction(order._id, pay);
      setStep("done");
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  };

  return (
    <div>
      <Navbar />
      <div style={s.wrap}>
        <div style={s.container}>
          <h1 style={s.h1}>Design your shirt</h1>

          {/* Step indicator */}
          <div style={s.steps}>
            {["Shirt & Design", "Shipping", "Advance Payment", "Done"].map((label, i) => {
              const active = ["design", "shipping", "payment", "done"].indexOf(step) >= i;
              return (
                <div key={label} style={{ ...s.stepDot, color: active ? "var(--brand)" : "#555" }}>
                  <span style={{ ...s.stepNumBadge, borderColor: active ? "var(--brand)" : "#444", color: active ? "var(--brand)" : "#555" }}>{i + 1}</span>
                  <span className="hide-mobile">{label}</span>
                </div>
              );
            })}
          </div>

          {error && <div style={s.error}>{error}</div>}

          {/* ── STEP 1: SHIRT & DESIGN ── */}
          {step === "design" && (
            <div className="checkout-grid" style={s.designGrid}>
            <div className="card" style={s.panel}>
              <label style={s.label}>1. Pick a blank shirt color</label>
              {loadingProducts ? (
                <p style={{ color: "var(--text-mute)" }}>Loading shirts…</p>
              ) : (
                <div style={s.colorRow}>
                  {products.map((p) => (
                    <div key={p._id} onClick={() => { setProductId(p._id); setSize(""); }}
                      style={{ ...s.colorSwatch, borderColor: productId === p._id ? "var(--brand)" : "var(--border-2)" }}>
                      <span style={{ ...s.colorDot, background: p.colorHex }} />
                      {p.colorName}
                    </div>
                  ))}
                </div>
              )}

              {product && (
                <>
                  <label style={s.label}>2. Size</label>
                  <div style={s.sizeRow}>
                    {product.sizes.map((sz) => (
                      <button key={sz.size} disabled={sz.stock === 0} onClick={() => setSize(sz.size)}
                        style={{ ...s.sizeBtn, ...(size === sz.size ? s.sizeBtnActive : {}), opacity: sz.stock === 0 ? 0.35 : 1 }}>
                        {sz.size}
                      </button>
                    ))}
                  </div>

                  <label style={s.label}>3. Quantity</label>
                  <div style={s.qtyRow}>
                    <button style={s.qtyBtn} onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                    <span style={s.qtyVal}>{qty}</span>
                    <button style={s.qtyBtn} onClick={() => setQty((q) => q + 1)}>+</button>
                  </div>

                  <label style={s.label}>4. Where do you want your design printed?</label>
                  {LOCATIONS.map((loc) => {
                    const p = prints[loc];
                    return (
                      <div key={loc} style={s.printBlock}>
                        <div style={s.printHead} onClick={() => togglePrint(loc)}>
                          <span style={{ ...s.checkbox, ...(p?.enabled ? s.checkboxOn : {}) }}>{p?.enabled ? "✓" : ""}</span>
                          <span style={{ color: p?.enabled ? "var(--text)" : "var(--text-dim)", fontWeight: 700, textTransform: "capitalize" }}>{loc} print</span>
                        </div>
                        {p?.enabled && (
                          <div style={s.printBody}>
                            <div style={s.tierRow}>
                              {SIZES.map((sz) => (
                                <button key={sz} onClick={() => updatePrint(loc, { size: sz })}
                                  style={{ ...s.tierBtn, ...(p.size === sz ? s.tierBtnActive : {}) }}>
                                  {sz} · ৳{PRINT_PRICES[loc][sz]}
                                </button>
                              ))}
                            </div>

                            <label style={s.uploadBox}>
                              <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" style={{ display: "none" }}
                                onChange={(e) => handleFileSelect(loc, e.target.files?.[0])} />
                              {p.previewUrl ? (
                                <img src={p.previewUrl} alt={`${loc} design`} style={s.uploadThumb} />
                              ) : (
                                <span style={s.uploadIcon}>⬆</span>
                              )}
                              <span style={s.uploadText}>
                                {p.uploading ? "Uploading…" : p.designUrl ? "Uploaded ✓ — click to replace" : "Click to upload your design"}
                              </span>
                            </label>
                            {p.error && <div style={s.uploadError}>{p.error}</div>}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <div style={s.summary}>
                    <div style={s.sumRow}><span>Base shirt</span><span>৳{product.basePrice || basePrice}</span></div>
                    {activePrints.map(([loc, p]) => (
                      <div key={loc} style={s.sumRow}><span style={{ textTransform: "capitalize" }}>{loc} print ({p.size})</span><span>৳{PRINT_PRICES[loc][p.size]}</span></div>
                    ))}
                    <div style={{ ...s.sumRow, color: "#fff", fontWeight: 700, borderTop: "1px solid var(--border-2)", paddingTop: 10 }}>
                      <span>Unit price × {qty}</span><span>৳{subtotal}</span>
                    </div>
                  </div>

                  <button className="btn btn-primary" style={{ width: "100%" }} disabled={!canContinueDesign} onClick={() => setStep("shipping")}>
                    Continue to shipping
                  </button>
                </>
              )}
            </div>

            {product && (
              <div style={s.previewCol}>
                <TshirtPreview colorHex={product.colorHex} colorName={product.colorName} prints={prints} />
                <p style={s.previewNote}>Preview only — placement &amp; scale are approximate.</p>
              </div>
            )}
            </div>
          )}

          {/* ── STEP 2: SHIPPING ── */}
          {step === "shipping" && (
            <div className="card" style={{ ...s.panel, ...s.narrow }}>
              <input style={s.input} placeholder="Full name" value={shipping.name}
                onChange={(e) => setShipping({ ...shipping, name: e.target.value })} />
              <input style={s.input} placeholder="Phone (e.g. 01XXXXXXXXX)" value={shipping.phone}
                onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} />
              <textarea style={{ ...s.input, minHeight: 70 }} placeholder="Full delivery address" value={shipping.address}
                onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
              <input style={s.input} placeholder="City / District" value={shipping.city}
                onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />

              <label style={s.label}>Delivery area</label>
              <div style={s.areaRow}>
                {[["dhaka", "Inside Dhaka", DELIVERY.dhaka], ["outside", "Outside Dhaka", DELIVERY.outside]].map(([val, label, charge]) => (
                  <div key={val} onClick={() => setShipping({ ...shipping, area: val })}
                    style={{ ...s.areaCard, borderColor: shipping.area === val ? "var(--brand)" : "var(--border-2)", background: shipping.area === val ? "var(--brand-soft)" : "var(--surface-2)" }}>
                    <div style={{ fontWeight: 700, color: shipping.area === val ? "var(--brand)" : "#ccc" }}>{label}</div>
                    <div style={{ color: "var(--text-mute)", fontSize: 13, marginTop: 4 }}>৳{charge} delivery</div>
                  </div>
                ))}
              </div>

              <div style={s.summary}>
                <div style={s.sumRow}><span>Subtotal</span><span>৳{subtotal}</span></div>
                <div style={s.sumRow}><span>Delivery ({shipping.area === "dhaka" ? "Dhaka" : "Outside Dhaka"})</span><span>৳{deliveryCharge}</span></div>
                <div style={{ ...s.sumRow, color: "#fff", fontWeight: 700, borderTop: "1px solid var(--border-2)", paddingTop: 10 }}><span>Total</span><span>৳{total}</span></div>
                <div style={{ ...s.sumRow, color: "var(--brand)" }}><span>Advance (now, non-refundable unless cancelled)</span><span>৳{ADVANCE}</span></div>
                <div style={{ ...s.sumRow, color: "#fff", fontWeight: 700 }}><span>Cash on delivery</span><span>৳{codBalance}</span></div>
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn btn-ghost" onClick={() => setStep("design")}>Back</button>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={placeOrder}
                  disabled={loading || !shipping.name || !shipping.phone || !shipping.address}>
                  {loading ? "Placing order…" : "Continue to payment"}
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: ADVANCE PAYMENT ── */}
          {step === "payment" && order && (
            <div className="card" style={{ ...s.panel, ...s.narrow }}>
              <div style={s.orderTag}>Order #{order.orderNumber}</div>

              <h3 style={{ color: "#fff", margin: "0 0 8px" }}>Pay ৳{ADVANCE} advance</h3>
              <p style={{ color: "var(--text-mute)", fontSize: 13, margin: "0 0 16px" }}>
                Send ৳{ADVANCE} via <b>Send Money</b> to the number below, then enter your Transaction ID.
                The remaining <b style={{ color: "var(--brand)" }}>৳{codBalance}</b> is Cash on Delivery.
                The advance is non-refundable, except if we cancel your order — then it's returned.
              </p>

              <div style={s.methodRow}>
                {[["bkash", "bKash", "#E2136E", process.env.NEXT_PUBLIC_BKASH || "01XXXXXXXXX"],
                  ["rocket", "Rocket", "#8C3494", process.env.NEXT_PUBLIC_ROCKET || "01XXXXXXXXX"]].map(([val, label, color, number]) => (
                  <div key={val} onClick={() => setPay({ ...pay, method: val })}
                    style={{ ...s.methodCard, borderColor: pay.method === val ? color : "var(--border-2)" }}>
                    <div style={{ fontWeight: 800, color }}>{label}</div>
                    <div style={{ color: "#bbb", fontSize: 14, marginTop: 4, letterSpacing: 1 }}>{number}</div>
                  </div>
                ))}
              </div>

              <input style={s.input} placeholder="Enter bKash/Rocket Transaction ID" value={pay.transactionId}
                onChange={(e) => setPay({ ...pay, transactionId: e.target.value })} />

              <button className="btn btn-primary" style={{ width: "100%" }} onClick={submitTxn} disabled={loading || pay.transactionId.length < 4}>
                {loading ? "Submitting…" : "Submit Transaction ID"}
              </button>
            </div>
          )}

          {/* ── STEP 4: DONE ── */}
          {step === "done" && (
            <div className="card" style={{ ...s.panel, ...s.narrow, textAlign: "center", padding: "48px 32px" }}>
              <div style={{ fontSize: 48 }}>✅</div>
              <h2 style={{ color: "#fff", margin: "16px 0 8px" }}>Order submitted!</h2>
              <p style={{ color: "var(--text-mute)", fontSize: 14, lineHeight: 1.6 }}>
                We've received your advance payment details for <b style={{ color: "var(--brand)" }}>{order.orderNumber}</b>.
                Our team will verify it and email you a confirmation. The balance is payable on delivery.
              </p>
              <button className="btn btn-ghost" style={{ marginTop: 20 }} onClick={() => router.push("/")}>Back to home</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

const s = {
  wrap: { minHeight: "80vh", padding: "40px 20px" },
  container: { maxWidth: 880, margin: "0 auto" },
  narrow: { maxWidth: 560, margin: "0 auto" },
  designGrid: { display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 24, alignItems: "start" },
  previewCol: { position: "sticky", top: 88 },
  previewNote: { color: "var(--text-mute)", fontSize: 11, textAlign: "center", marginTop: 10 },
  h1: { fontFamily: "var(--font-display)", color: "#fff", fontSize: 28, marginBottom: 24 },
  steps: { display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" },
  stepDot: { display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600 },
  // borderWidth/Style (no `border` shorthand) — borderColor is always set
  // dynamically at the call site; mixing shorthand + longhand across renders
  // makes React warn and can leave a stale border on toggle.
  stepNumBadge: { width: 26, height: 26, borderRadius: "50%", borderWidth: 2, borderStyle: "solid", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 },
  panel: { padding: 28 },
  label: { color: "var(--text-dim)", fontSize: 13, fontWeight: 700, display: "block", margin: "18px 0 10px" },
  input: { width: "100%", padding: "13px 14px", marginBottom: 12, background: "var(--surface-2)", border: "1px solid var(--border-2)", borderRadius: 10, color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" },
  colorRow: { display: "flex", gap: 10, flexWrap: "wrap" },
  colorSwatch: { display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 10, borderWidth: 2, borderStyle: "solid", cursor: "pointer", fontSize: 13, color: "#ddd" },
  colorDot: { width: 14, height: 14, borderRadius: "50%", border: "1px solid var(--border-2)" },
  sizeRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  sizeBtn: { width: 48, height: 40, borderRadius: 8, borderWidth: 1, borderStyle: "solid", borderColor: "var(--border-2)", background: "var(--surface-2)", color: "#ccc", cursor: "pointer", fontWeight: 700, fontSize: 13 },
  sizeBtnActive: { borderColor: "var(--brand)", color: "var(--brand)", background: "var(--brand-soft)" },
  qtyRow: { display: "flex", alignItems: "center", gap: 16 },
  qtyBtn: { width: 36, height: 36, borderRadius: 8, border: "1px solid var(--border-2)", background: "var(--surface-2)", color: "#fff", fontSize: 18, cursor: "pointer" },
  qtyVal: { color: "#fff", fontWeight: 700, fontSize: 16, minWidth: 20, textAlign: "center" },
  printBlock: { border: "1px solid var(--border)", borderRadius: 10, marginTop: 10, overflow: "hidden" },
  printHead: { display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", cursor: "pointer" },
  checkbox: { width: 18, height: 18, borderRadius: 5, borderWidth: 1, borderStyle: "solid", borderColor: "var(--border-2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#000", flexShrink: 0 },
  checkboxOn: { background: "var(--brand)", borderColor: "var(--brand)" },
  printBody: { padding: "0 14px 14px" },
  tierRow: { display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" },
  tierBtn: { padding: "8px 12px", borderRadius: 8, borderWidth: 1, borderStyle: "solid", borderColor: "var(--border-2)", background: "var(--surface-2)", color: "#ccc", cursor: "pointer", fontSize: 12, textTransform: "capitalize" },
  tierBtnActive: { borderColor: "var(--brand)", color: "var(--brand)", background: "var(--brand-soft)" },
  uploadBox: { display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: "1px dashed var(--border-2)", borderRadius: 10, cursor: "pointer", background: "var(--surface-2)" },
  uploadThumb: { width: 40, height: 40, borderRadius: 6, objectFit: "cover", flexShrink: 0 },
  uploadIcon: { width: 40, height: 40, borderRadius: 6, background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-mute)", fontSize: 16, flexShrink: 0 },
  uploadText: { color: "var(--text-dim)", fontSize: 13 },
  uploadError: { color: "var(--danger)", fontSize: 12, marginTop: 6 },
  areaRow: { display: "flex", gap: 12, marginBottom: 16 },
  areaCard: { flex: 1, padding: 16, borderRadius: 12, borderWidth: 2, borderStyle: "solid", cursor: "pointer" },
  summary: { background: "var(--surface-2)", borderRadius: 12, padding: 16, margin: "20px 0", display: "flex", flexDirection: "column", gap: 8 },
  sumRow: { display: "flex", justifyContent: "space-between", color: "#aaa", fontSize: 14 },
  error: { color: "var(--danger)", fontSize: 13, marginBottom: 16, background: "rgba(255,80,80,0.1)", padding: "10px 14px", borderRadius: 8 },
  orderTag: { color: "var(--brand)", fontWeight: 700, marginBottom: 16, fontSize: 14 },
  methodRow: { display: "flex", gap: 12, marginBottom: 16 },
  methodCard: { flex: 1, padding: 16, borderRadius: 12, borderWidth: 2, borderStyle: "solid", cursor: "pointer", textAlign: "center" },
};
