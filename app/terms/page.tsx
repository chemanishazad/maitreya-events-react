import { site, mailLink } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms for using the Maitreya Events website.",
  path: "/terms",
});

// TODO(legal): have this reviewed before launch.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms">
      <p>By using {site.url} you agree to these terms.</p>
      <h2>Website content</h2>
      <p>
        Content on this website is provided for general information about our services. Photographs and event details are
        shown with permission and may not be reused without our consent.
      </p>
      <h2>Enquiries and quotes</h2>
      <p>
        Submitting an enquiry does not create a booking. Event bookings are confirmed only through a written agreement and
        the payment terms set out in it.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to <a href={mailLink}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
