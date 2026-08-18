import React from 'react';
import { Shield, Sparkles, Trophy, Award, Crown, Check } from 'lucide-react';

interface TierLevel {
  level: string;
  name: string;
  badge: string;
  description: string;
  highlights: string[];
  icon: React.ElementType;
  accent: string;
  isPopular?: boolean;
}

const levels: TierLevel[] = [
  {
    level: '01',
    name: 'Rookie',
    badge: 'Starter Tier',
    description: 'Join custom matches, chat in community lobbies, and get instant top-up updates.',
    highlights: [
      'Top-Up Order Tracking',
      'Community Lobbies & Chat',
      'Standard Fulfillment Priority'
    ],
    icon: Shield,
    accent: ''
  },
  {
    level: '02',
    name: 'Ace',
    badge: 'Active Member',
    description: 'For active squad members participating in streams, tournaments, and custom rooms.',
    highlights: [
      'Custom Match Lobby Access',
      'Early Stream Drop Alerts',
      'Faster Status Notifications'
    ],
    icon: Trophy,
    accent: '',
    isPopular: true
  },
  {
    level: '03',
    name: 'Conqueror',
    badge: 'Apex Tier',
    description: 'Top-tier squad perks with direct custom scrim invites and priority support.',
    highlights: [
      'Priority Support Queue',
      'Custom Scrims & Tournament Invites',
      'Apex Role in Discord'
    ],
    icon: Crown,
    accent: ''
  }
];

export default function RewardsCommunity() {
  return (
    <section id="community" className="py-12 sm:py-16 border-b border-white/[0.06] bg-[#0D1117] relative">
      {/* Background Subtle Tactical Grid */}
      <div className="absolute inset-0 bg-tactical-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#11161D] border border-white/[0.08] text-[#25D9F8] text-xs font-semibold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COMMUNITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#F5F7FA] uppercase tracking-tight">
            Join the Community
          </h2>
          <p className="text-sm text-[#9CA3AF] mt-1.5 leading-relaxed">
            Squad up for custom matches, live stream rooms, and competitive perks.
          </p>
        </div>

        {/* 3 Tier Levels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {levels.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                id={`null-club-tier-${item.name.toLowerCase()}`}
                className="relative rounded-xl bg-[#11161D] hover:bg-[#161C24] p-5 sm:p-6 flex flex-col justify-between transition-colors duration-150"
              >
                <div>
                  {/* Top Bar: Icon, Tier badge, Level index */}
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-6 h-6 text-[#25D9F8]" />
                    <div className="flex items-center gap-2">
                      {item.isPopular && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#25D9F8] text-[#080A0D]">
                          Featured
                        </span>
                      )}
                      <span className="font-heading font-bold text-xs text-[#7E8B9F]">
                        LVL {item.level}
                      </span>
                    </div>
                  </div>

                  {/* Level Name & Badge */}
                  <div className="mb-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7E8B9F]">
                      {item.badge}
                    </span>
                    <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#F5F7FA] uppercase tracking-tight">
                      {item.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#9CA3AF] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2 pt-3.5">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                        <Check className="w-3.5 h-3.5 text-[#25D9F8] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtle Concept Status Footer */}
                <div className="mt-6 pt-3 flex items-center justify-between text-[11px] text-[#7E8B9F]">
                  <span className="uppercase font-semibold tracking-wider">Community Tier</span>
                  <span className="text-[#9CA3AF] font-medium">Squad Perks</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
