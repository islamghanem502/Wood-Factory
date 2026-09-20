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
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="relative rounded-3xl bg-stone border border-line overflow-hidden">
            <div className="grid lg:grid-cols-12 items-center gap-8 lg:gap-6 p-6 sm:p-8 lg:p-10">
              {/* الصورة — على اليمين */}
              <Reveal variant="clip" delay={80} className="lg:col-span-6 order-first">
                <div className="relative">
                  <img
                    src={OFFER.image}
                    alt="كوخ خشبي A-Frame مربوط بشريط أحمر — عرض اليوم الوطني"
                    className="w-full h-auto max-h-[440px] object-contain drop-shadow-[0_30px_40px_rgba(20,16,13,0.25)]"
                    width="1390"
                    height="1018"
                    loading="lazy"
                  />
                </div>
              </Reveal>

              {/* النص — على اليسار */}
              <div className="lg:col-span-6 text-right lg:ps-6">
                <Reveal as="h2" delay={120} className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.2] text-ink">
                  {OFFER.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </Reveal>

                <Reveal delay={200} className="mt-6 flex items-end gap-4">
                  <span className="wood-text-dark font-display font-bold text-7xl sm:text-8xl leading-none num">{fmt(OFFER.price)}</span>
                  <span className="mb-2">
                    <span className="block text-sm text-walnut">{OFFER.unit}</span>
                    <span className="block text-lg text-ink/45 num line-through decoration-2 decoration-ink/40">{fmt(OFFER.listPrice)}</span>
                  </span>
                </Reveal>

                <Reveal as="p" delay={260} className="mt-5 text-base sm:text-lg text-ink/70 leading-relaxed max-w-md">
                  {OFFER.text}
                </Reveal>
                <Reveal as="p" delay={300} className="mt-2 text-sm text-ink/50">
                  {OFFER.note}
                </Reveal>

                <Reveal delay={340} className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
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
