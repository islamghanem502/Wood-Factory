import { Analytics } from "@vercel/analytics/react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import About from "./pages/About";
import { ABOUT } from "./data/content";

/* صفحة «من نحن» — نفس الهيدر والفوتر، والروابط تعود إلى أقسام الرئيسية */
export default function AboutApp() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Navbar home={false} />
      <main>
        <About />
      </main>
      <FloatingActions />
      <Footer home={false} ctaTitle={ABOUT.cta.title} message={ABOUT.cta.whatsapp} />
      <Analytics />
    </div>
  );
}
