import React, { useState } from 'react';

type GameCategory = 'battle-royale' | 'shooter' | 'action';

interface GameItem {
  id: string;
  name: string;
  category: GameCategory;
  artworkClass: string;
}

const gamesList: GameItem[] = [
  { id: 'pubg-mobile', name: 'PUBG MOBILE', category: 'battle-royale', artworkClass: 'game-art--pubg' },
  { id: 'free-fire', name: 'FREE FIRE', category: 'battle-royale', artworkClass: 'game-art--free-fire' },
  { id: 'mobile-legends', name: 'MOBILE LEGENDS', category: 'action', artworkClass: 'game-art--mlbb' },
  { id: 'codm', name: 'CALL OF DUTY: M', category: 'shooter', artworkClass: 'game-art--codm' },
];

const filters: Array<{ id: 'all' | GameCategory; label: string }> = [
  { id: 'all', label: 'ALL GAMES' },
  { id: 'battle-royale', label: 'BATTLE ROYALE' },
  { id: 'shooter', label: 'SHOOTER' },
  { id: 'action', label: 'MOBA / ACTION' },
];

function GameArtwork({ game }: { game: GameItem }) {
  return (
    <div className={`game-art ${game.artworkClass}`} role="img" aria-label={`${game.name} artwork`}>
      <svg viewBox="0 0 320 300" aria-hidden="true" focusable="false">
        <circle className="game-art__sun" cx="248" cy="64" r="88" />
        <path className="game-art__terrain" d="M0 236 72 187l50 20 65-67 133 83v77H0Z" />
        {game.id === 'pubg-mobile' && (
          <>
            <path className="game-art__figure" d="M130 264c3-45 9-77 27-94l-10-35c-3-12 2-22 13-29l17-10 22 6 12 23-8 45c20 18 29 52 33 94Z" />
            <path className="game-art__detail" d="M151 112c6-23 48-28 61-2l-3 14h-62Z" />
            <path className="game-art__detail" d="m158 127 49 0-8 14-38 0Z" />
          </>
        )}
        {game.id === 'free-fire' && (
          <>
            <path className="game-art__flare" d="M168 268c-49-42-30-88 2-116-4 27 16 31 21 8 5-21-2-42 16-63 10 29 54 50 39 98-10 34-34 61-78 73Z" />
            <path className="game-art__figure" d="M112 271c4-42 14-76 42-96l8-40 25-22 32 12 11 39c29 17 42 53 45 107Z" />
          </>
        )}
        {game.id === 'mobile-legends' && (
          <>
            <path className="game-art__wing" d="m148 222-99-39 73-18-55-55 95 43Z" />
            <path className="game-art__wing" d="m175 222 99-39-73-18 55-55-95 43Z" />
            <path className="game-art__figure" d="m161 105 52 62-52 94-52-94Z" />
            <path className="game-art__detail" d="m161 125 28 44-28 47-28-47Z" />
          </>
        )}
        {game.id === 'codm' && (
          <>
            <circle className="game-art__ring" cx="170" cy="161" r="74" />
            <path className="game-art__figure" d="M106 269c5-55 17-88 45-105l-3-33 18-23 30 4 16 25-6 31c27 18 39 50 44 101Z" />
            <path className="game-art__detail" d="M77 157h63m61 0h63M170 64v56m0 75v59" />
          </>
        )}
        <path className="game-art__scan" d="M0 253h320" />
      </svg>
    </div>
  );
}

interface GameSelectorProps {
  onSelectGame?: (gameId: string) => void;
}

export default function GameSelector({ onSelectGame }: GameSelectorProps) {
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
            <button
              key={game.id}
              id={`game-card-${game.id}`}
              type="button"
              onClick={() => onSelectGame?.(game.id)}
              className="midas-tile"
            >
              <div className="midas-tile__media">
                <GameArtwork game={game} />
              </div>
              <h3 className="midas-tile__name">{game.name}</h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
