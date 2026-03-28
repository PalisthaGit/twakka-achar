"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/src/lib/CartContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Our Story", href: "/our-story" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems: cartCount } = useCart();
  const router = useRouter();

  function handleSearch(query: string) {
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/products?search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/products");
    }
  }

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch(searchQuery);
      setMenuOpen(false);
    }
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    if (value === "") {
      router.push("/products");
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-chilli-red shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 shrink-0">
          <span className="text-xl leading-none">🌶️</span>
          <span className="text-spice-gold text-2xl font-bold tracking-wide font-heading">
            Twakka
          </span>
        </Link>

        {/* Search — hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <input
              type="search"
              placeholder="Search for achars..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="w-full rounded-full px-5 py-1.5 text-sm bg-cream text-dark-text placeholder:text-muted-text outline-none focus:ring-2 focus:ring-spice-gold font-body"
            />
            <button
              onClick={() => handleSearch(searchQuery)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-spice-gold-dark transition-colors"
              aria-label="Search"
            >
              <SearchIcon />
            </button>
          </div>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-6 shrink-0 font-body">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-cream text-sm font-medium hover:text-spice-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop icon actions */}
        <div className="hidden md:flex items-center gap-4 shrink-0 ml-2">
          <Link
            href="/account"
            className="text-cream hover:text-spice-gold transition-colors"
            aria-label="Account"
          >
            <AccountIcon />
          </Link>
          <Link
            href="/cart"
            className="relative text-cream hover:text-spice-gold transition-colors"
            aria-label="Cart"
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-spice-gold text-dark-text text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center font-body">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile: cart + hamburger pushed to right */}
        <div className="flex md:hidden items-center gap-3 ml-auto">
          <Link
            href="/cart"
            className="relative text-cream hover:text-spice-gold transition-colors"
            aria-label="Cart"
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-spice-gold text-dark-text text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center font-body">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="text-cream p-1 hover:text-spice-gold transition-colors"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-chilli-red border-t border-spice-gold/20 px-4 pb-5 pt-3 font-body">
          {/* Mobile search */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search for achars..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="w-full rounded-full px-5 py-2 text-sm bg-cream text-dark-text placeholder:text-muted-text outline-none focus:ring-2 focus:ring-spice-gold"
              />
              <button
                onClick={() => { handleSearch(searchQuery); setMenuOpen(false); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-spice-gold-dark transition-colors"
                aria-label="Search"
              >
                <SearchIcon />
              </button>
            </div>
          </div>

          {/* Mobile nav links */}
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream text-sm font-medium hover:text-spice-gold transition-colors py-2 border-b border-spice-gold/10 last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/account"
              className="text-cream text-sm font-medium hover:text-spice-gold transition-colors py-2"
              onClick={() => setMenuOpen(false)}
            >
              Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
