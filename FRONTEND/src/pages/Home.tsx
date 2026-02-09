import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async"; // SEO
import Hero from "../components/Home/Hero";
import MissionSection from "../components/Home/MissionSection";
import ProductSection from "../components/Home/ProductSection";
import ImportExportSection from "../components/Home/ImportExportSection";
import QualitySection from "../components/Home/QualitySection";
import GlobalImpactSection from "../components/Home/GlobalImpactSection";
import TransactionsSection from "../components/Home/TransactionsSection";
import JoinUsSection from "../components/Home/JoinUsSection";
import Banner from "../components/Home/Banner";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = useCallback(() => {
    navigate("/contact");
  }, [navigate]);

  return (
    <>
      {/* Dynamic SEO Metadata for the Home Page */}
      <Helmet>
        <title>
          MRP Global Traders | Ethical Agricultural Exports & Global Sourcing
        </title>
        <meta
          name="description"
          content="Experience world-class sourcing with MRP Global Traders. We export sustainable, high-quality spices, millets, and fresh produce from India to the global market."
        />
        <link rel="canonical" href="https://mrpglobaltraders.com/" />
      </Helmet>

      <Banner
        mainText="Sourcing You Can Trust"
        text="MRP GLOBAL Traders delivers ethical, sustainable, high-quality agricultural products worldwide."
        buttonText="Contact Us"
        onButtonClick={handleButtonClick}
      />

      <AnimatePresence>
        <main className="overflow-hidden">
          {" "}
          {/* Changed <div> to <main> for better SEO semantics */}
          {/* Hero section usually contains your H1 */}
          <Hero />
          <MissionSection />
          {/* Product section should use H2s for product categories */}
          <ProductSection />
          <ImportExportSection />
          <QualitySection />
          <GlobalImpactSection />
          <TransactionsSection />
          <JoinUsSection />
        </main>
      </AnimatePresence>
    </>
  );
};

export default Home;
