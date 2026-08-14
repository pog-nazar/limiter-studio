import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { Portfolio } from "@/sections/Portfolio";
import { Pricing } from "@/sections/Pricing";
import { Process } from "@/sections/Process";
import { Faq } from "@/sections/Faq";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <Pricing />
        <Process />
        <Faq className="bg-panel" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
