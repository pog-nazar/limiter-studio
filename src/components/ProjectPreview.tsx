import Image from "next/image";
import type { Project } from "@/lib/types";

/**
 * Рамка браузера. У рядку адреси свідомо не домен, а ніша проєкту: частина робіт
 * розміщена на технічному хостингу, і його адреса читалась би як «тестовий сайт».
 *
 * Показує скриншот, якщо в проєкті заповнене `image`, інакше — заглушку з назвою:
 * додати скриншоти можна будь-коли, не чіпаючи розмітку.
 */
export function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/[0.12] bg-ink">
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/[0.08] bg-white/[0.03]">
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="ml-2 text-[10px] text-white/35 truncate">
          {project.niche}
        </span>
      </div>

      {project.image ? (
        <Image
          src={project.image}
          alt={`Скриншот сайту ${project.title}`}
          width={800}
          height={500}
          className="w-full h-auto"
        />
      ) : (
        <div className="aspect-[16/10] flex flex-col items-center justify-center gap-2 px-6 text-center">
          <span className="text-2xl sm:text-3xl font-black text-white/25 tracking-tight">
            {project.title}
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/20">
            Відкрити сайт →
          </span>
        </div>
      )}
    </div>
  );
}
