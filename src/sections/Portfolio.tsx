"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 sm:py-32 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none"
          >
            Портфоліо
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-sm text-white/50"
          >
            {projects.length} проєкти
          </motion.p>
        </div>

        {/* Grid */}
        <div className="flex flex-col gap-4">
          {projects.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.liveUrl ?? project.repoUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className="relative group flex flex-row items-center gap-8 px-6 py-4 rounded-2xl bg-white/[0.05] border border-white/[0.12] hover:border-white/[0.28] overflow-hidden transition-colors"
            >
              <span className="absolute top-1 right-4 text-[4rem] font-black text-white/[0.05] leading-none select-none pointer-events-none">
                ↗
              </span>

              <h3 className="text-base font-black text-white shrink-0 relative z-10">
                {project.title}
              </h3>

              <p className="text-xs text-white/60 leading-relaxed flex-1 relative z-10 hidden sm:block">
                {project.description}
              </p>

              <div className="hidden md:flex items-center gap-2 shrink-0 relative z-10">
                {project.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1.5 text-xs text-white/55">
                    <span className="text-white/30 text-[10px]">✦</span>
                    {tag}
                  </span>
                ))}
              </div>

              <span className="text-xs font-bold text-white/50 group-hover:text-white transition-colors relative z-10 shrink-0">
                Переглянути →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
