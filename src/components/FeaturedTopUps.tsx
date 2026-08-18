import React, { useState } from 'react';
import { ArrowRight, Sparkles, Check, Flame } from 'lucide-react';

interface PackageItem {
  id: string;
  amount: number;
  bonus?: number;
  currency: string;
  price: string;
  tier: 'tier1' | 'tier2' | 'tier3' | 'tier4' | 'tier5' | 'tier6';
  isPopular?: boolean;
}

const pubgPackages: PackageItem[] = [
  { id: 'uc-60', amount: 60, currency: 'UC', price: '$0.99', tier: 'tier1' },
  { id: 'uc-325', amount: 325, bonus: 25, currency: 'UC', price: '$4.99', tier: 'tier2' },
  { id: 'uc-660', amount: 660, bonus: 60, currency: 'UC', price: '$9.99', tier: 'tier3', isPopular: true },
  { id: 'uc-1800', amount: 1800, bonus: 300, currency: 'UC', price: '$24.99', tier: 'tier4' },
  { id: 'uc-3850', amount: 3850, bonus: 850, currency: 'UC', price: '$49.99', tier: 'tier5' },
  { id: 'uc-8100', amount: 8100, bonus: 2100, currency: 'UC', price: '$99.99', tier: 'tier6', isPopular: true },
];

const freeFirePackages: PackageItem[] = [
  { id: 'ff-100', amount: 100, currency: 'Diamonds', price: '$0.99', tier: 'tier1' },
  { id: 'ff-310', amount: 310, bonus: 30, currency: 'Diamonds', price: '$2.99', tier: 'tier2' },
  { id: 'ff-520', amount: 520, bonus: 60, currency: 'Diamonds', price: '$4.99', tier: 'tier3', isPopular: true },
  { id: 'ff-1060', amount: 1060, bonus: 160, currency: 'Diamonds', price: '$9.99', tier: 'tier4' },
  { id: 'ff-2180', amount: 2180, bonus: 380, currency: 'Diamonds', price: '$19.99', tier: 'tier5' },
  { id: 'ff-5600', amount: 5600, bonus: 1100, currency: 'Diamonds', price: '$49.99', tier: 'tier6' },
];

interface FeaturedTopUpsProps {
  onSelectPackage?: (packageId: string) => void;
}

