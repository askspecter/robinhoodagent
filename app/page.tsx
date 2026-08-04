import { Ticker } from "@/components/Ticker";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Tokenomics } from "@/components/Tokenomics";
import { Roadmap } from "@/components/Roadmap";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Ticker />
      <Hero />
      <HowItWorks />
      <Tokenomics />
      <Roadmap />
      <Faq />
      <Footer />
    </>
  );
}
