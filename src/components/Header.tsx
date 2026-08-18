import React, { useState } from 'react';
import { Menu, X, Globe, CircleUserRound } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'HOME', href: '#top' },
  { label: 'G1NULL EVENTS', href: '#events' },
  { label: 'LIVE & VIDEO', href: '#latest-g1null' },
  { label: 'PARTNERSHIPS', href: '#partnerships' }
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href === '#top') {
      e.preventDefault();
      const behavior = document.documentElement.classList.contains('smooth-scroll-active') ? 'auto' : 'smooth';
      window.scrollTo({ top: 0, behavior });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header id="header-section" className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Left: Logo + Brand Name */}
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, '#top')}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#25D9F8] to-[#18C4E2] flex items-center justify-center font-heading font-black text-sm text-[#080A0D] group-hover:scale-105 transition-transform">
              G1
            </div>
            <span className="font-heading font-black text-xl tracking-tight text-[#F5F7FA] group-hover:text-[#25D9F8] transition-colors">
              g1<span className="text-[#25D9F8]">NULL</span>
            </span>
          </a>

          {/* Main Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-heading font-bold uppercase tracking-wider text-[#8B95A5]">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="hover:text-[#25D9F8] transition-colors py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Language + Profile */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              id="header-language-btn"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[#8B95A5] hover:text-[#F5F7FA] hover:bg-[#11161D] transition-colors cursor-pointer"
              aria-label="Language selector"
            >
              <Globe className="w-4 h-4" />
              <span className="text-[11px] font-mono font-semibold uppercase">EN</span>
            </button>

            <button
              type="button"
              id="header-profile-btn"
              className="w-9 h-9 rounded-lg text-[#8B95A5] hover:text-[#F5F7FA] hover:bg-[#11161D] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Profile"
            >
              <CircleUserRound className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#8B95A5] hover:text-[#F5F7FA] hover:bg-[#11161D] focus:outline-none"
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
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="block py-2 text-xs uppercase font-heading font-bold tracking-wider text-[#8B95A5] hover:text-[#25D9F8]"
            >
              {item.label}
            </a>
          ))}

          <div className="pt-3 flex items-center justify-between text-xs text-[#8B95A5]">
            <button
              type="button"
              className="flex items-center gap-1.5 hover:text-[#25D9F8] transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Language: EN</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 hover:text-[#25D9F8] transition-colors cursor-pointer"
            >
              <CircleUserRound className="w-4 h-4" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
