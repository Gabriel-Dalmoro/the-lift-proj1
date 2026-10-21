"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import LiftDoors from "./LiftDoors";
import Logo from "./Logo";
import { Heavy, Serif } from "./LogoType";

export interface ClosingProps {
  /** Engraves "Une vision de Sabrina" under the logo when the doors close */
  showSabrinaCredit?: boolean;
}

const FIT = "object-cover object-[center_top]";
// Scroll progress through the pinned ending at which the lift appears and its doors close.
const LIFT_AT = 0.6;

// One pinned scene: Lyon's skyline, her final sentence rising from behind the towers and
// resting above them, then the lift appears over that same view and its doors close.
export default function Closing({ showSabrinaCredit = true }: ClosingProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const textY = useTransform(scrollYProgress, [0.03, 0.38], ["60svh", "0svh"]);
  const zoom = useTransform(scrollYProgress, [0, LIFT_AT], [1.1, 1]);

  const [bgReady, setBgReady] = useState(false);
  const [fgReady, setFgReady] = useState(false);
  const [lift, setLift] = useState<"view" | "frame" | "closed">("view");
  const [engraved, setEngraved] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < LIFT_AT) setLift("view");
    else setLift((l) => (l === "view" ? "frame" : l));
  });

  // The frame fades in around the view first, then the doors slide shut, then the engraving.
  useEffect(() => {
    if (lift === "view") {
      setEngraved(false);
      return;
    }
    if (lift === "frame") {
      const t = setTimeout(() => setLift("closed"), 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setEngraved(true), 2700);
    return () => clearTimeout(t);
  }, [lift]);

  return (
    <footer ref={ref} aria-label="Conclusion" data-chapter="The Lift" className="relative h-[480svh] w-full select-none">
      <div className="sticky top-0 h-svh min-h-[560px] overflow-hidden bg-[#0E0B08]">
        <motion.div className="absolute inset-0" style={{ scale: zoom }}>
          <Image
            src="/images/closing-lyon.webp"
            alt="Lyon au soleil levant : les toits de la Presqu’île et les tours de la Part-Dieu"
            fill
            sizes="100vw"
            loading="eager"
            className={FIT}
            onLoad={() => setBgReady(true)}
          />

          {/* Her final sentence: rises from behind the city and settles in the sky above the towers */}
          <motion.div
            className={`absolute inset-x-0 top-[3svh] px-4 text-center transition-opacity duration-500 sm:px-8 lg:top-[4svh] ${
              bgReady && fgReady ? "opacity-100" : "opacity-0"
            }`}
            style={{ y: textY }}
          >
            <p className="mx-auto max-w-6xl text-balance lg:max-w-[92vw] text-[0.9rem] text-[#2a1a10] [text-shadow:0_0_20px_rgba(255,240,210,0.6)] sm:text-[1.1rem] lg:text-[1.75vw]">
              <Serif>Parce qu’au fond, nos clients oublieront peut-être ce qu’ils ont commandé,</Serif>
              <Heavy>mais jamais la façon dont nous les avons fait se sentir.</Heavy>
            </p>
          </motion.div>

          {/* The city, the towers and the leaves in front: drawn over the text */}
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/images/closing-lyon-fg.webp"
              alt=""
              fill
              sizes="100vw"
              loading="eager"
              className={FIT}
              onLoad={() => setFgReady(true)}
            />
          </div>
        </motion.div>

        {/* The lift appears over the same view, then its doors close */}
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-700 ${lift === "view" ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
          <LiftDoors className="h-full" open={lift !== "closed"} floor="8" arrow={lift === "closed" ? "down" : null} glow duration={2600}>
            {/* Engraved on the closed steel */}
            <div
              className="flex h-full items-center justify-center px-4 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ opacity: engraved ? 1 : 0, transform: engraved ? "scale(1)" : "scale(0.97)" }}
            >
              <div className="flex flex-col items-center gap-5">
                <Logo className="w-44 text-[#2b2017]/75 drop-shadow-[0_1px_0_rgba(255,240,220,0.35)] sm:w-64" cable={60} />
                {showSabrinaCredit && (
                  <p className="font-display text-2xl italic text-[#2b2017]/75 drop-shadow-[0_1px_0_rgba(255,240,220,0.35)] sm:text-3xl">
                    Une vision de Sabrina
                  </p>
                )}
              </div>
            </div>
          </LiftDoors>
        </div>
      </div>
    </footer>
  );
}
