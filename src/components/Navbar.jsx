import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV, BRAND } from "../data.js";
import { VMark } from "./Bits.jsx";

export default function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobile, setMobile] = React.useState(false);
  const [drop, setDrop] = React.useState(null);
  const { pathname } = useLocation();

  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  React.useEffect(() => { setMobile(false); setDrop(null); }, [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobile]);

  const isOn = (to) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to.split("#")[0]);

  return (
    <header className={`app ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap nav">
        <Link className="brand" to="/" aria-label="Vio.co home">
          <VMark />
          <b>VIO.CO</b>
        </Link>

        <nav>
          <ul className="menu">
            {NAV.map((item) =>
              item.children ? (
                <li key={item.to}
                    className={drop === item.label ? "open" : ""}
                    onMouseEnter={() => setDrop(item.label)}
                    onMouseLeave={() => setDrop(null)}>
                  <button className={`top ${isOn(item.to) ? "on" : ""}`}
                    aria-haspopup="true" aria-expanded={drop === item.label}
                    onClick={() => setDrop(drop === item.label ? null : item.label)}>
                    {item.label} <span style={{ fontSize: 9 }}>▾</span>
                  </button>
                  <ul className="sub">
                    {item.children.map((c) => (
                      <li key={c.to}>
                        <Link to={c.to}><span className="dot" />{c.label}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === "/"}
                    className={({ isActive }) => `top ${isActive ? "on" : ""}`}>
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </nav>

        <Link className="btn primary sm desk-cta" to="/contact">Contact Us</Link>

        <button className={`burger ${mobile ? "x" : ""}`} aria-label="Menu"
          aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
          <span /><span /><span />
        </button>
      </div>

      {/* mobile drawer */}
      <div className={`drawer ${mobile ? "open" : ""}`}>
        <Link to="/" className={isOn("/") && pathname === "/" ? "on" : ""}>Home</Link>
        <Link to="/about" className={isOn("/about") ? "on" : ""}>About</Link>
        {NAV.filter(n => n.children).map(item => (
          <React.Fragment key={item.to}>
            <button className={`dd ${isOn(item.to) ? "on" : ""}`}
              onClick={() => setDrop(drop === item.label ? null : item.label)}>
              Services <span>{drop === item.label ? "−" : "+"}</span>
            </button>
            {drop === item.label && (
              <div className="subm">
                {item.children.map(c => <Link key={c.to} to={c.to}>{c.label}</Link>)}
              </div>
            )}
          </React.Fragment>
        ))}
        <Link to="/work" className={isOn("/work") ? "on" : ""}>Work</Link>
        <Link to="/process" className={isOn("/process") ? "on" : ""}>Process</Link>
        <Link to="/contact" className={isOn("/contact") ? "on" : ""}>Contact</Link>
        <a className="btn primary cta" href={BRAND.wa} target="_blank" rel="noopener noreferrer">
          WhatsApp Us
        </a>
      </div>
    </header>
  );
}
