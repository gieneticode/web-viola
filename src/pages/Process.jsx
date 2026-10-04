import React from "react";
import { Link } from "react-router-dom";
import { ROADMAP, SOCIAL_FLOW, SOCIAL_FEED } from "../data.js";
import { Reveal, RoadmapCircles } from "../components/Bits.jsx";
export default function Process() {
  return (
    <div className="page">
      <section>
        <div className="wrap">
          <Reveal className="center">
            <div className="eyebrow c"><span className="dot" />Development roadmap</div>
            <h2 className="lux-h">Our process.</h2>
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
            <h2 className="lux-h">Social media is more than posting.</h2>
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
                position: "relative", overflow: "hidden" }}>
                <img src={SOCIAL_FEED[i]} alt={t} loading="lazy"
                  style={{ width:"100%", height:"100%", objectFit:"cover", position:"absolute", inset:0 }} />
                <div style={{ position:"absolute", inset:0,
                  background:"linear-gradient(200deg,transparent 50%,rgba(5,8,15,.85))" }} />
                <small style={{ position: "absolute", left: 14, bottom: 12, fontSize: 10,
                  letterSpacing: ".2em", textTransform: "uppercase",
                  color: "rgba(255,255,255,.75)", zIndex: 2 }}>{t}</small>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal className="cta-band">
            <div className="eyebrow c"><span className="dot" />Next project</div>
            <h2 style={{ maxWidth: "30ch", margin: "18px auto 18px" }}>
              Want the same process for your brand?
            </h2>
            <p className="sub-t" style={{ textAlign: "center", marginBottom: 22 }}>
              Bring us a brief — or just an idea. We&apos;ll map the fastest
              route from concept to published content.
            </p>
            <div className="mini-steps">
              {[["1","Brief & goals"],["2","Creative concept"],["3","Production"],["4","Deliver & publish"]].map(([n,t]) => (
                <div className="mini-step" key={n}><span>{n}</span>{t}</div>
              ))}
            </div>
            <div className="hero-act" style={{ justifyContent: "center", marginTop: 26 }}>
              <Link className="btn primary" to="/contact">Contact Us</Link>
              <Link className="btn" to="/work">See the Work</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
