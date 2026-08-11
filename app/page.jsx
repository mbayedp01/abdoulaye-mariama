"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Petals from "@/components/Petals";
import Intro from "@/components/Intro";
import SoundToggle from "@/components/SoundToggle";

import Hero from "@/sections/Hero";
import Venue from "@/sections/Venue";
import Footer from "@/sections/Footer";

export default function Page() {
  const [started, setStarted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  return (
    <SmoothScroll>
      <div className="grain">
        <Cursor />
        {revealed && <Petals density={20} />}

        <Intro onStarted={() => setStarted(true)} onDone={() => setRevealed(true)} />

        <SoundToggle started={started} />

        <main aria-hidden={!revealed}>
          <Hero reveal={revealed} />
          <Venue />
          <Footer />
        </main>
      </div>
    </SmoothScroll>
  );
}
