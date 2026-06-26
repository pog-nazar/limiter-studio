"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MarqueeText } from "@/components/MarqueeText";
import { MagneticButton } from "@/components/MagneticButton";
import { TELEGRAM_URL } from "@/lib/constants";

const HEADING_LINES = ["РОЗРОБЛЯЄМО", "САЙТИ ЩО", "ПРОДАЮТЬ."];

export function Hero() {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true, amount: 0.1 });

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-white/[0.025] blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#f59e0b]/[0.06] blur-[100px]" />
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-[1400px] mx-auto px-6 sm:px-10 w-full pt-24 pb-10 relative">
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10 sm:mb-14 flex items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-green-500/30 bg-green-500/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] font-semibold text-green-400 tracking-wide">
              Відкритий до нових проектів
            </span>
          </span>
          <span className="text-[10px] text-white/35 tracking-[0.2em] uppercase hidden sm:block">
            Київ · Ukraine
          </span>
        </motion.div>

        {/* Heading */}
        <div ref={headingRef}>
          {HEADING_LINES.map((line, i) => (
            <div key={i} className="overflow-hidden leading-none">
              <motion.h1
                initial={{ y: "105%" }}
                animate={inView ? { y: 0 } : {}}
                transition={{
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1 + i * 0.11,
                }}
                className="text-[clamp(2.4rem,11vw,10.5rem)] font-black tracking-tight leading-[0.92] text-white"
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-sm text-white/60 max-w-xs leading-relaxed"
          >
            Landing page, e-commerce, веб-застосунки.
            <br />
            Від дизайну до деплою — без посередників.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-3"
          >
            <MagneticButton
              href="#contact"
              className="px-6 py-3 rounded-full bg-white text-black text-sm font-bold hover:bg-white/90 transition-colors"
            >
              Обговорити проект
            </MagneticButton>
            <MagneticButton
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-white/30 text-white text-sm font-semibold hover:border-white/60 transition-colors"
            >
              Telegram →
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <MarqueeText />

    </section>
  );
}
