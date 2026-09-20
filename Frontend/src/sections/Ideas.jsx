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
  const api = useRef({ step: () => {} });
  const reduced = prefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    const viewport = viewportRef.current;

    // الحالة: الموضع الحالي، السرعة المتبقية بعد السحب، وحالة السحب/المؤشر
    const st = { pos: 0, vel: 0, setWidth: 0, cardStep: 0, dragging: false, hover: false, moved: 0, lastX: 0, lastT: 0, tween: null };
    const wrap = (p) => (st.setWidth ? ((p % st.setWidth) + st.setWidth) % st.setWidth : p);
    const apply = () => gsap.set(track, { x: st.pos });

    const measure = () => {
      const c = track.children;
      const l0 = c[0].getBoundingClientRect().left - st.pos;
      st.setWidth = Math.abs(c[DESIGNS.length].getBoundingClientRect().left - st.pos - l0);
      st.cardStep = Math.abs(c[1].getBoundingClientRect().left - st.pos - l0);
      st.pos = wrap(st.pos);
      apply();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);

    // حلقة الحركة: تلقائي ببطء، أو قصور ذاتي بعد السحب
    const tick = (_, dt) => {
      if (st.dragging || st.tween) return;
      const s = dt / 1000;
      if (Math.abs(st.vel) > 4) {
        st.pos += st.vel * s;
        st.vel *= Math.pow(0.9, dt / 16.7);
      } else {
        st.vel = 0;
        if (!st.hover) st.pos += SPEED * s;
      }
      st.pos = wrap(st.pos);
      apply();
    };
    gsap.ticker.add(tick);

    // السحب اليدوي بالمؤشر أو الإصبع
    const onDown = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      st.dragging = true;
      st.moved = 0;
      st.vel = 0;
      st.lastX = e.clientX;
      st.lastT = e.timeStamp;
      st.tween?.kill();
      st.tween = null;
      viewport.setPointerCapture?.(e.pointerId);
      viewport.style.cursor = "grabbing";
    };
    const onMove = (e) => {
      if (!st.dragging) return;
      const dx = e.clientX - st.lastX;
      const dt = Math.max(1, e.timeStamp - st.lastT);
      st.moved += Math.abs(dx);
      st.pos = wrap(st.pos + dx);
      st.vel = st.vel * 0.6 + (dx / dt) * 1000 * 0.4;
      st.lastX = e.clientX;
      st.lastT = e.timeStamp;
      apply();
    };
    const onUp = (e) => {
      if (!st.dragging) return;
      st.dragging = false;
      viewport.releasePointerCapture?.(e.pointerId);
      viewport.style.cursor = "grab";
    };
    // منع النقر على الأزرار إذا كان هناك سحب فعلي
    const onClick = (e) => {
      if (st.moved > 6) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    const onEnter = () => (st.hover = true);
    const onLeave = () => (st.hover = false);

    // تقليب يدوي بالأسهم: بطاقة واحدة في كل مرة
    api.current.step = (dir) => {
      st.tween?.kill();
      st.vel = 0;
      const target = { p: st.pos };
      st.tween = gsap.to(target, {
        p: st.pos + dir * st.cardStep,
        duration: 0.7,
        ease: "power3.out",
        onUpdate: () => {
          st.pos = wrap(target.p);
          apply();
        },
        onComplete: () => (st.tween = null),
      });
    };

    viewport.style.cursor = "grab";
    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);
    viewport.addEventListener("click", onClick, true);
    viewport.addEventListener("pointerenter", onEnter);
    viewport.addEventListener("pointerleave", onLeave);

    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
      st.tween?.kill();
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
      viewport.removeEventListener("click", onClick, true);
      viewport.removeEventListener("pointerenter", onEnter);
      viewport.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  // مجموعتان متطابقتان حتى تكون الحلقة متصلة بلا قفزة
  const items = reduced ? DESIGNS : [...DESIGNS, ...DESIGNS];

  return (
    <section id="ideas" className="relative bg-white overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 pt-16 sm:pt-24 lg:pt-32 pb-8 sm:pb-10">
        <SectionHeader number="02" label="أفكار" title={IDEAS.title} intro={IDEAS.intro} />
      </div>

      <div className="relative pt-2 sm:pt-4 pb-14 sm:pb-24">
        <div className="absolute inset-x-0 bottom-0 top-[30%] bg-espresso wood-overlay" />

        <div
          ref={viewportRef}
          className={`relative ${reduced ? "overflow-x-auto snap-x snap-mandatory hide-scrollbar px-5 sm:px-8" : "overflow-hidden"}`}
        >
          <div ref={trackRef} className="flex gap-5 sm:gap-6 w-max py-2 select-none" style={{ touchAction: "pan-y" }}>
            {items.map((d, i) => {
              const n = (i % DESIGNS.length) + 1;
              return (
                <article
                  key={`${d.id}-${i}`}
                  aria-hidden={i >= DESIGNS.length || undefined}
                  className="snap-center shrink-0 w-[72vw] sm:w-[360px] lg:w-[400px] bg-white rounded-2xl p-2.5 sm:p-3 shadow-[0_30px_60px_-30px_rgba(20,16,13,0.45)]"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone">
                    <img src={d.image} alt={i < DESIGNS.length ? d.description : ""} loading={i < 3 ? "eager" : "lazy"} draggable="false" className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 h-7 px-2.5 rounded-full bg-white/90 text-ink text-[11px] num flex items-center">
                      {String(n).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 px-2 pt-3 sm:pt-4 pb-2 text-right">
                    <p className="text-[13px] sm:text-sm text-ink/75 leading-relaxed">{d.description}</p>
                    <WhatsAppButton message={IDEAS.whatsapp(n)} size="sm" className="shrink-0 self-start sm:self-auto" tabIndex={i >= DESIGNS.length ? -1 : undefined}>
                      {IDEAS.cta}
                    </WhatsAppButton>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {!reduced && (
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8 mt-4 sm:mt-8 hidden sm:flex items-center justify-between gap-6">
            <p className="text-xs text-white/55 hidden sm:block">{IDEAS.hint}</p>
            <div className="hidden sm:flex gap-2 ms-auto">
              <button
                type="button"
                onClick={() => api.current.step(-1)}
                className="w-11 h-11 rounded-full border border-line-dark text-white hover:bg-white hover:text-ink transition-colors"
                aria-label="التصميم السابق"
              >
                →
              </button>
              <button
                type="button"
                onClick={() => api.current.step(1)}
                className="w-11 h-11 rounded-full border border-line-dark text-white hover:bg-white hover:text-ink transition-colors"
                aria-label="التصميم التالي"
              >
                ←
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
