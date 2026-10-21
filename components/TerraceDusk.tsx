"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// The terrace, pinned while you scroll: the sunset flows down the picture like evening
// arriving. The sky turns first, then the light reaches the tables and the guests appear.
export default function TerraceDusk() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Edge of the sunset, moving from above the frame to below it.
  const edge = useTransform(scrollYProgress, [0.1, 0.75], [-25, 125]);
  const mask = useMotionTemplate`linear-gradient(to bottom, black ${edge}%, transparent calc(${edge}% + 25%))`;
  const glow = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);
  const zoom = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0.78, 0.92], [0, 1]);
  const lineY = useTransform(scrollYProgress, [0.78, 0.92], [24, 0]);

  return (
    <div ref={ref} className="relative h-[320svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: zoom }}>
          <Image
            src="/images/terrace-day.webp"
            alt="La terrasse végétalisée du Lift en journée, tables dressées"
            fill
            sizes="100vw"
            className="object-cover object-[55%_center]"
          />
          <motion.div className="absolute inset-0" style={{ maskImage: mask, WebkitMaskImage: mask }}>
            <Image
              src="/images/terrace-sunset.webp"
              alt="La même terrasse au coucher du soleil, guirlandes allumées et clients attablés"
              fill
              sizes="100vw"
              className="object-cover object-[55%_center]"
            />
          </motion.div>
        </motion.div>

        {/* Warm evening light settling over the whole scene */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(255,170,90,0.18),transparent_70%)] mix-blend-screen"
          style={{ opacity: glow }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-jungle-deep/30 via-transparent to-jungle/80" />

        <motion.div
          className="absolute inset-x-0 bottom-[16svh] z-10 px-6 text-center"
          style={{ opacity: lineOpacity, y: lineY }}
        >
          <p
            className="mx-auto max-w-[16ch] text-balance font-serif text-4xl font-light italic leading-tight text-cream drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:text-6xl"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 80' }}
          >
            Un ailleurs inattendu, sans jamais quitter Lyon.
          </p>
        </motion.div>

        <span className="absolute bottom-2 right-3 z-10 font-sans text-[10px] italic tracking-wide text-cream/70">
          Visuel d’illustration
        </span>
      </div>
    </div>
  );
}
