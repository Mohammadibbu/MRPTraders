import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Leaf, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import ImagewithLoader from "../../utils/imageLoader";

const MissionSection: React.FC = () => {
  return (
    <section className="relative bg-white py-20  overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_1px_12px_0_rgba(0,0,0,0.1)]" />

      {/* ================= BACKGROUND ELEMENTS ================= */}

      {/* 1. Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* 2. Giant Watermark Text */}
      <div className="absolute top-20 right-0 text-[10rem] lg:text-[14rem] font-black text-gray-50 pointer-events-none select-none leading-none opacity-60 hidden lg:block">
        VISION
      </div>

      {/* 3. Ambient Gradient Blob */}
      <div className="absolute top-1/2 left-0 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      {/* ================= MAIN CONTENT ================= */}
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
            {/* Image Container */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200/50 border border-white/50 group">
              <div className="relative aspect-[4/5] sm:aspect-[4/3.5] bg-gray-100">
                <ImagewithLoader
                  src="/Images/HomePageImages/mission.png"
                  alt="Our Mission - Fresh global trade"
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                />
                {/* Overlay Gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Decorative Floating Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 hidden sm:flex bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 items-center gap-4 z-10"
            >
              <div className="bg-green-100/50 p-3 rounded-full ring-1 ring-green-100">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-wide mb-0.5">
                  Commitment
                </p>
                <p className="text-sm font-bold text-gray-900">
                  Sustainable Growth
                </p>
              </div>
            </motion.div>

            {/* Decorative dots behind */}
            <div className="absolute -z-10 -top-6 -left-6 grid grid-cols-4 gap-2 opacity-20">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                ></div>
              ))}
            </div>
          </motion.div>

          {/* --- Right Column: Content --- */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                <Sprout className="w-3 h-3" /> Core Purpose
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-[1.15]">
                Connecting Farmers to <br />
                <span className="text-primary">Global Opportunities</span>
              </h2>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                At MRPGlobal Traders, we aim to build a bridge between local
                farmers and vast global markets — delivering farm-fresh produce,
                grains, and food products with consistency and care.
              </p>

              {/* Feature List */}
              <div className="space-y-4 mb-10">
                {[
                  "Empowering local producers with fair trade access.",
                  "Ensuring 100% traceability from farm to fork.",
                  "Commitment to freshness and ethical sourcing.",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <div className="mt-0.5 bg-green-50 rounded-full p-0.5">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-primary transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="group inline-flex items-center gap-2 bg-[#0B1120] text-white px-8 py-4 rounded-full font-bold hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
              >
                <span>Discover Our Story</span>
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
