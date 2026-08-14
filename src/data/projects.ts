import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "nyam-pizza",
    title: "Nyam Pizza",
    niche: "Піцерія · доставка їжі",
    description:
      "Сайт піцерії з онлайн-меню, адмін-панеллю та можливістю оформити замовлення. Адаптивна верстка.",
    task: "Замовлення приймали в директі та по телефону — меню доводилось диктувати вручну.",
    solution:
      "Онлайн-меню з категоріями, кошик і оформлення замовлення на сайті. Адмінка, щоб змінювати страви й ціни без розробника.",
    tags: ["JavaScript", "HTML", "CSS"],
    liveUrl: "https://nyam-pizza-pomichna.netlify.app/",
  },
  {
    id: "svitlachok-website",
    title: "Svitlachok",
    niche: "Бренд · товари",
    description:
      "Сучасний сайт для бренду Світлячок. TypeScript, акцент на анімаціях та UX.",
    task: "Бренду потрібна була присутність в інтернеті, яка виглядає дорожче за конкурентів.",
    solution:
      "Сайт з акцентом на анімації та подачу — щоб бренд запам'ятовувався з першого екрана.",
    tags: ["TypeScript", "CSS"],
    liveUrl: "https://pog-nazar.github.io/svitlachok-website/",
  },
  {
    id: "nigel-braithwaite-housing",
    title: "Nigel Braithwaite",
    niche: "Нерухомість · агентство",
    description:
      "Лендінг агентства нерухомості з каталогом об'єктів та формою зв'язку.",
    task: "Об'єкти показували розрізненими фото — не було де подивитись усе одразу.",
    solution:
      "Каталог об'єктів із фільтрами й формою звернення по конкретному об'єкту.",
    tags: ["HTML", "CSS"],
    liveUrl: "https://pog-nazar.github.io/nigel-braithwaite-housing/",
  },
  {
    id: "faceNbody",
    title: "Face & Body",
    niche: "Школа масажу · навчання",
    description:
      "Сайт школи масажу: програми курсів, викладачі, онлайн-запис та держдиплом.",
    task: "Треба було пояснити програму курсів і зняти сумніви щодо цінності навчання.",
    solution:
      "Сторінка з програмами, викладачами та інформацією про диплом державного зразка. Запис на курс через форму.",
    tags: ["HTML", "CSS"],
    liveUrl: "https://pog-nazar.github.io/faceNbody/",
  },
  {
    id: "massage-website",
    title: "Serenity Salon",
    niche: "Масажний салон · Київ",
    description:
      "Преміум масажний салон у Києві: послуги, ціни та онлайн-запис до спеціаліста.",
    task: "Клієнти не бачили вартості послуг і йшли до салонів, де ціни вказані відкрито.",
    solution:
      "Прайс на видноті, картки послуг із описом і тривалістю, форма онлайн-запису до конкретного спеціаліста.",
    tags: ["HTML", "CSS"],
    liveUrl: "https://pog-nazar.github.io/massage-website/",
  },
];
