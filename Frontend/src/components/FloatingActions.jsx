import { useEffect, useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { waLink, telLink } from "../config/contact";
import { HERO } from "../data/content";

/* زرا الواتساب والاتصال — يظهران بعد تجاوز الهيرو */
export default function FloatingActions() {
  const [visible, setVisible] = useState(false);
  const [calcInView, setCalcInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 2.2);
    window.addEventListener("scroll", onScroll, { passive: true });
    // على الجوال يفسح المكان لشريط الحاسبة السفلي
    const calc = document.getElementById("calculator");
    const io = calc ? new IntersectionObserver(([e]) => setCalcInView(e.isIntersecting), { threshold: 0.05 }) : null;
    io?.observe(calc);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed bottom-5 left-5 z-50 flex flex-col gap-2.5 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"} ${calcInView ? "max-lg:opacity-0 max-lg:pointer-events-none" : ""
      }`}
    >
      <a
        href={waLink(HERO.whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-oak text-ink flex items-center justify-center shadow-lg shadow-ink/20 hover:bg-oak-light transition-colors"
        title="محادثة واتساب"
        aria-label="محادثة واتساب"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
      <a
        href={telLink}
        className="w-12 h-12 rounded-full bg-white text-ink border border-line flex items-center justify-center shadow-lg shadow-ink/10 hover:bg-stone transition-colors"
        title="اتصال هاتفي"
        aria-label="اتصال هاتفي"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}
