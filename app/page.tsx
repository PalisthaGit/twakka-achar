import type { Metadata } from "next";
import Hero from "@/src/components/sections/Hero";
import FeaturedProducts from "@/src/components/sections/FeaturedProducts";
import Reviews from "@/src/components/sections/Reviews";
import TrustBadges from "@/src/components/sections/TrustBadges";
import CTABanner from "@/src/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Authentic Nepali Achar and Pickles",
  description:
    "Add Twakka to every bite. Handcrafted Nepali achar made with traditional recipes and fresh ingredients from Kathmandu. Order online with home delivery.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Twakka Achar",
  description:
    "Authentic handcrafted Nepali achar delivered to your door. Premium quality pickles made with traditional recipes from Kathmandu.",
  url: "https://twakkaachar.vercel.app",
  email: "twakkaachaar@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Hero />
      <FeaturedProducts />
      <Reviews />
      <TrustBadges />
      <CTABanner />
    </>
  );
}
