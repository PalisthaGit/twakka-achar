const badges = [
  {
    id: 1,
    title: "Secure Payment",
    description:
      "Your transactions are protected with industry-standard encryption. Shop with complete confidence.",
    icon: <ShieldIcon />,
  },
  {
    id: 2,
    title: "Fast Delivery",
    description:
      "Orders dispatched within 24 hours and delivered fresh to your doorstep across Nepal.",
    icon: <TruckIcon />,
  },
  {
    id: 3,
    title: "We're Here to Help",
    description:
      "Have a question or issue? Contact us on WhatsApp or email and we'll sort it out for you.",
    icon: <HeadphonesIcon />,
  },
];

function ShieldIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
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

function HeadphonesIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}

export default function TrustBadges() {
  return (
    <section className="bg-cream py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex flex-col items-center text-center gap-4 p-6"
            >
              <div className="text-spice-gold">{badge.icon}</div>
              <h3 className="font-heading text-dark-text text-lg font-bold">
                {badge.title}
              </h3>
              <p className="text-muted-text text-sm leading-relaxed font-body max-w-xs">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
