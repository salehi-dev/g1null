import React, { useState } from 'react';
import { Menu, X, ArrowRight, Globe, Search, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenTopUp?: () => void;
}

export default function Header({ onOpenTopUp }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTopUpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenTopUp) {
      onOpenTopUp();
    }
  };

  return (
    <header id="header-section" className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#080A0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand: Clean Midasbuy-styled g1NULL Wordmark */}
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#25D9F8] to-[#18C4E2] flex items-center justify-center font-heading font-black text-sm text-[#080A0D] group-hover:scale-105 transition-transform">
                G1
              </div>
              <span className="font-heading font-black text-xl tracking-tight text-[#F5F7FA] group-hover:text-[#25D9F8] transition-colors">
                g1<span className="text-[#25D9F8]">NULL</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-xs font-heading font-bold uppercase tracking-wider text-[#8B95A5]">
              <a href="#games" className="hover:text-[#25D9F8] transition-colors py-1">
                GAMES
              </a>
              <a href="#featured" className="hover:text-[#25D9F8] transition-colors py-1">
                TOP-UPS
              </a>
              <a href="#setup" className="hover:text-[#25D9F8] transition-colors py-1">
                MY SETUP
              </a>
              <a href="#latest-g1null" className="hover:text-[#25D9F8] transition-colors py-1">
                VIDEOS
              </a>
              <a href="#community" className="hover:text-[#25D9F8] transition-colors py-1">
                COMMUNITY
              </a>
              <a href="#trust-benefits" className="hover:text-[#25D9F8] transition-colors py-1">
                SUPPORT
              </a>
            </nav>
          </div>

          {/* Desktop Right Controls (Region + Track Order + Top Up) */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Global Region & Currency indicator */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#11161D] border border-white/[0.06] text-[11px] font-mono font-medium text-[#8B95A5]">
              <Globe className="w-3.5 h-3.5 text-[#25D9F8]" />
              <span>GLOBAL / USD</span>
            </div>

            <button
              type="button"
              id="header-track-order-btn"
              onClick={handleTopUpClick}
              className="px-3.5 py-2 rounded-lg text-xs font-heading font-bold uppercase tracking-wider text-[#8B95A5] hover:text-[#F5F7FA] hover:bg-[#11161D] border border-white/[0.06] hover:border-white/[0.14] active:scale-[0.98] transition-all cursor-pointer"
            >
              TRACK ORDER
            </button>

            <button
              type="button"
              id="header-topup-btn"
              onClick={handleTopUpClick}
              className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-lg bg-[#25D9F8] hover:bg-[#18C4E2] active:scale-[0.97] text-[#080A0D] font-heading font-extrabold text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer"
            >
              <span>TOP UP NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              id="header-topup-btn-mobile"
              onClick={handleTopUpClick}
              className="sm:hidden px-3 py-1.5 rounded-lg bg-[#25D9F8] text-[#080A0D] font-heading font-extrabold text-xs uppercase tracking-wider"
            >
              TOP UP
            </button>
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#8B95A5] hover:text-[#F5F7FA] hover:bg-[#11161D] focus:outline-none border border-white/[0.06]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/[0.08] bg-[#0D1117] px-4 pt-3 pb-6 space-y-2.5 animate-fade-in">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06] text-xs text-[#8B95A5]">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#25D9F8]" />
              <span>Global / USD</span>
            </div>
            <div className="flex items-center gap-1 text-[#25D9F8]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Top-Up</span>
            </div>
          </div>

          <a
            href="#games"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs uppercase font-heading font-bold tracking-wider text-[#8B95A5] hover:text-[#25D9F8]"
          >
            GAMES
          </a>
          <a
            href="#featured"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs uppercase font-heading font-bold tracking-wider text-[#8B95A5] hover:text-[#25D9F8]"
          >
            TOP-UPS
          </a>
          <a
            href="#setup"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs uppercase font-heading font-bold tracking-wider text-[#8B95A5] hover:text-[#25D9F8]"
          >
            MY SETUP
          </a>
          <a
            href="#latest-g1null"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs uppercase font-heading font-bold tracking-wider text-[#8B95A5] hover:text-[#25D9F8]"
          >
            VIDEOS
          </a>
          <a
            href="#community"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs uppercase font-heading font-bold tracking-wider text-[#8B95A5] hover:text-[#25D9F8]"
          >
            COMMUNITY
          </a>
          <a
            href="#trust-benefits"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs uppercase font-heading font-bold tracking-wider text-[#8B95A5] hover:text-[#25D9F8]"
          >
            SUPPORT
          </a>

          <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-2">
            <button
              type="button"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleTopUpClick(e);
              }}
              className="block w-full text-center py-2.5 rounded-lg bg-[#161C24] border border-white/[0.08] text-xs uppercase font-heading font-bold tracking-wider text-[#F5F7FA] cursor-pointer"
            >
              TRACK ORDER
            </button>
            <button
              type="button"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleTopUpClick(e);
              }}
              className="block w-full text-center py-2.5 rounded-lg bg-[#25D9F8] text-[#080A0D] font-heading font-black text-xs uppercase tracking-wider cursor-pointer"
            >
              TOP UP NOW
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
