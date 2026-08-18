import React from 'react';
import { Youtube, Instagram } from 'lucide-react';

interface FooterProps {
  onOpenTopUp?: (gameId?: string) => void;
}

export default function Footer({ onOpenTopUp }: FooterProps) {
  const handleTopUpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenTopUp) {
      onOpenTopUp('pubg-mobile');
    }
  };

  return (
    <footer id="footer-section" className="border-t border-white/[0.08] bg-[var(--bg-main)] text-[#9CA3AF] text-xs py-10 sm:py-14 pb-24 md:pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-8 sm:mb-10">
          {/* Brand Col */}
          <div className="sm:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-[#25D9F8] flex items-center justify-center font-heading font-black text-[#080A0D] text-base sm:text-lg">
                G1
              </div>
              <span className="text-xl font-heading font-black text-[#F5F7FA] tracking-tight uppercase">
                g1NULL
              </span>
            </div>
            <p className="text-[#9CA3AF] text-xs font-semibold uppercase tracking-wider">
              Follow us on
            </p>

            {/* Social Icons (YouTube, Instagram, TikTok) */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://www.youtube.com/@g1NULL"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Channel"
                className="w-9 h-9 rounded-lg bg-[#11161D] border border-white/[0.08] hover:border-white/[0.22] hover:text-[#F5F7FA] text-[#8B95A5] active:scale-95 flex items-center justify-center transition-all duration-150 cursor-pointer min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-[#25D9F8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A0D]"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-9 h-9 rounded-lg bg-[#11161D] border border-white/[0.08] hover:border-white/[0.22] hover:text-[#F5F7FA] text-[#8B95A5] active:scale-95 flex items-center justify-center transition-all duration-150 cursor-pointer min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-[#25D9F8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A0D]"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Profile"
                className="w-9 h-9 rounded-lg bg-[#11161D] border border-white/[0.08] hover:border-white/[0.22] hover:text-[#F5F7FA] text-[#8B95A5] active:scale-95 flex items-center justify-center transition-all duration-150 cursor-pointer min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-[#25D9F8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A0D]"
              >
                {/* TikTok Icon */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.87-4.49V8.65a8.28 8.28 0 0 0 4.9 1.59V6.82c-.34-.02-.68-.06-1-.13z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Group 1: Platform */}
          <div className="space-y-3">
            <h4 className="font-heading font-extrabold text-[#F5F7FA] text-xs uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#games" className="hover:text-[#25D9F8] transition-colors py-1 inline-block">
                  Games
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-[#25D9F8] transition-colors py-1 inline-block">
                  g1NULL Products
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleTopUpClick}
                  className="hover:text-[#25D9F8] transition-colors text-left cursor-pointer py-1 inline-block"
                >
                  Track Order
                </button>
              </li>
            </ul>
          </div>

          {/* Group 2: Content */}
          <div className="space-y-3">
            <h4 className="font-heading font-extrabold text-[#F5F7FA] text-xs uppercase tracking-wider">
              Content
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#latest-g1null" className="hover:text-[#25D9F8] transition-colors py-1 inline-block">
                  g1NULL Video
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-[#25D9F8] transition-colors py-1 inline-block">
                  Community
                </a>
              </li>
              <li>
                <span className="text-[#9CA3AF] hover:text-[#25D9F8] cursor-pointer transition-colors py-1 inline-block">
                  Partnerships
                </span>
              </li>
            </ul>
          </div>

          {/* Group 3: Help */}
          <div className="space-y-3">
            <h4 className="font-heading font-extrabold text-[#F5F7FA] text-xs uppercase tracking-wider">
              Help
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about-shop" className="hover:text-[#25D9F8] transition-colors py-1 inline-block">
                  About g1NULL Shop
                </a>
              </li>
              <li>
                <a href="#about-shop" className="hover:text-[#25D9F8] transition-colors py-1 inline-block">
                  Payment & Security
                </a>
              </li>
            </ul>
          </div>

          {/* Group 4: Legal */}
          <div className="space-y-3">
            <h4 className="font-heading font-extrabold text-[#F5F7FA] text-xs uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-[#9CA3AF] hover:text-[#F5F7FA] cursor-pointer transition-colors py-1 inline-block">
                  Terms
                </span>
              </li>
              <li>
                <span className="text-[#9CA3AF] hover:text-[#F5F7FA] cursor-pointer transition-colors py-1 inline-block">
                  Privacy
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[#7E8B9F] text-[11px] text-center sm:text-left">
          <p>© {new Date().getFullYear()} g1NULL. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Official G1NULL SHOP</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
