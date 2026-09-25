/**
 * All deploy-specific settings, read from env files:
 *   .env.development → `npm run dev` on your machine (http://localhost:3000)
 *   .env.production  → `npm run build` / the server (https://maitreyaevents.com)
 * NEXT_PUBLIC_* values are baked in at build time. See .env.example for every key.
 * Defaults keep the site working if a key is missing.
 */
const env = (key: string | undefined, fallback: string) => (key && key.trim() ? key.trim() : fallback);

export const config = {
  siteUrl: env(process.env.NEXT_PUBLIC_SITE_URL, "https://maitreyaevents.com").replace(/\/$/, ""),
  siteEnv: env(process.env.NEXT_PUBLIC_SITE_ENV ?? process.env.SITE_ENV, "local"),

  phone: env(process.env.NEXT_PUBLIC_CONTACT_PHONE, "+918778145196"),
  phoneDisplay: env(process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY, "+91 87781 45196"),
  whatsapp: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, "918778145196"),
  email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL, "maitreyaevents@gmail.com"),

  social: [
    { label: "Instagram", href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "" },
    { label: "Facebook", href: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "" },
    { label: "YouTube", href: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "" },
  ].filter((s) => s.href.trim()),

  emailjs: {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
  },

  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
};
