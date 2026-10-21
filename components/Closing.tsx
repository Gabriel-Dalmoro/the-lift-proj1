"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import LiftDoors from "./LiftDoors";
import Logo from "./Logo";
import SkylineQuote from "./SkylineQuote";

export interface ClosingProps {
  /** Engraves "Une vision de Sabrina" under the logo when the doors close */
  showSabrinaCredit?: boolean;
}

export default function Closing({ showSabrinaCredit = true }: ClosingProps) {
  const doorSectionRef = useRef<HTMLDivElement | null>(null);
  const [doorsClosed, setDoorsClosed] = useState(false);
  const [plaqueVisible, setPlaqueVisible] = useState(false);

  // The end card is pinned: Lyon stays in view through the open doors for a while,
  // then the doors close as you scroll on, and the engraving appears once they meet.
  const { scrollYProgress } = useScroll({ target: doorSectionRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setDoorsClosed(v > 0.4));
  useEffect(() => {
    if (!doorsClosed) {
      setPlaqueVisible(false);
      return;
    }
    const t = setTimeout(() => setPlaqueVisible(true), 2700);
    return () => clearTimeout(t);
  }, [doorsClosed]);

  return (
    <footer aria-label="Conclusion" data-chapter="The Lift" className="relative w-full select-none">
      {/* BEAT 1: her final sentence rises from behind Lyon's skyline */}
      <SkylineQuote />

      {/* BEAT 2: quiet end card, the real lift doors closing over the view */}
      <div ref={doorSectionRef} className="relative h-[220svh]">
        <div className="sticky top-0 flex h-svh min-h-[560px] w-full flex-col overflow-hidden bg-[#0E0B08]">
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-[transform,filter] duration-[2600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: doorsClosed ? "scale(1.06)" : "scale(1)",
              filter: doorsClosed ? "brightness(0.45)" : "brightness(0.95)",
            }}
          >
            <Image
              src="/images/closing-lyon.webp"
              alt="Vue depuis le 8e étage à Lyon"
              fill
              sizes="100vw"
              className="object-cover object-[center_41%]"
            />
          </div>

          {/* The real lift doors, sliding back from left to right */}
          <LiftDoors
            className="absolute inset-0 z-10"
            open={!doorsClosed}
            floor="8"
            arrow={doorsClosed ? "down" : null}
            glow
            duration={2600}
          >
            {/* Engraved on the closed steel */}
            <div
              className="flex h-full items-center justify-center px-4 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                opacity: plaqueVisible ? 1 : 0,
                transform: plaqueVisible ? "scale(1)" : "scale(0.97)",
              }}
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
