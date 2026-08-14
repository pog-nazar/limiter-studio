"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { LeadForm } from "@/components/LeadForm";
import { leadMagnet } from "@/data/lp";
import { cardEntry, fadeIn, viewportCards, viewportOnce } from "@/lib/motion";
import { CARD, H2 } from "@/lib/styles";
import { TELEGRAM_URL, PHONE } from "@/lib/constants";
import { trackContact } from "@/lib/fbq";

export function LpOrder() {
  return (
    <Section id="order">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Offer */}
        <div>
          <motion.p
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-xs font-bold tracking-[0.25em] uppercase text-accent mb-5"
          >
            {leadMagnet.badge}
          </motion.p>

          <motion.h2
            variants={cardEntry}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className={H2}
          >
            {leadMagnet.title}
          </motion.h2>

          <motion.p
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            custom={0.1}
            className="mt-6 text-base text-white/65 leading-relaxed max-w-xl"
          >
            {leadMagnet.text}
          </motion.p>

          <motion.ul
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            custom={0.2}
            className="mt-8 flex flex-col gap-3"
          >
            {leadMagnet.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-base text-white/70">
                <span className="text-accent mt-1 shrink-0 text-xs">✦</span>
                {b}
              </li>
            ))}
          </motion.ul>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            custom={0.3}
            className="mt-10 pt-8 border-t border-white/10 flex flex-col gap-3"
          >
            <p className="text-sm text-white/40">Або зв&apos;яжіться напряму:</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact("order-telegram")}
                className="px-5 py-3 rounded-full border border-white/[0.18] text-sm font-semibold text-white hover:border-white/50 transition-colors"
              >
                Telegram @pog_Nazar
              </a>
              <a
                href={`tel:${PHONE.replace(/\s|\(|\)|-/g, "")}`}
                onClick={() => trackContact("order-phone")}
                className="px-5 py-3 rounded-full border border-white/[0.18] text-sm font-semibold text-white hover:border-white/50 transition-colors"
              >
                {PHONE}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Form */}
        <motion.div
          custom={1}
          variants={cardEntry}
          initial="hidden"
          whileInView="visible"
          viewport={viewportCards}
          className={`${CARD} p-7 sm:p-8 lg:sticky lg:top-24`}
        >
          <p className="text-xl font-black text-white mb-1.5">Заявка на макет</p>
          <p className="text-sm text-white/55 mb-6 leading-relaxed">
            Три поля — і протягом дня надішлю макет разом із точною вартістю.
          </p>
          <LeadForm formId="order" submitLabel="Отримати макет" />
        </motion.div>
      </div>
    </Section>
  );
}
