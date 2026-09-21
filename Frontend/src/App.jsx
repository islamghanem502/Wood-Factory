import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import CostCalculator from "./components/CostCalculator";

import Hero from "./sections/Hero";
import Numbers from "./sections/Numbers";
import Offer from "./sections/Offer";
import Specs from "./sections/Specs";
import Ideas from "./sections/Ideas";
import Process from "./sections/Process";
import Testimonials from "./sections/Testimonials";
import { SECTIONS } from "./data/content";
import Faq from "./sections/Faq";

/* ترتيب الأقسام وإيقاع الألوان: أبيض → إسبريسو → أبيض → إسبريسو → أبيض → إسبريسو → أبيض → إسبريسو */
export default function App() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Navbar />
      <main>
        <Hero />
        <Numbers />
        <Offer />
        <Specs />
        <Ideas />
        <CostCalculator />
        <Process />
        {SECTIONS.reviews && <Testimonials />}
        <Faq />
      </main>
      <FloatingActions />
      <Footer />
    </div>
  );
}
