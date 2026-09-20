import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SectionHeader from "../components/SectionHeader";
import WhatsAppButton from "../components/WhatsAppButton";
import { DESIGNS, IDEAS } from "../data/content";
import { prefersReducedMotion } from "../lib/motion";

const SPEED = 34; // بكسل في الثانية

/*
  أفكار: صف بطاقات يتحرك وحده ببطء نحو اليمين (حلقة لا نهائية)، مستقل عن الاسكرول.
  يتوقف عند المرور بالمؤشر أو اللمس. مع "تقليل الحركة" يصبح صفاً يُمرَّر يدوياً.
  الخلفية: أبيض في الأعلى وشريط إسبريسو بنسيج خشب خفيف في الأسفل، والبطاقات تعبر الحدّ بينهما.
*/
export default function Ideas() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const reduced = prefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    let tween;

    const build = () => {
      tween?.kill();
      gsap.set(track, { x: 0 });
      // عرض مجموعة واحدة (نصف الشريط) شاملاً الفجوة بعدها
      const first = track.children[0];
      const set = track.children[DESIGNS.length];
      const setWidth = Math.abs(set.getBoundingClientRect().left - first.getBoundingClientRect().left);
      if (!setWidth) return;
      // RTL: الشريط يفيض إلى اليسار؛ تحريكه نحو اليمين (x موجب) يُدخل البطاقات من اليسار
      tween = gsap.to(track, { x: setWidth, duration: setWidth / SPEED, ease: "none", repeat: -1 });
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(viewport);

    const pause = () => tween?.pause();
    const play = () => tween?.play();
    viewport.addEventListener("pointerenter", pause);
    viewport.addEventListener("pointerleave", play);
    viewport.addEventListener("touchstart", pause, { passive: true });
    viewport.addEventListener("touchend", play, { passive: true });
    viewport.addEventListener("touchcancel", play, { passive: true });

    return () => {
      ro.disconnect();
      tween?.kill();
      viewport.removeEventListener("pointerenter", pause);
      viewport.removeEventListener("pointerleave", play);
      viewport.removeEventListener("touchstart", pause);
      viewport.removeEventListener("touchend", play);
      viewport.removeEventListener("touchcancel", play);
    };
  }, [reduced]);

  // مجموعتان متطابقتان حتى تكون الحلقة متصلة بلا قفزة
  const items = reduced ? DESIGNS : [...DESIGNS, ...DESIGNS];

  return (
    <section id="ideas" className="relative bg-white overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 pt-24 sm:pt-32 pb-10">
        <SectionHeader number="02" label="أفكار" title={IDEAS.title} intro={IDEAS.intro} />
      </div>

      <div className="relative pt-4 pb-20 sm:pb-24">
        <div className="absolute inset-x-0 bottom-0 top-[30%] bg-espresso wood-overlay" />

        <div
          ref={viewportRef}
          className={`relative ${reduced ? "overflow-x-auto snap-x snap-mandatory hide-scrollbar px-5 sm:px-8" : "overflow-hidden"}`}
        >
          <div ref={trackRef} className="flex gap-5 sm:gap-6 w-max py-2">
            {items.map((d, i) => {
              const n = (i % DESIGNS.length) + 1;
              return (
                <article
                  key={`${d.id}-${i}`}
                  aria-hidden={i >= DESIGNS.length || undefined}
                  className="snap-center shrink-0 w-[78vw] sm:w-[360px] lg:w-[400px] bg-white rounded-2xl p-3 shadow-[0_30px_60px_-30px_rgba(20,16,13,0.45)]"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone">
                    <img src={d.image} alt={i < DESIGNS.length ? d.description : ""} loading={i < 3 ? "eager" : "lazy"} draggable="false" className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 h-7 px-2.5 rounded-full bg-white/90 text-ink text-[11px] num flex items-center">
                      {String(n).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 px-2 pt-4 pb-2 text-right">
                    <p className="text-sm text-ink/75 leading-relaxed">{d.description}</p>
                    <WhatsAppButton message={IDEAS.whatsapp(n)} size="sm" className="shrink-0" tabIndex={i >= DESIGNS.length ? -1 : undefined}>
                      {IDEAS.cta}
                    </WhatsAppButton>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {!reduced && (
          <p className="relative mx-auto max-w-7xl px-5 sm:px-8 mt-8 text-xs text-white/55 hidden sm:block">{IDEAS.hint}</p>
        )}
      </div>
    </section>
  );
}
