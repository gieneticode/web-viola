import React from "react";
import { Link } from "react-router-dom";
import { WORK, CATS } from "../data.js";
import { Reveal, WorkArt } from "../components/Bits.jsx";
import { StaggerGrid } from "../components/Premium.jsx";

export default function Work() {
  const [cat, setCat] = React.useState("All");
  const list = cat === "All" ? WORK : WORK.filter((w) => w.cat === cat);

  return (
    <div className="page">
      <section>
        <div className="wrap">
          <Reveal className="center">
            <div className="eyebrow c"><span className="dot" />Our work</div>
            <h2 className="lux-h">Selected projects.</h2>
            <p className="sub-t">Real work untuk real clients. Klik project mana pun untuk full breakdown.</p>
          </Reveal>

          <div className="filters">
            {CATS.map((c) => (
              <button key={c} className={cat === c ? "on" : ""}
                onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>

          {list.length ? (
            <StaggerGrid className="work-grid" style={{ marginTop: 44 }}>
              {list.map((w, i) => (
                <Link to={`/work/${w.slug}`} key={w.slug} className="work"
                  style={{ textDecoration: "none", "--i": i }}>
                  {w.cover
                    ? <img className="work-cover" src={w.cover} alt={w.t} loading="lazy" />
                    : <WorkArt cat={w.cat} />}
                  <span className="sweep" aria-hidden="true" />
                  <span className="cat">{w.cat}</span>
                  <div className="info"><b>{w.t}</b><span>{w.project}</span></div>
                  <span className="go">View →</span>
                </Link>
              ))}
            </StaggerGrid>
          ) : (
            <p className="empty">Belum ada project di kategori ini.</p>
          )}
        </div>
      </section>
    </div>
  );
}
