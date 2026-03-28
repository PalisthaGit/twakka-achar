import Hero from "@/src/components/sections/Hero";
import FeaturedProducts from "@/src/components/sections/FeaturedProducts";
import Reviews from "@/src/components/sections/Reviews";
import TrustBadges from "@/src/components/sections/TrustBadges";
import CTABanner from "@/src/components/sections/CTABanner";

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
