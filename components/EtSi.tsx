import Reveal from "./Reveal";

// The site's signature: each chapter opens with one of her "Et si…" questions.
export default function EtSi({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <Reveal y={40}>
      <h2
        className={`mx-auto max-w-[18ch] text-balance text-center font-serif text-[2.35rem] font-light leading-[1.08] tracking-[-0.01em] sm:text-6xl lg:text-7xl ${className}`}
        style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
      >
        {children}
      </h2>
    </Reveal>
  );
}
