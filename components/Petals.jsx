"use client";

import { useEffect, useRef } from "react";

// Floating rose petals + drifting golden particles on a full-screen canvas.
export default function Petals({ density = 26 }) {
  const canvas = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = canvas.current;
    const ctx = cv.getContext("2d");
    let w, h, raf;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const petalColors = ["#e7c6c2", "#f0d9d5", "#d8b978", "#eadfce"];

    const resize = () => {
      w = cv.width = window.innerWidth * dpr;
      h = cv.height = window.innerHeight * dpr;
      cv.style.width = window.innerWidth + "px";
      cv.style.height = window.innerHeight + "px";
    };
    resize();

    const rand = (a, b) => a + Math.random() * (b - a);

    const make = () => ({
      x: rand(0, w),
      y: rand(-h, 0),
      size: rand(6, 15) * dpr,
      speed: rand(0.4, 1.4) * dpr,
      sway: rand(0.5, 2),
      swayPhase: rand(0, Math.PI * 2),
      rot: rand(0, Math.PI * 2),
      rotSpeed: rand(-0.02, 0.02),
      color: petalColors[(Math.random() * petalColors.length) | 0],
      spark: Math.random() < 0.35,
      opacity: rand(0.35, 0.85),
    });

    let items = Array.from({ length: density }, make);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of items) {
        p.y += p.speed;
        p.swayPhase += 0.01;
        p.x += Math.sin(p.swayPhase) * p.sway;
        p.rot += p.rotSpeed;

        if (p.y > h + 40) {
          Object.assign(p, make(), { y: -20 });
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.spark) {
          ctx.shadowBlur = 8 * dpr;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.22, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Petal shape
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 0.5);
          ctx.bezierCurveTo(
            p.size * 0.5,
            -p.size * 0.4,
            p.size * 0.5,
            p.size * 0.4,
            0,
            p.size * 0.6
          );
          ctx.bezierCurveTo(
            -p.size * 0.5,
            p.size * 0.4,
            -p.size * 0.5,
            -p.size * 0.4,
            0,
            -p.size * 0.5
          );
          ctx.fill();
        }
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvas}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 3,
      }}
    />
  );
}
