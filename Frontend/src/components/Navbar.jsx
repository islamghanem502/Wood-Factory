import { useEffect, useState } from "react";
import { CONTACT, waLink, telLink } from "../config/contact";
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
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-20 flex items-center justify-between">
        {/* الشعار */}
        <a href="#hero" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={open ? IMAGES.logoCream : IMAGES.logo} alt="" className="h-9 w-auto" width="32" height="36" />
          <span className={`font-display font-bold text-xl leading-none ${open ? "text-white" : "text-ink"}`}>
            خشبي
            <span className={`ms-2 text-[10px] font-medium tracking-[0.2em] ${open ? "text-white/60" : "text-walnut"}`}>WOODEN</span>
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
          <a href={telLink} className="link-underline text-sm text-ink num" dir="ltr">
            {CONTACT.phoneDisplay}
          </a>
          <a
            href={waLink(HERO.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center h-10 px-5 rounded-md bg-espresso text-white text-sm font-medium hover:bg-walnut transition-colors"
          >
            واتساب
          </a>
        </div>

        {/* زر القائمة */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden relative w-10 h-10 -me-2 flex flex-col items-center justify-center gap-1.5 ${open ? "text-white" : "text-ink"}`}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={open}
        >
          <span className={`block w-6 h-px bg-current transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`block w-6 h-px bg-current transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* قائمة الجوال — لوحة بنية كاملة */}
      <div
        className={`md:hidden fixed inset-0 top-0 -z-10 bg-espresso text-white transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col justify-between px-6 pt-28 pb-10">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl font-semibold py-3 border-b border-line-dark"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="space-y-4">
            <a href={telLink} className="block text-2xl num" dir="ltr" style={{ textAlign: "right" }}>
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={waLink(HERO.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full h-12 rounded-md bg-white text-ink font-medium"
            >
              محادثة واتساب
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
