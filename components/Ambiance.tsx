"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Photo from "./Photo";
import Reveal from "./Reveal";
import TerraceDusk from "./TerraceDusk";

const KEYWORDS = ["Jungle urbaine", "Oasis culinaire", "Évasion", "Immersion", "Dépaysement"];

const SENSES = [
  { title: "Le visuel", text: "Une végétation spectaculaire dès l’entrée." },
  { title: "Le sonore", text: "Une ambiance musicale et des sons évoquant subtilement la nature." },
  { title: "L’olfactif", text: "Une signature parfumée végétale, discrète et reconnaissable, diffusée dans le sas." },
];

export default function Ambiance() {
  const layered = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: layered, offset: ["start end", "end start"] });
  // Real leaves in front of the room, each layer at its own speed. Every cut edge of a
  // cut-out sits off-screen, and layers only ever move further off-screen, never back in.
  const hangingY = useTransform(scrollYProgress, [0, 1], ["-22%", "0%"]);
  const fernY = useTransform(scrollYProgress, [0, 1], ["22%", "0%"]);
  const monsteraY = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
  const bananaY = useTransform(scrollYProgress, [0, 1], ["45%", "0%"]);

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
        {/* Leaves fade into the dark at the section's top and bottom instead of being cut by its edges */}
        <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]">
          {/* Monstera leaf hanging from the top right; turned over so both cut sides are off-screen */}
          <motion.div
            className="pointer-events-none absolute -right-[8%] -top-[3%] w-[60%] sm:-right-[2%] sm:w-[28%]"
            style={{ y: hangingY }}
          >
            <Image
              src="/images/leaves-hanging.webp"
              alt=""
              width={1200}
              height={1386}
              sizes="(min-width: 640px) 28vw, 60vw"
              className="h-auto w-full rotate-180 brightness-[0.8] saturate-[0.95]"
            />
          </motion.div>
          {/* Fern rising from the bottom left */}
          <motion.div
            className="pointer-events-none absolute -bottom-[3%] -left-[10%] w-[58%] sm:-left-[2%] sm:w-[26%]"
            style={{ y: fernY }}
          >
            <Image
              src="/images/leaves-fern.webp"
              alt=""
              width={1200}
              height={1507}
              sizes="(min-width: 640px) 26vw, 58vw"
              className="h-auto w-full brightness-[0.7] saturate-[0.9]"
            />
          </motion.div>
          {/* Whole monstera plant rooted at the bottom right */}
          <motion.div
            className="pointer-events-none absolute -bottom-[3%] -right-[14%] w-[62%] sm:-right-[3%] sm:w-[27%]"
            style={{ y: monsteraY }}
          >
            <Image
              src="/images/leaves-monstera.webp"
              alt=""
              width={1123}
              height={1792}
              sizes="(min-width: 640px) 27vw, 62vw"
              className="h-auto w-full brightness-[0.75] blur-[0.5px]"
            />
          </motion.div>
          {/* Banana leaves, nearest and softest; flipped so their cut side runs off the left edge */}
          <motion.div
            className="pointer-events-none absolute -bottom-[3%] -left-[18%] w-[105%] sm:-left-[6%] sm:w-[48%]"
            style={{ y: bananaY }}
          >
            <Image
              src="/images/leaves-banana.webp"
              alt=""
              width={1800}
              height={1075}
              sizes="(min-width: 640px) 48vw, 105vw"
              className="h-auto w-full -scale-x-100 brightness-[0.6] blur-[3px] [mask-image:linear-gradient(to_right,transparent,black_30%)]"
            />
          </motion.div>
        </div>
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

      {/* The real terrace, day turning to sunset as you scroll, then her closing line */}
      <TerraceDusk />
    </section>
  );
}
