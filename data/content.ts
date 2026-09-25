import { img } from "./images";

export const processSteps = [
  {
    title: "Concept",
    body: "We listen first — the occasion, the guests, the feeling you want people to leave with — and shape it into a clear idea.",
    image: img.dinnerTable,
  },
  {
    title: "Planning",
    body: "Venue, budget, timeline, vendors and permissions, all in one plan with one point of contact.",
    image: img.conferenceRoom,
  },
  {
    title: "Design",
    body: "Stage, décor, lighting mood and guest journey — designed together so everything belongs to the same story.",
    image: img.weddingTable,
  },
  {
    title: "Production",
    body: "Our crew builds the stage, rigs the lights, tunes the sound and runs the LED — the technical backbone of the day.",
    image: img.stagePinkBlue,
  },
  {
    title: "Execution",
    body: "Show-flow, cues, artists and guests managed on the ground by a team that has rehearsed every minute.",
    image: img.stageBlue,
  },
  {
    title: "Celebration",
    body: "You stay present with your guests. We make sure the moment happens exactly as it should.",
    image: img.sparklers,
  },
];

export const filmFrames = [
  { label: "Venue", image: img.banquetHall },
  { label: "Setup", image: img.weddingTableLong },
  { label: "Stage", image: img.mandap },
  { label: "Lighting", image: img.stageBeams },
  { label: "Sound", image: img.mixingDesk },
  { label: "Guests", image: img.toast },
  { label: "Performance", image: img.performerSmoke },
  { label: "Celebration", image: img.confettiConcert },
];

export const productionCapabilities = [
  { title: "Stage", body: "Custom stages, ramps and risers designed and fabricated for the venue.", image: img.stagePurple },
  { title: "LED Walls", body: "Indoor and outdoor LED walls with content playback and IMAG.", image: img.concertColour },
  { title: "Sound", body: "Line arrays, monitoring and engineers who mix for the room.", image: img.mixingDesk },
  { title: "Lighting", body: "Architectural, stage and moving-head rigs, designed and operated live.", image: img.concertWhite },
  { title: "Trussing", body: "Truss roofs, goal-posts and rigging, safely engineered.", image: img.stageBlue },
  { title: "AV", body: "Projection, conferencing, cameras and live streaming.", image: img.conferenceHall },
  { title: "Special Effects", body: "Cold pyro, CO₂, confetti, haze and timed reveals.", image: img.confettiStage },
  { title: "Infrastructure", body: "Power, flooring, barricading and venue logistics.", image: img.venueHall },
];

// TODO(content): confirm this list matches the entertainment Maitreya actually offers.
export const entertainment = [
  { title: "Anchors", body: "Bilingual hosts who keep the room with you.", image: img.microphone },
  { title: "DJs", body: "From sangeet to after-party.", image: img.concertPurple },
  { title: "Live Musicians", body: "Bands, instrumentalists and vocalists.", image: img.concertWarm },
  { title: "Dance Performers", body: "Choreographed acts and troupes.", image: img.redLight },
  { title: "Artists", body: "Performers for every stage and audience.", image: img.performerSmoke },
  { title: "Celebrity Appearances", body: "Coordinated end-to-end, rider to exit.", image: img.concertCrowd },
  { title: "Cultural Performers", body: "Classical, folk and traditional arts.", image: img.holiColour },
  { title: "Programming", body: "The running order that builds the night.", image: img.crowdNight },
];

export const eventTypes = [
  "Wedding",
  "Corporate",
  "Cultural",
  "Birthday / Celebration",
  "College / School",
  "Concert / Live Event",
  "Product Launch",
  "Exhibition",
  "Other",
];

export const serviceOptions = [
  "Complete Event Management",
  "Decoration",
  "Stage",
  "Sound",
  "Lighting",
  "LED / AV",
  "Entertainment",
  "Photography / Video",
  "Artist Management",
  "Production",
  "Other",
];

