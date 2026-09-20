import { CONTACT, waLink, telLink } from "../config/contact";
import { IMAGES, NAV_LINKS, SERVICE_AREAS, HERO } from "../data/content";
import { Reveal } from "../lib/motion";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-walnut-deep text-cream overflow-hidden">
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
            <p className="text-cream/75 max-w-sm leading-relaxed">
              أكواخ ريفية وبرجولات حديثة من خشب السنوبر. جدران بسماكة 12 سم، سقف من 5 طبقات، وضمان يصل إلى 15 سنة.
            </p>
            <p className="text-sm text-cream/55">{SERVICE_AREAS}</p>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs tracking-widest text-cream/50 mb-4">الأقسام</h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-underline text-cream/85 hover:text-cream">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-xs tracking-widest text-cream/50 mb-4">التواصل</h4>
            <a href={telLink} className="block font-display text-3xl num hover:text-oak-light transition-colors" dir="ltr" style={{ textAlign: "right" }}>
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={waLink(HERO.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 h-11 px-5 rounded-md bg-cream text-ink font-medium hover:bg-cream-2 transition-colors"
            >
              محادثة واتساب
              <span aria-hidden>←</span>
            </a>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-line-dark flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50">
          <p>© {new Date().getFullYear()} خشبي WOODEN. جميع الحقوق محفوظة.</p>
          <button type="button" onClick={scrollToTop} className="link-underline hover:text-cream">
            العودة للأعلى ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
