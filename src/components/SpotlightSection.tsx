import { Heart, PenLine, Sparkles } from 'lucide-react';
import { CATALOG_PRODUCTS, SPOTLIGHT_PRODUCT_IMAGE, formatVnd, type ProductItem } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface SpotlightSectionProps {
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: ProductItem) => void;
  onOpenEngraving: (product: ProductItem) => void;
}

export function SpotlightSection({
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenEngraving,
}: SpotlightSectionProps) {
  const spotlightProduct = CATALOG_PRODUCTS[0];

  return (
    <section id="spotlight" className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12 lg:py-16">
      <div className="relative rounded-sm border border-white/15 bg-gradient-to-b from-[#180307]/90 to-[#0e0205]/95 backdrop-blur-xl p-6 sm:p-10 lg:p-12 shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
        {/* Decorative corner motifs */}
        <span className="absolute top-4 left-4 text-[12px] text-[#d4af37]/40 select-none" aria-hidden="true">
          ✦
        </span>
        <span className="absolute bottom-4 right-4 text-[12px] text-[#d4af37]/40 select-none" aria-hidden="true">
          ✦
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Visual Column - YSL Muse Photo */}
          <div className="lg:col-span-5">
            <div className="rounded-sm border border-white/15 bg-[#0b0103] relative overflow-hidden group shadow-2xl">
              <div className="relative aspect-[3/4] overflow-hidden">
                <ResilientImage
                  src={SPOTLIGHT_PRODUCT_IMAGE}
                  alt="YSL Beauté Muse & Son Kem Bóng The Inks Vinyl Cream #416"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-3.5 left-3.5 backdrop-blur-md bg-[#0a0103]/85 border border-[#d4af37]/35 rounded-full px-3.5 py-1 text-[9.5px] font-semibold tracking-[0.2em] uppercase text-[#d4af37] shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                  <span>YSL BEAUTÉ MUSE · SHADE #416</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenEngraving(spotlightProduct)}
                className="w-full bg-[#160307] hover:bg-[#28050e] text-white border-t border-white/10 transition-colors py-4 px-4 flex items-center justify-center gap-2 text-[10.5px] font-semibold tracking-[0.18em] uppercase cursor-pointer group/btn"
              >
                <PenLine className="w-3.5 h-3.5 text-[#d4af37] transition-transform group-hover/btn:scale-110" aria-hidden="true" />
                <span className="group-hover/btn:text-[#d4af37] transition-colors">MÔ PHỎNG KHẮC TÊN LASER BẠC</span>
              </button>
            </div>
          </div>

          {/* Right Editorial Info Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#850b20]/80 bg-[#38040d]/60 px-3.5 py-1 text-[9.5px] font-semibold tracking-[0.22em] uppercase text-[#ffc1c0]">
              <Sparkles className="w-3 h-3 text-[#d4af37]" aria-hidden="true" />
              <span>TÂM ĐIỂM BỘ SƯU TẬP NOËL 2026</span>
            </div>

            <h2 className="mt-4 font-serif text-2xl sm:text-4xl font-normal tracking-wide text-white">
              Son Kem Bóng The Inks Vinyl Cream
            </h2>
            <p className="mt-2 font-serif italic text-base sm:text-lg text-[#d4af37]/90 font-light">
              Sắc Đỏ Gạch Rất Lạnh, Độ Bóng Thuần Khiết Gợi Cảm
            </p>

            <p className="mt-4 text-[13.5px] leading-[1.8] text-[#e9e0e2]/80 font-light">
              Đột phá với cấu trúc dưỡng ẩm sau 10 giờ cùng hiệu ứng gương vinyl mọng nước đêm tiệc Giáng Sinh. Đầu cọ hình trái tim được thiết kế công thái học giúp viền môi sắc sảo đến từng micromet. Vỏ son sơn mài đen piano huyền bí đính logo Cassandre kinh điển.
            </p>

            {/* 3 Spec Boxes */}
            <div className="mt-7 grid grid-cols-3 gap-3">
              <div className="rounded-sm border border-white/10 bg-[#0c0103]/60 backdrop-blur-sm p-4 text-center">
                <div className="font-serif text-base sm:text-lg font-semibold text-[#d4af37]">10H</div>
                <div className="mt-1 text-[8.5px] sm:text-[9.5px] font-medium tracking-[0.14em] uppercase text-[#e9e0e2]/80">
                  BỀN MÀU CĂNG MỌNG
                </div>
              </div>
              <div className="rounded-sm border border-white/10 bg-[#0c0103]/60 backdrop-blur-sm p-4 text-center">
                <div className="font-serif text-base sm:text-lg font-semibold text-[#d4af37]">VINYL</div>
                <div className="mt-1 text-[8.5px] sm:text-[9.5px] font-medium tracking-[0.14em] uppercase text-[#e9e0e2]/80">
                  GƯƠNG THỜI THƯỢNG
                </div>
              </div>
              <div className="rounded-sm border border-white/10 bg-[#0c0103]/60 backdrop-blur-sm p-4 text-center">
                <div className="font-serif text-base sm:text-lg font-semibold text-[#d4af37]">VIP BẠC</div>
                <div className="mt-1 text-[8.5px] sm:text-[9.5px] font-medium tracking-[0.14em] uppercase text-[#e9e0e2]/80">
                  KHẮC TÊN ĐỘC BẢN
                </div>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <div className="rounded-sm border border-[#d4af37]/35 bg-[#090103] px-5 py-3.5 text-base sm:text-lg font-bold tabular-nums text-white shadow-inner">
                {formatVnd(spotlightProduct.price)}
              </div>

              <button
                type="button"
                onClick={() => onAddToCart(spotlightProduct)}
                className="gold-gradient-btn flex-1 min-w-[200px] py-4 px-6 rounded-sm text-[11px] font-semibold tracking-[0.18em] uppercase cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                THÊM VÀO GIỎ QUÀ NOËL
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(spotlightProduct.id)}
                aria-label={
                  isWishlisted
                    ? 'Bỏ yêu thích Son Kem Bóng The Inks Vinyl Cream'
                    : 'Yêu thích Son Kem Bóng The Inks Vinyl Cream'
                }
                aria-pressed={isWishlisted}
                className={`rounded-sm border p-4 transition-all cursor-pointer ${
                  isWishlisted
                    ? 'border-[#d4af37] bg-[#38040d] text-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                    : 'border-white/20 bg-[#0c0103] text-white hover:border-[#d4af37]/60'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
