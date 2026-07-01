import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Economy } from "@/components/sections/Economy";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { BuiltOnSolana } from "@/components/sections/BuiltOnSolana";
import { Architecture } from "@/components/sections/Architecture";
import { Roadmap } from "@/components/sections/Roadmap";
import { LaunchCountdown } from "@/components/sections/LaunchCountdown";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Economy />
        <Problem />
        <Solution />
        <HowItWorks />
        <Features />
        <BuiltOnSolana />
        <Architecture />
        <Roadmap />
        <LaunchCountdown />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
