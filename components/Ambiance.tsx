"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Photo from "./Photo";
import Reveal from "./Reveal";

const KEYWORDS = ["Jungle urbaine", "Oasis culinaire", "Évasion", "Immersion", "Dépaysement"];

export default function Ambiance() {
  const layered = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: layered, offset: ["start end", "end start"] });
  // Foreground leaves move faster than the room behind them.
  const leavesY = useTransform(scrollYProgress, [0, 1], ["30%", "-45%"]);
  const leavesRightY = useTransform(scrollYProgress, [0, 1], ["45%", "-30%"]);

  return (
    <section data-chapter="L'ambiance" className="relative bg-jungle-deep text-cream">
      {/* Beat 1 */}
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-24 sm:py-36 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="font-serif text-2xl font-light leading-snug text-cream/95 sm:text-3xl">
            À huit étages de l'agitation lyonnaise, j'imagine un lieu où la nature reprend ses droits, une jungle urbaine
            luxuriante, une oasis culinaire où le temps semble suspendu.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <Photo
            src="/images/ambiance-palms.webp"
            alt="Palmiers et végétation abondante sous une verrière"
            className="aspect-[4/5] w-full rounded-sm"
            sizes="(min-width: 768px) 50vw, 100vw"
            parallax={10}
          />
        </Reveal>
      </div>

      {/* Beat 2: layered room with leaves in front */}
      <div ref={layered} className="relative h-[115svh] overflow-hidden">
        <Photo
          src="/images/ambiance-night.webp"
          alt="Une longue table dressée sous un plafond de plantes suspendues"
          className="absolute inset-0"
          parallax={6}
          overlay="bg-gradient-to-b from-jungle-deep via-jungle-deep/30 to-jungle-deep"
        />
        {/* Drawn palm fronds: the far layer is sharp, the near one soft and faster */}
        <motion.div className="pointer-events-none absolute -left-[22%] top-[-5%] h-[95%] w-[80%] sm:-left-[6%] sm:w-[42%]" style={{ y: leavesY }}>
          <Image src="/images/leaves-left.webp" alt="" fill sizes="(min-width: 640px) 42vw, 80vw" className="object-contain object-left" />
        </motion.div>
        <motion.div className="pointer-events-none absolute -right-[28%] bottom-[-10%] h-[90%] w-[85%] sm:-right-[8%] sm:w-[40%]" style={{ y: leavesRightY }}>
          <Image src="/images/leaves-right.webp" alt="" fill sizes="(min-width: 640px) 40vw, 85vw" className="object-contain object-right" />
        </motion.div>
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <Reveal className="max-w-2xl text-center">
            <p className="font-serif text-2xl font-light leading-snug sm:text-[2.1rem]">
              Dès l'ouverture de l'ascenseur, tout commence&nbsp;: une lumière, une fragrance végétale, une vibration
              musicale… Les sens s'éveillent, les repères s'effacent et l'on pénètre dans un autre monde.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Keywords band */}
      <div className="border-y border-brass/25 py-7">
        <Reveal>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-5 text-[11px] uppercase tracking-[0.32em] text-brass-light/90 sm:gap-x-8 sm:text-xs">
            {KEYWORDS.map((k, i) => (
              <li key={k} className="flex items-center gap-5 sm:gap-8">
                {i > 0 && <span className="text-brass/50">·</span>}
                {k}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Closing line over the room */}
      <div className="relative h-[100svh] min-h-[560px]">
        <Photo
          src="/images/ambiance-room.webp"
          alt="Des convives à table dans une salle couverte de plantes"
          className="absolute inset-0"
          parallax={8}
          overlay="bg-gradient-to-b from-jungle-deep via-jungle-deep/20 to-jungle"
        />
        <div className="relative z-10 flex h-full items-end justify-center px-6 pb-[18svh]">
          <Reveal className="text-center">
            <p
              className="mx-auto max-w-[16ch] text-balance font-serif text-4xl font-light italic leading-tight sm:text-6xl"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 80' }}
            >
              Un ailleurs inattendu, sans jamais quitter Lyon.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
