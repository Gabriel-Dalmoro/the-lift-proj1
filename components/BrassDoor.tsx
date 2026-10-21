import React from "react";

// Shared brushed-brass lift architecture, used by the arrival and the end card.

const DOOR_GRADIENT = `
  #332614 0%,
  #5B4525 14%,
  #8B6C3C 28%,
  #C5A267 44%,
  #DFC28C 51%,
  #B28E52 62%,
  #73582F 82%,
  #433219 96%,
  #241A0C 100%
`;

const STRIATIONS = `
  repeating-linear-gradient(
    90deg,
    rgba(255,255,255,0.03) 0px,
    rgba(255,255,255,0.03) 1px,
    rgba(0,0,0,0.04) 1px,
    rgba(0,0,0,0.04) 2px
  ),
  repeating-linear-gradient(
    0deg,
    rgba(255,244,214,0.025) 0px,
    rgba(0,0,0,0.035) 2px,
    transparent 4px
  )
`;

export function BrassDoor({
  side,
  transform,
  transition,
  sweep,
}: {
  side: "left" | "right";
  transform: string;
  transition: string;
  /** Passing-floor light sweep while ascending: its translateY, or null when off */
  sweep?: { y: number; on: boolean };
}) {
  const left = side === "left";
  const coffer = left ? "135deg" : "225deg";

  return (
    <div
      className="relative z-10 h-full w-1/2 will-change-transform"
      style={{
        transform,
        transition,
        background: `linear-gradient(${left ? "108deg" : "-108deg"}, ${DOOR_GRADIENT})`,
        boxShadow: left
          ? "inset -2px 0 3px rgba(255, 232, 185, 0.45), inset 12px 0 30px rgba(0,0,0,0.65), 14px 0 45px rgba(0,0,0,0.85)"
          : "inset 2px 0 3px rgba(255, 232, 185, 0.45), inset -12px 0 30px rgba(0,0,0,0.65), -14px 0 45px rgba(0,0,0,0.85)",
      }}
    >
      {/* Anisotropic Brushed Metal Micro-Striations */}
      <div
        className="pointer-events-none absolute inset-0 opacity-65 mix-blend-overlay"
        style={{ backgroundImage: STRIATIONS }}
      />

      {/* Passing Floor Shaft Light Sweep during Ascent */}
      {sweep && (
        <div
          className="pointer-events-none absolute inset-0 transition-transform duration-700"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(255,236,195,0.16) 48%, rgba(255,236,195,0.28) 50%, rgba(255,236,195,0.16) 52%, transparent 100%)",
            transform: `translateY(${sweep.y}%)`,
            opacity: sweep.on ? 0.85 : 0,
          }}
        />
      )}

      {/* Architectural Recessed Brass Coffer Panels (Upper & Lower) */}
      <div className="flex h-full flex-col justify-between p-5 sm:p-10 md:p-14">
        <div
          className="relative flex-1 rounded-[1px] border border-[#E6C98F]/35"
          style={{
            background: `linear-gradient(${coffer}, rgba(28,20,10,0.28) 0%, rgba(235,202,140,0.08) 50%, rgba(20,14,7,0.36) 100%)`,
            boxShadow:
              "inset 0 2px 6px rgba(0,0,0,0.65), inset 0 -1px 1px rgba(255,232,185,0.3), 0 1px 0 rgba(255,232,185,0.2)",
          }}
        >
          <div className="absolute inset-2.5 border border-[#D4B070]/25 sm:inset-4" />
        </div>

        {/* Center Horizontal Brass Rail */}
        <div
          className={`my-4 h-[2px] w-full ${left ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-transparent via-[#3A2B15] to-[#E6C98F]/50 sm:my-6`}
        />

        <div
          className="relative h-28 rounded-[1px] border border-[#E6C98F]/30 sm:h-40"
          style={{
            background: `linear-gradient(${coffer}, rgba(22,16,8,0.38) 0%, rgba(215,180,115,0.06) 50%, rgba(16,11,5,0.45) 100%)`,
            boxShadow: "inset 0 2px 6px rgba(0,0,0,0.7), inset 0 -1px 1px rgba(255,232,185,0.25)",
          }}
        >
          <div className="absolute inset-2.5 border border-[#D4B070]/20 sm:inset-4" />
        </div>
      </div>

      {/* Heavy Polished Brass Center Astragal (Leading Edge) */}
      <div
        className={`absolute inset-y-0 ${left ? "right-0" : "left-0"} w-2 sm:w-3`}
        style={{
          background: `linear-gradient(${left ? "90deg" : "-90deg"}, #4B381C 0%, #DFC38D 45%, #FFF0CE 70%, #6D5229 100%)`,
          boxShadow: left ? "-2px 0 8px rgba(0,0,0,0.5)" : "2px 0 8px rgba(0,0,0,0.5)",
        }}
      />
    </div>
  );
}

/** Outer bronze jamb beside the doors. */
export function BrassJamb({ side }: { side: "left" | "right" }) {
  const left = side === "left";
  return (
    <div
      className="relative z-30 h-full w-3 sm:w-6"
      style={{
        background: `linear-gradient(${left ? "90deg" : "-90deg"}, #0B0907 0%, #2B2113 70%, #5A4526 100%)`,
        boxShadow: left ? "4px 0 20px rgba(0,0,0,0.8)" : "-4px 0 20px rgba(0,0,0,0.8)",
      }}
    />
  );
}

/** Brass threshold sill plate at the bottom. */
export function BrassSill() {
  return (
    <div
      className="relative z-30 h-3 w-full"
      style={{
        background: "linear-gradient(90deg, #1E160B 0%, #7C6034 30%, #C8A464 50%, #7C6034 70%, #1E160B 100%)",
        boxShadow: "0 -4px 16px rgba(0,0,0,0.8)",
      }}
    />
  );
}

/** Dark bronze transom header above the doors. */
export function BrassTransom({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <div
      className={`relative z-30 flex w-full items-center justify-center border-b border-[#5B4626] ${className}`}
      style={{
        background: "linear-gradient(180deg, #0D0B09 0%, #17130E 65%, #231C13 100%)",
        boxShadow: "0 12px 35px rgba(0,0,0,0.85), inset 0 -1px 0 rgba(232,197,133,0.28)",
      }}
    >
      {children}
    </div>
  );
}
