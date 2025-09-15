import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Globe, TrendingUp } from "lucide-react";

const JoinUsSection: React.FC = () => {
  return (
    <section className="bg-primary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us Today</h2>
        <p className="text-lg mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
          Are you a farmer or a business looking to expand your reach? Join
          MRPGlobal Traders today and start connecting with global markets.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">For Farmers</h3>
            <p className="opacity-90">
              Connect with international buyers and expand your market reach
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">For Businesses</h3>
            <p className="opacity-90">
              Source premium quality products directly from trusted suppliers
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Grow Together</h3>
            <p className="opacity-90">
              Join a thriving community of global traders and partners
            </p>
          </div>
        </div>

        <Link
          to="/contact"
          className="inline-flex items-center space-x-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          <span>Reach Out Now</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};

export default JoinUsSection;
