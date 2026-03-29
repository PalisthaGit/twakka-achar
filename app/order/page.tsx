"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useForm } from "@formspree/react";
import { useCart } from "@/src/lib/CartContext";

const DELIVERY_FEE = 70;
const GIFT_FEE = 50;

// --- Address data ---

const CITIES = [
  "Kathmandu",
  "Lalitpur",
  "Bhaktapur",
  "Pokhara",
  "Biratnagar",
  "Birgunj",
  "Dharan",
  "Butwal",
  "Hetauda",
  "Chitwan",
];

type AreaInfo = { name: string; lat: number; lng: number };

const AREA_MAP: Record<string, AreaInfo[]> = {
  Kathmandu: [
    { name: "Thamel", lat: 27.7149, lng: 85.3123 },
    { name: "Baneshwor", lat: 27.6913, lng: 85.3417 },
    { name: "Lazimpat", lat: 27.7214, lng: 85.3193 },
    { name: "Maharajgunj", lat: 27.7369, lng: 85.3276 },
    { name: "Koteshwor", lat: 27.6845, lng: 85.3558 },
    { name: "Balkhu", lat: 27.689, lng: 85.2931 },
    { name: "Kalimati", lat: 27.6963, lng: 85.3008 },
    { name: "Kalanki", lat: 27.6965, lng: 85.2811 },
    { name: "Chabahil", lat: 27.7186, lng: 85.3527 },
    { name: "Budhanilkantha", lat: 27.79, lng: 85.3617 },
    { name: "Bhaktapur Road", lat: 27.6962, lng: 85.3693 },
    { name: "Putalisadak", lat: 27.7017, lng: 85.3191 },
    { name: "New Road", lat: 27.7025, lng: 85.3138 },
    { name: "Ratnapark", lat: 27.7031, lng: 85.3143 },
    { name: "Boudha", lat: 27.7215, lng: 85.3621 },
    { name: "Pashupatinath", lat: 27.7109, lng: 85.3484 },
    { name: "Gongabu", lat: 27.7368, lng: 85.3108 },
    { name: "Balaju", lat: 27.7337, lng: 85.3032 },
    { name: "Swayambhu", lat: 27.7148, lng: 85.2907 },
    { name: "Kirtipur", lat: 27.6781, lng: 85.2779 },
  ],
  Lalitpur: [
    { name: "Patan", lat: 27.6641, lng: 85.324 },
    { name: "Jawalakhel", lat: 27.6727, lng: 85.3165 },
    { name: "Kupondole", lat: 27.6828, lng: 85.3199 },
    { name: "Satdobato", lat: 27.6497, lng: 85.3299 },
    { name: "Ekantakuna", lat: 27.6614, lng: 85.3278 },
    { name: "Imadol", lat: 27.6565, lng: 85.3456 },
    { name: "Balkumari", lat: 27.6772, lng: 85.3556 },
    { name: "Lagankhel", lat: 27.6614, lng: 85.3163 },
    { name: "Pulchowk", lat: 27.6801, lng: 85.3178 },
    { name: "Sanepa", lat: 27.6793, lng: 85.3041 },
  ],
  Bhaktapur: [
    { name: "Bhaktapur Durbar Square", lat: 27.6722, lng: 85.4278 },
    { name: "Suryabinayak", lat: 27.6638, lng: 85.4366 },
    { name: "Katunje", lat: 27.6552, lng: 85.418 },
    { name: "Lokanthali", lat: 27.6847, lng: 85.4012 },
    { name: "Sipadol", lat: 27.6671, lng: 85.4439 },
  ],
  Pokhara: [
    { name: "Lakeside", lat: 28.2096, lng: 83.9587 },
    { name: "Newroad", lat: 28.2331, lng: 83.9883 },
    { name: "Mahendrapool", lat: 28.2362, lng: 83.9864 },
    { name: "Bagar", lat: 28.2214, lng: 83.9781 },
    { name: "Sabhagriha", lat: 28.2426, lng: 83.9934 },
    { name: "Chipledhunga", lat: 28.2286, lng: 83.9913 },
    { name: "Prithvichowk", lat: 28.2349, lng: 83.9872 },
  ],
};

const CITY_CENTERS: Record<string, [number, number]> = {
  Biratnagar: [26.4525, 87.2718],
  Birgunj: [27.0104, 84.877],
  Dharan: [26.8147, 87.2841],
  Butwal: [27.7006, 83.4479],
  Hetauda: [27.4153, 85.0315],
  Chitwan: [27.5291, 84.3542],
};

function getAreaCenter(city: string, areaName: string): [number, number] {
  const areas = AREA_MAP[city];
  if (areas) {
    const found = areas.find((a) => a.name === areaName);
    if (found) return [found.lat, found.lng];
  }
  return CITY_CENTERS[city] ?? [27.7172, 85.324];
}

