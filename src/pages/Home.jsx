import React from "react";
import { Link } from "react-router-dom";
import { BRAND, CLIENTS, MARQUEE, CAPABILITY_STEPS, METRICS } from "../data.js";
import { Reveal, Marquee, Steps, ProgressRing, HandHero } from "../components/Bits.jsx";
import { MagBtn, SplitHead, StaggerGrid, TiltCard, CountUp } from "../components/Premium.jsx";
import IDCardSection from "../components/IDCardSection.jsx";

export default function Home() {
  return (
    <>
      {/* ===== Hero: 3D lanyard card + tombol, background gelap nyambung ===== */}
      <IDCardSection />

      <Marquee items={MARQUEE} />

      <section id="trust">
        <div className="wrap center">
          <Reveal as="div" from="left">
            <div className="eyebrow c"><span className="dot" />Why Vio.co</div>
            <h2 className="layered lux-h"><span className="fg">Production that</span><span className="bg" aria-hidden="true">performs.</span></h2>
            <p className="sub-t">
              Satu team dari first idea hingga final frame — dan seterusnya.
            </p>
          </Reveal>
          <StaggerGrid className="ringgrid" style={{ marginTop: 52 }}>
            {METRICS.map((m, i) => (
              <TiltCard key={m.label} style={{ "--i": i }}>
                <ProgressRing pct={m.pct} label={m.label} sub={m.sub} />
              </TiltCard>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ===== Stats bar ===== */}
      <section id="stats" className="stats-strip">
        <div className="wrap stats-grid">
          {[[ "100+","Project selesai"],["50+","Klien yang puas"],["6+","Tahun pengalaman"],["3","Kota terlayani"]].map(([n,l],i)=>(
            <Reveal key={l} className="stat-item" style={{ "--i": i }}>
              <div className="stat-num">{n}</div>
              <div className="stat-lbl">{l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="capabilities">
        <div className="wrap">
          <Reveal className="center" from="right">
            <div className="eyebrow c"><span className="dot" />Capabilities</div>
            <h2 className="lux-h">From idea to final frame.</h2>
          </Reveal>
          <Reveal><Steps steps={CAPABILITY_STEPS} /></Reveal>
        </div>
      </section>

      {/* hand mockup + giant ghost word — editorial brand statement (refrensi) */}
      <HandHero ghost="VIO.CO" />

      <section id="clients">
        <div className="wrap">
          <Reveal className="center" from="left">
            <div className="eyebrow c"><span className="dot" />Trusted by</div>
            <h2 className="lux-h">Clients &amp; collaborations.</h2>
            <p className="sub-t">Brands, institutions, dan teams yang pernah bekerja sama dengan kami di seluruh Indonesia.</p>
          </Reveal>
          <Reveal className="logos" style={{ "--i": 1 }}>
            {CLIENTS.map(c => <div key={c}>{c}</div>)}
          </Reveal>

          {/* testimony — isi section biar ga keliatan kosong */}
          <StaggerGrid className="testi-grid" style={{ marginTop: 40 }}>
            {[
              { q: "Production ran smoothly end-to-end. The final film landed exactly on the brief — and ahead of schedule.", a: "Corporate Communications", r: "Government Institution" },
              { q: "They think before they shoot. The content calendar alone changed how our social media performs.", a: "Marketing Lead", r: "Hospitality Brand" },
              { q: "One team handled everything — concept, drone, edit, publishing. We just approved and posted.", a: "Brand Manager", r: "F&B Brand" },
            ].map((t, i) => (
              <TiltCard key={i} className="card testi" style={{ "--i": i }}>
                <div className="stars">★★★★★</div>
                <p className="q">“{t.q}”</p>
                <footer><b>{t.a}</b><span>{t.r}</span></footer>
              </TiltCard>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section id="cta">
        <div className="wrap">
          <Reveal className="cta-band">
            <div className="eyebrow c"><span className="dot" />Ready when you are</div>
            <h2 style={{ maxWidth: "26ch", margin: "18px auto 18px" }}>
              Let&apos;s create something great.
            </h2>
            <p className="sub-t" style={{ textAlign: "center" }}>
              Punya project in mind? Ceritakan ide kamu — kami siap mewujudkannya.
            </p>
            <div className="hero-act" style={{ justifyContent: "center" }}>
              <MagBtn><Link className="btn primary" to="/contact">Contact Us</Link></MagBtn>
              <MagBtn><a className="btn" href={BRAND.wa} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></MagBtn>
            </div>
            <div className="cta-meta">
              <span><b>Reply time</b> dalam 24 jam</span>
              <i />
              <span><b>Konsultasi</b> gratis via call</span>
              <i />
              <span><b>Based in</b> Pekanbaru · Jakarta</span>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
