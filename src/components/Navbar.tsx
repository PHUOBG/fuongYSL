import { useState } from 'react';
import { Heart, Search, ShoppingBag, Sparkles, Menu, X, ArrowRight, PenLine } from 'lucide-react';

interface NavbarProps {
  wishlistCount: number;
  cartCount: number;
  onOpenEngraving: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onFocusSearch: () => void;
  onOpenWonderIntro?: () => void;
}

export function Navbar({
  wishlistCount,
  cartCount,
  onOpenEngraving,
  onOpenCart,
  onOpenWishlist,
  onFocusSearch,
  onOpenWonderIntro,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#090103]/95 border-b border-white/10 transition-colors shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      {/* MAIN NAVBAR - 1 DÒNG DUY NHẤT, RÕ RÀNG, TINH TẾ */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo (Trái) */}
        <a
          href="#top"
          className="group flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
        >
          <div className="w-8 h-8 rounded-full border border-[#d4af37]/50 bg-[#160307] flex items-center justify-center text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:border-[#d4af37] transition-all">
            <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <div className="font-serif text-[15px] sm:text-[16px] xl:text-[17px] font-bold tracking-[0.16em] text-white whitespace-nowrap group-hover:text-[#faeed1] transition-colors">
              FuongYSLComestic
            </div>
            <div className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.24em] text-[#d4af37] uppercase whitespace-nowrap">
              HAUTE COUTURE BEAUTÉ · PARIS
            </div>
          </div>
        </a>

        {/* Center Navigation Links - Tinh gọn, không chồng lấn */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden xl:flex items-center gap-5 2xl:gap-7 text-[12px] 2xl:text-[13px] font-medium tracking-[0.08em] text-[#e9e0e2] uppercase whitespace-nowrap"
        >
          {onOpenWonderIntro && (
            <button
              type="button"
              onClick={onOpenWonderIntro}
              className="hover:text-[#d4af37] text-[#d4af37] transition-colors py-1 relative flex items-center gap-1.5 cursor-pointer after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#d4af37]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
              <span>3D WONDERLAND</span>
            </button>
          )}

          <a
            href="#top"
            className="hover:text-[#d4af37] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#d4af37] after:transition-all"
          >
            3D SHOWCASE
          </a>

          <a
            href="#catalog"
            className="hover:text-[#d4af37] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#d4af37] after:transition-all"
          >
            BỘ SƯU TẬP
          </a>

          <a
            href="#spotlight"
            className="hover:text-[#d4af37] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#d4af37] after:transition-all"
          >
            THE INKS VINYL
          </a>

          <a
            href="#coffrets"
            className="hover:text-[#d4af37] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#d4af37] after:transition-all"
          >
            HỘP QUÀ NOËL
          </a>

          <button
            type="button"
            onClick={onOpenEngraving}
            className="hover:text-[#d4af37] transition-colors py-1 uppercase cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-[#d4af37] after:transition-all flex items-center gap-1"
          >
            <PenLine className="w-3 h-3 text-[#d4af37]" />
            <span>KHẮC LASER</span>
          </button>
        </nav>

        {/* Right Actions (Phải) */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          {/* Wishlist Button */}
          <button
            type="button"
            onClick={onOpenWishlist}
            aria-label={`Danh sách yêu thích (${wishlistCount})`}
            className="relative p-2 rounded-full text-[#e9e0e2] hover:text-[#d4af37] hover:bg-white/5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
          >
            <Heart className="w-4 h-4" aria-hidden="true" />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-[16px] h-[16px] px-1 rounded-full bg-[#850b20] text-white text-[9.5px] font-bold flex items-center justify-center tabular-nums shadow-[0_0_8px_rgba(133,11,32,0.6)]">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Search Button */}
          <button
            type="button"
            onClick={onFocusSearch}
            aria-label="Tìm kiếm tuyệt tác Noel"
            className="hidden sm:inline-flex p-2 rounded-full text-[#e9e0e2] hover:text-[#d4af37] hover:bg-white/5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
          >
            <Search className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Concierge VIP CTA Button */}
          <a
            href="#rsvp"
            className="gold-gradient-btn px-4 sm:px-5 py-2.5 rounded-sm text-[11px] sm:text-[11.5px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>CONCIERGE VIP</span>
          </a>

          {/* Cart Drawer Trigger */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Giỏ quà Noël (${cartCount})`}
            className="relative p-2.5 rounded-sm border border-white/20 bg-[#140307]/90 text-white hover:border-[#d4af37]/60 hover:text-[#d4af37] transition-all cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span
              data-testid="header-cart-count"
              className="absolute -top-1.5 -right-1.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[#d4af37] text-[#090103] text-[9.5px] font-bold flex items-center justify-center tabular-nums shadow-[0_0_10px_rgba(212,175,55,0.5)]"
            >
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Hamburger Toggle (< 1280px) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Mở menu điều hướng"
            className="xl:hidden p-2 rounded-sm border border-white/15 bg-white/5 text-white hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. MOBILE SLIDE-OVER DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-white/10 bg-[#0c0104]/98 backdrop-blur-2xl px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-medium tracking-wider uppercase text-[#e9e0e2]">
            {onOpenWonderIntro && (
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenWonderIntro();
                }}
                className="text-left py-2 text-[#d4af37] flex items-center justify-between border-b border-white/5 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  3D WONDERLAND SCROLL
                </span>
                <ArrowRight className="w-4 h-4 text-[#d4af37]" />
              </button>
            )}

            <a
              href="#top"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 hover:text-[#d4af37] border-b border-white/5 transition-colors flex items-center justify-between"
            >
              <span>3D SHOWCASE 360°</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/40" />
            </a>

            <a
              href="#catalog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 hover:text-[#d4af37] border-b border-white/5 transition-colors flex items-center justify-between"
            >
              <span>BỘ SƯU TẬP NOËL 2026</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/40" />
            </a>

            <a
              href="#spotlight"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 hover:text-[#d4af37] border-b border-white/5 transition-colors flex items-center justify-between"
            >
              <span>SON THE INKS VINYL CREAM</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/40" />
            </a>

            <a
              href="#coffrets"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 hover:text-[#d4af37] border-b border-white/5 transition-colors flex items-center justify-between"
            >
              <span>HỘP QUÀ NOËL CAO CẤP</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/40" />
            </a>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenEngraving();
              }}
              className="py-2 hover:text-[#d4af37] border-b border-white/5 transition-colors flex items-center justify-between text-left cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <PenLine className="w-4 h-4 text-[#d4af37]" />
                KHẮC TÊN LASER BẠC MIỄN PHÍ
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-white/40" />
            </button>

            <a
              href="#rsvp"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 text-[#d4af37] font-semibold flex items-center justify-between"
            >
              <span>ĐẶT LỊCH VIP CONCIERGE</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37]" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
