import { useEffect } from 'react';
import { Heart, Trash2, X } from 'lucide-react';
import { CATALOG_PRODUCTS, formatVnd, type ProductItem } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface WishlistDrawerProps {
  isOpen: boolean;
  wishlistIds: string[];
  onClose: () => void;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: ProductItem) => void;
}

export function WishlistDrawer({
  isOpen,
  wishlistIds,
  onClose,
  onToggleWishlist,
  onAddToCart,
}: WishlistDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const savedProducts = CATALOG_PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wishlist-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-gradient-to-b from-[#160307] to-[#0c0103] border-l border-white/15 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#090103]/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-[#d4af37]/40 bg-[#1e040a] flex items-center justify-center text-[#d4af37]">
              <Heart className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="wishlist-drawer-title"
                className="font-serif text-base font-medium tracking-wide uppercase text-white"
              >
                Danh Sách Yêu Thích ({savedProducts.length})
              </h2>
              <div className="text-[9px] tracking-[0.2em] uppercase text-[#d4af37]">
                LƯU TRỮ TUYỆT TÁC VIP
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng danh sách yêu thích"
            className="p-2 rounded-full border border-white/15 text-[#e9e0e2] hover:text-[#d4af37] hover:border-[#d4af37]/50 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {savedProducts.length === 0 ? (
            <div className="rounded-sm border border-white/10 bg-[#120205]/60 backdrop-blur-sm p-8 text-center">
              <p className="font-serif text-lg text-white">
                Chưa có tác phẩm nào trong danh sách yêu thích.
              </p>
              <p className="mt-2 text-xs text-[#d0c5af]/80 font-light leading-relaxed">
                Nhấn biểu tượng trái tim trên bất kỳ sản phẩm nào để lưu lại cho mùa lễ hội 2026.
              </p>
            </div>
          ) : (
            savedProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-sm border border-white/10 bg-[#120205]/90 p-4 flex gap-4 transition-all hover:border-white/20"
              >
                <div className="w-20 h-20 shrink-0 rounded-sm border border-white/10 overflow-hidden bg-[#080102]">
                  <ResilientImage
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-[14.5px] font-medium text-white leading-snug">
                        {product.title}
                      </h3>
                      <div className="text-xs font-semibold tabular-nums text-[#d4af37] mt-1">
                        {formatVnd(product.price)}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onToggleWishlist(product.id)}
                      aria-label={`Bỏ thích ${product.title}`}
                      className="text-[#d0c5af]/70 hover:text-[#ffb3b1] p-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="mt-3 w-full gold-gradient-btn py-2.5 rounded-sm text-[10px] font-semibold tracking-[0.16em] uppercase cursor-pointer"
                  >
                    CHUYỂN VÀO GIỎ QUÀ
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
