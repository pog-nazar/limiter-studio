import type { Metadata } from "next";
import { LpHeader } from "@/sections/lp/LpHeader";
import { LpHero } from "@/sections/lp/LpHero";
import { Pains } from "@/sections/lp/Pains";
import { Benefits } from "@/sections/lp/Benefits";
import { LpCases } from "@/sections/lp/LpCases";
import { Process } from "@/sections/Process";
import { LpPricing } from "@/sections/lp/LpPricing";
import { Terms } from "@/sections/lp/Terms";
import { Faq } from "@/sections/Faq";
import { LpOrder } from "@/sections/lp/LpOrder";
import { StickyCta } from "@/components/StickyCta";
import { LeadPopup } from "@/components/LeadPopup";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Сайт для вашого бізнесу за 3–5 днів — від 6 000 грн",
  description:
    "Роблю сайти для малого бізнесу, які приносять заявки. Безкоштовно покажу макет вашого сайту до оплати. Фіксована ціна, домен лишається у вас.",
  openGraph: {
    title: "Сайт, який приносить заявки — за 3–5 днів",
    description:
      "Безкоштовний макет вашого майбутнього сайту за 1 день. Від 6 000 грн, фіксована ціна.",
    type: "website",
    locale: "uk_UA",
    // Об'єкт openGraph заміщує батьківський цілком, а не зливається з ним,
    // тож siteName і url треба вказати ще раз — інакше вони зникають.
    siteName: "Limiter studio",
    url: "/lp/",
  },
  // Посадкова під рекламу не повинна конкурувати з головною у пошуку.
  robots: { index: false, follow: true },
  // Без цього успадковується canonical на "/" з кореневого layout — разом
  // із noindex це суперечливий сигнал для пошуковика.
  alternates: { canonical: "/lp/" },
};

export default function LandingPage() {
  return (
    <>
      <LpHeader />
      <main>
        <LpHero />
        <Pains />
        <Benefits />
        <LpCases />
        <Process className="bg-panel" />
        <LpPricing />
        <Terms />
        <Faq className="bg-panel" />
        <LpOrder />
      </main>
      <Footer />
      <StickyCta />
      <LeadPopup />
    </>
  );
}
