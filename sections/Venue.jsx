"use client";

import { wedding } from "@/lib/config";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import Tilt from "@/components/Tilt";
import { Flourish, MosqueLine } from "@/components/Ornaments";

export default function Venue() {
  const v = wedding.venue;
  return (
    <section className="section location" id="lieu">
      <div className="wrap">
        <div className="head">
          <Reveal variant="up">
            <MosqueLine size={64} />
          </Reveal>
          <Reveal variant="up" delay={0.05}>
            <span className="script loc-script">Le lieu de la cérémonie</span>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <Flourish width={220} />
          </Reveal>
        </div>

        <div className="venue-grid">
          <Reveal variant="left">
            <Tilt max={6}>
              <div className="venue-map">
                <iframe
                  src={v.mapEmbed}
                  title={`Carte — ${v.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Tilt>
          </Reveal>

          <Reveal variant="right" delay={0.1}>
            <div className="loc-info">
              <p className="eyebrow">{v.city}</p>
              <h2>{v.name}</h2>
              <p className="loc-when serif">
                {wedding.weekday} {wedding.dateLabel}
              </p>
              <p className="muted loc-addr">{v.address}</p>
              <Magnetic strength={0.35}>
                <a
                  href={v.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold sheen"
                  data-hover
                >
                  Obtenir l'itinéraire
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
