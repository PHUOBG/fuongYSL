import { Sparkles } from 'lucide-react';
import { EXCLUSIVE_COFFRETS, formatVnd, type CoffretItem } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface CoffretsSectionProps {
  onReserveCoffret: (coffret: CoffretItem) => void;
}

export function CoffretsSection({ onReserveCoffret }: CoffretsSectionProps) {
  return (
    <section
      id="coffrets"
      className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-14 lg:py-20 border-t border-white/10"
    >
      <div className="text-center max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-[10px] font-semibold tracking-[0.26em] uppercase text-[#d4af37]">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>EXCLUSIVE NOËL COFFRETS</span>
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
        </div>
        <h2 className="mt-2.5 font-serif text-3xl sm:text-4xl font-normal tracking-wide text-white">
          Hộp Quà Noël Gala 2026
        </h2>
        <p className="mt-3 text-xs sm:text-[14px] leading-relaxed text-[#e9e0e2]/75 font-light">
          Thiết kế hộp quà trắng Noël dập nổi đinh tán mạ bạc kết hợp sắc đỏ Haute Couture.
          <br className="hidden sm:inline" /> Biểu tượng tối thượng của nghệ thuật trao tặng xa hoa mùa lễ hội Paris.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-7">
        {EXCLUSIVE_COFFRETS.map((coffret) => (
          <article
            key={coffret.id}
            className="group rounded-sm border border-white/10 bg-gradient-to-b from-[#140206]/85 to-[#0b0103]/95 backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/45 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] overflow-hidden"
          >
            <div>
              {/* Visual Showcase + Mini Strip */}
              <div className="relative bg-[#080102] border-b border-white/8">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ResilientImage
                    src={coffret.image}
                    alt={coffret.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0e0205] via-transparent to-black/30"
                    aria-hidden="true"
                  />
                  <div className="absolute top-3.5 left-3.5 backdrop-blur-md bg-[#090103]/85 border border-[#d4af37]/35 rounded-full px-3 py-0.5 text-[9px] font-semibold tracking-[0.2em] uppercase text-[#d4af37]">
                    {coffret.badge}
                  </div>
                </div>

                {/* Mini Thumbnail Strip */}
                <div className="grid grid-cols-3 gap-px bg-white/10 border-t border-white/8">
                  {coffret.thumbnails.map((thumb, idx) => (
                    <div key={`${coffret.id}-thumb-${idx}`} className="aspect-[16/9] overflow-hidden bg-[#0c0103]">
                      <ResilientImage
                        src={thumb}
                        alt={`${coffret.title} chi tiết ${idx + 1}`}
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="text-[9.5px] font-medium tracking-[0.22em] uppercase text-[#d4af37]">
                  {coffret.eyebrow}
                </div>
                <h3 className="mt-2 font-serif text-lg sm:text-xl font-medium text-white group-hover:text-[#faeed1] transition-colors">
                  {coffret.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-[12.5px] leading-relaxed text-[#e9e0e2]/70 font-light">
                  {coffret.description}
                </p>
              </div>
            </div>

            <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-white/8 flex items-center justify-between gap-4">
              <div>
                <div className="text-base font-semibold tabular-nums text-white">
                  {formatVnd(coffret.price)}
                </div>
                {coffret.originalPrice ? (
                  <div className="text-[11px] tabular-nums text-[#d0c5af]/50 line-through mt-0.5">
                    {formatVnd(coffret.originalPrice)}
                  </div>
                ) : coffret.subPriceLabel ? (
                  <div className="text-[10px] text-[#d4af37]/80 mt-0.5">
                    {coffret.subPriceLabel}
                  </div>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() => onReserveCoffret(coffret)}
                className="gold-gradient-btn px-5 py-3 rounded-sm text-[10px] font-semibold tracking-[0.18em] uppercase whitespace-nowrap shrink-0 cursor-pointer"
              >
                {coffret.ctaLabel}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
