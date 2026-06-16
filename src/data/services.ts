import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    icon: "🖥️",
    title: "Landing Page",
    description: "Конвертуюча посадкова сторінка, яка перетворює відвідувачів у покупців.",
    features: [
      "Адаптивний дизайн (mobile-first)",
      "PageSpeed 90+ на мобільних",
      "Анімації та мікровзаємодії",
      "A/B тестування CTA",
      "Готова за 7–14 днів",
    ],
  },
  {
    icon: "🛒",
    title: "Інтернет-магазин",
    description: "Повноцінний e-commerce з оплатою, каталогом та адмін-панеллю.",
    features: [
      "Оплата через LiqPay / Stripe",
      "Інтеграція з Nova Poshta",
      "Адмін-панель для товарів",
      "SEO-оптимізація",
      "Підтримка 10 000+ SKU",
    ],
  },
  {
    icon: "⚙️",
    title: "Веб-застосунок",
    description: "SaaS, CRM, ERP та будь-які складні системи під ваш бізнес.",
    features: [
      "Архітектура Next.js + Node.js",
      "Авторизація та ролі",
      "REST / GraphQL / tRPC API",
      "Деплой на Vercel / AWS",
      "Технічна підтримка",
    ],
  },
  {
    icon: "🎨",
    title: "UI/UX Дизайн",
    description: "Дизайн-система та прототип у Figma перед розробкою.",
    features: [
      "User Research & Wireframes",
      "Figma-прототип з інтерактивністю",
      "Дизайн-система (токени, компоненти)",
      "Handoff для розробників",
      "Ітерації без обмежень",
    ],
  },
];
