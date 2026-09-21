import { CONTACT } from "../config/contact";
import { IMAGES, FOOTER } from "../data/content";
import WhatsAppButton, { CallLink } from "./WhatsAppButton";
import { Reveal } from "../lib/motion";

/* الفوتر: دعوة أخيرة + الشعار والحقوق */
export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-espresso wood-overlay text-white overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* الدعوة الأخيرة */}
        <Reveal className="pt-14 sm:pt-20 pb-10 sm:pb-14 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 text-right">
          <h2 className="font-display font-bold text-xl sm:text-4xl lg:text-5xl">{FOOTER.ctaTitle}</h2>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <WhatsAppButton message={FOOTER.whatsapp} placement="footer" size="lg">
              محادثة واتساب
            </WhatsAppButton>
            <CallLink placement="footer" className="font-display font-semibold text-xl sm:text-2xl num hover:text-oak-light transition-colors" dir="ltr">
              {CONTACT.phoneDisplay}
            </CallLink>
          </div>
        </Reveal>

        {/* الشعار والحقوق */}
        <div className="py-6 pb-8 border-t border-line-dark flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
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

      </div>
    </footer>
  );
}
