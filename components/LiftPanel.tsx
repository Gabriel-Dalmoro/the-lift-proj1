"use client";

import { useState } from "react";

export default function LiftPanel() {
  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "error" | "ok">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!password || state === "loading") return;
    setState("loading");
    const res = await fetch("/api/acces", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    }).catch(() => null);
    if (res?.ok) {
      setState("ok");
      window.location.href = "/";
    } else {
      setState("error");
    }
  }

  const lit = state === "loading" || state === "ok";

  return (
    <form
      onSubmit={submit}
      className="brass brass-edge relative w-full max-w-[300px] rounded-[28px] px-7 pb-9 pt-7 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
    >
      {/* Floor display */}
      <div className="mx-auto mb-7 flex h-16 w-28 items-center justify-center rounded-md border border-black/40 bg-[#0b0806] shadow-[inset_0_2px_10px_rgba(0,0,0,0.9)]">
        <span
          className={`font-serif text-4xl tabular-nums transition-colors duration-500 ${
            lit ? "text-amber drop-shadow-[0_0_10px_rgba(211,138,60,0.9)]" : "text-amber/40"
          }`}
        >
          {lit ? "8" : "–"}
        </span>
      </div>

      <label htmlFor="pw" className="mb-2 block text-center text-[11px] uppercase tracking-[0.3em] text-ink/80">
        Code d'accès
      </label>
      <input
        id="pw"
        type="password"
        autoComplete="current-password"
        autoFocus
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (state === "error") setState("idle");
        }}
        className="mb-8 w-full rounded-md border border-black/30 bg-[#0b0806] px-4 py-3 text-center font-sans text-base tracking-[0.3em] text-cream outline-none placeholder:text-cream/30 focus:border-brass-light"
        placeholder="••••••"
      />

      <div className="flex flex-col items-center gap-3">
        <button
          type="submit"
          aria-label="Monter au 8e étage"
          className={`flex h-20 w-20 items-center justify-center rounded-full border-2 font-serif text-3xl transition-all duration-300 ${
            lit
              ? "border-amber bg-[#1a1008] text-amber shadow-[0_0_24px_rgba(211,138,60,0.8),inset_0_0_12px_rgba(211,138,60,0.5)]"
              : "border-[#6d5224] bg-gradient-to-b from-[#e9cf8f] to-[#a7823a] text-ink shadow-[0_4px_10px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.6)] active:translate-y-px"
          }`}
        >
          8
        </button>
        <p className={`h-4 text-xs ${state === "error" ? "text-[#5a1a0c]" : "text-transparent"}`} role="status">
          Code incorrect
        </p>
      </div>
    </form>
  );
}
