"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useState } from "react";

// Brass lift panel. Only the 8th floor goes anywhere; the others light up, then give up.
const ROWS = [
  [7, 8],
  [5, 6],
  [3, 4],
  [1, 2],
];

function FloorButton({ n, lit, onPress }: { n: number; lit: boolean; onPress: (n: number) => void }) {
  const controls = useAnimationControls();
  const [blink, setBlink] = useState(false);
  const target = n === 8;

  async function press() {
    if (target) return onPress(n);
    setBlink(true);
    await controls.start({ x: [0, -3, 3, -2, 2, 0], transition: { duration: 0.4, delay: 0.35 } });
    setBlink(false);
  }

  const on = lit || blink;

  return (
    <motion.button
      type="button"
      onClick={press}
      animate={controls}
      aria-label={target ? "Monter au 8e étage" : `Étage ${n}`}
      className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 font-serif text-xl transition-all duration-300 sm:h-16 sm:w-16 sm:text-2xl ${
        on
          ? "border-amber bg-[#1a1008] text-amber shadow-[0_0_22px_rgba(211,138,60,0.85),inset_0_0_10px_rgba(211,138,60,0.5)]"
          : "border-[#6d5224] bg-gradient-to-b from-[#ecd395] to-[#a7823a] text-ink shadow-[0_4px_10px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.6)] active:translate-y-px"
      }`}
    >
      {target && !on && (
        <motion.span
          className="absolute inset-[-6px] rounded-full border border-brass-light/70"
          animate={{ opacity: [0, 0.9, 0], scale: [0.92, 1.08, 1.16] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      {n}
    </motion.button>
  );
}

export default function CallPanel({ onCall }: { onCall: () => void }) {
  const [called, setCalled] = useState(false);

  function press() {
    if (called) return;
    setCalled(true);
    setTimeout(onCall, 650);
  }

  return (
    <div className="brass brass-edge rounded-[26px] px-7 pb-7 pt-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
      <div className="mx-auto mb-6 flex h-12 w-20 items-center justify-center rounded-md border border-black/40 bg-[#0b0806] shadow-[inset_0_2px_10px_rgba(0,0,0,0.9)]">
        <span
          className={`font-serif text-3xl tabular-nums transition-colors duration-500 ${
            called ? "text-amber drop-shadow-[0_0_10px_rgba(211,138,60,0.9)]" : "text-amber/50"
          }`}
        >
          {called ? "▲" : "0"}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {ROWS.flat().map((n) => (
          <FloorButton key={n} n={n} lit={called && n === 8} onPress={press} />
        ))}
      </div>
    </div>
  );
}
