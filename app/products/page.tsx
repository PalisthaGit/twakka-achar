import { Suspense } from "react";
import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Shop All Nepali Achars and Pickles",
  description:
    "Browse our full range of premium handcrafted Nepali achars. From Dalle Khursani to Lapsi, Timur to Mango. Two sizes available with home delivery.",
};

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsClient />
    </Suspense>
  );
}
