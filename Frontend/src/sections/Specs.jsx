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

/* لوحان زجاجيان بسماكتين 6 و8 ملم (المقياس ×3) */
function GlassPanes() {
  const pane = (x, w, label) => (
    <g key={label}>
      <rect x={x} y="40" width={w} height="150" fill="url(#sp-glass)" stroke="#7fa3b8" strokeWidth="1" />
      <rect x={x + 2} y="44" width={Math.max(2, w * 0.25)} height="142" fill="#ffffff" opacity="0.55" />
      <g stroke="#2a170e" strokeWidth="1.2">
        <line x1={x} y1="22" x2={x + w} y2="22" />
        <line x1={x} y1="17" x2={x} y2="27" />
        <line x1={x + w} y1="17" x2={x + w} y2="27" />
      </g>
      <text x={x + w / 2} y="12" textAnchor="middle" fill="#2a170e" fontSize="13" fontWeight="600" className="num">
        {label}
      </text>
      <line x1={x - 40} y1="190" x2={x + w + 40} y2="190" stroke="#2a170e" strokeWidth="1.5" />
    </g>
  );
  return (
    <svg viewBox="0 0 400 220" className="w-full h-auto" role="img" aria-label="سماكتا الزجاج 6 و8 ملم">
      <defs>
        <linearGradient id="sp-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#dbeaf2" />
          <stop offset="1" stopColor="#b9d3e2" />
        </linearGradient>
      </defs>
      {pane(120, 18, "6 ملم")}
      {pane(262, 24, "8 ملم")}
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

        <div className="mt-16 sm:mt-20 border-t border-line">
          {/* ── الجدار ── */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center py-16 sm:py-20 border-b border-line text-right">
            <div className="lg:col-span-5">
              <Reveal className="text-xs tracking-[0.18em] text-walnut">01 — الجدار</Reveal>
              <Reveal as="h3" delay={60} className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ink">
                {walls.title}
              </Reveal>
              <Reveal delay={120} className="mt-6 flex items-end gap-3">
                <span className="wood-text-dark font-display font-bold text-8xl leading-none num">{walls.value}</span>
                <span className="font-display text-2xl text-walnut mb-2">{walls.unit}</span>
              </Reveal>
              <Reveal as="p" delay={180} className="mt-5 text-lg text-ink/70 leading-relaxed max-w-md">
                {walls.description}
              </Reveal>
            </div>
            <Reveal variant="clip" delay={100} className="lg:col-span-7">
              <div className="max-w-xl mx-auto lg:me-0 lg:ms-auto">
                <WallSection />
              </div>
            </Reveal>
          </div>

          {/* ── السقف ── */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center py-16 sm:py-20 border-b border-line text-right">
            <div className="lg:col-span-5">
              <Reveal className="text-xs tracking-[0.18em] text-walnut">02 — السقف</Reveal>
              <Reveal as="h3" delay={60} className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ink">
                {roof.title}
              </Reveal>
              <Reveal as="p" delay={120} className="mt-4 text-lg text-ink/70 leading-relaxed max-w-md">
                {roof.description}
              </Reveal>
              <ol className="mt-8 space-y-3">
                {roof.layers.map((layer, i) => (
                  <Reveal as="li" key={layer.name} delay={160 + i * 70} className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-espresso text-white text-xs font-semibold flex items-center justify-center shrink-0 num">
                      {i + 1}
                    </span>
                    <span className="font-medium text-ink">{layer.name}</span>
                    <span className="text-sm text-ink/50">{layer.note}</span>
                  </Reveal>
                ))}
              </ol>
            </div>
            <div className="lg:col-span-7">
              <div className="max-w-xl mx-auto lg:me-0 lg:ms-auto">
                <RoofLayers innerRef={roofRef} />
              </div>
            </div>
          </div>

          {/* ── الزجاج ── */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center py-16 sm:py-20 border-b border-line text-right">
            <div className="lg:col-span-5">
              <Reveal className="text-xs tracking-[0.18em] text-walnut">03 — الزجاج</Reveal>
              <Reveal as="h3" delay={60} className="mt-3 font-display font-bold text-3xl sm:text-4xl text-ink">
                {glass.title}
              </Reveal>
              <Reveal delay={120} className="mt-6 flex items-end gap-3">
                <span className="wood-text-dark font-display font-bold text-8xl leading-none num" dir="ltr">
                  6 / 8
                </span>
                <span className="font-display text-2xl text-walnut mb-2">ملم</span>
              </Reveal>
              <Reveal as="p" delay={180} className="mt-5 text-lg text-ink/70 leading-relaxed max-w-md">
                {glass.description}
              </Reveal>
            </div>
            <Reveal variant="clip" delay={100} className="lg:col-span-7">
              <div className="max-w-xl mx-auto lg:me-0 lg:ms-auto">
                <GlassPanes />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
