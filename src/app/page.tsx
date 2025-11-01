import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Fields } from "@/components/sections/fields";
import { Achievements } from "@/components/sections/achievements";
import { JoinUs } from "@/components/sections/join-us";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Fields />
      <Achievements />
      <JoinUs />
    </>
  );
}
