import { useState } from "react";
import { Hero } from "../components/hawaa/Hero";
import { Marquee } from "../components/hawaa/Marquee";
import { Mission } from "../components/hawaa/Mission";
import { Challenge } from "../components/hawaa/Challenge";
import { HowItWorks } from "../components/hawaa/HowItWorks";
import { Product } from "../components/hawaa/Product";
import { Packages } from "../components/hawaa/Packages";
import { Founder } from "../components/hawaa/Founder";
import { Contact } from "../components/hawaa/Contact";

export default function Home() {
  const [pkg, setPkg] = useState("");
  return (
    <main data-testid="home-page">
      <Hero />
      <Marquee />
      <Mission />
      <Challenge />
      <HowItWorks />
      <Product />
      <Packages onPick={setPkg} />
      <Founder />
      <Contact pkg={pkg} />
    </main>
  );
}
