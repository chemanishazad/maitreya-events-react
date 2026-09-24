import { NextResponse } from "next/server";
import { enquiryToText, validateEnquiry, type Enquiry } from "@/lib/enquiry";

/**
 * Enquiry endpoint.
 * Delivery: set RESEND_API_KEY + ENQUIRY_TO_EMAIL (and optionally ENQUIRY_FROM_EMAIL)
 * to email each lead via Resend. Without them, leads are logged server-side only.
 */
export async function POST(req: Request) {
  let body: Partial<Enquiry> & { website?: string; startedAt?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Spam protection: honeypot field + minimum fill time
  const tooFast = typeof body.startedAt === "number" && Date.now() - body.startedAt < 2500;
  if (body.website || tooFast) {
    return NextResponse.json({ ok: true });
  }

  const errors = validateEnquiry(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const enquiry: Enquiry = {
    name: String(body.name).trim().slice(0, 120),
    phone: String(body.phone).trim().slice(0, 20),
    email: body.email?.trim().slice(0, 200) || undefined,
    eventType: String(body.eventType).slice(0, 60),
    date: body.date?.slice(0, 10) || undefined,
    location: body.location?.trim().slice(0, 120) || undefined,
    guests: body.guests?.slice(0, 40) || undefined,
    services: Array.isArray(body.services) ? body.services.slice(0, 12).map((s) => String(s).slice(0, 60)) : undefined,
    budget: body.budget?.slice(0, 40) || undefined,
    message: body.message?.trim().slice(0, 2000) || undefined,
    eventSlug: body.eventSlug?.slice(0, 120) || undefined,
  };

  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;

  if (!key || !to) {
    console.info("[enquiry] (no email provider configured)\n" + enquiryToText(enquiry));
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL ?? "Maitreya Website <onboarding@resend.dev>",
        to: [to],
        reply_to: enquiry.email,
        subject: `New enquiry: ${enquiry.eventType} — ${enquiry.name}`,
        text: enquiryToText(enquiry),
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[enquiry] delivery failed", err);
    return NextResponse.json({ ok: false, error: "We couldn't send your enquiry. Please try WhatsApp or call us." }, { status: 502 });
  }
}
