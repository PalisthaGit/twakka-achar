"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [newsletter, setNewsletter] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    setNewsletterDone(true);
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero Banner */}
      <div className="relative bg-chilli-red py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-spice-gold/20 to-transparent opacity-60" />
        <div className="absolute inset-0 bg-chilli-red/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-cream/60 text-xs font-body mb-4">
            <Link href="/" className="hover:text-cream transition-colors">
              Home
            </Link>
            <span>›</span>
            <span className="text-cream">Contact</span>
          </nav>
          <h1 className="font-heading text-white text-4xl sm:text-5xl lg:text-6xl font-bold">
            Contact Us
          </h1>
          <p className="text-cream/70 font-body text-sm mt-3 max-w-md">
            Have a question, custom order, or just want to say hello? We'd love
            to hear from you.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* ── Left: Contact Form ─────────────────────────── */}
          <div className="flex-1">
            <h2 className="font-heading text-dark-text text-2xl font-bold mb-6">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="bg-white rounded-2xl border border-spice-gold/20 p-10 text-center shadow-sm">
                <span className="text-5xl">🥣</span>
                <h3 className="font-heading text-dark-text text-xl font-bold mt-4">
                  Message Sent!
                </h3>
                <p className="text-muted-text font-body text-sm mt-2">
                  Thanks for reaching out. We'll get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      subject: "",
                      message: "",
                    });
                  }}
                  className="mt-6 bg-chilli-red hover:bg-chilli-red/90 text-white text-sm font-semibold px-8 py-2.5 rounded-full transition-colors font-body"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-spice-gold/10 p-8 shadow-sm flex flex-col gap-5"
              >
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-dark-text text-sm font-semibold font-body"
                  >
                    Full Name <span className="text-chilli-red">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="border border-spice-gold/30 rounded-xl px-4 py-3 text-sm font-body text-dark-text placeholder:text-muted-text/50 outline-none focus:ring-2 focus:ring-spice-gold/40 transition"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-dark-text text-sm font-semibold font-body"
                    >
                      Email <span className="text-chilli-red">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="border border-spice-gold/30 rounded-xl px-4 py-3 text-sm font-body text-dark-text placeholder:text-muted-text/50 outline-none focus:ring-2 focus:ring-spice-gold/40 transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="phone"
                      className="text-dark-text text-sm font-semibold font-body"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+977 98XXXXXXXX"
                      className="border border-spice-gold/30 rounded-xl px-4 py-3 text-sm font-body text-dark-text placeholder:text-muted-text/50 outline-none focus:ring-2 focus:ring-spice-gold/40 transition"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="subject"
                    className="text-dark-text text-sm font-semibold font-body"
                  >
                    Subject <span className="text-chilli-red">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Custom order, Bulk pricing, General inquiry"
                    className="border border-spice-gold/30 rounded-xl px-4 py-3 text-sm font-body text-dark-text placeholder:text-muted-text/50 outline-none focus:ring-2 focus:ring-spice-gold/40 transition"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-dark-text text-sm font-semibold font-body"
                  >
                    Message <span className="text-chilli-red">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    className="border border-spice-gold/30 rounded-xl px-4 py-3 text-sm font-body text-dark-text placeholder:text-muted-text/50 outline-none focus:ring-2 focus:ring-spice-gold/40 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-chilli-red hover:bg-chilli-red/90 text-white font-semibold text-sm py-3.5 rounded-full transition-colors font-body mt-1"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* ── Right: Info + Newsletter + Instagram ──────── */}
          <div className="lg:w-80 xl:w-96 flex flex-col gap-6">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl border border-spice-gold/10 p-6 shadow-sm">
              <h3 className="font-heading text-dark-text text-lg font-bold mb-4">
                Get in Touch
              </h3>
              <div className="flex flex-col gap-4">
                <ContactInfoRow icon={<MapPinIcon />} label="Location" value="Kathmandu, Nepal" />
                <ContactInfoRow icon={<MailIcon />} label="Email" value="hello@twakkaachar.com" />
                <ContactInfoRow icon={<PhoneIcon />} label="WhatsApp" value="Message us on WhatsApp" />
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-chilli-red rounded-2xl p-6 shadow-sm">
              <h3 className="font-heading text-white text-lg font-bold mb-2">
                Stay in the Loop
              </h3>
              <p className="text-cream/70 text-sm font-body mb-5">
                Be the first to discover new flavors, seasonal batches, and
                special offers.
              </p>

              {newsletterDone ? (
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <p className="text-cream text-sm font-semibold font-body">
                    You're subscribed! 🎉
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={newsletter}
                    onChange={(e) => setNewsletter(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-full px-4 py-2.5 text-sm font-body text-dark-text placeholder:text-muted-text/60 outline-none focus:ring-2 focus:ring-spice-gold/60"
                  />
                  <button
                    type="submit"
                    className="w-full bg-spice-gold hover:bg-spice-gold-dark text-dark-text font-semibold text-sm py-2.5 rounded-full transition-colors font-body"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-spice-gold hover:bg-spice-gold-dark text-dark-text font-semibold text-sm py-3.5 rounded-2xl transition-colors font-body shadow-sm"
            >
              <InstagramIcon />
              Follow Us on Instagram
            </a>

            {/* Response Times */}
            <div className="bg-white rounded-2xl border border-spice-gold/10 p-6 shadow-sm">
              <h3 className="font-heading text-dark-text text-lg font-bold mb-3">
                Response Times
              </h3>
              <div className="flex flex-col gap-2 text-sm font-body text-muted-text">
                <div className="flex justify-between">
                  <span>WhatsApp</span>
                  <span className="text-dark-text font-medium">Within 2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Email</span>
                  <span className="text-dark-text font-medium">Within 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Orders</span>
                  <span className="text-dark-text font-medium">Same day dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-spice-gold mt-0.5">{icon}</span>
      <div>
        <p className="text-dark-text text-sm font-semibold font-body">{label}</p>
        <p className="text-muted-text text-sm font-body">{value}</p>
      </div>
    </div>
  );
}

function MapPinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.87a16 16 0 0 0 6.29 6.29l1.23-1.23a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
