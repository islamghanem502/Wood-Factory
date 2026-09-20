import { CONTACT, telLink } from "../config/contact";
import WhatsAppButton from "./WhatsAppButton";
import { IMAGES, NAV_LINKS, SERVICE_AREAS, FOOTER_TEXT, HERO } from "../data/content";
import { Reveal } from "../lib/motion";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-espresso text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-20 pb-10">
        {/* كلمة خشبي بنسيج الخشب */}
        <Reveal>
          <div className="flex items-end justify-between gap-6 border-b border-line-dark pb-10">
            <span className="wood-text font-display font-bold leading-[1.25] -mb-[0.12em] text-[26vw] sm:text-[18vw] lg:text-[13rem] select-none" aria-hidden>
              خشبي
            </span>
            <img src={IMAGES.logoCream} alt="شعار خشبي WOODEN" className="h-14 sm:h-20 w-auto mb-3 opacity-90" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pt-12 text-right">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-white/75 max-w-sm leading-relaxed">{FOOTER_TEXT}</p>
            <p className="text-sm text-white/55">{SERVICE_AREAS}</p>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs tracking-widest text-white/50 mb-4">الأقسام</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-underline text-white/85 hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-xs tracking-widest text-white/50 mb-4">التواصل</h4>
            <a href={telLink} className="block font-display text-3xl num hover:text-oak-light transition-colors" dir="ltr" style={{ textAlign: "right" }}>
              {CONTACT.phoneDisplay}
            </a>
            <WhatsAppButton message={HERO.whatsapp} className="mt-5">محادثة واتساب</WhatsAppButton>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-line-dark flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} خشبي WOODEN. جميع الحقوق محفوظة.</p>
          <button type="button" onClick={scrollToTop} className="link-underline hover:text-white">
            العودة للأعلى ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
