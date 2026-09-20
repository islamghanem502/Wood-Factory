/*
  رسم الكوخ A-Frame — مبني على نِسب صورة cabin-a-frame.
  كل جزء له data-part حتى يحرّكه الهيرو مع الاسكرول:
  ridge (الجائز الأوسط) · roofL / roofR (الجناحان) · glassTop (الزجاج العلوي)
  beam (الجائز الأفقي) · glassBottom (الجدار الزجاجي السفلي) · deck (التراس)
  lights (إضاءة الجانبين) · glow (توهج النوافذ) · seams (خطوط اللحام)
*/

// نقاط الهيكل (viewBox 1000 × 800)
const APEX = [500, 40];
const BASE_L = [40, 690];
const BASE_R = [960, 690];
const IN_APEX = [500, 140];
const IN_BASE_L = [111, 690];
const IN_BASE_R = [889, 690];

const pts = (arr) => arr.map((p) => p.join(",")).join(" ");

// خطوط الألواح على الجناح: موازية للحافة الخارجية
const roofPlanks = (side) => {
  const dir = side === "L" ? -1 : 1;
  // متجه عمودي للداخل (تقريبي) بطول 1
  const nx = 0.8163 * -dir;
  const ny = 0.5777;
  return [16, 30, 44].map((k) => ({
    x1: APEX[0] + nx * k,
    y1: APEX[1] + ny * k,
    x2: (side === "L" ? BASE_L[0] : BASE_R[0]) + nx * k,
    y2: BASE_L[1] + ny * k,
  }));
};

