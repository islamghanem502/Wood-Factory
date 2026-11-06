import { Analytics } from "@vercel/analytics/react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";

/* صفحة «من نحن» — مقالة: نفس الهيدر والفوتر، بلا أزرار عائمة ولا دعوة كبيرة في الفوتر */
export default function AboutApp() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Navbar home={false} />
      <main>
        <About />
      </main>
      <Footer home={false} cta={false} />
      <Analytics />
    </div>
  );
}
