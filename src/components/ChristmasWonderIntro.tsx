import { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowRight, Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface ChristmasWonderIntroProps {
  onEnterMainPage: () => void;
}

const TOTAL_FRAMES = 327;

export function ChristmasWonderIntro({ onEnterMainPage }: ChristmasWonderIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadPercent, setLoadPercent] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showExitPortal, setShowExitPortal] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(1);
  const isMobileRef = useRef(false);

  useEffect(() => {
    isMobileRef.current = /Mobi|Android|iPhone/i.test(navigator.userAgent);
    const subfolder = isMobileRef.current ? 'mobile' : 'images-v2';

    const getFrameUrl = (index: number) =>
      `https://raw.githubusercontent.com/stefanvelikov/agota-christmas/main/${subfolder}/image_${index}.webp`;

    const images: HTMLImageElement[] = [];
    imagesRef.current = images;

    const initialFramesToLoad = 35;
    let loadedInitialCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);

      if (i <= initialFramesToLoad) {
        img.onload = () => {
          loadedInitialCount++;
          const pct = Math.min(100, Math.round((loadedInitialCount / initialFramesToLoad) * 100));
          setLoadPercent(pct);
          if (loadedInitialCount === initialFramesToLoad) {
            setTimeout(() => {
              setIsLoading(false);
              renderFrame(1);
            }, 300);
          }
        };
        img.onerror = () => {
          loadedInitialCount++;
          if (loadedInitialCount === initialFramesToLoad) {
            setIsLoading(false);
            renderFrame(1);
          }
        };
      }
      images.push(img);
    }

    const timeout = setTimeout(() => {
      setIsLoading(false);
      renderFrame(1);
    }, 4500);

    return () => clearTimeout(timeout);
  }, []);

  // Canvas drawing function that fits the frame like object-cover
  const renderFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const hRatio = cw / iw;
    const vRatio = ch / ih;
    const ratio = Math.max(hRatio, vRatio);

    const nw = iw * ratio;
    const nh = ih * ratio;
    const nx = (cw - nw) / 2;
    const ny = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, nx, ny, nw, nh);
  };

  // Handle Canvas Resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrameRef.current);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [isLoading]);

  // Handle Scroll Progress Mapping to 327 Frames
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      setScrollProgress(Math.round(progress * 100));

      // Map progress [0, 1] to frame [1, TOTAL_FRAMES]
      const frame = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.floor(progress * (TOTAL_FRAMES - 1)) + 1)
      );

      if (frame !== currentFrameRef.current) {
        currentFrameRef.current = frame;
        renderFrame(frame);
      }

      // Khi đến trước cửa cabin (từ frame 265 hoặc progress >= 80%):
      // Hiện ngay khung chào mừng và nút truy cập trang chính YSL!
      setShowExitPortal(progress >= 0.80 || frame >= 265);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount in case already scrolled
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#070103] text-white">
      {/* 1. CINEMATIC PRELOADER SCREEN */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-[#070103] flex flex-col items-center justify-center p-6 select-none">
          <div className="relative mb-8 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border border-[#d4af37]/40 bg-[#140206] flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.35)] animate-pulse">
              <Sparkles className="w-10 h-10 text-[#d4af37]" />
            </div>
            <div className="absolute inset-0 rounded-full border border-[#d4af37]/60 animate-ping opacity-30" />
          </div>

          <div className="text-center space-y-2 mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl tracking-[0.22em] uppercase font-bold text-white">
              PARIS NOËL 3D WONDERLAND
            </h2>
            <p className="text-xs sm:text-sm tracking-[0.25em] text-[#d4af37] uppercase font-medium">
              3D CINEMATIC SCROLL EXPERIENCE
            </p>
          </div>

          <div className="w-64 sm:w-80 space-y-2">
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden border border-white/15">
              <div
                className="h-full bg-gradient-to-r from-[#d4af37] via-[#fff5d6] to-[#d4af37] transition-all duration-100 ease-out shadow-[0_0_12px_rgba(212,175,55,0.9)]"
                style={{ width: `${loadPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] font-mono text-[#d0c5af]">
              <span>KHỞI TẠO KHUNG CẢNH 3D</span>
              <span className="font-bold text-white tabular-nums">{loadPercent}%</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onEnterMainPage}
            className="mt-12 text-xs tracking-[0.2em] uppercase text-white/60 hover:text-[#d4af37] transition-colors underline cursor-pointer"
          >
            Bỏ qua &amp; Vào thẳng trang chính →
          </button>
        </div>
      )}

      {/* 2. FIXED CANVAS VIEWPORT (Always pinned to screen) */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-[#070103]/60 pointer-events-none" />
      </div>

      {/* 3. FLOATING HUD HEADER */}
      <div className="fixed top-0 left-0 right-0 z-30 px-6 sm:px-12 py-5 flex items-center justify-between pointer-events-auto backdrop-blur-md bg-gradient-to-b from-[#070103]/85 to-transparent border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#d4af37]/40 bg-[#160307] flex items-center justify-center text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.25)]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-serif text-[14px] sm:text-[15px] font-bold tracking-[0.16em] uppercase text-white">
              FuongYSLComestic
            </div>
            <div className="text-[9.5px] font-medium tracking-[0.22em] text-[#d4af37] uppercase">
              NOËL 3D WONDER SCROLL
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            aria-label={isAudioMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            className="p-2.5 rounded-full border border-white/20 bg-[#140307]/80 text-[#e9e0e2] hover:text-[#d4af37] transition-colors cursor-pointer shadow-md"
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#d4af37]" />}
          </button>

          <button
            type="button"
            onClick={onEnterMainPage}
            className="px-4 sm:px-5 py-2.5 rounded-sm bg-white/10 hover:bg-white text-white hover:text-[#090103] border border-white/30 text-[10.5px] sm:text-[11px] uppercase tracking-[0.16em] font-bold transition-all cursor-pointer backdrop-blur-md shadow-md"
          >
            VÀO TRANG CHÍNH →
          </button>
        </div>
      </div>

      {/* 4. SCROLL TRACK (400vh for ultra-smooth 327-frame scrubbing) */}
      <div className="relative w-full h-[400vh] z-10 pointer-events-none">
        {/* Intro Card at Start (0% - 20%) */}
        <div className="h-screen flex flex-col justify-center items-center text-center px-6">
          <div
            className={`max-w-xl space-y-4 bg-[#090103]/80 p-6 sm:p-8 rounded-sm border border-[#d4af37]/35 backdrop-blur-xl shadow-2xl pointer-events-auto transition-opacity duration-500 ${
              scrollProgress > 25 ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-[#d4af37] block">
              PARIS CHRISTMAS GALA 2026
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-white">
              Hành Trình <span className="italic gold-gradient-text">Xứ Sở Băng Tuyết</span>
            </h1>
            <p className="text-xs sm:text-[14px] text-[#e9e0e2]/90 leading-relaxed font-light">
              Cuộn chuột xuống để bắt đầu hành trình bay qua rừng thông tuyết trắng, tiến về cánh cửa dạ tiệc YSL Beauté.
            </p>
            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] tracking-widest text-[#d4af37] uppercase font-bold animate-bounce">
              <span>CUỘN ĐỂ KHÁM PHÁ</span>
              <span>↓</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. KHUNG TRUY CẬP VÀO TRANG CHÍNH YSL (HIỆN TRỰC TIẾP NGAY TẠI CÁNH CỬA) */}
      <div
        className={`fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 transition-all duration-700 pointer-events-none ${
          showExitPortal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="max-w-md sm:max-w-xl w-full bg-[#0d0104]/94 p-7 sm:p-10 rounded-sm border border-[#d4af37]/80 backdrop-blur-2xl shadow-[0_25px_90px_rgba(0,0,0,0.95)] text-center space-y-5 pointer-events-auto relative ring-1 ring-[#d4af37]/30">
          {/* Ornate Gold Corner Markers */}
          <span className="absolute top-2 left-2 text-[10px] text-[#d4af37]/70 select-none">✦</span>
          <span className="absolute top-2 right-2 text-[10px] text-[#d4af37]/70 select-none">✦</span>
          <span className="absolute bottom-2 left-2 text-[10px] text-[#d4af37]/70 select-none">✦</span>
          <span className="absolute bottom-2 right-2 text-[10px] text-[#d4af37]/70 select-none">✦</span>

          {/* Golden Ambient Outer Glow matching the doorway beam */}
          <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-[#d4af37]/30 via-[#fff5d6]/20 to-[#d4af37]/30 blur-md pointer-events-none -z-10 animate-pulse" />

          {/* Sparkles Emblem */}
          <div className="w-14 h-14 rounded-full border border-[#d4af37]/80 bg-[#1c0308] flex items-center justify-center text-[#d4af37] mx-auto shadow-[0_0_35px_rgba(212,175,55,0.6)]">
            <Sparkles className="w-7 h-7 text-[#d4af37] animate-pulse" />
          </div>

          {/* Title & Brand */}
          <div className="space-y-1.5 relative z-10">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-[#d4af37] block">
              ✦ CÁNH CỬA DẠ TIỆC ĐÃ MỞ • NOËL PARIS 2026 ✦
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal leading-tight">
              Chào Mừng Quý Khách Đến <br />
              <span className="italic gold-gradient-text font-serif">FuongYSLComestic Gala</span>
            </h2>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-[13.5px] text-[#f0e6e8]/90 leading-relaxed font-light relative z-10 max-w-lg mx-auto">
            Quý khách đã đến đích của hành trình tuyết trắng. Cánh cửa hoàng gia đã mở — hãy bước vào để khám phá kiệt tác 3D tương tác 360°, bộ sưu tập quà tặng Giáng sinh và nhận đặc quyền VIP.
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pb-1 relative z-10 text-[10.5px] font-medium tracking-wider text-[#d4af37]/90 uppercase">
            <span className="px-2.5 py-1 rounded-xs bg-[#24060d]/80 border border-[#d4af37]/30 backdrop-blur-sm">
              ✦ 3D Flacon Obsidian Noir
            </span>
            <span className="px-2.5 py-1 rounded-xs bg-[#24060d]/80 border border-[#d4af37]/30 backdrop-blur-sm">
              ✦ Son Nhung The Inks Vinyl
            </span>
            <span className="px-2.5 py-1 rounded-xs bg-[#24060d]/80 border border-[#d4af37]/30 backdrop-blur-sm">
              ✦ Khắc Laser Bạc 24K
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
            <button
              type="button"
              onClick={onEnterMainPage}
              className="w-full sm:w-auto gold-gradient-btn px-8 py-4 rounded-sm text-xs font-bold tracking-[0.2em] uppercase text-[#090103] flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>VÀO TRANG CHÍNH YSL</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full sm:w-auto px-5 py-3.5 rounded-sm border border-white/25 hover:border-white/60 text-[#e9e0e2] hover:text-white text-[11px] uppercase tracking-wider font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-black/40 hover:bg-black/60 backdrop-blur-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xem lại từ đầu</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6. JOURNEY PROGRESS BAR ON RIGHT EDGE */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-2.5 pointer-events-none">
        <div className="text-[9px] font-mono tracking-wider text-[#d4af37] rotate-90 origin-center mb-6 uppercase">
          JOURNEY
        </div>
        <div className="w-1 h-32 bg-white/10 rounded-full overflow-hidden border border-white/15">
          <div
            className="w-full bg-[#d4af37] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(212,175,55,0.8)]"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
        <span className="text-[10px] font-mono text-white/80 tabular-nums">
          {scrollProgress}%
        </span>
      </div>
    </div>
  );
}
