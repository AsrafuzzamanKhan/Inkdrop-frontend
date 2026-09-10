// Centralised fetch wrapper. Stores JWT in localStorage and attaches it.
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("inkdrop_token");
}

export function setToken(token) {
  localStorage.setItem("inkdrop_token", token);
}

export function clearToken() {
  localStorage.removeItem("inkdrop_token");
}

async function request(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const t = getToken();
    if (t) headers.Authorization = `Bearer ${t}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
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

  const res = await fetch(`${API_BASE}${path}`, { method: "POST", headers, body: formData });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Upload failed");
  return data;
}

export const api = {
  // auth
  register: (d) => request("/auth/register", { method: "POST", body: d, auth: false }),
  login: (d) => request("/auth/login", { method: "POST", body: d, auth: false }),
  me: () => request("/auth/me"),
  googleUrl: () => `${API_BASE}/auth/google`,

  // products (blank shirts)
  products: () => request("/products", { auth: false }),
  product: (id) => request(`/products/${id}`, { auth: false }),

  // design artwork upload
  uploadDesign: (file) => uploadFile("/uploads", file),

  // orders
  createOrder: (d) => request("/orders", { method: "POST", body: d }),
  submitTransaction: (id, d) => request(`/orders/${id}/transaction`, { method: "POST", body: d }),
  myOrders: () => request("/orders/mine"),
  getOrder: (id) => request(`/orders/${id}`),

  // admin
  adminOrders: (status) => request(`/admin/orders${status ? `?status=${status}` : ""}`),
  verifyOrder: (id) => request(`/admin/orders/${id}/verify`, { method: "PATCH" }),
  rejectOrder: (id, reason) => request(`/admin/orders/${id}/reject`, { method: "PATCH", body: { reason } }),
  cancelOrder: (id, reason) => request(`/admin/orders/${id}/cancel`, { method: "PATCH", body: { reason } }),
  issueRefund: (id) => request(`/admin/orders/${id}/refund-issued`, { method: "PATCH" }),
  updateStatus: (id, status) => request(`/admin/orders/${id}/status`, { method: "PATCH", body: { status } }),
  adminStats: () => request("/admin/stats"),
  adminSales: () => request("/admin/sales"),
  adminUsers: () => request("/admin/users"),
};
