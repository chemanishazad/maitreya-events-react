import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { enquiryToText, validateEnquiry, type Enquiry } from "@/lib/enquiry";

/**
 * Enquiry endpoint — emails the lead to Gmail. Nothing is stored or logged on the server.
 * Needs GMAIL_USER + GMAIL_APP_PASSWORD (a Google "app password"); ENQUIRY_TO_EMAIL is optional.
 * The form also opens WhatsApp with the same details, so leads arrive even without email set up.
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
  if (body.website || tooFast) return NextResponse.json({ ok: true });

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

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return NextResponse.json({ ok: true, emailed: false });

  try {
    await nodemailer
      .createTransport({ service: "gmail", auth: { user, pass } })
      .sendMail({
        from: `"Maitreya Website" <${user}>`,
        to: process.env.ENQUIRY_TO_EMAIL || user,
        replyTo: enquiry.email,
        subject: `New enquiry: ${enquiry.eventType} — ${enquiry.name}`,
        text: enquiryToText(enquiry),
      });
    return NextResponse.json({ ok: true, emailed: true });
  } catch {
    // WhatsApp already carried the details, so don't show the visitor an error
    return NextResponse.json({ ok: true, emailed: false });
  }
}
