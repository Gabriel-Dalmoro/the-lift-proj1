"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { LedDisplay } from "./LiftDoors";
import Logo from "./Logo";

export interface CallPanelProps {
  onUnlock?: () => void;
}

// Floors laid out like a real car panel, top floors first.
const ROWS = [
  [7, 8],
  [5, 6],
  [3, 4],
  [1, 2],
];

/** Modelled on The Lift’s real button: black square, cream centre, green LED ring split at the corners. */
function LiftButton({
  n,
  lit,
  invite,
  onPress,
}: {
  n: number;
  lit: boolean;
  invite?: boolean;
  onPress: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPress}
      aria-label={n === 8 ? "Monter au 8e étage" : `Étage ${n}`}
      className="relative flex h-16 w-16 items-center justify-center rounded-[14px] bg-[#1c1a19] shadow-[0_3px_8px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform active:scale-95"
    >
      <svg viewBox="0 0 64 64" className="absolute inset-0 h-full w-full" aria-hidden>
        {/* Four LED segments centred on the corners (pathLength 100, one dash per corner) */}
        <motion.rect
          x="9"
          y="9"
          width="46"
          height="46"
          rx="11"
          pathLength={100}
          fill="none"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeDasharray="15 10"
          strokeDashoffset="-12"
          animate={{
            stroke: lit ? "#3ee08a" : "#2f4a3b",
            opacity: lit ? 1 : invite ? [0.55, 1, 0.55] : 0.7,
          }}
          transition={
            invite && !lit ? { opacity: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } } : { duration: 0.25 }
          }
          style={{ filter: lit ? "drop-shadow(0 0 4px rgba(62,224,138,0.9))" : undefined }}
        />
      </svg>
      <span className="relative flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-b from-[#f1e8da] to-[#d9ccb8] font-sans text-sm font-semibold text-[#2b2420] shadow-[inset_0_-1px_0_rgba(0,0,0,0.15)]">
        {n}
      </span>
    </button>
  );
}

export default function CallPanel({ onUnlock }: CallPanelProps) {
  const [lit, setLit] = useState<number[]>([]);
  const [called, setCalled] = useState(false);

  function press(n: number) {
    if (called) return;
    if (n === 8) {
      setCalled(true);
      setLit((l) => [...l, 8]);
      setTimeout(() => onUnlock?.(), 900);
      return;
    }
    // Other floors light up, then go out: this lift only goes to the 8th.
    setLit((l) => [...l, n]);
    setTimeout(() => setLit((l) => l.filter((x) => x !== n)), 650);
  }

  return (
    <div className="steel-cabin relative flex min-h-svh w-full items-center justify-center overflow-hidden px-6 py-12 select-none">
      {/* Warm downlights in the cabin ceiling */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_22%_18%_at_30%_0%,rgba(255,226,180,0.45),transparent_70%),radial-gradient(ellipse_22%_18%_at_70%_0%,rgba(255,226,180,0.45),transparent_70%),radial-gradient(ellipse_90%_70%_at_50%_45%,transparent_40%,rgba(20,14,10,0.55))]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="steel-door relative flex w-[min(78vw,250px)] call-panel flex-col items-center gap-6 rounded-2xl px-7 pb-8 pt-7 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,240,220,0.3)]"
      >
        <Logo className="w-28 text-[#2b2017]/80" cable={0} />
        <LedDisplay value="0" arrow={called ? "up" : null} glow={called} />
        <div className="grid grid-cols-2 gap-4">
          {ROWS.flat().map((n) => (
            <LiftButton key={n} n={n} lit={lit.includes(n)} invite={n === 8} onPress={() => press(n)} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
