"use client";

import { motion } from "framer-motion";
import { wedding } from "@/lib/config";
import {
  CrescentMosque,
  MosqueLine,
  Flourish,
  FloralCorner,
  LightRays,
} from "@/components/Ornaments";

const EASE = [0.22, 1, 0.36, 1];

export default function Hero({ reveal }) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.1, ease: EASE },
    },
  };

  return (
    <section className="invitation" id="invitation">
      <LightRays />

      {/* Cadre doré + coins fleuris (façon affiche) */}
      <div className="invite-frame" aria-hidden />
      <FloralCorner position="tl" />
      <FloralCorner position="br" />

      <motion.div
        className="invite-inner"
        variants={container}
        initial="hidden"
        animate={reveal ? "show" : "hidden"}
      >
        <motion.div variants={item} className="emblem">
          <CrescentMosque size={76} />
        </motion.div>

        <motion.p variants={item} className="inv-blessing">
          {wedding.blessing}
        </motion.p>

        <motion.div variants={item} className="inv-heart" aria-hidden>
          ♡
        </motion.div>

        <motion.p variants={item} className="inv-invite">
          {wedding.invite}
        </motion.p>

        {/* Noms — écriture anglaise (cursive) */}
        <h1 className="inv-names" aria-label={`${wedding.groom} et ${wedding.bride}`}>
          <motion.span variants={item} className="script inv-name">
            {wedding.groom}
          </motion.span>
          <motion.span variants={item} className="script inv-amp">
            &amp;
          </motion.span>
          <motion.span variants={item} className="script inv-name">
            {wedding.bride}
          </motion.span>
        </h1>

        <motion.div variants={item}>
          <Flourish width={240} />
        </motion.div>

        <motion.p variants={item} className="inv-takku">
          {wedding.takku}
        </motion.p>

        <motion.div variants={item}>
          <Flourish width={200} />
        </motion.div>

        <motion.p variants={item} className="inv-weekday">
          {wedding.weekday}
        </motion.p>
        <motion.p variants={item} className="inv-date">
          {wedding.dateLabel}
        </motion.p>

        <motion.div variants={item} className="inv-mosque">
          <MosqueLine size={58} />
        </motion.div>

        <motion.p variants={item} className="inv-city">
          {wedding.venue.city}
        </motion.p>
        <motion.p variants={item} className="inv-venue">
          {wedding.venue.name}
        </motion.p>

        <motion.div variants={item} className="inv-heart small" aria-hidden>
          ♡
        </motion.div>

        <motion.p variants={item} className="inv-closing">
          {wedding.closing}
        </motion.p>
      </motion.div>

      <motion.a
        href="#lieu"
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={reveal ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1 }}
        aria-label="Voir la localisation"
        data-hover
      >
        <span>Localisation</span>
        <span className="scroll-line" />
      </motion.a>
    </section>
  );
}
