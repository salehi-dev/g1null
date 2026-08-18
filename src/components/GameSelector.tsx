import React, { useState } from 'react';

type GameCategory = 'battle-royale' | 'shooter' | 'action';

interface GameItem {
  id: string;
  name: string;
  category: GameCategory;
  image: string;
}

const gamesList: GameItem[] = [
  { id: 'pubg-mobile', name: 'PUBG MOBILE', category: 'battle-royale', image: '/images/games/pubg-mobile.png' },
  { id: 'free-fire', name: 'FREE FIRE', category: 'battle-royale', image: '/images/games/free-fire.png' },
  { id: 'mobile-legends', name: 'MOBILE LEGENDS', category: 'action', image: '/images/games/mobile-legends.png' },
  { id: 'codm', name: 'CALL OF DUTY: M', category: 'shooter', image: '/images/games/call-of-duty.png' },
  { id: 'delta-force', name: 'DELTA FORCE', category: 'shooter', image: '/images/games/delta-force.png' },
];

const filters: Array<{ id: 'all' | GameCategory; label: string }> = [
  { id: 'all', label: 'ALL GAMES' },
  { id: 'battle-royale', label: 'BATTLE ROYALE' },
  { id: 'shooter', label: 'SHOOTER' },
  { id: 'action', label: 'MOBA / ACTION' },
];

export default function GameSelector() {
  const [activeTab, setActiveTab] = useState<'all' | GameCategory>('all');
  const filteredGames = activeTab === 'all' ? gamesList : gamesList.filter((game) => game.category === activeTab);

  return (
    <section id="games" className="catalog-section catalog-section--games">
      <div className="catalog-container">
        <div className="catalog-heading-row">
          <h2 className="catalog-title">Games</h2>

          <div className="catalog-filters" aria-label="Filter games">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveTab(filter.id)}
                aria-pressed={activeTab === filter.id}
                className={`catalog-filter ${activeTab === filter.id ? 'catalog-filter--active' : ''}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="midas-game-grid">
          {filteredGames.map((game) => (
            <article
              key={game.id}
              id={`game-card-${game.id}`}
              className="midas-tile"
            >
              <div className="midas-tile__media">
                <img
                  src={game.image}
                  alt={`${game.name} artwork`}
                  className="midas-tile__image game-art"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="midas-tile__name">{game.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
