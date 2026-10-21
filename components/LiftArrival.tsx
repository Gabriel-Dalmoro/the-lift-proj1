"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import CallPanel from "./CallPanel";
import LiftDoors from "./LiftDoors";
import Logo from "./Logo";
import { Heavy, Serif } from "./LogoType";

export interface LiftArrivalProps {
  /** If controlled by CallPanel / parent state. Leave undefined to let the
   *  component run its own loading screen and call panel. */
  isUnlocked?: boolean;
  /** Optional callback when doors finish opening */
  onOpened?: () => void;
  /** Optional children to render inside the revealed room */
  children?: React.ReactNode;
}

const HERO_FIT = "object-cover object-[center_55%]";

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

  // Uncontrolled intro: the logo’s "i" rides up its cable while the page loads, then the call panel.
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

  // Hero scroll: her question rises from behind the counter, the room drifts closer.
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end end"] });
  const heroTextY = useTransform(heroProgress, [0.02, 0.6], ["46svh", "0svh"]);
  const heroZoom = useTransform(heroProgress, [0, 1], [1, 1.06]);
  const hintOpacity = useTransform(heroProgress, [0, 0.12], [0.85, 0]);
  const [heroFgReady, setHeroFgReady] = useState(false);

  return (
    <section ref={heroRef} aria-label="Arrivée au 8e étage" className="relative h-[240svh] w-full bg-[#0D1410] select-none">
      {/* ===================================================================
          1. THE ROOM: stepping out of the lift into The Lift, then her question
             rises from behind the counter and the back row of tables as you scroll
         =================================================================== */}
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Stepping out: the camera pushes in as the doors open */}
        <div
          className="absolute inset-0 transition-[transform,filter] duration-[3200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transform: isDoorsOpening ? "scale(1.14)" : "scale(1)",
            filter: isDoorsOpening ? "brightness(1)" : "brightness(0.45)",
          }}
        >
          <motion.div className="absolute inset-0" style={{ scale: heroZoom }}>
            <Image
              src="/images/hero.webp"
              alt="La salle du Lift transformée en jungle urbaine : plantes suspendues, bougies, lumière dorée"
              fill
              priority
              sizes="100vw"
              className={HERO_FIT}
            />

            {children ? (
              <div className="absolute inset-x-0 top-[20svh]">{children}</div>
            ) : (
              <motion.div
                className={`absolute inset-x-0 top-[17svh] px-6 text-center transition-opacity duration-700 sm:top-[19svh] ${
                  heroFgReady && isDoorsOpening ? "opacity-100" : "opacity-0"
                }`}
                style={{ y: heroTextY }}
              >
                <div className="mb-5 inline-flex items-center gap-3">
                  <span className="h-px w-8 bg-[#C8A464]/70" />
                  <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#E5C992]">8ᵉ étage · L’ambiance</span>
                  <span className="h-px w-8 bg-[#C8A464]/70" />
                </div>
                <h1 className="mx-auto max-w-[13ch] text-balance text-[2.15rem] text-[#F7F3EB] drop-shadow-[0_2px_22px_rgba(0,0,0,0.7)] sm:max-w-[15ch] sm:text-5xl lg:text-[3.3rem]">
                  <Serif>Et si, au cœur de la ville, nous pouvions nous offrir le luxe de</Serif>
                  <Heavy>nous évader sans partir&nbsp;?</Heavy>
                </h1>
              </motion.div>
            )}

            {/* Counter, back tables and the plants in front: drawn over the text */}
            <div className="pointer-events-none absolute inset-0">
              <Image
                src="/images/hero-fg.webp"
                alt=""
                fill
                sizes="100vw"
                loading="eager"
                className={HERO_FIT}
                onLoad={() => setHeroFgReady(true)}
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_35%,rgba(10,16,12,0.45),transparent_75%),linear-gradient(180deg,rgba(12,22,16,0.45)_0%,transparent_30%,transparent_70%,rgba(15,26,19,0.75)_100%)]" />
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-7 sm:px-12 sm:pt-10">
          <span className="font-sans text-[11px] tracking-[0.32em] uppercase text-[#E5C992]/80">The Lift · Lyon</span>
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#F4EFE6]/55">Visuel d’illustration</span>
        </div>

        {/* Scroll invitation */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center transition-opacity duration-1000 delay-1000"
          style={{ opacity: phase === "open" ? hintOpacity : 0 }}
        >
          <span className="mb-3 font-sans text-[10px] tracking-[0.35em] uppercase text-[#D8B77A]">Découvrir la vision</span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-[#D8B77A] to-transparent" />
        </motion.div>
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
