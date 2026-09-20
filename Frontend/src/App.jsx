import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import CostCalculator from "./components/CostCalculator";

import Hero from "./sections/Hero";
import Numbers from "./sections/Numbers";
import Specs from "./sections/Specs";
import Gallery from "./sections/Gallery";
import Testimonials from "./sections/Testimonials";
import Faq from "./sections/Faq";

/* ترتيب الأقسام وإيقاع الألوان: فاتح → بني → فاتح → بني → كريمي → فاتح → كريمي → بني داكن */
export default function App() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Navbar />
      <main>
        <Hero />
        <Numbers />
        <Specs />
        <Gallery />
        <CostCalculator />
        <Testimonials />
        <Faq />
      </main>
      <FloatingActions />
      <Footer />
    </div>
  );
}
