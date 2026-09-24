import { Hero } from "@/components/hero/Hero";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { EventWorlds } from "@/components/sections/EventWorlds";
import { IdeaToEvent } from "@/components/sections/IdeaToEvent";
import { ScrollFilm } from "@/components/sections/ScrollFilm";
import { SelectedEvents } from "@/components/sections/SelectedEvents";
import { Production } from "@/components/sections/Production";
import { Entertainment } from "@/components/sections/Entertainment";
import { Upcoming } from "@/components/sections/Upcoming";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <EventWorlds />
      <IdeaToEvent />
      <ScrollFilm />
      <SelectedEvents />
      <Production />
      <Entertainment />
      <Upcoming />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
