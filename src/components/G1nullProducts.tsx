import React from 'react';
import { Coffee, Fingerprint, MousePointer2, Shirt } from 'lucide-react';

interface MerchItem {
  id: string;
  name: string;
  price: string;
  artworkClass: string;
  icon?: React.ElementType;
  monogram?: string;
}

const merch: MerchItem[] = [
  { id: 'finger-sleeves', name: 'Gaming Finger Sleeves', price: '$8.99', artworkClass: 'product-art--cyan', icon: Fingerprint },
  { id: 'hoodie', name: 'g1NULL Hoodie', price: '$44.99', artworkClass: 'product-art--green', icon: Shirt },
  { id: 'cap', name: 'g1NULL Cap', price: '$19.99', artworkClass: 'product-art--amber', monogram: 'G1' },
  { id: 'mug', name: 'g1NULL Mug', price: '$12.99', artworkClass: 'product-art--red', icon: Coffee },
  { id: 'mouse-pad', name: 'Gaming Mouse Pad', price: '$14.99', artworkClass: 'product-art--blue', icon: MousePointer2 },
  { id: 't-shirt', name: 'g1NULL T-Shirt', price: '$24.99', artworkClass: 'product-art--violet', icon: Shirt },
];

export default function G1nullProducts() {
  return (
    <section id="products" className="catalog-section catalog-section--products">
      <div className="catalog-container">
        <div className="catalog-heading-row catalog-heading-row--simple">
          <h2 className="catalog-title">g1NULL Products</h2>
        </div>

        <div className="midas-game-grid">
          {merch.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.id} className="midas-tile midas-product-tile">
                <div className={`midas-tile__media product-art ${item.artworkClass}`}>
                  <div className="product-art__disc" aria-hidden="true" />
                  {Icon ? <Icon aria-hidden="true" /> : <span aria-hidden="true">{item.monogram}</span>}
                </div>
                <div className="midas-product-tile__info">
                  <h3 className="midas-tile__name">{item.name}</h3>
                  <p>{item.price}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
