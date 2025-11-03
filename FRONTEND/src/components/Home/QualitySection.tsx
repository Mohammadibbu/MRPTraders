import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Shield, Leaf } from "lucide-react";
import Animation from "../../utils/Animation";

const QualitySection: React.FC = () => {
  return (
    <section className="bg-secondarylight py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title Animation */}
        <Animation initialY={-50}>
          <h2 className="text-3xl md:text-4xl text-primary font-bold mb-6">
            Commitment to Excellence & Quality
          </h2>
        </Animation>

        {/* Description Animation */}
        <Animation initialY={-50}>
          <p className="text-lg mb-12 max-w-4xl mx-auto leading-relaxed opacity-90">
            At MRPGlobal Traders, quality is our top priority. From exotic
            tropical fruits like Rambutan, Mangosteen, and Durian to staple
            grains such as rice and wheat, every product undergoes strict
            quality assurance processes to guarantee freshness and safety for
            our customers worldwide.
          </p>
        </Animation>

        {/* Icon Cards Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Premium Grade */}
          <Animation initialX={-50}>
            <div className="text-center">
              <div className="bg-white bg-opacity-90 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="opacity-90">
                Only the finest Grade A produce and grains sourced from trusted
                farmers.
              </p>
            </div>
          </Animation>

          {/* Certified Safe */}
          <Animation initialY={50}>
            <div className="text-center">
              <div className="bg-white bg-opacity-90 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Certified & Safe</h3>
              <p className="opacity-90">
                Compliance with ISO, FSSAI, and global food safety standards for
                peace of mind.
              </p>
            </div>
          </Animation>

          {/* Organic Options */}
          <Animation initialX={50}>
            <div className="text-center">
              <div className="bg-white bg-opacity-90 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Organic & Sustainable
              </h3>
              <p className="opacity-90">
                Wide range of sustainably grown organic products to support
                healthy living.
              </p>
            </div>
          </Animation>
        </div>

        {/* Button Animation */}
        <Animation initialY={50}>
          <Link
            to="/products"
            className="group inline-flex items-center space-x-2 bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
          >
            <span>Discover Our Quality Range</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 duration-300" />
          </Link>
        </Animation>
      </div>
    </section>
  );
};

export default QualitySection;
