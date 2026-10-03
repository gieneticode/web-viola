import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { WORK } from "../data.js";
import { Reveal } from "../components/Bits.jsx";

export default function ProjectDetail() {
  const { slug } = useParams();
  const nav = useNavigate();
  const w = WORK.find((x) => x.slug === slug);

  React.useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!w) {
    return (
      <div className="page">
        <div className="wrap center">
          <h2>Project not found.</h2>
          <p className="sub-t">That project does not exist (yet).</p>
          <div className="hero-act" style={{ justifyContent: "center" }}>
            <Link className="btn primary" to="/work">Back to Work</Link>
          </div>
        </div>
      </div>
    );
  }

  const related = WORK.filter((x) => x.slug !== w.slug).slice(0, 3);

  return (
    <div className="page">
      <section>
        <div className="wrap">
          <button className="back" onClick={() => nav(-1)}>← Back</button>

          <Reveal className="heroimg">
            <span className="cat">{w.cat}</span>
          </Reveal>

          <Reveal as="div" style={{ marginTop: 34 }}>
            <h1 style={{ fontSize: "clamp(28px,4.4vw,52px)" }}>{w.t}</h1>
            <div className="meta-rows">
              <div><dt>Client</dt><dd>{w.client}</dd></div>
              <div><dt>Project</dt><dd>{w.project}</dd></div>
              <div><dt>Services</dt><dd>{w.services}</dd></div>
            </div>
            <p className="sub-t" style={{ maxWidth: "62ch" }}>{w.desc}</p>
            <p className="sub-t" style={{ maxWidth: "62ch" }}>
              <strong style={{ fontWeight: 400, color: "#fff" }}>Vio.co role: </strong>{w.role}
            </p>

            <div className="thumbs">
              {["Still","Behind the scenes","Frame"].map((t) => <div key={t} />)}
            </div>
            <p className="note" style={{ textAlign: "left" }}>
              Media slots — drop real video / stills / behind-the-scenes here.
            </p>
          </Reveal>

          <Reveal as="div" style={{ marginTop: 72 }}>
            <div className="eyebrow"><span className="dot" />More work</div>
            <div className="rellist">
              {related.map((r) => (
                <Link className="rel" to={`/work/${r.slug}`} key={r.slug}>
                  <b>{r.t}</b><span>{r.project}</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
