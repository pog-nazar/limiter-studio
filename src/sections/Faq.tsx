"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { faq } from "@/data/faq";
import { cardEntry, fadeIn, viewportCards, viewportOnce, EASE } from "@/lib/motion";

interface Props {
  /** Фон секції — щоб чергувати смуги залежно від сусідів на сторінці. */
  className?: string;
}

export function Faq({ className = "" }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className={className}>
      <motion.p
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="text-xs font-bold tracking-[0.25em] uppercase text-white/35 mb-5"
      >
        Питання
      </motion.p>

      <SectionHeading className="mb-12 sm:mb-16">
        Те, що питають
        <br />
        найчастіше
      </SectionHeading>

      <div className="flex flex-col gap-3 max-w-3xl">
        {faq.map((item, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={item.q}
              custom={i}
              variants={cardEntry}
              initial="hidden"
              whileInView="visible"
              viewport={viewportCards}
              className="rounded-2xl bg-white/[0.05] border border-white/[0.12] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                className="w-full flex items-start justify-between gap-6 px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-base font-bold text-white leading-snug">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="text-xl text-white/40 leading-none shrink-0 mt-0.5"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-white/60 leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
