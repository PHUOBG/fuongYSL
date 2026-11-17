export type ProductCategory = 'lipstick' | 'fragrance' | 'coffret';
export type FilterTab = 'all' | ProductCategory | 'wishlist';
export type SortOption = 'featured' | 'price-asc' | 'price-desc';

export interface ProductItem {
  id: string;
  badge: string;
  eyebrow: string;
  title: string;
  description: string;
  price: number;
  engravingNote: string;
  category: ProductCategory;
  image: string;
  shadeLabel?: string;
  engravable: boolean;
  defaultEngravingSample: string;
  featuredOrder: number;
}

export interface CoffretItem {
  id: string;
  badge: string;
  eyebrow: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  subPriceLabel?: string;
  image: string;
  thumbnails: string[];
  ctaLabel: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  quantity: number;
  engravingText?: string;
  engravingStyle?: 'serif' | 'monogram';
  shadeName?: string;
}

export interface RsvpFormData {
  fullName: string;
  phone: string;
  productInterest: string;
  checkInDate: string;
  engravingWish: string;
}

export interface RsvpValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof RsvpFormData, string>>;
}

export const HERO_CAMPAIGN_IMAGE = '/src/assets/images/hero_holiday_campaign_1794895275295.jpg';
export const SPOTLIGHT_PRODUCT_IMAGE = '/src/assets/images/spotlight-muse.jpg';

export const CATALOG_PRODUCTS: ProductItem[] = [
  {
    id: 'inks-vinyl-416',
    badge: 'HOT SHADE',
    eyebrow: 'MÀU BÁN CHẠY NHẤT',
    title: 'Son Kem YSL The Inks Vinyl #416',
    description:
      'Chất son kem bóng vinyl mềm mượt, bền màu đến 10 giờ với sắc đỏ gạch thời thượng.',
    price: 1210000,
    engravingNote: 'MIỄN PHÍ KHẮC',
    category: 'lipstick',
    image: '/src/assets/images/spotlight_vinyl_cream_1794895275583.jpg',
    shadeLabel: '#416 Psychedelic Chili',
    engravable: true,
    defaultEngravingSample: 'MADAME HELENA',
    featuredOrder: 1,
  },
  {
    id: 'loveshine-44',
    badge: 'NEW COUTURE',
    eyebrow: 'HIỆU ỨNG VOAN SƯƠNG',
    title: 'Son Kem Sáp YSL Loveshine #44',
    description:
      'Sắc hồng đất thanh thuần tựa lớp voan lụa mỏng phủ trên đôi môi căng mọng.',
    price: 1180000,
    engravingNote: 'MIỄN PHÍ KHẮC',
    category: 'lipstick',
    image: '/src/assets/images/product_loveshine_lip_1794895275588.jpg',
    shadeLabel: '#44 Nude Lavallière',
    engravable: true,
    defaultEngravingSample: 'CHLOÉ PARIS',
    featuredOrder: 2,
  },
  {
    id: 'libre-holiday-50',
    badge: 'BESTSELLER',
    eyebrow: 'HỘP QUÀ TRẮNG ĐÍNH TÁN BẠC',
    title: 'Nước Hoa Libre Holiday Edition 50ml',
    description:
      'Nốt hương gợi cảm quyến rũ kết hợp giữa tinh chất hoa oải hương Pháp và hoa cam.',
    price: 3850000,
    engravingNote: 'MIỄN PHÍ KHẮC',
    category: 'fragrance',
    image: '/src/assets/images/product_libre_holiday_1794895279701.jpg',
    engravable: true,
    defaultEngravingSample: 'LIBRE NOËL 2026',
    featuredOrder: 3,
  },
  {
    id: 'myslf-edp',
    badge: 'EXCLUSIVE',
    eyebrow: 'HƯƠNG GỖ TRẦM & HOA CAM',
    title: 'Nước Hoa Nam YSL MYSLF Eau de Parfum',
    description:
      'Tuyên ngôn mùi hương của người đàn ông hiện đại sự hài hòa giữa gỗ trầm và cam bergamot.',
    price: 3600000,
    engravingNote: 'MIỄN PHÍ KHẮC',
    category: 'fragrance',
    image: '/src/assets/images/product_myslf_edp_1794895276658.jpg',
    engravable: true,
    defaultEngravingSample: 'MONSIEUR K.',
    featuredOrder: 4,
  },
  {
    id: 'y-edp-100',
    badge: 'GENTLEMAN',
    eyebrow: 'HƯƠNG TÁO XANH & XÔ THƠM',
    title: 'Nước Hoa Nam Y Eau de Parfum 100ml',
    description:
      'Hương thơm phóng khoáng, dồi dào sinh lực với sự mở đầu tươi mát của táo xanh và gừng.',
    price: 3950000,
    engravingNote: 'MIỄN PHÍ KHẮC',
    category: 'fragrance',
    image: '/src/assets/images/product_y_edp_1794895277399.jpg',
    engravable: true,
    defaultEngravingSample: 'A. LAURENT',
    featuredOrder: 5,
  },
  {
    id: 'vestiaire-blouse',
    badge: 'HAUTE PARFUMERIE',
    eyebrow: 'ĐỈNH CAO CHẾ TÁC PARIS',
    title: 'YSL Le Vestiaire Des Parfums Blouse',
    description:
      'Dòng nước hoa đặc bản lấy cảm hứng từ chiếc áo Blouse lụa thanh lịch với xạ hương trắng.',
    price: 5200000,
    engravingNote: 'MIỄN PHÍ KHẮC',
    category: 'fragrance',
    image: '/src/assets/images/product_vestiaire_blouse_1794895278793.jpg',
    engravable: true,
    defaultEngravingSample: 'HAUTE COUTURE',
    featuredOrder: 6,
  },
  {
    id: 'coffret-libre-son',
    badge: 'HOLIDAY COFFRET',
    eyebrow: 'HỘP TRẮNG ĐÍNH TÁN MẠ BẠC',
    title: 'Hộp Quà Set Libre EDP 50ml & Son',
    description:
      'Phiên bản hộp quà tặng Noel dập đinh tán mạ bạc gồm Libre 50ml, xịt 10ml và son.',
    price: 4850000,
    engravingNote: 'MIỄN PHÍ KHẮC',
    category: 'coffret',
    image: '/src/assets/images/product_coffret_pouch_1794895278593.jpg',
    engravable: true,
    defaultEngravingSample: 'NOËL D’OR',
    featuredOrder: 7,
  },
  {
    id: 'coffret-popup-show',
    badge: 'COFFRET POP-UP',
    eyebrow: 'BỘ SƯU TẬP GIỚI HẠN',
    title: 'Bộ Quà Tặng Holiday Show Pop-up',
    description:
      'Hộp quà và túi mỹ phẩm nhung đỏ thẫm đính logo Cassandre mạ bạc phiên bản Pop-up.',
    price: 4450000,
    engravingNote: 'MIỄN PHÍ KHẮC',
    category: 'coffret',
    image: '/src/assets/images/coffret_vip_popup_1794895279738.jpg',
    engravable: true,
    defaultEngravingSample: 'GALA VIP 2026',
    featuredOrder: 8,
  },
];

