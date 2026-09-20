import { CONTACT, telLink } from "../config/contact";
import { IMAGES, NAV_LINKS, SERVICE_AREAS, FOOTER } from "../data/content";
import WhatsAppButton from "./WhatsAppButton";
import { Reveal } from "../lib/motion";

/*
  الفوتر: دعوة أخيرة للتواصل، ثم الأعمدة (عن خشبي / الأقسام / المواصفات / التواصل)،
  وكلمة "خشبي" الضخمة بنسيج الخشب مقصوصة عند حافة الصفحة السفلية.
*/
export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-espresso wood-overlay text-white overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* الدعوة الأخيرة */}
        <Reveal className="pt-20 pb-12 border-b border-line-dark grid lg:grid-cols-12 gap-8 items-center text-right">
          <div className="lg:col-span-7">
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl">{FOOTER.ctaTitle}</h2>
            <p className="mt-3 text-white/65 text-base sm:text-lg max-w-lg">{FOOTER.ctaText}</p>
          </div>
          <div className="lg:col-span-5 flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
            <WhatsAppButton message={FOOTER.whatsapp} size="lg">
              محادثة واتساب
            </WhatsAppButton>
            <a href={telLink} className="font-display font-semibold text-2xl num text-white hover:text-oak-light transition-colors" dir="ltr">
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </Reveal>

        {/* الأعمدة */}
        <div className="py-14 grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10 text-right">
          <Reveal className="col-span-2 lg:col-span-4">
            <div className="flex items-center gap-3">
              <img src={IMAGES.logoCream} alt="" className="h-9 w-auto opacity-90" width="32" height="36" />
              <span className="font-display font-bold text-xl leading-none">
                خشبي
                <span className="ms-2 text-[10px] font-medium tracking-[0.2em] text-white/50">WOODEN</span>
              </span>
            </div>
            <p className="mt-5 text-white/65 leading-relaxed max-w-sm">{FOOTER.about}</p>
            <p className="mt-4 text-sm text-white/45 max-w-sm">{SERVICE_AREAS}</p>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-2">
            <h4 className="text-xs tracking-[0.18em] text-white/45 mb-4">الأقسام</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-underline text-white/85 hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140} className="lg:col-span-3">
            <h4 className="text-xs tracking-[0.18em] text-white/45 mb-4">المواصفات</h4>
            <ul className="space-y-2.5 text-white/85">
              {FOOTER.specs.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-oak-light shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200} className="col-span-2 lg:col-span-3">
            <h4 className="text-xs tracking-[0.18em] text-white/45 mb-4">التواصل</h4>
            <a href={telLink} className="block font-display font-semibold text-2xl num hover:text-oak-light transition-colors" dir="ltr" style={{ textAlign: "right" }}>
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-2 inline-block text-white/70 hover:text-white text-sm"
            >
              واتساب على نفس الرقم
            </a>
          </Reveal>
        </div>

        {/* الحقوق */}
        <div className="pt-6 pb-4 border-t border-line-dark flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45">
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
