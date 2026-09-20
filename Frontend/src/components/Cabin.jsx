/*
  رسم الكوخ A-Frame — واجهة أمامية بنِسب صورة cabin-a-frame.
  كل جزء له data-part حتى يحرّكه الهيرو مع الاسكرول:
  ridge · roofL / roofR · glassTop · beam · glassBottom · deck · props · lights · glow · seams
*/

// ── الهندسة (viewBox 1000 × 830) ──
const APEX = [500, 40];
const IN_APEX = [500, 137];
const EAVE_L = [28, 708];
const EAVE_R = [972, 708];
const IN_EAVE_L = [97, 708];
const IN_EAVE_R = [903, 708];
const FLOOR = 690;
// ميل الحافة الداخلية: dy/dx
const K = 1.4153;
// x على الحافة الداخلية اليسرى عند ارتفاع y
const innerX = (y) => 500 - (y - IN_APEX[1]) / K;

const pts = (arr) => arr.map((p) => p.join(",")).join(" ");
const range = (n, f) => Array.from({ length: n }, (_, i) => f(i));

// خطوط الألواح على الجناح: موازية للحافة الخارجية بإزاحة k
const roofPlanks = (side, offsets) => {
  const d = side === "L" ? 1 : -1;
  const nx = 0.8168 * d;
  const ny = 0.5771;
  const eave = side === "L" ? EAVE_L : EAVE_R;
  return offsets.map((k) => ({
    x1: APEX[0] + nx * k,
    y1: APEX[1] + ny * k,
    x2: eave[0] + nx * k,
    y2: eave[1] + ny * k,
  }));
};

// درج داخلي: 8 درجات صاعدة إلى اليمين
const stairsPath = (() => {
  let d = `M 262 ${FLOOR - 6}`;
  let x = 262;
  let y = FLOOR - 6;
  for (let i = 0; i < 8; i++) {
    y -= 15;
    d += ` L ${x} ${y}`;
    x += 13;
    d += ` L ${x} ${y}`;
  }
  d += ` L ${x} ${FLOOR - 6} Z`;
  return d;
})();

const LEFT_ROOF = [APEX, EAVE_L, IN_EAVE_L, IN_APEX];
const RIGHT_ROOF = [APEX, EAVE_R, IN_EAVE_R, IN_APEX];
const TOP_GLASS = [IN_APEX, [innerX(505), 505], [1000 - innerX(505), 505]];

