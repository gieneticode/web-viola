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
            <address className="foot-contact">
              <span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
                Pekanbaru · Jakarta
              </span>
              <span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>
                Senin–Sabtu, 09.00–18.00 WIB
              </span>
              <span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/></svg>
                {BRAND.email}
              </span>
              <span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5z"/></svg>
                <a href={BRAND.wa} target="_blank" rel="noopener noreferrer">+62 878-4040-3048</a>
              </span>
            </address>
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
