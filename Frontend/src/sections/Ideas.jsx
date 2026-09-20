import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "../components/SectionHeader";
import WhatsAppButton from "../components/WhatsAppButton";
import { DESIGNS, IDEAS } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

/*
  أفكار: تمرير عرضي. على الشاشات الكبيرة يُثبَّت القسم ويتحرك صف البطاقات أفقياً
  مع الاسكرول العمودي؛ على الجوال تمرير أفقي طبيعي مع التقاط.
  الخلفية: أبيض في الأعلى وشريط إسبريسو بنسيج خشب خفيف في الأسفل، والبطاقات تعبر الحدّ بينهما.
*/
export default function Ideas() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const [index, setIndex] = useState(0);
  const total = DESIGNS.length;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const viewport = viewportRef.current;
        // RTL: الصف يبدأ من اليمين ويفيض إلى اليسار، فنحرّكه نحو اليمين (x موجب)
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth + 32);

        gsap.to(track, {
          x: distance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: pinRef.current,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (st) => {
              const p = st.progress;
              if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
              setIndex(Math.min(total - 1, Math.round(p * (total - 1))));
            },
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [total]);

  return (
    <section id="ideas" ref={sectionRef} className="relative bg-white">
      <div ref={pinRef} className="lg:h-screen flex flex-col">
        {/* الترويسة — على الأبيض */}
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 pt-24 lg:pt-28 pb-10">
          <SectionHeader number="02" label="أفكار" title={IDEAS.title} intro={IDEAS.intro} />
        </div>

        {/* الصف — يعبر الحدّ بين الأبيض والبني */}
        <div className="relative flex-1 min-h-[520px] lg:min-h-0">
          <div className="absolute inset-x-0 bottom-0 top-[26%] bg-espresso wood-overlay" />

          <div ref={viewportRef} className="relative h-full overflow-x-auto lg:overflow-visible snap-x snap-mandatory hide-scrollbar">
            <div ref={trackRef} className="flex gap-5 sm:gap-6 w-max px-5 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] py-2">
              {DESIGNS.map((d, i) => (
                <article
                  key={d.id}
                  className="snap-center shrink-0 w-[78vw] sm:w-[380px] lg:w-[420px] bg-white rounded-2xl p-3 shadow-[0_30px_60px_-30px_rgba(20,16,13,0.45)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1.5"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone">
                    <img src={d.image} alt={d.description} loading={i < 3 ? "eager" : "lazy"} draggable="false" className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 h-7 px-2.5 rounded-full bg-white/90 text-ink text-[11px] num flex items-center">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4 px-2 pt-4 pb-2 text-right">
                    <p className="text-sm text-ink/75 leading-relaxed">{d.description}</p>
                    <WhatsAppButton message={IDEAS.whatsapp(i + 1)} size="sm" className="shrink-0">
                      {IDEAS.cta}
                    </WhatsAppButton>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* التقدّم والعدّاد — سطح المكتب */}
          <div className="hidden lg:flex absolute bottom-8 inset-x-0 mx-auto max-w-7xl px-8 items-center justify-start gap-10 text-white/70 text-xs">
            <span>{IDEAS.hint} ↓</span>
            <div className="flex items-center gap-4">
              <span className="num" dir="ltr">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="block w-40 h-px bg-white/20 overflow-hidden">
                <span ref={barRef} className="block h-full bg-oak-light origin-right" style={{ transform: "scaleX(0)" }} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
