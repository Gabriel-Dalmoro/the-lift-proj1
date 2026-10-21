"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Photo from "./Photo";
import Reveal from "./Reveal";

const KEYWORDS = ["Jungle urbaine", "Oasis culinaire", "Évasion", "Immersion", "Dépaysement"];

const SENSES = [
  { title: "Le visuel", text: "Une végétation spectaculaire dès l’entrée." },
  { title: "Le sonore", text: "Une ambiance musicale et des sons évoquant subtilement la nature." },
  { title: "L’olfactif", text: "Une signature parfumée végétale, discrète et reconnaissable, diffusée dans le sas." },
];

export default function Ambiance() {
  const layered = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: layered, offset: ["start end", "end start"] });
  // Real leaves in front of the room, each layer at its own speed: the nearest move fastest.
  const monsteraY = useTransform(scrollYProgress, [0, 1], ["18%", "-22%"]);
  const bananaY = useTransform(scrollYProgress, [0, 1], ["28%", "-30%"]);
  const hangingY = useTransform(scrollYProgress, [0, 1], ["-10%", "14%"]);

  return (
    <section data-chapter="L’ambiance" className="relative bg-jungle-deep text-cream">
      {/* Beat 1 */}
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-24 sm:py-36 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="font-serif text-2xl font-light leading-snug text-cream/95 sm:text-3xl">
            Dès l’ouverture de l’ascenseur, tout commence&nbsp;: une lumière, une fragrance végétale, une vibration
            musicale… Les sens s’éveillent, les repères s’effacent et l’on pénètre dans un autre monde.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <Photo
            src="/images/ambiance-palms.webp"
            alt="L’arrivée au 8e étage, enveloppée de végétation"
            className="aspect-[4/5] w-full rounded-sm"
            sizes="(min-width: 768px) 50vw, 100vw"
            parallax={10}
          />
        </Reveal>
      </div>

      {/* The three senses she wants to work on at the lift arrival */}
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-24 sm:pb-32 md:grid-cols-3 md:gap-12">
        {SENSES.map((sense, i) => (
          <Reveal key={sense.title} delay={i * 0.12} className="border-t border-brass/30 pt-6">
            <h3 className="font-serif text-2xl font-light italic text-brass-light">{sense.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-cream/80">{sense.text}</p>
          </Reveal>
        ))}
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
        {/* Hanging leaf, mid distance, entering from the top right */}
        <motion.div
          className="pointer-events-none absolute -right-[12%] -top-[6%] w-[62%] sm:-right-[4%] sm:w-[30%]"
          style={{ y: hangingY }}
        >
          <Image
            src="/images/leaves-hanging.webp"
            alt=""
            width={1200}
            height={1386}
            sizes="(min-width: 640px) 30vw, 62vw"
            className="h-auto w-full -scale-x-100 brightness-[0.8] saturate-[0.95] [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
          />
        </motion.div>
        {/* Monstera cluster rising from the bottom left, near */}
        <motion.div
          className="pointer-events-none absolute -bottom-[4%] -left-[18%] w-[92%] sm:-bottom-[8%] sm:-left-[4%] sm:w-[36%]"
          style={{ y: monsteraY }}
        >
          <Image
            src="/images/leaves-monstera.webp"
            alt=""
            width={1200}
            height={1400}
            sizes="(min-width: 640px) 36vw, 78vw"
            className="h-auto w-full brightness-[0.75] blur-[1px] [mask-image:linear-gradient(to_top,black_75%,transparent)]"
          />
        </motion.div>
        {/* Banana leaves from the bottom right, nearest */}
        <motion.div
          className="pointer-events-none absolute -bottom-[3%] -right-[40%] w-[130%] sm:-bottom-[10%] sm:-right-[6%] sm:w-[52%]"
          style={{ y: bananaY }}
        >
          <Image
            src="/images/leaves-banana.webp"
            alt=""
            width={1800}
            height={1075}
            sizes="(min-width: 640px) 52vw, 115vw"
            className="h-auto w-full brightness-[0.68] blur-[2.5px] [mask-image:linear-gradient(to_right,transparent,black_25%)]"
          />
        </motion.div>
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <Reveal className="max-w-2xl text-center">
            <p className="font-serif text-2xl font-light leading-snug sm:text-[2.1rem]">
              Plus qu’un restaurant, je souhaite imaginer un lieu de vie et d’émotions, où l’on vient autant pour
              savourer que pour ressentir, partager et prolonger l’instant.
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
