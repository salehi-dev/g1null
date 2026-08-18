import React, { useState } from 'react';
import { Sliders, Crosshair, Smartphone, Eye, ArrowRight, X } from 'lucide-react';

export default function CompetitiveSetup() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('sensitivity');

  const setupItems = [
    {
      id: 'sensitivity',
      name: 'Sensitivity',
      icon: Crosshair,
      spec: 'Camera & ADS Calibration',
      description: 'Mid-to-long range recoil stabilization and smooth target tracking.',
      details: [
        'Camera sensitivity calibrated for rapid 180° turns without overshooting',
        'ADS sensitivity matched for 3x, 4x, and 6x variable optic spray transfers',
        'Free look gyroscope tracking for peripheral awareness'
      ]
    },
    {
      id: 'gyroscope',
      name: 'Gyroscope',
      icon: Smartphone,
      spec: 'Always-On Profile',
      description: 'Micro-adjustments and rapid multi-target switching in close quarters.',
      details: [
        'Always-On gyroscope active across all combat stances and ADS modes',
        'High responsiveness on Red Dot and Holo for instant flick acquisitions',
        'Linear deceleration curves for consistent horizontal spray stabilization'
      ]
    },
    {
      id: 'controls',
      name: 'Controls',
      icon: Sliders,
      spec: 'Multi-Finger Claw',
      description: 'Engineered for simultaneous movement, aim correction, and peeking.',
      details: [
        'Separated fire and aim buttons to eliminate accidental screen drag',
        'Optimized peek-and-fire placement for fluid cover transitions',
        'Ergonomic joystick positioning for zero-delay directional strafing'
      ]
    },
    {
      id: 'graphics',
      name: 'Graphics',
      icon: Eye,
      spec: 'Max 120 FPS',
      description: 'Smooth texture rendering with minimum input latency.',
      details: [
        'Smooth graphics preset with extreme frame rate target (90/120 FPS)',
        'Colorful style filter enhanced for competitive silhouette recognition',
        'Anti-aliasing disabled for maximum frame rate stability'
      ]
    }
  ];

  return (
    <section id="setup" className="py-12 sm:py-16 border-b border-white/[0.06] bg-[#0D1117] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#F5F7FA] uppercase tracking-tight">
              MY SETUP
            </h2>
            <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
              The exact settings, sensitivity curves, and controls I use.
            </p>
          </div>

          <button
            type="button"
            id="explore-setup-btn"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D9F8] hover:bg-[#18C4E2] text-[#080A0D] font-heading font-extrabold text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer active:scale-[0.98] self-start sm:self-auto"
          >
            <span>EXPLORE SETUP</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Visual Showcase: One Strong Visual + 4 Quick Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left: Strong Setup Visual Hero Banner */}
          <div className="lg:col-span-5 rounded-xl bg-[#11161D] p-6 sm:p-8 flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#25D9F8]">
                MY CONFIG
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#F5F7FA] uppercase tracking-tight mt-1.5">
                MATCH-TUNED CONTROLS
              </h3>
            </div>

            {/* Central Visual Graphic - Direct Graphic Without Nested Frame Box */}
            <div className="my-6 sm:my-8 relative flex flex-col items-center justify-center text-center">
              <Crosshair className="w-12 h-12 text-[#25D9F8] mb-2" />
              <span className="font-heading font-black text-2xl text-[#F5F7FA] tracking-wider">
                CLAW + GYRO
              </span>
              <span className="text-xs font-mono text-[#8B95A5] uppercase tracking-wider mt-1">
                120 FPS • ALWAYS-ON
              </span>
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs text-[#8B95A5]">
              <span>PUBG Mobile</span>
              <span className="text-[#25D9F8] font-mono font-bold">2026 SEASON</span>
            </div>
          </div>

          {/* Right: 4 Short, Crisp Setup Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {setupItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveCategory(item.id);
                    setIsModalOpen(true);
                  }}
                  className="group p-5 rounded-xl bg-[#11161D] hover:bg-[#161C24] transition-all duration-150 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <Icon className="w-5 h-5 text-[#25D9F8]" />
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#8B95A5]">
                        {item.spec}
                      </span>
                    </div>

                    <h4 className="text-base font-heading font-extrabold text-[#F5F7FA] uppercase tracking-tight group-hover:text-[#25D9F8] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#9CA3AF] mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-[11px] font-semibold text-[#8B95A5] group-hover:text-[#25D9F8]">
                    <span>View Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fade-in">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0D1117] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#25D9F8] text-[#080A0D] flex items-center justify-center font-bold">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-extrabold text-[#F5F7FA] uppercase tracking-tight">
                    My Settings & Controls
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-[#161C24] text-[#9CA3AF] hover:text-[#F5F7FA] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category Switcher */}
            <div className="grid grid-cols-4 gap-1.5">
              {setupItems.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`py-1.5 px-2 rounded-md text-xs font-heading font-bold uppercase tracking-wider transition-all text-center cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#25D9F8] text-[#080A0D]'
                      : 'bg-[#11161D] text-[#9CA3AF] hover:text-[#F5F7FA]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Active Details */}
            {(() => {
              const active = setupItems.find((c) => c.id === activeCategory) || setupItems[0];
              const ActiveIcon = active.icon;
              return (
                <div className="p-4 rounded-xl bg-[#11161D] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ActiveIcon className="w-4 h-4 text-[#25D9F8]" />
                      <span className="font-heading font-extrabold text-sm text-[#F5F7FA] uppercase">
                        {active.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161C24] text-[#25D9F8]">
                      {active.spec}
                    </span>
                  </div>

                  <p className="text-xs text-[#C5CEDD] leading-relaxed">
                    {active.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    {active.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#9CA3AF]">
                        <span className="text-[#25D9F8]">•</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            <div className="pt-2 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#161C24] hover:bg-[#1C2430] text-xs font-bold uppercase text-[#F5F7FA] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
