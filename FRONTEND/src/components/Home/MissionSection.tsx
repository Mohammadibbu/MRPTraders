import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Animation from "../../utils/Animation";

import ImagewithLoader from "../../utils/imageLoader";

const MissionSection: React.FC = () => {
  return (
    <section className="bg-secondarylight py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Animation initialY={-100}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
          </Animation>
          <Animation initialY={-50}>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              At MRPGlobal Traders, we aim to build a bridge between farmers and
              global markets — delivering farm-fresh produce, grains, and food
              products with consistency and care.
            </p>
          </Animation>
        </div>

        {/* Content Section */}

        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <Animation initialX={100}>
              <ImagewithLoader
                src={`/Images/HomePageImages/mission.png`}
                alt="Fresh global trade"
                className={`rounded-lg shadow-lg object-cover w-full h-full max-h-[420px] transition-opacity duration-700`}
              />
            </Animation>
          </div>
          {/* Text Block */}
          <div className="w-full lg:w-1/2">
            <Animation initialX={-100}>
              <p className="text-lg text-gray-700 mb-8 text-left lg:text-justify leading-relaxed">
                We empower local producers by providing them access to global
                opportunities. Every product we deliver reflects our commitment
                to freshness, traceability, and ethical trade. From sourcing to
                shipment, our process is built on transparency, quality, and
                mutual growth.
              </p>
            </Animation>
            <Animation initialY={100}>
              <Link
                to="/about"
                className="group inline-flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 duration-300" />
              </Link>
            </Animation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
