"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

// ── Crescent + mosque (top emblem) ──────────────────────
export function CrescentMosque({ size = 72 }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: EASE }}
      aria-hidden
    >
      <path
        d="M40 8a22 22 0 1 0 16 37 18 18 0 1 1-16-37Z"
        fill="url(#gold-grad)"
        opacity="0.9"
      />
      <g stroke="var(--gold-deep)" strokeWidth="1.3" fill="none" strokeLinecap="round">
        <path d="M20 54V40c0-6 5-10 12-10s12 4 12 10v14" />
        <path d="M32 30c3-4 3-8 0-11-3 3-3 7 0 11Z" fill="var(--gold-soft)" />
        <path d="M32 19v-4" />
        <path d="M16 54h32" />
        <path d="M26 54v-8a6 6 0 0 1 12 0v8" />
      </g>
      <defs>
        <linearGradient id="gold-grad" x1="0" y1="0" x2="64" y2="64">
          <stop stopColor="var(--gold-soft)" />
          <stop offset="1" stopColor="var(--gold-deep)" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

// ── Small mosque line icon ──────────────────────────────
export function MosqueLine({ size = 54 }) {
  return (
    <svg width={size} height={size * 0.72} viewBox="0 0 64 46" fill="none" aria-hidden>
      <g stroke="var(--gold-deep)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 44V24c0-8 6-14 14-14h24c8 0 14 6 14 14v20" />
        <path d="M32 10c4-5 4-9 0-13-4 4-4 8 0 13Z" fill="var(--gold-soft)" opacity="0.5" />
        <path d="M32 -3" />
        <path d="M2 44h60" />
        <path d="M14 44V30M50 44V30" />
        <path d="M24 44V34a8 8 0 0 1 16 0v10" />
        <circle cx="32" cy="20" r="0" />
      </g>
    </svg>
  );
}

// ── Ornamental divider (leafy flourish) ─────────────────
export function Flourish({ width = 220 }) {
  return (
    <motion.svg
      width={width}
      height="20"
      viewBox="0 0 220 20"
      fill="none"
      initial={{ opacity: 0, scaleX: 0.4 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: EASE }}
      aria-hidden
      style={{ display: "block", margin: "0 auto" }}
    >
      <g stroke="var(--gold)" strokeWidth="1" fill="none" strokeLinecap="round">
        <path d="M10 10h78" />
        <path d="M210 10h-78" />
        <path d="M96 10c4-4 8-4 10 0-2 4-6 4-10 0Z" fill="var(--gold-soft)" />
        <path d="M124 10c-4-4-8-4-10 0 2 4 6 4 10 0Z" fill="var(--gold-soft)" />
        <circle cx="110" cy="10" r="2.4" fill="var(--gold)" stroke="none" />
        <path d="M88 10c-3-3-6-2-6-6M132 10c3-3 6-2 6-6" />
        <path d="M88 10c-3 3-6 2-6 6M132 10c3 3 6 2 6 6" />
      </g>
    </motion.svg>
  );
}

// ── Floral corner (roses + gilded leaves), poster-style ──
export function FloralCorner({ position = "tl" }) {
  const transforms = {
    tl: "none",
    tr: "scaleX(-1)",
    bl: "scaleY(-1)",
    br: "scale(-1,-1)",
  };
  const pos = {
    tl: { top: 0, left: 0 },
    tr: { top: 0, right: 0 },
    bl: { bottom: 0, left: 0 },
    br: { bottom: 0, right: 0 },
  };
  return (
    <motion.div
      className="floral"
      style={{ position: "absolute", transform: transforms[position], ...pos[position] }}
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.8, ease: EASE, delay: 0.3 }}
      aria-hidden
    >
      <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
        <defs>
          <radialGradient id="rose1" cx="0.4" cy="0.4" r="0.7">
            <stop stopColor="#ffffff" />
            <stop offset="0.6" stopColor="#f6efe0" />
            <stop offset="1" stopColor="#e6d5b8" />
          </radialGradient>
          <linearGradient id="leafGold" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#d8b978" />
            <stop offset="1" stopColor="#a8842f" />
          </linearGradient>
          <linearGradient id="leafSage" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#a7b5a0" />
            <stop offset="1" stopColor="#7d8c73" />
          </linearGradient>
        </defs>

        {/* Gilded sprigs */}
        <g stroke="url(#leafGold)" strokeWidth="1.4" fill="none" opacity="0.9">
          <path d="M40 40C90 60 130 90 150 150" />
          <path d="M40 40C70 40 100 55 120 80" />
        </g>
        {[...Array(7)].map((_, i) => {
          const t = i / 6;
          const x = 40 + t * 110;
          const y = 40 + t * 110;
          return (
            <ellipse
              key={"g" + i}
              cx={x}
              cy={y}
              rx="12"
              ry="5"
              fill="url(#leafGold)"
              opacity="0.85"
              transform={`rotate(${-35 + i * 8} ${x} ${y})`}
            />
          );
        })}

        {/* Sage leaves */}
        {[...Array(5)].map((_, i) => {
          const x = 60 + i * 22;
          const y = 130 + i * 26;
          return (
            <ellipse
              key={"s" + i}
              cx={x}
              cy={y}
              rx="16"
              ry="7"
              fill="url(#leafSage)"
              opacity="0.8"
              transform={`rotate(${20 + i * 12} ${x} ${y})`}
            />
          );
        })}

        {/* White roses */}
        {[
          { cx: 55, cy: 55, r: 46 },
          { cx: 140, cy: 40, r: 30 },
          { cx: 45, cy: 140, r: 28 },
        ].map((rose, ri) => (
          <g key={"r" + ri}>
            <circle cx={rose.cx} cy={rose.cy} r={rose.r} fill="url(#rose1)" />
            <g stroke="#e3d3b6" strokeWidth="1" fill="none" opacity="0.7">
              <circle cx={rose.cx} cy={rose.cy} r={rose.r * 0.72} />
              <circle cx={rose.cx} cy={rose.cy} r={rose.r * 0.46} />
              <circle cx={rose.cx} cy={rose.cy} r={rose.r * 0.22} />
              <path d={`M${rose.cx} ${rose.cy - rose.r} A ${rose.r} ${rose.r} 0 0 1 ${rose.cx + rose.r} ${rose.cy}`} />
              <path d={`M${rose.cx} ${rose.cy + rose.r} A ${rose.r} ${rose.r} 0 0 1 ${rose.cx - rose.r} ${rose.cy}`} />
            </g>
          </g>
        ))}

        {/* Baby's breath dots */}
        {[...Array(12)].map((_, i) => (
          <circle
            key={"d" + i}
            cx={120 + Math.cos(i) * 60 + i * 4}
            cy={90 + Math.sin(i * 1.7) * 70 + i * 3}
            r="2"
            fill="#fff"
            opacity="0.85"
          />
        ))}
      </svg>
    </motion.div>
  );
}

// ── Soft animated light rays ────────────────────────────
export function LightRays() {
  return (
    <div className="light-rays" aria-hidden>
      <span />
      <span />
      <span />
    </div>
  );
}
