"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectPreview } from "@/components/ProjectPreview";
import { cardEntry, cardHover, fadeIn, viewportCards, viewportOnce } from "@/lib/motion";
import { CARD } from "@/lib/styles";
import { projects } from "@/data/projects";

export function Portfolio() {
  return (
    <Section id="portfolio">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 sm:mb-20">
        <SectionHeading>Портфоліо</SectionHeading>
        <motion.p
          custom={0.15}
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-sm text-white/50"
        >
          {projects.length} проєкти
        </motion.p>
      </div>

      {/* Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <motion.a
            key={project.id}
            href={project.liveUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            custom={i}
            variants={cardEntry}
            initial="hidden"
            whileInView="visible"
            viewport={viewportCards}
            whileHover={cardHover}
            className={`${CARD} flex flex-col p-5 sm:p-6`}
          >
            <ProjectPreview project={project} />

            <h3 className="mt-5 text-lg font-black text-white">{project.title}</h3>

            {project.task && (
              <p className="mt-4 text-sm text-white/60 leading-relaxed">
                <span className="text-white/40">Задача: </span>
                {project.task}
              </p>
            )}
            {project.solution && (
              <p className="mt-2.5 text-sm text-white/60 leading-relaxed flex-1">
                <span className="text-white/40">Рішення: </span>
                {project.solution}
              </p>
            )}

            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                {project.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1.5 text-xs text-white/45">
                    <span className="text-white/25 text-[10px]">✦</span>
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-sm font-bold text-white/50 group-hover:text-white transition-colors shrink-0">
                Переглянути →
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
