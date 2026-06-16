import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { Pricing } from "@/sections/Pricing";
import { Portfolio } from "@/sections/Portfolio";
import { Contact } from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
