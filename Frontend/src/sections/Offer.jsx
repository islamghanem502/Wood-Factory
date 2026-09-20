import WhatsAppButton from "../components/WhatsAppButton";
import { OFFER } from "../data/content";
import { Reveal } from "../lib/motion";

const fmt = (n) => n.toLocaleString("en-US");

/*
  العرض الخاص: الصورة على اليمين، والعرض على اليسار.
  لوحة فاتحة بحدود ناعمة، شارة خضراء صغيرة لليوم الوطني، والسعر القديم مشطوب.
*/
export default function Offer() {
  if (!OFFER.active) return null;

  return (
    <section id="offer" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative rounded-3xl bg-stone border border-line overflow-hidden">
            <div className="grid lg:grid-cols-12 items-center gap-8 lg:gap-4 p-6 sm:p-10 lg:p-14">
              {/* الصورة — على اليمين */}
              <Reveal variant="clip" delay={80} className="lg:col-span-6 order-first">
                <div className="relative">
                  <img
                    src={OFFER.image}
                    alt="كوخ خشبي A-Frame مربوط بشريط أحمر — عرض اليوم الوطني"
                    className="w-full h-auto max-h-[520px] object-contain drop-shadow-[0_30px_40px_rgba(20,16,13,0.25)]"
                    width="1390"
                    height="1018"
                    loading="lazy"
                  />
                </div>
              </Reveal>

              {/* النص — على اليسار */}
              <div className="lg:col-span-6 text-right lg:ps-6">
                <Reveal delay={120} className="inline-flex items-center gap-2 h-8 px-3 rounded-full bg-[#006c35] text-white text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                  {OFFER.badge}
                </Reveal>
                <Reveal as="h2" delay={180} className="mt-5 font-display font-bold text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.15] text-ink">
                  {OFFER.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </Reveal>

                <Reveal delay={240} className="mt-7 flex items-end gap-4">
                  <span className="wood-text-dark font-display font-bold text-7xl sm:text-8xl leading-none num">{fmt(OFFER.price)}</span>
                  <span className="mb-2">
                    <span className="block text-sm text-walnut">{OFFER.unit}</span>
                    <span className="block text-lg text-ink/45 num line-through decoration-2 decoration-ink/40">{fmt(OFFER.listPrice)}</span>
                  </span>
                </Reveal>

                <Reveal as="p" delay={300} className="mt-6 text-base sm:text-lg text-ink/70 leading-relaxed max-w-lg">
                  {OFFER.text}
                </Reveal>
                <Reveal as="p" delay={340} className="mt-3 text-sm text-ink/50">
                  {OFFER.note}
                </Reveal>

                <Reveal delay={380} className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                  <WhatsAppButton message={OFFER.whatsapp} size="lg">
                    {OFFER.cta}
                  </WhatsAppButton>
                  <a href="#calculator" className="link-underline text-ink font-medium">
                    {OFFER.secondary}
                  </a>
                </Reveal>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
