import { useState, type FormEvent } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import {
  CATALOG_PRODUCTS,
  validateRsvpForm,
  type RsvpFormData,
} from '../data/catalog';

interface RsvpSectionProps {
  initialEngravingWish?: string;
}

export function RsvpSection({ initialEngravingWish = '' }: RsvpSectionProps) {
  const [formData, setFormData] = useState<RsvpFormData>({
    fullName: '',
    phone: '',
    productInterest: 'Son Kem The Inks Vinyl Cream #416 Đỏ',
    checkInDate: '2026-12-24',
    engravingWish: initialEngravingWish,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RsvpFormData, string>>>({});
  const [submittedPass, setSubmittedPass] = useState<{
    code: string;
    data: RsvpFormData;
  } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateRsvpForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmittedPass({
      code: 'YSL-NOEL-2412-VIP',
      data: { ...formData },
    });
  };

  return (
    <section
      id="rsvp"
      className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-14 lg:py-20 border-t border-white/10"
    >
      <div className="max-w-[1280px] mx-auto relative rounded-sm border border-white/15 bg-gradient-to-b from-[#180307]/90 to-[#0c0104]/95 backdrop-blur-xl p-6 sm:p-10 lg:p-14 shadow-[0_24px_70px_rgba(0,0,0,0.7)]">
        {/* Subtle Decorative Starlets */}
        <span className="absolute top-4 left-4 text-[12px] text-[#d4af37]/40 select-none" aria-hidden="true">
          ✦
        </span>
        <span className="absolute top-4 right-4 text-[12px] text-[#d4af37]/40 select-none" aria-hidden="true">
          ✦
        </span>

        <div className="text-center max-w-xl mx-auto">
          <div className="w-9 h-9 rounded-full border border-[#d4af37]/40 bg-[#1e040a] flex items-center justify-center mx-auto mb-3.5 text-[#d4af37]">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="text-[9.5px] font-semibold tracking-[0.26em] uppercase text-[#d4af37]">
            THIỆP MỜI DẠ TIỆC PRIVATE NOËL 2026
          </div>
          <h2 className="mt-2.5 font-serif text-3xl sm:text-4xl font-normal tracking-wide text-white">
            Đăng Ký Trải Nghiệm Gala VIP
          </h2>
          <p className="mt-3 text-xs sm:text-[13.5px] leading-relaxed text-[#e9e0e2]/75 font-light">
            Hẹn gặp chuyên gia trang điểm Paris, nhận thiệp mời dạ tiệc rượu vang và nhận bộ quà tặng Libre Mini độc quyền khi check-in tại Pop-up Vincom Đồng Khởi.
          </p>
        </div>

        {submittedPass ? (
          <div
            data-testid="rsvp-confirmation"
            className="mt-10 rounded-sm border border-[#d4af37]/50 bg-gradient-to-b from-[#1a0308] to-[#0a0103] p-7 sm:p-10 text-center shadow-2xl relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-full border border-[#d4af37]/50 bg-[#28050e] flex items-center justify-center mx-auto mb-4 text-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="text-[10px] font-semibold tracking-[0.24em] uppercase text-[#d4af37]">
              XÁC NHẬN THIỆP MỜI VIP THÀNH CÔNG
            </div>
            <h3 className="mt-2.5 font-serif text-2xl sm:text-3xl font-medium text-white">
              Trân Trọng Kính Mời: {submittedPass.data.fullName}
            </h3>

            <div className="mt-5 inline-block rounded-sm border border-[#d4af37]/40 bg-[#120205] px-6 py-2.5 text-xs font-semibold tracking-[0.22em] text-[#d4af37] tabular-nums shadow-inner">
              MÃ THIỆP: {submittedPass.code}
            </div>

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left text-xs border-t border-white/10 pt-6">
              <div>
                <span className="block text-[9.5px] uppercase tracking-[0.18em] text-[#d4af37]/90 font-medium">
                  ĐIỆN THOẠI VIP
                </span>
                <span className="font-semibold text-white tabular-nums text-sm mt-0.5 block">
                  {submittedPass.data.phone}
                </span>
              </div>
              <div>
                <span className="block text-[9.5px] uppercase tracking-[0.18em] text-[#d4af37]/90 font-medium">
                  NGÀY CHECK-IN
                </span>
                <span className="font-semibold text-white tabular-nums text-sm mt-0.5 block">
                  {submittedPass.data.checkInDate}
                </span>
              </div>
              <div>
                <span className="block text-[9.5px] uppercase tracking-[0.18em] text-[#d4af37]/90 font-medium">
                  TÁC PHẨM TƯ VẤN
                </span>
                <span className="font-medium text-white text-sm mt-0.5 block">
                  {submittedPass.data.productInterest}
                </span>
              </div>
            </div>

            {submittedPass.data.engravingWish && (
              <div className="mt-5 text-xs text-[#d0c5af]/80 bg-white/5 border border-white/10 rounded-sm p-3 inline-block">
                Nội dung khắc Laser Bạc dự kiến:{' '}
                <strong className="text-white tracking-widest uppercase">
                  {submittedPass.data.engravingWish}
                </strong>
              </div>
            )}

            <div className="mt-8">
              <button
                type="button"
                onClick={() => setSubmittedPass(null)}
                className="rounded-sm border border-white/20 bg-transparent hover:border-[#d4af37] hover:text-[#d4af37] transition-all px-7 py-3 text-[10px] font-semibold tracking-[0.18em] uppercase text-white cursor-pointer"
              >
                CHỈNH SỬA HOẶC ĐĂNG KÝ THÊM
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="rsvp-fullname"
                  className="block text-[10px] font-medium tracking-[0.18em] uppercase text-[#d4af37] mb-2"
                >
                  HỌ VÀ TÊN QUÝ KHÁCH *
                </label>
                <input
                  id="rsvp-fullname"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                  placeholder="Ví dụ: Hoàng Minh Châu"
                  aria-invalid={Boolean(errors.fullName)}
                  className="w-full rounded-sm bg-[#0e0104] border border-white/15 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 focus:outline-none px-4 py-3 text-xs text-white placeholder:text-[#d0c5af]/40 shadow-inner"
                />
                {errors.fullName && (
                  <p className="mt-1.5 text-[11px] text-[#ff8080]">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="rsvp-phone"
                  className="block text-[10px] font-medium tracking-[0.18em] uppercase text-[#d4af37] mb-2"
                >
                  SỐ ĐIỆN THOẠI VIP *
                </label>
                <input
                  id="rsvp-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, phone: e.target.value }));
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  placeholder="090 982 xxxx"
                  aria-invalid={Boolean(errors.phone)}
                  className="w-full rounded-sm bg-[#0e0104] border border-white/15 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 focus:outline-none px-4 py-3 text-xs text-white placeholder:text-[#d0c5af]/40 tabular-nums shadow-inner"
                />
                {errors.phone && (
                  <p className="mt-1.5 text-[11px] text-[#ff8080]">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="rsvp-product"
                  className="block text-[10px] font-medium tracking-[0.18em] uppercase text-[#d4af37] mb-2"
                >
                  TÁC PHẨM YÊU CẦU TƯ VẤN RIÊNG
                </label>
                <select
                  id="rsvp-product"
                  value={formData.productInterest}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, productInterest: e.target.value }))
                  }
                  className="w-full rounded-sm bg-[#0e0104] border border-white/15 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 focus:outline-none px-4 py-3 text-xs text-white cursor-pointer shadow-inner"
                >
                  <option value="Son Kem The Inks Vinyl Cream #416 Đỏ">
                    Son Kem The Inks Vinyl Cream #416 Đỏ
                  </option>
                  {CATALOG_PRODUCTS.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="rsvp-date"
                  className="block text-[10px] font-medium tracking-[0.18em] uppercase text-[#d4af37] mb-2"
                >
                  NGÀY CHECK-IN TẠI POP-UP VINCOM
                </label>
                <input
                  id="rsvp-date"
                  type="date"
                  value={formData.checkInDate}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, checkInDate: e.target.value }));
                    if (errors.checkInDate) {
                      setErrors((prev) => ({ ...prev, checkInDate: undefined }));
                    }
                  }}
                  aria-invalid={Boolean(errors.checkInDate)}
                  className="w-full rounded-sm bg-[#0e0104] border border-white/15 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 focus:outline-none px-4 py-3 text-xs text-white tabular-nums shadow-inner"
                />
                {errors.checkInDate && (
                  <p className="mt-1.5 text-[11px] text-[#ff8080]">{errors.checkInDate}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="rsvp-engraving"
                className="block text-[10px] font-medium tracking-[0.18em] uppercase text-[#d4af37] mb-2"
              >
                NỘI DUNG KHẮC LASER BẠC MONG MUỐN (NẾU CÓ)
              </label>
              <input
                id="rsvp-engraving"
                type="text"
                maxLength={24}
                value={formData.engravingWish}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, engravingWish: e.target.value }))
                }
                placeholder="Ví dụ: MADAME HELENA 2026"
                className="w-full rounded-sm bg-[#0e0104] border border-white/15 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 focus:outline-none px-4 py-3 text-xs text-white placeholder:text-[#d0c5af]/40 shadow-inner"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full gold-gradient-btn py-4.5 px-6 rounded-sm text-[11.5px] font-semibold tracking-[0.2em] uppercase cursor-pointer"
              >
                GỬI THÔNG TIN DỰ TIỆC GALA NOËL
              </button>
            </div>

            <p className="text-center text-[11px] text-[#d0c5af]/70 font-light">
              Bảo mật 100% theo tiêu chuẩn L&apos;Oréal Luxe Vietnam. Không gửi tin nhắn quảng cáo rác.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
