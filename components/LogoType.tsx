import React from "react";

// Big reveal typography, paired like The Lift's logo: a small Instrument Serif italic
// ("the") leading into big Boldonse capitals ("LIFT"). The parent sets the capitals' size.
// Words stay Sabrina's; only the styling changes.

export function Serif({ children }: { children: React.ReactNode }) {
  return <span className="block font-display text-[0.62em] italic leading-[1.12] tracking-[-0.005em]">{children}</span>;
}

export function Heavy({ children }: { children: React.ReactNode }) {
  return <span className="mt-[0.3em] block font-heavy text-[1em] uppercase leading-[1.32]">{children}</span>;
}
