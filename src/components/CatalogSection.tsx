import { type RefObject } from 'react';
import { Heart, PenLine, Search, Sparkles } from 'lucide-react';
import {
  formatVnd,
  type FilterTab,
  type ProductItem,
  type SortOption,
} from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface CatalogSectionProps {
  products: ProductItem[];
  allCount: number;
  lipstickCount: number;
  fragranceCount: number;
  coffretCount: number;
  wishlistIds: string[];
  activeTab: FilterTab;
  searchQuery: string;
  sortBy: SortOption;
  searchInputRef: RefObject<HTMLInputElement | null>;
  onChangeTab: (tab: FilterTab) => void;
  onChangeSearch: (query: string) => void;
  onChangeSort: (sort: SortOption) => void;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (product: ProductItem) => void;
  onOpenEngraving: (product: ProductItem) => void;
  onResetFilters: () => void;
}

export function CatalogSection({
  products,
  allCount,
  lipstickCount,
  fragranceCount,
  coffretCount,
  wishlistIds,
  activeTab,
  searchQuery,
  sortBy,
  searchInputRef,
  onChangeTab,
  onChangeSearch,
  onChangeSort,
  onToggleWishlist,
  onAddToCart,
  onOpenEngraving,
  onResetFilters,
}: CatalogSectionProps) {
  const tabs: { id: FilterTab; label: string; count: number }[] = [
    { id: 'all', label: 'TẤT CẢ NOËL SHOW', count: allCount },
    { id: 'lipstick', label: 'SON MÔI COUTURE', count: lipstickCount },
    { id: 'fragrance', label: 'NƯỚC HOA LIBRE & MYSLF', count: fragranceCount },
    { id: 'coffret', label: 'HỘP QUÀ NOËL GALA', count: coffretCount },
    { id: 'wishlist', label: '♡ YÊU THÍCH', count: wishlistIds.length },
  ];

  return (
    <section
      id="catalog"
      className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12 lg:py-16 border-t border-white/10"
    >
      {/* Top Header & Search Row */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.24em] uppercase text-[#d4af37]">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>BỘ SƯU TẬP NOËL GIỚI HẠN 2026</span>
          </div>
          <h2 className="mt-2.5 font-serif text-3xl sm:text-4xl font-normal tracking-wide text-white">
            Holiday Show Couture Catalog
          </h2>
          <p className="mt-2 text-xs sm:text-[13.5px] text-[#e9e0e2]/75 font-light">
            Tuyệt tác son môi, nước hoa và hộp quà Noel đặc bản mùa Lễ Hội từ Paris.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full lg:w-[340px] relative">
          <label htmlFor="catalog-search" className="sr-only">
            Tìm kiếm sản phẩm Noel
          </label>
          <Search
            className="w-4 h-4 text-[#d4af37] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            ref={searchInputRef}
            id="catalog-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onChangeSearch(e.target.value)}
            placeholder="Tìm tên son, nước hoa Libre, hộp quà..."
            className="w-full bg-[#0d0104]/80 backdrop-blur-sm border border-white/15 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 focus:outline-none pl-10 pr-4 py-3 rounded-sm text-xs text-white placeholder:text-[#d0c5af]/50 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Filter Tabs Row */}
      <div
        role="tablist"
        aria-label="Lọc danh mục bộ sưu tập"
        className="mt-8 flex flex-wrap items-center gap-2.5"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChangeTab(tab.id)}
              className={`rounded-sm px-4 py-2.5 text-[10px] font-medium tracking-[0.16em] uppercase whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#b58d1f] text-[#090103] font-semibold shadow-[0_2px_12px_rgba(212,175,55,0.3)]'
                  : 'border border-white/12 bg-[#120205]/70 text-[#e9e0e2]/80 hover:border-[#d4af37]/40 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded-full tabular-nums ${
                  isActive
                    ? 'bg-[#090103]/20 text-[#090103] font-bold'
                    : 'bg-white/10 text-[#d0c5af]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Count & Sort Row */}
      <div className="mt-7 pb-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="text-[#d0c5af]/90 font-light">
          Hiển thị{' '}
          <strong className="text-white font-medium tabular-nums">{products.length}</strong>{' '}
          tuyệt tác Giáng Sinh độc quyền
        </div>

        <div className="flex items-center gap-2.5">
          <label htmlFor="catalog-sort" className="text-[#d0c5af]/80 font-light text-[11.5px]">
            Sắp xếp:
          </label>
          <select
            id="catalog-sort"
            value={sortBy}
            onChange={(e) => onChangeSort(e.target.value as SortOption)}
            className="rounded-sm bg-[#120205] border border-white/20 focus:border-[#d4af37] focus:outline-none px-3.5 py-1.5 text-xs text-white cursor-pointer transition-colors"
          >
            <option value="featured">Đặc Biệt Mùa Giáng Sinh</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
          </select>
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {products.length === 0 ? (
        <div className="mt-10 rounded-sm border border-white/10 bg-[#120205]/60 backdrop-blur-md p-12 text-center max-w-xl mx-auto shadow-xl">
          <p className="font-serif text-xl text-white">
            Không tìm thấy tuyệt tác phù hợp với tiêu chí của quý khách.
          </p>
          <p className="mt-2.5 text-xs text-[#d0c5af]/80 font-light">
            Vui lòng thử từ khóa khác hoặc xem toàn bộ bộ sưu tập Noël Haute Couture 2026.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-6 gold-gradient-btn px-6 py-3 rounded-sm text-[10.5px] font-semibold tracking-[0.18em] uppercase cursor-pointer"
          >
            XEM TẤT CẢ TUYỆT TÁC
          </button>
        </div>
      ) : (
        <div
          data-testid="catalog-grid"
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 lg:gap-6"
        >
          {products.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
              <article
                key={product.id}
                className="group rounded-sm border border-white/10 bg-gradient-to-b from-[#140206]/80 to-[#0b0103]/95 backdrop-blur-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/40 hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)] overflow-hidden"
              >
                <div>
                  {/* Image Container with Zoom */}
                  <div className="relative aspect-square bg-[#080102] overflow-hidden border-b border-white/8">
                    <ResilientImage
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 backdrop-blur-md bg-[#090103]/85 border border-[#d4af37]/35 rounded-full px-2.5 py-0.5 text-[8.5px] font-semibold tracking-[0.18em] uppercase text-[#d4af37] shadow-sm">
                      {product.badge}
                    </div>
                    <button
                      type="button"
                      onClick={() => onToggleWishlist(product.id)}
                      aria-label={
                        isWishlisted
                          ? `Bỏ yêu thích ${product.title}`
                          : `Yêu thích ${product.title}`
                      }
                      aria-pressed={isWishlisted}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer backdrop-blur-sm ${
                        isWishlisted
                          ? 'bg-[#38040d] border-[#d4af37] text-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                          : 'bg-[#090103]/75 border-white/20 text-white hover:border-[#d4af37]/60'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5">
                    <div className="text-[9px] font-medium tracking-[0.2em] uppercase text-[#d4af37] truncate">
                      {product.eyebrow}
                    </div>
                    <h3 className="mt-1.5 font-serif text-[15.5px] font-medium leading-snug text-white line-clamp-2 min-h-[2.8rem] group-hover:text-[#faeed1] transition-colors">
                      {product.title}
                    </h3>
                    <p className="mt-2 text-[12px] leading-relaxed text-[#e9e0e2]/70 font-light line-clamp-2 min-h-[2.4rem]">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Price & Action Footer */}
                <div className="px-4 sm:px-5 pb-5 pt-2">
                  <div className="flex items-baseline justify-between gap-2 pb-3.5 border-t border-white/8 pt-3">
                    <span className="text-sm font-semibold tabular-nums text-white">
                      {formatVnd(product.price)}
                    </span>
                    <span className="text-[9px] font-medium tracking-[0.14em] uppercase text-[#d4af37]/90">
                      {product.engravingNote}
                    </span>
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenEngraving(product)}
                      className="rounded-sm border border-white/20 bg-[#160307] hover:border-[#d4af37]/60 hover:bg-[#28050e] transition-all py-2.5 px-2 flex items-center justify-center gap-1.5 text-[9.5px] font-semibold tracking-[0.14em] uppercase text-white cursor-pointer"
                    >
                      <PenLine className="w-3 h-3 text-[#d4af37] shrink-0" aria-hidden="true" />
                      <span>KHẮC BẠC</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onAddToCart(product)}
                      className="rounded-sm gold-gradient-btn py-2.5 px-2 text-[9.5px] font-semibold tracking-[0.14em] uppercase cursor-pointer"
                    >
                      CHỌN MUA
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
