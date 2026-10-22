"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const GOLD = "#efaf50";
const SHADOW = "[text-shadow:0_2px_16px_rgba(20,10,4,0.8)]";

// The patio at dusk, pinned while you scroll. Her line settles into focus in the glass
// above the tables: first the italic, then the capitals, each going from soft to sharp.
// On large screens the portrait photo is shown whole, as a panel with side borders.
export default function PatioScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const zoom = useTransform(scrollYProgress, [0, 1], [1.06, 1]);
  const serifOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const serifBlur = useTransform(scrollYProgress, [0.1, 0.3], ["blur(10px)", "blur(0px)"]);
  const serifY = useTransform(scrollYProgress, [0.1, 0.3], [18, 0]);
  const heavyOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const heavyBlur = useTransform(scrollYProgress, [0.25, 0.5], ["blur(14px)", "blur(0px)"]);
  const heavyY = useTransform(scrollYProgress, [0.25, 0.5], [26, 0]);
  const heavySpacing = useTransform(scrollYProgress, [0.25, 0.5], ["0.08em", "0em"]);

  return (
    <div ref={ref} className="relative h-[260svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="relative mx-auto h-full overflow-hidden lg:w-[calc(100svh*0.7465)]">
          <motion.div className="absolute inset-0" style={{ scale: zoom }}>
            <Image
              src="/images/patio-evening.webp"
              alt="Une terrasse végétalisée au crépuscule, des tablées d’amis sous les guirlandes"
              fill
              sizes="(min-width: 1024px) 75svh, 100vw"
              loading="eager"
              className="object-cover"
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(28,14,6,0.55),rgba(28,14,6,0.15)_42%,transparent_55%,transparent_86%,#3b1d10)]" />

          {/* Her line, in the glass above the tables */}
          <div className="absolute inset-x-0 top-[6svh] px-5 text-center sm:px-8" style={{ color: GOLD }}>
            <p className="mx-auto max-w-[34em] text-balance lg:max-w-none text-[0.95rem] sm:text-[1.15rem] lg:text-[min(1.4vw,2.49svh)]">
              <motion.span
                className={`block font-display italic leading-[1.15] ${SHADOW}`}
                style={{ opacity: serifOpacity, filter: serifBlur, y: serifY }}
              >
                Une cuisine de caractère, vivante et généreuse,
              </motion.span>
              <motion.span
                className={`mt-[0.35em] block font-heavy text-[2em] uppercase leading-[1.32] ${SHADOW}`}
                style={{ opacity: heavyOpacity, filter: heavyBlur, y: heavyY, letterSpacing: heavySpacing }}
              >
                où le plaisir de partager devient une expérience à part entière.
              </motion.span>
            </p>
          </div>

          <span className="absolute bottom-2 right-3 font-sans text-[10px] italic tracking-wide text-cream/70">
            Visuel d’illustration
          </span>
        </div>
      </div>
    </div>
  );
}
