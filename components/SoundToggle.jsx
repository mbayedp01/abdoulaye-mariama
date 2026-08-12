"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const START_AT = 50; // démarrer la musique à la 50e seconde

// Lecteur audio : la musique démarre automatiquement à 50s dès que
// l'utilisateur ouvre l'enveloppe (le clic autorise la lecture).
// Le bouton permet de couper / relancer le son.
export default function SoundToggle({ started }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const triggered = useRef(false);

  const seekToStart = (a) => {
    try {
      a.currentTime = START_AT;
    } catch (_) {}
  };

  const playFrom50 = () => {
    const a = audioRef.current;
    if (!a) return;
    const go = () => {
      seekToStart(a);
      a.volume = 0;
      a
        .play()
        .then(() => {
          setPlaying(true);
          // fondu d'entrée en douceur
          let v = 0;
          const id = setInterval(() => {
            v = Math.min(0.85, v + 0.05);
            a.volume = v;
            if (v >= 0.85) clearInterval(id);
          }, 90);
        })
        .catch(() => setPlaying(false));
    };
    if (a.readyState >= 1) go();
    else a.addEventListener("loadedmetadata", go, { once: true });
  };

  // Démarrage auto à l'ouverture (automatique) de l'enveloppe
  useEffect(() => {
    if (started && !triggered.current) {
      triggered.current = true;
      playFrom50();
    }
  }, [started]);

  // Filet de sécurité : si le navigateur bloque la lecture automatique
  // (pas de clic délibéré), on démarre la musique au premier geste de
  // l'utilisateur (toucher, clic, molette, touche).
  useEffect(() => {
    const kickstart = () => {
      const a = audioRef.current;
      if (a && a.paused) playFrom50();
    };
    const evts = ["pointerdown", "touchstart", "keydown", "wheel"];
    evts.forEach((e) => window.addEventListener(e, kickstart, { once: true, passive: true }));
    return () => evts.forEach((e) => window.removeEventListener(e, kickstart));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Boucle FLUIDE à partir de la 50e seconde (au lieu de reprendre à 0)
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => {
      if (a.duration && a.currentTime >= a.duration - 0.3) {
        seekToStart(a);
      }
    };
    const onEnded = () => {
      seekToStart(a);
      a.play().catch(() => {});
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnded);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnded);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      if (a.currentTime < START_AT) seekToStart(a);
      a.volume = 0.85;
      a.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/Nakupenda.mp3" preload="auto" />
      <motion.button
        onClick={toggle}
        aria-label={playing ? "Couper la musique" : "Activer la musique"}
        aria-pressed={playing}
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
          background: "rgba(255,255,255,0.65)",
          border: "1px solid rgba(168,132,47,0.28)",
          backdropFilter: "blur(10px)",
          color: "var(--gold-deep)",
          pointerEvents: started ? "auto" : "none",
        }}
        data-hover
      >
        <span style={{ display: "flex", alignItems: "center", gap: 2, height: 16 }}>
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              style={{ width: 2.4, background: "currentColor", borderRadius: 2 }}
              animate={playing ? { height: [5, 15, 8, 16, 6][i % 5] || 8 } : { height: 4 }}
              transition={{
                duration: 0.55,
                repeat: playing ? Infinity : 0,
                repeatType: "reverse",
                delay: i * 0.12,
              }}
            />
          ))}
        </span>
      </motion.button>
    </>
  );
}
