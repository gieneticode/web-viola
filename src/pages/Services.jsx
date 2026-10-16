import React from "react";
import { useLocation, Link } from "react-router-dom";
import { SERVICES, CAPS } from "../data.js";
import { Reveal } from "../components/Bits.jsx";
import { StaggerGrid, TiltCard } from "../components/Premium.jsx";

// Ikon peralatan produksi — SVG garis konsisten, tanpa emoji
const CAP_ICONS = {
  camera: <><path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13" r="3.2"/></>,
  drone: <><path d="M5 5l3 3M19 5l-3 3M5 19l3-3M19 19l-3-3"/><rect x="9" y="9" width="6" height="6" rx="1.5"/></>,
  fpv: <><path d="M3 12h4l2-5 3 10 2.5-7 1.5 2H21"/></>,
  audio: <><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></>,
  lighting: <><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.7 1 1.5 1 2.5h6c0-1 .2-1.8 1-2.5A6 6 0 0 0 12 3z"/></>,
  cinematic: <><path d="M4 9h16v11H4zM4 9l1.5-4L7 9M9.5 9l1.5-4L12.5 9M15 9l1.5-4L18 9"/></>,
  post: <><circle cx="6" cy="7" r="2.5"/><circle cx="6" cy="17" r="2.5"/><path d="M8 8.5L20 19M8 15.5L20 5"/></>,
};
function CapIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {CAP_ICONS[name] || CAP_ICONS.camera}
    </svg>
  );
}

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
            <p className="sub-t">Satu tim, dari ide pertama hingga frame terakhir — dan seterusnya.</p>
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
            {CAPS.map(([icon, t]) => <div className="cap" key={t}><i><CapIcon name={icon} /></i>{t}</div>)}
          </Reveal>
        </div>
      </section>

      <section id="pricing">
        <div className="wrap">
          <Reveal className="center">
            <div className="eyebrow c"><span className="dot" />Investment</div>
            <h2 className="lux-h">Mulai dari yang kamu butuhkan.</h2>
            <p className="sub-t">Tiga paket fleksibel — semua termasuk konsultasi gratis dan revisi. Butuh yang custom? Ceritakan brief kamu.</p>
          </Reveal>
          <StaggerGrid className="price-grid">
            {[
              { tag: "Essential", t: "Content Starter", price: "Rp 2,5 jt", per: "per proyek", items: ["Syuting 1 hari (setengah hari)", "Edit 1 video (≤ 60 detik)", "Color grading dasar", "1x revisi", "Penyerahan 5 hari kerja"] },
              { tag: "Signature", t: "Brand Production", price: "Rp 8 jt", per: "per proyek", hot: true, items: ["Syuting 2 hari + drone", "Edit 3 video + 10 foto", "Color grading sinematik", "Desain suara & mixing", "2x revisi", "Penyerahan 10 hari kerja"] },
              { tag: "Cinematic", t: "Full Campaign", price: "Custom", per: "hubungi kami", items: ["Produksi multi-hari", "Kru & peralatan lengkap", "TVC / company profile", "Motion grafis", "Revisi tanpa batas*", "Produser khusus"] },
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
            *Syarat & ketentuan berlaku. Harga final menyesuaikan cakupan — konsultasi gratis, tanpa komitmen.
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
              Ceritakan tujuan kamu — kami akan susun rencana produksi yang paling tepat.
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
