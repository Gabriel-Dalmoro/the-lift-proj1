"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Heavy, Serif } from "./LogoType";

const FIT = "object-cover object-[55%_center]";

// The terrace, pinned while you scroll: the sunset flows down the picture like evening
// arriving. The sky turns first, then the light reaches the tables and the guests appear.
// Then her line rises from behind the terrace wall and the plants standing in front of it.
export default function TerraceDusk() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Edge of the sunset, moving from above the frame to below it.
  const edge = useTransform(scrollYProgress, [0.08, 0.6], [-25, 125]);
  const mask = useMotionTemplate`linear-gradient(to bottom, black ${edge}%, transparent calc(${edge}% + 25%))`;
  const glow = useTransform(scrollYProgress, [0.25, 0.65], [0, 1]);
  const zoom = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  // The foreground cut-out is the sunset picture itself, so it only appears once the sunset is complete.
  const fgOpacity = useTransform(scrollYProgress, [0.6, 0.61], [0, 1]);
  const lineY = useTransform(scrollYProgress, [0.64, 0.95], ["72svh", "0svh"]);
  // The line only switches on once the foreground is fully opaque, so it never shows through it.
  const lineOpacity = useTransform(scrollYProgress, [0.615, 0.62], [0, 1]);
  const [fgReady, setFgReady] = useState(false);

  return (
    <div ref={ref} className="relative h-[380svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: zoom }}>
          <Image src="/images/terrace-day.webp" alt="La terrasse végétalisée du Lift en journée, tables dressées" fill sizes="100vw" className={FIT} />
          <motion.div className="absolute inset-0" style={{ maskImage: mask, WebkitMaskImage: mask }}>
            <Image
              src="/images/terrace-sunset.webp"
              alt="La même terrasse au coucher du soleil, guirlandes allumées et clients attablés"
              fill
              sizes="100vw"
              className={FIT}
            />
          </motion.div>

          {/* Her line, between the background and the foreground */}
          <motion.div
            className={`absolute inset-x-0 top-[29svh] px-6 text-center lg:top-[33svh] ${fgReady ? "" : "invisible"}`}
            style={{ y: lineY, opacity: lineOpacity }}
          >
            <p className="mx-auto max-w-[24em] text-balance text-[1rem] text-cream drop-shadow-[0_2px_22px_rgba(0,0,0,0.65)] sm:text-[1.3rem] lg:text-[1.9vw]">
              <Serif>Un ailleurs inattendu,</Serif>
              <Heavy>sans jamais quitter Lyon.</Heavy>
            </p>
          </motion.div>

          {/* Terrace wall, tables and the plants standing in front: drawn over the text */}
          <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: fgOpacity }}>
            <Image
              src="/images/terrace-fg.webp"
              alt=""
              fill
              sizes="100vw"
              loading="eager"
              className={FIT}
              onLoad={() => setFgReady(true)}
            />
          </motion.div>
        </motion.div>

        {/* Warm evening light settling over the whole scene */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(255,170,90,0.18),transparent_70%)] mix-blend-screen"
          style={{ opacity: glow }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-jungle-deep/30 via-transparent to-jungle/80" />

        <span className="absolute bottom-2 right-3 z-10 font-sans text-[10px] italic tracking-wide text-cream/70">
          Visuel d’illustration
        </span>
      </div>
    </div>
  );
}
