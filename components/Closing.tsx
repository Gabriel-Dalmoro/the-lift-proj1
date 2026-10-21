"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BrassDoor, BrassJamb, BrassSill, BrassTransom } from "./BrassDoor";
import Logo from "./Logo";

export interface ClosingProps {
  /** Flip to true if Sabrina approves adding "une vision de Sabrina" */
  showSabrinaCredit?: boolean;
}

const CLOSE_TRANSITION = "transform 2400ms cubic-bezier(0.65, 0, 0.35, 1)";

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

  // Observer 2: Softly close the brass lift doors when scrolling into the end card
  useEffect(() => {
    const el = doorSectionRef.current;
    if (!el) return;
    let plaqueTimer: ReturnType<typeof setTimeout> | undefined;
    const obs = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(plaqueTimer);
        if (entry.isIntersecting) {
          setDoorsClosed(true);
          plaqueTimer = setTimeout(() => setPlaqueVisible(true), 2100);
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

        {/* TOP BRONZE ARCHITECTURAL TRANSOM HEADER */}
        <BrassTransom className="h-20 sm:h-24">
          <div
            className="flex items-center gap-3 rounded-sm border border-[#7A5E32]/65 px-5 py-1.5"
            style={{
              background: "linear-gradient(180deg, #090807 0%, #120F0B 100%)",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.95)",
            }}
          >
            <span
              className="font-serif text-lg tracking-widest text-[#F4D493]"
              style={{ textShadow: "0 0 14px rgba(247, 219, 154, 0.75)" }}
            >
              8
            </span>
            <span className="h-3 w-[1px] bg-[#5C4B32]/50" />
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-[#C9A66B]/80">Lyon · 8ᵉ étage</span>
          </div>
        </BrassTransom>

        {/* ELEVATOR SHAFT & TWIN CLOSING BRASS DOORS */}
        <div className="relative flex flex-1 w-full overflow-hidden">
          <BrassJamb side="left" />

          {/* DOORS STAGE */}
          <div className="relative flex flex-1 h-full overflow-hidden">
            <BrassDoor
              side="left"
              transform={doorsClosed ? "translate3d(0%, 0, 0)" : "translate3d(-92%, 0, 0)"}
              transition={CLOSE_TRANSITION}
            />
            <BrassDoor
              side="right"
              transform={doorsClosed ? "translate3d(0%, 0, 0)" : "translate3d(92%, 0, 0)"}
              transition={CLOSE_TRANSITION}
            />

            {/* CENTER ENGRAVED BRASS PLAQUE — Fades in once doors kiss */}
            <div
              className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                opacity: plaqueVisible ? 1 : 0,
                transform: plaqueVisible ? "scale(1)" : "scale(0.96)",
              }}
            >
              <div
                className="relative flex flex-col items-center border border-[#E8C98E]/60 px-10 py-8 text-center sm:px-16 sm:py-11"
                style={{
                  background: "linear-gradient(145deg, #16110B 0%, #0E0B07 55%, #1A140C 100%)",
                  boxShadow:
                    "0 25px 60px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,232,185,0.35), 0 0 0 1px rgba(0,0,0,0.8)",
                }}
              >
                {/* Corner Brass Rivet Accents */}
                <span className="absolute top-2.5 left-2.5 h-1 w-1 rounded-full bg-[#D8B77A]/70" />
                <span className="absolute top-2.5 right-2.5 h-1 w-1 rounded-full bg-[#D8B77A]/70" />
                <span className="absolute bottom-2.5 left-2.5 h-1 w-1 rounded-full bg-[#D8B77A]/70" />
                <span className="absolute bottom-2.5 right-2.5 h-1 w-1 rounded-full bg-[#D8B77A]/70" />

                <span className="mb-4 font-sans text-[10px] tracking-[0.38em] uppercase text-[#C8A464]/80">
                  8ᵉ ÉTAGE · LYON
                </span>

                <Logo
                  className="w-40 text-[#F5DEB0] drop-shadow-[0_2px_18px_rgba(216,183,122,0.35)] sm:w-56"
                  cable={40}
                />

                {showSabrinaCredit && (
                  <p className="mt-3 font-serif text-sm italic tracking-[0.08em] text-[#D8B77A]/85">une vision de Sabrina</p>
                )}
              </div>
            </div>
          </div>

          <BrassJamb side="right" />
        </div>

        <BrassSill />
      </div>
    </footer>
  );
}
