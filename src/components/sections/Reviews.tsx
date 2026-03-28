const reviews = [
  {
    id: 1,
    name: "Priya S.",
    rating: 5,
    text: "The Timur Ko Achar is unlike anything I've had outside Nepal. Genuinely authentic flavour — my whole family is obsessed!",
  },
  {
    id: 2,
    name: "Rohan M.",
    rating: 5,
    text: "Ordered two jars of the tomato achar and finished them in a week. The smokiness is incredible. Reordering immediately.",
  },
  {
    id: 3,
    name: "Anita T.",
    rating: 5,
    text: "Fast delivery, beautifully packaged, and the taste is exactly like homemade. Twakka Achar is now a kitchen staple.",
  },
  {
    id: 4,
    name: "Suraj K.",
    rating: 4,
    text: "Great quality achars. The Aaul Ko Achar reminded me of my grandmother's recipe. Will definitely order again.",
  },
  {
    id: 5,
    name: "Meena G.",
    rating: 5,
    text: "I gifted a set to my parents and they called me the next day raving about it. Highly recommend as a thoughtful gift!",
  },
  {
    id: 6,
    name: "Kiran B.",
    rating: 5,
    text: "The spice level is perfect — bold but not overwhelming. Tastes fresh, not like any store-bought pickle I've tried.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={i < rating ? "text-spice-gold" : "text-muted-text/30"}
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="bg-chilli-red py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-white text-3xl sm:text-4xl font-bold">
            What Our Customers Say
          </h2>
          <p className="text-cream/70 font-body text-sm mt-3">
            Real flavors. Real stories. Real satisfaction.
          </p>
        </div>

        {/* Review grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 flex flex-col gap-3 shadow-sm"
            >
              <StarRating rating={review.rating} />
              <p className="text-dark-text text-sm leading-relaxed font-body flex-1">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="text-muted-text text-xs font-semibold font-body uppercase tracking-wide">
                — {review.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
