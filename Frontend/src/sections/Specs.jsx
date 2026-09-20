import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "../components/SectionHeader";
import { SPECS } from "../data/content";
import { Reveal } from "../lib/motion";

gsap.registerPlugin(ScrollTrigger);

/* طبقات السقف من الداخل (الأسفل) إلى الخارج (الأعلى) — السماكات بوحدات الرسم */
const LAYER_THICKNESS = [36, 40, 14, 16];
const SLOPE = 120; // فرق الارتفاع بين طرفي السقف
const X0 = 40;
const X1 = 470;
const DX = 26; // عمق اللوح (إزاحة الوجه العلوي)
const DY = -14;

const layerGeometry = () => {
  let bottom = 330;
  return LAYER_THICKNESS.map((t) => {
    const yb = bottom;
    const yt = bottom - t;
    bottom = yt;
    return { yb, yt, t };
  });
};

const LAYER_STYLE = [
  { front: "url(#sp-wood)", top: "#e2c59d", end: "#a67a4e", stroke: "#a67a4e" },
  { front: "url(#sp-hatch)", top: "#f4efe6", end: "#c9b9a1", stroke: "#b9a893" },
  { front: "#4a3222", top: "#6b4a32", end: "#2f1f15", stroke: "#2f1f15" },
  { front: "#9aa0a6", top: "#c3c8cc", end: "#6b7178", stroke: "#6b7178" },
];

