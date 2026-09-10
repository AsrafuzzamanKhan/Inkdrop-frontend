(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/checkout/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CheckoutPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Navbar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Navbar.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Footer.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TshirtPreview$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/TshirtPreview.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const MAX_UPLOAD_MB = 8;
const DELIVERY = {
    dhaka: 80,
    outside: 120
};
const ADVANCE = 100;
// Mirrors backend/utils/delivery.js — keep these two in sync.
const PRINT_PRICES = {
    front: {
        small: 80,
        medium: 130,
        large: 180
    },
    back: {
        small: 80,
        medium: 130,
        large: 180
    },
    sleeve: {
        small: 50,
        medium: 80,
        large: 110
    }
};
const LOCATIONS = [
    "front",
    "back",
    "sleeve"
];
const SIZES = [
    "small",
    "medium",
    "large"
];
function CheckoutPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("design"); // design → shipping → payment → done
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [basePrice, setBasePrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(600);
    const [loadingProducts, setLoadingProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // ── shirt configuration ──
    const [productId, setProductId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [size, setSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [qty, setQty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [prints, setPrints] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({}); // { front: { size: "medium", designUrl: "" }, ... }
    const [shipping, setShipping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        phone: "",
        address: "",
        area: "dhaka",
        city: "",
        notes: ""
    });
    const [order, setOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pay, setPay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        method: "bkash",
        transactionId: ""
    });
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutPage.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].products().then({
                "CheckoutPage.useEffect": ({ products, basePrice })=>{
                    setProducts(products);
                    if (basePrice) setBasePrice(basePrice);
                    if (products[0]) setProductId(products[0]._id);
                }
            }["CheckoutPage.useEffect"]).catch({
                "CheckoutPage.useEffect": (e)=>setError(e.message)
            }["CheckoutPage.useEffect"]).finally({
                "CheckoutPage.useEffect": ()=>setLoadingProducts(false)
            }["CheckoutPage.useEffect"]);
        }
    }["CheckoutPage.useEffect"], []);
    const product = products.find((p)=>p._id === productId);
    const activePrints = Object.entries(prints).filter(([, p])=>p.enabled);
    const printTotal = activePrints.reduce((sum, [loc, p])=>sum + (PRINT_PRICES[loc]?.[p.size] || 0), 0);
    const unitPrice = (product?.basePrice || basePrice) + printTotal;
    const subtotal = unitPrice * qty;
    const deliveryCharge = DELIVERY[shipping.area];
    const total = subtotal + deliveryCharge;
    const codBalance = Math.max(total - ADVANCE, 0);
    const togglePrint = (loc)=>{
        setPrints((prev)=>{
            const cur = prev[loc];
            if (cur?.enabled) {
                const { [loc]: _, ...rest } = prev;
                return rest;
            }
            return {
                ...prev,
                [loc]: {
                    enabled: true,
                    size: "medium",
                    designUrl: "",
                    previewUrl: "",
                    uploading: false,
                    error: ""
                }
            };
        });
    };
    const updatePrint = (loc, patch)=>setPrints((prev)=>({
                ...prev,
                [loc]: {
                    ...prev[loc],
                    ...patch
                }
            }));
    const handleFileSelect = async (loc, file)=>{
        if (!file) return;
        if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
            updatePrint(loc, {
                error: `File is too big — max ${MAX_UPLOAD_MB}MB`
            });
            return;
        }
        // Show it instantly while the real upload happens in the background.
        const localPreview = URL.createObjectURL(file);
        updatePrint(loc, {
            previewUrl: localPreview,
            designUrl: "",
            uploading: true,
            error: ""
        });
        try {
            const { url } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].uploadDesign(file);
            updatePrint(loc, {
                designUrl: url,
                uploading: false
            });
        } catch (e) {
            updatePrint(loc, {
                uploading: false,
                error: e.message || "Upload failed"
            });
        }
    };
    const canContinueDesign = product && size && qty >= 1 && activePrints.length > 0 && activePrints.every(([, p])=>!p.uploading && p.designUrl);
    const placeOrder = async ()=>{
        setError("");
        setLoading(true);
        try {
            const items = [
                {
                    color: product.colorHex,
                    colorName: product.colorName,
                    size,
                    qty,
                    prints: activePrints.map(([location, p])=>({
                            location,
                            size: p.size,
                            designUrl: p.designUrl.trim()
                        }))
                }
            ];
            const { order } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].createOrder({
                items,
                shipping
            });
            setOrder(order);
            setStep("payment");
        } catch (e) {
            setError(e.message);
        } finally{
            setLoading(false);
        }
    };
    const submitTxn = async ()=>{
        setError("");
        setLoading(true);
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].submitTransaction(order._id, pay);
            setStep("done");
        } catch (e) {
            setError(e.message);
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Navbar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/checkout/page.jsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: s.wrap,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: s.container,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: s.h1,
                            children: "Design your shirt"
                        }, void 0, false, {
                            fileName: "[project]/app/checkout/page.jsx",
                            lineNumber: 126,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: s.steps,
                            children: [
                                "Shirt & Design",
                                "Shipping",
                                "Advance Payment",
                                "Done"
                            ].map((label, i)=>{
                                const active = [
                                    "design",
                                    "shipping",
                                    "payment",
                                    "done"
                                ].indexOf(step) >= i;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        ...s.stepDot,
                                        color: active ? "var(--brand)" : "#555"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                ...s.stepNumBadge,
                                                borderColor: active ? "var(--brand)" : "#444",
                                                color: active ? "var(--brand)" : "#555"
                                            },
                                            children: i + 1
                                        }, void 0, false, {
                                            fileName: "[project]/app/checkout/page.jsx",
                                            lineNumber: 134,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hide-mobile",
                                            children: label
                                        }, void 0, false, {
                                            fileName: "[project]/app/checkout/page.jsx",
                                            lineNumber: 135,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, label, true, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 133,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/checkout/page.jsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: s.error,
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/app/checkout/page.jsx",
                            lineNumber: 141,
                            columnNumber: 21
                        }, this),
                        step === "design" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "checkout-grid",
                            style: s.designGrid,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "card",
                                    style: s.panel,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: s.label,
                                            children: "1. Pick a blank shirt color"
                                        }, void 0, false, {
                                            fileName: "[project]/app/checkout/page.jsx",
                                            lineNumber: 147,
                                            columnNumber: 15
                                        }, this),
                                        loadingProducts ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: "var(--text-mute)"
                                            },
                                            children: "Loading shirts…"
                                        }, void 0, false, {
                                            fileName: "[project]/app/checkout/page.jsx",
                                            lineNumber: 149,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: s.colorRow,
                                            children: products.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    onClick: ()=>{
                                                        setProductId(p._id);
                                                        setSize("");
                                                    },
                                                    style: {
                                                        ...s.colorSwatch,
                                                        borderColor: productId === p._id ? "var(--brand)" : "var(--border-2)"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                ...s.colorDot,
                                                                background: p.colorHex
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/checkout/page.jsx",
                                                            lineNumber: 155,
                                                            columnNumber: 23
                                                        }, this),
                                                        p.colorName
                                                    ]
                                                }, p._id, true, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 153,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/checkout/page.jsx",
                                            lineNumber: 151,
                                            columnNumber: 17
                                        }, this),
                                        product && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: s.label,
                                                    children: "2. Size"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 164,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: s.sizeRow,
                                                    children: product.sizes.map((sz)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            disabled: sz.stock === 0,
                                                            onClick: ()=>setSize(sz.size),
                                                            style: {
                                                                ...s.sizeBtn,
                                                                ...size === sz.size ? s.sizeBtnActive : {},
                                                                opacity: sz.stock === 0 ? 0.35 : 1
                                                            },
                                                            children: sz.size
                                                        }, sz.size, false, {
                                                            fileName: "[project]/app/checkout/page.jsx",
                                                            lineNumber: 167,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 165,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: s.label,
                                                    children: "3. Quantity"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 174,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: s.qtyRow,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            style: s.qtyBtn,
                                                            onClick: ()=>setQty((q)=>Math.max(1, q - 1)),
                                                            children: "−"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/checkout/page.jsx",
                                                            lineNumber: 176,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: s.qtyVal,
                                                            children: qty
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/checkout/page.jsx",
                                                            lineNumber: 177,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            style: s.qtyBtn,
                                                            onClick: ()=>setQty((q)=>q + 1),
                                                            children: "+"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/checkout/page.jsx",
                                                            lineNumber: 178,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 175,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: s.label,
                                                    children: "4. Where do you want your design printed?"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 181,
                                                    columnNumber: 19
                                                }, this),
                                                LOCATIONS.map((loc)=>{
                                                    const p = prints[loc];
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: s.printBlock,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: s.printHead,
                                                                onClick: ()=>togglePrint(loc),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            ...s.checkbox,
                                                                            ...p?.enabled ? s.checkboxOn : {}
                                                                        },
                                                                        children: p?.enabled ? "✓" : ""
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/checkout/page.jsx",
                                                                        lineNumber: 187,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            color: p?.enabled ? "var(--text)" : "var(--text-dim)",
                                                                            fontWeight: 700,
                                                                            textTransform: "capitalize"
                                                                        },
                                                                        children: [
                                                                            loc,
                                                                            " print"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/checkout/page.jsx",
                                                                        lineNumber: 188,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/checkout/page.jsx",
                                                                lineNumber: 186,
                                                                columnNumber: 25
                                                            }, this),
                                                            p?.enabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: s.printBody,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: s.tierRow,
                                                                        children: SIZES.map((sz)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>updatePrint(loc, {
                                                                                        size: sz
                                                                                    }),
                                                                                style: {
                                                                                    ...s.tierBtn,
                                                                                    ...p.size === sz ? s.tierBtnActive : {}
                                                                                },
                                                                                children: [
                                                                                    sz,
                                                                                    " · ৳",
                                                                                    PRINT_PRICES[loc][sz]
                                                                                ]
                                                                            }, sz, true, {
                                                                                fileName: "[project]/app/checkout/page.jsx",
                                                                                lineNumber: 194,
                                                                                columnNumber: 33
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/checkout/page.jsx",
                                                                        lineNumber: 192,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                        style: s.uploadBox,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "file",
                                                                                accept: "image/png,image/jpeg,image/webp,image/gif",
                                                                                style: {
                                                                                    display: "none"
                                                                                },
                                                                                onChange: (e)=>handleFileSelect(loc, e.target.files?.[0])
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/checkout/page.jsx",
                                                                                lineNumber: 202,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            p.previewUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                src: p.previewUrl,
                                                                                alt: `${loc} design`,
                                                                                style: s.uploadThumb
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/checkout/page.jsx",
                                                                                lineNumber: 205,
                                                                                columnNumber: 33
                                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                style: s.uploadIcon,
                                                                                children: "⬆"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/checkout/page.jsx",
                                                                                lineNumber: 207,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                style: s.uploadText,
                                                                                children: p.uploading ? "Uploading…" : p.designUrl ? "Uploaded ✓ — click to replace" : "Click to upload your design"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/checkout/page.jsx",
                                                                                lineNumber: 209,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/checkout/page.jsx",
                                                                        lineNumber: 201,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    p.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: s.uploadError,
                                                                        children: p.error
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/checkout/page.jsx",
                                                                        lineNumber: 213,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/checkout/page.jsx",
                                                                lineNumber: 191,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, loc, true, {
                                                        fileName: "[project]/app/checkout/page.jsx",
                                                        lineNumber: 185,
                                                        columnNumber: 23
                                                    }, this);
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: s.summary,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: s.sumRow,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Base shirt"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/checkout/page.jsx",
                                                                    lineNumber: 221,
                                                                    columnNumber: 43
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "৳",
                                                                        product.basePrice || basePrice
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/checkout/page.jsx",
                                                                    lineNumber: 221,
                                                                    columnNumber: 66
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/checkout/page.jsx",
                                                            lineNumber: 221,
                                                            columnNumber: 21
                                                        }, this),
                                                        activePrints.map(([loc, p])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: s.sumRow,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            textTransform: "capitalize"
                                                                        },
                                                                        children: [
                                                                            loc,
                                                                            " print (",
                                                                            p.size,
                                                                            ")"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/checkout/page.jsx",
                                                                        lineNumber: 223,
                                                                        columnNumber: 55
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            "৳",
                                                                            PRINT_PRICES[loc][p.size]
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/checkout/page.jsx",
                                                                        lineNumber: 223,
                                                                        columnNumber: 130
                                                                    }, this)
                                                                ]
                                                            }, loc, true, {
                                                                fileName: "[project]/app/checkout/page.jsx",
                                                                lineNumber: 223,
                                                                columnNumber: 23
                                                            }, this)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                ...s.sumRow,
                                                                color: "#fff",
                                                                fontWeight: 700,
                                                                borderTop: "1px solid var(--border-2)",
                                                                paddingTop: 10
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "Unit price × ",
                                                                        qty
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/checkout/page.jsx",
                                                                    lineNumber: 226,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "৳",
                                                                        subtotal
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/checkout/page.jsx",
                                                                    lineNumber: 226,
                                                                    columnNumber: 54
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/checkout/page.jsx",
                                                            lineNumber: 225,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 220,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "btn btn-primary",
                                                    style: {
                                                        width: "100%"
                                                    },
                                                    disabled: !canContinueDesign,
                                                    onClick: ()=>setStep("shipping"),
                                                    children: "Continue to shipping"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 230,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/checkout/page.jsx",
                                            lineNumber: 163,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, this),
                                product && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: s.previewCol,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TshirtPreview$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            colorHex: product.colorHex,
                                            colorName: product.colorName,
                                            prints: prints
                                        }, void 0, false, {
                                            fileName: "[project]/app/checkout/page.jsx",
                                            lineNumber: 239,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: s.previewNote,
                                            children: "Preview only — placement & scale are approximate."
                                        }, void 0, false, {
                                            fileName: "[project]/app/checkout/page.jsx",
                                            lineNumber: 240,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 238,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/checkout/page.jsx",
                            lineNumber: 145,
                            columnNumber: 13
                        }, this),
                        step === "shipping" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "card",
                            style: {
                                ...s.panel,
                                ...s.narrow
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    style: s.input,
                                    placeholder: "Full name",
                                    value: shipping.name,
                                    onChange: (e)=>setShipping({
                                            ...shipping,
                                            name: e.target.value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 249,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    style: s.input,
                                    placeholder: "Phone (e.g. 01XXXXXXXXX)",
                                    value: shipping.phone,
                                    onChange: (e)=>setShipping({
                                            ...shipping,
                                            phone: e.target.value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 251,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    style: {
                                        ...s.input,
                                        minHeight: 70
                                    },
                                    placeholder: "Full delivery address",
                                    value: shipping.address,
                                    onChange: (e)=>setShipping({
                                            ...shipping,
                                            address: e.target.value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 253,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    style: s.input,
                                    placeholder: "City / District",
                                    value: shipping.city,
                                    onChange: (e)=>setShipping({
                                            ...shipping,
                                            city: e.target.value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 255,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    style: s.label,
                                    children: "Delivery area"
                                }, void 0, false, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 258,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: s.areaRow,
                                    children: [
                                        [
                                            "dhaka",
                                            "Inside Dhaka",
                                            DELIVERY.dhaka
                                        ],
                                        [
                                            "outside",
                                            "Outside Dhaka",
                                            DELIVERY.outside
                                        ]
                                    ].map(([val, label, charge])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>setShipping({
                                                    ...shipping,
                                                    area: val
                                                }),
                                            style: {
                                                ...s.areaCard,
                                                borderColor: shipping.area === val ? "var(--brand)" : "var(--border-2)",
                                                background: shipping.area === val ? "var(--brand-soft)" : "var(--surface-2)"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontWeight: 700,
                                                        color: shipping.area === val ? "var(--brand)" : "#ccc"
                                                    },
                                                    children: label
                                                }, void 0, false, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 263,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        color: "var(--text-mute)",
                                                        fontSize: 13,
                                                        marginTop: 4
                                                    },
                                                    children: [
                                                        "৳",
                                                        charge,
                                                        " delivery"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 264,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, val, true, {
                                            fileName: "[project]/app/checkout/page.jsx",
                                            lineNumber: 261,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 259,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: s.summary,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: s.sumRow,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Subtotal"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 270,
                                                    columnNumber: 39
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "৳",
                                                        subtotal
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 270,
                                                    columnNumber: 60
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/checkout/page.jsx",
                                            lineNumber: 270,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: s.sumRow,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "Delivery (",
                                                        shipping.area === "dhaka" ? "Dhaka" : "Outside Dhaka",
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 271,
                                                    columnNumber: 39
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "৳",
                                                        deliveryCharge
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 271,
                                                    columnNumber: 118
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/checkout/page.jsx",
                                            lineNumber: 271,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                ...s.sumRow,
                                                color: "#fff",
                                                fontWeight: 700,
                                                borderTop: "1px solid var(--border-2)",
                                                paddingTop: 10
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Total"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 272,
                                                    columnNumber: 134
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "৳",
                                                        total
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 272,
                                                    columnNumber: 152
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/checkout/page.jsx",
                                            lineNumber: 272,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                ...s.sumRow,
                                                color: "var(--brand)"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Advance (now, non-refundable unless cancelled)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 273,
                                                    columnNumber: 69
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "৳",
                                                        ADVANCE
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 273,
                                                    columnNumber: 128
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/checkout/page.jsx",
                                            lineNumber: 273,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                ...s.sumRow,
                                                color: "#fff",
                                                fontWeight: 700
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Cash on delivery"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 274,
                                                    columnNumber: 78
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "৳",
                                                        codBalance
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 274,
                                                    columnNumber: 107
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/checkout/page.jsx",
                                            lineNumber: 274,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 269,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: 12
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "btn btn-ghost",
                                            onClick: ()=>setStep("design"),
                                            children: "Back"
                                        }, void 0, false, {
                                            fileName: "[project]/app/checkout/page.jsx",
                                            lineNumber: 278,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "btn btn-primary",
                                            style: {
                                                flex: 1
                                            },
                                            onClick: placeOrder,
                                            disabled: loading || !shipping.name || !shipping.phone || !shipping.address,
                                            children: loading ? "Placing order…" : "Continue to payment"
                                        }, void 0, false, {
                                            fileName: "[project]/app/checkout/page.jsx",
                                            lineNumber: 279,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 277,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/checkout/page.jsx",
                            lineNumber: 248,
                            columnNumber: 13
                        }, this),
                        step === "payment" && order && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "card",
                            style: {
                                ...s.panel,
                                ...s.narrow
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: s.orderTag,
                                    children: [
                                        "Order #",
                                        order.orderNumber
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 290,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        color: "#fff",
                                        margin: "0 0 8px"
                                    },
                                    children: [
                                        "Pay ৳",
                                        ADVANCE,
                                        " advance"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 292,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: "var(--text-mute)",
                                        fontSize: 13,
                                        margin: "0 0 16px"
                                    },
                                    children: [
                                        "Send ৳",
                                        ADVANCE,
                                        " via ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: "Send Money"
                                        }, void 0, false, {
                                            fileName: "[project]/app/checkout/page.jsx",
                                            lineNumber: 294,
                                            columnNumber: 37
                                        }, this),
                                        " to the number below, then enter your Transaction ID. The remaining ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            style: {
                                                color: "var(--brand)"
                                            },
                                            children: [
                                                "৳",
                                                codBalance
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/checkout/page.jsx",
                                            lineNumber: 295,
                                            columnNumber: 31
                                        }, this),
                                        " is Cash on Delivery. The advance is non-refundable, except if we cancel your order — then it's returned."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 293,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: s.methodRow,
                                    children: [
                                        [
                                            "bkash",
                                            "bKash",
                                            "#E2136E",
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_BKASH || "01XXXXXXXXX"
                                        ],
                                        [
                                            "rocket",
                                            "Rocket",
                                            "#8C3494",
                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_ROCKET || "01XXXXXXXXX"
                                        ]
                                    ].map(([val, label, color, number])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>setPay({
                                                    ...pay,
                                                    method: val
                                                }),
                                            style: {
                                                ...s.methodCard,
                                                borderColor: pay.method === val ? color : "var(--border-2)"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontWeight: 800,
                                                        color
                                                    },
                                                    children: label
                                                }, void 0, false, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 304,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        color: "#bbb",
                                                        fontSize: 14,
                                                        marginTop: 4,
                                                        letterSpacing: 1
                                                    },
                                                    children: number
                                                }, void 0, false, {
                                                    fileName: "[project]/app/checkout/page.jsx",
                                                    lineNumber: 305,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, val, true, {
                                            fileName: "[project]/app/checkout/page.jsx",
                                            lineNumber: 302,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 299,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    style: s.input,
                                    placeholder: "Enter bKash/Rocket Transaction ID",
                                    value: pay.transactionId,
                                    onChange: (e)=>setPay({
                                            ...pay,
                                            transactionId: e.target.value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 310,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn btn-primary",
                                    style: {
                                        width: "100%"
                                    },
                                    onClick: submitTxn,
                                    disabled: loading || pay.transactionId.length < 4,
                                    children: loading ? "Submitting…" : "Submit Transaction ID"
                                }, void 0, false, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 313,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/checkout/page.jsx",
                            lineNumber: 289,
                            columnNumber: 13
                        }, this),
                        step === "done" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "card",
                            style: {
                                ...s.panel,
                                ...s.narrow,
                                textAlign: "center",
                                padding: "48px 32px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: 48
                                    },
                                    children: "✅"
                                }, void 0, false, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 322,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        color: "#fff",
                                        margin: "16px 0 8px"
                                    },
                                    children: "Order submitted!"
                                }, void 0, false, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 323,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: "var(--text-mute)",
                                        fontSize: 14,
                                        lineHeight: 1.6
                                    },
                                    children: [
                                        "We've received your advance payment details for ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            style: {
                                                color: "var(--brand)"
                                            },
                                            children: order.orderNumber
                                        }, void 0, false, {
                                            fileName: "[project]/app/checkout/page.jsx",
                                            lineNumber: 325,
                                            columnNumber: 65
                                        }, this),
                                        ". Our team will verify it and email you a confirmation. The balance is payable on delivery."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 324,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn btn-ghost",
                                    style: {
                                        marginTop: 20
                                    },
                                    onClick: ()=>router.push("/"),
                                    children: "Back to home"
                                }, void 0, false, {
                                    fileName: "[project]/app/checkout/page.jsx",
                                    lineNumber: 328,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/checkout/page.jsx",
                            lineNumber: 321,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/checkout/page.jsx",
                    lineNumber: 125,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/checkout/page.jsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/checkout/page.jsx",
                lineNumber: 333,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/checkout/page.jsx",
        lineNumber: 122,
        columnNumber: 5
    }, this);
}
_s(CheckoutPage, "taTFGxJOi7N/90xO0YIARaXYQDI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CheckoutPage;
const s = {
    wrap: {
        minHeight: "80vh",
        padding: "40px 20px"
    },
    container: {
        maxWidth: 880,
        margin: "0 auto"
    },
    narrow: {
        maxWidth: 560,
        margin: "0 auto"
    },
    designGrid: {
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr",
        gap: 24,
        alignItems: "start"
    },
    previewCol: {
        position: "sticky",
        top: 88
    },
    previewNote: {
        color: "var(--text-mute)",
        fontSize: 11,
        textAlign: "center",
        marginTop: 10
    },
    h1: {
        fontFamily: "var(--font-display)",
        color: "#fff",
        fontSize: 28,
        marginBottom: 24
    },
    steps: {
        display: "flex",
        gap: 16,
        marginBottom: 28,
        flexWrap: "wrap"
    },
    stepDot: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13,
        fontWeight: 600
    },
    // borderWidth/Style (no `border` shorthand) — borderColor is always set
    // dynamically at the call site; mixing shorthand + longhand across renders
    // makes React warn and can leave a stale border on toggle.
    stepNumBadge: {
        width: 26,
        height: 26,
        borderRadius: "50%",
        borderWidth: 2,
        borderStyle: "solid",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        flexShrink: 0
    },
    panel: {
        padding: 28
    },
    label: {
        color: "var(--text-dim)",
        fontSize: 13,
        fontWeight: 700,
        display: "block",
        margin: "18px 0 10px"
    },
    input: {
        width: "100%",
        padding: "13px 14px",
        marginBottom: 12,
        background: "var(--surface-2)",
        border: "1px solid var(--border-2)",
        borderRadius: 10,
        color: "#fff",
        fontSize: 14,
        outline: "none",
        boxSizing: "border-box"
    },
    colorRow: {
        display: "flex",
        gap: 10,
        flexWrap: "wrap"
    },
    colorSwatch: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 14px",
        borderRadius: 10,
        borderWidth: 2,
        borderStyle: "solid",
        cursor: "pointer",
        fontSize: 13,
        color: "#ddd"
    },
    colorDot: {
        width: 14,
        height: 14,
        borderRadius: "50%",
        border: "1px solid var(--border-2)"
    },
    sizeRow: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap"
    },
    sizeBtn: {
        width: 48,
        height: 40,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "var(--border-2)",
        background: "var(--surface-2)",
        color: "#ccc",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 13
    },
    sizeBtnActive: {
        borderColor: "var(--brand)",
        color: "var(--brand)",
        background: "var(--brand-soft)"
    },
    qtyRow: {
        display: "flex",
        alignItems: "center",
        gap: 16
    },
    qtyBtn: {
        width: 36,
        height: 36,
        borderRadius: 8,
        border: "1px solid var(--border-2)",
        background: "var(--surface-2)",
        color: "#fff",
        fontSize: 18,
        cursor: "pointer"
    },
    qtyVal: {
        color: "#fff",
        fontWeight: 700,
        fontSize: 16,
        minWidth: 20,
        textAlign: "center"
    },
    printBlock: {
        border: "1px solid var(--border)",
        borderRadius: 10,
        marginTop: 10,
        overflow: "hidden"
    },
    printHead: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 14px",
        cursor: "pointer"
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 5,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "var(--border-2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        color: "#000",
        flexShrink: 0
    },
    checkboxOn: {
        background: "var(--brand)",
        borderColor: "var(--brand)"
    },
    printBody: {
        padding: "0 14px 14px"
    },
    tierRow: {
        display: "flex",
        gap: 8,
        marginBottom: 10,
        flexWrap: "wrap"
    },
    tierBtn: {
        padding: "8px 12px",
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "var(--border-2)",
        background: "var(--surface-2)",
        color: "#ccc",
        cursor: "pointer",
        fontSize: 12,
        textTransform: "capitalize"
    },
    tierBtnActive: {
        borderColor: "var(--brand)",
        color: "var(--brand)",
        background: "var(--brand-soft)"
    },
    uploadBox: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        border: "1px dashed var(--border-2)",
        borderRadius: 10,
        cursor: "pointer",
        background: "var(--surface-2)"
    },
    uploadThumb: {
        width: 40,
        height: 40,
        borderRadius: 6,
        objectFit: "cover",
        flexShrink: 0
    },
    uploadIcon: {
        width: 40,
        height: 40,
        borderRadius: 6,
        background: "var(--surface)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--text-mute)",
        fontSize: 16,
        flexShrink: 0
    },
    uploadText: {
        color: "var(--text-dim)",
        fontSize: 13
    },
    uploadError: {
        color: "var(--danger)",
        fontSize: 12,
        marginTop: 6
    },
    areaRow: {
        display: "flex",
        gap: 12,
        marginBottom: 16
    },
    areaCard: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        borderWidth: 2,
        borderStyle: "solid",
        cursor: "pointer"
    },
    summary: {
        background: "var(--surface-2)",
        borderRadius: 12,
        padding: 16,
        margin: "20px 0",
        display: "flex",
        flexDirection: "column",
        gap: 8
    },
    sumRow: {
        display: "flex",
        justifyContent: "space-between",
        color: "#aaa",
        fontSize: 14
    },
    error: {
        color: "var(--danger)",
        fontSize: 13,
        marginBottom: 16,
        background: "rgba(255,80,80,0.1)",
        padding: "10px 14px",
        borderRadius: 8
    },
    orderTag: {
        color: "var(--brand)",
        fontWeight: 700,
        marginBottom: 16,
        fontSize: 14
    },
    methodRow: {
        display: "flex",
        gap: 12,
        marginBottom: 16
    },
    methodCard: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        borderWidth: 2,
        borderStyle: "solid",
        cursor: "pointer",
        textAlign: "center"
    }
};
var _c;
__turbopack_context__.k.register(_c, "CheckoutPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Footer.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        style: s.footer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container grid-3",
                style: {
                    marginBottom: 40
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: s.brand,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "var(--brand)",
                                            fontFamily: "var(--font-display)",
                                            fontWeight: 700,
                                            fontSize: 18
                                        },
                                        children: "INKDROP"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.jsx",
                                        lineNumber: 7,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "var(--text-mute)",
                                            fontSize: 10,
                                            letterSpacing: 3,
                                            marginLeft: 6
                                        },
                                        children: "STUDIO"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.jsx",
                                        lineNumber: 8,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Footer.jsx",
                                lineNumber: 6,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: s.blurb,
                                children: "Premium DTF-printed T-shirts, designed by you. Every shirt is printed to order — no minimums, no stock rooms, just your art on quality cotton, delivered anywhere in Bangladesh."
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.jsx",
                                lineNumber: 10,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.jsx",
                        lineNumber: 5,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: s.heading,
                                children: "How it works"
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.jsx",
                                lineNumber: 18,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                style: s.list,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "1. Pick a blank shirt & upload your design"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.jsx",
                                        lineNumber: 20,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "2. Choose print size & placement"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.jsx",
                                        lineNumber: 21,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "3. Pay ৳100 advance via bKash/Rocket"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.jsx",
                                        lineNumber: 22,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "4. Rest is Cash on Delivery"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.jsx",
                                        lineNumber: 23,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Footer.jsx",
                                lineNumber: 19,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.jsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: s.heading,
                                children: "Get in touch"
                            }, void 0, false, {
                                fileName: "[project]/components/Footer.jsx",
                                lineNumber: 28,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                style: s.list,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Facebook & Instagram — @inkdropstudio"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.jsx",
                                        lineNumber: 30,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Delivery: ৳80 inside Dhaka · ৳120 outside"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.jsx",
                                        lineNumber: 31,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Reply to any order email — a human reads it"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.jsx",
                                        lineNumber: 32,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Footer.jsx",
                                lineNumber: 29,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.jsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Footer.jsx",
                lineNumber: 4,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container",
                style: s.bottom,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "© ",
                            new Date().getFullYear(),
                            " INKDROP STUDIO. All rights reserved."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Footer.jsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "var(--brand)"
                        },
                        children: "Printed on demand in Bangladesh 🇧🇩"
                    }, void 0, false, {
                        fileName: "[project]/components/Footer.jsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Footer.jsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Footer.jsx",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
_c = Footer;
const s = {
    footer: {
        borderTop: "1px solid var(--border)",
        marginTop: 80,
        padding: "56px 0 28px"
    },
    brand: {
        marginBottom: 14
    },
    blurb: {
        color: "var(--text-mute)",
        fontSize: 13,
        lineHeight: 1.7,
        maxWidth: 320
    },
    heading: {
        color: "var(--text)",
        fontWeight: 700,
        fontSize: 13,
        marginBottom: 14,
        letterSpacing: .5
    },
    list: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        listStyle: "none",
        color: "var(--text-mute)",
        fontSize: 13,
        lineHeight: 1.6
    },
    bottom: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 10,
        paddingTop: 24,
        borderTop: "1px solid var(--border)",
        color: "var(--text-mute)",
        fontSize: 12
    }
};
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Navbar.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Navbar({ active }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].me().then({
                "Navbar.useEffect": ({ user })=>setUser(user)
            }["Navbar.useEffect"]).catch({
                "Navbar.useEffect": ()=>{}
            }["Navbar.useEffect"]).finally({
                "Navbar.useEffect": ()=>setReady(true)
            }["Navbar.useEffect"]);
        }
    }["Navbar.useEffect"], []);
    const logout = ()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearToken"])();
        setUser(null);
        router.push("/");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        style: s.header,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container",
            style: s.inner,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: s.brand,
                    onClick: ()=>router.push("/"),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: s.brandMark,
                            children: "INKDROP"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.jsx",
                            lineNumber: 30,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: s.brandSub,
                            children: "STUDIO"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.jsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Navbar.jsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    style: s.nav,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "hide-mobile",
                            style: {
                                ...s.navBtn,
                                ...active === "home" ? s.navBtnActive : {}
                            },
                            onClick: ()=>router.push("/"),
                            children: "Home"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.jsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            style: s.navBtn,
                            onClick: ()=>router.push(user ? "/checkout" : "/login"),
                            children: "Design a Shirt"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.jsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        ready && user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    style: {
                                        ...s.navBtn,
                                        ...active === "dashboard" ? s.navBtnActive : {}
                                    },
                                    onClick: ()=>router.push("/dashboard"),
                                    children: "My Orders"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.jsx",
                                    lineNumber: 43,
                                    columnNumber: 15
                                }, this),
                                user.isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "hide-mobile",
                                    style: {
                                        ...s.navBtn,
                                        ...active === "admin" ? s.navBtnActive : {}
                                    },
                                    onClick: ()=>router.push("/admin"),
                                    children: "Admin"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.jsx",
                                    lineNumber: 47,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    style: {
                                        ...s.navBtn,
                                        color: "var(--danger)"
                                    },
                                    onClick: logout,
                                    children: "Log out"
                                }, void 0, false, {
                                    fileName: "[project]/components/Navbar.jsx",
                                    lineNumber: 49,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Navbar.jsx",
                            lineNumber: 42,
                            columnNumber: 13
                        }, this) : ready ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            style: s.navBtnPrimary,
                            onClick: ()=>router.push("/login"),
                            children: "Log in"
                        }, void 0, false, {
                            fileName: "[project]/components/Navbar.jsx",
                            lineNumber: 52,
                            columnNumber: 13
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Navbar.jsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Navbar.jsx",
            lineNumber: 28,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Navbar.jsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s(Navbar, "sIjXeL0470slhGjkiB2hY185q9o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Navbar;
const s = {
    header: {
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(10,10,10,.85)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)"
    },
    inner: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px"
    },
    brand: {
        display: "flex",
        alignItems: "baseline",
        cursor: "pointer"
    },
    brandMark: {
        color: "var(--brand)",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 20,
        letterSpacing: .5
    },
    brandSub: {
        color: "var(--text-mute)",
        fontSize: 10,
        letterSpacing: 3,
        marginLeft: 6
    },
    nav: {
        display: "flex",
        gap: 8,
        alignItems: "center"
    },
    navBtn: {
        background: "none",
        border: "1px solid transparent",
        borderRadius: 8,
        color: "var(--text-dim)",
        padding: "9px 14px",
        cursor: "pointer",
        fontSize: 13,
        fontWeight: 600
    },
    navBtnActive: {
        color: "var(--brand)"
    },
    navBtnPrimary: {
        background: "var(--brand)",
        border: "none",
        borderRadius: 8,
        color: "#000",
        padding: "10px 18px",
        cursor: "pointer",
        fontSize: 13,
        fontWeight: 800
    }
};
var _c;
__turbopack_context__.k.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/TshirtPreview.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TshirtPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
// A stylised t-shirt silhouette, recolored live to the chosen blank, with
// the uploaded design(s) composited on top at roughly the right spot.
// It's an approximation for feel/placement — not a print-ready mockup.
const PRINT_BOX = {
    small: 58,
    medium: 88,
    large: 122
};
// Center points on the 300×340 viewBox, per print location.
const CENTER = {
    front: {
        x: 150,
        y: 195
    },
    back: {
        x: 150,
        y: 195
    },
    sleeve: {
        x: 219,
        y: 58
    }
};
const SLEEVE_SCALE = 0.45;
function TshirtPreview({ colorHex, colorName, prints }) {
    _s();
    const hasBack = !!prints.back;
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("front");
    const activeView = view === "back" && hasBack ? "back" : "front";
    const mainPrint = prints[activeView];
    const sleevePrint = prints.sleeve;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: s.wrap,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: s.tabs,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        style: {
                            ...s.tab,
                            ...activeView === "front" ? s.tabActive : {}
                        },
                        onClick: ()=>setView("front"),
                        children: "Front"
                    }, void 0, false, {
                        fileName: "[project]/components/TshirtPreview.jsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        style: {
                            ...s.tab,
                            ...activeView === "back" ? s.tabActive : {}
                        },
                        disabled: !hasBack,
                        onClick: ()=>setView("back"),
                        children: [
                            "Back",
                            !hasBack && " (no print)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/TshirtPreview.jsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/TshirtPreview.jsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 300 340",
                style: s.svg,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TeeShape, {
                        color: colorHex,
                        back: activeView === "back"
                    }, void 0, false, {
                        fileName: "[project]/components/TshirtPreview.jsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    mainPrint?.designUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrintOverlay, {
                        href: mainPrint.designUrl,
                        size: mainPrint.size,
                        center: CENTER[activeView]
                    }, void 0, false, {
                        fileName: "[project]/components/TshirtPreview.jsx",
                        lineNumber: 42,
                        columnNumber: 34
                    }, this),
                    sleevePrint?.designUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PrintOverlay, {
                        href: sleevePrint.designUrl,
                        size: sleevePrint.size,
                        center: CENTER.sleeve,
                        scale: SLEEVE_SCALE
                    }, void 0, false, {
                        fileName: "[project]/components/TshirtPreview.jsx",
                        lineNumber: 43,
                        columnNumber: 36
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/TshirtPreview.jsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: s.caption,
                children: [
                    colorName,
                    " · ",
                    activeView,
                    " view"
                ]
            }, void 0, true, {
                fileName: "[project]/components/TshirtPreview.jsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/TshirtPreview.jsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_s(TshirtPreview, "8yZrlnqRbur7QrDpmJGY1rDhDEs=");
_c = TshirtPreview;
function PrintOverlay({ href, size, center, scale = 1 }) {
    const box = PRINT_BOX[size] || PRINT_BOX.medium;
    const w = box * scale;
    const h = box * scale;
    const x = center.x - w / 2;
    const y = center.y - h / 2;
    const clipId = `clip-${Math.round(x)}-${Math.round(y)}-${Math.round(w)}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("clipPath", {
                id: clipId,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: x,
                    y: y,
                    width: w,
                    height: h,
                    rx: 5
                }, void 0, false, {
                    fileName: "[project]/components/TshirtPreview.jsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/TshirtPreview.jsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("image", {
                href: href,
                x: x,
                y: y,
                width: w,
                height: h,
                preserveAspectRatio: "xMidYMid slice",
                clipPath: `url(#${clipId})`
            }, void 0, false, {
                fileName: "[project]/components/TshirtPreview.jsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: x,
                y: y,
                width: w,
                height: h,
                rx: 5,
                fill: "none",
                stroke: "rgba(0,0,0,.3)",
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/components/TshirtPreview.jsx",
                lineNumber: 65,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/TshirtPreview.jsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_c1 = PrintOverlay;
// A clean, iconic tee outline traced clockwise from the left of the
// neckline: neckline dip → shoulder → sleeve (a distinct flap: cap, cuff,
// then a sharp cut back in at the underarm) → straight down the body →
// rounded hem → mirrored back up the left side → close.
const TEE_PATH = "M132,24 Q150,46 168,24 L204,14 L254,44 L240,92 L196,108 " + "L196,320 Q196,328 188,328 L112,328 Q104,328 104,320 " + "L104,108 L60,92 L46,44 L96,14 Z";
// Same silhouette, shallower neckline (a tee's back sits higher than the front).
const TEE_PATH_BACK = "M132,24 Q150,30 168,24 L204,14 L254,44 L240,92 L196,108 " + "L196,320 Q196,328 188,328 L112,328 Q104,328 104,320 " + "L104,108 L60,92 L46,44 L96,14 Z";
function TeeShape({ color, back }) {
    const gradId = `sheen-${color.replace("#", "")}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: gradId,
                    x1: "0%",
                    y1: "0%",
                    x2: "100%",
                    y2: "100%",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "0%",
                            stopColor: "#fff",
                            stopOpacity: "0.16"
                        }, void 0, false, {
                            fileName: "[project]/components/TshirtPreview.jsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "45%",
                            stopColor: "#fff",
                            stopOpacity: "0"
                        }, void 0, false, {
                            fileName: "[project]/components/TshirtPreview.jsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "100%",
                            stopColor: "#000",
                            stopOpacity: "0.12"
                        }, void 0, false, {
                            fileName: "[project]/components/TshirtPreview.jsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/TshirtPreview.jsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/TshirtPreview.jsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: back ? TEE_PATH_BACK : TEE_PATH,
                fill: color,
                stroke: "rgba(0,0,0,.4)",
                strokeWidth: "2.5",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/components/TshirtPreview.jsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: back ? TEE_PATH_BACK : TEE_PATH,
                fill: `url(#${gradId})`,
                stroke: "none"
            }, void 0, false, {
                fileName: "[project]/components/TshirtPreview.jsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            !back ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M132,25 Q150,44 168,25",
                fill: "none",
                stroke: "rgba(0,0,0,.32)",
                strokeWidth: "3.5",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/components/TshirtPreview.jsx",
                lineNumber: 103,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M132,23 Q150,29 168,23",
                fill: "none",
                stroke: "rgba(0,0,0,.32)",
                strokeWidth: "3.5",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/components/TshirtPreview.jsx",
                lineNumber: 105,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "150",
                y1: back ? 27 : 40,
                x2: "150",
                y2: "325",
                stroke: "rgba(0,0,0,.06)",
                strokeWidth: "1.5"
            }, void 0, false, {
                fileName: "[project]/components/TshirtPreview.jsx",
                lineNumber: 109,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/TshirtPreview.jsx",
        lineNumber: 88,
        columnNumber: 5
    }, this);
}
_c2 = TeeShape;
const s = {
    wrap: {
        background: "var(--surface-2)",
        border: "1px solid var(--border-2)",
        borderRadius: 14,
        padding: 16,
        textAlign: "center"
    },
    tabs: {
        display: "flex",
        gap: 6,
        justifyContent: "center",
        marginBottom: 10
    },
    // borderWidth/Style/Color (not the `border` shorthand) so the active
    // variant can override just borderColor without React warning about
    // mixing shorthand and longhand border properties between renders.
    tab: {
        padding: "6px 14px",
        borderRadius: 20,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "var(--border-2)",
        background: "transparent",
        color: "var(--text-mute)",
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer"
    },
    tabActive: {
        borderColor: "var(--brand)",
        color: "var(--brand)",
        background: "var(--brand-soft)"
    },
    svg: {
        width: "100%",
        maxWidth: 220,
        height: "auto",
        margin: "0 auto",
        display: "block"
    },
    caption: {
        color: "var(--text-mute)",
        fontSize: 12,
        marginTop: 10,
        textTransform: "capitalize"
    }
};
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "TshirtPreview");
__turbopack_context__.k.register(_c1, "PrintOverlay");
__turbopack_context__.k.register(_c2, "TeeShape");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api,
    "clearToken",
    ()=>clearToken,
    "setToken",
    ()=>setToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Centralised fetch wrapper. Stores JWT in localStorage and attaches it.
const API_BASE = ("TURBOPACK compile-time value", "http://localhost:5001/api") || "http://localhost:5000/api";
function getToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem("inkdrop_token");
}
function setToken(token) {
    localStorage.setItem("inkdrop_token", token);
}
function clearToken() {
    localStorage.removeItem("inkdrop_token");
}
async function request(path, { method = "GET", body, auth = true } = {}) {
    const headers = {
        "Content-Type": "application/json"
    };
    if (auth) {
        const t = getToken();
        if (t) headers.Authorization = `Bearer ${t}`;
    }
    const res = await fetch(`${API_BASE}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    });
    const data = await res.json().catch(()=>({}));
    if (!res.ok) {
        const msg = data.message || data.errors?.[0]?.msg || "Request failed";
        throw new Error(msg);
    }
    return data;
}
// Multipart upload — separate from `request` because it must NOT set a
// JSON Content-Type (the browser needs to set its own multipart boundary).
async function uploadFile(path, file) {
    const headers = {};
    const t = getToken();
    if (t) headers.Authorization = `Bearer ${t}`;
    const formData = new FormData();
    formData.append("design", file);
    const res = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers,
        body: formData
    });
    const data = await res.json().catch(()=>({}));
    if (!res.ok) throw new Error(data.message || "Upload failed");
    return data;
}
const api = {
    // auth
    register: (d)=>request("/auth/register", {
            method: "POST",
            body: d,
            auth: false
        }),
    login: (d)=>request("/auth/login", {
            method: "POST",
            body: d,
            auth: false
        }),
    me: ()=>request("/auth/me"),
    googleUrl: ()=>`${API_BASE}/auth/google`,
    // products (blank shirts)
    products: ()=>request("/products", {
            auth: false
        }),
    product: (id)=>request(`/products/${id}`, {
            auth: false
        }),
    // design artwork upload
    uploadDesign: (file)=>uploadFile("/uploads", file),
    // orders
    createOrder: (d)=>request("/orders", {
            method: "POST",
            body: d
        }),
    submitTransaction: (id, d)=>request(`/orders/${id}/transaction`, {
            method: "POST",
            body: d
        }),
    myOrders: ()=>request("/orders/mine"),
    getOrder: (id)=>request(`/orders/${id}`),
    // admin
    adminOrders: (status)=>request(`/admin/orders${status ? `?status=${status}` : ""}`),
    verifyOrder: (id)=>request(`/admin/orders/${id}/verify`, {
            method: "PATCH"
        }),
    rejectOrder: (id, reason)=>request(`/admin/orders/${id}/reject`, {
            method: "PATCH",
            body: {
                reason
            }
        }),
    cancelOrder: (id, reason)=>request(`/admin/orders/${id}/cancel`, {
            method: "PATCH",
            body: {
                reason
            }
        }),
    issueRefund: (id)=>request(`/admin/orders/${id}/refund-issued`, {
            method: "PATCH"
        }),
    updateStatus: (id, status)=>request(`/admin/orders/${id}/status`, {
            method: "PATCH",
            body: {
                status
            }
        }),
    adminStats: ()=>request("/admin/stats"),
    adminSales: ()=>request("/admin/sales"),
    adminUsers: ()=>request("/admin/users")
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_19tk4t0._.js.map