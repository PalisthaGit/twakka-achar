import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story — Twakka Achar",
  description:
    "From a family kitchen in Kathmandu to your table — the story behind Twakka Achar's authentic, handcrafted Nepali pickles.",
};

// ─── Values Data ──────────────────────────────────────────────────────────────

const values = [
  {
    icon: <RecipeIcon />,
    title: "Traditional Recipes",
    body: "No shortcuts. No compromises. Every achar follows the same recipe that has been passed down through our family for generations.",
  },
  {
    icon: <LeafIcon />,
    title: "Fresh Local Ingredients",
    body: "We source directly from farmers across Nepal — from Himalayan timur to Terai mangoes — because quality starts at the root.",
  },
  {
    icon: <HeartIcon />,
    title: "Made with Love",
    body: "Every jar is small-batch and handcrafted. We make what we would proudly serve at our own table, nothing more and nothing less.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OurStoryPage() {
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
            Our Story
          </h1>
          <p className="mt-4 text-cream/70 font-body text-lg max-w-xl mx-auto">
            From Kathmandu's kitchen to your table.
          </p>
        </div>
      </section>

      {/* ── 2. Story Section ────────────────────────────────────────────── */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left — image */}
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-3xl overflow-hidden bg-white border border-spice-gold/10 shadow-md aspect-[4/3] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-spice-gold/40">
                  <span className="text-8xl">🥣</span>
                  <span className="text-sm font-body font-medium tracking-wide text-muted-text">
                    Making achar — image coming soon
                  </span>
                </div>
              </div>
            </div>

            {/* Right — copy */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              {/* Gold divider */}
              <div className="w-12 h-1 rounded-full bg-spice-gold" />

              <h2 className="font-heading text-dark-text text-3xl sm:text-4xl font-bold leading-snug">
                Born from a family recipe
              </h2>

              <p className="text-muted-text font-body text-base leading-relaxed">
                Twakka Achar began not in a factory, but in a small kitchen in
                Kathmandu, where our grandmother would spend entire mornings
                grinding spices by hand. The rhythm of the stone grinder, the
                scent of timur and mustard oil — that was our earliest memory of
                what food could feel like.
              </p>

              <p className="text-muted-text font-body text-base leading-relaxed">
                For decades, her recipes lived only in family memory — measured
                in pinches and instinct, never written down. When we decided to
                share these flavours beyond our own table, we made a promise:
                nothing would change. Same ingredients. Same process. Same love.
              </p>

              <p className="text-muted-text font-body text-base leading-relaxed">
                Today, every jar of Twakka Achar carries that promise. We are
                still a small team, still hand-packing every batch, still
                sourcing from the same local farmers. What started as a family
                tradition is now a way to bring a piece of Nepal's culinary
                heritage to tables everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Values Section ───────────────────────────────────────────── */}
      <section className="bg-chilli-red py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-spice-gold text-xs font-semibold uppercase tracking-widest font-body">
              Our principles
            </span>
            <h2 className="font-heading text-white text-3xl sm:text-4xl font-bold mt-3">
              What makes us different
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white/5 border border-spice-gold/20 rounded-2xl p-8 flex flex-col gap-4 hover:bg-white/10 transition-colors"
              >
                <span className="text-spice-gold w-10 h-10">{v.icon}</span>
                <h3 className="font-heading text-white text-xl font-bold">
                  {v.title}
                </h3>
                <p className="text-cream/70 font-body text-sm leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Founder Section ──────────────────────────────────────────── */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-spice-gold text-xs font-semibold uppercase tracking-widest font-body">
              The team
            </span>
            <h2 className="font-heading text-dark-text text-3xl sm:text-4xl font-bold mt-3">
              The people behind Twakka
            </h2>
          </div>

          <div className="flex justify-center">
            <div className="bg-white rounded-3xl border border-spice-gold/10 shadow-sm p-8 flex flex-col sm:flex-row items-center gap-8 max-w-2xl w-full">
              {/* Avatar placeholder */}
              <div className="w-28 h-28 rounded-full bg-cream border-2 border-spice-gold/20 flex items-center justify-center shrink-0">
                <span className="text-5xl">👩‍🍳</span>
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-3 text-center sm:text-left">
                <div>
                  <h3 className="font-heading text-dark-text text-xl font-bold">
                    Sita Devi Sharma
                  </h3>
                  <p className="text-spice-gold text-sm font-semibold font-body mt-0.5">
                    Founder & Head of Recipes
                  </p>
                </div>
                <div className="w-8 h-0.5 bg-spice-gold rounded-full hidden sm:block" />
                <p className="text-muted-text font-body text-sm leading-relaxed">
                  Born and raised in Kathmandu, Sita learned to make achar from
                  her mother before she could read. After years of sharing jars
                  with neighbours and friends, she decided the world deserved a
                  taste too. She still oversees every recipe at Twakka Achar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CTA Section ──────────────────────────────────────────────── */}
      <section className="bg-chilli-red py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <span className="text-spice-gold text-xs font-semibold uppercase tracking-widest font-body">
            Ready to taste it?
          </span>
          <h2 className="font-heading text-white text-4xl sm:text-5xl font-bold">
            Taste the tradition
          </h2>
          <p className="text-cream/70 font-body text-base max-w-md">
            Every jar tells a story of heritage, heat, and honest ingredients.
            Find yours in our collection.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-spice-gold hover:bg-spice-gold-dark text-dark-text font-semibold text-sm px-10 py-3.5 rounded-full transition-colors font-body"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

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

function HeartIcon() {
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
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
