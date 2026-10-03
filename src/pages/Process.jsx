import React from "react";
import { Link } from "react-router-dom";
import { ROADMAP, SOCIAL_FLOW } from "../data.js";
import { Reveal, RoadmapCircles } from "../components/Bits.jsx";
export default function Process() {
  return (
    <div className="page">
      <section>
        <div className="wrap">
          <Reveal className="center">
            <div className="eyebrow c"><span className="dot" />Development roadmap</div>
            <h2>Our process.</h2>
            <p className="sub-t">
              A clear, structured approach to every production — from first
              brief to final delivery.
            </p>
          </Reveal>
          <Reveal><RoadmapCircles months={ROADMAP} /></Reveal>
        </div>
      </section>

      <section id="socialmedia">
        <div className="wrap g2">
          <Reveal>
            <div className="eyebrow"><span className="dot" />Social media</div>
            <h2>Social media is more than posting.</h2>
            <p className="sub-t">
              Strategy, planning, production, publishing — and then we measure
              what actually worked.
            </p>
            <div className="flow">
              {SOCIAL_FLOW.map((s, i) => (
                <div key={s}>{s}<span>{i === SOCIAL_FLOW.length - 1 ? "◎" : "→"}</span></div>
              ))}
            </div>
          </Reveal>

          <Reveal className="g2 tight" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {["Before","After","Reels / TikTok","Feed grid"].map((t, i) => (
              <div key={t} style={{ aspectRatio: "4/5", borderRadius: 18, border: "1px solid var(--brd)",
                position: "relative", overflow: "hidden",
                background: i % 2 ? "linear-gradient(150deg,#1b4a72,#0c1c2c)"
                                 : "linear-gradient(150deg,#12304a,#0a1622 60%,#05080f)" }}>
                <small style={{ position: "absolute", left: 14, bottom: 12, fontSize: 10,
                  letterSpacing: ".2em", textTransform: "uppercase",
                  color: "rgba(255,255,255,.55)" }}>{t}</small>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="cta-band">
            <h2 style={{ maxWidth: "30ch", margin: "0 auto 18px" }}>
              Want the same process for your brand?
            </h2>
            <div className="hero-act" style={{ justifyContent: "center" }}>
              <Link className="btn primary" to="/contact">Contact Us</Link>
              <Link className="btn" to="/work">See the Work</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
