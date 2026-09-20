import { useEffect, useState } from "react";
import { Phone, MessageCircle, Menu, X } from "lucide-react";
import { waLink, telLink } from "../config/contact";
import { IMAGES, NAV_LINKS } from "../data/content";

const WA_MESSAGE = "مرحباً مؤسسة خشبي WOODEN، أرغب في استفسار حول بناء وتصميم كوخ خشبي.";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* الهيدر الرئيسي */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#0c0e12]/95 backdrop-blur-md border-b border-[#cba157]/20 py-3 shadow-xl"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* الشعار */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-xl overflow-hidden border border-[#cba157]/40 p-0.5 bg-[#121418] shadow-md group-hover:border-[#cba157] transition-all">
              <img src={IMAGES.logo} alt="شعار الشركة" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="flex flex-col text-right">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-wide text-white font-serif">خَـشَـبـي</span>
                <span className="text-[10px] tracking-widest text-[#cba157] font-sans font-bold uppercase border-r border-[#cba157]/40 pr-2">
                  WOODEN
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#b4a99b]">أكواخ ريفية وبرجولات حديثة</span>
            </div>
          </a>

          {/* روابط سطح المكتب */}
          <nav className="hidden xl:flex items-center gap-7 text-sm font-medium text-neutral-300">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap hover:text-[#f7dfa5] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-[#cba157] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* أزرار سطح المكتب */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={telLink}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#171a21] hover:bg-[#202530] text-[#f7dfa5] border border-[#cba157]/30 text-xs font-bold whitespace-nowrap transition-all"
              title="اتصال مباشر"
            >
              <Phone className="w-3.5 h-3.5 text-[#cba157]" />
              <span>اتصال مباشر</span>
            </a>
            <a
              href={waLink(WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white border border-emerald-500/40 text-xs font-bold whitespace-nowrap transition-all shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>واتساب سريع</span>
            </a>
          </div>

          {/* زر القائمة للجوال */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="xl:hidden p-2 rounded-xl bg-[#161920] border border-[#cba157]/30 text-[#f7dfa5]"
            aria-label="القائمة الرئيسية"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* قائمة الجوال */}
        {menuOpen && (
          <div className="xl:hidden bg-[#0e1015]/98 border-b border-[#cba157]/20 p-5 space-y-4 animate-in slide-in-from-top-4">
            <nav className="flex flex-col gap-3 text-right">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-2 px-3 rounded-lg text-sm font-semibold text-neutral-200 hover:bg-[#1a1e27] hover:text-[#f7dfa5]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="pt-3 border-t border-neutral-800">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={waLink(WA_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  <MessageCircle className="w-4 h-4" />
                  محادثة واتساب
                </a>
                <a
                  href={telLink}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1a1f29] border border-[#cba157]/40 text-[#f7dfa5] text-xs font-bold"
                >
                  <Phone className="w-4 h-4 text-[#cba157]" />
                  اتصال مباشر
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
