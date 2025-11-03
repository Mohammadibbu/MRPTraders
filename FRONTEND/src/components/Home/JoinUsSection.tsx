import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Globe, TrendingUp } from "lucide-react";
import Animation from "../../utils/Animation";

const JoinUsSection: React.FC = () => {
  return (
    <section className="bg-secondaryDark text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Animation initialY={-100}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Partner With MRPGlobal Traders
          </h2>
        </Animation>

        <Animation initialY={-50}>
          <p className="text-lg mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
            Whether you're a grower, supplier, or business leader — we're here
            to help you scale globally. Tap into reliable trade networks,
            premium markets, and long-term growth opportunities.
          </p>
        </Animation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* For Farmers */}
          <Animation initialX={-100}>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Empower Farmers</h3>
              <p className="opacity-90">
                Gain access to international markets and get fair value for your
                harvest.
              </p>
            </div>
          </Animation>

          {/* For Businesses */}
          <Animation initialY={100}>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Support Businesses</h3>
              <p className="opacity-90">
                Source certified, high-quality products directly from trusted
                origins.
              </p>
            </div>
          </Animation>

          {/* Grow Together */}
          <Animation initialX={100}>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Grow With Us</h3>
              <p className="opacity-90">
                Join a dynamic network of partners driving ethical, scalable
                trade.
              </p>
            </div>
          </Animation>
        </div>

        {/* Call to Action */}
        <Animation initialY={100}>
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <span>Let’s Start the Conversation</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Animation>
      </div>
    </section>
  );
};

export default JoinUsSection;
