import { img } from "./images";

export type Service = {
  slug: string;
  title: string;
  /** Short label for cards and navigation */
  label: string;
  kicker: string;
  blurb: string;
  intro: string[];
  image: string;
  gallery: string[];
  includes: string[];
  occasions: string[];
  faq: { q: string; a: string }[];
  seoTitle: string;
  seoDescription: string;
};

export const services: Service[] = [
  {
    slug: "wedding-events",
    title: "Weddings",
    label: "Weddings",
    kicker: "Muhurtham to reception",
    blurb: "Mandaps, receptions and every ritual in between — designed, produced and run by one team.",
    intro: [
      "A wedding is a sequence of moments that have to land perfectly: the muhurtham, the entry, the first look, the reception stage, the send-off. We plan the whole arc so your family can stay present in it.",
      "From haldi and mehendi to sangeet, muhurtham and reception, Maitreya handles décor, stage, sound, lighting, entertainment, hospitality coordination and on-ground execution under a single plan.",
    ],
    image: img.mandap,
    gallery: [img.mandap, img.weddingCelebration, img.weddingTableLong, img.rings, img.banquetWhite, img.weddingCouple],
    includes: [
      "Wedding planning and timeline",
      "Mandap and stage design",
      "Floral and thematic décor",
      "Reception stage and entries",
      "Sound, lighting and LED",
      "Sangeet choreography and entertainment",
      "Anchors, DJs and live music",
      "Guest flow and hospitality coordination",
    ],
    occasions: ["Engagement", "Haldi & Mehendi", "Sangeet", "Muhurtham", "Reception"],
    faq: [
      {
        q: "How early should we book for a wedding?",
        a: "For peak muhurtham dates, three to six months gives the most choice of venues, décor and artists. We can also deliver on shorter timelines — tell us your date and we will confirm what is possible.",
      },
      {
        q: "Can you work with a venue or decorator we have already booked?",
        a: "Yes. We regularly coordinate with existing venues and vendors, and can take on only the parts you need — such as stage, sound, lighting or entertainment.",
      },
      {
        q: "Do you handle traditional ceremonies as well as receptions?",
        a: "Yes. We plan around the rituals and customs of your family and community, and design the ceremony and reception as one continuous experience.",
      },
    ],
    seoTitle: "Wedding Event Management in Chennai",
    seoDescription:
      "Wedding planning, mandap and stage design, décor, sound, lighting and entertainment in Chennai — from engagement to reception, managed by one team.",
  },
  {
    slug: "corporate-events",
    title: "Corporate Events",
    label: "Corporate",
    kicker: "Annual days, launches, conferences",
    blurb: "Annual days, award nights, launches and conferences that look sharp and run to the minute.",
    intro: [
      "Corporate audiences notice everything — a late cue, a muddy mic, a slide that doesn't fit the LED. We run corporate events like productions, with show-flow, rehearsals and a dedicated stage manager.",
      "We deliver annual days, award functions, dealer meets, product launches, conferences and seminars, and employee engagement events, including stage, AV, branding and entertainment.",
    ],
    image: img.conferenceDark,
    gallery: [img.conferenceDark, img.auditorium, img.conferenceHall, img.corporateMeetup, img.stageBlue, img.conferenceRoom],
    includes: [
      "Concept, theme and show-flow",
      "Stage, LED walls and AV",
      "Conference and seminar production",
      "Award ceremony production",
      "Product launch reveals",
      "Branding and venue dressing",
      "Anchors, artists and entertainment",
      "Rehearsals and stage management",
    ],
    occasions: ["Annual Day", "Award Nights", "Product Launch", "Conference", "Dealer Meet"],
    faq: [
      {
        q: "Can you work to our brand guidelines?",
        a: "Yes. Stage graphics, LED content, backdrops and signage are produced to your brand guidelines and signed off by your team before the event.",
      },
      {
        q: "Do you manage multi-day conferences?",
        a: "Yes — including plenary stages, breakout rooms, registration desks, AV for every hall and a single control room for the show.",
      },
    ],
    seoTitle: "Corporate Event Management in Chennai",
    seoDescription:
      "Corporate event management in Chennai — annual days, award functions, product launches and conferences with full stage, LED and AV production.",
  },
  {
    slug: "cultural-events",
    title: "Cultural Events",
    label: "Cultural",
    kicker: "Festivals and programmes",
    blurb: "Festivals, cultural programmes and community celebrations rooted in tradition, produced at scale.",
    intro: [
      "Cultural programmes carry meaning for the people who attend them. We produce them with respect for the tradition and the craft behind every performance.",
      "From festival celebrations and classical programmes to community gatherings, we manage artists, stage, sound, lighting and audience experience.",
    ],
    image: img.holi,
    gallery: [img.holi, img.holiColour, img.festiveDecor, img.fireworks, img.stageBeams, img.crowdNight],
    includes: [
      "Festival and programme planning",
      "Cultural artist coordination",
      "Traditional and thematic décor",
      "Stage, sound and lighting",
      "Audience management",
      "Permissions and logistics support",
    ],
    occasions: ["Festivals", "Cultural Programmes", "Community Events", "Temple Festivals"],
    faq: [
      {
        q: "Can you coordinate classical and folk performers?",
        a: "Yes. We coordinate performers, rehearsals, stage requirements and sound checks so each performance is presented properly.",
      },
    ],
    seoTitle: "Cultural Event Organisers in Chennai",
    seoDescription:
      "Cultural event and programme organisers in Chennai — festivals, community celebrations and performances with stage, sound and artist coordination.",
  },
  {
    slug: "private-events",
    title: "Private Celebrations",
    label: "Private",
    kicker: "Birthdays and family milestones",
    blurb: "Birthdays, anniversaries, baby showers and family milestones — personal, polished, stress-free.",
    intro: [
      "The best private celebrations feel effortless for the host. We take care of the theme, décor, entertainment and the running of the day, so you can enjoy it with your guests.",
      "We plan first birthdays, milestone birthdays, anniversaries, baby showers, housewarmings and intimate family gatherings.",
    ],
    image: img.balloons,
    gallery: [img.balloons, img.balloonsBright, img.toast, img.confettiParty, img.dinnerTable, img.sparklers],
    includes: [
      "Theme and décor",
      "Balloon and floral styling",
      "Entertainment and games",
      "Anchors and DJs",
      "Photography coordination",
      "Catering coordination",
    ],
    occasions: ["Birthdays", "Anniversaries", "Baby Showers", "Housewarmings"],
    faq: [
      {
        q: "Do you take on small, intimate events?",
        a: "Yes. We scale the plan to the size of the celebration — the attention to detail stays the same.",
      },
    ],
    seoTitle: "Birthday & Private Event Planners in Chennai",
    seoDescription:
      "Private celebration planners in Chennai — birthdays, anniversaries, baby showers and family events with décor, entertainment and full coordination.",
  },
  {
    slug: "live-events",
    title: "Live Entertainment",
    label: "Live Events",
    kicker: "Concerts and shows",
    blurb: "Concerts, live shows and artist nights with production built for crowds and sound built for music.",
    intro: [
      "Live shows are unforgiving: the artist, the audience and the production all have to peak at the same time. We plan the show around that moment.",
      "We produce concerts, live shows, DJ nights and artist appearances, including stage, line arrays, lighting design, LED, crowd management and artist hospitality.",
    ],
    image: img.concertOrange,
    gallery: [img.concertOrange, img.concertCrowd, img.concertWhite, img.crowdHands, img.concertPurple, img.confettiConcert],
    includes: [
      "Show concept and run-of-show",
      "Artist booking and coordination",
      "Concert stage and trussing",
      "Line-array sound and monitoring",
      "Lighting design and special effects",
      "Crowd flow and barricading",
    ],
    occasions: ["Concerts", "Live Shows", "DJ Nights", "Artist Appearances"],
    faq: [
      {
        q: "Can you manage an artist's technical rider?",
        a: "Yes. We review the rider with the artist's team and deliver the stage, sound, lighting and backline it specifies.",
      },
    ],
    seoTitle: "Concert & Live Event Management in Chennai",
    seoDescription:
      "Concert and live show production in Chennai — artist coordination, stage, sound, lighting, LED and crowd management.",
  },
  {
    slug: "college-events",
    title: "College Events",
    label: "College",
    kicker: "Culturals and fests",
    blurb: "College culturals, fests and school annual days with the energy of a festival and the discipline of a show.",
    intro: [
      "Culturals are the biggest nights of the academic year. We help student teams and institutions turn ambitious ideas into safe, well-run events.",
      "We support college culturals, symposiums, school annual days and graduation events with stage, sound, lighting, artists and on-ground management.",
    ],
    image: img.cheering,
    gallery: [img.cheering, img.crowdNight, img.festivalPhones, img.stagePinkBlue, img.confettiStage, img.auditorium],
    includes: [
      "Culturals planning with student teams",
      "Stage, sound and lighting",
      "Celebrity and artist nights",
      "Competition and event staging",
      "Crowd safety planning",
      "School annual day production",
    ],
    occasions: ["College Culturals", "Symposiums", "School Annual Day", "Graduation"],
    faq: [
      {
        q: "Do you work directly with student committees?",
        a: "Yes. We work alongside student organisers and faculty coordinators, and keep the plan and budget transparent for both.",
      },
    ],
    seoTitle: "College Culturals & School Event Organisers in Chennai",
    seoDescription:
      "College culturals and school annual day organisers in Chennai — stage, sound, lighting, artist nights and on-ground event management.",
  },
  {
    slug: "public-events",
    title: "Public Events",
    label: "Public",
    kicker: "Ticketed and open events",
    blurb: "Ticketed shows, exhibitions and open-air celebrations designed for thousands of guests.",
    intro: [
      "Public events need a plan for everything the audience never sees: entry, flow, safety, permissions and the timing of each experience.",
      "We produce exhibitions, expos, festive celebrations, ticketed shows and brand activations for public audiences.",
    ],
    image: img.fireworks,
    gallery: [img.fireworks, img.festivalPhones, img.crowdNight, img.festiveDecor, img.concertCrowd, img.gathering],
    includes: [
      "Event concept and site planning",
      "Registration and entry management",
      "Exhibition and stall layout",
      "Stage and entertainment programming",
      "Crowd safety and logistics",
      "Brand activations",
    ],
    occasions: ["Exhibitions", "Festive Celebrations", "Ticketed Shows", "Activations"],
    faq: [
      {
        q: "Can you help with ticketing and registration?",
        a: "Yes. We plan registration and entry flow and can coordinate with your ticketing partner.",
      },
    ],
    seoTitle: "Public Event & Exhibition Organisers in Chennai",
    seoDescription:
      "Public event and exhibition organisers in Chennai — ticketed shows, festive celebrations and expos with full production and crowd management.",
  },
  {
    slug: "event-production",
    title: "Event Production",
    label: "Production",
    kicker: "Stage, sound, light, LED",
    blurb: "Stages, line arrays, lighting rigs, LED walls and AV — the technical backbone of every event.",
    intro: [
      "Production is where an idea becomes physical. We design and build stages, rig lighting, tune sound and run LED and AV so the event looks and sounds the way it was imagined.",
      "Production is available as part of a complete event, or on its own for agencies, venues and organisers who need a reliable technical partner.",
    ],
    image: img.stageBeams,
    gallery: [img.stageBeams, img.stagePurple, img.mixingDesk, img.concertColour, img.stageBlue, img.venueHall],
    includes: [
      "Stage design and fabrication",
      "Sound systems and engineering",
      "Lighting design and operation",
      "LED walls and video content playback",
      "Trussing and rigging",
      "Special effects",
      "Power and event infrastructure",
      "Technical show-calling",
    ],
    occasions: ["Stage", "Sound", "Lighting", "LED / AV", "Special Effects"],
    faq: [
      {
        q: "Do you provide production for events planned by other agencies?",
        a: "Yes. We work as the technical production partner for agencies, venues and organisers.",
      },
    ],
    seoTitle: "Event Production, Stage, Sound & Lighting in Chennai",
    seoDescription:
      "Event production company in Chennai — stage design, sound and lighting, LED walls, AV, trussing and special effects.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
