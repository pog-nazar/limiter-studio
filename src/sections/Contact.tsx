"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { TELEGRAM_URL, PHONE } from "@/lib/constants";

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left */}
          <div className="flex flex-col gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none"
            >
              Контакт
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base text-white/60"
            >
              Почнемо проект?
            </motion.p>
          </div>

          {/* Right: contacts */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex flex-col gap-4 justify-center"
          >
            {/* Telegram */}
            <MagneticButton
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 px-6 py-5 rounded-2xl bg-white/[0.05] border border-white/[0.12] hover:border-white/[0.28] transition-colors group w-full"
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
              className="flex items-center justify-between gap-4 px-6 py-5 rounded-2xl bg-white/[0.05] border border-white/[0.12] hover:border-white/[0.28] transition-colors group w-full"
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
      </div>
    </section>
  );
}
