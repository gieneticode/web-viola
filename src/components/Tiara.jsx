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
Gaya bicara: santai, hangat, profesional, pakai bahasa Indonesia. Jawab singkat & jelas (2-4 kalimat kecuali ditanya detail). Kalau ditanya harga, bilang estimasinya mulai dari budget custom, ajak konsultasi gratis. Kontak resmi: WhatsApp https://wa.me/6287840403048 · email hello@vioofficial.web.id · Instagram @violadwijenita · TikTok @violadwijenita · website https://vioofficial.web.id. Kalau tertarik serius, arahkan ke WhatsApp dulu.
Jangan ngarang fakta yang gak ada di atas. Panggil user "kak" atau "kamu" biar akrab.`;

const QUICK = ["Layanan apa aja?", "Berapa harganya?", "Portofolio?", "Kontak & sosmed"];

const WA_URL = "https://wa.me/6287840403048";
const EMAIL = "hello@vioofficial.web.id";
const IG_URL = "https://instagram.com/violadwijenita";
const TIKTOK_URL = "https://tiktok.com/@violadwijenita";
const SITE_URL = "https://vioofficial.web.id";

/* Kartu kontak klikable (WhatsApp, Email, IG, TikTok, Web) */
function ContactCard() {
  return (
    <div className="tiara-contact">
      <span>Butuh langsung?</span>
      <div className="tiara-contact-btns">
        <a className="tc-btn wa" href={WA_URL} target="_blank" rel="noreferrer">💬 WhatsApp</a>
        <a className="tc-btn em" href={`mailto:${EMAIL}`}>✉️ Email</a>
      </div>
      <div className="tiara-contact-btns">
        <a className="tc-btn ig" href={IG_URL} target="_blank" rel="noreferrer">📷 Instagram</a>
        <a className="tc-btn tk" href={TIKTOK_URL} target="_blank" rel="noreferrer">🎵 TikTok</a>
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

        <div className="tiara-input">
          <input
            value={input}
            placeholder="Tanya Tiara apa aja…"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            disabled={typing}
          />
          <button onClick={() => send()} disabled={typing || !input.trim()} aria-label="Kirim">➤</button>
        </div>
        <div className="tiara-foot">Tiara AI · asisten resmi Vio.co</div>
      </div>
    </>
  );
}
