import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const MissionSection: React.FC = () => {
  return (
    <section className="bg-[#F7F4F1] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Our Mission
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
          We bridge the gap between local farmers and international buyers,
          ensuring the global trade of fresh produce, grains, and high-quality
          food products. MRPGlobal Traders aims to support local agriculture
          while providing businesses worldwide with premium, fresh supplies.
        </p>
        <div className="relative mb-20">
          <img
            src="https://imgsrv2.voi.id/OuBRtklGGiwi5FTEKc9UWdpRiNdCrWPOeoMdb6J2aqk/auto/1280/853/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy8zMDE0NjUvMjAyMzA4MTQxMzE2LW1haW4ucG5n.jpg"
            alt="Our Mission"
            className=" w-full max-w-2xl mx-auto rounded-lg shadow-lg"
          />
          <img
            src="https://www.shutterstock.com/shutterstock/videos/1081639619/thumb/4.jpg?ip=x480"
            alt="Our Mission"
            className="absolute w-[50%] top-20 right-20 rounded-lg shadow-lg skew-x-6 border-white border "
          />
        </div>
        <Link
          to="/about"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#5F1A35] to-[#CCBBAE] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
        >
          <span>Learn More About Us</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};

export default MissionSection;
