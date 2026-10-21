"use client";

import React, { useState } from "react";

export interface CallPanelProps {
  onUnlock?: () => void;
}

export default function CallPanel({ onUnlock }: CallPanelProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [isAscending, setIsAscending] = useState(false);

  // Correct password or quick tap on '8'
  const handleFloorPress = (floorNum: number) => {
    if (isAscending) return;
    if (floorNum === 8) {
      setIsAscending(true);
      setTimeout(() => {
        onUnlock?.();
      }, 900);
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAscending) return;
    // Accept either 8, LIFT, or standard password match
    if (pin.trim() === "8" || pin.trim().toLowerCase() === "lift" || pin.trim() === "1234") {
      setIsAscending(true);
      setTimeout(() => {
        onUnlock?.();
      }, 900);
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
    }
  };

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center bg-[#0B0907] px-6 py-12 select-none">
      {/* Subtle Wall Ambient Vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background: "radial-gradient(circle at 50% 45%, rgba(35,27,16,0.35) 0%, rgba(8,6,5,0.95) 85%)",
        }}
      />

      {/* Heavy Brushed Brass Elevator Call Plate */}
      <div
        className="relative z-10 w-full max-w-md rounded-sm border border-[#7A5E32]/70 p-8 sm:p-12 text-center transition-transform duration-700"
        style={{
          background: `
            linear-gradient(
              135deg,
              #332614 0%,
              #5B4525 15%,
              #8B6C3C 30%,
              #C5A267 48%,
              #DFC28C 55%,
              #B28E52 68%,
              #73582F 85%,
              #433219 95%,
              #241A0C 100%
            )
          `,
          boxShadow: `
            inset 0 1px 3px rgba(255, 232, 185, 0.5),
            inset 0 -4px 12px rgba(0, 0, 0, 0.8),
            0 25px 60px rgba(0, 0, 0, 0.95),
            0 0 0 2px #1A130A
          `,
        }}
      >
        {/* Anisotropic Brushed Metal Micro-Striations Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay rounded-sm"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                rgba(255,255,255,0.03) 0px,
                rgba(255,255,255,0.03) 1px,
                rgba(0,0,0,0.04) 1px,
                rgba(0,0,0,0.04) 2px
              )
            `,
          }}
        />

        {/* Plate Header Branding */}
        <div className="relative z-10 mb-8">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#3A2912] font-semibold">
            The Lift · Lyon
          </span>
          <h2 className="mt-2 font-serif text-2xl font-light text-[#22170B] tracking-wide">Accès Privé</h2>
          <div className="mx-auto mt-3 h-[1px] w-16 bg-[#4A371B]/40" />
        </div>

        {/* Recessed LED Floor Selection Grid */}
        <div className="relative z-10 mb-8">
          <p className="mb-4 font-sans text-xs tracking-[0.2em] uppercase text-[#322410]">Sélectionnez l’étage</p>

          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((floorNum) => {
              const isEighth = floorNum === 8;
              return (
                <button
                  key={floorNum}
                  type="button"
                  onClick={() => handleFloorPress(floorNum)}
                  aria-label={isEighth ? "Monter au 8e étage" : `Étage ${floorNum}`}
                  className={`group relative flex h-14 flex-col items-center justify-center rounded-sm border transition-all duration-300 ${
                    isEighth
                      ? "border-[#F5D799]/80 bg-gradient-to-b from-[#1C160D] to-[#0A0805] text-[#F5D799] shadow-[inset_0_2px_5px_rgba(0,0,0,0.9),0_0_15px_rgba(235,192,120,0.25)] hover:scale-105"
                      : "border-[#5A4526]/50 bg-gradient-to-b from-[#17120B] to-[#0D0A06] text-[#C9A66B]/70 hover:border-[#8B6C3C] hover:text-[#F5D799]"
                  }`}
                >
                  <span className={`font-serif text-lg font-light ${isEighth ? "text-[#F5D799]" : ""}`}>{floorNum}</span>
                  {isEighth && (
                    <span className="absolute bottom-1 font-sans text-[8px] tracking-wider uppercase text-[#E5C17E]/90">
                      8ᵉ
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* PIN / Password Alternative Input */}
        <form onSubmit={handlePinSubmit} className="relative z-10 space-y-4">
          <div className="relative">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Code d'accès ou app. 8"
              className={`w-full rounded-sm border px-4 py-3 text-center font-sans text-sm tracking-widest text-[#F4EFE6] placeholder-[#7A5E32] transition-colors outline-none ${
                error
                  ? "border-red-500 bg-red-950/40 animate-shake"
                  : "border-[#6B5128] bg-[#0A0805]/80 focus:border-[#E5C17E] focus:ring-1 focus:ring-[#E5C17E]"
              }`}
              style={{
                boxShadow: "inset 0 2px 5px rgba(0,0,0,0.8)",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isAscending}
            className={`w-full rounded-sm border border-[#E5C17E]/60 py-3.5 font-sans text-xs tracking-[0.25em] uppercase text-[#1C150B] transition-all duration-300 ${
              isAscending
                ? "bg-[#F5D799] scale-[0.99] opacity-90"
                : "bg-gradient-to-r from-[#C8A464] via-[#E8C58E] to-[#C8A464] hover:brightness-110 shadow-lg"
            }`}
          >
            {isAscending ? "Ascension vers le 8e..." : "Appeler l'ascenseur"}
          </button>
        </form>

        {/* Corner Screws for Mechanical Aesthetic */}
        <span className="absolute top-3 left-3 h-2 w-2 rounded-full bg-[#2A1F10] shadow-[inset_0_1px_2px_rgba(0,0,0,0.9),0_1px_0_rgba(255,232,185,0.2)]" />
        <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-[#2A1F10] shadow-[inset_0_1px_2px_rgba(0,0,0,0.9),0_1px_0_rgba(255,232,185,0.2)]" />
        <span className="absolute bottom-3 left-3 h-2 w-2 rounded-full bg-[#2A1F10] shadow-[inset_0_1px_2px_rgba(0,0,0,0.9),0_1px_0_rgba(255,232,185,0.2)]" />
        <span className="absolute bottom-3 right-3 h-2 w-2 rounded-full bg-[#2A1F10] shadow-[inset_0_1px_2px_rgba(0,0,0,0.9),0_1px_0_rgba(255,232,185,0.2)]" />
      </div>
    </div>
  );
}
