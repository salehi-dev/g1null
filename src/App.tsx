/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Header from './components/Header';
import GameSelector from './components/GameSelector';
import G1nullProducts from './components/G1nullProducts';
import LatestFromG1Null from './components/LatestFromG1Null';
import AboutG1nullShop from './components/AboutG1nullShop';
import RewardsCommunity from './components/RewardsCommunity';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[#F5F7FA] selection:bg-[#25D9F8] selection:text-[#080A0D] flex flex-col antialiased">
      {/* 1. Header */}
      <Header />

      <SmoothScroll>
        {/* Main Content Area with Ordered Sections */}
        <main className="flex-1">
          {/* 2. Games */}
          <GameSelector />

          {/* 3. g1NULL Products */}
          <G1nullProducts />

          {/* 4. g1NULL Video */}
          <LatestFromG1Null />

          {/* 5. About g1NULL Shop */}
          <AboutG1nullShop />

          {/* 6. Rewards / Community */}
          <RewardsCommunity />

          {/* 7. Final CTA */}
          <FinalCTA />
        </main>

        {/* 8. Footer */}
        <Footer />
      </SmoothScroll>
    </div>
  );
}
