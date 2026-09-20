import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import SectionHeader from "../components/SectionHeader";
import WhatsAppButton from "../components/WhatsAppButton";
import { DESIGNS, IDEAS } from "../data/content";
import { Reveal, prefersReducedMotion } from "../lib/motion";

gsap.registerPlugin(Draggable, InertiaPlugin);

/*
  أفكار: مسرح كبير للتصميم المختار + شريط مصغّرات قابل للسحب بقصور ذاتي.
  اختيار مصغّرة → تبديل ناعم للصورة والنص، وزر "اطلب تصميماً مثله".
*/
export default function Ideas() {
  const [active, setActive] = useState(0);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const draggableRef = useRef(null);
  const total = DESIGNS.length;
  const design = DESIGNS[active];

  // تبديل الصورة في المسرح
  useLayoutEffect(() => {
    const imgs = stageRef.current.querySelectorAll("[data-stage-img]");
    const next = imgs[active];
    if (prefersReducedMotion()) {
      imgs.forEach((im, i) => gsap.set(im, { opacity: i === active ? 1 : 0, scale: 1 }));
      return;
    }
    gsap.set(next, { zIndex: 2 });
    gsap.fromTo(next, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" });
    imgs.forEach((im, i) => {
      if (i !== active) gsap.to(im, { opacity: 0, duration: 0.6, zIndex: 1, ease: "power2.out" });
    });
    // النص
    gsap.fromTo(
      stageRef.current.querySelectorAll("[data-stage-text]"),
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power3.out" },
    );
  }, [active]);

  // موضع x الذي يجعل المصغّرة i في منتصف نافذة العرض (RTL: الشريط يتحرك نحو اليمين)
  const centerX = useCallback((i) => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const card = track.children[i];
    if (!card) return 0;
    const currentX = Number(gsap.getProperty(track, "x")) || 0;
    const v = viewport.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    const naturalLeft = c.left - currentX;
    const maxScroll = Math.max(0, track.scrollWidth - viewport.clientWidth);
    return gsap.utils.clamp(0, maxScroll, v.left + v.width / 2 - c.width / 2 - naturalLeft);
  }, []);

  // السحب بقصور ذاتي مع التقاط على المصغّرات
  useLayoutEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    let ro;
    const build = () => {
      draggableRef.current?.kill();
      const maxScroll = Math.max(0, track.scrollWidth - viewport.clientWidth);
      const snapPoints = Array.from(track.children, (_, i) => centerX(i));
      draggableRef.current = Draggable.create(track, {
        type: "x",
        bounds: { minX: 0, maxX: maxScroll },
        inertia: true,
        dragClickables: true,
        edgeResistance: 0.8,
        dragResistance: 0.05,
        snap: { x: (v) => gsap.utils.snap(snapPoints, v) },
        cursor: "grab",
        activeCursor: "grabbing",
      })[0];
    };
    build();
    ro = new ResizeObserver(() => build());
    ro.observe(viewport);
    return () => {
      ro?.disconnect();
      draggableRef.current?.kill();
    };
  }, [centerX]);

  // تمرير الشريط حتى تتوسط المصغّرة النشطة
  const scrollToThumb = useCallback(
    (i) => {
      gsap.to(trackRef.current, { x: centerX(i), duration: 0.8, ease: "power3.out", onUpdate: () => draggableRef.current?.update() });
    },
    [centerX],
  );

  const select = useCallback(
    (i) => {
      const next = (i + total) % total;
      setActive(next);
      scrollToThumb(next);
    },
    [total, scrollToThumb],
  );

  // أسهم لوحة المفاتيح
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") select(active + 1);
      if (e.key === "ArrowRight") select(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, select]);

  return (
    <section id="ideas" className="bg-espresso text-white py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader number="02" label="أفكار" title={IDEAS.title} intro={IDEAS.intro} dark />

        {/* المسرح */}
        <div ref={stageRef} className="mt-14 grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch text-right">
          <Reveal variant="clip" className="lg:col-span-8">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden bg-black/30">
              {DESIGNS.map((d, i) => (
                <img
                  key={d.id}
                  data-stage-img
                  src={d.image}
                  alt={d.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              <span className="absolute bottom-5 right-5 text-xs tracking-[0.18em] text-white/85 num" dir="ltr">
                {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
          </Reveal>

          <div className="lg:col-span-4 flex flex-col justify-between gap-8 lg:py-2">
            <div>
              <span data-stage-text className="block text-xs tracking-[0.18em] text-white/50">{design.categoryLabel}</span>
              <h3 data-stage-text className="mt-3 font-display font-bold text-3xl sm:text-4xl">{design.title}</h3>
              <p data-stage-text className="mt-4 text-white/70 leading-relaxed">{design.description}</p>
              <ul data-stage-text className="mt-5 space-y-2 text-sm text-white/75">
                {design.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-oak" />
                    {f}
                  </li>
                ))}
              </ul>
              <dl data-stage-text className="mt-6 flex gap-8 text-sm border-t border-line-dark pt-4">
                <div>
                  <dt className="text-white/45 text-xs">المساحة</dt>
                  <dd className="num mt-0.5">{design.area}</dd>
                </div>
                <div>
                  <dt className="text-white/45 text-xs">مدة التنفيذ</dt>
                  <dd className="num mt-0.5">{design.duration}</dd>
                </div>
              </dl>
            </div>

            <div data-stage-text className="flex items-center justify-between gap-4">
              <WhatsAppButton message={IDEAS.whatsapp(design.title)}>{IDEAS.cta}</WhatsAppButton>
              <div className="hidden sm:flex gap-2">
                <button
                  type="button"
                  onClick={() => select(active - 1)}
                  className="w-11 h-11 rounded-full border border-line-dark text-white hover:bg-white hover:text-ink transition-colors"
                  aria-label="التصميم السابق"
                >
                  →
                </button>
                <button
                  type="button"
                  onClick={() => select(active + 1)}
                  className="w-11 h-11 rounded-full border border-line-dark text-white hover:bg-white hover:text-ink transition-colors"
                  aria-label="التصميم التالي"
                >
                  ←
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* شريط المصغّرات — اسحب أو اختر */}
        <div className="mt-10">
          <div className="flex items-center justify-between text-xs text-white/45 mb-4">
            <span>اسحب لاستعراض التصاميم</span>
            <span className="num">{total} تصاميم</span>
          </div>
          <div ref={viewportRef} className="overflow-hidden -mx-5 sm:-mx-8 px-5 sm:px-8">
            <div ref={trackRef} className="flex gap-3 sm:gap-4 w-max select-none touch-pan-y">
              {DESIGNS.map((d, i) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => select(i)}
                  aria-pressed={i === active}
                  className={`relative w-[38vw] sm:w-52 lg:w-60 aspect-[4/3] rounded-lg overflow-hidden shrink-0 transition-opacity duration-500 ${
                    i === active ? "opacity-100" : "opacity-45 hover:opacity-80"
                  }`}
                >
                  <img src={d.image} alt="" loading="lazy" draggable="false" className="w-full h-full object-cover pointer-events-none" />
                  <span
                    className={`absolute inset-x-0 bottom-0 h-0.5 bg-white transition-transform duration-500 origin-right ${
                      i === active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                  <span className="absolute top-2.5 right-3 text-[11px] num text-white/90 drop-shadow">{String(i + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
