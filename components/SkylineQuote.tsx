"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const FIT = "object-cover object-[center_41%]";

// Her final sentence rises from behind Lyon's skyline, pinned while you scroll:
// the city and its towers are a cut-out drawn over the text.
export default function SkylineQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const textY = useTransform(scrollYProgress, [0.05, 0.8], ["72svh", "0svh"]);
  const zoom = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  // Never show the text before the cut-out in front of it has loaded.
  const [fgReady, setFgReady] = useState(false);

  return (
    <div ref={ref} className="relative h-[300svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: zoom }}>
          <Image src="/images/closing-lyon.webp" alt="Lyon, ses tours et le Rhône au petit matin" fill sizes="100vw" className={FIT} />

          <motion.div
            className={`absolute inset-x-0 top-[8svh] px-6 text-center transition-opacity duration-500 sm:top-[11svh] ${fgReady ? "opacity-100" : "opacity-0"}`}
            style={{ y: textY }}
          >
            <p
              className="mx-auto max-w-[20ch] text-balance font-serif text-[1.9rem] font-light italic leading-[1.22] text-[#1C1917] sm:text-5xl lg:text-[3.4rem]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 80' }}
            >
              Parce qu’au fond, nos clients oublieront peut-être ce qu’ils ont commandé, mais jamais la façon dont nous
              les avons fait se sentir.
            </p>
          </motion.div>

          {/* The city, the towers and the leaves in front: drawn over the text */}
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/images/closing-lyon-fg.webp"
              alt=""
              fill
              sizes="100vw"
              loading="eager"
              className={FIT}
              onLoad={() => setFgReady(true)}
            />
          </div>
        </motion.div>

        {/* Morning light coming out of the cream of the previous chapter */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[14svh] bg-gradient-to-b from-cream to-transparent" />
      </div>
    </div>
  );
}
