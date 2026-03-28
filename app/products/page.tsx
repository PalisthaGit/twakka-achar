"use client";

import { useState } from "react";
import Link from "next/link";
import { products as allProducts } from "@/src/constants/products";
import type { Product, SpiceLevel, ProductType } from "@/src/types/product";

// ─── Types ───────────────────────────────────────────────────────────────────

const SPICE_LEVELS: SpiceLevel[] = ["Mild", "Medium", "Hot", "Extra Hot"];
const PRODUCT_TYPES: ProductType[] = [
  "Mango",
  "Garlic",
  "Timur",
  "Lemon",
  "Mixed",
];

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
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
          className={i < rating ? "text-spice-gold" : "text-muted-text/30"}
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-spice-gold/10 flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      {/* Image placeholder */}
      <div className="aspect-[4/3] bg-cream flex items-center justify-center border-b border-spice-gold/10 relative">
        <span className="text-6xl">{product.emoji}</span>
        {!product.inStock && (
          <span className="absolute top-3 right-3 bg-muted-text text-white text-xs font-semibold px-2.5 py-1 rounded-full font-body">
            Out of stock
          </span>
        )}
      </div>

      {/* Body */}
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
          <StarRating rating={product.rating} />
          <span className="text-xs font-body text-muted-text/70 bg-cream px-2 py-0.5 rounded-full">
            {product.spiceLevel}
          </span>
        </div>

        <div className="flex gap-2 mt-1 font-body">
          <button
            disabled={!product.inStock}
            className="flex-1 bg-chilli-red hover:bg-chilli-red/90 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-full transition-colors"
          >
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
  );
}

// ─── Filter Sidebar ───────────────────────────────────────────────────────────

interface FilterState {
  spiceLevel: SpiceLevel | "";
  types: ProductType[];
  minPrice: string;
  maxPrice: string;
}

interface SidebarProps {
  filters: FilterState;
  onApply: (f: FilterState) => void;
}

