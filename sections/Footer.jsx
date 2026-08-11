"use client";

import { wedding } from "@/lib/config";
import Reveal from "@/components/Reveal";
import { Flourish } from "@/components/Ornaments";

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <Reveal variant="up">
        <p className="footer-mono script">{wedding.monogram}</p>
      </Reveal>
      <Reveal variant="up" delay={0.1}>
        <p className="footer-names script">
          {wedding.groom} &amp; {wedding.bride}
        </p>
      </Reveal>
      <Reveal variant="up" delay={0.15}>
        <div style={{ margin: "1.4rem 0" }}>
          <Flourish width={200} />
        </div>
      </Reveal>
      <Reveal variant="up" delay={0.2}>
        <p className="footer-thanks">
          {wedding.weekday} {wedding.dateLabel} · {wedding.venue.name}, {wedding.venue.city}
        </p>
      </Reveal>
      <p className="footer-fine">{wedding.groom} &amp; {wedding.bride} · {new Date().getFullYear()}</p>
    </footer>
  );
}
