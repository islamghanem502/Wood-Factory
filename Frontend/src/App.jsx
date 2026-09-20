import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import ConsultationModal from "./components/ConsultationModal";
import CostCalculator from "./components/CostCalculator";

import Hero from "./sections/Hero";
import Stats from "./sections/Stats";
import Gallery from "./sections/Gallery";
import Specs from "./sections/Specs";
import Testimonials from "./sections/Testimonials";
import Faq from "./sections/Faq";

export default function App() {
  const [consultOpen, setConsultOpen] = useState(false);
  const [consultService, setConsultService] = useState("أكواخ هرمية A-Frame");

  // يفتح نافذة الاستشارة (اختيارياً مع اسم الباقة/المشروع)
  const openConsultation = (service) => {
    if (service) setConsultService(service);
    setConsultOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c0e] text-[#f4ede4] overflow-x-hidden selection:bg-[#cba157]/30 selection:text-[#ffd700]">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <Stats />

        <section id="calculator" className="py-20 bg-[#0e1015] relative border-y border-[#cba157]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <CostCalculator onOpenConsultation={openConsultation} />
          </div>
        </section>

        <Gallery onOpenConsultation={openConsultation} />
        <Specs />
        <Testimonials />
        <Faq />
      </main>

      <FloatingActions />
      <ConsultationModal open={consultOpen} onOpenChange={setConsultOpen} defaultService={consultService} />
      <Footer onOpenConsultation={() => openConsultation()} />
    </div>
  );
}
