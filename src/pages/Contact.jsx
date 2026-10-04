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
    // ponytail: no backend — swap for fetch('/api/contact') or a form service when needed
  };

  return (
    <div className="page">
      <section>
        <div className="wrap contact">
          <Reveal>
            <VMark size={72} />
            <h2 className="lux-h">Let&apos;s create something great.</h2>
            <p className="sub-t" style={{ margin: "16px auto 0" }}>
              Punya project in mind? Yuk ngobrol soal ide kamu.
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
                Thanks{form.name ? `, ${form.name}` : ""} — brief kamu udah kami terima.
                Kami akan reply via email atau WhatsApp segera.
              </div>
            )}
            <div className="row">
              <label>Name
                <input required value={form.name} onChange={set("name")} placeholder="Nama kamu" />
              </label>
              <label>Email
                <input required type="email" value={form.email} onChange={set("email")}
                  placeholder="you@brand.com" />
              </label>
            </div>
            <label>Service
              <select value={form.service} onChange={set("service")}>
                <option value="">Pilih service…</option>
                {SERVICES.map((s) => <option key={s.id} value={s.t}>{s.t}</option>)}
                <option value="Full package">Full package (end-to-end)</option>
              </select>
            </label>
            <label>Project brief
              <textarea rows="5" required value={form.message} onChange={set("message")}
                placeholder="Ceritain goal, timeline, dan budget range…" />
            </label>
            <button className="btn primary" type="submit"
              style={{ justifySelf: "start" }}>Send Brief</button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
