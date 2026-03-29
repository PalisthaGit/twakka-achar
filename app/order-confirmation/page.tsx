"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface LineItem {
  name: string;
  emoji: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  orderId: string;
  date: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  area: string;
  landmark: string | null;
  houseDetails: string | null;
  mapCoords: string;
  lineItems: LineItem[];
  subtotal: number;
  delivery: number;
  giftPackaging: boolean;
  giftFee: number;
  giftMessage: string;
  total: number;
}

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("twakka-last-order");
      if (stored) setOrder(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-spice-gold/10 p-10 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="font-heading font-bold text-dark-text text-2xl mb-3">
            No order found
          </h2>
          <p className="text-muted-text font-body text-sm mb-8">
            It looks like there is no recent order to display.
          </p>
          <Link
            href="/products"
            className="inline-block bg-chilli-red hover:bg-chilli-red/90 text-cream font-body font-semibold text-sm rounded-full px-8 py-3 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Success card */}
        <div className="bg-white rounded-3xl shadow-md border border-spice-gold/10 overflow-hidden">
          {/* Header band */}
          <div className="bg-chilli-red px-8 py-8 text-center">
            {/* Checkmark */}
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
              <CheckIcon />
            </div>
            <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl leading-tight">
              Order Placed Successfully!
            </h1>
            <p className="text-cream/80 font-body text-sm mt-2">
              Thank you {order.name}! Your order has been placed.
            </p>
            <p className="text-cream/60 font-body text-xs mt-1">
              {order.date}
            </p>
          </div>

          <div className="px-6 sm:px-8 py-7">
            {/* Order ID */}
            <div className="bg-cream rounded-2xl px-6 py-4 text-center mb-6 border border-spice-gold/20">
              <p className="text-muted-text font-body text-xs uppercase tracking-widest mb-1">
                Your Order ID
              </p>
              <p className="font-heading font-bold text-spice-gold text-2xl tracking-wide">
                {order.orderId}
              </p>
            </div>

            {/* Phone call notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 flex gap-3 items-start mb-6">
              <span className="text-blue-600 mt-0.5 shrink-0 text-lg">📞</span>
              <p className="text-blue-800 font-body text-sm leading-relaxed">
                We will call you on <span className="font-semibold">{order.phone}</span> to confirm delivery.
              </p>
            </div>

            {/* Delivery info */}
            <div className="mb-6">
              <h2 className="font-heading font-bold text-dark-text text-lg mb-3">
                Delivering To
              </h2>
              <div className="font-body text-sm text-dark-text space-y-1">
                <p className="font-semibold">{order.name}</p>
                <p className="text-muted-text">{order.phone}</p>
                <p className="text-muted-text">{order.area}, {order.city}</p>
                {order.landmark && (
                  <p className="text-muted-text">Landmark: {order.landmark}</p>
                )}
                {order.houseDetails && (
                  <p className="text-muted-text">House: {order.houseDetails}</p>
                )}
              </div>
            </div>

            <div className="h-px bg-spice-gold/20 mb-6" />

            {/* Order items */}
            <div className="mb-6">
              <h2 className="font-heading font-bold text-dark-text text-lg mb-3">
                Order Summary
              </h2>
              <div className="flex flex-col gap-3">
                {order.lineItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium font-body text-dark-text">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-text font-body">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold font-body text-spice-gold shrink-0">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="bg-cream rounded-2xl px-5 py-4 font-body text-sm flex flex-col gap-2 mb-6">
              <div className="flex justify-between text-dark-text">
                <span className="text-muted-text">Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-dark-text">
                <span className="text-muted-text">Delivery</span>
                <span>₹{order.delivery}</span>
              </div>
              {order.giftPackaging && (
                <div className="flex justify-between text-dark-text">
                  <span className="text-muted-text">🎁 Gift Packaging</span>
                  <span>₹{order.giftFee}</span>
                </div>
              )}
              <div className="h-px bg-spice-gold/30 my-1" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-dark-text">Total Paid</span>
                <span className="font-bold text-spice-gold text-xl">
                  ₹{order.total}
                </span>
              </div>
            </div>

            {/* Gift packaging details */}
            {order.giftPackaging && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-6">
                <p className="font-body text-sm font-semibold text-amber-800 mb-1">
                  🎁 Gift Packaging Added
                </p>
                {order.giftMessage && (
                  <p className="font-body text-sm text-amber-700 italic">
                    &ldquo;{order.giftMessage}&rdquo;
                  </p>
                )}
              </div>
            )}

            {/* CTA */}
            <Link
              href="/products"
              className="w-full flex items-center justify-center bg-chilli-red hover:bg-chilli-red/90 text-cream font-body font-semibold text-sm rounded-full py-3 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-muted-text font-body mt-6">
          Payment: Cash on Delivery · Thank you for choosing Twakka Achar 🙏
        </p>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

