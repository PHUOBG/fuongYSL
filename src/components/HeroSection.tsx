import { useState } from 'react';
import { ArrowRight, PenLine, Sparkles, Box, Image as ImageIcon } from 'lucide-react';
import { HERO_CAMPAIGN_IMAGE } from '../data/catalog';
import { ResilientImage } from './ResilientImage';
import { Showcase3D } from './Showcase3D';

interface HeroSectionProps {
  onOpenEngraving: () => void;
}

export function HeroSection({ onOpenEngraving }: HeroSectionProps) {
  const [viewMode, setViewMode] = useState<'3d' | 'campaign'>('3d');

  return (
    <section id="top" className="relative overflow-hidden hero-crimson-glow border-b border-white/10 w-full">
      {/* TRÀN VIỀN 2 BÊN TRÁI PHẢI */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-8 pb-14 lg:py-16 relative z-10">
        {/* Top Breadcrumb & Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2.5 text-[10.5px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-[#d4af37]">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" aria-hidden="true" />
            <span>3D HAUTE COUTURE POP-UP GALA</span>
            <span className="text-white/20">/</span>
            <span className="text-white/70 font-normal">VINCOM ĐỒNG KHỞI TP.HCM</span>
          </div>

          {/* Mode Switcher Toggle: 3D Model vs Campaign Visual */}
          <div className="inline-flex items-center bg-[#140307]/90 border border-white/15 p-1 rounded-sm shadow-md">
            <button
              type="button"
              onClick={() => setViewMode('3d')}
              className={`px-3.5 py-1.5 rounded-xs text-[10.5px] font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === '3d'
                  ? 'bg-white text-[#110103] shadow-sm font-bold'
                  : 'text-[#d0c5af] hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D TƯƠNG TÁC 360°</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('campaign')}
              className={`px-3.5 py-1.5 rounded-xs text-[10.5px] font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'campaign'
                  ? 'bg-white text-[#110103] shadow-sm font-bold'
                  : 'text-[#d0c5af] hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>POSTER CHIẾN DỊCH GALA</span>
            </button>
          </div>
        </div>

        {/* 2-Column Asymmetric Haute Couture Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Editorial Column - Minimalist Haute Couture */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.24em] uppercase text-[#d4af37]">
              <span className="w-8 h-[1px] bg-gradient-to-r from-[#d4af37] to-transparent shrink-0" aria-hidden="true" />
              <span>FUONG YSL COMESTIC · PARIS NOËL 2026</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[52px] font-normal leading-[1.08] tracking-[-0.01em] text-white">
              Sắc Đỏ Thời Thượng <br />
              <span className="italic font-light gold-gradient-text">Đêm Noël Paris</span>
            </h1>

            <p className="text-[14px] leading-relaxed text-[#e9e0e2]/80 max-w-lg font-light">
              Không gian 3D dạ tiệc kiến trúc Paris. Tuyệt tác biểu tượng mạ vàng 24K và sắc son nhung The Inks Vinyl độc bản.
            </p>

            {/* Minimal CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <a
                href="#catalog"
                className="gold-gradient-btn inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-sm text-[11px] font-semibold tracking-[0.16em] uppercase whitespace-nowrap shadow-[0_4px_20px_rgba(212,175,55,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>BỘ SƯU TẬP NOËL</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onOpenEngraving}
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/20 bg-[#140307]/80 backdrop-blur-sm hover:border-[#d4af37]/70 hover:bg-[#22040b] transition-all px-5 py-3.5 text-[11px] font-medium tracking-[0.14em] uppercase text-white whitespace-nowrap cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
              >
                <PenLine className="w-3.5 h-3.5 text-[#d4af37]" aria-hidden="true" />
                <span>KHẮC LASER BẠC</span>
              </button>
            </div>

            {/* 3-Column Minimal Metrics Strip */}
            <div className="pt-3 grid grid-cols-3 rounded-sm border border-white/10 bg-[#120205]/70 backdrop-blur-md divide-x divide-white/10 shadow-lg text-center">
              <div className="p-3.5 sm:p-4">
                <div className="font-serif text-lg sm:text-xl font-semibold text-white tracking-wide">
                  360° 3D
                </div>
                <div className="mt-0.5 text-[9px] sm:text-[9.5px] font-medium tracking-[0.14em] uppercase text-[#d4af37]">
                  TƯƠNG TÁC THỰC
                </div>
              </div>
              <div className="p-3.5 sm:p-4">
                <div className="font-serif text-lg sm:text-xl font-semibold text-white tracking-wide">
                  02 GIỜ
                </div>
                <div className="mt-0.5 text-[9px] sm:text-[9.5px] font-medium tracking-[0.14em] uppercase text-[#d4af37]">
                  HỎA TỐC VIP
                </div>
              </div>
              <div className="p-3.5 sm:p-4">
                <div className="font-serif text-lg sm:text-xl font-semibold text-white tracking-wide">
                  LASER BẠC
                </div>
                <div className="mt-0.5 text-[9px] sm:text-[9.5px] font-medium tracking-[0.14em] uppercase text-[#d4af37]">
                  KHẮC MIỄN PHÍ
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Viewport or Framed Campaign Visual */}
          <div className="lg:col-span-6 relative">
            {viewMode === '3d' ? (
              <Showcase3D onOpenEngraving={onOpenEngraving} />
            ) : (
              <div className="relative rounded-sm border border-white/15 bg-[#120205] shadow-[0_24px_60px_rgba(0,0,0,0.7)] overflow-hidden group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ResilientImage
                    src={HERO_CAMPAIGN_IMAGE}
                    alt="YSL Holiday Show Haute Couture 2026"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#100205] via-black/25 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute left-6 bottom-6 right-6 pointer-events-none">
                    <div className="font-serif text-[11px] tracking-[0.24em] uppercase text-[#d4af37]">
                      YVES SAINT LAURENT BEAUTÉ
                    </div>
                    <div className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-white mt-1">
                      YSL Holiday Show
                    </div>
                    <div className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#e9e0e2]/90 mt-1">
                      SẮC ĐỎ THỜI THƯỢNG MÙA LỄ HỘI 2026
                    </div>
                  </div>
                </div>

                {/* Bottom Pop-Up Appointment Strip */}
                <div className="bg-[#0b0103] border-t border-white/10 px-5 sm:px-6 py-4 flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-full border border-[#d4af37]/40 bg-[#1e040a] flex items-center justify-center shrink-0 text-[#d4af37]">
                      <Sparkles className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-[13px] font-semibold text-white truncate">
                        Dạ Tiệc Noël Pop-up Độc Quyền
                      </div>
                      <div className="text-[11px] text-[#d0c5af]/80 truncate">
                        Tầng 1, Vincom Center Đồng Khởi, Q.1 • Trải nghiệm dịch vụ VIP
                      </div>
                    </div>
                  </div>

                  <a
                    href="#rsvp"
                    className="rounded-sm border border-[#d4af37]/50 bg-[#1a0308] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#0b0103] transition-all px-4 py-2.5 text-[10px] font-bold tracking-[0.16em] uppercase whitespace-nowrap shrink-0 shadow-sm"
                  >
                    ĐẶT HẸN VIP
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
