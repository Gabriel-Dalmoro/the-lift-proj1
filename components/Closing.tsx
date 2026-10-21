"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import LiftDoors from "./LiftDoors";
import Logo from "./Logo";

export interface ClosingProps {
  /** Flip to true if Sabrina approves adding "une vision de Sabrina" */
  showSabrinaCredit?: boolean;
}

export default function Closing({ showSabrinaCredit = false }: ClosingProps) {
  const doorSectionRef = useRef<HTMLDivElement | null>(null);
  const quoteRef = useRef<HTMLDivElement | null>(null);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [doorsClosed, setDoorsClosed] = useState(false);
  const [plaqueVisible, setPlaqueVisible] = useState(false);

  // Observer 1: Reveal final hospitality sentence alone on screen
  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setQuoteVisible(true);
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Observer 2: Softly close the lift doors when scrolling into the end card
  useEffect(() => {
    const el = doorSectionRef.current;
    if (!el) return;
    let plaqueTimer: ReturnType<typeof setTimeout> | undefined;
    const obs = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(plaqueTimer);
        if (entry.isIntersecting) {
          setDoorsClosed(true);
          plaqueTimer = setTimeout(() => setPlaqueVisible(true), 2500);
        } else {
          setDoorsClosed(false);
          setPlaqueVisible(false);
        }
      },
      { threshold: 0.45 }
    );
    obs.observe(el);
    return () => {
      clearTimeout(plaqueTimer);
      obs.disconnect();
    };
  }, []);

  return (
    <footer aria-label="Conclusion" data-chapter="The Lift" className="relative w-full select-none">
      {/* ===================================================================
          BEAT 1: HER FINAL SENTENCE ALONE ON SCREEN
         =================================================================== */}
      <div
        ref={quoteRef}
        className="relative flex min-h-svh w-full items-center justify-center bg-cream px-6 py-24 text-center sm:px-12"
      >
        <div
          className="mx-auto max-w-4xl transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            opacity: quoteVisible ? 1 : 0,
            transform: quoteVisible ? "translateY(0px)" : "translateY(28px)",
          }}
        >
          <div className="mx-auto mb-10 h-12 w-[1px] bg-gradient-to-b from-transparent via-[#B89758] to-[#B89758]" />

          <blockquote className="font-serif text-3xl leading-[1.28] font-light tracking-[-0.01em] text-[#1C1917] sm:text-5xl md:text-[3.35rem]">
            «{" "}Parce qu’au fond, nos clients oublieront peut-être ce qu’ils ont commandé, mais jamais la façon
            dont nous les avons fait se sentir.{" "}»
          </blockquote>

          <div className="mx-auto mt-10 h-12 w-[1px] bg-gradient-to-b from-[#B89758] to-transparent" />
        </div>
      </div>

      {/* ===================================================================
          BEAT 2: QUIET END CARD — BRASS LIFT DOORS CLOSING SOFTLY
         =================================================================== */}
      <div ref={doorSectionRef} className="relative flex h-svh min-h-[560px] w-full flex-col overflow-hidden bg-[#0E0B08]">
        {/* Background Lyon Rooftop Glimpse (Visible before doors finish closing) */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-transform duration-[2600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: doorsClosed ? "scale(1.06)" : "scale(1)",
            filter: doorsClosed ? "brightness(0.4)" : "brightness(0.75)",
          }}
        >
          <Image
            src="/images/closing-lyon.webp"
            alt="Vue depuis le 8e étage à Lyon"
            fill
            sizes="100vw"
            className="object-cover object-center"
            style={{ filter: "sepia(14%) saturate(110%) contrast(102%)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(20,15,10,0.45) 0%, rgba(10,8,6,0.9) 100%)",
            }}
          />
        </div>

        {/* THE REAL LIFT DOORS, CLOSING SOFTLY (they slide back from left to right) */}
        <LiftDoors
          className="absolute inset-0 z-10"
          open={!doorsClosed}
          floor="8"
          arrow={doorsClosed ? "down" : null}
          glow
          duration={2600}
        >
          {/* The logo appears on the closed steel, like an engraving */}
          <div
            className="flex h-full items-center justify-center px-4 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              opacity: plaqueVisible ? 1 : 0,
              transform: plaqueVisible ? "scale(1)" : "scale(0.97)",
            }}
          >
            <div className="flex flex-col items-center gap-4">
              <Logo
                className="w-44 text-[#2b2017]/75 drop-shadow-[0_1px_0_rgba(255,240,220,0.35)] sm:w-64"
                cable={60}
              />
              {showSabrinaCredit && (
                <p className="font-serif text-sm italic tracking-[0.08em] text-[#2b2017]/70">une vision de Sabrina</p>
              )}
            </div>
          </div>
        </LiftDoors>
      </div>
    </footer>
  );
}
