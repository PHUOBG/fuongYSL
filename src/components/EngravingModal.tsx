import { useEffect, useState } from 'react';
import { Check, PenLine, Sparkles, X } from 'lucide-react';
import { CATALOG_PRODUCTS, formatVnd, type ProductItem } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface EngravingModalProps {
  isOpen: boolean;
  initialProduct: ProductItem | null;
  onClose: () => void;
  onConfirmAdd: (
    product: ProductItem,
    engravingText: string,
    engravingStyle: 'serif' | 'monogram',
    shadeName?: string
  ) => void;
}

const SHADE_SWATCHES = [
  { name: '#416 Psychedelic Chili — Đỏ Gạch Vinyl', hex: '#9e141b' },
  { name: '#44 Nude Lavallière — Hồng Đất Voan', hex: '#b66b6d' },
  { name: '#610 Nude Underwater — Cam Sữa Nude', hex: '#b56e5c' },
  { name: '#1966 Rouge Libre — Đỏ Rượu Đêm Noel', hex: '#780b18' },
];

const QUICK_SUGGESTIONS = [
  'MADAME HELENA',
  'CHLOÉ PARIS',
  'YSL MON AMOUR',
  'NOËL 2026 VIP',
];

export function EngravingModal({
  isOpen,
  initialProduct,
  onClose,
  onConfirmAdd,
}: EngravingModalProps) {
  const engravableProducts = CATALOG_PRODUCTS.filter((p) => p.engravable);
  const [selectedId, setSelectedId] = useState(
    initialProduct?.id ?? engravableProducts[0].id
  );
  const [engravingText, setEngravingText] = useState(
    initialProduct?.defaultEngravingSample ?? 'MADAME HELENA'
  );
  const [style, setStyle] = useState<'serif' | 'monogram'>('serif');
  const [selectedShade, setSelectedShade] = useState(SHADE_SWATCHES[0].name);

  useEffect(() => {
    if (isOpen && initialProduct) {
      setSelectedId(initialProduct.id);
      setEngravingText(initialProduct.defaultEngravingSample);
    }
  }, [isOpen, initialProduct]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const product =
    engravableProducts.find((p) => p.id === selectedId) ?? engravableProducts[0];

  const handleProductChange = (id: string) => {
    setSelectedId(id);
    const next = engravableProducts.find((p) => p.id === id);
    if (next) setEngravingText(next.defaultEngravingSample);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="engraving-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-3xl rounded-sm border border-white/20 bg-gradient-to-b from-[#180307] to-[#0d0205] shadow-[0_24px_80px_rgba(0,0,0,0.85)] max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4.5 bg-[#090103]/90 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-[#d4af37]/40 bg-[#1e040a] flex items-center justify-center text-[#d4af37]">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="engraving-modal-title"
                className="font-serif text-base sm:text-lg font-medium tracking-wide text-white"
              >
                Atelier Khắc Laser Bạc 24K &amp; Thử Màu
              </h2>
              <div className="text-[9px] tracking-[0.2em] uppercase text-[#d4af37]">
                DỊCH VỤ CÁ NHÂN HÓA ĐỘC BẢN PARIS
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ khắc laser"
            className="p-2 rounded-full border border-white/15 text-[#e9e0e2] hover:text-[#d4af37] hover:border-[#d4af37]/50 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Live Silver Laser Preview Showcase */}
          <div className="md:col-span-5">
            <div className="relative rounded-sm border border-white/15 bg-[#070102] aspect-square overflow-hidden shadow-2xl group">
              <ResilientImage
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"
                aria-hidden="true"
              />

              {/* Simulated Laser Silver Plate */}
              <div className="absolute inset-x-4 bottom-4 rounded-sm border border-white/25 bg-[#0a0204]/90 backdrop-blur-md px-4 py-3.5 text-center shadow-lg">
                <div className="text-[8.5px] font-medium tracking-[0.24em] uppercase text-[#d4af37] mb-1">
                  MÔ PHỎNG KHẮC LASER BẠC ĐỘC BẢN
                </div>
                <div
                  data-testid="engraving-live-preview"
                  className={`text-base sm:text-lg tracking-[0.2em] silver-laser-text drop-shadow-[0_0_12px_rgba(255,255,255,0.7)] truncate ${
                    style === 'serif' ? 'font-serif italic font-semibold' : 'font-sans font-bold uppercase'
                  }`}
                >
                  {engravingText.trim() || 'YSL NOËL 2026'}
                </div>
              </div>
            </div>

            <div className="mt-3.5 px-1 flex items-center justify-between text-xs">
              <span className="text-[#d0c5af]/80 font-light">Chi phí đặc quyền khắc:</span>
              <span className="text-[#d4af37] font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> MIỄN PHÍ VIP
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="md:col-span-7 space-y-5">
            {/* Product Selector */}
            <div>
              <label
                htmlFor="engraving-product-select"
                className="block text-[10px] font-medium tracking-[0.2em] uppercase text-[#d4af37] mb-1.5"
              >
                CHỌN TUYỆT TÁC KHẮC TÊN
              </label>
              <select
                id="engraving-product-select"
                value={product.id}
                onChange={(e) => handleProductChange(e.target.value)}
                className="w-full rounded-sm bg-[#0e0104] border border-white/15 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 focus:outline-none px-4 py-3 text-xs text-white cursor-pointer shadow-inner"
              >
                {engravableProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} — {formatVnd(p.price)}
                  </option>
                ))}
              </select>
            </div>

            {/* Lipstick Shade Swatches if Applicable */}
            {product.category === 'lipstick' && (
              <div>
                <div className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#d4af37] mb-2">
                  THỬ SẮC SON VINYL / COUTURE
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {SHADE_SWATCHES.map((swatch) => {
                    const active = selectedShade === swatch.name;
                    return (
                      <button
                        key={swatch.name}
                        type="button"
                        onClick={() => setSelectedShade(swatch.name)}
                        className={`flex items-center gap-2.5 rounded-sm border px-3 py-2 text-left text-[11.5px] transition-all cursor-pointer ${
                          active
                            ? 'border-[#d4af37] bg-[#28040b] text-white shadow-[0_0_10px_rgba(212,175,55,0.2)]'
                            : 'border-white/12 bg-[#0e0104] text-[#d0c5af]/80 hover:border-white/30'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full shrink-0 border border-white/40 shadow-sm"
                          style={{ backgroundColor: swatch.hex }}
                          aria-hidden="true"
                        />
                        <span className="truncate">{swatch.name.split('—')[0].trim()}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input Text & Quick Suggestions */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="engraving-text-input"
                  className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#d4af37]"
                >
                  NỘI DUNG KHẮC LASER BẠC
                </label>
                <span className="text-[10.5px] font-medium tabular-nums text-[#d0c5af]/70">
                  {engravingText.length}/18 ký tự
                </span>
              </div>
              <input
                id="engraving-text-input"
                type="text"
                maxLength={18}
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value)}
                placeholder="Nhập tên hoặc ngày kỷ niệm..."
                className="w-full rounded-sm bg-[#0e0104] border border-white/15 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 focus:outline-none px-4 py-3 text-xs text-white placeholder:text-[#d0c5af]/40 shadow-inner"
              />

              {/* Suggestions */}
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-[#d0c5af]/60 mr-1">Gợi ý nhanh:</span>
                {QUICK_SUGGESTIONS.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => setEngravingText(sug)}
                    className="text-[9.5px] px-2.5 py-1 rounded-full border border-white/12 bg-white/5 hover:border-[#d4af37]/60 hover:text-[#d4af37] text-[#e9e0e2] transition-colors cursor-pointer"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography Styles */}
            <div>
              <div className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#d4af37] mb-2">
                PHONG CÁCH CHỮ KHẮC PARIS
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setStyle('serif')}
                  className={`py-3 px-4 rounded-sm border text-[12px] font-serif italic transition-all cursor-pointer ${
                    style === 'serif'
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#b58d1f] text-[#090103] border-transparent font-bold shadow-[0_2px_12px_rgba(212,175,55,0.3)]'
                      : 'bg-[#0e0104] text-[#e9e0e2] border-white/15 hover:border-white/30'
                  }`}
                >
                  Parisian Serif Nghiêng
                </button>
                <button
                  type="button"
                  onClick={() => setStyle('monogram')}
                  className={`py-3 px-4 rounded-sm border text-[11px] font-sans uppercase tracking-[0.18em] transition-all cursor-pointer ${
                    style === 'monogram'
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#b58d1f] text-[#090103] border-transparent font-bold shadow-[0_2px_12px_rgba(212,175,55,0.3)]'
                      : 'bg-[#0e0104] text-[#e9e0e2] border-white/15 hover:border-white/30'
                  }`}
                >
                  MONOGRAM ĐỨNG
                </button>
              </div>
            </div>

            {/* Confirm CTA */}
            <div className="pt-3">
              <button
                type="button"
                onClick={() => {
                  onConfirmAdd(
                    product,
                    engravingText.trim() || 'YSL NOËL 2026',
                    style,
                    product.category === 'lipstick' ? selectedShade : undefined
                  );
                  onClose();
                }}
                className="w-full gold-gradient-btn py-4 px-6 rounded-sm flex items-center justify-center gap-2.5 text-[11px] font-semibold tracking-[0.18em] uppercase cursor-pointer"
              >
                <PenLine className="w-3.5 h-3.5" aria-hidden="true" />
                <span>THÊM BẢN KHẮC VÀO GIỎ ({formatVnd(product.price)})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
