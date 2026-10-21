"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrassDoor, BrassJamb, BrassSill, BrassTransom } from "./BrassDoor";
import CallPanel from "./CallPanel";
import Logo from "./Logo";

export interface LiftArrivalProps {
  /** If controlled by CallPanel / parent state. Leave undefined to let the
   *  component run its own loading screen and call panel. */
  isUnlocked?: boolean;
  /** Optional callback when doors finish opening */
  onOpened?: () => void;
  /** Optional children to render inside the revealed room */
  children?: React.ReactNode;
}

// Non-linear elevator acceleration/deceleration curve (floors 1 -> 8)
const SCHEDULE = [
  { f: 1, delay: 0 },
  { f: 2, delay: 420 },
  { f: 3, delay: 760 },
  { f: 4, delay: 1050 },
  { f: 5, delay: 1320 },
  { f: 6, delay: 1620 },
  { f: 7, delay: 1980 },
  { f: 8, delay: 2450 },
];

export default function LiftArrival({ isUnlocked, onOpened, children }: LiftArrivalProps) {
  const reduce = useReducedMotion();
  const controlled = isUnlocked !== undefined;

  // Uncontrolled intro: the logo's "i" rides up its cable while the page loads, then the call panel.
  const [intro, setIntro] = useState<"loading" | "panel" | "done">(controlled ? "done" : "loading");
  const [risen, setRisen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [called, setCalled] = useState(false);
  const unlocked = controlled ? isUnlocked : called;

  const [floor, setFloor] = useState<number>(1);
  const [phase, setPhase] = useState<"idle" | "ascending" | "arrived" | "opening" | "open">("idle");
  const onOpenedRef = useRef(onOpened);
  onOpenedRef.current = onOpened;

  // Always start the visit on the ground floor, with the page held still until the doors open.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const done = () => setLoaded(true);
    if (document.readyState === "complete") done();
    else window.addEventListener("load", done, { once: true });
    const fallback = setTimeout(done, 6000);
    return () => {
      window.removeEventListener("load", done);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = phase === "open" ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [phase]);

  useEffect(() => {
    if (intro !== "loading" || !risen || !loaded) return;
    const t = setTimeout(() => setIntro("panel"), 500);
    return () => clearTimeout(t);
  }, [intro, risen, loaded]);

  // Start ascent once unlocked (when the user presses '8' on CallPanel)
  useEffect(() => {
    if (!unlocked) return;
    setPhase("ascending");
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, reduce ? 0 : ms));

    SCHEDULE.forEach(({ f, delay }) => at(delay, () => setFloor(f)));
    // Floor 8 chime & center light seam ignition
    at(2550, () => setPhase("arrived"));
    // Heavy brass doors unlatch and slide open
    at(3150, () => setPhase("opening"));
    // Doors fully open -> release scroll / fire callback
    at(5350, () => {
      setPhase("open");
      onOpenedRef.current?.();
    });

    return () => timers.forEach(clearTimeout);
  }, [unlocked, reduce]);

  const isDoorsOpening = phase === "opening" || phase === "open";
  const isArrivedOrOpening = phase === "arrived" || phase === "opening" || phase === "open";

  const doorTransition =
    phase === "arrived"
      ? "transform 450ms cubic-bezier(0.33, 1, 0.68, 1)"
      : "transform 2150ms cubic-bezier(0.76, 0, 0.24, 1)";
  const doorTransform = (dir: 1 | -1) =>
    phase === "arrived"
      ? `translate3d(${dir * 0.6}%, 0, 0)` // mechanical unlatch micro-gap
      : isDoorsOpening
        ? `translate3d(${dir * 102}%, 0, 0)`
        : "translate3d(0%, 0, 0)";
  const sweep = { y: (floor % 2) * 160 - 80, on: phase === "ascending" };

  return (
    <section aria-label="Arrivée au 8e étage" className="relative w-full min-h-svh overflow-hidden bg-[#0D1410] select-none">
      {/* SVG Filter for Photorealistic Anisotropic Brushed Brass Grain */}
      <svg className="pointer-events-none fixed h-0 w-0 opacity-0" aria-hidden="true">
        <filter id="brushed-brass-texture" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85 0.018" numOctaves="3" seed="14" result="noise" />
          <feColorMatrix
            type="matrix"
            values="
              0 0 0 0 0.78
              0 0 0 0 0.63
              0 0 0 0 0.36
              0 0 0 0.09 0"
            in="noise"
            result="coloredNoise"
          />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
      </svg>

      {/* ===================================================================
          1. THE REVEALED WORLD INSIDE (8th Floor Urban Jungle Oasis)
         =================================================================== */}
      <div
        className="relative z-0 flex min-h-svh w-full flex-col justify-between overflow-hidden transition-transform duration-[2600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: isDoorsOpening ? "scale(1)" : "scale(1.12)",
          filter: isDoorsOpening ? "brightness(1)" : "brightness(0.45)",
        }}
      >
        {/* Background Hero Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/ambiance-hero.webp"
            alt="Jungle urbaine au 8e étage — The Lift"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            style={{ filter: "sepia(10%) saturate(112%) contrast(103%)" }}
          />
          {/* Warm atmospheric jungle vignette & reading scrim */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(12,22,16,0.55) 0%, rgba(16,30,22,0.38) 45%, rgba(15,26,19,0.88) 100%)",
            }}
          />
          {/* Golden sunlight bloom from rooftop windows */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-[2400ms]"
            style={{
              opacity: isDoorsOpening ? 0.55 : 0,
              background: "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(235, 192, 120, 0.32), transparent 70%)",
            }}
          />
        </div>

        {/* Top Bar inside revealed room */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-7 sm:px-12 sm:pt-10">
          <span className="font-sans text-[11px] tracking-[0.32em] uppercase text-[#E5C992]/80">The Lift · Lyon</span>
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#F4EFE6]/55">Visuel d’illustration</span>
        </div>

        {/* Center Hero Copy (Sabrina's Verbatim Opening Question) */}
        {children ? (
          <div className="relative z-10 my-auto">{children}</div>
        ) : (
          <div
            className="relative z-10 mx-auto my-auto max-w-4xl px-6 py-16 text-center transition-all duration-[1600ms] delay-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-12"
            style={{
              opacity: isDoorsOpening ? 1 : 0,
              transform: isDoorsOpening ? "translateY(0px)" : "translateY(28px)",
            }}
          >
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#C8A464]/60" />
              <span className="font-sans text-xs tracking-[0.35em] uppercase text-[#D8B77A]">8ᵉ ÉTAGE · L’AMBIANCE</span>
              <span className="h-[1px] w-8 bg-[#C8A464]/60" />
            </div>

            <h1 className="font-serif text-3xl leading-[1.18] font-light tracking-[-0.01em] text-[#F7F3EB] sm:text-5xl md:text-6xl">
              Et si, au cœur de la ville, nous pouvions nous offrir le luxe de nous évader sans partir{" "}?
            </h1>

            <p className="mx-auto mt-8 max-w-2xl font-sans text-base leading-relaxed font-light text-[#EAE3D5]/90 sm:text-lg">
              À huit étages de l’agitation lyonnaise, j’imagine un lieu où la nature reprend ses droits, une jungle
              urbaine luxuriante, une oasis culinaire où le temps semble suspendu.
            </p>
          </div>
        )}

        {/* Bottom Scroll Invitation */}
        <div
          className="relative z-10 flex flex-col items-center pb-8 transition-opacity duration-1000 delay-1000"
          style={{ opacity: phase === "open" ? 0.8 : 0 }}
        >
          <span className="mb-3 font-sans text-[10px] tracking-[0.35em] uppercase text-[#D8B77A]">Découvrir la vision</span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-[#D8B77A] to-transparent" />
        </div>
      </div>

      {/* ===================================================================
          2. ARCHITECTURAL ELEVATOR FRAME, TRANSOM & BRASS DOORS OVERLAY
         =================================================================== */}
      <div
        aria-hidden={phase === "open"}
        className={`fixed inset-0 z-40 flex flex-col transition-opacity duration-700 ${
          phase === "open" ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        {/* TOP BRONZE & BRASS ARCHITECTURAL TRANSOM HEADER */}
        <BrassTransom className="h-24 flex-col sm:h-28">
          {/* Subtle Brass Molding Line */}
          <div className="absolute inset-x-0 top-2 h-[1px] bg-gradient-to-r from-transparent via-[#8C6D3B]/45 to-transparent" />

          {/* Recessed Luxury Floor Indicator Bezel */}
          <div
            className="relative flex items-center gap-5 rounded-sm border border-[#7A5E32]/70 px-6 py-2"
            style={{
              background: "linear-gradient(180deg, #090807 0%, #120F0B 100%)",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.95), 0 1px 0 rgba(235,202,140,0.22)",
            }}
          >
            {/* Mechanical Floor Strip (1 - 8) */}
            <div className="hidden items-center gap-2.5 sm:flex">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                const active = floor === num;
                return (
                  <span
                    key={num}
                    className={`font-serif text-xs transition-all duration-300 ${
                      active ? "scale-115 font-medium text-[#F5D799]" : "text-[#5C4B32]/65"
                    }`}
                    style={{
                      textShadow: active
                        ? "0 0 12px rgba(245,215,153,0.85), 0 0 24px rgba(212,163,89,0.55)"
                        : "none",
                    }}
                  >
                    {num}
                  </span>
                );
              })}
            </div>

            {/* Divider */}
            <div className="hidden h-4 w-[1px] bg-[#5C4B32]/40 sm:block" />

            {/* Primary Illuminated Floor Readout */}
            <div className="flex items-baseline gap-1.5">
              <span
                className="font-serif text-2xl tracking-wider text-[#F4D493] transition-all duration-200 sm:text-3xl"
                style={{
                  textShadow: isArrivedOrOpening
                    ? "0 0 18px rgba(247, 219, 154, 0.95), 0 0 36px rgba(218, 165, 84, 0.65)"
                    : "0 0 10px rgba(232, 192, 122, 0.45)",
                }}
              >
                {floor}
              </span>
              <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-[#C9A66B]/80">
                {floor === 1 ? "er" : "e"} étage
              </span>
            </div>

            {/* Upward Arrow Indicator */}
            <span
              className={`text-xs text-[#E5C17E] transition-transform duration-500 ${
                phase === "ascending" ? "animate-pulse" : ""
              }`}
              style={{ textShadow: "0 0 10px rgba(229,193,126,0.7)" }}
            >
              ▲
            </span>
          </div>
        </BrassTransom>

        {/* ELEVATOR SHAFT & TWIN BRUSHED-BRASS DOORS */}
        <div className="relative flex flex-1 w-full overflow-hidden">
          <BrassJamb side="left" />

          {/* DOOR CONTAINER */}
          <div className="relative flex flex-1 h-full overflow-hidden">
            {/* CENTER GOLDEN LIGHT SEAM (Ignites when floor hits 8 before doors part) */}
            <div
              className="pointer-events-none absolute inset-y-0 left-1/2 z-20 -translate-x-1/2 transition-all duration-700 ease-out"
              style={{
                width: phase === "arrived" ? "10px" : isDoorsOpening ? "140px" : "1px",
                opacity: phase === "arrived" ? 1 : isDoorsOpening ? 0 : 0.25,
                background:
                  "linear-gradient(180deg, rgba(255,235,190,0.2) 0%, rgba(255,222,158,0.95) 50%, rgba(255,235,190,0.2) 100%)",
                boxShadow: "0 0 35px 12px rgba(246, 205, 128, 0.75), 0 0 90px 30px rgba(188, 138, 62, 0.45)",
              }}
            />

            <BrassDoor side="left" transform={doorTransform(-1)} transition={doorTransition} sweep={sweep} />
            <BrassDoor side="right" transform={doorTransform(1)} transition={doorTransition} sweep={sweep} />
          </div>

          <BrassJamb side="right" />
        </div>

        <BrassSill />
      </div>

      {/* ===================================================================
          3. LOADING SCREEN & CALL PANEL (uncontrolled mode only)
         =================================================================== */}
      <AnimatePresence>
        {intro !== "done" && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[60] overflow-y-auto bg-[#0B0907]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait">
              {intro === "loading" ? (
                <motion.div
                  key="loading"
                  className="flex h-svh items-center justify-center overflow-hidden bg-jungle-deep px-6"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <Logo
                    className="w-[min(68vw,320px)] text-[#fdf4e8] lg:w-[420px]"
                    cable={140}
                    clip={false}
                    rise
                    riseFrom={1400}
                    duration={reduce ? 0 : 2.6}
                    delay={reduce ? 0 : 0.4}
                    onRisen={() => setRisen(true)}
                  />
                </motion.div>
              ) : (
                <motion.div key="panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                  <CallPanel
                    onUnlock={() => {
                      setCalled(true);
                      setIntro("done");
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
