import React, { useState, useRef, useEffect } from "react";

/* ═══════════ TIARA ASISTAN — AI chat widget Vio.co ═══════════
   Backend: rantai fallback (lihat tiaraConfig.js):
   1. deepseek-bansos @ 9router VPS (sesuai spesifikasi owner)
   2. atria @ 9router VPS (model cepat, server sama)
   3. DeepSeek-V4-Flash @ Dahl (cadangan publik, cepat & stabil)
   Efek typing per-karakter dengan jeda variabel = kesan real. */

import { CHAIN } from "../tiaraConfig.js";


/* Markdown mini-renderer: **bold**, *italic*, `code`, link, list, line breaks.
   Output React elements (aman, tanpa dangerouslySetInnerHTML). */
function renderMarkdown(text) {
  const blocks = String(text).split(/\n{2,}/);
  const inline = (s) => {
    const parts = [];
    const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|https?:\/\/[^\s)]+)/g;
    let last = 0, m, key = 0;
    while ((m = re.exec(s))) {
      if (m.index > last) parts.push(s.slice(last, m.index));
      const t = m[0];
      if (t.startsWith("**")) parts.push(<strong key={key++}>{t.slice(2, -2)}</strong>);
      else if (t.startsWith("`")) parts.push(<code key={key++}>{t.slice(1, -1)}</code>);
      else if (t.startsWith("*")) parts.push(<em key={key++}>{t.slice(1, -1)}</em>);
      else parts.push(<a key={key++} href={t} target="_blank" rel="noreferrer">{t.replace(/^https?:\/\//, "")}</a>);
      last = m.index + t.length;
    }
    if (last < s.length) parts.push(s.slice(last));
    return parts;
  };
  return blocks.map((b, bi) => {
    const lines = b.split("\n");
    const isList = lines.every((l) => /^\s*([-*•]|\d+[.)])\s+/.test(l));
    if (isList) {
      const ordered = /^\s*\d/.test(lines[0]);
      const items = lines.map((l, i) =>
        <li key={i}>{inline(l.replace(/^\s*([-*•]|\d+[.)])\s+/, ""))}</li>);
      return ordered ? <ol key={bi}>{items}</ol> : <ul key={bi}>{items}</ul>;
    }
    return <React.Fragment key={bi}>{lines.map((l, i) => (
      <React.Fragment key={i}>{i > 0 && <br />}{inline(l)}</React.Fragment>))}</React.Fragment>;
  });
}

const SYSTEM = `Kamu adalah "Tiara Asistan", asisten AI resmi Vio.co — production house milik Viola Dwi Jenita (6+ tahun pengalaman, berbasis di Pekanbaru & Jakarta).
Layanan Vio.co (6 kategori): Video Production, Photography, Branding & Design, Motion Graphics, Social Media Content, Event Coverage.
Klien: Polda Riau, Harbour Hotel, Seraya Villa, Nusantara Coffee, Dinas Pariwisata, Griya Corp.
Gaya bicara: santai, hangat, profesional, pakai bahasa Indonesia. Jawab singkat & jelas (2-4 kalimat kecuali ditanya detail). Kalau ditanya harga, bilang estimasinya mulai dari budget custom, ajak konsultasi gratis. Kontak resmi: WhatsApp https://wa.me/6287840403048 · email hello@violaofficial.web.id · Instagram @violadwijenita · TikTok @violadwijenita · website https://violaofficial.web.id. Kalau tertarik serius, arahkan ke WhatsApp dulu.
Jangan ngarang fakta yang gak ada di atas. Panggil user "kak" atau "kamu" biar akrab.`;

const QUICK = ["Layanan apa aja?", "Berapa harganya?", "Portofolio?", "Kontak & sosmed"];

const WA_URL = "https://wa.me/6287840403048";
const EMAIL = "hello@violaofficial.web.id";
const IG_URL = "https://instagram.com/violadwijenita";
const TIKTOK_URL = "https://tiktok.com/@violadwijenita";
const SITE_URL = "https://violaofficial.web.id";

/* Logo SVG brand asli */
const LogoWA = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.1 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.83 9.83 0 0 1 7 2.9 9.83 9.83 0 0 1 2.89 7c0 5.45-4.44 9.88-9.9 9.88m8.42-18.3A11.82 11.82 0 0 0 12.04 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.94L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.47-8.4"/></svg>
);
const LogoIG = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.47 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.15A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg>
);
const LogoTK = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 1 1-2.31-2.84V9.25a6.35 6.35 0 1 0 5.76 6.42V8.69a8.2 8.2 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/></svg>
);
const LogoMail = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m2 7 10 7L22 7"/></svg>
);

