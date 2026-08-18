import React from 'react';
import { Home, Gamepad2, PackageCheck, User } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenTopUp?: (gameId?: string) => void;
  onOpenOrders?: () => void;
  onOpenAccount?: () => void;
}

export default function MobileBottomNav({
  onOpenTopUp,
  onOpenOrders,
  onOpenAccount
}: MobileBottomNavProps) {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="mobile-bottom-navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080A0D] border-t border-white/[0.08] px-2 py-1.5 pb-safe"
    >
      <div className="grid grid-cols-4 items-center max-w-md mx-auto">
        {/* 1. Home */}
        <button
          type="button"
          id="mobile-nav-home"
          onClick={() => scrollToSection('hero-section')}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-lg text-[#8B95A5] hover:text-[#25D9F8] active:text-[#25D9F8] active:scale-95 transition-all duration-150 min-h-[48px] focus-visible:ring-1 focus-visible:ring-[#25D9F8]"
        >
          <Home className="w-5 h-5 mb-1 shrink-0" />
          <span className="text-[10px] font-semibold uppercase tracking-wider leading-none">
            Home
          </span>
        </button>

        {/* 2. Games */}
        <button
          type="button"
          id="mobile-nav-games"
          onClick={() => scrollToSection('games')}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-lg text-[#8B95A5] hover:text-[#25D9F8] active:text-[#25D9F8] active:scale-95 transition-all duration-150 min-h-[48px] focus-visible:ring-1 focus-visible:ring-[#25D9F8]"
        >
          <Gamepad2 className="w-5 h-5 mb-1 shrink-0" />
          <span className="text-[10px] font-semibold uppercase tracking-wider leading-none">
            Games
          </span>
        </button>

        {/* 3. Orders */}
        <button
          type="button"
          id="mobile-nav-orders"
          onClick={() => {
            if (onOpenOrders) {
              onOpenOrders();
            } else {
              scrollToSection('how-it-works');
            }
          }}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-lg text-[#8B95A5] hover:text-[#25D9F8] active:text-[#25D9F8] active:scale-95 transition-all duration-150 min-h-[48px] focus-visible:ring-1 focus-visible:ring-[#25D9F8]"
        >
          <PackageCheck className="w-5 h-5 mb-1 shrink-0" />
          <span className="text-[10px] font-semibold uppercase tracking-wider leading-none">
            Orders
          </span>
        </button>

        {/* 4. Account */}
        <button
          type="button"
          id="mobile-nav-account"
          onClick={() => {
            if (onOpenAccount) {
              onOpenAccount();
            } else {
              scrollToSection('community');
            }
          }}
          className="flex flex-col items-center justify-center py-1 px-1 rounded-lg text-[#8B95A5] hover:text-[#25D9F8] active:text-[#25D9F8] active:scale-95 transition-all duration-150 min-h-[48px] focus-visible:ring-1 focus-visible:ring-[#25D9F8]"
        >
          <User className="w-5 h-5 mb-1 shrink-0" />
          <span className="text-[10px] font-semibold uppercase tracking-wider leading-none">
            Account
          </span>
        </button>
      </div>
    </div>
  );
}
