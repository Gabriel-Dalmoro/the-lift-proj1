import React from "react";

// Big reveal typography, paired like The Lift's logo: Instrument Serif italic ("the")
// with Boldonse capitals ("LIFT"). Words stay Sabrina's; only the styling changes.

export function Serif({ children }: { children: React.ReactNode }) {
  return <span className="block font-display text-[1em] italic leading-[1.02] tracking-[-0.01em]">{children}</span>;
}

export function Heavy({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-[0.35em] block font-heavy text-[0.36em] uppercase leading-[1.5] tracking-[0.02em]">
      {children}
    </span>
  );
}
