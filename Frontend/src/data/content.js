// ─────────────────────────────────────────────────────────────
// محتوى الموقع (النصوص والصور) — عدّل من هنا فقط
// ─────────────────────────────────────────────────────────────
import { CONTACT } from "../config/contact";

export const IMAGES = {
  logo: "/images/logo-mark.png",
  logoCream: "/images/logo-mark-cream.png",
  hero: "/images/hero-cabin-night.webp",
  aFrame: "/images/cabin-a-frame.webp",
  twoFloor: "/images/cabin-two-floor.webp",
  singleFloor: "/images/cabin-single-floor.webp",
  coffeeShop: "/images/cabin-coffee-shop.webp",
  pergola: "/images/pergola-outdoor.webp",
  interior: "/images/interior-luxury.webp",
  resortPool: "/images/resort-chalet-pool.webp",
};

/* روابط شريط التنقل */
export const NAV_LINKS = [
  { label: "المواصفات", href: "#specs" },
  { label: "المشاريع", href: "#gallery" },
  { label: "الحاسبة", href: "#calculator" },
  { label: "الأسئلة", href: "#faq" },
];

/* الهيرو */
export const HERO = {
  kicker: "أكواخ ريفية وبرجولات خشبية — المملكة العربية السعودية",
  title: ["نبني كوخك", "الخشبي ليبقى."],
  text: "أكواخ ريفية وبرجولات حديثة من خشب السنوبر: جدران بسماكة 12 سم، سقف من 5 طبقات، وضمان يصل إلى 15 سنة.",
  scrollHint: "مرّر لتركيب الكوخ",
  whatsapp: "مرحباً خشبي WOODEN، أرغب في الاستفسار عن بناء كوخ خشبي.",
};

/* شريط الأرقام */
export const NUMBERS = [
  { value: "12", unit: "سم", label: "سماكة جدران السنوبر" },
  { value: "5", unit: "طبقات", label: "في نظام السقف" },
  { value: "15", unit: "سنة", label: "ضمان على الهيكل" },
  { value: "180", unit: "+", label: "مشروع منفّذ في المملكة" },
];

/* المواصفات الفنية */
export const SPECS = {
  intro: "تفاصيل البناء التي تحدد جودة الكوخ ومتانته.",
  walls: {
    title: "جدران خشبية بالكامل",
    value: "12",
    unit: "سم",
    material: "خشب السنوبر الطبيعي",
    description: "جدار خشبي مصمت من خشب السنوبر بسماكة 12 سم — نفس الخشب من الداخل والخارج.",
  },
  roof: {
    title: "سقف من 5 طبقات",
    description: "خشب ظاهر من الداخل، وحماية كاملة من الخارج.",
    // مرتبة من الداخل إلى الخارج
    layers: [
      { name: "خشب السنوبر", note: "الطبقة الداخلية الظاهرة" },
      { name: "عزل حراري", note: "يحفظ درجة الحرارة" },
      { name: "عازل مائي", note: "ضد الأمطار والرطوبة" },
      { name: "جرميد معدني", note: "الطبقة الخارجية" },
    ],
  },
  glass: {
    title: "الزجاج",
    options: ["6 ملم", "8 ملم"],
    description: "تُحدَّد سماكة الزجاج لكل كوخ عند اعتماد التصميم والتعاقد.",
  },
};

/* فلاتر معرض المشاريع */
export const GALLERY_FILTERS = [
  { id: "all", label: "الكل" },
  { id: "triangle", label: "أكواخ A-Frame" },
  { id: "chalets", label: "دور ودورين" },
  { id: "commercial", label: "تجاري" },
  { id: "pergolas", label: "برجولات" },
  { id: "interior", label: "داخلي" },
];

