import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — Twakka Achar",
  description:
    "Get in touch with Twakka Achar for orders, custom requests, or general inquiries. We're based in Kathmandu and respond within 24 hours.",
};

export default function ContactPage() {
  return <ContactClient />;
}
