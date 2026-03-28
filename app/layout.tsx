import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import { CartProvider } from "@/src/lib/CartContext";
import WhatsAppButton from "@/src/components/ui/WhatsAppButton";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Twakka Achar — Authentic Nepali Homemade Pickles | Add Twakka to Every Bite",
    template: "%s | Twakka Achar",
  },
  description:
    "Discover Twakka Achar's authentic, handcrafted Nepali pickles made with traditional recipes and the finest spices. Order premium achar online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <CartProvider>
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
            <WhatsAppButton />
          </CartProvider>
        </body>
    </html>
  );
}
