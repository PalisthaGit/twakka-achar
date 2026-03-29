import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Twakka Achar",
  description:
    "Learn about Twakka Achar — our mission to bring authentic Nepali achar to every table with no compromise on taste or quality.",
};

const whyUs = [
  {
    icon: <LeafIcon />,
    title: "100% Natural Ingredients",
    body: "No preservatives, no artificial colours. Every ingredient is sourced fresh and natural.",
  },
  {
    icon: <RecipeIcon />,
    title: "Traditional Recipes",
    body: "Recipes passed down through generations, unchanged and uncompromised.",
  },
  {
    icon: <JarIcon />,
    title: "Small Batch Made",
    body: "Every batch is handcrafted in small quantities to ensure consistent quality.",
  },
  {
    icon: <DeliveryIcon />,
    title: "Fast Delivery",
    body: "Fresh from our kitchen to your door, packed with care and delivered promptly.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-cream">
      {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-chilli-red relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-spice-gold/15 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <span className="inline-block text-spice-gold text-xs font-semibold uppercase tracking-widest font-body mb-4">
            Who we are
          </span>
          <h1 className="font-heading text-white text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            About Us
          </h1>
          <p className="mt-4 text-cream/70 font-body text-lg max-w-xl mx-auto">
            The story behind every jar.
          </p>
        </div>
      </section>

      {/* ── 2. Mission Section ──────────────────────────────────────────── */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <div className="w-12 h-1 rounded-full bg-spice-gold" />
          <h2 className="font-heading text-dark-text text-3xl sm:text-4xl font-bold">
            Our Mission
          </h2>
          <p className="text-muted-text font-body text-base leading-relaxed">
            At Twakka Achar, our mission is simple: to bring authentic Nepali
            achar to every table without compromise. We believe that food made
            with honest ingredients and genuine care tastes better — and we
            refuse to cut corners. From the spices we select to the jars we
            seal, every step reflects our commitment to taste, quality, and
            tradition.
          </p>
          <p className="text-muted-text font-body text-base leading-relaxed">
            Nepal has a rich culinary heritage that deserves to be celebrated far
            beyond its borders. We are here to carry that legacy forward, one jar
            at a time.
          </p>
        </div>
      </section>

      {/* ── 3. Why Us Section ───────────────────────────────────────────── */}
      <section className="bg-chilli-red py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-spice-gold text-xs font-semibold uppercase tracking-widest font-body">
              Why choose us
            </span>
            <h2 className="font-heading text-white text-3xl sm:text-4xl font-bold mt-3">
              What sets us apart
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-spice-gold/20 rounded-2xl p-8 flex flex-col gap-4 hover:bg-white/10 transition-colors"
              >
                <span className="text-spice-gold w-10 h-10">{item.icon}</span>
                <h3 className="font-heading text-white text-lg font-bold">
                  {item.title}
                </h3>
                <p className="text-cream/70 font-body text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Promise Section ──────────────────────────────────────────── */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <div className="w-12 h-1 rounded-full bg-spice-gold" />
          <h2 className="font-heading text-dark-text text-3xl sm:text-4xl font-bold">
            Our Promise to You
          </h2>
          <p className="text-muted-text font-body text-base leading-relaxed">
            Every jar of Twakka Achar is made fresh, in small batches, with
            ingredients we would use in our own kitchen. We pack each jar with
            love and care, and deliver it to your door so you can taste the
            difference that honesty makes.
          </p>
          <p className="text-muted-text font-body text-base leading-relaxed">
            No fillers. No shortcuts. Just authentic Nepali achar — the way it
            was always meant to be made.
          </p>
        </div>
      </section>

      {/* ── 5. CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-chilli-red py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <span className="text-spice-gold text-xs font-semibold uppercase tracking-widest font-body">
            Ready to taste it?
          </span>
          <h2 className="font-heading text-white text-4xl sm:text-5xl font-bold">
            Try Twakka Today
          </h2>
          <p className="text-cream/70 font-body text-base max-w-md">
            Discover our range of handcrafted Nepali achars, each made with
            love and tradition.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-spice-gold hover:bg-spice-gold-dark text-dark-text font-semibold text-sm px-10 py-3.5 rounded-full transition-colors font-body"
          >
            Browse Products
          </Link>
        </div>
      </section>
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function LeafIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 20A7 7 0 0 1 4 13c0-5 3-9 8-11 5 2 8 6 8 11a7 7 0 0 1-7 7z" />
      <path d="M11 20v-9" />
    </svg>
  );
}

function RecipeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function JarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 2h8" />
      <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
      <rect x="9" y="11" width="14" height="10" rx="2" />
      <circle cx="12" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
    </svg>
  );
}
