import React from "react";
import { BRAND, SERVICES } from "../data.js";
import { Reveal, VMark } from "../components/Bits.jsx";
import { MagBtn } from "../components/Premium.jsx";

export default function Contact() {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", service: "", message: "" });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="page">
      <section>
        <div className="wrap contact">
          <Reveal>
            <VMark size={72} />
            <h2 className="lux-h">Let&apos;s create something great.</h2>
            <p className="sub-t" style={{ margin: "16px auto 0" }}>
              Punya proyek dalam pikiran? Ceritakan ide kamu — kami siap mewujudkannya.
            </p>

            <div className="links">
              <MagBtn><a className="wa" href={BRAND.wa} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></MagBtn>
              <MagBtn><a href={`mailto:${BRAND.email}`}>Email Us</a></MagBtn>
              <MagBtn><a className="ig" href={BRAND.ig} target="_blank" rel="noopener noreferrer">Instagram</a></MagBtn>
            </div>
          </Reveal>

          <Reveal as="form" className="form" onSubmit={submit}>
            {sent && (
              <div className="ok" role="status">
                Terima kasih{form.name ? `, ${form.name}` : ""} — brief kamu sudah kami terima.
                Kami akan segera menghubungimu via email atau WhatsApp.
              </div>
            )}
            <div className="row">
              <label>Nama
                <input required value={form.name} onChange={set("name")} placeholder="Nama kamu" />
              </label>
              <label>Email
                <input required type="email" value={form.email} onChange={set("email")}
                  placeholder="kamu@brand.com" />
              </label>
            </div>
            <label>Layanan
              <select value={form.service} onChange={set("service")}>
                <option value="">Pilih layanan…</option>
                {SERVICES.map((s) => <option key={s.id} value={s.t}>{s.t}</option>)}
                <option value="Full package">Paket full (end-to-end)</option>
              </select>
            </label>
            <label>Brief proyek
              <textarea rows="5" required value={form.message} onChange={set("message")}
                placeholder="Ceritakan tujuan, timeline, dan kisaran budget kamu…" />
            </label>
            <button className="btn primary" type="submit"
              style={{ justifySelf: "start" }}>Send Brief</button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
