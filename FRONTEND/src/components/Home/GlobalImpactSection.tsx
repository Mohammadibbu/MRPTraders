import React, { useState } from "react";
import { Users, TrendingUp, Globe, Heart } from "lucide-react";
import Animation from "../../utils/Animation";
import SkeletonLoader from "../UI/SkeletonLoader";

const GlobalImpactSection: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
        {/* Title Animation */}
        <Animation initialY={-50}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Bridging Borders, Empowering Communities
          </h2>
        </Animation>

        {/* Description Animation */}
        <Animation initialY={-50}>
          <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            At MRPGlobal Traders, we connect local farmers with international
            markets, fostering sustainable growth and economic empowerment. Our
            platform supports agricultural communities worldwide, enabling them
            to thrive in the global economy.
          </p>
        </Animation>

        {/* Stats Cards Animation */}
        <div className="grid grid-cols-2  lg:grid-cols-4 gap-8 mb-12">
          {/* Partner Farmers */}
          <Animation initialX={-50}>
            <div className="text-center  ">
              <div className="text-4xl font-bold text-primary mb-2 ">500+</div>
              <div className="text-gray-600">Partner Farmers</div>
              <Users className="h-8 w-8 text-dustyTaupe mx-auto mt-2" />
            </div>
          </Animation>

          {/* Countries Served */}
          <Animation initialY={50}>
            <div className="text-center  ">
              <div className="text-4xl font-bold text-primary mb-2 ">50+</div>
              <div className="text-gray-600">Countries Served</div>
              <Globe className="h-8 w-8 text-dustyTaupe mx-auto mt-2" />
            </div>
          </Animation>

          {/* Successful Trades */}
          <Animation initialX={50}>
            <div className="text-center  ">
              <div className="text-4xl font-bold text-primary mb-2 ">1000+</div>
              <div className="text-gray-600">Successful Trades</div>
              <TrendingUp className="h-8 w-8 text-dustyTaupe mx-auto mt-2" />
            </div>
          </Animation>

          {/* Satisfaction Rate */}
          <Animation initialY={-50}>
            <div className="text-center  ">
              <div className="text-4xl font-bold text-primary mb-2 ">99%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
              <Heart className="h-8 w-8 text-dustyTaupe mx-auto mt-2" />
            </div>
          </Animation>
        </div>

        {/* Image Fade-In Animation with Skeleton */}
        <Animation initialY={50}>
          <div className="max-w-3xl mx-auto">
            {!imageLoaded && <SkeletonLoader type="image" />}
            <img
              src="/Images/HomePageImages/Globalimpact.png"
              alt="Global Local Impact"
              className={`w-full rounded-lg shadow-lg transition-opacity duration-700 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(false)}
            />
          </div>
        </Animation>
      </div>
    </section>
  );
};

export default GlobalImpactSection;
