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
    <section id="reviews" className="relative bg-espresso wood-overlay text-white py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader number="04" label="آراء العملاء" title={REVIEWS_TITLE} dark />

        <div ref={gridRef} className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={t.name}
              data-card
              className="wood-card rounded-2xl p-7 sm:p-8 flex flex-col justify-between gap-8 text-right text-espresso min-h-[300px]"
            >
              <div>
                <span className="block font-display text-5xl leading-none text-walnut/45 select-none" aria-hidden>
                  «
                </span>
                <p className="mt-2 text-[15px] leading-[1.9] text-espresso/90">{t.text}</p>
              </div>
              <footer className="flex items-end justify-between gap-3 border-t border-espresso/15 pt-4">
                <div className="min-w-0">
                  <span className="block font-display font-semibold text-sm truncate">{t.name}</span>
                  <span className="block text-xs text-espresso/60 mt-0.5 truncate">
                    {t.city} · {t.type}
                  </span>
                </div>
                <span className="num text-xs text-espresso/45 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
