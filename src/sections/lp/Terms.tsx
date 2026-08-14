"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { cardEntry, fadeIn, viewportCards, viewportOnce } from "@/lib/motion";
import { CARD } from "@/lib/styles";
import { TELEGRAM_URL } from "@/lib/constants";
import { trackContact } from "@/lib/fbq";

const POINTS = [
  {
    num: "01",
    title: "Без посередників",
    text: "Дизайн, верстку й запуск роблю особисто, від першої розмови до готового сайту. Ви спілкуєтесь із тим, хто пише код, а не з менеджером.",
  },
  {
    num: "02",
    title: "Фіксована ціна",
    text: "Сума, названа після брифу, не змінюється по ходу роботи. Доплата — тільки якщо ви самі додаєте нове.",
  },
  {
    num: "03",
    title: "Доступи у вас",
    text: "Домен, хостинг і код належать вам. Захочете піти до іншого розробника — нічого не втратите.",
  },
];

export function Terms() {
  return (
    <Section id="terms">
      <motion.p
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="text-xs font-bold tracking-[0.25em] uppercase text-white/35 mb-5"
      >
        Умови
      </motion.p>

      <SectionHeading className="mb-12 sm:mb-16">Як я працюю</SectionHeading>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {POINTS.map((p, i) => (
          <motion.div
            key={p.num}
            custom={i}
            variants={cardEntry}
            initial="hidden"
            whileInView="visible"
            viewport={viewportCards}
            className={`${CARD} p-6 sm:p-7`}
          >
            <span className="block text-xs font-bold tracking-[0.2em] text-white/30 mb-3">
              [ {p.num} ]
            </span>
            <h3 className="text-lg font-black text-white mb-2">{p.title}</h3>
            <p className="text-sm text-white/60 leading-relaxed">{p.text}</p>
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
        Щось лишилось незрозумілим?{" "}
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContact("terms-telegram")}
          className="text-white underline underline-offset-4 hover:text-white/70 transition-colors"
        >
          Запитайте в Telegram
        </a>{" "}
        — відповім без «залиште заявку, менеджер передзвонить».
      </motion.p>
    </Section>
  );
}
