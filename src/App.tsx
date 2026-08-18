/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import GameSelector from './components/GameSelector';
import G1nullProducts from './components/G1nullProducts';
import LatestFromG1Null from './components/LatestFromG1Null';
import AboutG1nullShop from './components/AboutG1nullShop';
import RewardsCommunity from './components/RewardsCommunity';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import TopUpModal from './components/TopUpModal';
import MobileBottomNav from './components/MobileBottomNav';

export default function App() {
  const [isTopUpOpen, setIsTopUpOpen] = useState<boolean>(false);
  const [selectedGameId, setSelectedGameId] = useState<string>('pubg-mobile');
  const [selectedPackageId, setSelectedPackageId] = useState<string | undefined>(undefined);

  const handleOpenTopUp = (gameId: string = 'pubg-mobile', packageId?: string) => {
    setSelectedGameId(gameId);
    setSelectedPackageId(packageId);
    setIsTopUpOpen(true);
  };

  const handleCloseTopUp = () => {
    setIsTopUpOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#080A0D] text-[#F5F7FA] selection:bg-[#25D9F8] selection:text-[#080A0D] flex flex-col antialiased">
      {/* 1. Header */}
      <Header />

      {/* Main Content Area with Ordered Sections */}
      <main className="flex-1">
        {/* 2. Games */}
        <GameSelector onSelectGame={(gameId) => handleOpenTopUp(gameId)} />

        {/* 3. g1NULL Products */}
        <G1nullProducts />

        {/* 4. g1NULL Video */}
        <LatestFromG1Null />

        {/* 5. About g1NULL Shop */}
        <AboutG1nullShop />

        {/* 6. Rewards / Community */}
        <RewardsCommunity />

        {/* 7. Final CTA */}
        <FinalCTA onOpenTopUp={() => handleOpenTopUp('pubg-mobile')} />
      </main>

      {/* 8. Footer */}
      <Footer onOpenTopUp={(gameId) => handleOpenTopUp(gameId || 'pubg-mobile')} />

      {/* Mobile Sticky Bottom Navigation (Home, Games, Orders, Account) */}
      <MobileBottomNav
        onOpenTopUp={(gameId) => handleOpenTopUp(gameId || 'pubg-mobile')}
        onOpenOrders={() => handleOpenTopUp('pubg-mobile')}
        onOpenAccount={() => {
          const el = document.getElementById('community');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Direct Top-Up Flow Modal */}
      <TopUpModal
        isOpen={isTopUpOpen}
        onClose={handleCloseTopUp}
        initialGameId={selectedGameId}
        initialPackageId={selectedPackageId}
      />
    </div>
  );
}
