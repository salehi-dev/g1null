import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Zap, ShieldCheck, Sparkles, Flame } from 'lucide-react';

interface HeroProps {
  onOpenTopUp?: (gameId?: string) => void;
}

interface BannerSlide {
  id: string;
  tag: string;
  badgeClass: string;
  title: string;
  subtitle: string;
  gameId: string;
  accentGradient: string;
  keyVisual: 'pubgm' | 'g1null' | 'dfm';
}

const slides: BannerSlide[] = [
  {
    id: 'slide-pubgm',
    tag: 'INSTANT TOP-UP',
    badgeClass: 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40',
    title: 'PUBG MOBILE UC',
    subtitle: 'Fast UC recharge directly to your account.',
    gameId: 'pubg-mobile',
    accentGradient: 'from-[#D97706]/30 via-[#B45309]/10 to-transparent',
    keyVisual: 'pubgm'
  },
  {
    id: 'slide-creator',
    tag: 'COMPETITIVE',
    badgeClass: 'bg-[#25D9F8]/20 text-[#25D9F8] border-[#25D9F8]/40',
    title: 'MY SETTINGS & HUD',
    subtitle: 'Sensitivity curves, always-on gyro calibration, and claw layout.',
    gameId: 'pubg-mobile',
    accentGradient: 'from-[#25D9F8]/25 via-[#0EA5E9]/10 to-transparent',
    keyVisual: 'g1null'
  },
  {
    id: 'slide-dfm',
    tag: 'ALL GAMES',
    badgeClass: 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40',
    title: 'DELTA FORCE & MORE',
    subtitle: 'Fast digital delivery across all supported titles.',
    gameId: 'codm',
    accentGradient: 'from-[#10B981]/25 via-[#059669]/10 to-transparent',
    keyVisual: 'dfm'
  }
];

const quickGames = [
  { id: 'pubg-mobile', name: 'PUBG MOBILE', currency: 'UC', iconText: 'PUBGM', color: 'from-[#F59E0B] to-[#D97706]' },
  { id: 'free-fire', name: 'FREE FIRE', currency: 'Diamonds', iconText: 'FF', color: 'from-[#EF4444] to-[#DC2626]' },
  { id: 'mobile-legends', name: 'MLBB', currency: 'Diamonds', iconText: 'MLBB', color: 'from-[#3B82F6] to-[#2563EB]' },
  { id: 'codm', name: 'COD: MOBILE', currency: 'CP', iconText: 'CODM', color: 'from-[#10B981] to-[#059669]' }
];

