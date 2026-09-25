export type Enquiry = {
  name: string;
  phone: string;
  email?: string;
  eventType: string;
  date?: string;
  location?: string;
  guests?: string;
  services?: string[];
  budget?: string;
  message?: string;
  eventSlug?: string;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

const PHONE = /^(?:\+?91)?[6-9]\d{9}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the form (instant feedback) and the API route (authoritative). */
export function validateEnquiry(e: Partial<Enquiry>): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!e.name || e.name.trim().length < 2) errors.name = "Please tell us your name.";
  const phone = (e.phone ?? "").replace(/[\s()-]/g, "");
  if (!PHONE.test(phone)) errors.phone = "Enter a valid 10-digit Indian mobile number.";
  if (e.email && !EMAIL.test(e.email.trim())) errors.email = "That email doesn't look right.";
  if (!e.eventType) errors.eventType = "Choose the type of event.";
  if (e.date && Number.isNaN(Date.parse(e.date))) errors.date = "Choose a valid date.";
  if (e.message && e.message.length > 2000) errors.message = "Please keep the message under 2,000 characters.";
  return errors;
}

/** Enquiry as plain text — `whatsapp` reads as a message from the customer, `email` as a lead summary. */
export function enquiryToText(e: Enquiry, mode: "email" | "whatsapp" = "email") {
  return [
    mode === "whatsapp" ? `Hi Maitreya Events! I'd like to plan an event.

Event: ${e.eventType}` : `New enquiry — ${e.eventType}`,
    `Name: ${e.name}`,
    `Phone: ${e.phone}`,
    e.email && `Email: ${e.email}`,
    e.date && `Date: ${e.date}`,
    e.location && `Location: ${e.location}`,
    e.guests && `Guests: ${e.guests}`,
    e.services?.length && `Services: ${e.services.join(", ")}`,
    e.budget && `Budget: ${e.budget}`,
    e.eventSlug && `Re: ${e.eventSlug}`,
    e.message && `\n${e.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}