export const EXCLUSIVE_COFFRETS: CoffretItem[] = [
  {
    id: 'coffret-libre-50',
    badge: 'BESTSELLER NOËL',
    eyebrow: 'SET NƯỚC HOA CAO CẤP',
    title: 'Set Libre EDP 50ml Khai Phóng Tự Do',
    description:
      'Bao gồm Nước hoa Libre EDP 50ml, Libre EDP 10ml dạng xịt du lịch và Hộp quà trắng Noel dập đinh tán mạ bạc YSL độc bản.',
    price: 4850000,
    originalPrice: 5300000,
    image: '/src/assets/images/product_libre_holiday_1794895279701.jpg',
    thumbnails: [
      '/src/assets/images/product_libre_holiday_1794895279701.jpg',
      '/src/assets/images/product_coffret_pouch_1794895278593.jpg',
      '/src/assets/images/spotlight_vinyl_cream_1794895275583.jpg',
    ],
    ctaLabel: 'ĐẶT TRƯỚC',
  },
  {
    id: 'coffret-paris-icons',
    badge: 'LIMITED EDITION',
    eyebrow: 'TRỌN BỘ BIỂU TƯỢNG PARIS',
    title: 'Coffret Libre, Black Opium & Mon Paris',
    description:
      'Nước hoa Libre EDP kết hợp cùng Black Opium huyền bí và thỏi son Rouge Pur Couture The Slim vỏ đen thời thượng.',
    price: 5850000,
    originalPrice: 6600000,
    image: '/src/assets/images/hero_holiday_campaign_1794895275295.jpg',
    thumbnails: [
      '/src/assets/images/product_vestiaire_blouse_1794895278793.jpg',
      '/src/assets/images/product_myslf_edp_1794895276658.jpg',
      '/src/assets/images/product_loveshine_lip_1794895275588.jpg',
    ],
    ctaLabel: 'ĐẶT TRƯỚC',
  },
  {
    id: 'coffret-vincom-vip',
    badge: 'VIP VINCOM POP-UP',
    eyebrow: 'QUÀ TẶNG POP-UP ĐỘC QUYỀN',
    title: 'Set Quà YSL Holiday Show Check-in VIP',
    description:
      'Túi đựng mỹ phẩm cao cấp YSL Beauté da đỏ mạ bạc Cassandre kèm bộ sample Libre EDP 7.5ml cao cấp tại gian hàng Đồng Khởi.',
    price: 1000000,
    subPriceLabel: 'Quà tặng kèm theo đơn',
    image: '/src/assets/images/coffret_vip_popup_1794895279738.jpg',
    thumbnails: [
      '/src/assets/images/product_coffret_pouch_1794895278593.jpg',
      '/src/assets/images/product_libre_holiday_1794895279701.jpg',
    ],
    ctaLabel: 'ĐẶT TRƯỚC',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '1. Dịch vụ khắc tên Laser mạ bạc mùa Noel có tính phí không?',
    answer:
      'Hoàn toàn miễn phí dành cho thượng khách đặt mua trực tuyến hoặc trải nghiệm tại gian hàng Pop-up Vincom Đồng Khởi và Saigon Centre. Nghệ nhân khắc laser chuẩn Paris thực hiện trực tiếp trong 5 phút với mực ánh bạc 24K bền vững trên vỏ son sơn mài và thân chai nước hoa.',
  },
  {
    id: 'faq-2',
    question: '2. Hộp quà YSL Holiday Edition 2026 bao gồm những gì?',
    answer:
      'Mỗi đơn hàng đều đi kèm hộp quà trắng dập nổi đinh tán mạ bạc Haute Couture phiên bản giới hạn 2026, nơ lụa đỏ Bordeaux, giấy lụa thơm hương Libre và thiệp chúc Giáng Sinh mạ ánh kim có thể ghi lời nhắn cá nhân hóa.',
  },
  {
    id: 'faq-3',
    question: '3. Chính sách giao hàng hỏa tốc trong 2 giờ tại TP.HCM & Hà Nội?',
    answer:
      'Đơn hàng đặt trước 20:00 mỗi ngày tại khu vực nội thành TP.HCM và Hà Nội được vận chuyển bằng dịch vụ giao nhận VIP riêng biệt trong vòng 2 giờ kèm bảo hiểm gói quà nguyên vẹn.',
  },
  {
    id: 'faq-4',
    question: '4. Làm thế nào để tham gia dạ tiệc Gala Noël Private Pop-up tại Vincom Đồng Khởi?',
    answer:
      'Quý khách vui lòng điền thông tin tại mục Thiệp Mời Dạ Tiệc Private Noël 2026 bên dưới. Concierge VIP sẽ gửi mã mời điện tử và xác nhận khung giờ riêng tư cùng chuyên gia trang điểm Paris và quà tặng Libre Mini khi check-in.',
  },
];