export default function Cabin({ className = "" }) {
  return (
    <svg
      viewBox="0 0 1000 830"
      className={className}
      role="img"
      aria-label="رسم توضيحي لكوخ خشبي A-Frame يتركّب من أجزائه"
      style={{ overflow: "visible" }}
    >
      <defs>
        <pattern id="cb-grain" patternUnits="userSpaceOnUse" width="520" height="390">
          <image href="/textures/wood-dark.svg" width="520" height="390" />
        </pattern>
        <linearGradient id="cb-roof-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a5a34" stopOpacity="0.55" />
          <stop offset="0.6" stopColor="#3a2214" stopOpacity="0.25" />
          <stop offset="1" stopColor="#1a0f08" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="cb-ceiling" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d9985c" />
          <stop offset="1" stopColor="#a86c3c" />
        </linearGradient>
        <linearGradient id="cb-glass-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6e3c4" />
          <stop offset="1" stopColor="#d99a5a" />
        </linearGradient>
        <linearGradient id="cb-glass-bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7e2bf" />
          <stop offset="1" stopColor="#c9823f" />
        </linearGradient>
        <linearGradient id="cb-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffedd0" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffb866" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="cb-cone-down" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd9a0" stopOpacity="0.7" />
          <stop offset="1" stopColor="#ffd9a0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cb-cone-up" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ffd9a0" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffd9a0" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="cb-halo">
          <stop offset="0" stopColor="#ffe3b3" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffe3b3" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cb-deck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b07f52" />
          <stop offset="1" stopColor="#8f6440" />
        </linearGradient>
        <clipPath id="cb-clip-roofL">
          <polygon points={pts(LEFT_ROOF)} />
        </clipPath>
        <clipPath id="cb-clip-roofR">
          <polygon points={pts(RIGHT_ROOF)} />
        </clipPath>
        <clipPath id="cb-clip-glassTop">
          <polygon points={pts(TOP_GLASS)} />
        </clipPath>
        <clipPath id="cb-clip-glassBottom">
          <rect x="250" y="548" width="500" height={FLOOR - 548} />
        </clipPath>
      </defs>

      {/* ظل أرضي */}
      <ellipse data-part="shadow" cx="500" cy="800" rx="480" ry="15" fill="#14100d" opacity="0.12" />

      {/* ── التراس والدرج (بمنظور خفيف) ── */}
      <g data-part="deck">
        <polygon points={`60,${FLOOR} 940,${FLOOR} 962,732 38,732`} fill="url(#cb-deck)" />
        {range(23, (i) => {
          const x = 60 + i * 40;
          return <line key={i} x1={x} y1={FLOOR} x2={500 + (x - 500) * 1.05} y2="732" stroke="#6f4a2c" strokeWidth="1.5" opacity="0.8" />;
        })}
        <rect x="38" y="732" width="924" height="12" fill="#6e4a2e" />
        <rect x="300" y="744" width="400" height="18" fill="#8a5f3c" />
        <rect x="300" y="760" width="400" height="3" fill="#5f3f26" />
        <rect x="340" y="762" width="320" height="16" fill="#75502f" />
      </g>

      {/* ── الجدار الزجاجي السفلي + الجدران الجانبية + الداخل ── */}
      <g data-part="glassBottom">
        {/* الجدران الجانبية بكسوة أفقية */}
        <polygon points={`${innerX(548)},548 250,548 250,${FLOOR} ${innerX(FLOOR)},${FLOOR}`} fill="#57392a" />
        <polygon points={`${1000 - innerX(548)},548 750,548 750,${FLOOR} ${1000 - innerX(FLOOR)},${FLOOR}`} fill="#57392a" />
        {range(9, (i) => {
          const y = 562 + i * 15;
          return (
            <g key={y} stroke="#3e281c" strokeWidth="1.5">
              <line x1={innerX(y)} y1={y} x2="250" y2={y} />
              <line x1="750" y1={y} x2={1000 - innerX(y)} y2={y} />
            </g>
          );
        })}
        {/* ظل السقف على الجدران */}
        <polygon points={`${innerX(548)},548 ${innerX(548) + 22},548 ${innerX(FLOOR) + 22},${FLOOR} ${innerX(FLOOR)},${FLOOR}`} fill="#14100d" opacity="0.28" />
        <polygon points={`${1000 - innerX(548)},548 ${1000 - innerX(548) - 22},548 ${1000 - innerX(FLOOR) - 22},${FLOOR} ${1000 - innerX(FLOOR)},${FLOOR}`} fill="#14100d" opacity="0.28" />

        {/* الزجاج */}
        <rect x="250" y="548" width="500" height={FLOOR - 548} fill="url(#cb-glass-bottom)" />
        <g clipPath="url(#cb-clip-glassBottom)">
          {/* الداخل: درج، طاولة طعام، مصابيح معلّقة */}
          <path d={stairsPath} fill="#6b4a32" opacity="0.55" />
          <rect x="262" y={FLOOR - 6} width="230" height="6" fill="#8b5a34" opacity="0.5" />
          <rect x="560" y="640" width="110" height="6" rx="1" fill="#5a3a24" opacity="0.7" />
          <line x1="572" y1="646" x2="572" y2={FLOOR - 6} stroke="#5a3a24" strokeWidth="3" opacity="0.7" />
          <line x1="658" y1="646" x2="658" y2={FLOOR - 6} stroke="#5a3a24" strokeWidth="3" opacity="0.7" />
          {[548, 598, 648].map((x) => (
            <rect key={x} x={x} y="650" width="10" height="34" rx="2" fill="#5a3a24" opacity="0.55" />
          ))}
          {[585, 615, 645].map((x) => (
            <g key={x}>
              <line x1={x} y1="548" x2={x} y2="596" stroke="#3a2214" strokeWidth="1.5" opacity="0.7" />
              <polygon points={`${x - 9},596 ${x + 9},596 ${x + 5},606 ${x - 5},606`} fill="#2b1a12" opacity="0.85" />
              <circle cx={x} cy="611" r="9" fill="url(#cb-halo)" />
              <circle cx={x} cy="608" r="2.5" fill="#fff1d6" />
            </g>
          ))}
          {/* انعكاس */}
          <polygon points={`300,${FLOOR} 345,${FLOOR} 430,548 385,548`} fill="#ffffff" opacity="0.08" />
        </g>
        {/* الإطارات والمقابض */}
        <g stroke="#1c1512" fill="none">
          <rect x="250" y="548" width="500" height={FLOOR - 548} strokeWidth="6" />
          <line x1="375" y1="548" x2="375" y2={FLOOR} strokeWidth="4" />
          <line x1="500" y1="548" x2="500" y2={FLOOR} strokeWidth="4" />
          <line x1="625" y1="548" x2="625" y2={FLOOR} strokeWidth="4" />
          <line x1="493" y1="600" x2="493" y2="636" strokeWidth="3" strokeLinecap="round" />
          <line x1="507" y1="600" x2="507" y2="636" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>

      {/* ── الزجاج العلوي + الميزانين ── */}
      <g data-part="glassTop">
        <polygon points={pts(TOP_GLASS)} fill="url(#cb-glass-top)" />
        <g clipPath="url(#cb-clip-glassTop)">
          {/* ألواح السقف الداخلية على جانبي المثلث */}
          <polygon points={`500,137 ${innerX(505)},505 ${innerX(505) + 26},505 500,172`} fill="url(#cb-ceiling)" />
          <polygon points={`500,137 ${1000 - innerX(505)},505 ${1000 - innerX(505) - 26},505 500,172`} fill="url(#cb-ceiling)" />
          {/* أثاث الميزانين */}
          <rect x="430" y="418" width="170" height="27" rx="6" fill="#5e3f2b" opacity="0.6" />
          <rect x="440" y="412" width="40" height="10" rx="3" fill="#5e3f2b" opacity="0.6" />
          <rect x="545" y="412" width="40" height="10" rx="3" fill="#5e3f2b" opacity="0.6" />
          <g opacity="0.75">
            <ellipse cx="655" cy="405" rx="16" ry="12" fill="#4f6b3a" />
            <ellipse cx="642" cy="418" rx="12" ry="9" fill="#5b7a44" />
            <ellipse cx="668" cy="420" rx="12" ry="9" fill="#5b7a44" />
            <rect x="647" y="428" width="16" height="17" fill="#3d2a1e" />
          </g>
          {/* مصابيح معلّقة من السقف */}
          {[432, 568].map((x) => (
            <g key={x}>
              <line x1={x} y1="215" x2={x} y2="292" stroke="#3a2214" strokeWidth="1.5" opacity="0.7" />
              <circle cx={x} cy="300" r="14" fill="url(#cb-halo)" />
              <circle cx={x} cy="298" r="4" fill="#fff1d6" />
            </g>
          ))}
          {/* أرضية الميزانين والدرابزين */}
          <rect x={innerX(445)} y="445" width={1000 - 2 * innerX(445)} height="6" fill="#2b1a12" />
          <line x1={innerX(415)} y1="415" x2={1000 - innerX(415)} y2="415" stroke="#1c1512" strokeWidth="3" />
          {range(17, (i) => {
            const x = innerX(415) + 8 + i * 24;
            return <line key={i} x1={x} y1="415" x2={x} y2="445" stroke="#1c1512" strokeWidth="1.5" />;
          })}
          {/* انعكاس */}
          <polygon points="300,470 352,470 522,200 470,200" fill="#ffffff" opacity="0.07" />
        </g>
        {/* قواطع الزجاج */}
        <g stroke="#1c1512" strokeWidth="3">
          <line x1="380" y1="307" x2="380" y2="505" />
          <line x1="620" y1="307" x2="620" y2="505" />
          <line x1={innerX(330)} y1="330" x2={1000 - innerX(330)} y2="330" />
        </g>
        <polygon points={pts(TOP_GLASS)} fill="none" stroke="#1c1512" strokeWidth="5" />
      </g>

      {/* ── توهج النوافذ (يظهر في النهاية) ── */}
      <g data-part="glow">
        <polygon points={pts(TOP_GLASS)} fill="url(#cb-glow)" />
        <rect x="250" y="548" width="500" height={FLOOR - 548} fill="url(#cb-glow)" />
      </g>

      {/* ── الجائز الأفقي ── */}
      <g data-part="beam">
        <polygon points={`${innerX(505)},505 ${1000 - innerX(505)},505 ${1000 - innerX(548)},548 ${innerX(548)},548`} fill="#2b1a12" />
        <polygon points={`${innerX(505)},505 ${1000 - innerX(505)},505 ${1000 - innerX(509)},509 ${innerX(509)},509`} fill="#8a5c3a" />
        <line x1={innerX(527)} y1="527" x2={1000 - innerX(527)} y2="527" stroke="#1a0f08" strokeWidth="1.5" />
        {/* صفائح التثبيت */}
        {[innerX(512) + 6, 1000 - innerX(512) - 24].map((x) => (
          <g key={x}>
            <rect x={x} y="511" width="18" height="30" rx="2" fill="#4a4e54" />
            <circle cx={x + 9} cy="518" r="2" fill="#1c1512" />
            <circle cx={x + 9} cy="534" r="2" fill="#1c1512" />
          </g>
        ))}
      </g>

      {/* ── الجناح الأيسر ── */}
      <g data-part="roofL">
        <polygon points={pts(LEFT_ROOF)} fill="url(#cb-grain)" />
        <polygon points={pts(LEFT_ROOF)} fill="url(#cb-roof-light)" />
        <g clipPath="url(#cb-clip-roofL)">
          {roofPlanks("L", [14, 26, 38, 50]).map((l, i) => (
            <line key={i} {...l} stroke="#120a05" strokeWidth="1.5" opacity="0.45" />
          ))}
          {roofPlanks("L", [8]).map((l, i) => (
            <line key={i} {...l} stroke="#3a2214" strokeWidth="2" />
          ))}
        </g>
        <line x1={APEX[0]} y1={APEX[1]} x2={EAVE_L[0]} y2={EAVE_L[1]} stroke="#d9bd98" strokeWidth="7" strokeLinecap="round" />
      </g>

      {/* ── الجناح الأيمن ── */}
      <g data-part="roofR">
        <polygon points={pts(RIGHT_ROOF)} fill="url(#cb-grain)" />
        <polygon points={pts(RIGHT_ROOF)} fill="url(#cb-roof-light)" />
        <g clipPath="url(#cb-clip-roofR)">
          {roofPlanks("R", [14, 26, 38, 50]).map((l, i) => (
            <line key={i} {...l} stroke="#120a05" strokeWidth="1.5" opacity="0.45" />
          ))}
          {roofPlanks("R", [8]).map((l, i) => (
            <line key={i} {...l} stroke="#3a2214" strokeWidth="2" />
          ))}
        </g>
        <line x1={APEX[0]} y1={APEX[1]} x2={EAVE_R[0]} y2={EAVE_R[1]} stroke="#d9bd98" strokeWidth="7" strokeLinecap="round" />
      </g>

      {/* ── الجائز الأوسط ── */}
      <g data-part="ridge">
        <rect x="487" y="122" width="26" height="426" fill="#2b1a12" />
        <rect x="487" y="122" width="6" height="426" fill="#8a5c3a" />
        <rect x="507" y="122" width="6" height="426" fill="#1a0f08" />
      </g>

      {/* ── نباتات وفوانيس على التراس ── */}
      <g data-part="props">
        <g opacity="0.9">
          <ellipse cx="716" cy="640" rx="20" ry="14" fill="#4f6b3a" />
          <ellipse cx="700" cy="652" rx="14" ry="10" fill="#5b7a44" />
          <ellipse cx="732" cy="654" rx="14" ry="10" fill="#5b7a44" />
          <polygon points={`700,660 732,660 728,${FLOOR} 704,${FLOOR}`} fill="#2e2a27" />
        </g>
        <rect x="76" y="698" width="12" height="18" rx="1.5" fill="#1c1512" />
        <rect x="912" y="698" width="12" height="18" rx="1.5" fill="#1c1512" />
      </g>

      {/* ── الإضاءة النهائية: غطاء القمة، مصابيح الجدران، الفوانيس ── */}
      <g data-part="lights">
        <polygon points="500,26 527,66 473,66" fill="#4a4e54" />
        <polygon points="500,26 527,66 500,58" fill="#5e636a" />
        {[185, 815].map((x) => (
          <g key={x}>
            <polygon points={`${x - 8},596 ${x + 8},596 ${x + 14},556 ${x - 14},556`} fill="url(#cb-cone-up)" />
            <polygon points={`${x - 8},610 ${x + 8},610 ${x + 30},${FLOOR} ${x - 30},${FLOOR}`} fill="url(#cb-cone-down)" />
            <rect x={x - 9} y="596" width="18" height="14" rx="2" fill="#1c1512" />
            <rect x={x - 6} y="607" width="12" height="2.5" fill="#ffd9a0" />
            <rect x={x - 6} y="596.5" width="12" height="2.5" fill="#ffd9a0" />
          </g>
        ))}
        <circle cx="82" cy="707" r="20" fill="url(#cb-halo)" />
        <circle cx="918" cy="707" r="20" fill="url(#cb-halo)" />
        <rect x="79" y="702" width="6" height="8" fill="#ffe3b3" />
        <rect x="915" y="702" width="6" height="8" fill="#ffe3b3" />
      </g>

      {/* ── خطوط اللحام ── */}
      <g data-part="seams" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round">
        <path d="M 500 40 L 460 97" />
        <path d="M 500 40 L 540 97" />
        <path d="M 500 137 L 500 200" />
        <path d={`M ${innerX(505)} 505 L ${innerX(548)} 548`} />
        <path d={`M ${1000 - innerX(505)} 505 L ${1000 - innerX(548)} 548`} />
        <path d={`M ${innerX(FLOOR)} ${FLOOR} L 250 ${FLOOR}`} />
        <path d={`M 750 ${FLOOR} L ${1000 - innerX(FLOOR)} ${FLOOR}`} />
      </g>
    </svg>
  );
}
