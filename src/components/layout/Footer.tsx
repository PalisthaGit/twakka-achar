import Link from "next/link";

const quickLinks = [
  { label: "Our Products", href: "/products" },
  { label: "About Us", href: "/our-story" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="bg-chilli-red font-body">
      {/* Main columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* Column 1 — Brand */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-1.5 w-fit">
            <span className="text-xl leading-none">🌶️</span>
            <span className="text-spice-gold text-2xl font-bold tracking-wide font-heading">
              Twakka
            </span>
          </Link>
          <p className="text-cream/80 text-sm leading-relaxed max-w-xs">
            Authentic Nepali Homemade Pickles — crafted with love, spice, and
            generations of tradition.
          </p>
          <a
            href="https://instagram.com/twakkaachaar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-cream/70 hover:text-spice-gold transition-colors text-sm w-fit"
            aria-label="Follow us on Instagram"
          >
            <InstagramIcon />
            <span>@twakkaachaar</span>
          </a>
        </div>

        {/* Column 2 — Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-spice-gold font-semibold text-sm uppercase tracking-widest">
            Quick Links
          </h3>
          <nav className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream/80 text-sm hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Column 3 — Contact */}
        <div className="flex flex-col gap-4">
          <h3 className="text-spice-gold font-semibold text-sm uppercase tracking-widest">
            Contact Us
          </h3>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:twakkaachaar@gmail.com"
              className="flex items-center gap-2 text-cream/80 hover:text-white transition-colors text-sm"
            >
              <MailIcon />
              <span>twakkaachaar@gmail.com</span>
            </a>
            <a
              href="https://instagram.com/twakkaachaar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-cream/80 hover:text-white transition-colors text-sm"
            >
              <InstagramIcon />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-spice-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-cream/50 text-xs text-center">
            © 2026 Twakka Achar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
