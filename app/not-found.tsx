import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-chilli-red flex items-center justify-center px-4">
      <div className="text-center flex flex-col items-center gap-6 max-w-lg">
        <p className="font-heading text-spice-gold text-8xl sm:text-9xl font-bold leading-none">
          404
        </p>

        <div className="flex flex-col gap-3">
          <h1 className="font-heading text-white text-3xl sm:text-4xl font-bold">
            Oops! Page not found
          </h1>
          <p className="text-cream/70 font-body text-base">
            Looks like this page got lost in the spice rack.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-spice-gold hover:bg-spice-gold-dark text-dark-text font-semibold text-sm px-8 py-3 rounded-full transition-colors font-body"
          >
            Go Back Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center border border-spice-gold text-spice-gold hover:bg-spice-gold/10 font-semibold text-sm px-8 py-3 rounded-full transition-colors font-body"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
