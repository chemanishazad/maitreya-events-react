import { enquiryToText, type Enquiry } from "@/lib/enquiry";
import { config } from "@/lib/config";

/**
 * EmailJS — sends enquiries straight from the browser to maitreyaevents@gmail.com.
 * Values come from NEXT_PUBLIC_EMAILJS_* in .env (inlined at build time — see .env.example).
 * Only the PUBLIC key is used; never put the EmailJS private key in the site.
 * Restrict allowed origins in the EmailJS dashboard (Account → Security).
 */
export const emailjsConfig = config.emailjs;

export const emailjsReady = () => Boolean(emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.publicKey);

/**
 * Variables for the EmailJS template. Empty fields become "—" so the email never shows blanks.
 * Also includes ready-made links ({{call_link}}, {{whatsapp_link}}, {{reply_link}}) and the
 * recipients for the single-email setup ({{to_email}}, {{bcc_email}}).
 */
function templateParams(e: Enquiry) {
  const dash = (v?: string) => (v && v.trim() ? v.trim() : "—");
  const digits = e.phone.replace(/D/g, "");
  const intl = digits.length === 10 ? `91${digits}` : digits.replace(/^0+/, "");
  const firstName = e.name.trim().split(/s+/)[0];
  const waText = `Hi ${firstName}, this is Maitreya Events — thank you for your ${e.eventType.toLowerCase()} enquiry!`;
  const date = e.date
    ? new Date(`${e.date}T00:00:00+05:30`).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" })
    : "";

  // Short reference for follow-ups, e.g. ME-260925-4F7K
  const d = new Date();
  const ymd = d.toLocaleDateString("en-GB", { timeZone: "Asia/Kolkata", year: "2-digit", month: "2-digit", day: "2-digit" }).split("/").reverse().join("");
  const ref = `ME-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  return {
    ref,
    site_url: config.siteUrl,
    contact_phone: config.phoneDisplay,
    contact_whatsapp: `https://wa.me/${config.whatsapp}`,
    name: e.name.trim(),
    first_name: firstName,
    phone: e.phone.trim(),
    email: dash(e.email),
    reply_to: e.email?.trim() || "",
    // One email per enquiry: to the customer with the team in Bcc; if the customer gave no
    // email, it goes straight to the team instead (Bcc left empty)
    to_email: e.email?.trim() || config.email,
    bcc_email: e.email?.trim() ? config.email : "",
    event_type: e.eventType,
    date: dash(date),
    location: dash(e.location),
    guests: dash(e.guests),
    services: dash(e.services?.join(", ")),
    budget: dash(e.budget),
    message: dash(e.message),
    submitted_at: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }),
    call_link: `tel:+${intl}`,
    whatsapp_link: `https://wa.me/${intl}?text=${encodeURIComponent(waText)}`,
    reply_link: e.email?.trim()
      ? `mailto:${e.email.trim()}?subject=${encodeURIComponent(`Your ${e.eventType} enquiry — Maitreya Events`)}`
      : `https://wa.me/${intl}`,
    summary: enquiryToText(e),
  };
}

export type EmailTemplateParams = ReturnType<typeof templateParams>;

export async function sendEnquiryEmail(e: Enquiry) {
  if (!emailjsReady()) return false;
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: emailjsConfig.serviceId,
      template_id: emailjsConfig.templateId,
      user_id: emailjsConfig.publicKey,
      template_params: templateParams(e),
    }),
  });
  if (!res.ok) throw new Error(`EmailJS ${res.status}`);
  return true;
}
