import { useEffect, useRef, useState } from "react";

/* ── Scroll progress bar ── */
export function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const on = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setW(isNaN(pct) ? 0 : pct);
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="scroll-prog" aria-hidden="true">
      <div className="scroll-fill" style={{ width: `${w}%` }} />
    </div>
  );
}

/* ── Magnetic button wrapper ── */
export function MagBtn({ children, className = "", style, ...rest }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * 0.3;
    const y = (e.clientY - r.top  - r.height / 2) * 0.3;
    el.style.transform = `translate(${x}px,${y}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div ref={ref} className={`magbtn ${className}`} style={style}
      onMouseMove={onMove} onMouseLeave={onLeave} {...rest}>
      {children}
    </div>
  );
}

/* ── Animated grain overlay ── */
export function AnimGrain() {
  const ref = useRef(null);
  useEffect(() => {
    let raf, frame = 0;
    const tick = () => {
      frame++;
      if (frame % 3 === 0 && ref.current) {
        const x = Math.random() * 100, y = Math.random() * 100;
        ref.current.style.backgroundPosition = `${x}% ${y}%`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <div ref={ref} className="anim-grain" aria-hidden="true" />;
}

/* ── Split headline word-by-word stagger ── */
export function SplitHead({ as: Tag = "h1", text, className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={`split-head ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="word-wrap" aria-hidden="true">
          <span className={`word${vis ? " in" : ""}`}
            style={{ transitionDelay: `${i * 0.07}s` }}>
            {w}&nbsp;
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* ── Stagger grid — children each animate in sequence ── */
export function StaggerGrid({ children, className = "", style }) {
  const ref   = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); io.disconnect(); }
    }, { threshold: 0.06 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const kids = Array.isArray(children) ? children : [children];
  return (
    <div ref={ref} className={className} style={style}>
      {kids.map((child, i) => (
        <div key={i} className={`sg-item${vis ? " in" : ""}`}
          style={{ transitionDelay: `${i * 0.09}s` }}>
          {child}
        </div>
      ))}
    </div>
  );
}

/* ── Parallax wrapper — shifts Y on scroll ── */
export function Parallax({ children, speed = 0.18, className = "" }) {
  const ref  = useRef(null);
  const raf  = useRef(null);
  const curr = useRef(0);

  useEffect(() => {
    const on = () => {
      const el = ref.current; if (!el) return;
      const r = el.parentElement?.getBoundingClientRect();
      if (!r) return;
      const center = r.top + r.height / 2 - window.innerHeight / 2;
      curr.current = center * speed;
      el.style.transform = `translateY(${curr.current}px)`;
    };
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

/* ── Tilt3D card — richer version with shine ── */
export function TiltCard({ children, className = "", max = 12 }) {
  const ref   = useRef(null);
  const shine = useRef(null);

  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const xn = (e.clientX - r.left) / r.width  - 0.5;
    const yn = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform =
      `perspective(900px) rotateX(${-yn * max}deg) rotateY(${xn * max}deg) translateZ(8px)`;
    if (shine.current) {
      shine.current.style.opacity = "1";
      shine.current.style.background =
        `radial-gradient(circle at ${(xn+0.5)*100}% ${(yn+0.5)*100}%, rgba(255,255,255,.13) 0%, transparent 60%)`;
    }
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
    if (shine.current) shine.current.style.opacity = "0";
  };

  return (
    <div ref={ref} className={`tiltcard ${className}`}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      <div ref={shine} className="tiltcard-shine" />
      {children}
    </div>
  );
}

/* ── Counter that animates to a target number ── */
export function CountUp({ to, suffix = "", duration = 1600 }) {
  const [v, setV]   = useState(0);
  const ref         = useRef(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setV(Math.round(to * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{v}{suffix}</span>;
}
