"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const FLOORS = [8, 7, 6, 5, 4, 3, 2, 1, 0];

// Leaving: the lift car from the logo rides back down its cable as you scroll.
export default function Descent() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });
  const top = useTransform(progress, [0, 1], ["0%", "100%"]);
  const [passed, setPassed] = useState(0);

  useMotionValueEvent(progress, "change", (v) => setPassed(Math.round(v * (FLOORS.length - 1))));

  return (
    <div ref={ref} className="relative mx-auto h-[95svh] max-w-xs" aria-hidden>
      {/* Cable */}
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-brass/45" />
      <motion.div className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-brass" style={{ height: top }} />

      {/* Floor marks */}
      {FLOORS.map((f, i) => (
        <div
          key={f}
          className="absolute left-1/2 flex -translate-y-1/2 items-center gap-3 pl-8"
          style={{ top: `${(i / (FLOORS.length - 1)) * 100}%` }}
        >
          <span className={`h-px w-3 transition-colors duration-500 ${i <= passed ? "bg-amber" : "bg-brass/40"}`} />
          <span
            className={`font-serif text-sm tabular-nums transition-all duration-500 ${
              i === passed ? "scale-125 text-amber" : i < passed ? "text-brass/70" : "text-brass/35"
            }`}
          >
            {f}
          </span>
        </div>
      ))}

      {/* The car: the "i" of the logo */}
      <motion.div className="absolute left-1/2 -translate-x-1/2 -translate-y-[6px]" style={{ top }}>
        <div className="mx-auto h-[3px] w-7 bg-ink" />
        <div className="mx-auto mt-[5px] h-14 w-[22px] bg-ink shadow-[0_8px_24px_rgba(42,30,22,0.25)]" />
      </motion.div>
    </div>
  );
}
