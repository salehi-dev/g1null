export interface GameOption {
  id: string;
  name: string;
  currency: string;
  code: string;
  badge?: string;
  requiresServer?: boolean;
  serverPlaceholder?: string;
  packages: PackageOption[];
}

export interface PackageOption {
  id: string;
  amount: number;
  currency: string;
  isPopular?: boolean;
  bonusText?: string;
}

export const GAMES_DATA: GameOption[] = [
  {
    id: 'pubg-mobile',
    name: 'PUBG MOBILE',
    currency: 'UC',
    code: 'PUBGM',
    badge: 'Featured',
    requiresServer: false,
    packages: [
      { id: 'pubgm-60', amount: 60, currency: 'UC' },
      { id: 'pubgm-325', amount: 325, currency: 'UC' },
      { id: 'pubgm-660', amount: 660, currency: 'UC', isPopular: true, bonusText: 'Royale Pass Tier' },
      { id: 'pubgm-1800', amount: 1800, currency: 'UC' },
      { id: 'pubgm-3850', amount: 3850, currency: 'UC' },
      { id: 'pubgm-8100', amount: 8100, currency: 'UC' },
    ]
  },
  {
    id: 'free-fire',
    name: 'FREE FIRE',
    currency: 'Diamonds',
    code: 'FF',
    badge: 'Available',
    requiresServer: false,
    packages: [
      { id: 'ff-100', amount: 100, currency: 'Diamonds' },
      { id: 'ff-310', amount: 310, currency: 'Diamonds' },
      { id: 'ff-520', amount: 520, currency: 'Diamonds', isPopular: true, bonusText: 'Elite Pass Tier' },
      { id: 'ff-1060', amount: 1060, currency: 'Diamonds' },
      { id: 'ff-2180', amount: 2180, currency: 'Diamonds' },
      { id: 'ff-5600', amount: 5600, currency: 'Diamonds' },
    ]
  },
  {
    id: 'mobile-legends',
    name: 'MOBILE LEGENDS',
    currency: 'Diamonds',
    code: 'MLBB',
    badge: 'Available',
    requiresServer: true,
    serverPlaceholder: 'e.g. 2150 (Zone ID)',
    packages: [
      { id: 'mlbb-86', amount: 86, currency: 'Diamonds' },
      { id: 'mlbb-172', amount: 172, currency: 'Diamonds' },
      { id: 'mlbb-257', amount: 257, currency: 'Diamonds' },
      { id: 'mlbb-706', amount: 706, currency: 'Diamonds', isPopular: true, bonusText: 'Starlight Pass Tier' },
      { id: 'mlbb-2195', amount: 2195, currency: 'Diamonds' },
      { id: 'mlbb-5532', amount: 5532, currency: 'Diamonds' },
    ]
  },
  {
    id: 'codm',
    name: 'CALL OF DUTY MOBILE',
    currency: 'CP',
    code: 'CODM',
    badge: 'Available',
    requiresServer: true,
    serverPlaceholder: 'e.g. Global / Garena',
    packages: [
      { id: 'codm-80', amount: 80, currency: 'CP' },
      { id: 'codm-420', amount: 420, currency: 'CP' },
      { id: 'codm-880', amount: 880, currency: 'CP', isPopular: true, bonusText: 'Battle Pass Ready' },
      { id: 'codm-2400', amount: 2400, currency: 'CP' },
      { id: 'codm-5000', amount: 5000, currency: 'CP' },
      { id: 'codm-10800', amount: 10800, currency: 'CP' },
    ]
  }
];
