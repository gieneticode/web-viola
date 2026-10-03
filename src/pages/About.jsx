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
            <h2>From creative strategy to production, from content to social media.</h2>
            <p className="sub-t">
              Vio.co is a creative production house and social media specialist that
              transforms ideas into meaningful visual content.
            </p>
            <p className="sub-t">
              From strategy and creative concepts to production and digital distribution,
              we help brands and organizations communicate through powerful visual storytelling.
            </p>
            <div className="stack">
              {["Production House","Creative Agency","Social Media Specialist","End-to-end Production"]
                .map(t => <span className="chip" key={t}><span className="dot" />{t}</span>)}
            </div>
          </Reveal>
          <Reveal className="g2 tight" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[["Team",""],["On set",""],["Behind the scenes",""],["Editing room",""]].map(([t]) => (
              <div key={t} style={{ aspectRatio: "1/1", borderRadius: 18, border: "1px solid var(--brd)",
                overflow: "hidden", position: "relative",
                background: "linear-gradient(150deg,#12304a,#0a1622 60%,#05080f)" }}>
                <small style={{ position: "absolute", left: 14, bottom: 12, fontSize: 10,
                  letterSpacing: ".18em", textTransform: "uppercase",
                  color: "rgba(255,255,255,.5)" }}>{t}</small>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="capabilities">
        <div className="wrap">
          <Reveal className="center">
            <div className="eyebrow c"><span className="dot" />Our team</div>
            <h2>A team, not a one-man band.</h2>
            <p className="sub-t">Director, camera crew, drone pilot, lighting, makeup, editing.</p>
          </Reveal>
          <StaggerGrid className="card-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 16, marginTop: 48 }}>
            {TEAM_ROLES.map(([role, desc]) => (
              <TiltCard key={role} className="card">
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
            <h2>Our process.</h2>
          </Reveal>
          <Reveal><Steps steps={PROCESS_STEPS} /></Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="cta-band">
            <h2 style={{ maxWidth: "30ch", margin: "0 auto 18px" }}>
              We don&apos;t just shoot. We build brands.
            </h2>
            <div className="hero-act" style={{ justifyContent: "center" }}>
              <Link className="btn primary" to="/work">View Our Work</Link>
              <Link className="btn" to="/contact">Contact Us</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
