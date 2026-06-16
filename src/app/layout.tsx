import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Limiter studio — Веб-розробка та UI дизайн",
  description:
    "Розробляю сучасні веб-сайти та застосунки, які конвертують відвідувачів у клієнтів. Next.js, React, TypeScript, Tailwind CSS.",
  keywords: ["веб-розробник", "Next.js", "React", "TypeScript", "UI/UX", "frontend"],
  authors: [{ name: "Назар Погребняк" }],
  openGraph: {
    title: "Limiter studio — Веб-розробка та UI дизайн",
    description: "Сучасні веб-сайти та застосунки, які конвертують",
    type: "website",
    locale: "uk_UA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${inter.variable}`}>
      <body className="min-h-screen bg-[#0f0f0f] text-white antialiased">
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
