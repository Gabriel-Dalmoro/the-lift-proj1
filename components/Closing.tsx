"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Logo from "./Logo";
import Photo from "./Photo";
import Reveal from "./Reveal";

const DOOR_EASE = [0.65, 0, 0.35, 1] as const;

export default function Closing() {
  const end = useRef<HTMLDivElement>(null);
  const inView = useInView(end, { once: true, amount: 0.6 });

  return (
    <section data-chapter="The Lift" className="relative">
      <div className="flex min-h-svh items-center justify-center bg-cream px-6 py-24">
        <Reveal y={40}>
          <p
            className="mx-auto max-w-[22ch] text-balance text-center font-serif text-[2rem] font-light italic leading-[1.2] text-ink sm:text-5xl lg:text-6xl"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 80' }}
          >
            Parce qu'au fond, nos clients oublieront peut-être ce qu'ils ont commandé, mais jamais la façon dont nous
            les avons fait se sentir.
          </p>
        </Reveal>
      </div>

      {/* End card: the doors close softly */}
      <div ref={end} className="relative h-svh min-h-[560px] overflow-hidden bg-night">
        <Photo
          src="/images/closing-lyon.webp"
          alt="Les toits de Lyon au petit matin"
          className="absolute inset-0"
          parallax={0}
          caption={false}
          overlay="bg-night/30"
        />
        <motion.div
          className="brass brass-edge absolute inset-y-0 left-0 z-10 w-1/2 border-r border-black/50"
          initial={{ x: "-101%" }}
          animate={{ x: inView ? "0%" : "-101%" }}
          transition={{ duration: 2.6, delay: 0.4, ease: DOOR_EASE }}
        >
          <div className="absolute inset-y-[8%] left-[14%] right-[14%] border border-[#f6e2ad]/25" />
        </motion.div>
        <motion.div
          className="brass brass-edge absolute inset-y-0 right-0 z-10 w-1/2 border-l border-black/50"
          initial={{ x: "101%" }}
          animate={{ x: inView ? "0%" : "101%" }}
          transition={{ duration: 2.6, delay: 0.4, ease: DOOR_EASE }}
        >
          <div className="absolute inset-y-[8%] left-[14%] right-[14%] border border-[#f6e2ad]/25" />
        </motion.div>
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 1.6, delay: 2.8 }}
        >
          <div className="rounded-sm bg-[#0b0806]/85 px-8 pb-6 pt-4 shadow-[inset_0_2px_10px_rgba(0,0,0,0.9)] sm:px-12 sm:pb-8">
            <Logo className="w-44 text-brass-light sm:w-64" cable={60} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
