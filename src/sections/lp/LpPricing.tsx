"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { mainServices, addOns } from "@/data/pricing";
import { cardEntry, cardHover, fadeIn, viewportCards, viewportOnce } from "@/lib/motion";
import { CARD } from "@/lib/styles";

/**
 * На посадковій показуємо три тарифи, а не п'ять: холодний трафік губиться
 * у виборі. Решту згадуємо рядком нижче.
 */
const SHOWN_IDS = ["landing", "business-card", "ecommerce"];

export function LpPricing() {
  const shown = SHOWN_IDS.map((id) => mainServices.find((s) => s.id === id)).filter(
    (s) => s !== undefined,
  );
  const rest = mainServices.filter((s) => !SHOWN_IDS.includes(s.id));

  return (
    <Section id="pricing">
      <motion.p
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="text-xs font-bold tracking-[0.25em] uppercase text-white/35 mb-5"
      >
        Ціни
      </motion.p>

      <SectionHeading className="mb-4">Скільки це коштує</SectionHeading>

      <motion.p
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="text-base text-white/60 mb-12 sm:mb-16 max-w-xl leading-relaxed"
      >
        Точну суму називаю після 15-хвилинної розмови — і більше її не змінюю.
        Ніяких «виявилось складніше, ніж думали».
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {shown.map((item, i) => (
          <motion.div
            key={item.id}
            custom={i}
            variants={cardEntry}
            initial="hidden"
            whileInView="visible"
            viewport={viewportCards}
            whileHover={cardHover}
            className={`${CARD} flex flex-col p-7 sm:p-8`}
          >
            <span className="absolute top-3 right-5 text-[7rem] font-black text-white/[0.05] leading-none select-none pointer-events-none">
              {item.num}
            </span>

            <h3 className="text-lg font-black text-white mb-5 relative z-10">
              {item.title}
            </h3>

            <div className="flex items-baseline gap-2 mb-7 relative z-10">
              <span className="text-sm font-medium text-white/40 mr-1">від</span>
              <span className="text-4xl sm:text-5xl font-black tabular-nums text-accent">
                {item.price.toLocaleString("uk-UA")}
              </span>
              <span className="text-white/50 text-sm font-medium">грн</span>
            </div>

            <ul className="space-y-2.5 flex-1 mb-7 relative z-10">
              {item.features.map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-sm text-white/65">
                  <span className="text-white/35 mt-0.5 shrink-0 text-xs">✦</span>
                  {feat}
                </li>
              ))}
            </ul>

            <a
              href="#order"
              className="inline-flex items-center gap-2 text-sm font-bold text-white/50 group-hover:text-white transition-colors relative z-10 w-fit"
            >
              Порахувати точно →
            </a>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        custom={0.1}
        className="mt-10 flex flex-col gap-6"
      >
        <p className="text-sm text-white/50">
          Також роблю{" "}
          {rest.map((r, i) => (
            <span key={r.id}>
              {i > 0 && ", "}
              <span className="text-white/70">{r.title.toLowerCase()}</span> — від{" "}
              {r.price.toLocaleString("uk-UA")} грн
            </span>
          ))}
          .
        </p>

        <div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/35 mb-4">
            Додатково
          </p>
          <div className="flex flex-wrap gap-3">
            {addOns.map((a) => (
              <div
                key={a.title}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/[0.12] bg-white/[0.04]"
              >
                <span className="text-sm text-white/65">{a.title}</span>
                <span className="text-sm font-bold text-white">{a.price}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-white/35 border-t border-white/10 pt-6 leading-relaxed">
          Оплата: 50% передплата · 50% після здачі &nbsp;·&nbsp; грн / $ / USDT
          &nbsp;·&nbsp; Домен і хостинг реєструються на вас і оплачуються окремо
        </p>
      </motion.div>
    </Section>
  );
}
