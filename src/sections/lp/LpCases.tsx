"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectPreview } from "@/components/ProjectPreview";
import { projects } from "@/data/projects";
import { cardEntry, fadeIn, viewportCards, viewportOnce } from "@/lib/motion";
import { CARD } from "@/lib/styles";

/**
 * Явні id, а не перші три з масиву: порядок на головній сторінці
 * не повинен непомітно змінювати те, що бачить рекламний трафік.
 */
const SHOWN_IDS = ["nyam-pizza", "massage-website", "faceNbody"];

export function LpCases() {
  const shown = SHOWN_IDS.map((id) => projects.find((p) => p.id === id)).filter(
    (p) => p !== undefined,
  );

  return (
    <Section id="cases">
      <motion.p
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="text-xs font-bold tracking-[0.25em] uppercase text-white/35 mb-5"
      >
        Роботи
      </motion.p>

      <SectionHeading className="mb-12 sm:mb-16">
        Живі сайти, які
        <br />
        можна відкрити зараз
      </SectionHeading>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {shown.map((p, i) => (
          <motion.a
            key={p.id}
            href={p.liveUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            custom={i}
            variants={cardEntry}
            initial="hidden"
            whileInView="visible"
            viewport={viewportCards}
            className={`${CARD} flex flex-col p-5 sm:p-6`}
          >
            <ProjectPreview project={p} />

            <h3 className="mt-5 text-lg font-black text-white">{p.title}</h3>

            {p.task && (
              <p className="mt-4 text-sm text-white/60 leading-relaxed">
                <span className="text-white/40">Задача: </span>
                {p.task}
              </p>
            )}
            {p.solution && (
              <p className="mt-2.5 text-sm text-white/60 leading-relaxed flex-1">
                <span className="text-white/40">Рішення: </span>
                {p.solution}
              </p>
            )}

            <span className="mt-5 text-sm font-bold text-white/50 group-hover:text-white transition-colors">
              Переглянути сайт →
            </span>
          </motion.a>
        ))}
      </div>

      <motion.p
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        custom={0.1}
        className="mt-8 text-sm text-white/40"
      >
        Усього в портфоліо {projects.length} проєктів — решту покажу в Telegram.
      </motion.p>
    </Section>
  );
}
