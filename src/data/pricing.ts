export interface PricingItem {
  id: string;
  num: string;
  title: string;
  price: number;
  currency: string;
  features: string[];
}

export interface AddOnItem {
  title: string;
  price: string;
}

export const mainServices: PricingItem[] = [
  {
    id: "landing",
    num: "01",
    title: "Лендінг",
    price: 6000,
    currency: "грн",
    features: [
      "Індивідуальний дизайн",
      "Адаптивність під телефон і планшет",
      "Базова SEO-оптимізація",
      "Форми зворотного зв'язку",
      "Підключення домену та SSL",
    ],
  },
  {
    id: "business-card",
    num: "02",
    title: "Сайт-візитка",
    price: 9000,
    currency: "грн",
    features: [
      "3–5 сторінок",
      "Індивідуальний дизайн",
      "Адаптивність під усі пристрої",
      "Форми зворотного зв'язку",
      "Базове SEO",
    ],
  },
  {
    id: "business",
    num: "03",
    title: "Сайт для бізнесу",
    price: 12000,
    currency: "грн",
    features: [
      "Меню / послуги / галерея",
      "Форми замовлень або заявок",
      "Адаптивний дизайн",
      "Базове SEO",
      "Підключення домену",
    ],
  },
  {
    id: "corporate",
    num: "04",
    title: "Корпоративний сайт",
    price: 14000,
    currency: "грн",
    features: [
      "До 10 сторінок",
      "Послуги компанії",
      "Про компанію / команда / портфоліо",
      "Форми заявок",
      "Базове SEO + адаптивність",
    ],
  },
  {
    id: "ecommerce",
    num: "05",
    title: "Інтернет-магазин",
    price: 20000,
    currency: "грн",
    features: [
      "Каталог товарів (до 50 позицій)",
      "Кошик та сторінка товару",
      "Базова адмін-панель",
      "Онлайн-замовлення",
      "Базове SEO + SSL",
    ],
  },
];

export const addOns: AddOnItem[] = [
  { title: "Адмін-панель", price: "1 000 грн" },
  { title: "Онлайн-оплата", price: "1 000 грн" },
  { title: "Мультимовність", price: "1 000 грн" },
  { title: "Telegram-бот", price: "2 000 грн" },
  { title: "Термінова розробка", price: "+30%" },
];
