"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Full-bleed or framed photo with gentle parallax and the required caption.
export default function Photo({
  src,
  alt,
  className = "",
  sizes = "100vw",
  parallax = 8,
  priority = false,
  caption = true,
  captionClass = "text-cream/70",
  overlay,
  position = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  parallax?: number;
  priority?: boolean;
  caption?: boolean;
  captionClass?: string;
  overlay?: string;
  position?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);

  return (
    <div ref={ref} className={`${className.includes("absolute") ? "" : "relative"} overflow-hidden ${className}`}>
      <motion.div className="absolute inset-[-12%_0]" style={{ y }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: position }} />
      </motion.div>
      {overlay && <div className={`absolute inset-0 ${overlay}`} />}
      {caption && (
        <span className={`absolute bottom-2 right-3 z-10 font-sans text-[10px] italic tracking-wide ${captionClass}`}>
          Visuel d'illustration
        </span>
      )}
    </div>
  );
}
