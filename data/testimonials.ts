export type Testimonial = {
  name: string;
  role?: string;
  event?: string;
  content: string;
  image?: string;
  /** e.g. "Google review" with a link to the original */
  source?: { label: string; href?: string };
};

// Genuine testimonials only — the homepage section stays hidden while this list is empty.
export const testimonials: Testimonial[] = [];
