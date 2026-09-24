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
