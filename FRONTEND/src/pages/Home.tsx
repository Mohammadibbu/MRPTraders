// src/pages/Home.tsx
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Hero from "../components/Home/Hero";
import MissionSection from "../components/Home/MissionSection";
import ImportExportSection from "../components/Home/ImportExportSection";
import QualitySection from "../components/Home/QualitySection";
import GlobalImpactSection from "../components/Home/GlobalImpactSection";
import TransactionsSection from "../components/Home/TransactionsSection";
// import TestimonialsSection from "../components/Home/TestimonialsSection";
import JoinUsSection from "../components/Home/JoinUsSection";
import Banner from "../components/Home/Banner";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = useCallback(() => {
    navigate("/contact");
  }, [navigate]);

  return (
    <>
      <Banner
        text="Join us in Denver from June 7 – 9 to see what’s coming next."
        buttonText="Contact now"
        onButtonClick={handleButtonClick}
      />

      <AnimatePresence>
        {/* Reusable animation sections */}

        <Hero />

        <MissionSection />

        <ImportExportSection />

        <QualitySection />

        <GlobalImpactSection />

        <TransactionsSection />

        {/* <TestimonialsSection /> */}

        <JoinUsSection />
      </AnimatePresence>
    </>
  );
};

export default Home;
