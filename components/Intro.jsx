"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wedding } from "@/lib/config";
import { CrescentMosque, Flourish } from "@/components/Ornaments";

const EASE = [0.22, 1, 0.36, 1];

export default function Intro({ onStarted, onDone }) {
  // loading -> ready (enveloppe) -> opening -> gone
  const [phase, setPhase] = useState("loading");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (phase !== "loading") return;
    let n = 0;
    const id = setInterval(() => {
      n += Math.random() * 9 + 3;
      if (n >= 100) {
        n = 100;
        clearInterval(id);
        setTimeout(() => setPhase("ready"), 600);
      }
      setCount(Math.floor(n));
    }, 85);
    return () => clearInterval(id);
  }, [phase]);

  const open = () => {
    if (phase !== "ready") return;
    setPhase("opening");
    onStarted?.();
    setTimeout(() => onDone?.(), 2800);
    setTimeout(() => setPhase("gone"), 3600);
  };

  const opening = phase === "opening";

  return (
    <AnimatePresence>
      {phase !== "gone" && (
        <motion.div
          className="intro"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="intro-glow" aria-hidden />

          {/* ── Loader clair ── */}
          <AnimatePresence>
            {phase === "loading" && (
              <motion.div
                className="loader"
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.1, ease: EASE }}
                  style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}
                >
                  <CrescentMosque size={60} />
                </motion.div>
                <motion.p
                  className="script loader-name"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
                >
                  {wedding.groom} &amp; {wedding.bride}
                </motion.p>
                <div className="loader-bar">
                  <motion.span style={{ width: `${count}%` }} transition={{ ease: "linear" }} />
                </div>
                <p className="loader-count">{count}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Pochette + carte qui sort ── */}
          {phase !== "loading" && (
            <motion.div
              className="stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9 }}
            >
              <motion.button
                className="sleeve"
                onClick={open}
                aria-label="Ouvrir l'invitation"
                data-hover
                initial={{ scale: 0.82, y: 46, opacity: 0 }}
                animate={
                  opening
                    ? { scale: 1.04, y: -6, opacity: 1 }
                    : { scale: 1, y: [0, -12, 0], opacity: 1 }
                }
                transition={
                  opening
                    ? { duration: 1.6, ease: EASE }
                    : {
                        scale: { duration: 1.1, ease: EASE },
                        opacity: { duration: 1.1 },
                        y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                      }
                }
              >
                {/* Dos de la pochette */}
                <div className="sleeve-back" />

                {/* La carte d'invitation qui glisse vers le haut et sort */}
                <motion.div
                  className="sleeve-card"
                  initial={{ y: 0 }}
                  animate={
                    opening
                      ? { y: "-72%", scale: 1.03 }
                      : { y: 0, scale: 1 }
                  }
                  transition={{ duration: 1.7, delay: 0.5, ease: EASE }}
                >
                  <div className="sc-top">
                    <CrescentMosque size={40} />
                  </div>
                  <span className="sc-label">Vous êtes convié(e) au mariage de</span>
                  <span className="script sc-names">
                    {wedding.groom} &amp; {wedding.bride}
                  </span>
                  <Flourish width={150} />
                  <span className="sc-takku">{wedding.takku}</span>
                  <span className="sc-date">{wedding.dateLabel}</span>
                  <span className="sc-city">{wedding.venue.city} · {wedding.venue.name}</span>
                </motion.div>

                {/* Devant de la pochette (poche) */}
                <div className="sleeve-front">
                  <span className="sleeve-band" />
                  {/* Sceau doré sur la poche */}
                  <motion.span
                    className="sleeve-seal"
                    animate={
                      opening
                        ? { scale: [1, 1.15, 0], opacity: [1, 1, 0], rotate: [0, -8, 24] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    {wedding.monogram}
                  </motion.span>
                </div>

                {/* Éclats du sceau */}
                {opening &&
                  Array.from({ length: 12 }).map((_, i) => (
                    <motion.span
                      key={"sh" + i}
                      className="sleeve-shard"
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{
                        x: Math.cos((i / 12) * Math.PI * 2) * 100,
                        y: Math.sin((i / 12) * Math.PI * 2) * 100,
                        opacity: 0,
                        scale: 0.25,
                        rotate: 200,
                      }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                    />
                  ))}

                {/* Étincelles dorées */}
                {opening &&
                  Array.from({ length: 20 }).map((_, i) => (
                    <motion.span
                      key={"sp" + i}
                      className="sleeve-spark"
                      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                      animate={{
                        x: (Math.random() - 0.5) * 320,
                        y: (Math.random() - 0.5) * 380 - 60,
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0.3],
                      }}
                      transition={{ duration: 1.5, delay: 0.3 + Math.random() * 0.5, ease: "easeOut" }}
                    />
                  ))}
              </motion.button>

              {phase === "ready" && (
                <motion.p
                  className="sleeve-hint"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 1 }}
                >
                  Touchez pour ouvrir l'invitation
                </motion.p>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
