import { CONTACT, telLink } from "../config/contact";
import { IMAGES, FOOTER } from "../data/content";
import WhatsAppButton from "./WhatsAppButton";
import { Reveal } from "../lib/motion";

/* الفوتر: دعوة أخيرة + الشعار والحقوق، وكلمة "خشبي" الضخمة مقصوصة عند الحافة السفلية */
export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-espresso wood-overlay text-white overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* الدعوة الأخيرة */}
        <Reveal className="pt-20 pb-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-right">
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">{FOOTER.ctaTitle}</h2>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <WhatsAppButton message={FOOTER.whatsapp} size="lg">
              محادثة واتساب
            </WhatsAppButton>
            <a href={telLink} className="font-display font-semibold text-2xl num hover:text-oak-light transition-colors" dir="ltr">
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </Reveal>

        {/* الشعار والحقوق */}
        <div className="py-6 border-t border-line-dark flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <a href="#hero" className="flex items-center gap-3 text-white">
            <img src={IMAGES.logoCream} alt="" className="h-8 w-auto opacity-90" width="32" height="36" />
            <span className="font-display font-bold text-lg leading-none">
              خشبي
              <span className="ms-2 text-[10px] font-medium tracking-[0.2em] text-white/50">WOODEN</span>
            </span>
          </a>
          <p>© {new Date().getFullYear()} خشبي WOODEN. جميع الحقوق محفوظة.</p>
          <button type="button" onClick={scrollToTop} className="link-underline hover:text-white">
            العودة للأعلى ↑
          </button>
        </div>

        {/* كلمة خشبي — مقصوصة عند الحافة السفلية */}
        <div className="h-[19vw] sm:h-[15vw] lg:h-[12rem] overflow-hidden" aria-hidden>
          <span className="wood-text block font-display font-bold leading-none text-[30vw] sm:text-[24vw] lg:text-[19rem] select-none opacity-90 -mt-[0.22em]">
            خشبي
          </span>
        </div>
      </div>
    </footer>
  );
}
