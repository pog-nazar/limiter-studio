"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { MagneticButton } from "@/components/MagneticButton";
import { LeadForm } from "@/components/LeadForm";
import { cardEntry, fadeIn, viewportCards, viewportOnce } from "@/lib/motion";
import { CARD } from "@/lib/styles";
import { TELEGRAM_URL, PHONE } from "@/lib/constants";
import { trackContact } from "@/lib/fbq";

export function Contact() {
  return (
    <Section id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

        {/* Left: заголовок + прямі канали */}
        <div className="flex flex-col gap-6">
          <SectionHeading>Контакт</SectionHeading>

          <motion.p
            custom={0.1}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="text-base text-white/65 leading-relaxed max-w-md"
          >
            Можу безкоштовно показати макет першого екрана вашого сайту — до
            будь-яких зобов&apos;язань. Просто подивитесь і вирішите.
          </motion.p>

          <motion.div
            custom={0.2}
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-4 mt-2"
          >
            {/* Telegram */}
            <MagneticButton
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("contact-telegram")}
              className={`${CARD} flex items-center justify-between gap-4 px-6 py-5 w-full`}
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                <span className="text-base font-semibold text-white">Telegram</span>
                <span className="text-sm text-white/50">@pog_Nazar</span>
              </div>
              <span className="text-white/45 group-hover:text-white transition-colors text-sm font-bold">↗</span>
            </MagneticButton>

            {/* Phone */}
            <MagneticButton
              href={`tel:${PHONE.replace(/\s|\(|\)|-/g, "")}`}
              onClick={() => trackContact("contact-phone")}
              className={`${CARD} flex items-center justify-between gap-4 px-6 py-5 w-full`}
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-white/40 shrink-0" />
                <span className="text-base font-semibold text-white">Телефон</span>
                <span className="text-sm text-white/50">{PHONE}</span>
              </div>
              <span className="text-white/45 group-hover:text-white transition-colors text-sm font-bold">↗</span>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right: форма */}
        <motion.div
          custom={1}
          variants={cardEntry}
          initial="hidden"
          whileInView="visible"
          viewport={viewportCards}
          className={`${CARD} p-7 sm:p-8 h-fit`}
        >
          <p className="text-xl font-black text-white mb-1.5">
            Або залиште контакти
          </p>
          <p className="text-sm text-white/55 mb-6 leading-relaxed">
            Напишу сам протягом дня — разом із макетом і точною вартістю.
          </p>
          <LeadForm formId="contact" />
        </motion.div>

      </div>
    </Section>
  );
}
