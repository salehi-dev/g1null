import React from 'react';
import { Fingerprint, Shirt, Coffee, MousePointer2 } from 'lucide-react';

interface MerchItem {
  id: string;
  name: string;
  price: string;
  gradient: string;
  icon?: React.ElementType;
  monogram?: string;
}

const merch: MerchItem[] = [
  {
    id: 'finger-sleeves',
    name: 'Gaming Finger Sleeves',
    price: '$8.99',
    gradient: 'from-[#25D9F8]/30 via-[#18C4E2]/15 to-[#080A0D]',
    icon: Fingerprint
  },
  {
    id: 'hoodie',
    name: 'g1NULL Hoodie',
    price: '$44.99',
    gradient: 'from-[#10B981]/30 via-[#059669]/15 to-[#080A0D]',
    icon: Shirt
  },
  {
    id: 'cap',
    name: 'g1NULL Cap',
    price: '$19.99',
    gradient: 'from-[#F59E0B]/30 via-[#D97706]/15 to-[#080A0D]',
    monogram: 'CAP'
  },
  {
    id: 'mug',
    name: 'g1NULL Mug',
    price: '$12.99',
    gradient: 'from-[#EF4444]/30 via-[#DC2626]/15 to-[#080A0D]',
    icon: Coffee
  },
  {
    id: 'mouse-pad',
    name: 'Gaming Mouse Pad',
    price: '$14.99',
    gradient: 'from-[#3B82F6]/30 via-[#2563EB]/15 to-[#080A0D]',
    icon: MousePointer2
  },
  {
    id: 't-shirt',
    name: 'g1NULL T-Shirt',
    price: '$24.99',
    gradient: 'from-[#10B981]/30 via-[#059669]/15 to-[#080A0D]',
    icon: Shirt
  }
];

export default function G1nullProducts() {
  return (
    <section id="products" className="py-12 sm:py-16 border-b border-white/[0.08] bg-[#080A0D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-heading font-black text-[#F5F7FA] uppercase tracking-tight">
            g1NULL Products
          </h2>
          <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
            Gear made for the squad.
          </p>
        </div>

        {/* Image-First Merch Grid — no card shell */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {merch.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="group flex flex-col">
                {/* Large Product Graphic */}
                <div
                  className={`w-full aspect-square rounded-lg overflow-hidden bg-gradient-to-b ${item.gradient} flex items-center justify-center`}
                >
                  {Icon ? (
                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-[#F5F7FA] group-hover:scale-110 transition-transform duration-200" />
                  ) : (
                    <span className="font-heading font-black text-2xl sm:text-3xl text-[#F5F7FA] tracking-wider group-hover:scale-110 transition-transform duration-200">
                      {item.monogram}
                    </span>
                  )}
                </div>

                {/* Name, Price, Action */}
                <div className="pt-3 text-center">
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-[#F5F7FA] uppercase tracking-tight group-hover:text-[#25D9F8] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <div className="text-xs font-bold text-[#9CA3AF] mt-1">
                    {item.price}
                  </div>
                  <button
                    type="button"
                    id={`shop-btn-${item.id}`}
                    className="w-full mt-2.5 py-2 px-2 rounded-lg font-heading font-black text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-150 flex items-center justify-center cursor-pointer bg-[#11161D] text-[#F5F7FA] group-hover:bg-[#25D9F8] group-hover:text-[#080A0D] active:scale-[0.98]"
                  >
                    SHOP
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
