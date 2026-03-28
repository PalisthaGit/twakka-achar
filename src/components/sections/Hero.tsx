import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-chilli-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left — copy */}
        <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
          <span className="text-spice-gold text-sm font-semibold uppercase tracking-widest font-body">
            Authentic Nepali Homemade Pickles
          </span>

          <h1 className="font-heading text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Add Twakka To{" "}
            <span className="text-spice-gold">Every Bite</span>
          </h1>

          <p className="text-cream/80 text-base sm:text-lg leading-relaxed font-body max-w-lg mx-auto lg:mx-0">
            Handcrafted with traditional recipes, bold spices, and fresh local
            ingredients from Kathmandu — bottled to bring Nepal's flavours to
            your table.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start font-body">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-spice-gold hover:bg-spice-gold-dark text-dark-text font-semibold text-sm px-8 py-3 rounded-full transition-colors"
            >
              Order Now
            </Link>
            <Link
              href="/our-story"
              className="inline-flex items-center justify-center gap-2 border border-cream/40 hover:border-cream text-cream font-medium text-sm px-8 py-3 rounded-full transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Right — placeholder hero image */}
        <div className="flex-1 w-full max-w-md lg:max-w-none">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-spice-gold/10 border border-spice-gold/20 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-spice-gold/60">
              <span className="text-7xl">🥣</span>
              <span className="text-sm font-body font-medium tracking-wide">
                Hero Image — coming soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
