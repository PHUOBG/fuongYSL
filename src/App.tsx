/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useRef, useState } from 'react';
import { Check, Sparkles, X } from 'lucide-react';
import {
  CATALOG_PRODUCTS,
  calculateCartCount,
  filterAndSortProducts,
  type CartItem,
  type CoffretItem,
  type FilterTab,
  type ProductItem,
  type SortOption,
} from './data/catalog';
import { Navbar } from './components/Navbar';
import { StardustCanvas } from './components/StardustCanvas';
import { ChristmasWonderIntro } from './components/ChristmasWonderIntro';
import { HeroSection } from './components/HeroSection';
import { SpotlightSection } from './components/SpotlightSection';
import { CatalogSection } from './components/CatalogSection';
import { CoffretsSection } from './components/CoffretsSection';
import { FaqSection } from './components/FaqSection';
import { RsvpSection } from './components/RsvpSection';
import { Footer } from './components/Footer';
import { EngravingModal } from './components/EngravingModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';

const POLICY_COPY: Record<'privacy' | 'terms' | 'authentic', { title: string; body: string }> = {
  privacy: {
    title: 'CHÍNH SÁCH BẢO MẬT THÔNG TIN VIP',
    body: 'Mọi thông tin đăng ký thiệp mời Dạ Tiệc Gala Noël 2026 và nội dung khắc Laser Bạc cá nhân hóa được mã hóa và lưu trữ theo tiêu chuẩn bảo mật L’Oréal Luxe Vietnam, chỉ sử dụng cho mục đích xác nhận lịch hẹn và giao nhận quà tặng.',
  },
  terms: {
    title: 'ĐIỀU KHOẢN ĐỘC QUYỀN HOLIDAY 2026',
    body: 'Các phiên bản hộp quà trắng dập đinh tán mạ bạc và son The Inks Vinyl Cream Holiday Edition được phân phối với số lượng giới hạn tại Việt Nam. Đặc quyền khắc tên miễn phí áp dụng tối đa 18 ký tự cho mỗi tác phẩm chính hãng.',
  },
  authentic: {
    title: 'CHỨNG NHẬN CHÍNH HÃNG PARIS',
    body: '100% sản phẩm tại sự kiện Noël Haute Couture Pop-up được nhập khẩu chính ngạch từ Yves Saint Laurent Beauté Paris, đi kèm tem định danh L’Oréal Luxe Vietnam và chế độ bảo hành hương thơm chính hãng.',
  },
};

