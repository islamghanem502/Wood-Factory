import { useEffect, useRef } from "react";
import gsap from "gsap";
import { NUMBERS } from "../data/content";
import { Reveal, prefersReducedMotion } from "../lib/motion";

/* رقم يعدّ من الصفر إلى قيمته عند دخوله الشاشة */
function CountUp({ value, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const target = Number(value);
    if (prefersReducedMotion() || Number.isNaN(target)) {
      el.textContent = value;
      return;
    }
    el.textContent = "0";
    const state = { v: 0 };
    let tween;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        tween = gsap.to(state, {
          v: target,
          duration: 1.6,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = Math.round(state.v).toString();
          },
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      tween?.kill();
    };
  }, [value]);
  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

/* شريط الأرقام — إسبريسو، الأرقام مُعبّأة بنسيج الخشب وتعدّ عند الظهور */
export default function Numbers() {
  return (
    <section className="bg-espresso text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-3">
          {NUMBERS.map((n, i) => (
            <Reveal
              key={n.label}
              delay={i * 90}
              className={`py-8 sm:py-16 px-2 flex flex-col items-center text-center ${i > 0 ? "border-s border-line-dark" : ""}`}
            >
              <div className="flex items-baseline justify-center gap-1.5 sm:gap-2">
                <CountUp value={n.value} className="wood-text font-display font-bold text-4xl sm:text-7xl leading-none num tabular-nums" />
                <span className="font-display text-sm sm:text-2xl text-oak-light">{n.unit}</span>
              </div>
              <p className="mt-2 sm:mt-3 text-[11px] sm:text-sm text-white/60 leading-snug">{n.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
