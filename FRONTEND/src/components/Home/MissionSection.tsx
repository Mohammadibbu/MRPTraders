import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import ImagewithLoader from "../../utils/imageLoader";

const MissionSection: React.FC = () => {
  return (
    <section className="relative bg-white py-20 sm:py-24 overflow-hidden">
      {/* Background Decor - Subtle Dot Pattern */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-[0.4]">
        <svg
          className="absolute right-0 top-0 text-gray-100 h-full w-1/2 transform translate-x-1/4"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M50 0L100 0L100 100L0 100L0 0Z" fillOpacity="0.5" />
        </svg>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* --- Left Column: Image --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-200 border border-gray-100">
              <ImagewithLoader
                src="/Images/HomePageImages/mission.png"
                alt="Our Mission - Fresh global trade"
                className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>

            {/* Decorative Floating Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase">
                    Quality Guaranteed
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    100% Certified
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* --- Right Column: Content --- */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                Connecting Farmers to <br />
                <span className="text-primary">Global Opportunities</span>
              </h2>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At MRPGlobal Traders, we aim to build a bridge between farmers
                and global markets — delivering farm-fresh produce, grains, and
                food products with consistency and care.
              </p>

              <p className="text-base text-gray-500 mb-8 leading-relaxed">
                We empower local producers by providing them access to global
                opportunities. Every product we deliver reflects our commitment
                to freshness, traceability, and ethical trade. From sourcing to
                shipment, our process is built on transparency, quality, and
                mutual growth.
              </p>

              <Link
                to="/about"
                className="group inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
