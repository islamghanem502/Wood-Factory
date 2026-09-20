import { useEffect, useRef, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import { TESTIMONIALS, REVIEWS_TITLE } from "../data/content";
import { Reveal, prefersReducedMotion } from "../lib/motion";

const INTERVAL = 7000;

/*
  آراء العملاء: اقتباس كبير واحد على اليمين، وقائمة أصحاب الآراء على اليسار.
  يتقدّم تلقائياً كل 7 ثوانٍ مع خط تقدّم رفيع، ويتوقف عند المرور بالمؤشر.
*/
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0); // يعيد تشغيل خط التقدّم
  const timer = useRef(null);
  const total = TESTIMONIALS.length;
  const t = TESTIMONIALS[index];
  const autoplay = !prefersReducedMotion();

  const go = (i) => {
    setIndex((i + total) % total);
    setCycle((c) => c + 1);
  };

  useEffect(() => {
    if (!autoplay || paused) return;
    timer.current = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, cycle, autoplay]);

  return (
    <section id="reviews" className="bg-espresso text-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader number="04" label="آراء العملاء" title={REVIEWS_TITLE} dark />

        <div
          className="mt-14 grid lg:grid-cols-12 gap-12 lg:gap-16 text-right"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* الاقتباس */}
          <Reveal className="lg:col-span-8">
            <div className="relative">
              <span className="absolute -top-10 -right-2 font-display text-[9rem] leading-none text-oak/25 select-none" aria-hidden>
                «
              </span>
              <blockquote key={index} className="fade-in relative pt-6">
                <p className="font-display font-medium text-2xl sm:text-4xl lg:text-[2.6rem] leading-[1.5] text-white">{t.text}</p>
                <footer className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
                  <cite className="not-italic font-medium text-white">{t.name}</cite>
                  <span className="text-white/45">{t.city}</span>
                  <span className="text-oak-light">{t.type}</span>
                </footer>
              </blockquote>

              {/* خط التقدّم */}
              <div className="mt-10 h-px bg-white/15 overflow-hidden">
                {autoplay && (
                  <span
                    key={cycle}
                    className="block h-full bg-oak-light origin-right"
                    style={{
                      animation: `progress ${INTERVAL}ms linear forwards`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                  />
                )}
              </div>
            </div>
          </Reveal>

          {/* القائمة */}
          <Reveal delay={120} className="lg:col-span-4">
            <ol className="border-t border-line-dark">
              {TESTIMONIALS.map((r, i) => {
                const active = i === index;
                return (
                  <li key={r.name} className="border-b border-line-dark">
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-current={active}
                      className={`w-full flex items-center gap-4 py-4 text-right transition-colors ${
                        active ? "text-white" : "text-white/45 hover:text-white/80"
                      }`}
                    >
                      <span className={`w-0.5 self-stretch rounded-full transition-colors ${active ? "bg-oak-light" : "bg-transparent"}`} />
                      <span className="flex-1 min-w-0">
                        <span className="block font-medium truncate">{r.name}</span>
                        <span className="block text-xs opacity-70 truncate">
                          {r.city} · {r.type}
                        </span>
                      </span>
                      <span className="num text-xs opacity-60">{String(i + 1).padStart(2, "0")}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
