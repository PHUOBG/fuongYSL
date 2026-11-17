import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import {
  calculateCartSubtotal,
  formatVnd,
  type CartItem,
} from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [confirmedOrderCode, setConfirmedOrderCode] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = calculateCartSubtotal(items);

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    if (!checkoutName.trim() || checkoutPhone.replace(/\D/g, '').length < 9) {
      setCheckoutError('Vui lòng nhập đầy đủ họ tên và số điện thoại nhận hàng VIP.');
      return;
    }
    setCheckoutError('');
    setConfirmedOrderCode('YSL-NOEL-9024');
    onClearCart();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-gradient-to-b from-[#160307] to-[#0c0103] border-l border-white/15 h-full flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#090103]/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full border border-[#d4af37]/40 bg-[#1e040a] flex items-center justify-center text-[#d4af37]">
              <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="cart-drawer-title"
                className="font-serif text-base font-medium tracking-wide uppercase text-white"
              >
                Giỏ Quà Noël Haute Couture
              </h2>
              <div className="text-[9px] tracking-[0.2em] uppercase text-[#d4af37]">
                ĐẶC QUYỀN HỘP QUÀ &amp; KHẮC LASER
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setConfirmedOrderCode(null);
              onClose();
            }}
            aria-label="Đóng giỏ quà"
            className="p-2 rounded-full border border-white/15 text-[#e9e0e2] hover:text-[#d4af37] hover:border-[#d4af37]/50 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {confirmedOrderCode ? (
            <div className="rounded-sm border border-[#d4af37]/50 bg-gradient-to-b from-[#1a0308] to-[#0e0103] p-7 text-center shadow-xl">
              <div className="w-12 h-12 rounded-full border border-[#d4af37]/50 bg-[#28050e] flex items-center justify-center mx-auto mb-4 text-[#d4af37] shadow-[0_0_16px_rgba(212,175,55,0.3)]">
                <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="text-[9.5px] font-semibold tracking-[0.24em] uppercase text-[#d4af37]">
                ĐƠN HÀNG VIP ĐÃ TIẾP NHẬN
              </div>
              <h3 className="mt-2 font-serif text-xl font-medium text-white">
                Cảm ơn quý khách {checkoutName}
              </h3>
              <p className="mt-3 text-xs text-[#e9e0e2]/80 leading-relaxed font-light">
                Mã đơn quà tặng: <strong className="text-white font-semibold tabular-nums">{confirmedOrderCode}</strong>. Nghệ nhân khắc laser và dịch vụ giao hỏa tốc 2 giờ sẽ liên hệ qua số {checkoutPhone}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setConfirmedOrderCode(null);
                  onClose();
                }}
                className="mt-6 w-full gold-gradient-btn py-3.5 rounded-sm text-[10.5px] font-semibold tracking-[0.18em] uppercase cursor-pointer"
              >
                TIẾP TỤC KHÁM PHÁ BST
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-sm border border-white/10 bg-[#120205]/60 backdrop-blur-sm p-8 text-center">
              <p className="font-serif text-lg text-white">
                Giỏ quà Noël của quý khách đang trống.
              </p>
              <p className="mt-2 text-xs text-[#d0c5af]/80 font-light leading-relaxed">
                Hãy chọn những kiệt tác son môi The Inks Vinyl hoặc hộp quà Libre đinh tán bạc để nhận dịch vụ khắc tên miễn phí.
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-sm border border-[#d4af37]/35 bg-[#1a0308]/80 px-4 py-2.5 text-[9.5px] font-medium tracking-[0.16em] uppercase text-[#d4af37] flex items-center gap-2">
                <span>✦</span>
                <span>TẶNG KÈM HỘP QUÀ TRẮNG ĐINH TÁN BẠC &amp; KHẮC LASER MIỄN PHÍ</span>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-sm border border-white/10 bg-[#120205]/90 p-4 flex gap-4 transition-all hover:border-white/20"
                >
                  <div className="w-20 h-20 shrink-0 rounded-sm border border-white/10 overflow-hidden bg-[#080102]">
                    <ResilientImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-[14.5px] font-medium text-white leading-snug">
                        {item.title}
                      </h3>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Xóa ${item.title} khỏi giỏ`}
                        className="text-[#d0c5af]/70 hover:text-[#ffb3b1] p-1 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>

                    {item.shadeName && (
                      <div className="text-[11px] text-[#d4af37]/90 mt-1 truncate">
                        Màu: {item.shadeName}
                      </div>
                    )}
                    {item.engravingText && (
                      <div className="mt-1 text-[9.5px] uppercase tracking-[0.14em] text-white/90 bg-white/5 border border-white/10 rounded px-2 py-0.5 inline-block">
                        Khắc Bạc: &ldquo;{item.engravingText}&rdquo;
                      </div>
                    )}

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="flex items-center rounded-sm border border-white/15 bg-[#080102]">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, -1)}
                          aria-label={`Giảm số lượng ${item.title}`}
                          className="px-2.5 py-1 text-white hover:text-[#d4af37] cursor-pointer transition-colors"
                        >
                          <Minus className="w-3 h-3" aria-hidden="true" />
                        </button>
                        <span className="px-2 text-xs font-semibold tabular-nums text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, 1)}
                          aria-label={`Tăng số lượng ${item.title}`}
                          className="px-2.5 py-1 text-white hover:text-[#d4af37] cursor-pointer transition-colors"
                        >
                          <Plus className="w-3 h-3" aria-hidden="true" />
                        </button>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold tabular-nums text-white">
                        {formatVnd(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer Checkout */}
        {items.length > 0 && !confirmedOrderCode && (
          <form
            onSubmit={handleCheckout}
            noValidate
            className="border-t border-white/10 bg-[#080102] p-6 space-y-4"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="uppercase tracking-[0.18em] text-[#d4af37] font-medium text-[10px]">
                TẠM TÍNH ĐƠN QUÀ VIP
              </span>
              <span className="text-base sm:text-lg font-semibold tabular-nums text-white">
                {formatVnd(subtotal)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <input
                type="text"
                value={checkoutName}
                onChange={(e) => {
                  setCheckoutName(e.target.value);
                  if (checkoutError) setCheckoutError('');
                }}
                placeholder="Tên người nhận *"
                aria-label="Tên người nhận"
                className="rounded-sm bg-[#120205] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder:text-[#d0c5af]/40 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 focus:outline-none"
              />
              <input
                type="tel"
                value={checkoutPhone}
                onChange={(e) => {
                  setCheckoutPhone(e.target.value);
                  if (checkoutError) setCheckoutError('');
                }}
                placeholder="SĐT hỏa tốc *"
                aria-label="Số điện thoại giao hỏa tốc"
                className="rounded-sm bg-[#120205] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder:text-[#d0c5af]/40 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 focus:outline-none tabular-nums"
              />
            </div>
            {checkoutError && (
              <p className="text-[11px] text-[#ff8080]">{checkoutError}</p>
            )}

            <button
              type="submit"
              className="w-full gold-gradient-btn py-4 rounded-sm text-[11px] font-semibold tracking-[0.18em] uppercase cursor-pointer"
            >
              HOÀN TẤT ĐẶT QUÀ HỎA TỐC 2H
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
