import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { MagBtn } from "./Premium.jsx";

const Lanyard = lazy(() => import("./IDCard3D.jsx"));

export default function IDCardSection() {
  return (
    <section className="idcard">
      <div className="idcard-glow" aria-hidden="true" />
      {/* Row uses `order` so JSX stays semantic: stage before copy on mobile, left on desktop */}
      <div className="idcard-stage">
        <Suspense fallback={<div className="idcard-fallback" aria-hidden="true" />}>
          <Lanyard photoSrc="/assets/card-face.jpg" />
        </Suspense>
      </div>
      <div className="idcard-copy">
        <div className="eyebrow c"><span className="dot" />Production House &bull; Creative Agency &bull; Social Media Specialist</div>
        <h1 className="idcard-title">We create.<br/>We produce.<br/>We make your brand seen.</h1>
        <p className="idcard-sub">Dari creative strategy hingga production, dari content hingga social media.</p>
        <div className="idcard-act">
          <MagBtn><Link className="btn primary" to="/work">View Our Work</Link></MagBtn>
          <MagBtn><Link className="btn" to="/contact">Contact Us</Link></MagBtn>
        </div>
      </div>
    </section>
  );
}
