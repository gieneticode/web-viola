import { useEffect, useRef } from "react";

/* Premium custom cursor: small dot that snaps + large ring that follows */
export default function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  const pos  = useRef({ x: 0, y: 0 });
  const aim  = useRef({ x: 0, y: 0 });
  const raf  = useRef(null);

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.transform =
          `translate(${e.clientX}px,${e.clientY}px)`;
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;
    const loop = () => {
      aim.current.x = lerp(aim.current.x, pos.current.x, 0.11);
      aim.current.y = lerp(aim.current.y, pos.current.y, 0.11);
      if (ring.current) {
        ring.current.style.transform =
          `translate(${aim.current.x}px,${aim.current.y}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };

    const grow = () => { ring.current?.classList.add("big"); dot.current?.classList.add("hide"); };
    const shrink = () => { ring.current?.classList.remove("big"); dot.current?.classList.remove("hide"); };
    const press = () => ring.current?.classList.add("press");
    const release = () => ring.current?.classList.remove("press");

    document.addEventListener("mousemove", move);
    document.addEventListener("mousedown", press);
    document.addEventListener("mouseup", release);
    document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    raf.current = requestAnimationFrame(loop);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousedown", press);
      document.removeEventListener("mouseup", release);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  /* hide on touch devices */
  if (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0) return null;

  return (
    <>
      <div ref={dot}  className="cur-dot"  aria-hidden="true" />
      <div ref={ring} className="cur-ring" aria-hidden="true" />
    </>
  );
}
