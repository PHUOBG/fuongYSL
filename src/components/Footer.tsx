import { useState, type FormEvent } from 'react';
import { Check, Phone, ShieldCheck, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenPolicyModal: (topic: 'privacy' | 'terms' | 'authentic') => void;
}

export function Footer({ onOpenPolicyModal }: FooterProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) {
      setEmailError('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }
    setEmailError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#070102] border-t border-white/10 pt-16 pb-10 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-2 text-[10px] font-medium tracking-[0.22em] uppercase text-[#d4af37]">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>FuongYSLComestic</span>
            </div>
            <div className="font-serif text-base sm:text-lg font-medium tracking-wider text-white mt-1">
              Haute Couture Beauté 2026
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-[#e9e0e2]/70 font-light">
              Hòa mình vào không gian dạ tiệc Giáng Sinh xa hoa Paris, tận hưởng sắc son đỏ vinyl quyến rũ và nghệ thuật quà tặng thượng lưu độc bản.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[9.5px] font-medium tracking-[0.16em] uppercase text-[#d4af37]">
              <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" aria-hidden="true" />
              <span>100% AUTHENTIC FUONG YSL COMESTIC / PARIS</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <div className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#d4af37]">
              KHÔNG GIAN TRẢI NGHIỆM POP-UP
            </div>
            <div className="mt-3.5 space-y-2.5 text-[12px] leading-relaxed text-[#e9e0e2]/75 font-light">
              <p>
                <strong className="text-white font-medium">Saigon Centre:</strong> Tầng trệt, 65 Lê Lợi, Bến Nghé, Quận 1, TP.HCM
              </p>
              <p>
                <strong className="text-white font-medium">Vincom Center Đồng Khởi:</strong> 72 Lê Thánh Tôn &amp; 45A Lý Tự Trọng, Bến Nghé, Quận 1, TP.HCM
              </p>
              <p>
                <strong className="text-white font-medium">Giờ mở cửa:</strong> 09:30 – 22:00 hàng ngày
              </p>
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <div className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#d4af37]">
              DỊCH VỤ THƯỢNG KHÁCH VIP
            </div>
            <div className="mt-3.5 space-y-2.5 text-[12px] leading-relaxed text-[#e9e0e2]/75 font-light">
              <p className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Hotline VIP Private Concierge:
                  <br />
                  <strong className="text-white font-medium tabular-nums tracking-wide">1800 6838 • 090 982 YSLB</strong>
                </span>
              </p>
              <p>
                Đặc quyền khắc laser bạc &amp; chuyên gia trang điểm Paris cá nhân hóa.
              </p>
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <div className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#d4af37]">
              ĐẶC QUYỀN GALA NOËL
            </div>
            <p className="mt-3.5 text-[12px] leading-relaxed text-[#e9e0e2]/75 font-light">
              Đăng ký nhận thiệp mời dạ tiệc private &amp; thông tin các phiên bản giới hạn Giáng Sinh 2026.
            </p>

            {subscribed ? (
              <div className="mt-4 rounded-sm border border-[#d4af37]/50 bg-[#160307] px-4 py-3 flex items-center gap-2.5 text-[11.5px] text-[#d4af37]">
                <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Đã ghi nhận đặc quyền Gala VIP của quý khách.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} noValidate className="mt-4">
                <div className="flex items-stretch">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Địa chỉ email nhận thiệp mời
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    placeholder="Địa chỉ email của quý khách..."
                    className="flex-1 min-w-0 rounded-l-sm bg-[#120205] border border-white/15 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/40 focus:outline-none px-3.5 py-2.5 text-xs text-white placeholder:text-[#d0c5af]/40 shadow-inner"
                  />
                  <button
                    type="submit"
                    className="gold-gradient-btn rounded-r-sm px-4 py-2.5 text-[10px] font-semibold tracking-[0.16em] uppercase whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    ĐĂNG KÝ
                  </button>
                </div>
                {emailError && (
                  <p className="mt-1.5 text-[11px] text-[#ff8080]">{emailError}</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10.5px] text-[#d0c5af]/70">
          <p className="font-light">
            © 2026 FuongYSLComestic Paris. Bản quyền thương hiệu Haute Couture Beauté. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-5 uppercase tracking-[0.16em] font-medium text-[10px]">
            <button
              type="button"
              onClick={() => onOpenPolicyModal('privacy')}
              className="hover:text-[#d4af37] transition-colors cursor-pointer"
            >
              BẢO MẬT THÔNG TIN
            </button>
            <button
              type="button"
              onClick={() => onOpenPolicyModal('terms')}
              className="hover:text-[#d4af37] transition-colors cursor-pointer"
            >
              ĐIỀU KHOẢN ĐỘC QUYỀN
            </button>
            <button
              type="button"
              onClick={() => onOpenPolicyModal('authentic')}
              className="hover:text-[#d4af37] transition-colors cursor-pointer"
            >
              CHỨNG NHẬN CHÍNH HÃNG
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
