"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { processSteps } from "@/data/process";
import { cardEntry, fadeIn, viewportCards, viewportOnce } from "@/lib/motion";
import { CARD } from "@/lib/styles";

interface Props {
  /** Фон секції — щоб чергувати смуги залежно від сусідів на сторінці. */
  className?: string;
}

export function Process({ className = "" }: Props) {
  return (
    <Section id="process" className={className}>
      <motion.p
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="text-xs font-bold tracking-[0.25em] uppercase text-white/35 mb-5"
      >
        Як проходить робота
      </motion.p>

      <SectionHeading className="mb-12 sm:mb-16">
        Від розмови
        <br />
        до запуску
      </SectionHeading>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {processSteps.map((s, i) => (
          <motion.div
            key={s.num}
            custom={i}
            variants={cardEntry}
            initial="hidden"
            whileInView="visible"
            viewport={viewportCards}
            className={`${CARD} flex flex-col p-6 sm:p-7`}
          >
            <span className="text-xs font-bold tracking-[0.2em] text-white/30">
              {`// ${s.num}`}
            </span>
            <span className="mt-1 text-xs text-accent font-semibold">{s.timing}</span>
            <h3 className="mt-4 text-lg font-black text-white">{s.title}</h3>
            <p className="mt-2.5 text-sm text-white/60 leading-relaxed">{s.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        custom={0.1}
        className="mt-8 text-sm text-white/50"
      >
        Разом — від 3 днів для лендінга. Точний термін називаю після першої розмови.
      </motion.p>
    </Section>
  );
}
