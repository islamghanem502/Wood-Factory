import { useEffect, useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { waLink, telLink } from "../config/contact";

export default function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 250);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-2 bg-[#0d0f13]/95 backdrop-blur-xl p-2 rounded-2xl border border-[#cba157]/30 shadow-2xl">
          <a
            href={telLink}
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#1e232c] hover:bg-[#282f3c] text-[#f7dfa5] border border-[#cba157]/30 transition-all active:scale-95 shadow-md"
            title="اتصال هاتفي مباشر"
            aria-label="اتصال هاتفي مباشر"
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#cba157]" />
          </a>
          <a
            href={waLink("مرحباً مؤسسة خشبي WOODEN، أرغب في الاستفسار عن تفصيل كوخ خشبي فاخر.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all active:scale-95 shadow-lg shadow-emerald-950/60"
            title="محادثة واتساب مباشرة"
            aria-label="محادثة واتساب مباشرة"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