// Clean, high-impact graphical product illustration for UC / Diamond packs
function CurrencyProductImage({ currency, tier }: { amount: number; currency: string; tier: string }) {
  const isDiamond = currency.toLowerCase().includes('diamond');

  return (
    <div className="w-full aspect-[4/3] flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#161C24] to-[#0D1117]">
      {/* Coin / Gem Graphic Visual - full area integration without inner box frame */}
      {!isDiamond ? (
        /* Gold UC Coin Graphic */
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#D97706] via-[#F59E0B] to-[#FEF08A] p-[2.5px] group-hover:scale-108 transition-transform duration-200 flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#78350F] to-[#451A03] flex items-center justify-center border border-[#FDE68A]/60">
            <span className="font-heading font-black text-xl sm:text-2xl text-[#FEF3C7] tracking-tight">
              UC
            </span>
          </div>
        </div>
      ) : (
        /* Blue Diamond Gem Graphic */
        <div className="w-14 h-14 sm:w-16 sm:h-16 rotate-45 rounded-xl bg-gradient-to-tr from-[#2563EB] via-[#38BDF8] to-[#93C5FD] p-[2.5px] group-hover:scale-108 transition-transform duration-200 flex items-center justify-center">
          <div className="w-full h-full rounded-lg bg-gradient-to-b from-[#1E3A8A] to-[#0F172A] flex items-center justify-center border border-[#BAE6FD]/60">
            <span className="-rotate-45 font-heading font-black text-sm sm:text-base text-[#E0F2FE]">
              DM
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FeaturedTopUps({ onSelectPackage }: FeaturedTopUpsProps) {
  const [selectedGameTab, setSelectedGameTab] = useState<'pubg' | 'freefire'>('pubg');

  const currentPackages = selectedGameTab === 'pubg' ? pubgPackages : freeFirePackages;

  const handlePackageSelect = (pkgId: string) => {
    if (onSelectPackage) {
      onSelectPackage(pkgId);
    }
  };

  return (
    <section id="featured" className="py-12 sm:py-16 border-b border-white/[0.08] bg-[#080A0D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11161D] border border-white/[0.08] text-[#25D9F8] text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TOP-UPS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-[#F5F7FA] uppercase tracking-tight">
              Popular Top-Ups
            </h2>
            <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
              Select a package for fast UID delivery.
            </p>
          </div>

          {/* Game Tabs: PUBG Mobile UC vs Free Fire */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedGameTab('pubg')}
              className={`px-4 py-2 rounded-xl text-xs font-heading font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                selectedGameTab === 'pubg'
                  ? 'bg-[#25D9F8] text-[#080A0D]'
                  : 'bg-[#11161D] text-[#8B95A5] hover:text-[#F5F7FA] border border-white/[0.06]'
              }`}
            >
              PUBG MOBILE UC
            </button>
            <button
              type="button"
              onClick={() => setSelectedGameTab('freefire')}
              className={`px-4 py-2 rounded-xl text-xs font-heading font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                selectedGameTab === 'freefire'
                  ? 'bg-[#25D9F8] text-[#080A0D]'
                  : 'bg-[#11161D] text-[#8B95A5] hover:text-[#F5F7FA] border border-white/[0.06]'
              }`}
            >
              FREE FIRE DIAMONDS
            </button>
          </div>
        </div>

        {/* Clean, Image-First 6-Column Midasbuy Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {currentPackages.map((pkg) => (
            <div
              key={pkg.id}
              id={`package-card-${pkg.id}`}
              onClick={() => handlePackageSelect(pkg.id)}
              className="group relative rounded-xl overflow-hidden bg-[#11161D] border border-white/[0.08] hover:border-[#25D9F8]/60 hover:bg-[#161C24] transition-all duration-150 ease-out cursor-pointer flex flex-col justify-between"
            >
              {/* Popular Badge */}
              {pkg.isPopular && (
                <div className="absolute top-2 right-2 z-20 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#25D9F8] text-[#080A0D] text-[9px] font-heading font-black uppercase tracking-wider">
                  <Flame className="w-2.5 h-2.5 fill-current" />
                  <span>HOT</span>
                </div>
              )}

              {/* 1. Full-Width Product Graphic */}
              <CurrencyProductImage amount={pkg.amount} currency={pkg.currency} tier={pkg.tier} />

              {/* 2. Amount & Price */}
              <div className="p-3.5 pt-2 text-center flex-1 flex flex-col justify-between">
                <div className="my-1">
                  <div className="font-heading font-black text-lg sm:text-xl text-[#F5F7FA] tracking-tight group-hover:text-[#25D9F8] transition-colors">
                    {pkg.amount.toLocaleString()} <span className="text-xs font-bold text-[#25D9F8]">{pkg.currency}</span>
                  </div>
                  <div className="text-xs font-bold text-[#9CA3AF] mt-0.5">
                    {pkg.price}
                  </div>
                </div>

                {/* 3. High-Contrast Direct TOP UP Button */}
                <button
                  type="button"
                  id={`select-btn-${pkg.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePackageSelect(pkg.id);
                  }}
                  className="w-full mt-2.5 py-2 px-2 rounded-lg font-heading font-black text-xs uppercase tracking-wider transition-all duration-150 flex items-center justify-center cursor-pointer bg-[#161C24] text-[#F5F7FA] border border-white/[0.08] group-hover:bg-[#25D9F8] group-hover:text-[#080A0D] group-hover:border-[#25D9F8] active:scale-[0.98]"
                >
                  TOP UP
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
