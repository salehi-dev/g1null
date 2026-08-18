import React from 'react';

interface AboutItem {
  number: string;
  title: string;
  description: string;
}

const items: AboutItem[] = [
  {
    number: '01',
    title: 'g1NULL Shop',
    description: 'A simple gaming store designed for fast and convenient purchases.'
  },
  {
    number: '02',
    title: 'Trusted Shopping Experience',
    description: 'A straightforward purchase experience built for the gaming community.'
  },
  {
    number: '03',
    title: 'Payment Security',
    description: 'Secure and reliable payment methods for purchases.'
  },
  {
    number: '04',
    title: 'User Privacy',
    description: 'Customer information and order data are handled with care.'
  },
  {
    number: '05',
    title: 'Multiple Payment Options',
    description: 'Different convenient payment methods where available.'
  },
  {
    number: '06',
    title: 'Regional Offers',
    description: 'Special products, promotions, and offers for supported regions.'
  }
];

export default function AboutG1nullShop() {
  return (
    <section id="about-shop" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#F5F7FA] uppercase tracking-tight">
            About g1NULL Shop
          </h2>
        </div>

        {/* Open Editorial List — numbered, minimal separators, no card shells */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 sm:gap-y-10">
          {items.map((item) => (
            <div
              key={item.number}
              className="pt-5 border-t border-white/[0.06]"
            >
              <span className="font-heading font-black text-sm text-[#25D9F8] tracking-wider">
                {item.number}
              </span>
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#F5F7FA] uppercase tracking-tight mt-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed mt-1.5">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