function RoofLayers({ innerRef }) {
  const geo = layerGeometry();
  const slopeAt = (x) => ((x - X0) / (X1 - X0)) * SLOPE;

  // تموّج الجرميد على الوجه العلوي للطبقة الأخيرة
  const metal = geo[3];
  const corrugation = Array.from({ length: 23 }, (_, i) => {
    const x = X0 + DX / 2 + i * 20;
    const y = metal.yt - slopeAt(x) + DY / 2 + (i % 2 ? 5 : -3);
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
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
      {geo.map((g, i) => {
        const st = LAYER_STYLE[i];
        const badgeY = 250 - i * 46; // شارات متباعدة بالتساوي على اليمين
        const endMidY = (g.yb + g.yt) / 2 - SLOPE;
        return (
          <g key={i} data-layer={i}>
            {/* الوجه العلوي */}
            <polygon
              points={`${X0},${g.yt} ${X1},${g.yt - SLOPE} ${X1 + DX},${g.yt - SLOPE + DY} ${X0 + DX},${g.yt + DY}`}
              fill={st.top}
              stroke={st.stroke}
              strokeWidth="1"
            />
            {/* الوجه الأمامي (السماكة) */}
            <polygon
              points={`${X0},${g.yb} ${X1},${g.yb - SLOPE} ${X1},${g.yt - SLOPE} ${X0},${g.yt}`}
              fill={st.front}
              stroke={st.stroke}
              strokeWidth="1"
            />
            {/* الوجه الجانبي الأيمن */}
            <polygon
              points={`${X1},${g.yb - SLOPE} ${X1 + DX},${g.yb - SLOPE + DY} ${X1 + DX},${g.yt - SLOPE + DY} ${X1},${g.yt - SLOPE}`}
              fill={st.end}
              stroke={st.stroke}
              strokeWidth="1"
            />
            {i === 3 && <path d={corrugation} fill="none" stroke="#6b7178" strokeWidth="2" />}
            {/* خط دليلي + شارة الرقم */}
            <line x1={X1 + DX} y1={endMidY + DY / 2} x2={X1 + 66} y2={badgeY} stroke="#2a170e" strokeWidth="1" strokeDasharray="3 3" />
            <g transform={`translate(${X1 + 80}, ${badgeY})`}>
              <circle r="13" fill="#2a170e" />
              <text textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize="12" fontWeight="600" className="num">
                {i + 1}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}

/* لوحان زجاجيان بسماكتين 6 و8 ملم (المقياس ×3) */
function GlassPanes() {
  const pane = (x, w, label) => (
    <g key={label}>
      <rect x={x} y="44" width={w} height="150" fill="url(#sp-glass)" stroke="#7fa3b8" strokeWidth="1" />
      <rect x={x + 2} y="48" width={Math.max(2, w * 0.25)} height="142" fill="#ffffff" opacity="0.6" />
      <g stroke="#2a170e" strokeWidth="1.2">
        <line x1={x} y1="26" x2={x + w} y2="26" />
        <line x1={x} y1="21" x2={x} y2="31" />
        <line x1={x + w} y1="21" x2={x + w} y2="31" />
      </g>
      <text x={x + w / 2} y="14" textAnchor="middle" fill="#2a170e" fontSize="14" fontWeight="600" className="num">
        {label}
      </text>
      <line x1={x - 44} y1="194" x2={x + w + 44} y2="194" stroke="#2a170e" strokeWidth="1.5" />
    </g>
  );
  return (
    <svg viewBox="0 0 400 210" className="w-full h-auto" role="img" aria-label="سماكتا الزجاج 6 و8 ملم">
      <defs>
        <linearGradient id="sp-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#dbeaf2" />
          <stop offset="1" stopColor="#b9d3e2" />
        </linearGradient>
      </defs>
      {pane(110, 18, "6 ملم")}
      {pane(262, 24, "8 ملم")}
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
        gsap.set(layers, { y: (i) => -i * 34 });
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
    <section id="specs" className="bg-white py-16 sm:py-20 lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeader number="01" label="المواصفات" title={SPECS.title} intro={SPECS.intro} size="sm" />

        {/* ثلاث مواصفات في صف واحد — تُرى كاملة بدون تمرير على الشاشات الكبيرة */}
        <div className="mt-10 lg:mt-12 grid lg:grid-cols-12 gap-10 lg:gap-8 border-t border-line pt-10 text-right">
          {/* الجدار */}
          <div className="lg:col-span-3 lg:border-e lg:border-line lg:pe-8">
            <Reveal as="h3" delay={60} className="font-display font-bold text-2xl text-ink">
              {walls.title}
            </Reveal>
            <Reveal delay={120} className="mt-4 flex items-end gap-2">
              <span className="wood-text-dark font-display font-bold text-6xl leading-none num">{walls.value}</span>
              <span className="font-display text-xl text-walnut mb-1">{walls.unit}</span>
            </Reveal>
            <Reveal delay={160} className="mt-4 max-w-[260px]">
              <WallSection />
            </Reveal>
            <Reveal as="p" delay={200} className="mt-3 text-sm text-ink/65 leading-relaxed">
              {walls.description}
            </Reveal>
          </div>

          {/* السقف */}
          <div className="lg:col-span-6 lg:border-e lg:border-line lg:pe-8">
            <Reveal as="h3" delay={60} className="font-display font-bold text-2xl text-ink">
              {roof.title}
            </Reveal>
            <div className="mt-3 max-w-[420px] mx-auto">
              <RoofLayers innerRef={roofRef} />
            </div>
            <ol className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 max-w-[460px] mx-auto">
              {roof.layers.map((layer, i) => (
                <Reveal as="li" key={layer.name} delay={120 + i * 60} className="flex items-center gap-2 text-sm">
                  <span className="w-6 h-6 rounded-full bg-espresso text-white text-[11px] font-semibold flex items-center justify-center shrink-0 num">
                    {i + 1}
                  </span>
                  <span className="font-medium text-ink">{layer.name}</span>
                  {layer.note && <span className="text-ink/45">— {layer.note}</span>}
                </Reveal>
              ))}
            </ol>
          </div>

          {/* الزجاج */}
          <div className="lg:col-span-3">
            <Reveal as="h3" delay={60} className="font-display font-bold text-2xl text-ink">
              {glass.title}
            </Reveal>
            <Reveal delay={120} className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              {glass.options.map((opt, i) => {
                const [n, unit] = opt.split(" ");
                return (
                  <span key={opt} className="flex items-baseline gap-2">
                    {i > 0 && <span className="text-3xl text-line me-2" aria-hidden>/</span>}
                    <span className="wood-text-dark font-display font-bold text-6xl leading-none num">{n}</span>
                    <span className="font-display text-xl text-walnut">{unit}</span>
                  </span>
                );
              })}
            </Reveal>
            <Reveal delay={160} className="mt-4 max-w-[260px]">
              <GlassPanes />
            </Reveal>
            <Reveal as="p" delay={200} className="mt-3 text-sm text-ink/65 leading-relaxed">
              {glass.description}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
