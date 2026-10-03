import { useEffect, useState } from "react";

/* Branded loading screen — V logo pulse → count up → fade out */
export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    let raf;
    const t0 = performance.now();
    const dur = 1800;
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) { raf = requestAnimationFrame(tick); }
      else {
        setTimeout(() => {
          setOut(true);
          setTimeout(onDone, 600);
        }, 200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className={`loader${out ? " out" : ""}`} aria-hidden="true">
      <div className="loader-inner">
        <div className="loader-logo">
          <img src="/assets/v-mark.png" alt="" />
          <div className="loader-ring" />
        </div>
        <div className="loader-name">VIO.CO</div>
        <div className="loader-bar">
          <div className="loader-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="loader-pct">{pct}%</div>
      </div>
    </div>
  );
}
