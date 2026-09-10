"use client";
import { useEffect, useState } from "react";

/**
 * Floating Facebook Messenger + Instagram chat buttons.
 *
 * Facebook Messenger uses Meta's official Customer Chat Plugin, which needs:
 *   1. A Facebook Page (get its Page ID from Page Settings → About).
 *   2. Your site domain whitelisted in Page Settings → Advanced Messaging → Whitelisted Domains.
 *   3. NEXT_PUBLIC_FB_PAGE_ID set in .env.local
 *
 * Instagram has no embeddable in-page chat widget, so we deep-link to the
 * Instagram DM / profile (NEXT_PUBLIC_INSTAGRAM_URL).
 */
export default function SocialChat() {
  const [open, setOpen] = useState(false);
  const FB_PAGE_ID = process.env.NEXT_PUBLIC_FB_PAGE_ID;
  const IG_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com";

  // Load Facebook SDK + Customer Chat plugin
  useEffect(() => {
    if (!FB_PAGE_ID) return;
    if (document.getElementById("fb-root")) return;

    const root = document.createElement("div");
    root.id = "fb-root";
    document.body.appendChild(root);

    const chat = document.createElement("div");
    chat.className = "fb-customerchat";
    chat.setAttribute("page_id", FB_PAGE_ID);
    chat.setAttribute("attribution", "biz_inbox");
    document.body.appendChild(chat);

    window.fbAsyncInit = function () {
      window.FB.init({ xfbml: true, version: "v19.0" });
    };

    const js = document.createElement("script");
    js.id = "facebook-jssdk";
    js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
    js.async = true;
    js.defer = true;
    document.body.appendChild(js);
  }, [FB_PAGE_ID]);

  return (
    <div style={s.wrap}>
      {open && (
        <div style={s.menu}>
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" style={{ ...s.item, background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}>
            <InstagramIcon /> Instagram
          </a>
          <a href={FB_PAGE_ID ? `https://m.me/${FB_PAGE_ID}` : "#"} target="_blank" rel="noopener noreferrer" style={{ ...s.item, background: "#0084FF" }}>
            <MessengerIcon /> Messenger
          </a>
        </div>
      )}
      <button onClick={() => setOpen(!open)} style={s.fab} aria-label="Chat with us">
        {open ? "✕" : <ChatIcon />}
      </button>
    </div>
  );
}

const ChatIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.5 2 2 6 2 11c0 2.6 1.3 5 3.4 6.6L4.5 22l4.7-1.6c.9.2 1.8.4 2.8.4 5.5 0 10-4 10-9S17.5 2 12 2z" fill="#000"/></svg>
);
const MessengerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12 2C6.4 2 2 6.1 2 11.5c0 2.9 1.3 5.4 3.3 7.1V22l3-1.7c.8.2 1.7.3 2.7.3 5.6 0 10-4.1 10-9.1S17.6 2 12 2zm1 11.7l-2.5-2.7-5 2.7 5.5-5.8 2.6 2.7 4.9-2.7-5.5 5.8z"/></svg>
);
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none"/></svg>
);

const s = {
  wrap: { position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 },
  menu: { display: "flex", flexDirection: "column", gap: 10 },
  item: { display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", borderRadius: 30, color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: 14, boxShadow: "0 6px 20px rgba(0,0,0,.3)" },
  fab: { width: 58, height: 58, borderRadius: "50%", background: "#E8C547", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#000", fontWeight: 700, boxShadow: "0 8px 24px rgba(232,197,71,.4)" },
};
