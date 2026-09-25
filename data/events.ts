import { img } from "./images";

export type EventItem = {
  slug: string;
  title: string;
  /** Service slug this event belongs to */
  category: string;
  type: string;
  status: "past" | "upcoming";
  /** ISO date (yyyy-mm-dd) */
  date: string;
  endDate?: string;
  location: string;
  venue?: string;
  summary: string;
  objective: string;
  concept: string;
  services: string[];
  production: string[];
  highlights: string[];
  heroImage: string;
  gallery: string[];
  featured?: boolean;
  registrationUrl?: string;
  /**
   * Sample content used while real events are being collected.
   * Sample events never emit Event structured data.
   */
  sample?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

// TODO(content): replace sample events with genuine Maitreya case studies and listings.
export const events: EventItem[] = [
  {
    slug: "marigold-mandap-wedding-chennai",
    title: "A Mandap in Marigold",
    category: "wedding-events",
    type: "Wedding",
    status: "past",
    date: "2026-02-12",
    location: "Chennai",
    summary: "A three-day South Indian wedding moving from an intimate haldi to a 900-guest reception.",
    objective:
      "Create one visual story across three days of ceremonies while keeping every ritual on time for the muhurtham.",
    concept:
      "Marigold, brass and jasmine, set against warm amber lighting — traditional at the muhurtham, cinematic at the reception.",
    services: ["Complete wedding planning", "Mandap & stage design", "Floral décor", "Sound & lighting", "Entertainment"],
    production: ["Custom mandap with floral canopy", "Reception stage with LED backdrop", "Warm-white architectural lighting"],
    highlights: ["3 ceremonies, one design language", "Couple entry with cold pyro", "Live nadaswaram to DJ handover"],
    heroImage: img.mandap,
    gallery: [img.mandap, img.weddingCelebration, img.weddingTableLong, img.rings, img.banquetWhite, img.weddingBouquet],
    featured: true,
    sample: true,
  },
  {
    slug: "corporate-annual-day-chennai-2026",
    title: "Annual Day, Reimagined",
    category: "corporate-events",
    type: "Corporate Annual Day",
    status: "past",
    date: "2026-03-21",
    location: "Chennai",
    venue: "OMR",
    summary: "An annual day and awards night for a technology company, produced as a three-act live show.",
    objective: "Celebrate the year, recognise top performers and keep 1,500 employees engaged for four hours.",
    concept: "A three-act show — the year in review, the awards, the party — each with its own stage look.",
    services: ["Show concept", "Stage & LED", "Award ceremony production", "Anchors & artists"],
    production: ["40 ft LED wall", "Moving-head lighting rig", "Multi-camera IMAG feed"],
    highlights: ["Choreographed awards walk-ups", "Employee band segment", "Closing DJ set"],
    heroImage: img.conferenceDark,
    gallery: [img.conferenceDark, img.auditorium, img.stageBlue, img.corporateMeetup, img.confettiStage, img.conferenceHall],
    featured: true,
    sample: true,
  },
  {
    slug: "margazhi-cultural-festival",
    title: "Margazhi Evenings",
    category: "cultural-events",
    type: "Cultural Festival",
    status: "past",
    date: "2025-12-20",
    endDate: "2025-12-22",
    location: "Tamil Nadu",
    summary: "A three-evening cultural festival of classical music, dance and folk performance.",
    objective: "Present classical and folk artists on a stage that respects the art form and suits an outdoor audience.",
    concept: "Minimal stage, warm light and clean sound — letting the performers lead.",
    services: ["Programme planning", "Artist coordination", "Stage & sound", "Traditional décor"],
    production: ["Acoustic-focused sound design", "Kolam-inspired stage floor", "Soft tungsten lighting"],
    highlights: ["Three evenings of programming", "Folk and classical on one stage", "Community food court"],
    heroImage: img.holi,
    gallery: [img.holi, img.sparklers, img.holiColour, img.crowdNight, img.fireworks, img.stageBeams],
    featured: true,
    sample: true,
  },
  {
    slug: "live-on-ecr-concert",
    title: "Live on ECR",
    category: "live-events",
    type: "Live Event",
    status: "past",
    date: "2026-05-02",
    location: "Chennai",
    venue: "ECR",
    summary: "An open-air sunset-to-midnight concert on the East Coast Road.",
    objective: "Deliver festival-grade sound and lighting for an outdoor crowd while managing entry and safety.",
    concept: "Sunset acoustic sets building into a full headline show with lights and effects.",
    services: ["Artist coordination", "Concert production", "Crowd management"],
    production: ["Line-array PA", "Truss roof with 60+ fixtures", "CO₂ and confetti effects"],
    highlights: ["Sunset opening set", "Headline act with full effects", "Zero-queue wristband entry"],
    heroImage: img.concertOrange,
    gallery: [img.concertOrange, img.concertCrowd, img.crowdHands, img.concertPurple, img.confettiConcert, img.concertWhite],
    featured: true,
    sample: true,
  },
  {
    slug: "spectrum-college-culturals",
    title: "Spectrum Culturals",
    category: "college-events",
    type: "College Culturals",
    status: "past",
    date: "2026-02-27",
    location: "Chennai",
    summary: "A two-day college cultural fest ending in a celebrity artist night.",
    objective: "Support student organisers with production and safety for a 6,000-strong campus crowd.",
    concept: "A neon-and-chrome identity carried across every stage on campus.",
    services: ["Stage & sound", "Artist night", "Crowd safety"],
    production: ["Main stage with LED", "Two competition stages", "Barricading and FOH tower"],
    highlights: ["Artist night finale", "Battle of bands", "Dance competition staging"],
    heroImage: img.cheering,
    gallery: [img.cheering, img.stagePinkBlue, img.crowdNight, img.festivalPhones, img.confettiStage, img.neon],
    sample: true,
  },
  {
    slug: "product-launch-chennai",
    title: "The Reveal",
    category: "corporate-events",
    type: "Product Launch",
    status: "past",
    date: "2026-06-18",
    location: "Chennai",
    summary: "A product launch built around a single, perfectly timed reveal.",
    objective: "Give media and dealers one unforgettable reveal moment.",
    concept: "Total darkness, a countdown on LED, and a kinetic light reveal.",
    services: ["Launch concept", "LED & AV", "Lighting design", "Media coordination"],
    production: ["Kinetic LED reveal", "Timecoded light show", "Press zone and backdrop"],
    highlights: ["60-second countdown", "Timecoded reveal", "Dealer networking dinner"],
    heroImage: img.stageBlue,
    gallery: [img.stageBlue, img.stagePurple, img.conferenceHall, img.dinnerTable, img.toast, img.auditorium],
    sample: true,
  },

  // Upcoming
  {
    slug: "deepavali-utsav-2026",
    title: "Deepavali Utsav 2026",
    category: "public-events",
    type: "Festival",
    status: "upcoming",
    date: "2026-11-07",
    location: "Chennai",
    summary: "An evening of lights, music, food and family entertainment.",
    objective: "A family-friendly festive evening open to the public.",
    concept: "Lamps, lanterns and live music across an open-air venue.",
    services: ["Festival production", "Entertainment", "Stalls & food court"],
    production: ["Festive lighting", "Main stage", "Food court"],
    highlights: ["Live music", "Kids' zone", "Festive market"],
    heroImage: img.sparklers,
    gallery: [img.sparklers, img.fireworks, img.gathering],
    sample: true,
  },
  {
    slug: "new-years-eve-live-2027",
    title: "New Year's Eve Live",
    category: "live-events",
    type: "Live Event",
    status: "upcoming",
    date: "2026-12-31",
    location: "Chennai",
    venue: "ECR",
    summary: "Count down to 2027 with live acts, DJs and a midnight finale.",
    objective: "A ticketed countdown celebration.",
    concept: "Beachside stage, live bands into DJ sets and a midnight effects finale.",
    services: ["Concert production", "Artists", "Ticketing coordination"],
    production: ["Concert stage", "Line-array PA", "Midnight effects"],
    highlights: ["Live bands", "DJ sets", "Midnight finale"],
    heroImage: img.confettiConcert,
    gallery: [img.confettiConcert, img.concertCrowd, img.sparklers],
    sample: true,
  },
  {
    slug: "pongal-cultural-evening-2027",
    title: "Pongal Cultural Evening",
    category: "cultural-events",
    type: "Cultural Programme",
    status: "upcoming",
    date: "2027-01-15",
    location: "Chennai",
    summary: "Folk arts, music and traditional food to celebrate the harvest festival.",
    objective: "A celebration of Tamil folk arts for families.",
    concept: "Village-inspired décor, folk performances and a traditional food street.",
    services: ["Cultural programming", "Décor", "Stage & sound"],
    production: ["Folk stage", "Traditional décor", "Food street"],
    highlights: ["Parai & karakattam", "Kolam contest", "Pongal food street"],
    heroImage: img.holiColour,
    gallery: [img.holiColour, img.holi, img.crowdNight],
    sample: true,
  },
];

export const pastEvents = events.filter((e) => e.status === "past");
export const upcomingEvents = events
  .filter((e) => e.status === "upcoming")
  .sort((a, b) => a.date.localeCompare(b.date));
export const featuredEvents = pastEvents.filter((e) => e.featured);

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }) {
  return new Date(`${iso}T00:00:00+05:30`).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", ...opts });
}
