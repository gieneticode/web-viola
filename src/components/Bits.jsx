import React from "react";

/* glowing V mark */
export function VMark({ size = 28, style }) {
  return (
    <img className="mark" src="/assets/v-mark.png" alt="Vio.co" aria-hidden="true"
      style={{ width: size, height: size, objectFit: "cover", borderRadius: 6, boxShadow: "none", filter: "none", ...style }} />
  );
}

export function VIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M8.5 8v8l7-4z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Dot() { return <span className="dot" />; }

/* reveal-on-scroll wrapper — remembers what was already seen, so
   re-renders (filter switches) don't re-hide cards */
const seenIds = new Set();
let _seq = 0;


/* 3D tilt on mouse — gives cards true depth */
export function Tilt({ children, className = "", max = 10 }) {
  const ref = React.useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * max}deg) rotateY(${x * max}deg) translateZ(6px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div ref={ref} className={`tilt3d ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transition: "transform .18s ease-out" }}>
      {children}
    </div>
  );
}

export function Reveal({ as: Tag = "div", className = "", from = "", children, ...rest }) {
  const dirCls = from === "left" ? "rv-l" : from === "right" ? "rv-r" : "";
  const ref = React.useRef(null);
  const idRef = React.useRef(null);
  const [seen, setSeen] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    if (!idRef.current) idRef.current = `rv${++_seq}`;
    const myId = idRef.current;
    if (seenIds.has(myId)) { setSeen(true); return; }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          seenIds.add(myId);
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`rv ${dirCls} ${seen ? "in" : ""} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}

export function Backdrop() {
  return (
    <>
      <div className="backdrop" />
      <div className="grain" />
    </>
  );
}

export function Marquee({ items }) {
  const row = [...items, ...items];
  return (
    <div className="marq" aria-hidden="true">
      <div className="track">
        {row.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}

export function Steps({ steps, dashed }) {
  return (
    <div className={`steps ${dashed ? "dashed" : ""}`}>
      {steps.map(([n, title, body]) => (
        <div className="step" key={n + title}>
          <div className="n">{n}</div>
          <div><h3>{title}</h3><p>{body}</p></div>
        </div>
      ))}
    </div>
  );
}

/* ===== Dashed Roadmap — 3 circled months (persis referensi) =====
   Three dashed circles side by side; each holds glass pill badges.
   Mobile collapses to vertical stacked circles. */
export function RoadmapCircles({ months }) {
  return (
    <div className="rm-circles">
      {months.map((m, i) => (
        <div className="rm-circle" key={m.month}>
          <span className="rm-idx">0{i + 1}</span>
          <span className="rm-label">{m.month}</span>
          <div className="rm-pills">
            {m.items.map((it) => (
              <span className="pill" key={it}><span className="dot" />{it}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* abstract gradient art per work card — swap for real thumbnails later */
export function WorkArt({ cat }) {
  const seed = cat.length;
  const hue = 190 + (seed * 37 % 40);       // cyan-family
  return (
    <div className="art">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={`wg${seed}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={`hsl(${hue} 60% 38%)`} />
            <stop offset=".55" stopColor={`hsl(${hue+8} 55% 20%)`} />
            <stop offset="1" stopColor="hsl(220 45% 8%)" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#wg${seed})`} />
        <circle cx={80+seed*23%240} cy={60+seed*17%140} r="90" fill="none"
          stroke="rgba(0,212,224,.35)" strokeWidth="2" />
        <circle cx={340-seed*11%200} cy={230-seed*9%120} r="60" fill="none"
          stroke="rgba(127,196,240,.3)" strokeWidth="2" />
        <path d="M0 300 L400 60" stroke="rgba(255,255,255,.08)" strokeWidth="1" />
      </svg>
    </div>
  );
}

/* futuristic circular progress ring (SVG) — counts up when revealed.
   3D floating style: recessed groove track, glossy raised arc with glow,
   glass highlight on the tube edge, ground shadow, gentle bob animation. */
export function ProgressRing({ pct, label, sub, delay = 0 }) {
  const [v, setV] = React.useState(0);
  const ref = React.useRef(null);
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const R = 52, C = 2 * Math.PI * R;
  const RH = R - 1.8, CH = 2 * Math.PI * RH;
  const off = C - (v / 100) * C;
  const offH = CH - (v / 100) * CH;
  const gid = `ringg${uid}`, glow = `ringglow${uid}`;

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0 + delay) / 1400, 1);
        setV(Math.round(pct * (1 - Math.pow(1 - p, 3))));   // easeOutCubic
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [pct, delay]);

  return (
    <div className="ringcard" ref={ref}>
      <svg width="120" height="120" viewBox="0 0 120 120" className="ringsvg" aria-hidden="true">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4a9eff" />
            <stop offset="0.55" stopColor="#2fc4f2" />
            <stop offset="1" stopColor="#00e5d4" />
          </linearGradient>
          <filter id={glow} x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#00d4e0" floodOpacity="0.5" />
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#b8f4ff" floodOpacity="0.85" />
          </filter>
        </defs>
        {/* ground shadow — pulses opposite the bob */}
        <ellipse cx="60" cy="115" rx="30" ry="3.5" fill="rgba(0,0,0,.4)" className="ringshadow" />
        {/* recessed groove track */}
        <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(0,0,0,.55)" strokeWidth="9" />
        <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="7" />
        {/* ambient halo underlay */}
        <circle cx="60" cy="60" r={R} fill="none" stroke={`url(#${gid})`} strokeWidth="11"
          strokeLinecap="round" transform="rotate(-90 60 60)"
          strokeDasharray={C} strokeDashoffset={off} opacity="0.22"
          style={{ transition: "stroke-dashoffset .12s linear" }} />
        {/* raised glossy arc */}
        <circle cx="60" cy="60" r={R} fill="none" stroke={`url(#${gid})`} strokeWidth="6.5"
          strokeLinecap="round" transform="rotate(-90 60 60)" filter={`url(#${glow})`}
          strokeDasharray={C} strokeDashoffset={off}
          style={{ transition: "stroke-dashoffset .12s linear" }} />
        {/* glass highlight along the tube's upper edge */}
        <circle cx="60" cy="60" r={RH} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.4"
          strokeLinecap="round" transform="rotate(-90 60 60)"
          strokeDasharray={CH} strokeDashoffset={offH}
          style={{ transition: "stroke-dashoffset .12s linear" }} />
        <text x="60" y="66" textAnchor="middle" className="ringnum">{v}%</text>
      </svg>
      <div className="ringtxt">
        <b>{label}</b>
        <span>{sub}</span>
      </div>
    </div>
  );
}

/* ===== Hero — minimal, centered, logo-dominant =====
   Large glowing V mark centered, bold elegant headline below. */
export function HeroCenter({ title, sub, actions }) {
  return (
    <section className="hero-center">
      <div className="wrap">
        <div className="hc-inner">
          <VMark size={96} style={{ width: 96, height: 96 }} />
          <h1 className="hc-title">{title}</h1>
          <p className="hc-sub">{sub}</p>
          {actions && <div className="hc-act">{actions}</div>}
          <div className="hc-glow" />
        </div>
      </div>
    </section>
  );
}

/* ===== Hand mockup + ghost typography (persis referensi) =====
   Real client photo of hand holding phone with an oversized ghost word
   bleeding behind it + radial glow. */
export function HandHero({ ghost = "VIO.CO" }) {
  return (
    <section className="handhero">
      {/* ghost typography — huge, faint, clipped, behind everything */}
      <div className="hh-ghost" aria-hidden="true">{ghost}</div>
      <div className="hh-glow" aria-hidden="true" />
      <div className="hh-imgwrap">
        <img className="hh-img" src="/hand-v.jpg" alt="Hand holding Vio.co brand phone" />
      </div>
      <div className="hh-caption">VIO.CO — Production House · Creative Agency</div>
    </section>
  );
}

export function PhoneBrand() {
  return (
    <div className="phonewrap">
      <div className="phone">
        <div className="notch" />
        <div className="screen">
          <div className="stat"><span>10:01</span><span>Vio.co</span></div>
          <div className="inn">
            <VMark size={112} style={{ filter:
              "drop-shadow(0 0 26px rgba(0,212,224,.95)) drop-shadow(0 0 64px rgba(0,212,224,.5))",
              color:"#fff" }} />
            <div className="l1">Vio.co Production House</div>
            <div className="l2">Creative Agency</div>
            <div className="div" />
          </div>
        </div>
      </div>
    </div>
  );
}
