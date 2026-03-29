"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/src/lib/CartContext";

const DELIVERY_FEE = 70;

interface FormFields {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  instructions: string;
}

const EMPTY_FORM: FormFields = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  instructions: "",
};

const GIFT_FEE = 50;

export default function OrderPage() {
  const { items, subtotal, clearCart, giftPackaging, giftMessage } = useCart();
  const giftFee = giftPackaging ? GIFT_FEE : 0;
  const total = subtotal + DELIVERY_FEE + giftFee;

  const [fields, setFields] = useState<FormFields>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const newErrors: Partial<FormFields> = {};
    if (!fields.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!fields.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\+?[0-9\s\-]{7,15}$/.test(fields.phone.trim()))
      newErrors.phone = "Enter a valid phone number";
    if (!fields.address.trim()) newErrors.address = "Delivery address is required";
    if (!fields.city.trim()) newErrors.city = "City is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function buildWhatsAppMessage(): string {
    const itemLines = items
      .map((i) => `🌶️ ${i.product.name} x${i.quantity} — ₹${i.product.price * i.quantity}`)
      .join("\n");

    const instructions = fields.instructions.trim() || "None";

    const giftLine = giftPackaging
      ? `🎁 Gift Packaging: Yes\n${giftMessage.trim() ? `💌 Gift Message: ${giftMessage.trim()}\n` : ""}`
      : "";

    return encodeURIComponent(
      `🛒 *New Order from Twakka Achar*\n\n` +
        `*Customer Details:*\n` +
        `Name: ${fields.fullName}\n` +
        `Phone: ${fields.phone}\n` +
        `Address: ${fields.address}, ${fields.city}\n` +
        `Special Instructions: ${instructions}\n\n` +
        `*Order Items:*\n${itemLines}\n\n` +
        (giftLine ? `*Gift Details:*\n${giftLine}\n` : "") +
        `*Order Summary:*\n` +
        `Subtotal: ₹${subtotal}\n` +
        `Delivery: ₹${DELIVERY_FEE}\n` +
        (giftPackaging ? `Gift Packaging: ₹${GIFT_FEE}\n` : "") +
        `*Total: ₹${total}*\n\n` +
        `Payment: Cash on Delivery\n\n` +
        `Thank you for ordering from Twakka Achar! 🙏`
    );
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    // Open WhatsApp with pre-filled message
    const msg = buildWhatsAppMessage();
    window.open(`https://wa.me/9779803904724?text=${msg}`, "_blank");

    clearCart();
    setSubmitted(true);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormFields]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  if (submitted) {
    return <SuccessScreen />;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-spice-gold/10 p-10 max-w-md w-full text-center">
          <div className="text-7xl mb-6">🛒</div>
          <h2 className="font-heading font-bold text-dark-text text-2xl mb-2">
            Your cart is empty
          </h2>
          <p className="text-muted-text font-body text-sm mb-8">
            Add some delicious achar to your cart before placing an order.
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
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb */}
      <div className="bg-chilli-red py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm font-body text-cream/70">
            <Link href="/" className="hover:text-spice-gold transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/cart"
              className="hover:text-spice-gold transition-colors"
            >
              Cart
            </Link>
            <span>/</span>
            <span className="text-spice-gold font-medium">Order</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-heading text-3xl font-bold text-dark-text mb-8">
          Complete Your Order
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Order Form */}
          <form onSubmit={handleSubmit} noValidate className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-spice-gold/10 p-6 sm:p-8">
              <h2 className="font-heading font-bold text-dark-text text-xl mb-6">
                Delivery Details
              </h2>

              <div className="flex flex-col gap-5">
                {/* Full Name */}
                <Field
                  label="Full Name"
                  name="fullName"
                  type="text"
                  placeholder="Asha Sharma"
                  value={fields.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                  required
                />

                {/* Phone */}
                <Field
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="+977 98XXXXXXXX"
                  value={fields.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  required
                />

                {/* Address */}
                <Field
                  label="Delivery Address"
                  name="address"
                  type="text"
                  placeholder="Street / Tole / Landmark"
                  value={fields.address}
                  onChange={handleChange}
                  error={errors.address}
                  required
                />

                {/* City */}
                <Field
                  label="City"
                  name="city"
                  type="text"
                  placeholder="Kathmandu"
                  value={fields.city}
                  onChange={handleChange}
                  error={errors.city}
                  required
                />

                {/* Special Instructions */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-dark-text font-body">
                    Special Instructions
                    <span className="text-muted-text font-normal ml-1">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    name="instructions"
                    value={fields.instructions}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any notes for delivery or spice preferences..."
                    className="w-full rounded-xl border border-spice-gold/30 bg-cream px-4 py-2.5 text-sm font-body text-dark-text placeholder:text-muted-text outline-none focus:ring-2 focus:ring-spice-gold resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 w-full flex items-center justify-center gap-2 bg-chilli-red hover:bg-chilli-red/90 text-cream font-body font-semibold text-sm rounded-full py-3.5 transition-colors"
              >
                <WhatsAppIcon />
                Place Order via WhatsApp
              </button>

              <p className="text-center text-xs text-muted-text font-body mt-3">
                We will contact you on WhatsApp to confirm your order.
              </p>
            </div>
          </form>

          {/* Order Summary */}
          <div className="lg:w-80 xl:w-96 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-spice-gold/10 p-6 sticky top-20">
              <h2 className="font-heading font-bold text-dark-text text-xl mb-5">
                Order Summary
              </h2>

              {items.length === 0 ? (
                <p className="text-muted-text text-sm font-body">
                  Your cart is empty.{" "}
                  <Link href="/products" className="text-chilli-red underline">
                    Browse products
                  </Link>
                </p>
              ) : (
                <>
                  <div className="flex flex-col gap-3 mb-4">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-3"
                      >
                        <span className="text-xl">{item.product.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium font-body text-dark-text truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-muted-text font-body">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="text-sm font-body font-semibold text-spice-gold shrink-0">
                          ₹{item.product.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-spice-gold/20 mb-4" />

                  <div className="flex flex-col gap-2 font-body text-sm">
                    <div className="flex justify-between text-dark-text">
                      <span className="text-muted-text">Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-dark-text">
                      <span className="text-muted-text">Delivery</span>
                      <span>₹{DELIVERY_FEE}</span>
                    </div>
                    {giftPackaging && (
                      <div className="flex justify-between text-dark-text">
                        <span className="text-muted-text">🎁 Gift Packaging</span>
                        <span>₹{GIFT_FEE}</span>
                      </div>
                    )}
                    <div className="h-px bg-spice-gold/20 my-1" />
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-dark-text">Total</span>
                      <span className="font-bold text-spice-gold text-xl">
                        ₹{total}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-dark-text font-body">
        {label}
        {required && <span className="text-chilli-red ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-xl border px-4 py-2.5 text-sm font-body text-dark-text placeholder:text-muted-text outline-none focus:ring-2 focus:ring-spice-gold bg-cream transition-colors ${
          error
            ? "border-red-400 focus:ring-red-300"
            : "border-spice-gold/30"
        }`}
      />
      {error && (
        <p className="text-xs text-red-500 font-body">{error}</p>
      )}
    </div>
  );
}

function SuccessScreen() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-spice-gold/10 p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <WhatsAppIcon size={32} color="#25D366" />
        </div>
        <h2 className="font-heading font-bold text-dark-text text-2xl mb-3">
          Order Placed!
        </h2>
        <p className="text-muted-text font-body text-sm leading-relaxed mb-8">
          Your order has been placed! We will contact you on WhatsApp to
          confirm.
        </p>
        <Link
          href="/products"
          className="inline-block bg-chilli-red hover:bg-chilli-red/90 text-cream font-body font-semibold text-sm rounded-full px-8 py-3 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

function WhatsAppIcon({
  size = 18,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}
