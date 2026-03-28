"use client";

import Link from "next/link";
import { useCart } from "@/src/lib/CartContext";

const DELIVERY_FEE = 70;

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();
  const total = subtotal + DELIVERY_FEE;

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb */}
      <div className="bg-chilli-red py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm font-body text-cream/70">
            <Link href="/" className="hover:text-spice-gold transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-spice-gold font-medium">Cart</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-heading text-3xl font-bold text-dark-text mb-8">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-white rounded-2xl shadow-sm border border-spice-gold/10 p-4 sm:p-5 flex gap-4"
                  >
                    {/* Emoji image */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl bg-cream flex items-center justify-center text-3xl sm:text-4xl">
                      {item.product.emoji}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h2 className="font-heading font-bold text-dark-text text-base sm:text-lg leading-snug">
                            {item.product.name}
                          </h2>
                          <p className="text-muted-text text-xs font-body mt-0.5">
                            {item.product.spiceLevel} · {item.product.type}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-text hover:text-chilli-red transition-colors shrink-0 p-1"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <TrashIcon />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                        {/* Quantity selector */}
                        <div className="flex items-center border border-spice-gold/30 rounded-full overflow-hidden font-body">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center text-dark-text hover:bg-spice-gold/10 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-dark-text">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                            className="w-8 h-8 flex items-center justify-center text-dark-text hover:bg-spice-gold/10 transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Subtotal */}
                        <p className="text-spice-gold font-bold font-body text-base">
                          ₹{item.product.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 mt-6 text-sm font-body text-chilli-red hover:text-spice-gold transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:w-80 xl:w-96 shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-spice-gold/10 p-6 sticky top-20">
                <h2 className="font-heading font-bold text-dark-text text-xl mb-5">
                  Order Summary
                </h2>

                <div className="flex flex-col gap-3 font-body text-sm">
                  <div className="flex justify-between text-dark-text">
                    <span className="text-muted-text">
                      Subtotal ({items.reduce((s, i) => s + i.quantity, 0)}{" "}
                      items)
                    </span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-dark-text">
                    <span className="text-muted-text">Delivery Fee</span>
                    <span>₹{DELIVERY_FEE}</span>
                  </div>
                  <div className="h-px bg-spice-gold/20 my-1" />
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-dark-text text-base">
                      Total
                    </span>
                    <span className="font-bold text-spice-gold text-xl">
                      ₹{total}
                    </span>
                  </div>
                </div>

                <Link
                  href="/order"
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-chilli-red hover:bg-chilli-red/90 text-cream font-body font-semibold text-sm rounded-full py-3 transition-colors"
                >
                  Proceed to Order →
                </Link>

                <p className="text-center text-xs text-muted-text font-body mt-3">
                  Free delivery on orders above ₹999
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-7xl mb-6">🛒</div>
      <h2 className="font-heading font-bold text-dark-text text-2xl mb-2">
        Your cart is empty
      </h2>
      <p className="text-muted-text font-body text-sm mb-8 max-w-xs">
        Looks like you haven&apos;t added any achar yet. Explore our collection
        and find your favourite!
      </p>
      <Link
        href="/products"
        className="bg-chilli-red hover:bg-chilli-red/90 text-cream font-body font-semibold text-sm rounded-full px-8 py-3 transition-colors"
      >
        Browse Products
      </Link>
    </div>
  );
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
