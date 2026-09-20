import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "../components/SectionHeader";
import { TESTIMONIALS, REVIEWS_TITLE } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

/*
  آراء العملاء: بطاقات على شكل ألواح خشب فوق خلفية إسبريسو بنسيج خشب.
  الألواح "تُرصّ" واحداً تلو الآخر عند دخولها الشاشة (إزاحة + ميل خفيف).
*/
export default function Testimonials() {
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gridRef.current.querySelectorAll("[data-card]");
        gsap.set(cards, { y: 48, opacity: 0, rotate: (i) => (i % 2 ? 1.5 : -1.5), transformOrigin: "50% 100%" });
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
          onEnter: () =>
            gsap.to(cards, { y: 0, opacity: 1, rotate: 0, duration: 1.1, stagger: 0.14, ease: "power3.out", clearProps: "transform" }),
        });
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="reviews" className="relative bg-espresso wood-overlay text-white py-16 sm:py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader number="04" label="آراء العملاء" title={REVIEWS_TITLE} dark />
        <p className="sm:hidden mt-6 text-xs text-white/45">اسحب لقراءة المزيد ←</p>

        <div
          ref={gridRef}
          className="mt-8 sm:mt-14 flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 overflow-x-auto sm:overflow-visible snap-x snap-mandatory hide-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 pb-2 sm:pb-0"
        >
          {TESTIMONIALS.map((t, i) => (
            <article
              key={t.name}
              data-card
              className="wood-card snap-center shrink-0 w-[76vw] sm:w-auto rounded-2xl p-6 sm:p-9 flex flex-col justify-between gap-6 sm:gap-8 text-right text-espresso min-h-[260px] sm:min-h-[300px]"
            >
              <div>
                <span className="block font-display text-4xl leading-none text-walnut/50 select-none" aria-hidden>
                  «
                </span>
                <p className="mt-2 sm:mt-3 text-[15px] sm:text-base leading-[1.85] text-espresso">{t.text}</p>
              </div>
              <footer className="flex items-end justify-between gap-3 border-t border-espresso/20 pt-4">
                <div className="min-w-0">
                  <span className="block font-display font-semibold text-[15px] truncate">{t.name}</span>
                  <span className="block text-xs text-espresso/65 mt-1 truncate">
                    {t.city} · {t.type}
                  </span>
                </div>
                <span className="num text-xs text-espresso/50 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
