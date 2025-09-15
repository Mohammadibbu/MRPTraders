import React from "react";
import { ArrowUpCircle, ArrowDownCircle, Package, Globe } from "lucide-react";

const ImportExportSection: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Import & Export Made Easy
        </h2>
        <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
          Our platform simplifies the process of importing and exporting fresh
          fruits, pulses, rice, wheat, and more. Whether you are a farmer, a
          supplier, or a global business, MRPGlobal Traders offers a seamless
          experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="text-center group">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <ArrowDownCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Import Products
            </h3>
            <p className="text-gray-600">
              Premium tropical fruits from Southeast Asia
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <ArrowUpCircle className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Export Products
            </h3>
            <p className="text-gray-600">
              Quality grains and pulses from India
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Package className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Quality Assured
            </h3>
            <p className="text-gray-600">
              Rigorous quality checks and certifications
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Global Reach
            </h3>
            <p className="text-gray-600">Connecting markets worldwide</p>
          </div>
        </div>

        {/* <div className="relative h-24 mb-10">
          <img
            src="https://images.pexels.com/photos/33401363/pexels-photo-33401363.jpeg?cs=srgb&dl=pexels-nh-t-nguyen-tr-n-2154796625-33401363.jpg&fm=jpg"
            alt="Import Export Process"
            className="w-full h-[600px] object-cover rounded-lg shadow-lg opacity-70 "
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#5f1a3598] via-black/20 to-[#5f1a3598]"></div>
        </div> */}
      </div>
    </section>
  );
};

export default ImportExportSection;