export const guestRanges = ["Under 100", "100 – 300", "300 – 750", "750 – 2,000", "2,000+"];
export const budgetRanges = ["Prefer not to say", "Under ₹2 L", "₹2 – 5 L", "₹5 – 15 L", "₹15 – 50 L", "₹50 L+"];

/** Why Maitreya — shown as stacking cards on the homepage */
export const whyUs = [
  {
    kicker: "One team",
    title: "Planning to production, under one roof",
    body: "The people who plan your event are the people who build and run it — no hand-offs between agencies, no finger-pointing on the day.",
    image: img.stagePinkBlue,
  },
  {
    kicker: "In-house crew",
    title: "Stage, sound, light and LED we operate ourselves",
    body: "Our technical crew designs, rigs and runs the production, so what you approved in the plan is exactly what your guests see and hear.",
    image: img.mixingDesk,
  },
  {
    kicker: "Rooted in Tamil Nadu",
    title: "Traditions respected, timelines kept",
    body: "From muhurtham timings to temple-festival customs, we plan around what matters to your family and community.",
    image: img.mandap,
  },
  {
    kicker: "Clear planning",
    title: "One plan, one budget, one point of contact",
    body: "A written plan with every cue, vendor and cost — shared with you before the day, so there are no surprises on it.",
    image: img.conferenceRoom,
  },
  {
    kicker: "On the day",
    title: "Rehearsed, cued and calm",
    body: "Show-flow, rehearsals and a stage manager on headset — so you can stay with your guests while we run the room.",
    image: img.sparklers,
  },
];

/** Places we produce events — used as chips */
export const venueTypes = [
  "Kalyana mandapams",
  "Hotel ballrooms",
  "Banquet halls",
  "Beach resorts on ECR",
  "Convention centres",
  "Corporate campuses",
  "College auditoriums",
  "Open grounds",
  "Farmhouses & lawns",
  "Temple courtyards",
  "Rooftops",
  "Your home",
];

/** Homepage FAQ (also published as FAQPage structured data) */
export const generalFaq = [
  {
    q: "What kinds of events does Maitreya Events manage?",
    a: "Weddings and receptions, corporate events and annual days, cultural programmes and festivals, private celebrations, college culturals, concerts and live shows, public events and full event production.",
  },
  {
    q: "Do you only work in Chennai?",
    a: "We are based in Chennai and work across Tamil Nadu. For events elsewhere in India, tell us your city and dates and we will confirm what is possible.",
  },
  {
    q: "Can we book only stage, sound, lighting or LED?",
    a: "Yes. Production is available on its own for families, agencies, venues and organisers who need a reliable technical partner.",
  },
  {
    q: "How early should we contact you?",
    a: "For weddings and large events, three to six months ahead gives the most choice. Smaller celebrations and corporate events can often be planned in a few weeks.",
  },
  {
    q: "How is pricing worked out?",
    a: "Every event is quoted on its scope — guest count, venue, décor, production and entertainment. Share a rough budget and we will shape a plan around it.",
  },
  {
    q: "Will we have one point of contact?",
    a: "Yes. A dedicated event lead handles your plan from the first call to the last guest, and runs the day on site.",
  },
];

