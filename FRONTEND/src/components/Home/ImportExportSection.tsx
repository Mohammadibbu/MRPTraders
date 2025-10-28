import React from "react";
import { ArrowUpCircle, ArrowDownCircle, Package, Globe } from "lucide-react";
import Animation from "../../utils/Animation";

const ImportExportSection: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title Animation */}
        <Animation initialY={-50}>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Simplifying Global Trade, One Shipment at a Time
          </h2>
        </Animation>

        {/* Description Animation */}
        <Animation initialY={-50}>
          <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            At MRPGlobal Traders, we make importing and exporting effortless.
            Whether you're sourcing fresh produce or distributing Indian staples
            worldwide, our trusted logistics and quality-first approach ensure a
            smooth experience from farm to market.
          </p>
        </Animation>

        {/* Icon Cards Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Import Products */}
          <Animation initialX={-50}>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <ArrowDownCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Import Essentials
              </h3>
              <p className="text-gray-600">
                Sourcing top-grade tropical fruits and specialty items from
                trusted global partners.
              </p>
            </div>
          </Animation>

          {/* Export Products */}
          <Animation initialY={50}>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <ArrowUpCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Export with Confidence
              </h3>
              <p className="text-gray-600">
                Delivering India’s finest rice, pulses, spices, and grains to
                global destinations.
              </p>
            </div>
          </Animation>

          {/* Quality Assured */}
          <Animation initialX={50}>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">
                Certified Quality
              </h3>
              <p className="text-gray-600">
                Every batch undergoes strict inspections to meet international
                quality and safety standards.
              </p>
            </div>
          </Animation>

          {/* Global Reach */}
          <Animation initialY={-50}>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Global Reach
              </h3>
              <p className="text-gray-600">
                Serving importers and distributors across Asia, the Middle East,
                Europe, and beyond.
              </p>
            </div>
          </Animation>
        </div>
      </div>
    </section>
  );
};

export default ImportExportSection;
