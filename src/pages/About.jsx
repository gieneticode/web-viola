import React from "react";
import { Link } from "react-router-dom";
import { TEAM_ROLES, PROCESS_STEPS, ABOUT_PHOTOS } from "../data.js";
import { Reveal, Steps } from "../components/Bits.jsx";
import { TiltCard, StaggerGrid, MagBtn } from "../components/Premium.jsx";

export default function About() {
  return (
    <div className="page">
      <section>
        <div className="wrap g2">
          <Reveal>
            <div className="eyebrow"><span className="dot" />Who we are</div>
            <h2 className="lux-h">Dari creative strategy sampai production, dari content hingga social media.</h2>
            <p className="sub-t">
              Vio.co adalah creative production house dan social media specialist yang
              mentransformasi ide jadi meaningful visual content.
            </p>
            <p className="sub-t">
              Dari strategy dan creative concepts sampai production dan digital distribution,
              kami bantu brands dan organizations communicate lewat powerful visual storytelling.
            </p>
            <div className="stack">
              {["Production House","Creative Agency","Social Media Specialist","End-to-end Production"]
                .map(t => <span className="chip" key={t}><span className="dot" />{t}</span>)}
            </div>
          </Reveal>
          <Reveal className="g2 tight" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[["Team",ABOUT_PHOTOS[0]],["On set",ABOUT_PHOTOS[1]],["Behind the scenes",ABOUT_PHOTOS[2]],["Editing room",ABOUT_PHOTOS[3]]].map(([t,img]) => (
              <div key={t} style={{ aspectRatio: "1/1", borderRadius: 18, border: "1px solid var(--brd)",
                overflow: "hidden", position: "relative" }}>
                <img src={img} alt={t} loading="lazy"
                  style={{ width:"100%", height:"100%", objectFit:"cover", position:"absolute", inset:0 }} />
                <div style={{ position:"absolute", inset:0,
                  background:"linear-gradient(200deg,transparent 45%,rgba(5,8,15,.85))" }} />
                <small style={{ position: "absolute", left: 14, bottom: 12, fontSize: 10,
                  letterSpacing: ".18em", textTransform: "uppercase",
                  color: "rgba(255,255,255,.75)", zIndex: 2 }}>{t}</small>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="capabilities">
        <div className="wrap">
          <Reveal className="center">
            <div className="eyebrow c"><span className="dot" />Our team</div>
            <h2 className="lux-h">A team, not a one-man band.</h2>
            <p className="sub-t">Director, camera crew, drone pilot, lighting, makeup, editing.</p>
          </Reveal>
          <StaggerGrid className="card-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 16, marginTop: 48 }}>
            {TEAM_ROLES.map(([role, desc, img]) => (
              <TiltCard key={role} className="card team-card">
                <img className="team-img" src={img} alt={role} loading="lazy" />
                <h3 style={{ fontSize: 16, fontWeight: 400 }}>{role}</h3>
                <p>{desc}</p>
              </TiltCard>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section id="process">
        <div className="wrap">
          <Reveal className="center">
            <div className="eyebrow c"><span className="dot" />Behind the scenes</div>
            <h2 className="lux-h">Our process.</h2>
          </Reveal>
          <Reveal><Steps steps={PROCESS_STEPS} /></Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="cta-band">
            <div className="eyebrow c"><span className="dot" />Why brands stay</div>
            <h2 style={{ maxWidth: "30ch", margin: "18px auto 18px" }}>
              We don&apos;t just shoot. We build brands.
            </h2>
            <p className="sub-t" style={{ textAlign: "center", marginBottom: 22 }}>
              Strategy, production, dan distribution under one roof — biar nggak ada
              yang lost di antara agencies.
            </p>
            <div className="why-grid">
              {[["◆","One team","Nggak ada handover gaps antara vendor dan agency"],
                ["◈","Retainer-ready","Monthly content yang measured dan reported"],
                ["◉","Full-stack kit","Cinema camera, drone, FPV, lighting in-house"],
                ["◎","Platform-native","Di-cut untuk Reels, TikTok, YouTube, dan web"]].map(([ic,t,d]) => (
                <div className="why-item" key={t}>
                  <span className="ic">{ic}</span>
                  <b>{t}</b>
                  <small>{d}</small>
                </div>
              ))}
            </div>
            <div className="hero-act" style={{ justifyContent: "center", marginTop: 26 }}>
              <Link className="btn primary" to="/work">View Our Work</Link>
              <Link className="btn" to="/contact">Contact Us</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