export default function App() {
  const [currentView, setCurrentView] = useState<'intro' | 'landing'>('intro');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [engravingProduct, setEngravingProduct] = useState<ProductItem | null>(null);
  const [isEngravingOpen, setIsEngravingOpen] = useState(false);
  const [policyTopic, setPolicyTopic] = useState<'privacy' | 'terms' | 'authentic' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  const filteredProducts = useMemo(
    () =>
      filterAndSortProducts(CATALOG_PRODUCTS, {
        activeTab,
        searchQuery,
        sortBy,
        wishlistIds,
      }),
    [activeTab, searchQuery, sortBy, wishlistIds]
  );

  const lipstickCount = useMemo(
    () => CATALOG_PRODUCTS.filter((p) => p.category === 'lipstick').length,
    []
  );
  const fragranceCount = useMemo(
    () => CATALOG_PRODUCTS.filter((p) => p.category === 'fragrance').length,
    []
  );
  const coffretCount = useMemo(
    () => CATALOG_PRODUCTS.filter((p) => p.category === 'coffret').length,
    []
  );

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(
        exists ? 'Đã xóa khỏi danh sách yêu thích' : 'Đã lưu vào danh sách yêu thích VIP'
      );
      return next;
    });
  };

  const handleAddProductToCart = (
    product: ProductItem,
    engravingText?: string,
    engravingStyle?: 'serif' | 'monogram',
    shadeName?: string
  ) => {
    setCartItems((prev) => {
      const match = prev.find(
        (item) =>
          item.productId === product.id &&
          (item.engravingText ?? '') === (engravingText ?? '') &&
          (item.shadeName ?? '') === (shadeName ?? '')
      );
      if (match) {
        return prev.map((item) =>
          item.id === match.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          title: product.title,
          subtitle: product.eyebrow,
          price: product.price,
          image: product.image,
          quantity: 1,
          engravingText,
          engravingStyle,
          shadeName,
        },
      ];
    });
    showToast(`Đã thêm "${product.title}" vào Giỏ Quà Noël`);
  };

  const handleReserveCoffret = (coffret: CoffretItem) => {
    setCartItems((prev) => {
      const match = prev.find((item) => item.productId === coffret.id);
      if (match) {
        return prev.map((item) =>
          item.id === match.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `${coffret.id}-${Date.now()}`,
          productId: coffret.id,
          title: coffret.title,
          subtitle: coffret.eyebrow,
          price: coffret.price,
          image: coffret.image,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleFocusSearch = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    window.setTimeout(() => searchInputRef.current?.focus(), 250);
  };

  const openEngravingModal = (product?: ProductItem) => {
    setEngravingProduct(product ?? CATALOG_PRODUCTS[0]);
    setIsEngravingOpen(true);
  };

  const cartCount = calculateCartCount(cartItems);

  if (currentView === 'intro') {
    return (
      <ChristmasWonderIntro
        onEnterMainPage={() => {
          setCurrentView('landing');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen gala-radial-canvas text-[#FBFBFB] relative overflow-x-hidden">
      <StardustCanvas />
      <Navbar
        wishlistCount={wishlistIds.length}
        cartCount={cartCount}
        onOpenEngraving={() => openEngravingModal()}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onFocusSearch={handleFocusSearch}
        onOpenWonderIntro={() => {
          setCurrentView('intro');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      />

      <main>
        <HeroSection onOpenEngraving={() => openEngravingModal()} />

        <SpotlightSection
          isWishlisted={wishlistIds.includes(CATALOG_PRODUCTS[0].id)}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={(product) => handleAddProductToCart(product)}
          onOpenEngraving={(product) => openEngravingModal(product)}
        />

        <CatalogSection
          products={filteredProducts}
          allCount={CATALOG_PRODUCTS.length}
          lipstickCount={lipstickCount}
          fragranceCount={fragranceCount}
          coffretCount={coffretCount}
          wishlistIds={wishlistIds}
          activeTab={activeTab}
          searchQuery={searchQuery}
          sortBy={sortBy}
          searchInputRef={searchInputRef}
          onChangeTab={setActiveTab}
          onChangeSearch={setSearchQuery}
          onChangeSort={setSortBy}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={(product) => handleAddProductToCart(product)}
          onOpenEngraving={(product) => openEngravingModal(product)}
          onResetFilters={() => {
            setActiveTab('all');
            setSearchQuery('');
            setSortBy('featured');
          }}
        />

        <CoffretsSection onReserveCoffret={handleReserveCoffret} />

        <FaqSection />

        <RsvpSection />
      </main>

      <Footer onOpenPolicyModal={(topic) => setPolicyTopic(topic)} />

      {/* Interactive Modals & Drawers */}
      <EngravingModal
        isOpen={isEngravingOpen}
        initialProduct={engravingProduct}
        onClose={() => setIsEngravingOpen(false)}
        onConfirmAdd={(product, text, style, shade) =>
          handleAddProductToCart(product, text, style, shade)
        }
      />

      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        wishlistIds={wishlistIds}
        onClose={() => setIsWishlistOpen(false)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={(product) => handleAddProductToCart(product)}
      />

      {/* Policy Info Modal */}
      {policyTopic && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="policy-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
        >
          <div className="w-full max-w-lg rounded-sm border border-white/20 bg-gradient-to-b from-[#180307] to-[#0d0205] p-7 sm:p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <h2
                  id="policy-modal-title"
                  className="font-serif text-lg font-medium text-white uppercase tracking-wide"
                >
                  {POLICY_COPY[policyTopic].title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setPolicyTopic(null)}
                aria-label="Đóng thông tin"
                className="p-1.5 rounded-full border border-white/15 text-[#e9e0e2] hover:text-[#d4af37] cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-5 text-xs sm:text-[13.5px] leading-relaxed text-[#e9e0e2]/80 font-light">
              {POLICY_COPY[policyTopic].body}
            </p>
            <button
              type="button"
              onClick={() => setPolicyTopic(null)}
              className="mt-7 w-full gold-gradient-btn py-3.5 rounded-sm text-[10.5px] font-semibold tracking-[0.18em] uppercase cursor-pointer"
            >
              ĐÃ HIỂU
            </button>
          </div>
        </div>
      )}

      {/* Subtle Luxury Action Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:right-6 z-50 rounded-sm border border-[#d4af37]/60 bg-[#120205]/95 backdrop-blur-xl px-5 py-3.5 flex items-center gap-3 shadow-[0_12px_36px_rgba(0,0,0,0.8)] sm:max-w-md animate-in slide-in-from-bottom-3 duration-300"
        >
          <div className="w-6 h-6 rounded-full border border-[#d4af37]/40 bg-[#1e040a] flex items-center justify-center shrink-0 text-[#d4af37]">
            <Check className="w-3.5 h-3.5" aria-hidden="true" />
          </div>
          <span className="text-xs sm:text-[13px] text-white font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
