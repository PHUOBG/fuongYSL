import { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { FAQ_ITEMS } from '../data/catalog';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-14 lg:py-20 border-t border-white/10">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center max-w-xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-[10px] font-semibold tracking-[0.24em] uppercase text-[#d4af37]">
          <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
          <span>TRỢ GIÚP DÀNH RIÊNG THƯỢNG KHÁCH</span>
        </div>
        <h2 className="mt-2.5 font-serif text-3xl sm:text-4xl font-normal tracking-wide text-white">
          Câu Hỏi Thường Gặp
        </h2>
        <p className="mt-3 text-xs sm:text-[13.5px] text-[#e9e0e2]/75 font-light">
          Thông tin chi tiết về dịch vụ khắc laser bạc, thời gian dạ tiệc Noël và giao nhận VIP.
        </p>
      </div>

      <div className="mt-10 space-y-3.5">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openId === item.id;
          const numStr = String(index + 1).padStart(2, '0');
          return (
            <div
              key={item.id}
              className={`rounded-sm border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'border-[#d4af37]/50 bg-gradient-to-r from-[#180307] to-[#100205] shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                  : 'border-white/10 bg-[#120205]/70 hover:border-white/25'
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="font-serif text-sm font-semibold tabular-nums text-[#d4af37] shrink-0">
                    {numStr}
                  </span>
                  <span className="font-serif text-base sm:text-lg font-medium text-white">
                    {item.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#d4af37] shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-[13px] leading-relaxed text-[#e9e0e2]/80 border-t border-white/8 font-light">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </section>
  );
}
