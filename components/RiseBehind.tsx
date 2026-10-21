"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";

// Dar Ahlam-style reveal: the picture is pinned while you scroll and the text rises from
// behind its foreground (a parapet, a skyline, plants), drawn as a cut-out over the text.
export default function RiseBehind({
  src,
  fg,
  alt,
  fit,
  height = "h-[300svh]",
  from = "70svh",
  top = "top-[10svh]",
  riseEnd = 0.7,
  overlay,
  caption = true,
  portrait,
  children,
}: {
  src: string;
  /** Same picture, with only the foreground kept (transparent elsewhere) */
  fg: string;
  alt: string;
  /** object-fit / object-position classes, identical for both layers */
  fit: string;
  height?: string;
  /** How far below its resting place the text starts */
  from?: string;
  /** Resting place of the text */
  top?: string;
  /** Scroll progress at which the text has fully risen; the rest is a hold */
  riseEnd?: number;
  overlay?: string;
  caption?: boolean;
  /** Width/height of a portrait picture: on large screens it is shown whole, as a
   *  full-height panel with side borders, instead of being zoomed to fill the width. */
  portrait?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const textY = useTransform(scrollYProgress, [0.04, riseEnd], [from, "0svh"]);
  const zoom = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  // Never show the text before both the picture and the cut-out in front of it have loaded.
  const [fgReady, setFgReady] = useState(false);
  const [bgReady, setBgReady] = useState(false);

  return (
    <div ref={ref} className={`relative ${height}`}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <div
          className={`relative mx-auto h-full overflow-hidden ${portrait ? "lg:w-[calc(100svh*var(--portrait))]" : ""}`}
          style={portrait ? ({ "--portrait": portrait } as React.CSSProperties) : undefined}
        >
        <motion.div className="absolute inset-0" style={{ scale: zoom }}>
          <Image src={src} alt={alt} fill sizes="100vw" loading="eager" className={fit} onLoad={() => setBgReady(true)} />

          <motion.div
            className={`absolute inset-x-0 ${top} px-6 text-center transition-opacity duration-500 ${fgReady && bgReady ? "opacity-100" : "opacity-0"}`}
            style={{ y: textY }}
          >
            {children}
          </motion.div>

          <div className="pointer-events-none absolute inset-0">
            <Image src={fg} alt="" fill sizes="100vw" loading="eager" className={fit} onLoad={() => setFgReady(true)} />
          </div>
          {overlay && <div className={`pointer-events-none absolute inset-0 ${overlay}`} />}
        </motion.div>
        </div>

        {caption && (
          <span className="absolute bottom-2 right-3 z-10 font-sans text-[10px] italic tracking-wide text-cream/70">
            Visuel d’illustration
          </span>
        )}
      </div>
    </div>
  );
}