export default function Hero({ onOpenTopUp }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance banner every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  const handleRechargeClick = (gameId: string) => {
    if (onOpenTopUp) {
      onOpenTopUp(gameId);
    }
  };

  return (
    <section id="hero-section" className="relative border-b border-white/[0.08] bg-[#080A0D] pt-4 sm:pt-6 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Midasbuy-style Billboard Carousel Container */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl border border-white/[0.1] bg-[#0D1117] overflow-hidden min-h-[360px] sm:min-h-[420px] md:min-h-[450px] flex flex-col justify-between">
          {/* Dynamic Background Atmosphere */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.accentGradient} opacity-80 pointer-events-none transition-all duration-700`} />
          <div className="absolute inset-0 bg-tactical-grid opacity-25 pointer-events-none" />

          {/* Banner Main Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center h-full p-6 sm:p-10 md:p-12 gap-8 my-auto">
            {/* Left Content Area */}
            <div className="md:col-span-7 space-y-4 text-left">
              {/* Top Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider bg-[#11161D]">
                <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                <span className={slide.badgeClass}>{slide.tag}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-[#F5F7FA] tracking-tight leading-[1.02] uppercase">
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm md:text-base text-[#9CA3AF] max-w-lg leading-relaxed">
                {slide.subtitle}
              </p>

              {/* Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  id="billboard-recharge-btn"
                  onClick={() => handleRechargeClick(slide.gameId)}
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-[#25D9F8] hover:bg-[#18C4E2] active:scale-[0.98] text-[#080A0D] font-heading font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer"
                >
                  <span>RECHARGE NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#featured"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-[#161C24] hover:bg-[#1C2430] active:scale-[0.98] border border-white/[0.1] text-[#F5F7FA] font-heading font-bold text-xs sm:text-sm uppercase tracking-wider transition-all"
                >
                  <span>VIEW PACKAGES</span>
                </a>
              </div>

              {/* Trust Subtext */}
              <div className="pt-3 flex items-center gap-5 text-xs text-[#8B95A5]">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#25D9F8]" />
                  <span className="font-semibold text-[#D1D5DB]">Instant Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#25D9F8]" />
                  <span className="font-semibold text-[#D1D5DB]">Official UID Credit</span>
                </div>
              </div>
            </div>

            {/* Right Visual Area (Widescreen Artwork Centerpiece - Direct Visual) */}
            <div className="md:col-span-5 flex items-center justify-center relative">
              {slide.keyVisual === 'pubgm' && (
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square flex flex-col items-center justify-center text-center">
                  {/* Large 3D-styled Gold Coin Graphic */}
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#D97706] via-[#F59E0B] to-[#FDE68A] p-[3px] flex items-center justify-center mb-3">
                    <div className="w-full h-full rounded-full bg-gradient-to-b from-[#78350F] to-[#451A03] flex items-center justify-center border border-[#FDE68A]/60">
                      <span className="font-heading font-black text-3xl sm:text-4xl text-[#FEF3C7] tracking-tight">
                        UC
                      </span>
                    </div>
                  </div>
                  <span className="font-heading font-black text-xl sm:text-2xl text-[#F5F7FA] uppercase tracking-wider">
                    PUBG MOBILE
                  </span>
                  <span className="text-xs font-mono text-[#25D9F8] font-bold uppercase tracking-widest mt-1">
                    OFFICIAL TOP-UP
                  </span>
                </div>
              )}

              {slide.keyVisual === 'g1null' && (
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#161C24] border border-[#25D9F8]/60 flex items-center justify-center mb-3">
                    <span className="font-heading font-black text-3xl sm:text-4xl text-[#25D9F8] tracking-wider">
                      g1
                    </span>
                  </div>
                  <span className="font-heading font-black text-xl sm:text-2xl text-[#F5F7FA] uppercase tracking-wider">
                    MY SETUP
                  </span>
                  <span className="text-xs font-mono text-[#8B95A5] uppercase tracking-widest mt-1">
                    120 FPS • GYRO ON
                  </span>
                </div>
              )}

              {slide.keyVisual === 'dfm' && (
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#064E3B]/40 border border-[#10B981]/60 flex items-center justify-center mb-3">
                    <span className="font-heading font-black text-2xl sm:text-3xl text-[#10B981] tracking-wider">
                      DFM
                    </span>
                  </div>
                  <span className="font-heading font-black text-xl sm:text-2xl text-[#F5F7FA] uppercase tracking-wide">
                    DELTA FORCE
                  </span>
                  <span className="text-xs font-mono text-[#6EE7B7] uppercase tracking-widest mt-1">
                    DIRECT CREDITS
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Banner Controls & Dots Footer */}
          <div className="relative z-10 px-6 py-4 bg-[#080A0D] border-t border-white/[0.06] flex items-center justify-between">
            {/* Slide indicators / tabs */}
            <div className="flex items-center gap-2">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentSlide === idx ? 'w-8 bg-[#25D9F8]' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="w-8 h-8 rounded-lg bg-[#11161D] hover:bg-[#161C24] border border-white/[0.08] text-[#8B95A5] hover:text-[#F5F7FA] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="w-8 h-8 rounded-lg bg-[#11161D] hover:bg-[#161C24] border border-white/[0.08] text-[#8B95A5] hover:text-[#F5F7FA] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Midasbuy-style Quick Game Shortcuts Bar */}
        <div className="mt-4 sm:mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
          {quickGames.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => handleRechargeClick(g.id)}
              className="p-3 sm:p-3.5 rounded-xl bg-[#0D1117] hover:bg-[#161C24] transition-all flex items-center gap-3 cursor-pointer group text-left"
            >
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-tr ${g.color} flex items-center justify-center font-heading font-black text-xs text-[#080A0D] shrink-0`}>
                {g.iconText.slice(0, 3)}
              </div>
              <div className="min-w-0">
                <div className="font-heading font-extrabold text-xs sm:text-sm text-[#F5F7FA] truncate uppercase group-hover:text-[#25D9F8] transition-colors">
                  {g.name}
                </div>
                <div className="text-[11px] text-[#8B95A5] truncate font-medium">
                  {g.currency} Recharge
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
