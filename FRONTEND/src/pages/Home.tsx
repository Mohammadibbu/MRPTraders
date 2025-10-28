// src/pages/Home.tsx
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Hero from "../components/Home/Hero";
import MissionSection from "../components/Home/MissionSection";
import ProductSection from "../components/Home/ProductSection";
import ImportExportSection from "../components/Home/ImportExportSection";
import QualitySection from "../components/Home/QualitySection";
import GlobalImpactSection from "../components/Home/GlobalImpactSection";
import TransactionsSection from "../components/Home/TransactionsSection";
// import TestimonialsSection from "../components/Home/TestimonialsSection";
import JoinUsSection from "../components/Home/JoinUsSection";
import Banner from "../components/Home/Banner";

const Home: React.FC = () => {
  const navigate = useNavigate();
  // const categoriesMap = new Map<string, string>();

  // products?.forEach((product) => {
  //   if (!categoriesMap.has(product.category)) {
  //     // Pick a random image from this product's photos
  //     const photos = product.photos || [];

  //     const randomImage: any =
  //       photos[Math.floor(Math.random() * photos.length)].base64 || "";

  //     categoriesMap.set(product.category, randomImage);
  //   }
  // });

  // // Convert Map to desired array format
  // const categories = Array.from(categoriesMap.entries()).map(
  //   ([name, image], index) => ({
  //     id: index + 1,
  //     name,
  //     image,
  //     link: `/products?category=${name}`,
  //   })
  // );

  const handleButtonClick = useCallback(() => {
    navigate("/contact");
  }, [navigate]);

  return (
    <>
      <Banner
        mainText="Sourcing You Can Trust"
        text="MRP GLOBAL Traders delivers ethical, sustainable, high-quality agricultural products worldwide."
        buttonText="Contact Us"
        onButtonClick={handleButtonClick}
      />

      <AnimatePresence>
        <Hero />

        <MissionSection />

        <ProductSection />

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
