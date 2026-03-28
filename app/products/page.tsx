import { Suspense } from "react";
import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Our Products — Twakka Achar | Premium Nepali Pickles",
  description:
    "Browse our full range of handcrafted Nepali achars — from fiery Timur to tangy Mango. Filter by spice level, type, and price.",
};

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsClient />
    </Suspense>
  );
}
