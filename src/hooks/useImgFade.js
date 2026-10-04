import React from "react";

/* Gambar fade-in halus saat selesai load — dipasang global via hook */
export default function useImgFade() {
  React.useEffect(() => {
    const mark = (img) => {
      if (img.complete && img.naturalWidth > 0) img.classList.add("loaded");
      else img.addEventListener("load", () => img.classList.add("loaded"), { once: true });
    };
    document.querySelectorAll("img:not(.loaded)").forEach(mark);
    const mo = new MutationObserver((muts) => {
      muts.forEach((m) =>
        m.addedNodes.forEach((n) => {
          if (n.tagName === "IMG") mark(n);
          else if (n.querySelectorAll) n.querySelectorAll("img").forEach(mark);
        })
      );
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);
}
