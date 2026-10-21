"use client";

import React from "react";

// The real lift at The Lift, seen from inside the cabin: satin steel telescopic
// doors that slide from right to left, the front panel twice as fast as the back one.

const EASE = "cubic-bezier(0.5, 0, 0.2, 1)";

export function LedDisplay({ value, arrow, glow }: { value: string; arrow?: "up" | "down" | null; glow?: boolean }) {
  return (
    <div className="flex h-11 min-w-24 items-center justify-center gap-2.5 rounded-md border border-black/60 bg-[#0d0f0e] px-4 shadow-[inset_0_2px_10px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.12)]">
      <span
        className={`w-3 text-xs text-[#3ee08a] transition-opacity duration-300 ${arrow ? "opacity-100" : "opacity-0"}`}
        style={{ textShadow: "0 0 8px rgba(62,224,138,0.8)" }}
      >
        {arrow === "down" ? "▼" : "▲"}
      </span>
      <span
        className="font-sans text-2xl font-medium tabular-nums text-[#3ee08a] transition-[text-shadow] duration-300"
        style={{
          textShadow: glow
            ? "0 0 10px rgba(62,224,138,1), 0 0 26px rgba(62,224,138,0.7)"
            : "0 0 6px rgba(62,224,138,0.6)",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function Panel({ side, open, duration }: { side: "back" | "front"; open: boolean; duration: number }) {
  const back = side === "back";
  return (
    <div
      className={`steel-door absolute inset-y-0 w-1/2 will-change-transform ${back ? "left-0 z-10" : "left-1/2 z-20"}`}
      style={{
        // Telescopic: the front (right) panel travels twice as far in the same time.
        transform: open ? `translate3d(${back ? -100 : -200}%, 0, 0)` : "translate3d(0, 0, 0)",
        transition: `transform ${duration}ms ${EASE}`,
        boxShadow: back
          ? "inset 1px 0 0 rgba(255,240,220,0.25), inset -1px 0 0 rgba(0,0,0,0.35)"
          : "inset 1px 0 0 rgba(255,240,220,0.3), inset -3px 0 0 rgba(30,20,14,0.55), -8px 0 18px rgba(0,0,0,0.25)",
      }}
    />
  );
}

export default function LiftDoors({
  open,
  floor,
  arrow = null,
  glow = false,
  duration = 2400,
  className = "",
  children,
}: {
  open: boolean;
  floor: string;
  arrow?: "up" | "down" | null;
  glow?: boolean;
  duration?: number;
  className?: string;
  /** Drawn over the closed doors, e.g. an engraved logo. */
  children?: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      {/* Header above the doors, with the floor display */}
      <div className="steel-dark relative z-30 flex h-[11svh] min-h-16 items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.45)]">
        <LedDisplay value={floor} arrow={arrow} glow={glow} />
        <div className="absolute inset-x-0 bottom-0 h-px bg-black/50" />
      </div>

      <div className="relative flex min-h-0 flex-1">
        {/* Left return panel, with the small plate and round brushed button seen on the real lift */}
        <div className="steel-cabin relative z-30 w-[9%] shadow-[6px_0_18px_rgba(0,0,0,0.35)] sm:w-[12%]">
          <div className="absolute right-[18%] top-[56%] flex h-[12%] w-[38%] max-w-10 items-center justify-center rounded-[2px] bg-[#70513b]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
            <span className="block aspect-square w-[60%] rounded-full bg-[radial-gradient(circle_at_35%_35%,#e9e4dc,#9d958c_60%,#6d665f)] shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
          </div>
        </div>
        {/* Warm wood edge of the frame */}
        <div className="relative z-30 w-1.5 bg-gradient-to-r from-[#6e4318] via-[#a8692a] to-[#7a4a1c] sm:w-2.5" />

        {/* Door opening: transparent, so whatever sits behind shows through when the doors part */}
        <div className="relative flex-1 overflow-hidden">
          <Panel side="back" open={open} duration={duration} />
          <Panel side="front" open={open} duration={duration} />
          {children && <div className="pointer-events-none absolute inset-0 z-30">{children}</div>}
        </div>

        {/* Right return panel with the little door sensor */}
        <div className="steel-cabin relative z-30 w-[7%] shadow-[-6px_0_18px_rgba(0,0,0,0.35)] sm:w-[10%]">
          <span className="absolute left-[30%] top-[24%] block h-2 w-2 rounded-full bg-[#2a2420] shadow-[inset_0_1px_2px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.2)]" />
        </div>
      </div>

      {/* Aluminium sill */}
      <div className="relative z-30 h-2.5 bg-[repeating-linear-gradient(90deg,#b9b2aa_0_2px,#8f877f_2px_4px)] shadow-[0_-3px_10px_rgba(0,0,0,0.4)]" />
    </div>
  );
}