/* Barisan kontak: icon logo aja — bersih, gak kotak-kotak */
function ContactCard() {
  return (
    <div className="tiara-contact">
      <span>Butuh langsung?</span>
      <div className="tiara-icons">
        <a href={WA_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp"><LogoWA /></a>
        <a href={IG_URL} target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram"><LogoIG /></a>
        <a href={TIKTOK_URL} target="_blank" rel="noreferrer" aria-label="TikTok" title="TikTok"><LogoTK /></a>
        <a href={`mailto:${EMAIL}`} aria-label="Email" title="Email"><LogoMail /></a>
      </div>
    </div>
  );
}

export default function Tiara() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: "tiara", text: "Hai! Aku Tiara, asisten Vio.co ✨ Ada yang bisa aku bantu soal production house-nya Viola?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const bodyRef = useRef(null);
  const idRef = useRef(0);
  const keyIdx = useRef(0);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, showTyping]);

  const typeOut = (full, myId) =>
    new Promise((resolve) => {
      let i = 0;
      const step = () => {
        if (myId !== idRef.current) return resolve();
        i += 2 + Math.floor(Math.random() * 2);
        const slice = full.slice(0, i);
        setMsgs((m) => {
          const c = [...m];
          c[c.length - 1] = { from: "tiara", text: slice };
          return c;
        });
        if (i < full.length) {
          const ch = full[i - 1];
          const pause = ch === "," || ch === "." ? 120 : /[.!?,]\s/.test(full.slice(i - 2, i)) ? 100 : 18 + Math.random() * 28;
          setTimeout(step, pause);
        } else resolve();
      };
      setTimeout(step, 350);
    });

  const askBackend = async (history) => {
    // Coba tiap backend di rantai sampai ada yang jawab
    for (const be of CHAIN) {
      const res = await Promise.race([
        fetch(be.url, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${be.key}` },
          body: JSON.stringify({
            model: be.model,
            messages: [{ role: "system", content: SYSTEM }, ...history],
            max_tokens: 400,
            temperature: 0.8,
          }),
        }).then(async (r) => {
          if (!r.ok) throw new Error("bad status " + r.status);
          const d = await r.json();
          const txt = d?.choices?.[0]?.message?.content;
          if (!txt) throw new Error("empty");
          // bersihin tag <think> kalau model reasoning
          return txt.replace(/<think>[\s\S]*?<\/think>/g, "").trim() || txt.trim();
        }),
        new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), be.timeout)),
      ]).catch(() => null);
      if (res) return res;
    }
    return null;
  };

  const send = async (text) => {
    const q = (text ?? input).trim();
    if (!q || typing) return;
    setInput("");
    idRef.current += 1;
    const myId = idRef.current;
    const history = [
      ...msgs.filter((x) => x.done).map((x) => ({ role: x.from === "me" ? "user" : "assistant", content: x.text })),
      { role: "user", content: q },
    ];
    setMsgs((m) => [...m, { from: "me", text: q }]);
    setTyping(true);
    setShowTyping(true);

    const [reply] = await Promise.all([
      askBackend(history),
      new Promise((r) => setTimeout(r, 900)), // minimal feel "mikir"
    ]);

    setShowTyping(false);
    const finalReply =
      reply ||
      "Waduh, koneksinya lagi bermasalah 😅 Coba lagi ya, atau langsung WhatsApp kami di https://wa.me/6287840403048";

    setMsgs((m) => [...m, { from: "tiara", text: "", done: false, typing: true }]);
    await typeOut(finalReply, myId);
    const wantsContact = /wa\.me|whatsapp|kontak|contact|email|hubungi|sosmed|sosial/i.test(finalReply + q);
    setMsgs((m) => { const c = [...m]; c[c.length - 1] = { from: "tiara", text: finalReply, done: true, typing: false, contact: wantsContact }; return c; });
    setTyping(false);
  };

  return (
    <>
      {/* Floating button */}
      <button className={`tiara-fab ${open ? "open" : ""}`} onClick={() => setOpen(!open)}
        aria-label="Chat dengan Tiara Asistan">
        {open ? "✕" : "💬"}
        {!open && <span className="tiara-dot" />}
      </button>

      {/* Chat panel */}
      <div className={`tiara-panel ${open ? "open" : ""}`} role="dialog" aria-label="Tiara Asistan">
        <div className="tiara-head">
          <div className="tiara-ava">T</div>
          <div className="tiara-id">
            <b>Tiara Asistan</b>
            <span><i className="tiara-status" />Online — Vio.co AI</span>
          </div>
          <button className="tiara-x" onClick={() => setOpen(false)} aria-label="Tutup">✕</button>
        </div>

        <div className="tiara-body" ref={bodyRef}>
          {msgs.map((m, i) => (
            <div key={i} className={`tiara-msg ${m.from}`}>
              {m.from === "tiara" && <div className="tiara-mini">T</div>}
              <div className="tiara-bubble">
                {m.from === "tiara" && m.done ? renderMarkdown(m.text) : m.text}
                {m.from === "tiara" && m.text && m.typing && <span className="tiara-caret" />}
                {m.contact && <ContactCard />}
              </div>
            </div>
          ))}
          {showTyping && (
            <div className="tiara-msg tiara">
              <div className="tiara-mini">T</div>
              <div className="tiara-bubble typing"><i /><i /><i /></div>
            </div>
          )}
        </div>

        <div className="tiara-quick">
          {QUICK.map((q) => (
            <button key={q} onClick={() => send(q)} disabled={typing}>{q}</button>
          ))}
        </div>

        <div className="tiara-input rich">
          <button className="tiara-tool" title="Layanan" onClick={() => send("Layanan apa aja?")} disabled={typing}>✦</button>
          <button className="tiara-tool" title="Harga" onClick={() => send("Berapa harganya?")} disabled={typing}>◎</button>
          <button className="tiara-tool" title="Kontak" onClick={() => send("Kontak & sosmed")} disabled={typing}>☎</button>
          <input
            value={input}
            placeholder="Tanya Tiara apa aja…"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            disabled={typing}
          />
          <button className={`tiara-send ${input.trim() ? "ready" : ""}`} onClick={() => send()}
            disabled={typing || !input.trim()} aria-label="Kirim">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a1 1 0 0 0-1.39 1.06l1.5 6.34L14 12l-10.5 1-.99 6.34c-.1.65.62 1.15 1.19.86z" transform="rotate(90 12 12)"/></svg>
          </button>
        </div>
        <div className="tiara-foot">Tiara AI · asisten resmi Vio.co</div>
      </div>
    </>
  );
}
