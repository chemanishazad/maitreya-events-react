"use client";

import { AnimatePresence, motion } from "motion/react";
import { cloneElement, useId, useRef, useState } from "react";
import clsx from "clsx";
import { budgetRanges, eventTypes, guestRanges, serviceOptions } from "@/data/content";
import { enquiryToText, validateEnquiry, type Enquiry, type EnquiryErrors } from "@/lib/enquiry";
import { sendEnquiryEmail } from "@/lib/emailjs";
import { whatsappLink } from "@/data/site";
import { track } from "@/lib/analytics";
import { ArrowIcon, Button, WhatsAppIcon } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

const empty: Enquiry = {
  name: "",
  phone: "",
  email: "",
  eventType: "",
  date: "",
  location: "",
  guests: "",
  services: [],
  budget: "",
  message: "",
};

export function EnquiryForm({
  variant = "full",
  defaultEventType,
  eventSlug,
  tone = "dark",
}: {
  variant?: "full" | "compact";
  defaultEventType?: string;
  eventSlug?: string;
  tone?: "dark" | "light";
}) {
  const [data, setData] = useState<Enquiry>({ ...empty, eventType: defaultEventType ?? "", eventSlug });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const formId = useId();

  const set = <K extends keyof Enquiry>(key: K, value: Enquiry[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleService = (s: string) =>
    set("services", data.services?.includes(s) ? data.services.filter((x) => x !== s) : [...(data.services ?? []), s]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateEnquiry(data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`${formId}-${first}`)?.focus();
      return;
    }
    // Bots fill the hidden field or submit instantly — pretend success, send nothing
    const bot = Boolean(honeypot.current?.value) || (startedAt.current > 0 && Date.now() - startedAt.current < 2500);
    if (bot) {
      setStatus("success");
      return;
    }

    // Open WhatsApp straight away (inside the click, so browsers don't block it) with every detail filled in
    window.open(whatsappLink(enquiryToText(data, "whatsapp")), "_blank", "noopener");

    setStatus("submitting");
    setServerError("");
    try {
      // Email copy via EmailJS. WhatsApp already carries the lead, so an email failure isn't shown as an error.
      await sendEnquiryEmail(data).catch(() => false);
      track("generate_lead", { event_type: data.eventType, form: variant });
      setStatus("success");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  const waText = data.name ? enquiryToText(data, "whatsapp") : "Hi Maitreya Events, I'd like to plan an event.";

  const light = tone === "light";

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[360px] flex-col items-start justify-center gap-6"
            role="status"
          >
            <motion.svg viewBox="0 0 52 52" className="h-16 w-16 text-marigold" aria-hidden>
              <motion.circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
              <motion.path d="M15 27l7 7 15-16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 }} />
            </motion.svg>
            <div>
              <h3 className="display text-4xl sm:text-5xl">Thank you, {data.name.split(" ")[0]}.</h3>
              <p className={clsx("mt-3 max-w-md text-pretty", light ? "text-ink/70" : "text-bone/70")}>
                Your enquiry has been sent to our team. If WhatsApp didn&apos;t open, tap below to send the same details
                there — we&apos;ll call you back shortly.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={whatsappLink(waText)} trackAs="whatsapp_click" icon={<WhatsAppIcon />}>
                Send on WhatsApp
              </Button>
              <Button
                variant={light ? "dark" : "ghost"}
                onClick={() => {
                  setData({ ...empty, eventSlug });
                  setStatus("idle");
                }}
              >
                Send another
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            onFocusCapture={() => {
              if (!startedAt.current) startedAt.current = Date.now();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-x-6 gap-y-7 sm:grid-cols-2"
            aria-describedby={serverError ? `${formId}-server` : undefined}
          >
            {/* Honeypot — hidden from people, tempting to bots */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <Field id={`${formId}-name`} label="Name" error={errors.name} light={light}>
              <input
                id={`${formId}-name`}
                autoComplete="name"
                value={data.name}
                onChange={(e) => set("name", e.target.value)}
                className={inputCls(light, !!errors.name)}
              />
            </Field>
            <Field id={`${formId}-phone`} label="Phone" error={errors.phone} light={light}>
              <input
                id={`${formId}-phone`}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="98xxxxxxxx"
                value={data.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={inputCls(light, !!errors.phone)}
              />
            </Field>

            {variant === "full" && (
              <Field id={`${formId}-email`} label="Email" optional error={errors.email} light={light}>
                <input
                  id={`${formId}-email`}
                  type="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={inputCls(light, !!errors.email)}
                />
              </Field>
            )}

            <Field id={`${formId}-eventType`} label="Event type" error={errors.eventType} light={light}>
              <select
                id={`${formId}-eventType`}
                value={data.eventType}
                onChange={(e) => set("eventType", e.target.value)}
                className={clsx(inputCls(light, !!errors.eventType), "appearance-none bg-no-repeat pr-8")}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8'><path d='M1 1l5 5 5-5' fill='none' stroke='%23f4a340' stroke-width='1.6'/></svg>\")",
                  backgroundPosition: "right 4px center",
                }}
              >
                <option value="" disabled>
                  Select…
                </option>
                {eventTypes.map((t) => (
                  <option key={t} value={t} className="bg-ink text-bone">
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <Field id={`${formId}-date`} label="Expected date" optional error={errors.date} light={light}>
              <input
                id={`${formId}-date`}
                type="date"
                value={data.date}
                onChange={(e) => set("date", e.target.value)}
                className={clsx(inputCls(light, !!errors.date), light ? "" : "[color-scheme:dark]")}
              />
            </Field>

            {variant === "full" && (
              <>
                <Field id={`${formId}-location`} label="Location / venue" optional light={light}>
                  <input
                    id={`${formId}-location`}
                    value={data.location}
                    onChange={(e) => set("location", e.target.value)}
                    className={inputCls(light, false)}
                  />
                </Field>

                <fieldset className="sm:col-span-2">
                  <legend className={labelCls(light)}>Expected guests</legend>
                  <ChipGroup options={guestRanges} value={data.guests ? [data.guests] : []} onToggle={(v) => set("guests", data.guests === v ? "" : v)} light={light} />
                </fieldset>

                <fieldset className="sm:col-span-2">
                  <legend className={labelCls(light)}>Services required</legend>
                  <ChipGroup options={serviceOptions} value={data.services ?? []} onToggle={toggleService} light={light} multiple />
                </fieldset>

                <Field id={`${formId}-budget`} label="Budget range" optional light={light}>
                  <select
                    id={`${formId}-budget`}
                    value={data.budget}
                    onChange={(e) => set("budget", e.target.value)}
                    className={clsx(inputCls(light, false), "appearance-none")}
                  >
                    <option value="">—</option>
                    {budgetRanges.map((b) => (
                      <option key={b} value={b} className="bg-ink text-bone">
                        {b}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field id={`${formId}-message`} label="Tell us about your event" optional error={errors.message} light={light} wide>
                  <textarea
                    id={`${formId}-message`}
                    rows={4}
                    value={data.message}
                    onChange={(e) => set("message", e.target.value)}
                    className={clsx(inputCls(light, !!errors.message), "resize-y")}
                  />
                </Field>
              </>
            )}

            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" size="lg" disabled={status === "submitting"} icon={<ArrowIcon />} variant={light ? "dark" : "primary"}>
                {status === "submitting" ? "Sending…" : "Send enquiry"}
              </Button>
              <p className={clsx("text-xs", light ? "text-ink/55" : "text-muted")}>
                We reply within one working day. Prefer chat?{" "}
                <a
                  href={whatsappLink(waText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("whatsapp_click", { from: "form" })}
                  className="underline underline-offset-4 hover:text-marigold"
                >
                  WhatsApp us
                </a>
                .
              </p>
            </div>

            <AnimatePresence>
              {status === "error" && serverError && (
                <motion.p
                  id={`${formId}-server`}
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-xl bg-ember/15 px-4 py-3 text-sm text-ember sm:col-span-2"
                >
                  {serverError}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const labelCls = (light: boolean) => clsx("eyebrow mb-3 block", light ? "text-ink/60" : "text-muted");

const inputCls = (light: boolean, invalid: boolean) =>
  clsx(
    "w-full border-0 border-b bg-transparent px-0 py-3 text-lg outline-none transition-colors placeholder:opacity-40 focus:border-marigold focus-visible:outline-none",
    light ? "border-ink/20 text-ink" : "border-bone/20 text-bone",
    invalid && "!border-ember",
  );

function Field({
  id,
  label,
  optional,
  error,
  children,
  light,
  wide,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactElement<{ "aria-invalid"?: boolean; "aria-describedby"?: string }>;
  light: boolean;
  wide?: boolean;
}) {
  return (
    <div className={clsx("relative", wide && "sm:col-span-2")}>
      <label htmlFor={id} className={labelCls(light)}>
        {label}
        {optional && <span className="ml-2 normal-case tracking-normal opacity-60">(optional)</span>}
      </label>
      {cloneElement(children, { "aria-invalid": !!error, "aria-describedby": error ? `${id}-error` : undefined })}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-sm text-ember"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChipGroup({
  options,
  value,
  onToggle,
  light,
  multiple,
}: {
  options: string[];
  value: string[];
  onToggle: (v: string) => void;
  light: boolean;
  multiple?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2" role={multiple ? "group" : "radiogroup"}>
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button
            key={o}
            type="button"
            role={multiple ? "checkbox" : "radio"}
            aria-checked={on}
            onClick={() => onToggle(o)}
            className={clsx(
              "rounded-full border px-4 py-2 text-sm transition-all duration-300",
              on
                ? "border-marigold bg-marigold text-ink"
                : light
                  ? "border-ink/20 hover:border-ink/60"
                  : "border-bone/20 hover:border-bone/60",
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
