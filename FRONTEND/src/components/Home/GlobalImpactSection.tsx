import React from 'react';
import { Users, TrendingUp, Globe, Heart } from 'lucide-react';

const GlobalImpactSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Global Reach, Local Impact
        </h2>
        <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
          We empower local farmers by providing them access to a global marketplace. Our platform brings the world closer to local agricultural communities, helping them grow and expand their businesses.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#5F1A35] mb-2">500+</div>
            <div className="text-gray-600">Partner Farmers</div>
            <Users className="h-8 w-8 text-[#CCBBAE] mx-auto mt-2" />
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-[#5F1A35] mb-2">50+</div>
            <div className="text-gray-600">Countries Served</div>
            <Globe className="h-8 w-8 text-[#CCBBAE] mx-auto mt-2" />
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-[#5F1A35] mb-2">1000+</div>
            <div className="text-gray-600">Successful Trades</div>
            <TrendingUp className="h-8 w-8 text-[#CCBBAE] mx-auto mt-2" />
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-[#5F1A35] mb-2">99%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
            <Heart className="h-8 w-8 text-[#CCBBAE] mx-auto mt-2" />
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <img
            src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg"
            alt="Global Local Impact"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default GlobalImpactSection;