export default function Cabin({ className = "" }) {
  return (
    <svg
      viewBox="0 0 1000 800"
      className={className}
      role="img"
      aria-label="رسم توضيحي لكوخ خشبي A-Frame يتركّب من أجزائه"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="cb-roof" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5a3826" />
          <stop offset="1" stopColor="#3f2618" />
        </linearGradient>
        <linearGradient id="cb-roof-inner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c98b52" />
          <stop offset="1" stopColor="#a86c3c" />
        </linearGradient>
        <linearGradient id="cb-glass-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4dcb4" />
          <stop offset="1" stopColor="#dca062" />
        </linearGradient>
        <linearGradient id="cb-glass-bottom" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6dfb8" />
          <stop offset="1" stopColor="#cf8a45" />
        </linearGradient>
        <linearGradient id="cb-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe9c4" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffb866" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="cb-light-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd9a0" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffd9a0" stopOpacity="0" />
        </linearGradient>
        <clipPath id="cb-clip-roofL">
          <polygon points={pts([APEX, BASE_L, IN_BASE_L, IN_APEX])} />
        </clipPath>
        <clipPath id="cb-clip-roofR">
          <polygon points={pts([APEX, BASE_R, IN_BASE_R, IN_APEX])} />
        </clipPath>
      </defs>

      {/* ظل أرضي */}
      <ellipse data-part="shadow" cx="500" cy="772" rx="470" ry="16" fill="#3a2214" opacity="0.1" />

      {/* ── التراس والدرج ── */}
      <g data-part="deck">
        <rect x="20" y="690" width="960" height="38" fill="#a87a4f" />
        {Array.from({ length: 25 }).map((_, i) => (
          <line key={i} x1={20 + i * 40} y1="690" x2={20 + i * 40} y2="728" stroke="#7e5a38" strokeWidth="2" />
        ))}
        <rect x="20" y="722" width="960" height="6" fill="#7e5a38" />
        <rect x="300" y="728" width="400" height="20" fill="#8f6440" />
        <rect x="340" y="748" width="320" height="18" fill="#7a5436" />
      </g>

      {/* ── الجدار الزجاجي السفلي والجدران الجانبية ── */}
      <g data-part="glassBottom">
        <polygon points="212,548 250,548 250,690 111,690" fill="#5b3d2a" />
        <polygon points="750,548 788,548 889,690 750,690" fill="#5b3d2a" />
        {[566, 584, 602, 620, 638, 656, 674].map((y) => (
          <g key={y} stroke="#4a3020" strokeWidth="2">
            <line x1={212 - (y - 548) * 0.71} y1={y} x2="250" y2={y} />
            <line x1="750" y1={y} x2={788 + (y - 548) * 0.71} y2={y} />
          </g>
        ))}
        <rect x="250" y="548" width="500" height="142" fill="url(#cb-glass-bottom)" />
        {/* أثاث داخلي كظلال بسيطة */}
        <rect x="290" y="640" width="120" height="30" rx="4" fill="#8b5a34" opacity="0.5" />
        <rect x="600" y="600" width="90" height="8" fill="#8b5a34" opacity="0.45" />
        {[560, 600, 640].map((x) => (
          <g key={x}>
            <line x1={x} y1="548" x2={x} y2="585" stroke="#8b5a34" strokeWidth="1.5" opacity="0.5" />
            <circle cx={x} cy="588" r="5" fill="#ffd9a0" />
          </g>
        ))}
        {/* الإطارات */}
        <g stroke="#2e1f16" fill="none">
          <rect x="250" y="548" width="500" height="142" strokeWidth="6" />
          <line x1="375" y1="548" x2="375" y2="690" strokeWidth="4" />
          <line x1="500" y1="548" x2="500" y2="690" strokeWidth="4" />
          <line x1="625" y1="548" x2="625" y2="690" strokeWidth="4" />
        </g>
      </g>

      {/* ── الزجاج العلوي ── */}
      <g data-part="glassTop">
        <polygon points={pts([IN_APEX, [242, 505], [758, 505]])} fill="url(#cb-glass-top)" />
        {/* درابزين الميزانين */}
        <line x1="295" y1="432" x2="705" y2="432" stroke="#2e1f16" strokeWidth="3" />
        {[330, 380, 430, 480, 520, 570, 620, 670].map((x) => (
          <line key={x} x1={x} y1="432" x2={x} y2="460" stroke="#2e1f16" strokeWidth="2" />
        ))}
        <line x1="295" y1="460" x2="705" y2="460" stroke="#2e1f16" strokeWidth="2" />
        {/* قواطع الزجاج */}
        <g stroke="#2e1f16" strokeWidth="3">
          <line x1="379" y1="311" x2="379" y2="505" />
          <line x1="621" y1="311" x2="621" y2="505" />
          <line x1="366" y1="330" x2="634" y2="330" />
        </g>
        <polygon points={pts([IN_APEX, [242, 505], [758, 505]])} fill="none" stroke="#2e1f16" strokeWidth="5" />
      </g>

      {/* ── توهج النوافذ (يظهر في النهاية) ── */}
      <g data-part="glow">
        <polygon points={pts([IN_APEX, [242, 505], [758, 505]])} fill="url(#cb-glow)" />
        <rect x="250" y="548" width="500" height="142" fill="url(#cb-glow)" />
      </g>

      {/* ── الجائز الأفقي ── */}
      <g data-part="beam">
        <polygon points="242,505 758,505 788,548 212,548" fill="#3b2417" />
        <polygon points="242,505 758,505 760,509 240,509" fill="#8a5c3a" />
        <line x1="226" y1="527" x2="774" y2="527" stroke="#2a1810" strokeWidth="2" />
      </g>

      {/* ── الجناح الأيسر ── */}
      <g data-part="roofL">
        <polygon points={pts([APEX, BASE_L, IN_BASE_L, IN_APEX])} fill="url(#cb-roof)" />
        <g clipPath="url(#cb-clip-roofL)">
          {roofPlanks("L").map((l, i) => (
            <line key={i} {...l} stroke="#2a1810" strokeWidth="2" opacity="0.7" />
          ))}
          <polygon points={pts([[500, 128], [125, 690], [111, 690], IN_APEX])} fill="url(#cb-roof-inner)" />
        </g>
        <line x1="500" y1="40" x2="40" y2="690" stroke="#d9bd98" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* ── الجناح الأيمن ── */}
      <g data-part="roofR">
        <polygon points={pts([APEX, BASE_R, IN_BASE_R, IN_APEX])} fill="url(#cb-roof)" />
        <g clipPath="url(#cb-clip-roofR)">
          {roofPlanks("R").map((l, i) => (
            <line key={i} {...l} stroke="#2a1810" strokeWidth="2" opacity="0.7" />
          ))}
          <polygon points={pts([[500, 128], [875, 690], [889, 690], IN_APEX])} fill="url(#cb-roof-inner)" />
        </g>
        <line x1="500" y1="40" x2="960" y2="690" stroke="#d9bd98" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* ── الجائز الأوسط ── */}
      <g data-part="ridge">
        <rect x="487" y="118" width="26" height="430" fill="#3b2417" />
        <rect x="487" y="118" width="6" height="430" fill="#8a5c3a" />
      </g>

      {/* ── إضاءة الجانبين ── */}
      <g data-part="lights">
        <polygon points="178,608 202,608 232,690 148,690" fill="url(#cb-light-cone)" />
        <polygon points="798,608 822,608 852,690 768,690" fill="url(#cb-light-cone)" />
        <rect x="178" y="598" width="24" height="12" rx="2" fill="#2e1f16" />
        <rect x="798" y="598" width="24" height="12" rx="2" fill="#2e1f16" />
        <rect x="181" y="606" width="18" height="3" fill="#ffd9a0" />
        <rect x="801" y="606" width="18" height="3" fill="#ffd9a0" />
      </g>

      {/* ── خطوط اللحام (تُرسم عند اكتمال التركيب) ── */}
      <g data-part="seams" fill="none" stroke="#f3eee6" strokeWidth="4" strokeLinecap="round">
        <path d="M 500 40 L 460 96" />
        <path d="M 500 40 L 540 96" />
        <path d="M 500 140 L 500 200" />
        <path d="M 242 505 L 212 548" />
        <path d="M 758 505 L 788 548" />
        <path d="M 111 690 L 250 690" />
        <path d="M 750 690 L 889 690" />
      </g>
    </svg>
  );
}
