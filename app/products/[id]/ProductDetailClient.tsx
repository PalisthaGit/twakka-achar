"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "@/src/types/product";
import { useCart } from "@/src/lib/CartContext";

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={i < rating ? "text-spice-gold" : "text-muted-text/30"}
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

// ─── Related Product Card ─────────────────────────────────────────────────────

function RelatedProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-spice-gold/10 flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] bg-cream flex items-center justify-center border-b border-spice-gold/10 relative">
        <span className="text-6xl">{product.emoji}</span>
        {!product.inStock && (
          <span className="absolute top-3 right-3 bg-muted-text text-white text-xs font-semibold px-2.5 py-1 rounded-full font-body">
            Out of stock
          </span>
        )}
      </div>
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-dark-text text-lg font-bold leading-snug">
            {product.name}
          </h3>
          <span className="text-spice-gold font-semibold text-sm font-body whitespace-nowrap">
            ₹{product.price} / jar
          </span>
        </div>
        <p className="text-muted-text text-sm leading-relaxed font-body flex-1">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <StarRating rating={product.rating} size={14} />
          <span className="text-xs font-body text-muted-text/70 bg-cream px-2 py-0.5 rounded-full">
            {product.spiceLevel}
          </span>
        </div>
        <div className="flex gap-2 mt-1 font-body">
          <button
            disabled={!product.inStock}
            onClick={handleAddToCart}
            className="flex-1 bg-chilli-red hover:bg-chilli-red/90 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-full transition-colors"
          >
            {added ? "Added ✓" : "Add to Cart"}
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
  );
}

// ─── Static content helpers ───────────────────────────────────────────────────

function getIngredients(product: Product): string[] {
  const base = [
    "Himalayan rock salt",
    "Cold-pressed mustard oil",
    "Turmeric",
    "Red chilli powder",
  ];
  const byType: Partial<Record<Product["type"], string[]>> = {
    Timur: ["Timur (Sichuan pepper)", "Sesame seeds", "Dried ginger", "Cumin"],
    Mango: [
      "Raw Himalayan mango",
      "Fenugreek seeds",
      "Fennel seeds",
      "Asafoetida",
    ],
    Garlic: [
      "Whole garlic cloves",
      "Cumin seeds",
      "Coriander seeds",
      "Black pepper",
    ],
    Lemon: ["Fresh lemons", "Cumin seeds", "Black salt", "Asafoetida"],
    Mixed: [
      "Seasonal vegetables",
      "Sesame seeds",
      "Cumin",
      "Coriander seeds",
    ],
    Other: ["Wild foraged fruit", "Jaggery", "Rock salt", "Dried spice blend"],
  };
  return [...(byType[product.type] ?? []), ...base];
}

function getFullDescription(product: Product): string {
  return `${product.description} Crafted in small batches using recipes passed down through generations, every jar of ${product.name} carries the warmth of Nepali kitchens. We source only the finest local produce and cold-press our mustard oil fresh for each batch — no shortcuts, no preservatives, no compromises. The result is a condiment that's as bold and complex on the palate as the mountains it comes from. Whether you're pairing it with rice and dal, spreading it on a warm paratha, or using it to elevate a simple meal, ${product.name} will make every bite memorable.`;
}

const MOCK_REVIEWS = [
  {
    id: 1,
    name: "Priya S.",
    rating: 5,
    text: "Absolutely love this achar! The perfect balance of spice and tang. Goes well with everything — rice, roti, even plain bread.",
  },
  {
    id: 2,
    name: "Rahul M.",
    rating: 5,
    text: "Authentic Nepali taste, just like what my grandmother used to make. The spice level is spot on and the oil is so fragrant.",
  },
  {
    id: 3,
    name: "Anita K.",
    rating: 4,
    text: "Very good quality. Packaging is neat and sturdy, and the flavor is genuinely traditional. Will definitely order again.",
  },
  {
    id: 4,
    name: "Dev R.",
    rating: 5,
    text: "Ordered 3 jars and they were gone in under a week. My entire family is hooked. Already placed a repeat order!",
  },
];

// ─── Tabs ─────────────────────────────────────────────────────────────────────

type Tab = "description" | "reviews";

