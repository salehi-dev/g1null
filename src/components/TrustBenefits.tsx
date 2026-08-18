import React from 'react';
import { Zap, ShieldCheck, PackageCheck, Headphones } from 'lucide-react';

const benefits = [
  {
    title: 'Fast Delivery',
    description: 'Instant delivery directly to your account.',
    icon: Zap
  },
  {
    title: 'Secure Checkout',
    description: 'Direct UID fulfillment with encrypted payments.',
    icon: ShieldCheck
  },
  {
    title: 'Order Tracking',
    description: 'Track your top-up status in real time.',
    icon: PackageCheck
  },
  {
    title: 'Direct Support',
    description: 'Get help whenever you need assistance.',
    icon: Headphones
  }
];

export default function TrustBenefits() {
  return (
    <section id="trust-benefits" className="py-12 sm:py-16 border-b border-white/[0.06] bg-[#0D1117] relative">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-tactical-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#11161D] border border-white/[0.08] text-[#25D9F8] text-xs font-semibold uppercase tracking-wider mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D9F8]" />
            <span>FAST & SECURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#F5F7FA] uppercase tracking-tight">
            Built For Players
          </h2>
          <p className="text-sm text-[#9CA3AF] mt-1.5">
            Fast delivery, secure checkout, and direct account fulfillment.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                id={`benefit-item-${idx}`}
                className="rounded-xl border border-white/[0.08] bg-[#11161D] hover:bg-[#161C24] p-5 sm:p-6 flex flex-col justify-between transition-colors duration-150"
              >
                <div>
                  <Icon className="w-6 h-6 text-[#25D9F8] mb-3" />
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#F5F7FA] uppercase tracking-tight mb-1.5">
                    {b.title}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

