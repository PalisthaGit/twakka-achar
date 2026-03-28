import Link from "next/link";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Timur Ko Achar",
    description:
      "A tingling Sichuan pepper pickle with a citrusy burst — the classic Nepali table condiment.",
    price: "₹250",
    unit: "jar",
    rating: 5,
    emoji: "🌶️",
  },
  {
    id: 2,
    name: "Golbheda Ko Achar",
    description:
      "Sun-dried tomato pickle slow-roasted with sesame and mustard oil. Rich, smoky, irresistible.",
    price: "₹220",
    unit: "jar",
    rating: 5,
    emoji: "🍅",
  },
  {
    id: 3,
    name: "Aaul Ko Achar",
    description:
      "Hog plum pickle with a perfect sweet-tangy punch — pairs beautifully with rice and dal.",
    price: "₹200",
    unit: "jar",
    rating: 4,
    emoji: "🫙",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={i < rating ? "text-spice-gold" : "text-muted-text/40"}
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function FeaturedProducts() {
  return (
    <section className="bg-cream py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-spice-gold text-sm font-semibold uppercase tracking-widest font-body">
            Handcrafted with love
          </span>
          <h2 className="font-heading text-dark-text text-3xl sm:text-4xl font-bold mt-2">
            Our Products
          </h2>
          <p className="text-muted-text font-body text-sm mt-3 max-w-md mx-auto">
            Every jar tells a story of tradition, heat, and honest ingredients.
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm border border-spice-gold/10 flex flex-col overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Product image */}
              <div className="aspect-[4/3] bg-cream border-b border-spice-gold/10 relative overflow-hidden">
                <Image
                  src="/image.png"
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Card body */}
              <div className="flex flex-col gap-3 p-5 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading text-dark-text text-lg font-bold leading-snug">
                    {product.name}
                  </h3>
                  <span className="text-spice-gold font-semibold text-sm font-body whitespace-nowrap">
                    {product.price} / {product.unit}
                  </span>
                </div>

                <p className="text-muted-text text-sm leading-relaxed font-body flex-1">
                  {product.description}
                </p>

                <StarRating rating={product.rating} />

                {/* Actions */}
                <div className="flex gap-2 mt-1 font-body">
                  <button className="flex-1 bg-chilli-red hover:bg-chilli-red/90 text-white text-sm font-semibold py-2.5 rounded-full transition-colors">
                    Add to Cart
                  </button>
                  <Link
                    href={`/products/${product.id}`}
                    className="flex-1 border border-chilli-red text-chilli-red hover:bg-chilli-red/5 text-sm font-semibold py-2.5 rounded-full text-center transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-spice-gold hover:bg-spice-gold-dark text-dark-text font-semibold text-sm px-10 py-3 rounded-full transition-colors font-body"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
