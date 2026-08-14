import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { CONTAINER } from "@/lib/styles";
import { TELEGRAM_URL, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Політика конфіденційності — Limiter studio",
  description:
    "Які дані збирає сайт Limiter studio, навіщо, де вони зберігаються і як їх видалити.",
  alternates: { canonical: "/privacy/" },
};

/** Дата останнього перегляду тексту. Оновлювати руками при змінах. */
const UPDATED = "14 серпня 2026";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-white/10 pt-8">
      <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-4">
        {title}
      </h2>
      <div className="flex flex-col gap-3 text-sm sm:text-base text-white/65 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

const link = "text-white underline underline-offset-4 hover:text-white/70 transition-colors";

export default function PrivacyPage() {
  return (
    <>
      <main>
        <div className={`${CONTAINER} pt-32 pb-24 max-w-3xl`}>
          <Link
            href="/"
            className="text-xs text-white/40 hover:text-white transition-colors"
          >
            ← Limiter studio
          </Link>

          <h1 className="mt-6 text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
            Політика конфіденційності
          </h1>
          <p className="mt-4 text-sm text-white/40">Оновлено: {UPDATED}</p>

          <p className="mt-8 text-base text-white/65 leading-relaxed">
            Цей документ пояснює, які дані збирає сайт {SITE_URL.replace(/^https?:\/\//, "")},
            навіщо вони потрібні, де зберігаються і як їх видалити. Сайт належить
            і адмініструється Limiter studio.
          </p>

          <div className="mt-14 flex flex-col gap-10">
            <Block title="Які дані збираємо">
              <p>
                <strong className="text-white font-semibold">Те, що ви вводите самі.</strong>{" "}
                У формі заявки — ім&apos;я, телефон або нік у Telegram і, за бажанням, сферу
                вашого бізнесу. Поле сфери необов&apos;язкове, решта потрібні, щоб відповісти.
              </p>
              <p>
                <strong className="text-white font-semibold">Те, що додається автоматично.</strong>{" "}
                Разом із заявкою зберігаються технічні дані про перехід: мітки рекламної
                кампанії (utm_source, utm_medium, utm_campaign, utm_content, utm_term),
                ідентифікатор кліку з Facebook (fbclid), сторінка відправки, адреса, з якої
                ви прийшли, і час. Це потрібно, щоб розуміти, яке оголошення спрацювало.
              </p>
              <p>
                Ми не запитуємо і не зберігаємо платіжні дані, паспортні дані чи будь-яку
                іншу чутливу інформацію.
              </p>
            </Block>

            <Block title="Навіщо вони потрібні">
              <p>
                Єдина мета — зв&apos;язатися з вами щодо вашого звернення, порахувати вартість
                і, якщо домовимось, виконати роботу. Ми не продаємо, не передаємо й не
                здаємо в оренду ваші контакти третім особам і не робимо розсилок.
              </p>
              <p>
                Правова підстава — ваша згода, яку ви даєте, коли надсилаєте форму. Її можна
                відкликати будь-коли, див. розділ про права.
              </p>
            </Block>

            <Block title="Де зберігаються">
              <p>
                Заявки потрапляють у Google Таблицю та дублюються листом на електронну пошту
                власника сайту. Оператор цих сервісів — Google LLC, дані обробляються на її
                серверах відповідно до{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  політики Google
                </a>
                . Доступ до таблиці має лише власник сайту.
              </p>
              <p>
                Заявки зберігаються, доки потрібні для роботи з вами, але не довше двох років
                із моменту останнього контакту. Після цього видаляються.
              </p>
            </Block>

            <Block title="Сторонні сервіси та cookies">
              <p>
                Власних cookies сайт не встановлює. Але використовує два зовнішні
                інструменти, які можуть записувати cookies та ідентифікатори у вашому
                браузері:
              </p>
              <p>
                <strong className="text-white font-semibold">Meta Pixel</strong> — фіксує
                перегляд сторінки та відправку форми, щоб оцінювати ефективність реклами у
                Facebook та Instagram.{" "}
                <a
                  href="https://www.facebook.com/privacy/policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  Політика Meta
                </a>
                .
              </p>
              <p>
                <strong className="text-white font-semibold">Google Analytics 4</strong> —
                показує знеособлену статистику: скільки людей відкрили сторінку, з яких
                джерел і як далеко прогорнули.{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  Політика Google
                </a>
                .
              </p>
              <p>
                Обидва можна заблокувати розширенням для браузера або налаштуваннями
                приватності — сайт від цього працюватиме як звичайно, форма теж.
              </p>
            </Block>

            <Block title="Ваші права">
              <p>
                Ви можете дізнатись, які саме ваші дані ми зберігаємо, виправити їх,
                видалити або відкликати згоду на обробку. Для цього достатньо написати{" "}
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={link}>
                  у Telegram
                </a>{" "}
                — це основний канал звернень. Відповідаємо й виконуємо запит протягом
                30 днів.
              </p>
              <p>
                Видалення даних не потребує пояснень: достатньо написати «видаліть мої
                дані» й вказати ім&apos;я або контакт, який ви лишали.
              </p>
            </Block>

            <Block title="Зміни">
              <p>
                Якщо політика зміниться, оновиться дата вгорі сторінки. Суттєві зміни
                стосуються лише нових звернень — заднім числом нічого не застосовується.
              </p>
            </Block>
          </div>

          <div className="mt-14 pt-8 border-t border-white/10">
            <Link
              href="/"
              className="inline-flex px-6 py-3.5 rounded-full border border-white/25 text-white text-sm font-semibold hover:border-white/60 transition-colors"
            >
              ← Повернутись на сайт
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
