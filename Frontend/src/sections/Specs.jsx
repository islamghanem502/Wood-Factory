import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "../components/SectionHeader";
import { SPECS } from "../data/content";
import { Reveal } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

/* طبقات السقف من الداخل (الأسفل) إلى الخارج (الأعلى) — السماكات بوحدات الرسم */
const LAYER_THICKNESS = [36, 44, 12, 14];
const SLOPE = 140; // فرق الارتفاع بين طرفي السقف
const X0 = 70;
const X1 = 570;

const layerGeometry = () => {
  let bottom = 340;
  return LAYER_THICKNESS.map((t) => {
    const yb = bottom;
    const yt = bottom - t;
    bottom = yt;
    return { yb, yt, t };
  });
};

function RoofLayers({ innerRef }) {
  const geo = layerGeometry();
  const fills = ["url(#sp-wood)", "url(#sp-hatch)", "#5b3d2a", "#9aa0a6"];
  const strokes = ["#a67a4e", "#b9a893", "#3a2214", "#6b7178"];

  // تموّج الجرميد على السطح العلوي للطبقة الأخيرة
  const metal = geo[3];
  const corrugation = Array.from({ length: 26 }, (_, i) => {
    const x = X0 + i * 20;
    const base = metal.yt - ((x - X0) / (X1 - X0)) * SLOPE;
    return `${i === 0 ? "M" : "L"} ${x} ${base + (i % 2 ? 6 : -2)}`;
  }).join(" ");

  return (
    <svg ref={innerRef} viewBox="0 0 640 400" className="w-full h-auto" role="img" aria-label="مقطع في سقف من طبقات متعددة">
      <defs>
        <pattern id="sp-wood" patternUnits="userSpaceOnUse" width="640" height="480">
          <image href="/textures/wood-light.svg" width="640" height="480" />
        </pattern>
        <pattern id="sp-hatch" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
          <rect width="10" height="10" fill="#efe7da" />
          <line x1="0" y1="0" x2="0" y2="10" stroke="#c9b9a1" strokeWidth="2" />
        </pattern>
      </defs>
      {geo.map((g, i) => (
        <g key={i} data-layer={i}>
          <polygon
            points={`${X0},${g.yb} ${X1},${g.yb - SLOPE} ${X1},${g.yt - SLOPE} ${X0},${g.yt}`}
            fill={fills[i]}
            stroke={strokes[i]}
            strokeWidth="1.5"
          />
          {i === 3 && <path d={corrugation} fill="none" stroke="#6b7178" strokeWidth="2" />}
          {/* رقم الطبقة عند الطرف الأيمن (الأعلى) */}
          <g transform={`translate(${X1 + 26}, ${(g.yb + g.yt) / 2 - SLOPE})`}>
            <circle r="12" fill="#2a170e" />
            <text
              textAnchor="middle"
              dominantBaseline="central"
              fill="#ffffff"
              fontSize="12"
              fontWeight="600"
              className="num"
            >
              {i + 1}
            </text>
          </g>
        </g>
      ))}
    </svg>
  );
}

function WallSection() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-auto" role="img" aria-label="مقطع أفقي في جدار خشبي بسماكة 12 سم">
      <defs>
        <pattern id="sp-wood-wall" patternUnits="userSpaceOnUse" width="400" height="300">
          <image href="/textures/wood-light.svg" width="400" height="300" />
        </pattern>
      </defs>
      {/* الجدار */}
      <rect x="160" y="52" width="80" height="180" fill="url(#sp-wood-wall)" stroke="#a67a4e" strokeWidth="1.5" />
      {/* خط الأبعاد */}
      <g stroke="#2a170e" strokeWidth="1.5">
        <line x1="160" y1="30" x2="240" y2="30" />
        <line x1="160" y1="24" x2="160" y2="36" />
        <line x1="240" y1="24" x2="240" y2="36" />
        <line x1="160" y1="36" x2="160" y2="50" strokeDasharray="2 3" />
        <line x1="240" y1="36" x2="240" y2="50" strokeDasharray="2 3" />
      </g>
      <text x="200" y="20" textAnchor="middle" fill="#2a170e" fontSize="15" fontWeight="600" className="num">
        12 سم
      </text>
      {/* خارج / داخل */}
      <text x="80" y="146" textAnchor="middle" fill="#5c3a21" fontSize="13">
        خارج
      </text>
      <text x="320" y="146" textAnchor="middle" fill="#5c3a21" fontSize="13">
        داخل
      </text>
      <line x1="110" y1="142" x2="150" y2="142" stroke="#6b4a32" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="250" y1="142" x2="290" y2="142" stroke="#6b4a32" strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  );
}

