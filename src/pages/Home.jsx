import React from "react";
import { Link } from "react-router-dom";
import { BRAND, CLIENTS, MARQUEE, CAPABILITY_STEPS, METRICS } from "../data.js";
import { Reveal, Marquee, Steps, ProgressRing, HandHero } from "../components/Bits.jsx";
import { MagBtn, SplitHead, StaggerGrid, TiltCard } from "../components/Premium.jsx";
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
            <h2 className="layered"><span className="fg">Production that</span><span className="bg" aria-hidden="true">performs.</span></h2>
            <p className="sub-t">
              One team from first idea to final frame — and everything after it.
            </p>
          </Reveal>
          <StaggerGrid className="ringgrid" style={{ marginTop: 52 }}>
            {METRICS.map(m => (
              <TiltCard key={m.label}>
                <ProgressRing pct={m.pct} label={m.label} sub={m.sub} />
              </TiltCard>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ===== Stats bar ===== */}
      <section id="stats" className="stats-strip">
        <div className="wrap stats-grid">
          {[["100+","Projects delivered"],["50+","Happy clients"],["6yrs","Experience"],["3","Cities covered"]].map(([n,l])=>(
            <Reveal key={l} className="stat-item">
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
            <h2>From idea to final frame.</h2>
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
            <h2>Clients &amp; collaborations.</h2>
          </Reveal>
          <Reveal className="logos">
            {CLIENTS.map(c => <div key={c}>{c}</div>)}
          </Reveal>
        </div>
      </section>

      <section id="cta">
        <div className="wrap">
          <Reveal className="cta-band">
            <h2 style={{ maxWidth: "26ch", margin: "0 auto 18px" }}>
              Let&apos;s create something great.
            </h2>
            <p className="sub-t" style={{ textAlign: "center" }}>
              Have a project in mind? Let&apos;s talk about your idea.
            </p>
            <div className="hero-act" style={{ justifyContent: "center" }}>
              <MagBtn><Link className="btn primary" to="/contact">Contact Us</Link></MagBtn>
              <MagBtn><a className="btn" href={BRAND.wa} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></MagBtn>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
