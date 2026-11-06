import SectionHeader from "../components/SectionHeader";
import ModelIcon from "../components/ModelIcon";
import WhatsAppButton, { CallLink, WhatsAppIcon } from "../components/WhatsAppButton";
import { CONTACT, waLink } from "../config/contact";
import { trackContact, sourceLine } from "../lib/analytics";
import { ABOUT, CALC_MODELS } from "../data/content";
import { Reveal } from "../lib/motion";

/*
  صفحة «من نحن» — الإيقاع: أبيض → إسبريسو → أبيض → إسبريسو → أبيض → رمادي حجري → أبيض → (الفوتر إسبريسو)
*/

/* الافتتاحية: النص يمين، وكلمة «وتد» كبيرة بنسيج الخشب يسار */
function Intro() {
  const { hero } = ABOUT;
  return (
    <section id="about-hero" className="bg-white pt-28 sm:pt-36 pb-14 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-8 lg:gap-10 items-end text-right">
        <div className="lg:col-span-7">
          <Reveal as="nav" aria-label="مسار التصفح" className="flex items-center gap-2 text-xs text-ink/50">
            <a href="/" className="link-underline hover:text-ink">الرئيسية</a>
            <span aria-hidden>/</span>
            <span className="text-walnut" aria-current="page">{hero.kicker}</span>
          </Reveal>
          <Reveal as="h1" delay={80} className="mt-5 sm:mt-7 font-display font-bold text-[2rem] leading-[1.25] sm:text-6xl lg:text-7xl text-ink">
            {hero.title}
          </Reveal>
          <Reveal as="p" delay={160} className="mt-5 sm:mt-7 max-w-xl text-[15px] sm:text-xl text-ink/70 leading-relaxed">
            {hero.text}
          </Reveal>
          <Reveal delay={240} className="mt-8 sm:mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <WhatsAppButton message={ABOUT.cta.whatsapp} placement="about_hero" size="lg">محادثة واتساب</WhatsAppButton>
            <CallLink placement="about_hero" className="link-underline text-ink font-medium num" dir="ltr">
              {CONTACT.phoneDisplay}
            </CallLink>
          </Reveal>
        </div>
        <Reveal delay={200} className="hidden lg:flex lg:col-span-5 justify-end" aria-hidden>
          <span className="wood-text-dark font-display font-bold text-[13rem] xl:text-[15rem] leading-[0.9] select-none">وتد</span>
        </Reveal>
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-12 sm:mt-16">
        <Reveal variant="line" className="h-px bg-line" />
      </div>
    </section>
  );
}

