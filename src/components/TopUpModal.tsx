import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Flame, ShieldCheck, Zap, User, AlertCircle, Info, Sparkles } from 'lucide-react';
import { GAMES_DATA, GameOption, PackageOption } from '../data/topupData';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGameId?: string;
  initialPackageId?: string;
}

export default function TopUpModal({
  isOpen,
  onClose,
  initialGameId = 'pubg-mobile',
  initialPackageId
}: TopUpModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedGameId, setSelectedGameId] = useState<string>(initialGameId);
  const [playerId, setPlayerId] = useState<string>('');
  const [serverRegion, setServerRegion] = useState<string>('');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('');
  const [showDemoNotice, setShowDemoNotice] = useState<boolean>(false);

  // Sync initial game when modal opens
  useEffect(() => {
    if (isOpen) {
      const gId = initialGameId || 'pubg-mobile';
      setSelectedGameId(gId);
      const gameObj = GAMES_DATA.find((g) => g.id === gId) || GAMES_DATA[0];
      if (initialPackageId) {
        setSelectedPackageId(initialPackageId);
      } else {
        const defaultPkg = gameObj.packages.find((p) => p.isPopular) || gameObj.packages[0];
        setSelectedPackageId(defaultPkg.id);
      }
      setShowDemoNotice(false);
      // Reset step to 1 on initial open
      setCurrentStep(1);
    }
  }, [isOpen, initialGameId, initialPackageId]);

  // When game changes, pick default package if current is not in game
  useEffect(() => {
    const gameObj = GAMES_DATA.find((g) => g.id === selectedGameId) || GAMES_DATA[0];
    const exists = gameObj.packages.some((p) => p.id === selectedPackageId);
    if (!exists) {
      const defaultPkg = gameObj.packages.find((p) => p.isPopular) || gameObj.packages[0];
      setSelectedPackageId(defaultPkg.id);
    }
  }, [selectedGameId, selectedPackageId]);

  // Lock body scroll and listen for Escape key when open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentGame: GameOption = GAMES_DATA.find((g) => g.id === selectedGameId) || GAMES_DATA[0];
  const currentPackage: PackageOption =
    currentGame.packages.find((p) => p.id === selectedPackageId) || currentGame.packages[0];

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleCompletePaymentMock = () => {
    setShowDemoNotice(true);
  };

  // Masked or formatted player ID for summary
  const displayPlayerId = playerId.trim()
    ? playerId.length > 4
      ? `****${playerId.slice(-4)}`
      : playerId
    : '5482910421';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-[#080A0D]/85 flex items-end sm:items-center justify-center p-0 sm:p-4 sm:py-6 transition-opacity duration-200"
    >
      {/* Modal Container */}
      <div
        id="topup-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0D1117] border-t sm:border border-white/[0.1] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[90vh] transition-all duration-200"
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/[0.08] bg-[#11161D]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#25D9F8]" />
            <h3 id="modal-title" className="font-heading font-extrabold text-sm sm:text-lg text-[#F5F7FA] uppercase tracking-wide">
              Direct Top-Up Portal
            </h3>
          </div>
          <button
            id="close-topup-modal-btn"
            onClick={onClose}
            className="p-2 rounded-lg text-[#8B95A5] hover:text-[#F5F7FA] hover:bg-[#161C24] active:scale-[0.95] transition-all duration-150 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-[#25D9F8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11161D]"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#080A0D] border-b border-white/[0.06]">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {/* Step 1 */}
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-1.5 sm:gap-2 group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#25D9F8] rounded px-1.5 py-1 transition-colors"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-heading font-bold transition-all ${
                  currentStep === 1
                    ? 'bg-[#25D9F8] text-[#080A0D] ring-2 ring-[#25D9F8]/30'
                    : currentStep > 1
                    ? 'bg-[#161C24] text-[#25D9F8] border border-[#25D9F8]/40'
                    : 'bg-[#11161D] text-[#5A6578] border border-white/[0.08]'
                }`}
              >
                {currentStep > 1 ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : '1'}
              </div>
              <span
                className={`text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors ${
                  currentStep === 1 ? 'text-[#25D9F8]' : 'text-[#8B95A5] group-hover:text-[#F5F7FA]'
                }`}
              >
                Game
              </span>
            </button>

            <div className={`h-[1px] flex-1 mx-2 sm:mx-3 transition-colors ${currentStep >= 2 ? 'bg-[#25D9F8]/40' : 'bg-white/[0.08]'}`} />

            {/* Step 2 */}
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-1.5 sm:gap-2 group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#25D9F8] rounded px-1.5 py-1 transition-colors"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-heading font-bold transition-all ${
                  currentStep === 2
                    ? 'bg-[#25D9F8] text-[#080A0D] ring-2 ring-[#25D9F8]/30'
                    : currentStep > 2
                    ? 'bg-[#161C24] text-[#25D9F8] border border-[#25D9F8]/40'
                    : 'bg-[#11161D] text-[#5A6578] border border-white/[0.08]'
                }`}
              >
                {currentStep > 2 ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : '2'}
              </div>
              <span
                className={`text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors ${
                  currentStep === 2 ? 'text-[#25D9F8]' : 'text-[#8B95A5] group-hover:text-[#F5F7FA]'
                }`}
              >
                Player Info
              </span>
            </button>

            <div className={`h-[1px] flex-1 mx-2 sm:mx-3 transition-colors ${currentStep >= 3 ? 'bg-[#25D9F8]/40' : 'bg-white/[0.08]'}`} />

            {/* Step 3 */}
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="flex items-center gap-1.5 sm:gap-2 group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#25D9F8] rounded px-1.5 py-1 transition-colors"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-heading font-bold transition-all ${
                  currentStep === 3
                    ? 'bg-[#25D9F8] text-[#080A0D] ring-2 ring-[#25D9F8]/30'
                    : 'bg-[#11161D] text-[#5A6578] border border-white/[0.08]'
                }`}
              >
                3
              </div>
              <span
                className={`text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors ${
                  currentStep === 3 ? 'text-[#25D9F8]' : 'text-[#8B95A5] group-hover:text-[#F5F7FA]'
                }`}
              >
                Package
              </span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* STEP 1: Game Selection */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#25D9F8] mb-1">
                  Step 1 of 3
                </div>
                <h4 className="text-xl sm:text-2xl font-heading font-extrabold text-[#F5F7FA] uppercase tracking-tight">
                  Select Your Game
                </h4>
                <p className="text-xs text-[#8B95A5] mt-1">
                  Choose the game title you want to top up.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {GAMES_DATA.map((game) => {
                  const isSelected = selectedGameId === game.id;
                  return (
                    <button
                      key={game.id}
                      id={`modal-select-game-${game.id}`}
                      type="button"
                      onClick={() => setSelectedGameId(game.id)}
                      className={`text-left p-4 rounded-xl transition-all duration-150 flex items-center justify-between select-none active:scale-[0.985] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#25D9F8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1117] ${
                        isSelected
                          ? 'bg-[#161C24] border-2 border-[#25D9F8]'
                          : 'bg-[#11161D] border border-white/[0.08] hover:border-white/[0.22] hover:bg-[#161C24]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center font-heading font-black text-xs border ${
                            isSelected
                              ? 'bg-[#080A0D] border-[#25D9F8]/40 text-[#25D9F8]'
                              : 'bg-[#080A0D] border-white/[0.08] text-[#F5F7FA]'
                          }`}
                        >
                          {game.code}
                        </div>
                        <div>
                          <div className="font-heading font-bold text-sm text-[#F5F7FA] uppercase tracking-wide">
                            {game.name}
                          </div>
                          <div className="text-[11px] text-[#8B95A5] mt-0.5">
                            Currency: <span className="text-[#25D9F8] font-semibold">{game.currency}</span>
                          </div>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#25D9F8] text-[#080A0D] flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Player Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#25D9F8] mb-1">
                  Step 2 of 3
                </div>
                <h4 className="text-xl sm:text-2xl font-heading font-extrabold text-[#F5F7FA] uppercase tracking-tight">
                  Player Information
                </h4>
                <p className="text-xs text-[#8B95A5] mt-1">
                  Enter your in-game details so your top-up is credited directly to your account.
                </p>
              </div>

              {/* Selected Game Confirmation Bar */}
              <div className="p-3 rounded-lg bg-[#11161D] border border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[#8B95A5]">Selected Game:</span>
                  <span className="font-heading font-bold text-sm text-[#F5F7FA] uppercase">
                    {currentGame.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-[11px] font-semibold text-[#25D9F8] hover:text-[#18C4E2] hover:underline uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Change
                </button>
              </div>

              {/* Form Fields */}
              <div className="space-y-4 pt-1">
                <div>
                  <label htmlFor="modal-player-id-input" className="block text-xs font-semibold uppercase tracking-wider text-[#F5F7FA] mb-1.5">
                    Player ID / UID <span className="text-[#25D9F8]">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B95A5]" />
                    <input
                      id="modal-player-id-input"
                      type="text"
                      value={playerId}
                      onChange={(e) => setPlayerId(e.target.value)}
                      placeholder="e.g. 5123984121"
                      className="w-full bg-[#11161D] border border-white/[0.1] rounded-lg pl-10 pr-4 py-3 text-sm text-[#F5F7FA] placeholder-[#5A6578] focus:outline-none focus:border-[#25D9F8] focus:ring-1 focus:ring-[#25D9F8] transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-[#8B95A5] mt-1.5 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#25D9F8] shrink-0" />
                    <span>Find your Player ID in your in-game profile header or avatar menu.</span>
                  </p>
                </div>

                <div>
                  <label htmlFor="modal-server-input" className="block text-xs font-semibold uppercase tracking-wider text-[#F5F7FA] mb-1.5">
                    Server / Region <span className="text-[#5A6578] lowercase font-normal">(optional)</span>
                  </label>
                  <input
                    id="modal-server-input"
                    type="text"
                    value={serverRegion}
                    onChange={(e) => setServerRegion(e.target.value)}
                    placeholder={currentGame.serverPlaceholder || 'e.g. Global / North America'}
                    className="w-full bg-[#11161D] border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-[#F5F7FA] placeholder-[#5A6578] focus:outline-none focus:border-[#25D9F8] focus:ring-1 focus:ring-[#25D9F8] transition-all"
                  />
                  <p className="text-[11px] text-[#5A6578] mt-1.5">
                    Required for regional servers (Zone ID for Mobile Legends).
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#080A0D] border border-white/[0.06] flex items-start gap-2.5 text-xs text-[#9CA3AF]">
                  <ShieldCheck className="w-4 h-4 text-[#25D9F8] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    We never ask for account passwords or sensitive login credentials. Top-ups are fulfilled securely via direct player UID recharge.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Package Selection & Order Summary */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#25D9F8] mb-1">
                  Step 3 of 3
                </div>
                <h4 className="text-xl sm:text-2xl font-heading font-extrabold text-[#F5F7FA] uppercase tracking-tight">
                  Choose Package & Review
                </h4>
                <p className="text-xs text-[#8B95A5] mt-1">
                  Select your currency package and verify your top-up summary.
                </p>
              </div>

              {/* Packages Grid */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#F5F7FA] mb-2.5">
                  Available {currentGame.name} Packages
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {currentGame.packages.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        id={`modal-pkg-${pkg.id}`}
                        type="button"
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`text-left p-3 sm:p-3.5 rounded-xl transition-all duration-150 flex flex-col justify-between select-none min-h-[95px] active:scale-[0.98] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#25D9F8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1117] ${
                          isSelected
                            ? 'bg-[#161C24] border-2 border-[#25D9F8]'
                            : 'bg-[#11161D] border border-white/[0.08] hover:border-white/[0.22] hover:bg-[#161C24]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] uppercase font-semibold text-[#8B95A5]">
                            {pkg.currency}
                          </span>
                          {pkg.isPopular && (
                            <span className="px-1.5 py-0.5 rounded bg-[#25D9F8]/10 text-[#25D9F8] border border-[#25D9F8]/30 text-[9px] font-bold uppercase tracking-wider">
                              Popular
                            </span>
                          )}
                        </div>

                        <div className="font-heading font-extrabold text-base sm:text-xl text-[#F5F7FA]">
                          {pkg.amount}{' '}
                          <span className="text-xs font-bold text-[#25D9F8] uppercase">{pkg.currency}</span>
                        </div>

                        <div className="mt-2 pt-1.5 border-t border-white/[0.06] text-[10px] sm:text-[11px] text-[#8B95A5] flex items-center justify-between">
                          <span>Price:</span>
                          <span className="font-heading font-bold text-xs text-[#F5F7FA]">$--</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#11161D] border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="font-heading font-extrabold text-sm uppercase tracking-wide text-[#F5F7FA]">
                    Order Summary
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#161C24] text-[#25D9F8] border border-white/[0.06]">
                    Direct UID
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8B95A5]">Game:</span>
                    <span className="font-heading font-bold text-sm text-[#F5F7FA] uppercase">
                      {currentGame.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#8B95A5]">Selected Package:</span>
                    <span className="font-heading font-bold text-sm text-[#25D9F8]">
                      {currentPackage.amount} {currentPackage.currency}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#8B95A5]">Player ID:</span>
                    <span className="font-mono text-xs font-semibold text-[#F5F7FA]">
                      {displayPlayerId}
                    </span>
                  </div>

                  {serverRegion && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#8B95A5]">Server/Region:</span>
                      <span className="font-mono text-xs text-[#F5F7FA]">{serverRegion}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-[#8B95A5]">Price:</span>
                    <span className="font-heading font-bold text-sm text-[#F5F7FA]">$--</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/[0.06]">
                    <span className="text-[#8B95A5]">Delivery:</span>
                    <span className="font-semibold text-xs text-[#25D9F8] inline-flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Fast digital delivery
                    </span>
                  </div>
                </div>
              </div>

              {/* Demo Notice Alert when user clicks Continue to Payment */}
              {showDemoNotice && (
                <div
                  id="topup-demo-notice"
                  className="p-4 rounded-xl bg-[#161C24] border border-[#25D9F8]/40 text-left space-y-2"
                >
                  <div className="flex items-center gap-2 text-[#25D9F8]">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-heading font-bold text-xs uppercase tracking-wider">
                      Demo Order Registered
                    </span>
                  </div>
                  <p className="text-xs text-[#F5F7FA] font-medium leading-relaxed">
                    Payment integration will be available in the production version.
                  </p>
                  <p className="text-[11px] text-[#8B95A5]">
                    Your mock selection for <strong className="text-[#F5F7FA]">{currentGame.name} ({currentPackage.amount} {currentPackage.currency})</strong> was processed through the frontend flow prototype.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#11161D] border-t border-white/[0.08] flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              id="topup-prev-step-btn"
              onClick={handlePrevStep}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg bg-[#161C24] hover:bg-white/10 active:scale-[0.98] text-[#F5F7FA] border border-white/[0.08] text-xs font-semibold uppercase tracking-wider transition-all min-h-[44px] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#25D9F8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11161D]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#8B95A5] hover:text-[#F5F7FA] active:scale-[0.98] transition-all min-h-[44px] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#25D9F8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11161D]"
            >
              Cancel
            </button>
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              id="topup-next-step-btn"
              onClick={handleNextStep}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-lg bg-[#25D9F8] hover:bg-[#18C4E2] active:scale-[0.98] text-[#080A0D] font-bold text-xs uppercase tracking-wider transition-all duration-150 ml-auto min-h-[44px] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#25D9F8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11161D]"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              id="topup-continue-payment-btn"
              onClick={handleCompletePaymentMock}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-lg bg-[#25D9F8] hover:bg-[#18C4E2] active:scale-[0.98] text-[#080A0D] font-bold text-xs uppercase tracking-wider transition-all duration-150 ml-auto min-h-[44px] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#25D9F8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#11161D]"
            >
              <span>Continue to Payment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
