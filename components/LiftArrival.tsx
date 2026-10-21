"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CallPanel from "./CallPanel";
import LiftDoors from "./LiftDoors";
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

// Ride from the ground floor to the 8th: slow start, cruise, slow into the floor.
const SCHEDULE = [
  { f: 0, delay: 0 },
  { f: 1, delay: 650 },
  { f: 2, delay: 1050 },
  { f: 3, delay: 1350 },
  { f: 4, delay: 1620 },
  { f: 5, delay: 1890 },
  { f: 6, delay: 2190 },
  { f: 7, delay: 2560 },
  { f: 8, delay: 3050 },
];
const ARRIVE = 3150;
const OPEN = 3800;
const DOORS_MS = 2400;
const DONE = OPEN + DOORS_MS + 200;

export default function LiftArrival({ isUnlocked, onOpened, children }: LiftArrivalProps) {
  const reduce = useReducedMotion();
  const controlled = isUnlocked !== undefined;

  // Uncontrolled intro: the logo's "i" rides up its cable while the page loads, then the call panel.
  const [intro, setIntro] = useState<"loading" | "panel" | "done">(controlled ? "done" : "loading");
  const [risen, setRisen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [called, setCalled] = useState(false);
  const unlocked = controlled ? isUnlocked : called;

  const [floor, setFloor] = useState(0);
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

  useEffect(() => {
    if (!unlocked) return;
    setPhase("ascending");
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, reduce ? 0 : ms));
    SCHEDULE.forEach(({ f, delay }) => at(delay, () => setFloor(f)));
    at(ARRIVE, () => setPhase("arrived"));
    at(OPEN, () => setPhase("opening"));
    at(DONE, () => {
      setPhase("open");
      onOpenedRef.current?.();
    });
    return () => timers.forEach(clearTimeout);
  }, [unlocked, reduce]);

  const isDoorsOpening = phase === "opening" || phase === "open";

  return (
    <section aria-label="Arrivée au 8e étage" className="relative w-full min-h-svh overflow-hidden bg-[#0D1410] select-none">
      {/* ===================================================================
          1. THE REVEALED WORLD INSIDE (8th Floor Urban Jungle Oasis)
         =================================================================== */}
      <div
        className="relative z-0 flex min-h-svh w-full flex-col justify-between overflow-hidden transition-[transform,filter] duration-[2600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: isDoorsOpening ? "scale(1)" : "scale(1.12)",
          filter: isDoorsOpening ? "brightness(1)" : "brightness(0.45)",
        }}
      >
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
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(12,22,16,0.55) 0%, rgba(16,30,22,0.38) 45%, rgba(15,26,19,0.88) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-[2400ms]"
            style={{
              opacity: isDoorsOpening ? 0.55 : 0,
              background: "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(235, 192, 120, 0.32), transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 flex items-center justify-between px-6 pt-7 sm:px-12 sm:pt-10">
          <span className="font-sans text-[11px] tracking-[0.32em] uppercase text-[#E5C992]/80">The Lift · Lyon</span>
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#F4EFE6]/55">Visuel d’illustration</span>
        </div>

        {children ? (
          <div className="relative z-10 my-auto">{children}</div>
        ) : (
          <div
            className="relative z-10 mx-auto my-auto max-w-4xl px-6 py-16 text-center transition-all duration-[1600ms] delay-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-12"
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

        <div
          className="relative z-10 flex flex-col items-center pb-8 transition-opacity duration-1000 delay-1000"
          style={{ opacity: phase === "open" ? 0.8 : 0 }}
        >
          <span className="mb-3 font-sans text-[10px] tracking-[0.35em] uppercase text-[#D8B77A]">Découvrir la vision</span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-[#D8B77A] to-transparent" />
        </div>
      </div>

      {/* ===================================================================
          2. THE CABIN: real satin-steel telescopic doors, opening right to left
         =================================================================== */}
      <div
        aria-hidden={phase === "open"}
        className={`fixed inset-0 z-40 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          phase === "open" ? "pointer-events-none scale-110 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <LiftDoors
          className="h-full"
          open={isDoorsOpening}
          floor={String(floor)}
          arrow={phase === "ascending" ? "up" : null}
          glow={phase !== "idle" && phase !== "ascending"}
          duration={reduce ? 0 : DOORS_MS}
        />
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
            transition={{ duration: 0.8, ease: "easeInOut" }}
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
