import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Animation from "../../utils/Animation";

const MissionSection: React.FC = () => {
  return (
    <section className="bg-[#F7F4F1] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <Animation initialY={-100}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>
        </Animation>

        {/* Description */}
        <Animation initialY={-50}>
          <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            We bridge the gap between local farmers and international buyers,
            ensuring the global trade of fresh produce, grains, and high-quality
            food products. MRPGlobal Traders aims to support local agriculture
            while providing businesses worldwide with premium, fresh supplies.
          </p>
        </Animation>

        {/* Flexbox layout for image and content */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-10 pr-5">
          <Animation initialX={100}>
            <img
              src="https://imgsrv2.voi.id/OuBRtklGGiwi5FTEKc9UWdpRiNdCrWPOeoMdb6J2aqk/auto/1280/853/sm/1/bG9jYWw6Ly8vcHVibGlzaGVycy8zMDE0NjUvMjAyMzA4MTQxMzE2LW1haW4ucG5n.jpg"
              alt="Our Mission"
              className="lg:w-2/2 w-full max-w-2xl mx-auto rounded-lg shadow-lg mb-9"
            />
          </Animation>
          {/* Content on the left */}
          <div className="lg:w-2/2 ">
            <Animation initialX={-100}>
              <p className="text-lg text-gray-700 mb-8">
                Our mission is to empower farmers and suppliers by providing
                them access to a global marketplace. We ensure that every
                product reaches its destination with care and quality.
              </p>
            </Animation>
            <Animation initialY={100}>
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Animation>
          </div>
          {/* Image on the right */}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
