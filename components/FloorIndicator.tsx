"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

// Small lift display: current chapter plus a thin progress bar.
export default function FloorIndicator() {
  const [label, setLabel] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    const update = () => {
      const mid = window.innerHeight * 0.5;
      const current = sections.find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= mid && r.bottom >= mid;
      });
      setLabel(window.scrollY > window.innerHeight * 0.6 ? current?.dataset.chapter ?? null : null);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {label && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-none fixed right-3 top-3 z-50 overflow-hidden rounded-md border border-brass/40 bg-[#0b0806]/80 backdrop-blur-sm sm:right-5 sm:top-5"
        >
          <div className="flex items-center gap-3 px-3 py-2">
            <span className="font-serif text-lg leading-none text-amber drop-shadow-[0_0_6px_rgba(211,138,60,0.8)]">8</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="text-[10px] uppercase tracking-[0.25em] text-cream/85"
              >
                {label}
              </motion.span>
            </AnimatePresence>
          </div>
          <motion.div className="h-px origin-left bg-brass" style={{ scaleX: progress }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
