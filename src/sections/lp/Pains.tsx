"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { pains } from "@/data/lp";
import { cardEntry, fadeIn, viewportCards, viewportOnce } from "@/lib/motion";
import { CARD } from "@/lib/styles";

export function Pains() {
  return (
    <Section id="pains">
      <motion.p
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="text-xs font-bold tracking-[0.25em] uppercase text-white/35 mb-5"
      >
        Знайомо?
      </motion.p>

      <SectionHeading className="mb-12 sm:mb-16">
        Бізнес є.
        <br />
        Заявок немає.
      </SectionHeading>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pains.map((p, i) => (
          <motion.div
            key={p.num}
            custom={i}
            variants={cardEntry}
            initial="hidden"
            whileInView="visible"
            viewport={viewportCards}
            className={`${CARD} p-6 sm:p-7 hover:border-white/[0.12]`}
          >
            <span className="block text-xs font-bold tracking-[0.2em] text-white/30 mb-3">
              {`// ${p.num}`}
            </span>
            <p className="text-base text-white/75 leading-relaxed">{p.text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
