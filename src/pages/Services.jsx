import React from "react";
import { useLocation, Link } from "react-router-dom";
import { SERVICES, CAPS } from "../data.js";
import { Reveal } from "../components/Bits.jsx";
import { StaggerGrid, TiltCard } from "../components/Premium.jsx";

export default function Services() {
  const { hash } = useLocation();
  const [hl, setHl] = React.useState(null);

  React.useEffect(() => {
    const id = hash.replace("#", "");
    if (!id) return;
    setHl(id);
    const el = document.getElementById(`svc-${id}`);
    if (el) el.scrollIntoView({ block: "center", behavior: "smooth" });
    const t = setTimeout(() => setHl(null), 1800);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <div className="page">
      <section>
        <div className="wrap">
          <Reveal className="center">
            <div className="eyebrow c"><span className="dot" />Services</div>
            <h2 className="lux-h">Everything your brand needs<br />to be seen and remembered.</h2>
            <p className="sub-t">Satu tim, dari first idea hingga final frame — dan seterusnya.</p>
          </Reveal>

          <div className="svc-grid">
            {SERVICES.map((s, i) => (
              <article className={`svc ${hl === s.id ? "hl" : ""}`} id={`svc-${s.id}`} key={s.id}
                style={{ "--i": i }}>
                <div className="svc-cover">
                  <img src={s.img} alt={s.t} loading="lazy" />
                  <span className="num">{s.n}</span>
                </div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="equipment">
        <div className="wrap">
          <Reveal className="center">
            <div className="eyebrow c"><span className="dot" />Production capability</div>
            <h2 className="lux-h">Built to shoot anywhere.</h2>
          </Reveal>
          <Reveal className="caps">
            {CAPS.map(([e, t]) => <div className="cap" key={t}><i>{e}</i>{t}</div>)}
          </Reveal>
        </div>
      </section>

      <section id="pricing">
        <div className="wrap">
          <Reveal className="center">
            <div className="eyebrow c"><span className="dot" />Investment</div>
            <h2 className="lux-h">Mulai dari yang kamu butuhkan.</h2>
            <p className="sub-t">Tiga tier fleksibel — semua termasuk konsultasi gratis dan revisi. Butuh yang custom? Ceritakan brief kamu.</p>
          </Reveal>
          <StaggerGrid className="price-grid">
            {[
              { tag: "Essential", t: "Content Starter", price: "Rp 2,5 jt", per: "per project", items: ["1-day shoot (half day)", "1 video edit (≤ 60 detik)", "Basic color grading", "1x revisi", "Delivery 5 hari kerja"] },
              { tag: "Signature", t: "Brand Production", price: "Rp 8 jt", per: "per project", hot: true, items: ["2-day shoot + drone", "3 video edit + 10 foto", "Cinematic color grading", "Sound design & mixing", "2x revisi", "Delivery 10 hari kerja"] },
              { tag: "Cinematic", t: "Full Campaign", price: "Custom", per: "hubungi kami", items: ["Multi-day production", "Full crew & equipment", "TVC / company profile", "Motion graphics", "Unlimited revisi*", "Dedicated producer"] },
            ].map((p, i) => (
              <TiltCard key={p.t} className={`card price-card${p.hot ? " hot" : ""}`} style={{ "--i": i }}>
                <span className="price-tag">{p.tag}</span>
                <h3>{p.t}</h3>
                <div className="price-from"><b>{p.price}</b> {p.per}</div>
                <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <Link className={`btn${p.hot ? " primary" : ""}`} to="/contact">Pilih paket</Link>
              </TiltCard>
            ))}
          </StaggerGrid>
          <p className="sub-t" style={{ textAlign: "center", marginTop: 24, fontSize: 12.5 }}>
            *Syarat & ketentuan berlaku. Harga final menyesuaikan scope — konsultasi gratis, tanpa komitmen.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="cta-band">
            <h2 style={{ maxWidth: "28ch", margin: "0 auto 18px" }}>
              Not sure which service you need?
            </h2>
            <p className="sub-t" style={{ textAlign: "center" }}>
              Ceritakan goal kamu — kami akan propose production plan yang paling tepat.
            </p>
            <div className="hero-act" style={{ justifyContent: "center" }}>
              <Link className="btn primary" to="/contact">Get a Proposal</Link>
              <Link className="btn" to="/work">See the Work</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
