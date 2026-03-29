import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Twakka Achar. Order via WhatsApp, email us or follow us on Instagram for the latest flavours and updates.",
};

export default function ContactPage() {
  return <ContactClient />;
}