// --- Dynamic map import (SSR disabled) ---
const MapPicker = dynamic(() => import("@/src/components/ui/MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] rounded-xl bg-cream border border-spice-gold/20 flex items-center justify-center text-muted-text text-sm font-body">
      Loading map…
    </div>
  ),
});

// --- Form types ---
interface FormFields {
  fullName: string;
  phone: string;
  city: string;
  area: string;
  landmark: string;
  houseDetails: string;
  instructions: string;
}

const EMPTY_FORM: FormFields = {
  fullName: "",
  phone: "",
  city: "",
  area: "",
  landmark: "",
  houseDetails: "",
  instructions: "",
};

export default function OrderPage() {
  const router = useRouter();
  const { items, subtotal, clearCart, giftPackaging, giftMessage } = useCart();
  const giftFee = giftPackaging ? GIFT_FEE : 0;
  const total = subtotal + DELIVERY_FEE + giftFee;

  const [state, handleSubmit] = useForm("xgopakvv");
  const hiddenFormRef = useRef<HTMLFormElement>(null);

  const [fields, setFields] = useState<FormFields>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const [loading, setLoading] = useState(false);

  // Map state
  const [mapCoords, setMapCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([27.7172, 85.324]);
  const [mapPosition, setMapPosition] = useState<[number, number]>([27.7172, 85.324]);

  const areas: AreaInfo[] = AREA_MAP[fields.city] ?? [];

  function handleCityChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const city = e.target.value;
    const cityAreas = AREA_MAP[city];
    const defaultArea = cityAreas ? cityAreas[0].name : "Main Area";
    const center = cityAreas
      ? ([cityAreas[0].lat, cityAreas[0].lng] as [number, number])
      : (CITY_CENTERS[city] ?? ([27.7172, 85.324] as [number, number]));

    setFields((prev) => ({ ...prev, city, area: defaultArea }));
    setMapCenter(center);
    setMapPosition(center);
    setMapCoords(null);
    if (errors.city) setErrors((prev) => ({ ...prev, city: undefined }));
    if (errors.area) setErrors((prev) => ({ ...prev, area: undefined }));
  }

  function handleAreaChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const area = e.target.value;
    const center = getAreaCenter(fields.city, area);
    setFields((prev) => ({ ...prev, area }));
    setMapCenter(center);
    setMapPosition(center);
    setMapCoords(null);
    if (errors.area) setErrors((prev) => ({ ...prev, area: undefined }));
  }

  function handleMapMove(lat: number, lng: number) {
    setMapPosition([lat, lng]);
    setMapCoords({ lat, lng });
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

  function validate(): boolean {
    const newErrors: Partial<FormFields> = {};
    if (!fields.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!fields.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\+?[0-9\s\-]{7,15}$/.test(fields.phone.trim()))
      newErrors.phone = "Enter a valid phone number";
    if (!fields.city.trim()) newErrors.city = "Please select a city";
    if (!fields.area.trim()) newErrors.area = "Please select an area";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function buildAddressSummary(): string {
    const parts = [fields.area, fields.city];
    return parts.filter(Boolean).join(", ");
  }

  function buildWhatsAppMessage(orderId: string, date: string): string {
    const itemLines = items
      .map((i) => `🌶️ ${i.product.name} x${i.quantity} = Rs ${i.product.price * i.quantity}`)
      .join("\n");

    const coordsLine = mapCoords
      ? `${mapCoords.lat.toFixed(6)}, ${mapCoords.lng.toFixed(6)}`
      : "Not picked";

    const giftLine = giftPackaging
      ? `Yes Rs ${GIFT_FEE}`
      : "No";

    return encodeURIComponent(
      `🛒 *New Order Received!*\n` +
        `*Order ID:* ${orderId}\n` +
        `*Date:* ${date}\n\n` +
        `*Customer Details:*\n` +
        `👤 Name: ${fields.fullName}\n` +
        `📞 Phone: ${fields.phone}\n\n` +
        `*Delivery Address:*\n` +
        `🏙️ City: ${fields.city}\n` +
        `📍 Area: ${fields.area}\n` +
        `🗺️ Map: ${coordsLine}\n` +
        `🏠 Landmark: ${fields.landmark.trim() || "Not provided"}\n` +
        `🚪 House: ${fields.houseDetails.trim() || "Not provided"}\n\n` +
        `*Order Items:*\n${itemLines}\n\n` +
        `*Order Summary:*\n` +
        `Subtotal: Rs ${subtotal}\n` +
        `Delivery: Rs ${DELIVERY_FEE}\n` +
        `Gift Packaging: ${giftLine}\n` +
        `*TOTAL: Rs ${total}*\n\n` +
        `Payment: Cash on Delivery`
    );
  }

  async function handleOrder(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const orderId = `TW-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const date = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kathmandu",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const itemsText = items
      .map((i) => `${i.product.name} x${i.quantity} — ₹${i.product.price * i.quantity}`)
      .join(", ");

    const addressSummary = buildAddressSummary();
    const coordsText = mapCoords
      ? `${mapCoords.lat.toFixed(6)}, ${mapCoords.lng.toFixed(6)}`
      : "Not picked";

    const form = hiddenFormRef.current;
    if (form) {
      (form.elements.namedItem("Order_ID") as HTMLInputElement).value = orderId;
      (form.elements.namedItem("Date") as HTMLInputElement).value = date;
      (form.elements.namedItem("Customer_Name") as HTMLInputElement).value = fields.fullName;
      (form.elements.namedItem("Phone") as HTMLInputElement).value = fields.phone;
      (form.elements.namedItem("City") as HTMLInputElement).value = fields.city;
      (form.elements.namedItem("Area") as HTMLInputElement).value = fields.area;
      (form.elements.namedItem("Map_Coordinates") as HTMLInputElement).value = coordsText;
      (form.elements.namedItem("Landmark") as HTMLInputElement).value = fields.landmark || "None";
      (form.elements.namedItem("House_Details") as HTMLInputElement).value =
        fields.houseDetails || "None";
      (form.elements.namedItem("Address") as HTMLInputElement).value = addressSummary;
      (form.elements.namedItem("Special_Instructions") as HTMLInputElement).value =
        fields.instructions || "None";
      (form.elements.namedItem("Items") as HTMLInputElement).value = itemsText;
      (form.elements.namedItem("Subtotal") as HTMLInputElement).value = String(subtotal);
      (form.elements.namedItem("Delivery_Fee") as HTMLInputElement).value = String(DELIVERY_FEE);
      (form.elements.namedItem("Gift_Packaging") as HTMLInputElement).value = giftPackaging
        ? "Yes"
        : "No";
      (form.elements.namedItem("Gift_Message") as HTMLInputElement).value = giftMessage || "None";
      (form.elements.namedItem("Total") as HTMLInputElement).value = String(total);

      form.requestSubmit();
    }

    localStorage.setItem(
      "twakka-last-order",
      JSON.stringify({
        orderId,
        date,
        name: fields.fullName,
        phone: fields.phone,
        address: addressSummary,
        city: fields.city,
        area: fields.area,
        mapCoords: coordsText,
        landmark: fields.landmark || null,
        houseDetails: fields.houseDetails || null,
        lineItems: items.map((i) => ({
          name: i.product.name,
          emoji: "🫙",
          quantity: i.quantity,
          price: i.product.price,
        })),
        subtotal,
        delivery: DELIVERY_FEE,
        giftPackaging,
        giftFee,
        giftMessage,
        total,
      })
    );

    const msg = buildWhatsAppMessage(orderId, date);
    window.open(`https://wa.me/9779803904724?text=${msg}`, "_blank");

    clearCart();
    router.push("/order-confirmation");
  }

  const formspreeErrors = state.errors ? state.errors.getFormErrors() : [];

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
      {/* Hidden Formspree form */}
      <form ref={hiddenFormRef} onSubmit={handleSubmit} style={{ display: "none" }}>
        <input type="hidden" name="Order_ID" />
        <input type="hidden" name="Date" />
        <input type="hidden" name="Customer_Name" />
        <input type="hidden" name="Phone" />
        <input type="hidden" name="City" />
        <input type="hidden" name="Area" />
        <input type="hidden" name="Map_Coordinates" />
        <input type="hidden" name="Landmark" />
        <input type="hidden" name="House_Details" />
        <input type="hidden" name="Address" />
        <input type="hidden" name="Special_Instructions" />
        <input type="hidden" name="Items" />
        <input type="hidden" name="Subtotal" />
        <input type="hidden" name="Delivery_Fee" />
        <input type="hidden" name="Gift_Packaging" />
        <input type="hidden" name="Gift_Message" />
        <input type="hidden" name="Total" />
      </form>

      {/* Breadcrumb */}
      <div className="bg-chilli-red py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm font-body text-cream/70">
            <Link href="/" className="hover:text-spice-gold transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/cart" className="hover:text-spice-gold transition-colors">
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
          <form onSubmit={handleOrder} noValidate className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-spice-gold/10 p-6 sm:p-8">
              <h2 className="font-heading font-bold text-dark-text text-xl mb-6">
                Delivery Details
              </h2>

              <div className="flex flex-col gap-5">
                {/* Name */}
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

                {/* City Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="city" className="text-sm font-medium text-dark-text font-body">
                    City<span className="text-chilli-red ml-0.5">*</span>
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={fields.city}
                    onChange={handleCityChange}
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm font-body text-dark-text outline-none focus:ring-2 focus:ring-spice-gold bg-cream transition-colors ${
                      errors.city ? "border-red-400 focus:ring-red-300" : "border-spice-gold/30"
                    }`}
                  >
                    <option value="">Select city…</option>
                    {CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-xs text-red-500 font-body">{errors.city}</p>
                  )}
                </div>

                {/* Area Dropdown */}
                {fields.city && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="area" className="text-sm font-medium text-dark-text font-body">
                      Area<span className="text-chilli-red ml-0.5">*</span>
                    </label>
                    {areas.length > 0 ? (
                      <select
                        id="area"
                        name="area"
                        value={fields.area}
                        onChange={handleAreaChange}
                        className={`w-full rounded-xl border px-4 py-2.5 text-sm font-body text-dark-text outline-none focus:ring-2 focus:ring-spice-gold bg-cream transition-colors ${
                          errors.area
                            ? "border-red-400 focus:ring-red-300"
                            : "border-spice-gold/30"
                        }`}
                      >
                        {areas.map((a) => (
                          <option key={a.name} value={a.name}>
                            {a.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        readOnly
                        value="Main Area"
                        className="w-full rounded-xl border border-spice-gold/30 px-4 py-2.5 text-sm font-body text-muted-text bg-cream/60 outline-none"
                      />
                    )}
                    {errors.area && (
                      <p className="text-xs text-red-500 font-body">{errors.area}</p>
                    )}
                  </div>
                )}

                {/* Map Picker */}
                {fields.city && (
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium text-dark-text font-body">
                      Pin Your Location
                      <span className="text-muted-text font-normal ml-1">(optional — drag or tap the map)</span>
                    </p>
                    <MapPicker
                      center={mapCenter}
                      position={mapPosition}
                      onPositionChange={handleMapMove}
                    />
                    {mapCoords && (
                      <p className="text-xs text-muted-text font-body">
                        📍 {mapCoords.lat.toFixed(6)}, {mapCoords.lng.toFixed(6)}
                      </p>
                    )}
                  </div>
                )}

                {/* Landmark */}
                <Field
                  label="Nearby Landmark"
                  name="landmark"
                  type="text"
                  placeholder="e.g. Near big ground, opposite school, red gate"
                  value={fields.landmark}
                  onChange={handleChange}
                  optional
                />

                {/* House Details */}
                <Field
                  label="House / Flat Details"
                  name="houseDetails"
                  type="text"
                  placeholder="e.g. 3rd floor, blue gate, flat 4B"
                  value={fields.houseDetails}
                  onChange={handleChange}
                  optional
                />

                {/* Special Instructions */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-dark-text font-body">
                    Special Instructions
                    <span className="text-muted-text font-normal ml-1">(optional)</span>
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

              {formspreeErrors.length > 0 && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  {formspreeErrors.map((err, i) => (
                    <p key={i} className="text-sm text-red-600 font-body">
                      {err.message}
                    </p>
                  ))}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || state.submitting}
                className="mt-8 w-full flex items-center justify-center gap-2 bg-chilli-red hover:bg-chilli-red/90 disabled:opacity-60 disabled:cursor-not-allowed text-cream font-body font-semibold text-sm rounded-full py-3.5 transition-colors"
              >
                {loading || state.submitting ? "Placing Order…" : "Place Order"}
              </button>

              <p className="text-center text-xs text-muted-text font-body mt-3">
                We will call you to confirm your order before delivery.
              </p>
            </div>
          </form>

          {/* Order Summary */}
          <div className="lg:w-80 xl:w-96 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-spice-gold/10 p-6 sticky top-20">
              <h2 className="font-heading font-bold text-dark-text text-xl mb-5">
                Order Summary
              </h2>

              <div className="flex flex-col gap-3 mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <span className="text-xl">🫙</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium font-body text-dark-text truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-text font-body">Qty: {item.quantity}</p>
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
                  <span className="font-bold text-spice-gold text-xl">₹{total}</span>
                </div>
              </div>
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
  optional,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-dark-text font-body">
        {label}
        {required && <span className="text-chilli-red ml-0.5">*</span>}
        {optional && <span className="text-muted-text font-normal ml-1">(optional)</span>}
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
          error ? "border-red-400 focus:ring-red-300" : "border-spice-gold/30"
        }`}
      />
      {error && <p className="text-xs text-red-500 font-body">{error}</p>}
    </div>
  );
}

