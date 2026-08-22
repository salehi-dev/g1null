interface MerchItem {
  id: string;
  name: string;
  price: string;
  image: string;
}

const merch: MerchItem[] = [
  { id: 'finger-sleeves', name: 'Gaming Finger Sleeves', price: '$8.99', image: '/images/products/g1null-finger.webp' },
  { id: 'hoodie', name: 'g1NULL Hoodie', price: '$44.99', image: '/images/products/g1null-hoodie.webp' },
  { id: 'cap', name: 'g1NULL Cap', price: '$19.99', image: '/images/products/g1null-cap.webp' },
  { id: 'mug', name: 'g1NULL Mug', price: '$12.99', image: '/images/products/g1null-mug.webp' },
  { id: 'mouse-pad', name: 'Gaming Mouse Pad', price: '$14.99', image: '/images/products/g1null-mouse-pad.webp' },
  { id: 't-shirt', name: 'g1NULL T-Shirt', price: '$24.99', image: '/images/products/g1null-tshirt.webp' },
];

export default function G1nullProducts() {
  return (
    <section id="products" className="catalog-section catalog-section--products">
      <div className="catalog-container">
        <div className="catalog-heading-row catalog-heading-row--simple">
          <h2 className="catalog-title">g1NULL Products</h2>
        </div>

        <div className="midas-game-grid">
          {merch.map((item) => (
            <article key={item.id} className="midas-tile midas-product-tile">
              <div className="midas-tile__media product-art">
                <img
                  src={item.image}
                  alt={item.name}
                  className="midas-tile__image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="midas-product-tile__info">
                <h3 className="midas-tile__name">{item.name}</h3>
                <p>{item.price}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
