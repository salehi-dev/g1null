import React, { useState } from 'react';
import { ArrowRight, Flame, Sparkles, Trophy } from 'lucide-react';

interface GameItem {
  id: string;
  name: string;
  category: 'battle-royale' | 'shooter' | 'action';
  currency: string;
  code: string;
  subtitle: string;
  gradient: string;
  accentColor: string;
  badge?: string;
  badgeColor?: string;
}

const gamesList: GameItem[] = [
  {
    id: 'pubg-mobile',
    name: 'PUBG MOBILE',
    category: 'battle-royale',
    currency: 'UC',
    code: 'PUBGM',
    subtitle: 'Royale Pass & Unknown Cash',
    gradient: 'from-[#F59E0B]/30 via-[#D97706]/15 to-[#080A0D]',
    accentColor: '#F59E0B',
    badge: 'MOST POPULAR',
    badgeColor: 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/40'
  },
  {
    id: 'free-fire',
    name: 'FREE FIRE',
    category: 'battle-royale',
    currency: 'Diamonds',
    code: 'FF',
    subtitle: 'Elite Pass & Top-Up Events',
    gradient: 'from-[#EF4444]/30 via-[#DC2626]/15 to-[#080A0D]',
    accentColor: '#EF4444',
    badge: 'HOT',
    badgeColor: 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/40'
  },
  {
    id: 'mobile-legends',
    name: 'MOBILE LEGENDS',
    category: 'action',
    currency: 'Diamonds',
    code: 'MLBB',
    subtitle: 'Starlight Member & Skins',
    gradient: 'from-[#3B82F6]/30 via-[#2563EB]/15 to-[#080A0D]',
    accentColor: '#3B82F6',
    badge: 'OFFICIAL',
    badgeColor: 'bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/40'
  },
  {
    id: 'codm',
    name: 'CALL OF DUTY: M',
    category: 'shooter',
    currency: 'CP',
    code: 'CODM',
    subtitle: 'Battle Pass & COD Points',
    gradient: 'from-[#10B981]/30 via-[#059669]/15 to-[#080A0D]',
    accentColor: '#10B981',
    badge: 'INSTANT',
    badgeColor: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/40'
  }
];

interface GameSelectorProps {
  onSelectGame?: (gameId: string) => void;
}

export default function GameSelector({ onSelectGame }: GameSelectorProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'battle-royale' | 'shooter' | 'action'>('all');

  const filteredGames = activeTab === 'all' 
    ? gamesList 
    : gamesList.filter((g) => g.category === activeTab);

  const handleCardClick = (gameId: string) => {
    if (onSelectGame) {
      onSelectGame(gameId);
    }
  };

  return (
    <section id="games" className="py-12 sm:py-16 border-b border-white/[0.08] bg-[#0D1117] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#11161D] border border-white/[0.08] text-[#25D9F8] text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SUPPORTED TITLES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-[#F5F7FA] uppercase tracking-tight">
              Choose Your Game
            </h2>
            <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
              Select a game to top up directly to your UID.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'ALL GAMES' },
              { id: 'battle-royale', label: 'BATTLE ROYALE' },
              { id: 'shooter', label: 'SHOOTER' },
              { id: 'action', label: 'MOBA / ACTION' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#25D9F8] text-[#080A0D]'
                    : 'bg-[#11161D] text-[#8B95A5] hover:text-[#F5F7FA] border border-white/[0.06] hover:border-white/[0.14]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Midasbuy-styled Game Poster Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              id={`game-card-${game.id}`}
              onClick={() => handleCardClick(game.id)}
              className="group relative rounded-xl overflow-hidden bg-[#11161D] border border-white/[0.08] hover:border-[#25D9F8]/60 hover:bg-[#161C24] transition-all duration-150 ease-out cursor-pointer flex flex-col justify-between"
            >
              {/* Poster Art Container (Full-bleed at top) */}
              <div className={`relative w-full aspect-[16/10] bg-gradient-to-b ${game.gradient} flex flex-col items-center justify-center p-6 overflow-hidden`}>
                {/* Background Grid Accent */}
                <div className="absolute inset-0 bg-tactical-grid opacity-20 pointer-events-none" />

                {/* Badge Tag */}
                {game.badge && (
                  <div className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[9px] font-heading font-black uppercase tracking-wider z-10 ${game.badgeColor}`}>
                    {game.badge}
                  </div>
                )}

                {/* Direct High-Contrast Game Typography / Monogram (no inner framed box) */}
                <div className="relative z-10 text-center">
                  <span className="font-heading font-black text-3xl sm:text-4xl text-[#F5F7FA] group-hover:text-[#25D9F8] transition-colors tracking-wider drop-none">
                    {game.code}
                  </span>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#25D9F8] font-bold mt-1">
                    {game.currency} STORE
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#F5F7FA] uppercase tracking-tight group-hover:text-[#25D9F8] transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-xs text-[#8B95A5] mt-0.5 line-clamp-1">
                    {game.subtitle}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs font-mono font-medium text-[#8B95A5]">
                    {game.currency} Top-Up
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-heading font-extrabold uppercase tracking-wider text-[#25D9F8] group-hover:text-[#18C4E2] transition-colors">
                    <span>RECHARGE</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