export function formatVnd(amount: number): string {
  return `${amount.toLocaleString('vi-VN')} ₫`;
}

export function filterAndSortProducts(
  products: ProductItem[],
  options: {
    activeTab: FilterTab;
    searchQuery: string;
    sortBy: SortOption;
    wishlistIds: string[];
  }
): ProductItem[] {
  const query = options.searchQuery.trim().toLowerCase();

  const filtered = products.filter((item) => {
    if (options.activeTab === 'wishlist' && !options.wishlistIds.includes(item.id)) {
      return false;
    }
    if (
      options.activeTab !== 'all' &&
      options.activeTab !== 'wishlist' &&
      item.category !== options.activeTab
    ) {
      return false;
    }
    if (!query) {
      return true;
    }
    const haystack = `${item.title} ${item.eyebrow} ${item.description} ${item.shadeLabel ?? ''}`.toLowerCase();
    return haystack.includes(query);
  });

  const sorted = [...filtered];
  if (options.sortBy === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (options.sortBy === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else {
    sorted.sort((a, b) => a.featuredOrder - b.featuredOrder);
  }
  return sorted;
}

export function calculateCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calculateCartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function computeCountdownParts(remainingSeconds: number): {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
} {
  const safe = Math.max(0, Math.floor(remainingSeconds));
  const days = Math.floor(safe / 86400);
  const hours = Math.floor((safe % 86400) / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
}

export function validateRsvpForm(data: RsvpFormData): RsvpValidationResult {
  const errors: Partial<Record<keyof RsvpFormData, string>> = {};
  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = 'Vui lòng nhập họ và tên quý khách.';
  }
  const digits = data.phone.replace(/\D/g, '');
  if (digits.length < 9 || digits.length > 12) {
    errors.phone = 'Vui lòng nhập số điện thoại VIP hợp lệ (9–12 chữ số).';
  }
  if (!data.checkInDate.trim()) {
    errors.checkInDate = 'Vui lòng chọn ngày check-in dự kiến.';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
