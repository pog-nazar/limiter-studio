"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { benefits } from "@/data/lp";
import { cardEntry, fadeIn, viewportCards, viewportOnce } from "@/lib/motion";
import { CARD } from "@/lib/styles";

export function Benefits() {
  return (
    <Section id="benefits" className="bg-panel">
      <motion.p
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="text-xs font-bold tracking-[0.25em] uppercase text-white/35 mb-5"
      >
        Рішення
      </motion.p>

      <SectionHeading className="mb-12 sm:mb-16">
        Сайт, який працює
        <br />
        як інструмент продажу
      </SectionHeading>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {benefits.map((b, i) => (
          <motion.div
            key={b.num}
            custom={i}
            variants={cardEntry}
            initial="hidden"
            whileInView="visible"
            viewport={viewportCards}
            className={`${CARD} p-6 sm:p-7`}
          >
            <span className="absolute top-2 right-4 text-[4.5rem] font-black text-white/[0.05] leading-none select-none pointer-events-none">
              {b.num}
            </span>
            <h3 className="text-lg font-black text-white mb-2.5 relative z-10">
              {b.title}
            </h3>
            <p className="text-sm text-white/60 leading-relaxed relative z-10">
              {b.text}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