function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const ingredients = getIngredients(product);
  const fullDesc = getFullDescription(product);

  return (
    <div>
      {/* Tab bar */}
      <div className="flex border-b border-spice-gold/20 mb-8">
        {(["description", "reviews"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-semibold font-body capitalize transition-colors relative ${
              activeTab === tab
                ? "text-dark-text"
                : "text-muted-text hover:text-dark-text"
            }`}
          >
            {tab === "reviews" ? `Reviews (${MOCK_REVIEWS.length})` : "Description"}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-spice-gold rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Description tab */}
      {activeTab === "description" && (
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="font-heading text-dark-text text-xl font-bold mb-3">
              About this achar
            </h3>
            <p className="font-body text-muted-text leading-relaxed text-sm">
              {fullDesc}
            </p>
          </div>

          <div>
            <h3 className="font-heading text-dark-text text-xl font-bold mb-3">
              Ingredients
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ingredients.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 font-body text-sm text-dark-text"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-spice-gold shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-dark-text text-xl font-bold mb-3">
              How to use
            </h3>
            <ol className="flex flex-col gap-2 list-none">
              {[
                "Serve a small spoonful alongside steamed rice, dal, or roti.",
                "Use as a spread in sandwiches or wraps for an authentic Nepali kick.",
                "Add to marinades or stir-fries for depth of flavour.",
                "Store in a cool, dry place. Refrigerate after opening and use within 3 months.",
              ].map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 font-body text-sm text-muted-text"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-spice-gold/10 text-spice-gold text-xs font-semibold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* Reviews tab */}
      {activeTab === "reviews" && (
        <div className="flex flex-col gap-5">
          {MOCK_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-spice-gold/10 p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-body font-semibold text-dark-text text-sm">
                  {review.name}
                </span>
                <StarRating rating={review.rating} size={13} />
              </div>
              <p className="font-body text-muted-text text-sm leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Quantity Selector ────────────────────────────────────────────────────────

function QuantitySelector({
  qty,
  setQty,
}: {
  qty: number;
  setQty: (q: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-body text-sm text-muted-text">Qty:</span>
      <div className="flex items-center border border-spice-gold/30 rounded-full overflow-hidden">
        <button
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="w-9 h-9 flex items-center justify-center text-dark-text hover:bg-cream transition-colors font-body text-lg"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-8 text-center font-body font-semibold text-dark-text text-sm">
          {qty}
        </span>
        <button
          onClick={() => setQty(qty + 1)}
          className="w-9 h-9 flex items-center justify-center text-dark-text hover:bg-cream transition-colors font-body text-lg"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}

// ─── Thumbnail Gallery ────────────────────────────────────────────────────────

const THUMB_TINTS = [
  "bg-amber-50",
  "bg-orange-50",
  "bg-yellow-50",
  "bg-red-50",
];

function ImageGallery({ product }: { product: Product }) {
  const [activeThumb, setActiveThumb] = useState(0);
  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="aspect-square rounded-3xl bg-white border border-spice-gold/10 shadow-sm flex items-center justify-center">
        <span className="text-[8rem] select-none">{product.emoji}</span>
      </div>
      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {THUMB_TINTS.map((tint, i) => (
          <button
            key={i}
            onClick={() => setActiveThumb(i)}
            className={`aspect-square rounded-2xl border-2 flex items-center justify-center transition-colors ${
              activeThumb === i
                ? "border-spice-gold"
                : "border-spice-gold/10 hover:border-spice-gold/40"
            } ${tint}`}
          >
            <span className="text-3xl select-none">{product.emoji}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetailClient({ product, related }: Props) {
  const reviewCount = MOCK_REVIEWS.length;
  const { addToCart } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleBuyNow() {
    addToCart(product, qty);
    router.push("/cart");
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-chilli-red py-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-spice-gold to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <nav className="flex items-center gap-2 text-cream/60 text-xs font-body">
            <Link href="/" className="hover:text-cream transition-colors">
              Home
            </Link>
            <span>›</span>
            <Link
              href="/products"
              className="hover:text-cream transition-colors"
            >
              Products
            </Link>
            <span>›</span>
            <span className="text-cream">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ── Product Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Image Gallery */}
          <ImageGallery product={product} />

          {/* Right: Product Info */}
          <div className="flex flex-col gap-6">
            {/* Spice badge */}
            <span className="inline-flex w-fit items-center gap-1.5 bg-spice-gold/10 text-spice-gold text-xs font-semibold font-body px-3 py-1 rounded-full">
              🌶️ {product.spiceLevel}
            </span>

            {/* Name */}
            <h1 className="font-heading text-dark-text text-4xl font-bold leading-tight">
              {product.name}
            </h1>

            {/* Short description */}
            <p className="font-body text-muted-text leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-spice-gold text-3xl font-bold">
                ₹{product.price}
              </span>
              <span className="font-body text-muted-text text-sm">/ jar</span>
            </div>

            {/* Star rating */}
            <div className="flex items-center gap-3">
              <StarRating rating={product.rating} size={18} />
              <span className="font-body text-sm text-muted-text">
                {product.rating}.0 ({reviewCount} reviews)
              </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-spice-gold/10" />

            {/* Quantity */}
            <QuantitySelector qty={qty} setQty={setQty} />

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 border-2 border-chilli-red text-chilli-red hover:bg-chilli-red/5 disabled:opacity-40 disabled:cursor-not-allowed font-body font-semibold py-3.5 rounded-full transition-colors text-sm"
              >
                Buy Now
              </button>
              <button
                disabled={!product.inStock}
                onClick={handleAddToCart}
                className="flex-1 bg-chilli-red hover:bg-chilli-red/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-body font-semibold py-3.5 rounded-full transition-colors text-sm"
              >
                {!product.inStock ? "Out of Stock" : added ? "Added ✓" : "Add to Cart"}
              </button>
            </div>

            {/* Shipping info */}
            <div className="flex flex-col gap-3 bg-white rounded-2xl border border-spice-gold/10 p-5">
              <div className="flex items-center gap-3">
                <span className="text-xl">⚡</span>
                <div>
                  <p className="font-body font-semibold text-dark-text text-sm">
                    Dispatched in 1 day
                  </p>
                  <p className="font-body text-muted-text text-xs">
                    Orders placed before 2 PM ship the same business day
                  </p>
                </div>
              </div>
              <div className="h-px bg-spice-gold/10" />
              <div className="flex items-center gap-3">
                <span className="text-xl">🚚</span>
                <div>
                  <p className="font-body font-semibold text-dark-text text-sm">
                    Home Delivery — ₹49
                  </p>
                  <p className="font-body text-muted-text text-xs">
                    Free delivery on orders above ₹499
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs Section ── */}
        <div className="mb-16">
          <ProductTabs product={product} />
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div>
            <h2 className="font-heading text-dark-text text-2xl font-bold mb-8">
              You might also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <RelatedProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
