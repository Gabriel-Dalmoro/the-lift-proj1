import React from "react";

// Big typography paired like The Lift's logo: an Instrument Serif italic ("the") at 1em
// leading into Boldonse capitals ("LIFT") at 2em. The parent sets the italic's size.
// Words stay Sabrina's; only the styling changes.

export function Serif({ children }: { children: React.ReactNode }) {
  return <span className="block font-display text-[1em] italic leading-[1.15]">{children}</span>;
}

export function Heavy({ children }: { children: React.ReactNode }) {
  return <span className="mt-[0.3em] block font-heavy text-[2em] uppercase leading-[1.32]">{children}</span>;
}