/* معرض المشاريع */
export const PROJECTS = [
  {
    id: "p1",
    title: "منتجع العلا",
    category: "triangle",
    categoryLabel: "كوخ A-Frame",
    image: IMAGES.hero,
    area: "140 م²",
    duration: "4 أيام",
    description: "كوخ هرمي بواجهة زجاجية كاملة وجلسة خارجية حول موقد.",
    features: ["دورين مع شرفة", "جلسة موقد خارجية", "سقف متعدد الطبقات"],
  },
  {
    id: "p2",
    title: "كوخ الدرعية — دورين",
    category: "chalets",
    categoryLabel: "دورين",
    image: IMAGES.twoFloor,
    area: "320 م²",
    duration: "12 يوم",
    description: "كوخ خشبي بدورين مع تراسات متدرجة تطل على بركة عاكسة.",
    features: ["4 أجنحة نوم", "صالة بسقف جملوني", "تراسات خشبية"],
  },
  {
    id: "p3",
    title: "كوخ A-Frame الرياض",
    category: "triangle",
    categoryLabel: "كوخ A-Frame",
    image: IMAGES.aFrame,
    area: "95 م²",
    duration: "3 أيام",
    description: "كوخ هرمي مفتوح يجمع بين الزجاج والخشب المعالج مع صالون خارجي.",
    features: ["واجهة زجاجية كاملة", "أثاث مدمج", "إضاءة مسائية"],
  },
  {
    id: "p4",
    title: "كافيه بالرياض",
    category: "commercial",
    categoryLabel: "تجاري",
    image: IMAGES.coffeeShop,
    area: "65 م²",
    duration: "6 أيام",
    description: "منفذ قهوة بواجهات خشبية طولية وإضاءة خارجية.",
    features: ["نافذة خدمة", "تجهيزات كهروميكانيكية", "جلسات خارجية"],
  },
  {
    id: "p5",
    title: "فيلا الخرج — دور واحد",
    category: "chalets",
    categoryLabel: "دور واحد",
    image: IMAGES.singleFloor,
    area: "160 م²",
    duration: "5 أيام",
    description: "كوخ دور واحد بسقف ممتد وممرات خشبية متصلة بحديقة النخيل.",
    features: ["تصميم مفتوح", "جدران سنوبر 12 سم", "مطبخ بار خشبي"],
  },
  {
    id: "p6",
    title: "برجولة حديقة النخيل",
    category: "pergolas",
    categoryLabel: "برجولة",
    image: IMAGES.pergola,
    area: "48 م²",
    duration: "يومان",
    description: "برجولة خشبية بنظام لوفرز وجلسة طعام محاطة بأرضيات خشبية.",
    features: ["إضاءة محيطية", "مقاومة للرطوبة والشمس", "طاولة طعام خشبية"],
  },
  {
    id: "p7",
    title: "صالون داخلي وموقد",
    category: "interior",
    categoryLabel: "داخلي",
    image: IMAGES.interior,
    area: "85 م²",
    duration: "4 أيام",
    description: "تصميم داخلي مع موقد حجري وأرفف خشبية مضيئة.",
    features: ["خشب طبيعي", "عوارض سقفية", "عزل صوتي"],
  },
  {
    id: "p8",
    title: "منتجع الواحة",
    category: "chalets",
    categoryLabel: "دورين",
    image: IMAGES.resortPool,
    area: "280 م²",
    duration: "10 أيام",
    description: "منتجع خشبي بنظام الفلل المستقلة مع مسبح وتراس خشبي.",
    features: ["فلل مستقلة", "تشطيبات فندقية", "ضمان 15 سنة"],
  },
];

