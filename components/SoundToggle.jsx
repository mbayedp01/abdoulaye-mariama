"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Ambient sound toggle. Uses the Web Audio API to synthesize a soft, looping
// pad so the project stays 100% self-contained (no external audio files).
export default function SoundToggle({ started }) {
  const [on, setOn] = useState(false);
  const ctxRef = useRef(null);
  const nodesRef = useRef(null);

  const build = () => {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // Two detuned oscillators + gentle LFO for a warm romantic drone.
    const freqs = [220, 277.18, 329.63]; // A3 · C#4 · E4 (A major)
    const oscs = freqs.map((f, i) => {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.16 / (i + 1);
      o.connect(g).connect(master);
      o.start();
      return o;
    });

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 4;
    lfo.connect(lfoGain).connect(oscs[0].frequency);
    lfo.start();

    return { ctx, master, oscs, lfo };
  };

  const toggle = async () => {
    if (!ctxRef.current) {
      nodesRef.current = build();
      ctxRef.current = nodesRef.current?.ctx || null;
    }
    const ctx = ctxRef.current;
    if (!ctx) return;
    if (ctx.state === "suspended") await ctx.resume();

    const g = nodesRef.current.master.gain;
    const now = ctx.currentTime;
    g.cancelScheduledValues(now);
    if (on) {
      g.linearRampToValueAtTime(0, now + 1.2);
    } else {
      g.setValueAtTime(g.value, now);
      g.linearRampToValueAtTime(0.5, now + 2);
    }
    setOn(!on);
  };

  useEffect(() => {
    return () => {
      try {
        ctxRef.current?.close();
      } catch (_) {}
    };
  }, []);

  return (
    <motion.button
      onClick={toggle}
      aria-label={on ? "Couper le son d'ambiance" : "Activer le son d'ambiance"}
      aria-pressed={on}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: started ? 1 : 0, y: started ? 0 : -10 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      style={{
        position: "fixed",
        top: "clamp(1rem, 3vw, 1.8rem)",
        right: "clamp(1rem, 3vw, 1.8rem)",
        zIndex: 60,
        width: 46,
        height: 46,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        background: "rgba(255,255,255,0.55)",
        border: "1px solid rgba(42,37,33,0.14)",
        backdropFilter: "blur(10px)",
        color: "var(--gold-deep)",
      }}
      data-hover
    >
      <span style={{ display: "flex", alignItems: "center", gap: 2, height: 16 }}>
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            style={{ width: 2.4, background: "currentColor", borderRadius: 2 }}
            animate={
              on
                ? { height: [4, 15, 7, 16, 5][i % 5] || 8 }
                : { height: 4 }
            }
            transition={{
              duration: 0.6,
              repeat: on ? Infinity : 0,
              repeatType: "reverse",
              delay: i * 0.12,
            }}
          />
        ))}
      </span>
    </motion.button>
  );
}