/* معنى الاسم: اقتباس كبير على الإسبريسو */
function NameMeaning() {
  const { name } = ABOUT;
  return (
    <section id="name" className="relative bg-espresso wood-overlay text-white py-16 sm:py-24 lg:py-28">
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8 text-right">
        <Reveal className="flex items-center gap-3 text-[11px] sm:text-xs tracking-[0.18em] text-white/55">
          <span className="w-8 h-px bg-line-dark" />
          <span>{name.label}</span>
        </Reveal>
        <Reveal as="h2" delay={80} className="mt-3 sm:mt-4 font-display font-bold text-2xl sm:text-5xl">
          {name.title}
        </Reveal>
        <div className="mt-7 sm:mt-10 border-s-2 border-oak-light/60 ps-5 sm:ps-8 space-y-4 sm:space-y-5">
          {name.lines.map((line, i) => (
            <Reveal as="p" key={line} delay={160 + i * 100} className={`font-display leading-relaxed ${i === 0 ? "text-lg sm:text-3xl text-white" : "text-base sm:text-xl text-white/70"}`}>
              {line}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* من نحن: فقرتان + بطاقة «لا نعمل بالتقريب» */
function Who() {
  const { who } = ABOUT;
  return (
    <section id="who" className="bg-white py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader number="01" label={who.label} title={who.title} size="sm" />
        <div className="mt-8 sm:mt-12 grid lg:grid-cols-12 gap-8 lg:gap-12 text-right">
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {who.paragraphs.map((p, i) => (
              <Reveal as="p" key={p} delay={i * 90} className="text-[15px] sm:text-lg text-ink/75 leading-loose">
                {p}
              </Reveal>
            ))}
          </div>
          <Reveal delay={160} className="lg:col-span-5">
            <div className="rounded-3xl bg-stone border border-line p-6 sm:p-8">
              <span className="block font-display font-bold text-xl sm:text-2xl text-ink">{who.noteTitle}</span>
              <p className="mt-1.5 text-sm sm:text-base text-ink/60">{who.noteText}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {who.written.map((w) => (
                  <li key={w} className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-white border border-line text-sm text-ink">
                    <span className="text-walnut text-xs" aria-hidden>✓</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* داخل المصنع: خمس مراحل بأرقام مُعبّأة بالخشب */
function Factory() {
  const { factory } = ABOUT;
  return (
    <section id="factory" className="relative bg-espresso wood-overlay text-white py-16 sm:py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader number="02" label={factory.label} title={factory.title} intro={factory.intro} dark size="sm" />
        <ol className="mt-8 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-5 sm:gap-y-10 gap-x-6 lg:gap-x-8 text-right">
          {factory.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 100} className="relative flex items-start gap-4 sm:block lg:pe-4">
              {i < factory.steps.length - 1 && <span className="hidden lg:block absolute top-7 left-0 w-5 h-px bg-white/20" aria-hidden />}
              <span className="wood-text font-display font-bold text-3xl sm:text-6xl leading-none num block w-11 sm:w-auto shrink-0 pt-0.5 sm:pt-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="sm:mt-4 font-display font-semibold text-base sm:text-xl">{step.title}</h3>
                <p className="mt-1 sm:mt-2 text-[13px] sm:text-[15px] text-white/65 leading-relaxed">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ماذا نصنع: بطاقة لكل نوع بأيقونته الخطية */
function Products() {
  const { products } = ABOUT;
  return (
    <section id="products" className="bg-white py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader number="03" label={products.label} title={products.title} intro={products.intro} size="sm" />
        <ul className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 text-right">
          {CALC_MODELS.map((m, i) => (
            <Reveal as="li" key={m.id} delay={i * 80} className="h-full">
              {/* الجوال: الأيقونة بجانب النص؛ الشاشات الأكبر: بطاقة عمودية */}
              <div className="h-full flex items-start sm:flex-col gap-4 sm:gap-0 rounded-2xl border border-line p-4 sm:p-6 transition-colors duration-300 hover:border-ink/30">
                <span className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-stone flex items-center justify-center">
                  <ModelIcon id={m.icon} className="w-8 h-6 sm:w-9 sm:h-7 text-walnut" />
                </span>
                <div className="min-w-0 flex-1 sm:w-full flex flex-col h-full">
                <h3 className="sm:mt-5 font-display font-semibold text-base sm:text-lg text-ink">{m.name}</h3>
                <p className="mt-1 text-sm text-ink/60 leading-relaxed">{m.desc}</p>
                <a
                  href={waLink(products.whatsapp(m.name) + sourceLine())}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContact(`about_product_${m.id}`)}
                  data-placement={`about_product_${m.id}`}
                  className="mt-auto pt-3 sm:pt-5 self-start inline-flex items-center gap-2 text-sm font-medium text-walnut hover:text-ink transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span className="link-underline">{products.cta}</span>
                </a>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* التزاماتنا: أربع بطاقات على خلفية حجرية */
function Commitments() {
  const { commitments } = ABOUT;
  return (
    <section id="commitments" className="bg-stone py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader number="04" label={commitments.label} title={commitments.title} size="sm" />
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-right">
          {commitments.items.map((c, i) => (
            <Reveal key={c.title} delay={i * 90} className="rounded-2xl bg-white border border-line p-6 sm:p-7">
              <div className="flex items-baseline gap-2">
                <span className="wood-text-dark font-display font-bold text-5xl sm:text-6xl leading-none num">{c.value}</span>
                <span className="font-display text-base sm:text-lg text-walnut">{c.unit}</span>
              </div>
              <h3 className="mt-5 font-display font-semibold text-lg text-ink">{c.title}</h3>
              <p className="mt-1 text-sm text-ink/60 leading-relaxed">{c.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* أين نعمل: المدن كشارات */
function Areas() {
  const { areas } = ABOUT;
  return (
    <section id="areas" className="bg-white py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader number="05" label={areas.label} title={areas.title} size="sm" />
        <Reveal as="ul" delay={120} className="mt-8 sm:mt-12 flex flex-wrap gap-2 sm:gap-3">
          {areas.list.map((city) => (
            <li key={city} className="inline-flex items-center h-11 sm:h-12 px-5 sm:px-6 rounded-full border border-line font-display font-medium text-sm sm:text-base text-ink">
              {city}
            </li>
          ))}
        </Reveal>
        <Reveal as="p" delay={200} className="mt-6 text-sm sm:text-base text-ink/60">
          {areas.note}
        </Reveal>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <Intro />
      <NameMeaning />
      <Who />
      <Factory />
      <Products />
      <Commitments />
      <Areas />
    </>
  );
}
