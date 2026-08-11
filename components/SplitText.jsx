"use client";

import { motion } from "framer-motion";

// Word-by-word (and optionally letter) reveal for headings.
export default function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  as = "h2",
  by = "word",
}) {
  const MotionTag = motion[as] || motion.h2;
  const tokens = by === "letter" ? text.split("") : text.split(" ");

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {tokens.map((tok, i) => (
        <span
          key={i}
          aria-hidden
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <motion.span
            style={{ display: "inline-block", willChange: "transform" }}
            variants={{
              hidden: { y: "110%", opacity: 0, rotate: 4 },
              show: { y: "0%", opacity: 1, rotate: 0 },
            }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {tok === " " ? " " : tok}
            {by === "word" ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