/** "A typical run of show" per service — an illustrative flow, not a fixed package */
export const runOfShow: Record<string, { when: string; title: string; body: string }[]> = {
  "wedding-events": [
    { when: "Weeks before", title: "Design & décor sign-off", body: "Mandap, stage, florals and lighting mood agreed with the family." },
    { when: "Day before", title: "Build & rehearsal", body: "Stage built, sound tuned, entries and cues rehearsed." },
    { when: "Muhurtham", title: "Ceremony", body: "Rituals timed to the muhurtham, nadaswaram and live coverage cued." },
    { when: "Evening", title: "Reception entry", body: "Couple entry with lighting and effects; the anchor opens the evening." },
    { when: "Night", title: "Music & celebration", body: "Live acts hand over to the DJ; guest flow and dinner managed." },
    { when: "Close", title: "Send-off", body: "A farewell moment, then our crew strikes the set." },
  ],
  "corporate-events": [
    { when: "Weeks before", title: "Show-flow & content", body: "Agenda, stage look, LED content and branding signed off." },
    { when: "Day before", title: "Tech rehearsal", body: "Presenters, awards walk-ups and cues run on the actual stage." },
    { when: "Doors", title: "Registration & arrival", body: "Guests welcomed and seated with walk-in music and visuals." },
    { when: "Act one", title: "Keynotes & year in review", body: "Presentations on LED, with a camera feed for the back rows." },
    { when: "Act two", title: "Awards", body: "Choreographed walk-ups, stingers and lighting on every winner." },
    { when: "Act three", title: "Celebration", body: "Performances and a DJ set to close the night." },
  ],
  "cultural-events": [
    { when: "Months before", title: "Programme & artists", body: "Performers, running order and stage requirements confirmed." },
    { when: "Day before", title: "Stage & sound check", body: "Acoustic-first sound checks with each troupe." },
    { when: "Evening", title: "Opening", body: "Lamp lighting and welcome; audience seated." },
    { when: "Programme", title: "Performances", body: "Classical, folk and dance sets with tight changeovers." },
    { when: "Close", title: "Finale", body: "Closing performance and felicitations." },
  ],
  "private-events": [
    { when: "Weeks before", title: "Theme & plan", body: "Theme, décor, entertainment and menu agreed." },
    { when: "Morning", title: "Set-up", body: "Décor, balloon styling and sound set up at the venue." },
    { when: "Arrival", title: "Welcome", body: "Guests welcomed; photo corner and games open." },
    { when: "Highlight", title: "The moment", body: "Cake, entry or surprise — timed and lit." },
    { when: "Close", title: "Wrap-up", body: "Return gifts handed out while we pack up." },
  ],
  "live-events": [
    { when: "Weeks before", title: "Rider & production plan", body: "Artist rider reviewed; stage, PA and lighting designed." },
    { when: "Show day", title: "Load-in & sound check", body: "Stage and truss built, line check and sound check." },
    { when: "Doors", title: "Crowd in", body: "Entry, wristbands and barricade lines managed." },
    { when: "Show", title: "Support to headline", body: "Changeovers, lighting cues and effects called live." },
    { when: "Close", title: "Egress", body: "Safe exit, then load-out." },
  ],
  "college-events": [
    { when: "Weeks before", title: "Plan with students", body: "Event list, stages and budget agreed with the committee." },
    { when: "Day one", title: "Competitions", body: "Multiple stages run with timings and cues for the judges." },
    { when: "Evening", title: "Artist night", body: "Main stage with LED, crowd safety and barricades." },
    { when: "Close", title: "Prize distribution", body: "Results, trophies and closing." },
  ],
  "public-events": [
    { when: "Months before", title: "Site plan & permissions", body: "Layout, stalls, entry points and permissions." },
    { when: "Build", title: "Set-up", body: "Stage, stalls, lighting and signage installed." },
    { when: "Gates", title: "Entry", body: "Ticketing and registration desks open." },
    { when: "Programme", title: "Stage & activities", body: "Performances, activations and the food court running." },
    { when: "Close", title: "Close & clear", body: "Crowd dispersal and site clearance." },
  ],
  "event-production": [
    { when: "Design", title: "Technical design", body: "Stage drawings, rigging plan, power and AV schedule." },
    { when: "Build", title: "Load-in", body: "Truss, stage, LED and lighting rigged and tested." },
    { when: "Check", title: "Line & sound check", body: "Every input tested; lighting programmed to the show." },
    { when: "Show", title: "Show-calling", body: "Crew on headsets running cues with the stage manager." },
    { when: "Close", title: "Load-out", body: "Safe de-rig and the venue handed back." },
  ],
};