/* آراء العملاء */
export const TESTIMONIALS = [
  {
    name: "م. فهد السبيعي",
    city: "الرياض",
    text: "طلبت كوخ A-Frame دورين للمزرعة. خلال 4 أيام كان جاهزاً، والتشطيب الخشبي أفضل مما توقعت.",
    type: "كوخ هرمي دورين",
  },
  {
    name: "أ. سلطان العتيبي",
    city: "جدة",
    text: "من أول استشارة على الواتساب إلى استلام المفتاح كان الفريق متعاوناً. الكوخ الآن مؤجر بالكامل.",
    type: "كوخ دورين مع مسبح",
  },
  {
    name: "د. نورة الشهري",
    city: "أبها",
    text: "بنينا كوخاً صغيراً في حديقة المنزل. الأجواء داخله صيفاً وشتاءً ممتازة ورائحة الخشب طبيعية.",
    type: "كوخ دور واحد",
  },
  {
    name: "م. خالد المنصور",
    city: "القصيم",
    text: "نفذوا لنا كشك كافيه خشبي. الواجهة جذبت الزبائن من أول يوم، والتكلفة أقل من البناء التقليدي.",
    type: "كافيه تجاري",
  },
];

/* الأسئلة الشائعة */
export const FAQS = [
  {
    q: "هل الأكواخ الخشبية تتحمل حرارة المملكة؟",
    a: "نعم. نستخدم خشباً معالجاً مع دهانات حماية مقاومة للأشعة فوق البنفسجية والرطوبة، والجدران بسماكة 12 سم مع السقف متعدد الطبقات تجعل الكوخ مناسباً لأجواء المملكة.",
  },
  {
    q: "كم يستغرق التركيب؟",
    a: "تُصنَّع القطع مسبقاً في مصنعنا، فالأكواخ الصغيرة والمتوسطة تستغرق من 24 إلى 72 ساعة للتركيب، والكبيرة من 7 إلى 14 يوماً.",
  },
  {
    q: "هل يحتاج الكوخ قواعد خرسانية؟",
    a: "في معظم الحالات لا. يمكن تأسيسه على قواعد حديدية أو ركائز أرضية أو أرضية خشبية، وهو ما يجعله مناسباً للمزارع والاستراحات وحتى أسطح الفلل.",
  },
  {
    q: "هل يمكن فك الكوخ ونقله؟",
    a: "نعم. نظام التعشيق قابل للفك والنقل وإعادة التركيب في موقع جديد دون التأثير على متانته.",
  },
  {
    q: "ما الضمان المقدم؟",
    a: "ضمان يصل إلى 15 سنة على الهيكل الخشبي ومقاومة العوامل الجوية، مع خدمة دعم فني عبر الواتساب والهاتف.",
  },
  {
    q: "كيف أبدأ؟",
    a: `راسلنا عبر الواتساب أو اتصل على ${CONTACT.phoneDisplay}. نناقش المقاس والتصميم ونرسل لك تقديراً مبدئياً للتكلفة.`,
  },
];

/* حاسبة التكاليف — النماذج والملحقات */
export const CALC_MODELS = [
  { id: "triangle", name: "كوخ A-Frame", ratePerMeter: 890, desc: "واجهة زجاجية كاملة، دور أو دورين" },
  { id: "two-floor", name: "كوخ ريفي دورين", ratePerMeter: 1050, desc: "غرف متعددة وبلكونات خشبية" },
  { id: "single-floor", name: "كوخ دور واحد", ratePerMeter: 790, desc: "للحدائق والاستراحات وأسطح الفلل" },
  { id: "commercial", name: "كشك أو منفذ تجاري", ratePerMeter: 1150, desc: "جاهز للتشغيل ومطابق لاشتراطات البلدية" },
  { id: "pergola", name: "برجولة خارجية", ratePerMeter: 450, desc: "خشب معالج مقاوم للعوامل الجوية" },
];

export const CALC_ADDONS = [
  { id: "terrace", name: "تراس خشبي خارجي", cost: 4500 },
  { id: "glass", name: "زجاج مزدوج (دبل جلاس)", cost: 6000 },
  { id: "ac", name: "تأسيس التكييف والإنارة", cost: 3500 },
  { id: "fireplace", name: "موقد تدفئة", cost: 5000 },
];

/* الفوتر */
export const SERVICE_AREAS = "الرياض · جدة · مكة المكرمة · العلا · عسير · القصيم · وكافة مدن المملكة";
