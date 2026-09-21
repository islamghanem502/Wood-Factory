import { useEffect, useState } from "react";
import { CONTACT } from "../config/contact";
import WhatsAppButton, { CallLink } from "./WhatsAppButton";
import { IMAGES, NAV_LINKS, HERO } from "../data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // قفل التمرير عند فتح قائمة الجوال
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled && !open ? "bg-white/92 backdrop-blur-md border-b border-line" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-14 sm:h-20 flex items-center justify-between">
        {/* الشعار */}
        <a href="#hero" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={open ? IMAGES.logoCream : IMAGES.logo} alt="" className="h-7 sm:h-9 w-auto" width="32" height="36" />
          <span className={`font-display font-bold text-base sm:text-xl leading-none ${open ? "text-white" : "text-ink"}`}>
            خشبي
            <span className={`ms-1.5 sm:ms-2 text-[8px] sm:text-[10px] font-medium tracking-[0.2em] ${open ? "text-white/60" : "text-walnut"}`}>WOODEN</span>
          </span>
        </a>

        {/* الروابط */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-ink/80">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="link-underline hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        {/* التواصل */}
        <div className="hidden md:flex items-center gap-6">
          <CallLink placement="navbar" className="link-underline text-sm text-ink num" dir="ltr">
            {CONTACT.phoneDisplay}
          </CallLink>
          <WhatsAppButton message={HERO.whatsapp} placement="navbar" size="sm">واتساب</WhatsAppButton>
        </div>

        {/* زر القائمة */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden relative w-9 h-9 -me-1.5 flex flex-col items-center justify-center gap-1.5 ${open ? "text-white" : "text-ink"}`}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={open}
        >
          <span className={`block w-5 h-px bg-current transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`block w-5 h-px bg-current transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* قائمة الجوال — لوحة بنية كاملة */}
      <div
        className={`md:hidden fixed inset-0 top-0 -z-10 bg-espresso text-white transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col justify-between px-6 pt-20 pb-8">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl font-semibold py-3.5 border-b border-line-dark"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="space-y-4">
            <CallLink placement="mobile_menu" className="block text-xl num" dir="ltr" style={{ textAlign: "right" }}>
              {CONTACT.phoneDisplay}
            </CallLink>
            <WhatsAppButton message={HERO.whatsapp} placement="mobile_menu" size="md" className="w-full">محادثة واتساب</WhatsAppButton>
          </div>
        </div>
      </div>
    </header>
  );
}
