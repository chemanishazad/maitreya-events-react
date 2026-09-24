type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

/**
 * Conversion events tracked across the site:
 *   plan_event_click, whatsapp_click, call_click, explore_events_click, generate_lead
 * Sends to GA4 when gtag is loaded (set NEXT_PUBLIC_GA_ID); otherwise a no-op.
 */
export function track(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", name, params);
  if (process.env.NODE_ENV === "development") console.debug("[track]", name, params);
}
