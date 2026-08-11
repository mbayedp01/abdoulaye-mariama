"use client";

import { motion } from "framer-motion";

const variants = {
  up: { hidden: { opacity: 0, y: 46 }, show: { opacity: 1, y: 0 } },
  blur: {
    hidden: { opacity: 0, y: 30, filter: "blur(14px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  scale: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } },
  left: { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0 } },
};

export default function Reveal({
  children,
  variant = "blur",
  delay = 0,
  duration = 1,
  className,
  as = "div",
  amount = 0.3,
}) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants[variant]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
