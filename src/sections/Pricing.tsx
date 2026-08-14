"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { mainServices, addOns } from "@/data/pricing";
import { useCounter } from "@/hooks/useCounter";
import { SloganEasterEgg } from "@/components/SloganEasterEgg";
import { cardEntry, cardHover, fadeIn, fadeUp, viewportCards, viewportOnce } from "@/lib/motion";
import { CARD, H3 } from "@/lib/styles";

function PriceCard({
  item,
  index,
  wide = false,
}: {
  item: (typeof mainServices)[0];
  index: number;
  wide?: boolean;
}) {
  const { count, ref } = useCounter(item.price, 1.1);

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardEntry}
      initial="hidden"
      whileInView="visible"
      viewport={viewportCards}
      whileHover={cardHover}
      className={`${CARD} flex flex-col p-7 sm:p-8 ${
        wide ? "sm:col-span-2 sm:max-w-[calc(50%-0.5rem)] sm:mx-auto sm:w-full" : ""
      }`}
    >
      {/* Decorative number */}
      <span className="absolute top-3 right-5 text-[7rem] font-black text-white/[0.05] leading-none select-none pointer-events-none">
        {item.num}
      </span>

      {/* Title */}
      <h3 className="text-lg font-black text-white mb-5 relative z-10">{item.title}</h3>

      {/* Price */}
      <div className="flex items-baseline gap-2 mb-7 relative z-10">
        <span className="text-sm font-medium text-white/40 mr-1">від</span>
        <span className="text-4xl sm:text-5xl font-black tabular-nums text-accent">
          {count.toLocaleString("uk-UA")}
        </span>
        <span className="text-white/50 text-sm font-medium">грн</span>
      </div>

      {/* Features */}
      <ul className="space-y-2.5 flex-1 mb-7 relative z-10">
        {item.features.map((feat) => (
          <li key={feat} className="flex items-start gap-3 text-sm text-white/65">
            <span className="text-white/35 mt-0.5 shrink-0 text-xs">✦</span>
            {feat}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#contact"
        className="inline-flex items-center gap-2 text-sm font-bold text-white/50 group-hover:text-white transition-colors relative z-10 w-fit"
      >
        Замовити
        <motion.span
          animate={{ x: 0 }}
          whileHover={{ x: 3 }}
          className="inline-block"
        >
          →
        </motion.span>
      </a>
    </motion.div>
  );
}

export function Pricing() {
  return (
    <Section id="services" className="bg-panel">
      {/* Tagline easter egg */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mb-16 flex justify-center"
      >
        <SloganEasterEgg />
      </motion.div>

      {/* Header */}
      <div className="mb-16 sm:mb-20">
        <SectionHeading>Послуги та ціни</SectionHeading>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
        {mainServices.map((item, i) => (
          <PriceCard
            key={item.id}
            item={item}
            index={i}
            wide={i === mainServices.length - 1}
          />
        ))}
      </div>

      {/* Add-ons + payment */}
      <div className="flex flex-col gap-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h3 className={`${H3} mb-8`}>Додатково</h3>
          <div className="flex flex-wrap gap-3">
            {addOns.map((a) => (
              <div
                key={a.title}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/[0.12] bg-white/[0.04] hover:border-white/25 transition-colors"
              >
                <span className="text-sm text-white/65">{a.title}</span>
                <span className="text-sm font-bold text-white">{a.price}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          custom={0.1}
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-xs text-white/40"
        >
          Ціни вказані від. Фінальна вартість після обговорення.
        </motion.p>

        <motion.p
          custom={0.1}
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-xs text-white/35 border-t border-white/10 pt-6"
        >
          Оплата: 50% передплата · 50% після здачі &nbsp;·&nbsp; грн / $ / USDT &nbsp;·&nbsp; Домен і хостинг оплачує клієнт окремо
        </motion.p>
      </div>
    </Section>
  );
}
