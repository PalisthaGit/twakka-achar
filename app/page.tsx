import type { Metadata } from "next";
import Hero from "@/src/components/sections/Hero";
import FeaturedProducts from "@/src/components/sections/FeaturedProducts";
import Reviews from "@/src/components/sections/Reviews";
import TrustBadges from "@/src/components/sections/TrustBadges";
import CTABanner from "@/src/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Twakka Achar — Authentic Nepali Homemade Pickles | Add Twakka to Every Bite",
  description:
    "Handcrafted with traditional recipes, bold spices, and fresh local ingredients from Kathmandu — bottled to bring Nepal's flavours to your table.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Reviews />
      <TrustBadges />
      <CTABanner />
    </>
  );
}
