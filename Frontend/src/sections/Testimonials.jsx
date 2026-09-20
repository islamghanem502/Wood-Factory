import { useState } from "react";
import { TESTIMONIALS } from "../data/content";
import { Reveal } from "../lib/motion";

/* اقتباس واحد كبير في كل مرة */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index];
  const total = TESTIMONIALS.length;
  const go = (dir) => setIndex((i) => (i + dir + total) % total);

  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 text-right">
        <Reveal className="flex items-center gap-3 text-xs tracking-[0.18em] text-walnut">
          <span className="num">04</span>
          <span className="w-8 h-px bg-line" />
          <span>آراء العملاء</span>
        </Reveal>

        <div className="mt-10 grid lg:grid-cols-12 gap-10 items-end">
          <Reveal delay={80} className="lg:col-span-9">
            <blockquote key={index} className="fade-in">
              <p className="font-display font-medium text-2xl sm:text-4xl lg:text-[2.75rem] leading-[1.45] text-ink">
                «{t.text}»
              </p>
              <footer className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-1 text-sm">
                <cite className="not-italic font-medium text-ink">{t.name}</cite>
                <span className="text-ink/55">{t.city}</span>
                <span className="text-walnut">{t.type}</span>
              </footer>
            </blockquote>
          </Reveal>

          <Reveal delay={160} className="lg:col-span-3 flex lg:flex-col items-center lg:items-end justify-between gap-6">
            <span className="text-sm num text-ink/55" dir="ltr">
              {index + 1} / {total}
            </span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                className="w-11 h-11 rounded-full border border-line text-ink hover:bg-walnut-deep hover:text-cream hover:border-walnut-deep transition-colors"
                aria-label="الرأي السابق"
              >
                →
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="w-11 h-11 rounded-full border border-line text-ink hover:bg-walnut-deep hover:text-cream hover:border-walnut-deep transition-colors"
                aria-label="الرأي التالي"
              >
                ←
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
