import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "nyam-pizza",
    title: "Nyam Pizza",
    description:
      "Сайт піцерії з онлайн-меню, адмін-панеллю та можливістю оформити замовлення. Адаптивна верстка.",
    tags: ["JavaScript", "HTML", "CSS"],
    liveUrl: "https://nyam-pizza-pomichna.netlify.app/",
    repoUrl: "https://github.com/pog-nazar/nyam-pizza",
  },
  {
    id: "logoipsum",
    title: "Logoipsum",
    description:
      "Лендінг SaaS-платформи для управління підписками: аналітика, бенчмаркінг, аудит цін і утримання клієнтів.",
    tags: ["HTML", "CSS"],
    liveUrl: "https://pog-nazar.github.io/logoipsum/",
    repoUrl: "https://github.com/pog-nazar/logoipsum",
  },
  {
    id: "madelyn-torff",
    title: "Madelyn Torff",
    description:
      "Портфоліо-сайт UI/UX дизайнера: галерея проєктів, секція про себе та форма для зв'язку.",
    tags: ["HTML", "CSS"],
    liveUrl: "https://pog-nazar.github.io/madelyn-torff/",
    repoUrl: "https://github.com/pog-nazar/madelyn-torff",
  },
];
