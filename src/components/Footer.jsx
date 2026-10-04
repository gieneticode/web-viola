import React from "react";
import { Link } from "react-router-dom";
import { BRAND } from "../data.js";
import { VMark } from "./Bits.jsx";

export default function Footer() {
  const cols = [
    { h: "Company", items: [["About", "/about"], ["Work", "/work"], ["Process", "/process"], ["Contact", "/contact"]] },
    { h: "Services", items: [["Video Production", "/services#video"], ["Social Media", "/services#social"], ["Creative & Branding", "/services#creative"], ["Aerial & FPV", "/services#aerial"], ["Post Production", "/services#post"]] },
    { h: "Connect", items: [["WhatsApp", BRAND.wa, true], ["Email", `mailto:${BRAND.email}`], ["Instagram", BRAND.ig, true], ["TikTok", BRAND.tiktok, true], ["Website", BRAND.site, true]] },
  ];
  return (
    <footer className="app">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link className="brand" to="/" style={{ display: "inline-flex" }}>
              <VMark /><b>VIO.CO</b>
            </Link>
            <p>{BRAND.tagline}</p>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <h4>{c.h}</h4>
              <ul>
                {c.items.map(([label, to, ext]) => (
                  <li key={label + to}>
                    {ext || to.startsWith("mailto:")
                      ? <a href={to} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined}>{label}</a>
                      : <Link to={to}>{label}</Link>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="wordmark">{BRAND.name}</div>
        {/* ===== Vio.co logo ===== */}
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <img src="/assets/vio-logo.jpg" alt="Vio.co — Production House · Creative Agency"
            style={{ width: 200, height: "auto", borderRadius: 16, display: "inline-block" }} />
        </div>
        <div className="fine">
          <span>© {new Date().getFullYear()} {BRAND.name}</span>
          <span>{BRAND.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
