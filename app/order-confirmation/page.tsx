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
  lineItems: LineItem[];
  subtotal: number;
  delivery: number;
  giftPackaging: boolean;
  giftFee: number;
  giftMessage: string;
  total: number;
}

const WHATSAPP_NUMBER = "9779803904724";

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

  const waText = encodeURIComponent(
    `Hi! I placed an order on Twakka Achar.\nOrder ID: ${order.orderId}\nI'd like to track my order. 🙏`
  );

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

            {/* WhatsApp notice */}
            <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 flex gap-3 items-start mb-6">
              <span className="text-green-600 mt-0.5 shrink-0">
                <WhatsAppIcon size={18} />
              </span>
              <p className="text-green-800 font-body text-sm leading-relaxed">
                We will contact you on WhatsApp to confirm delivery details.
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
                <p className="text-muted-text">
                  {order.address}, {order.city}
                </p>
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

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/products"
                className="flex-1 flex items-center justify-center gap-2 border-2 border-chilli-red text-chilli-red hover:bg-chilli-red hover:text-cream font-body font-semibold text-sm rounded-full py-3 transition-colors"
              >
                Continue Shopping
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-body font-semibold text-sm rounded-full py-3 transition-colors"
              >
                <WhatsAppIcon size={16} />
                Track on WhatsApp
              </a>
            </div>
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

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}
