import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="bg-chilli-red py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
        <span className="text-spice-gold text-sm font-semibold uppercase tracking-widest font-body">
          Fresh from Kathmandu
        </span>

        <h2 className="font-heading text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          Ready to taste real Nepali achar?
        </h2>

        <p className="text-cream/75 font-body text-base sm:text-lg leading-relaxed max-w-xl">
          Join thousands of happy customers who have made Twakka Achar a
          permanent fixture at their table. Every jar is made fresh, in small
          batches, with no preservatives.
        </p>

        <Link
          href="/products"
          className="inline-flex items-center justify-center bg-spice-gold hover:bg-spice-gold-dark text-dark-text font-semibold text-sm px-10 py-3.5 rounded-full transition-colors font-body"
        >
          Order Now
        </Link>
      </div>
    </section>
  );
}