function FilterSidebar({ filters, onApply }: SidebarProps) {
  const [local, setLocal] = useState<FilterState>(filters);

  function toggleType(t: ProductType) {
    setLocal((prev) => ({
      ...prev,
      types: prev.types.includes(t)
        ? prev.types.filter((x) => x !== t)
        : [...prev.types, t],
    }));
  }

  return (
    <aside className="bg-white rounded-2xl border border-spice-gold/10 p-6 flex flex-col gap-7 shadow-sm">
      {/* Spice Level */}
      <div>
        <h3 className="font-heading text-dark-text font-bold text-base mb-3">
          Spice Level
        </h3>
        <div className="flex flex-col gap-2">
          {SPICE_LEVELS.map((level) => (
            <label
              key={level}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="radio"
                name="spiceLevel"
                value={level}
                checked={local.spiceLevel === level}
                onChange={() => setLocal((p) => ({ ...p, spiceLevel: level }))}
                className="accent-spice-gold w-4 h-4"
              />
              <span className="text-sm font-body text-dark-text group-hover:text-spice-gold transition-colors">
                {level}
              </span>
            </label>
          ))}
          {local.spiceLevel && (
            <button
              onClick={() => setLocal((p) => ({ ...p, spiceLevel: "" }))}
              className="text-xs text-muted-text hover:text-spice-gold font-body text-left mt-1 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Type */}
      <div>
        <h3 className="font-heading text-dark-text font-bold text-base mb-3">
          Type
        </h3>
        <div className="flex flex-col gap-2">
          {PRODUCT_TYPES.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={local.types.includes(type)}
                onChange={() => toggleType(type)}
                className="accent-spice-gold w-4 h-4 rounded"
              />
              <span className="text-sm font-body text-dark-text group-hover:text-spice-gold transition-colors">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-heading text-dark-text font-bold text-base mb-3">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={local.minPrice}
            onChange={(e) =>
              setLocal((p) => ({ ...p, minPrice: e.target.value }))
            }
            className="w-full border border-spice-gold/30 rounded-lg px-3 py-2 text-sm font-body text-dark-text placeholder:text-muted-text/50 outline-none focus:ring-2 focus:ring-spice-gold/40"
          />
          <span className="text-muted-text text-sm">–</span>
          <input
            type="number"
            placeholder="Max"
            value={local.maxPrice}
            onChange={(e) =>
              setLocal((p) => ({ ...p, maxPrice: e.target.value }))
            }
            className="w-full border border-spice-gold/30 rounded-lg px-3 py-2 text-sm font-body text-dark-text placeholder:text-muted-text/50 outline-none focus:ring-2 focus:ring-spice-gold/40"
          />
        </div>
      </div>

      {/* Apply */}
      <button
        onClick={() => onApply(local)}
        className="w-full bg-spice-gold hover:bg-spice-gold-dark text-dark-text font-semibold text-sm py-3 rounded-full transition-colors font-body"
      >
        Apply Filters
      </button>

      {/* Reset */}
      <button
        onClick={() => {
          const reset: FilterState = {
            spiceLevel: "",
            types: [],
            minPrice: "",
            maxPrice: "",
          };
          setLocal(reset);
          onApply(reset);
        }}
        className="text-xs text-muted-text hover:text-chilli-red font-body text-center -mt-4 transition-colors"
      >
        Reset all filters
      </button>
    </aside>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function applyFilters(products: Product[], f: FilterState): Product[] {
  return products.filter((p) => {
    if (f.spiceLevel && p.spiceLevel !== f.spiceLevel) return false;
    if (f.types.length > 0 && !f.types.includes(p.type as ProductType))
      return false;
    if (f.minPrice && p.price < Number(f.minPrice)) return false;
    if (f.maxPrice && p.price > Number(f.maxPrice)) return false;
    return true;
  });
}

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>({
    spiceLevel: "",
    types: [],
    minPrice: "",
    maxPrice: "",
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filtered = applyFilters(allProducts, filters);

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero Banner */}
      <div className="bg-chilli-red py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-spice-gold to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-cream/60 text-xs font-body mb-4">
            <Link href="/" className="hover:text-cream transition-colors">
              Home
            </Link>
            <span>›</span>
            <span className="text-cream">Products</span>
          </nav>
          <h1 className="font-heading text-white text-4xl sm:text-5xl font-bold">
            Our Products
          </h1>
          <p className="text-cream/70 font-body text-sm mt-3 max-w-md">
            {allProducts.length} handcrafted achars — traditional recipes, bold
            spices, real ingredients.
          </p>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <span className="text-sm font-body text-muted-text">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
          </span>
          <button
            onClick={() => setMobileFilterOpen((o) => !o)}
            className="flex items-center gap-2 bg-white border border-spice-gold/20 text-dark-text text-sm font-semibold font-body px-4 py-2 rounded-full shadow-sm hover:border-spice-gold/50 transition-colors"
          >
            <FilterIcon />
            Filters
          </button>
        </div>

        {/* Mobile filter dropdown */}
        {mobileFilterOpen && (
          <div className="lg:hidden mb-6">
            <FilterSidebar
              filters={filters}
              onApply={(f) => {
                setFilters(f);
                setMobileFilterOpen(false);
              }}
            />
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <div className="hidden lg:block w-64 shrink-0">
            <FilterSidebar filters={filters} onApply={setFilters} />
          </div>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            <div className="hidden lg:flex items-center justify-between mb-6">
              <span className="text-sm font-body text-muted-text">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""}{" "}
                found
              </span>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="text-5xl mb-4">🫙</span>
                <p className="font-heading text-dark-text text-xl font-bold">
                  No products match your filters
                </p>
                <p className="text-muted-text text-sm font-body mt-2">
                  Try adjusting or resetting the filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
