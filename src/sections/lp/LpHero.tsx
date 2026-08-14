"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { LeadForm } from "@/components/LeadForm";
import { TELEGRAM_URL } from "@/lib/constants";
import { trackContact } from "@/lib/fbq";
import { EASE } from "@/lib/motion";
import { CONTAINER } from "@/lib/styles";

const TRUST = [
  "Макет — безкоштовно",
  "50% передоплата",
  "Домен лишається ваш",
];

export function LpHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/4 w-[600px] h-[600px] rounded-full bg-white/[0.025] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/[0.07] blur-[100px]" />
      </div>

      <div className={`${CONTAINER} relative pt-28 pb-16 sm:pt-32 sm:pb-24`}>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Left: offer */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex items-center gap-3 flex-wrap"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-green-500/30 bg-green-500/[0.08]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-semibold text-green-400 tracking-wide">
                  Беру проекти цього тижня
                </span>
              </span>
              <span className="text-[10px] text-white/35 tracking-[0.2em] uppercase">
                Сайти для малого бізнесу
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
              className="text-[clamp(2.1rem,6.5vw,4.4rem)] font-black tracking-tight leading-[1.02] text-white"
            >
              Сайт, який приносить
              <br />
              заявки — за 3–5 днів
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
              className="mt-6 text-base sm:text-lg text-white/65 leading-relaxed max-w-xl"
            >
              Роблю сайти для малого бізнесу — від 6 000 грн. Спершу безкоштовно
              покажу макет вашого майбутнього сайту. Платите тільки тоді, коли
              він вам сподобався.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <MagneticButton
                href="#order"
                className="px-7 py-4 rounded-full bg-white text-black text-base font-bold text-center hover:bg-white/90 transition-colors"
              >
                Отримати безкоштовний макет →
              </MagneticButton>
              <MagneticButton
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContact("hero-telegram")}
                className="px-7 py-4 rounded-full border border-white/30 text-white text-base font-semibold text-center hover:border-white/60 transition-colors"
              >
                Запитати в Telegram
              </MagneticButton>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
            >
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-white/50">
                  <span className="text-white/30 text-xs">✦</span>
                  {t}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right: form (desktop only — на мобільному працює #order) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="hidden lg:block rounded-2xl bg-white/[0.05] border border-white/[0.12] p-7"
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-2">
              Безкоштовно
            </p>
            <p className="text-xl font-black text-white leading-tight mb-1.5">
              Макет вашого сайту за 1 день
            </p>
            <p className="text-sm text-white/55 mb-6 leading-relaxed">
              Заповніть три поля — надішлю макет першого екрана й точну вартість.
            </p>
            <LeadForm formId="hero" submitLabel="Отримати макет" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