export default function Specs() {
  const { walls, roof, glass } = SPECS;
  const roofRef = useRef(null);

  // الطبقات تبدأ متباعدة ثم تتراكب مع التمرير — صدى لحركة الكوخ في الهيرو
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const layers = roofRef.current.querySelectorAll("[data-layer]");
        gsap.set(layers, { y: (i) => -i * 42 });
        gsap.to(layers, {
          y: 0,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: {
            trigger: roofRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: 0.6,
          },
        });
      });
    }, roofRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="specs" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader number="01" label="المواصفات" title={SPECS.title} intro={SPECS.intro} />

        <div className="mt-16 sm:mt-20 grid lg:grid-cols-12 gap-12 lg:gap-16 text-right">
          {/* الجدران */}
          <div className="lg:col-span-5">
            <Reveal className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
              <h3 className="font-display font-semibold text-2xl text-ink">{walls.title}</h3>
              <span className="text-xs tracking-widest text-walnut">{walls.material}</span>
            </Reveal>
            <Reveal delay={100} className="mt-8">
              <WallSection />
            </Reveal>
            <Reveal delay={160} className="mt-6 flex items-end gap-4">
              <span className="wood-text-dark font-display font-bold text-7xl leading-none num">{walls.value}</span>
              <span className="font-display text-2xl text-walnut mb-1">{walls.unit}</span>
            </Reveal>
            <Reveal as="p" delay={220} className="mt-4 text-ink/70 leading-relaxed max-w-sm">
              {walls.description}
            </Reveal>
          </div>

          {/* السقف */}
          <div className="lg:col-span-7">
            <Reveal className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
              <h3 className="font-display font-semibold text-2xl text-ink">{roof.title}</h3>
              <span className="text-xs tracking-widest text-walnut">{roof.description}</span>
            </Reveal>
            <div className="mt-8 grid sm:grid-cols-12 gap-8 items-center">
              <div className="sm:col-span-7 lg:col-span-8">
                <RoofLayers innerRef={roofRef} />
              </div>
              <ol className="sm:col-span-5 lg:col-span-4 space-y-4">
                {roof.layers.map((layer, i) => (
                  <Reveal as="li" key={layer.name} delay={i * 80} className="flex items-start gap-3">
                    <span className="mt-1 w-6 h-6 rounded-full bg-espresso text-white text-[11px] font-semibold flex items-center justify-center shrink-0 num">
                      {i + 1}
                    </span>
                    <div>
                      <span className="block font-medium text-ink">{layer.name}</span>
                      <span className="block text-sm text-ink/60">{layer.note}</span>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* الزجاج */}
        <div className="mt-16 sm:mt-20 border-t border-line pt-10 grid lg:grid-cols-12 gap-8 items-center text-right">
          <Reveal className="lg:col-span-5">
            <h3 className="font-display font-semibold text-2xl text-ink">{glass.title}</h3>
            <p className="mt-2 text-ink/70 leading-relaxed max-w-sm">{glass.description}</p>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7 flex items-baseline gap-6 sm:gap-10 lg:justify-end">
            {glass.options.map((opt, i) => {
              const [n, unit] = opt.split(" ");
              return (
                <span key={opt} className="flex items-baseline gap-2">
                  {i > 0 && <span className="text-3xl text-line ms-0 me-4 sm:me-8" aria-hidden>/</span>}
                  <span className="wood-text-dark font-display font-bold text-6xl sm:text-7xl leading-none num">{n}</span>
                  <span className="font-display text-xl text-walnut">{unit}</span>
                </span>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
