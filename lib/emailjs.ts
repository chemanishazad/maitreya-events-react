import { enquiryToText, type Enquiry } from "@/lib/enquiry";

/**
 * EmailJS — sends enquiries straight from the browser to maitreyaevents@gmail.com.
 * Values come from NEXT_PUBLIC_EMAILJS_* in .env (inlined at build time — see .env.example).
 * Only the PUBLIC key is used; never put the EmailJS private key in the site. Restrict allowed origins in the EmailJS dashboard (Account → Security).
 */
export const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
};

export const emailjsReady = () => Boolean(emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.publicKey);

/** Template variables available in the EmailJS template: {{name}}, {{phone}}, {{summary}} … */
export async function sendEnquiryEmail(e: Enquiry) {
  if (!emailjsReady()) return false;
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: emailjsConfig.serviceId,
      template_id: emailjsConfig.templateId,
      user_id: emailjsConfig.publicKey,
      template_params: {
        name: e.name,
        phone: e.phone,
        email: e.email || "",
        event_type: e.eventType,
        date: e.date || "",
        location: e.location || "",
        guests: e.guests || "",
        services: e.services?.join(", ") || "",
        budget: e.budget || "",
        message: e.message || "",
        summary: enquiryToText(e),
      },
    }),
  });
  if (!res.ok) throw new Error(`EmailJS ${res.status}`);
  return true;
}
