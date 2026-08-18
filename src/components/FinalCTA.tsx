import React from 'react';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface FinalCTAProps {
  onOpenTopUp?: () => void;
}

export default function FinalCTA({ onOpenTopUp }: FinalCTAProps) {
  const handleChooseGame = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenTopUp) {
      onOpenTopUp();
    }
  };

  return (
    <section id="final-cta" className="relative py-12 sm:py-16 border-b border-white/[0.06] bg-[#080A0D] overflow-hidden">
      {/* Tactical Ambient Glow */}
      <div className="absolute inset-0 bg-tactical-grid opacity-15 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Main Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#F5F7FA] tracking-tight uppercase mb-3">
          Ready to Top Up?
        </h2>

        {/* Supporting text */}
        <p className="text-sm sm:text-base text-[#9CA3AF] max-w-xl mx-auto mb-7 leading-relaxed font-medium">
          Top up. Gear up. Get back in.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3.5">
          <button
            type="button"
            id="final-cta-choose-game-btn"
            onClick={handleChooseGame}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#25D9F8] hover:bg-[#18C4E2] active:scale-[0.98] text-[#080A0D] font-bold text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#25D9F8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A0D]"
          >
            <span>CHOOSE A GAME</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#products"
            id="final-cta-products-btn"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#11161D] hover:bg-[#161C24] active:scale-[0.98] border border-white/[0.08] hover:border-white/[0.18] text-[#F5F7FA] font-semibold text-xs uppercase tracking-wider transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#25D9F8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A0D]"
          >
            <span>SHOP PRODUCTS</span>
          </a>
        </div>

        {/* Sub-bar highlights */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#8B95A5]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#25D9F8]" />
            <span className="text-[#D1D5DB]">Direct Account Fulfillment</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#25D9F8]" />
            <span className="text-[#D1D5DB]">Fast Digital Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
}
