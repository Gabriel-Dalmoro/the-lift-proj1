"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import CallPanel from "./CallPanel";
import Logo from "./Logo";
import Photo from "./Photo";

const FLOORS = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
const DOOR_EASE = [0.65, 0, 0.35, 1] as const;

// loading: the "i" rides up its cable while the page loads
// call:    the floor panel waits for someone to press 8
// riding:  doors closed, counter climbs to 8
// open:    doors slide open on the 8th floor
type Phase = "loading" | "call" | "riding" | "open";

export default function LiftArrival() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("loading");
  const [risen, setRisen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [floor, setFloor] = useState(0);

  // Always start the visit at the ground floor, with the page held still.
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
    if (phase !== "loading" || !risen || !loaded) return;
    const t = setTimeout(() => setPhase("call"), 500);
    return () => clearTimeout(t);
  }, [phase, risen, loaded]);

  useEffect(() => {
    if (phase !== "riding") return;
    if (reduce) {
      setFloor(8);
      setPhase("open");
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 700;
    for (let i = 1; i <= 8; i++) {
      // Speeds up in the middle, slows into the 8th floor, like a real lift.
      t += i < 3 ? 420 : i > 6 ? 480 : 300;
      timers.push(setTimeout(() => setFloor(i), t));
    }
    timers.push(setTimeout(() => setPhase("open"), t + 750));
    return () => timers.forEach(clearTimeout);
  }, [phase, reduce]);

  const open = phase === "open";
  const intro = phase === "loading" || phase === "call";

  return (
    <section className="relative h-svh min-h-[560px] w-full overflow-hidden bg-jungle-deep" aria-label="Arrivée au 8e étage">
      {/* What waits behind the doors */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: open ? 1 : 1.12 }}
        transition={{ duration: 3.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Photo
          src="/images/ambiance-hero.webp"
          alt="Une salle de restaurant envahie de végétation, lumière chaude"
          className="h-full w-full"
          priority
          parallax={0}
          overlay="bg-gradient-to-b from-jungle-deep/60 via-jungle-deep/35 to-jungle-deep/85"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,22,15,0.7)_0%,rgba(8,22,15,0.35)_45%,transparent_75%)]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-5">
        <motion.h1
          className="mx-auto max-w-[17ch] text-balance text-center font-serif text-[2.2rem] font-light leading-[1.1] text-cream drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)] sm:text-6xl lg:text-7xl"
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
          initial={{ opacity: 0, y: 30 }}
          animate={open ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          Et si, au cœur de la ville, nous pouvions nous offrir le luxe de nous évader sans partir&nbsp;?
        </motion.h1>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-7 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-cream/70"
        initial={{ opacity: 0 }}
        animate={open ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 3.2 }}
      >
        <span>Bienvenue au 8ᵉ</span>
        <motion.span
          className="block h-8 w-px bg-cream/60"
          animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* The doors */}
      <motion.div
        className="brass brass-edge absolute inset-y-0 left-0 z-20 w-1/2 border-r border-black/50"
        initial={false}
        animate={{ x: open ? "-101%" : "0%" }}
        transition={{ duration: 2.4, ease: DOOR_EASE }}
      >
        <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/35 to-transparent" />
        <div className="absolute inset-y-[8%] left-[14%] right-[14%] border border-[#f6e2ad]/25" />
      </motion.div>
      <motion.div
        className="brass brass-edge absolute inset-y-0 right-0 z-20 w-1/2 border-l border-black/50"
        initial={false}
        animate={{ x: open ? "101%" : "0%" }}
        transition={{ duration: 2.4, ease: DOOR_EASE }}
      >
        <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/35 to-transparent" />
        <div className="absolute inset-y-[8%] left-[14%] right-[14%] border border-[#f6e2ad]/25" />
      </motion.div>

      {/* Floor counter above the seam */}
      <motion.div
        className="absolute left-1/2 top-[12%] z-30 -translate-x-1/2"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.8, delay: open ? 0.2 : 0 }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-20 w-24 items-center justify-center rounded-md border border-black/50 bg-[#0b0806] shadow-[inset_0_2px_12px_rgba(0,0,0,0.9),0_6px_20px_rgba(0,0,0,0.35)]">
            <motion.span
              key={floor}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className={`font-serif text-5xl tabular-nums ${
                floor === 8 ? "text-amber drop-shadow-[0_0_14px_rgba(211,138,60,1)]" : "text-amber/80"
              }`}
            >
              {FLOORS[floor]}
            </motion.span>
          </div>
          <Logo className="w-24 text-ink/75" cable={0} />
        </div>
      </motion.div>

      {/* Loading screen and floor panel, fixed over everything until 8 is pressed */}
      <AnimatePresence>
        {intro && (
          <motion.div
            key="intro"
            className="grain fixed inset-0 z-[60] flex flex-col items-center justify-center gap-12 overflow-hidden bg-jungle-deep px-6"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <motion.div layout transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
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
            <AnimatePresence>
              {phase === "call" && (
                <motion.div
                  key="panel"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <CallPanel onCall={() => setPhase("riding")} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
