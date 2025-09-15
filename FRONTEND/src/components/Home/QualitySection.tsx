import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Shield, Leaf } from "lucide-react";

const QualitySection: React.FC = () => {
  return (
    <section className="bg-[#F7F4F1]  py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          High-Quality Products
        </h2>
        <p className="text-lg mb-12 max-w-4xl mx-auto leading-relaxed opacity-90">
          From exotic fruits like Rambutan, Mangosteen, and Durian to essential
          grains such as rice and wheat, all our products go through a rigorous
          quality check, ensuring only the finest for our buyers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-white bg-opacity-90 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Premium Grade</h3>
            <p className="opacity-90">
              Only Grade A products make it to our platform
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white bg-opacity-90 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Certified Safe</h3>
            <p className="opacity-90">
              ISO, FSSAI, and international certifications
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white bg-opacity-90 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Leaf className="h-8 w-8 " />
            </div>
            <h3 className="text-xl font-semibold mb-2">Organic Options</h3>
            <p className="opacity-90">
              Sustainably grown organic produce available
            </p>
          </div>
        </div>

        {/* <div className="mb-8">
          <img
            src="https://images.pexels.com/photos/4963429/pexels-photo-4963429.jpeg"
            alt="High Quality Products"
            className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
          />
        </div> */}

        <Link
          to="/products"
          className="inline-flex items-center space-x-2 bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
        >
          <span>Explore Our Products</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};

export default QualitySection;
