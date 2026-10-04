import React, { useState, useRef, useEffect } from "react";

/* ═══════════ TIARA ASISTAN — AI chat widget Vio.co ═══════════
   Backend: tiara-api di VPS (proxy 9router, fallback antar model).
   Efek typing per-karakter dengan jeda variabel = kesan real. */

const TIARA_API = "/api/tiara";

const QUICK = ["Layanan apa aja?", "Berapa harganya?", "Portofolio?", "Kontak & sosmed"];

export default function Tiara() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: "tiara", text: "Hai! Aku Tiara, asisten Vio.co ✨ Ada yang bisa aku bantu soal production house-nya Viola?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);   // waiting for API
  const [showTyping, setShowTyping] = useState(false); // "Tiara sedang mengetik..."
  const bodyRef = useRef(null);
  const idRef = useRef(0);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, showTyping]);

  const typeOut = (full, myId) =>
    new Promise((resolve) => {
      let i = 0;
      const step = () => {
        if (myId !== idRef.current) return resolve(); // superseded
        // typist: 2-3 char per tick, jeda organik (koma/spasi lebih lama)
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
      setTimeout(step, 350); // jeda "mikir" sebelum mulai ngetik
    });

  const send = async (text) => {
    const q = (text ?? input).trim();
    if (!q || typing) return;
    setInput("");
    idRef.current += 1;
    const myId = idRef.current;
    setMsgs((m) => [...m, { from: "me", text: q }]);
    setTyping(true);
    setShowTyping(true);

      let reply;
      try {
        const [res] = await Promise.all([
          fetch(TIARA_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: [
                ...msgs.filter(x => x.done).map(x => ({ role: x.from === "me" ? "user" : "assistant", content: x.text })),
                { role: "user", content: q },
              ],
            }),
          }).then((r) => r.json()),
          new Promise((r) => setTimeout(r, 900)),
        ]);
        reply = res.reply;
    } catch {
      reply = "Waduh, koneksinya bermasalah 😅 Coba lagi ya, atau langsung WhatsApp kami di https://wa.me/6280000000000";
    }

    setShowTyping(false);
    setMsgs((m) => [...m, { from: "tiara", text: "", done: false }]);
    await typeOut(reply, myId);
    setMsgs((m) => { const c = [...m]; c[c.length - 1] = { from: "tiara", text: reply, done: true }; return c; });
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
                {m.text}
                {m.from === "tiara" && m.text && <span className="tiara-caret" />}
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
