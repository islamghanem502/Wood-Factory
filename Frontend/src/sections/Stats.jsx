const STATS = [
  { value: "+180", label: "مشروع كوخ وشاليه منفذ بالمملكة" },
  { value: "15 سنة", label: "ضمان معتمد على الهياكل الخشبية" },
  { value: "95%", label: "كفاءة عزل حراري ومقاومة مناخية" },
  { value: "48 ساعة", label: "متوسط زمن تركيب الأكواخ الجاهزة" },
];

export default function Stats() {
  return (
    <section className="bg-[#0f1217] border-y border-[#cba157]/20 py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.value} className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-[#f7dfa5] tracking-tight block">{s.value}</span>
              <span className="text-xs sm:text-sm text-neutral-400">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
