import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { WORK, ABOUT_PHOTOS } from "../data.js";
import { Reveal } from "../components/Bits.jsx";

// Ubah URL YouTube (watch/shorts/youtu.be) jadi URL embed.
// URL video langsung (.mp4/.webm/.mov) dipakai apa adanya via tag <video>.
function toEmbedUrl(url) {
  if (!url) return null;
  const m = String(url).trim().match(
    /(?:youtube\.com\/watch\?[^#]*v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/)([\w-]{6,})/
  );
  return m ? "https://www.youtube.com/embed/" + m[1] : null;
}
function isDirectVideo(url) {
  return /\.(mp4|webm|mov)(\?|#|$)/i.test(String(url || ""));
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const nav = useNavigate();
  const w = WORK.find((x) => x.slug === slug);

  React.useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!w) {
    return (
      <div className="page">
        <div className="wrap center">
          <h2 className="lux-h">Project tidak ditemukan.</h2>
          <p className="sub-t">Project tersebut belum tersedia.</p>
          <div className="hero-act" style={{ justifyContent: "center" }}>
            <Link className="btn primary" to="/work">Back to Work</Link>
          </div>
        </div>
      </div>
    );
  }

  const related = WORK.filter((x) => x.slug !== w.slug).slice(0, 3);
  const vidSrc = toEmbedUrl(w.video);
  const vidDirect = !vidSrc && isDirectVideo(w.video);

  return (
    <div className="page">
      <section>
        <div className="wrap">
          <button className="back" onClick={() => nav(-1)}>← Back</button>

          <Reveal className="heroimg">
            {w.cover && <img src={w.cover} alt={w.t} loading="lazy"
              style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />}
            <div style={{ position:"absolute", inset:0,
              background:"linear-gradient(200deg,transparent 40%,rgba(5,8,15,.9))" }} />
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

            {(vidSrc || vidDirect) && (
              <div style={{ marginTop: 28, borderRadius: 14, overflow: "hidden", background: "#0a0e14" }}>
                {vidSrc ? (
                  <iframe src={vidSrc} title={w.t + " video"}
                    style={{ width: "100%", aspectRatio: "16/9", border: 0, display: "block" }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen loading="lazy" />
                ) : (
                  <video src={w.video} controls preload="metadata"
                    style={{ width: "100%", aspectRatio: "16/9", display: "block", background: "#000" }} />
                )}
              </div>
            )}

            <div className="thumbs">
              {ABOUT_PHOTOS.map((src, i) => (
                <div key={i} style={{ position:"relative", overflow:"hidden", borderRadius:14 }}>
                  <img src={src} alt="" loading="lazy"
                    style={{ width:"100%", height:"100%", objectFit:"cover", position:"absolute", inset:0 }} />
                </div>
              ))}
            </div>
            {!(w.gallery && w.gallery.length) && (
              <p className="note" style={{ textAlign: "left" }}>
                Slot media — taruh real video / stills / behind-the-scenes di sini.
              </p>
            )}
            {w.gallery && w.gallery.length > 0 && (
              <Reveal as="div" style={{ marginTop: 48 }}>
                <h2 className="lux-h" style={{ fontSize: "clamp(22px,3vw,34px)" }}>Behind The Scenes</h2>
                <div className="thumbs" style={{ marginTop: 18 }}>
                  {w.gallery.map((src, i) => (
                    <div key={"g"+i} style={{ position:"relative", overflow:"hidden", borderRadius:14 }}>
                      <img src={src} alt={`Behind the scenes ${i + 1}`} loading="lazy"
                        style={{ width:"100%", height:"100%", objectFit:"cover", position:"absolute", inset:0 }} />
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
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
