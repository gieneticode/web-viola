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
              Have a project in mind? Let&apos;s talk about your idea.
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
                Thanks{form.name ? `, ${form.name}` : ""} — your brief is noted.
                We&apos;ll reply via email or WhatsApp shortly.
              </div>
            )}
            <div className="row">
              <label>Name
                <input required value={form.name} onChange={set("name")} placeholder="Your name" />
              </label>
              <label>Email
                <input required type="email" value={form.email} onChange={set("email")}
                  placeholder="you@brand.com" />
              </label>
            </div>
            <label>Service
              <select value={form.service} onChange={set("service")}>
                <option value="">Select a service…</option>
                {SERVICES.map((s) => <option key={s.id} value={s.t}>{s.t}</option>)}
                <option value="Full package">Full package (end-to-end)</option>
              </select>
            </label>
            <label>Project brief
              <textarea rows="5" required value={form.message} onChange={set("message")}
                placeholder="Tell us about the goal, timeline and budget range…" />
            </label>
            <button className="btn primary" type="submit"
              style={{ justifySelf: "start" }}>Send Brief</button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
