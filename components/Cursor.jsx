"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const glow = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    document.body.classList.add("custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let gx = mx;
    let gy = my;
    let raf;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.left = mx + "px";
        dot.current.style.top = my + "px";
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      gx += (mx - gx) * 0.08;
      gy += (my - gy) * 0.08;
      if (ring.current) {
        ring.current.style.left = rx + "px";
        ring.current.style.top = ry + "px";
      }
      if (glow.current) {
        glow.current.style.left = gx + "px";
        glow.current.style.top = gy + "px";
      }
      raf = requestAnimationFrame(loop);
    };

    const over = (e) => {
      if (e.target.closest("a, button, .tilt, [data-hover]")) {
        ring.current?.classList.add("hovering");
      }
    };
    const out = (e) => {
      if (e.target.closest("a, button, .tilt, [data-hover]")) {
        ring.current?.classList.remove("hovering");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={glow} className="mouse-glow" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
