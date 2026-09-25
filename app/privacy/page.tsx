import { site, mailLink } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Maitreya Events collects, uses and protects the details you share through our event enquiry form and website.",
  path: "/privacy",
});

// TODO(legal): have this reviewed before launch.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy">
      <p>
        This policy explains how {site.name} (&quot;we&quot;) handles information submitted through {site.url}.
      </p>
      <h2>What we collect</h2>
      <p>
        When you send an enquiry we collect the details you provide — such as your name, phone number, email, event type,
        date, location and message. We also collect anonymous usage statistics to understand how the site is used.
      </p>
      <h2>How we use it</h2>
      <p>
        We use your details only to respond to your enquiry and to plan your event. We do not sell your information. We may
        share it with vendors only when needed to deliver an event you have booked with us.
      </p>
      <h2>WhatsApp and calls</h2>
      <p>If you contact us on WhatsApp or by phone, those conversations are subject to the respective provider&apos;s terms.</p>
      <h2>Your choices</h2>
      <p>
        You can ask us to access, correct or delete your information at any time by emailing{" "}
        <a href={mailLink}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
