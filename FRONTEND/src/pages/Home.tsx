import React from "react";
import Hero from "../components/Home/Hero";
import MissionSection from "../components/Home/MissionSection";
import ImportExportSection from "../components/Home/ImportExportSection";
import QualitySection from "../components/Home/QualitySection";
import GlobalImpactSection from "../components/Home/GlobalImpactSection";
import TransactionsSection from "../components/Home/TransactionsSection";
import TestimonialsSection from "../components/Home/TestimonialsSection";
import JoinUsSection from "../components/Home/JoinUsSection";
import Banner from "../components/Home/Banner";
import { useNavigate } from "react-router-dom";
const Home: React.FC = () => {
  const Navigate = useNavigate();
  const handleButtonClick = () => {
    Navigate("/contact");
  };
  return (
    <div>
      <Banner
        text="Join us in Denver from June 7 – 9 to see what’s coming next."
        buttonText="Contact now"
        onButtonClick={handleButtonClick}
      />
      <Hero />
      <MissionSection />
      <ImportExportSection />
      <QualitySection />
      <GlobalImpactSection />
      <TransactionsSection />
      <TestimonialsSection />
      <JoinUsSection />
    </div>
  );
};

export default Home;
