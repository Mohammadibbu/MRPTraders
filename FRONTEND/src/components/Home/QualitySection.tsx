import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, ShieldCheck, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const QualitySection: React.FC = () => {
  const features = [
    {
      title: "Premium Sourcing",
      description:
        "Only the finest Grade A produce and grains sourced directly from trusted farmers who meet our rigorous standards.",
      icon: Award,
      color: "text-amber-600",
      bg: "bg-amber-50",
      shadow: "hover:shadow-amber-100",
      border: "hover:border-amber-200",
    },
    {
      title: "Certified Safety",
      description:
        "Full compliance with ISO, FSSAI, and global food safety standards to ensure peace of mind for every shipment.",
      icon: ShieldCheck,
      color: "text-blue-600",
      bg: "bg-blue-50",
      shadow: "hover:shadow-blue-100",
      border: "hover:border-blue-200",
    },
    {
      title: "Eco-Conscious",
      description:
        "A wide range of sustainably grown organic products that support healthy living and environmental responsibility.",
      icon: Leaf,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      shadow: "hover:shadow-emerald-100",
      border: "hover:border-emerald-200",
    },
  ];

  return (
    <section className="relative bg-white py-20  overflow-hidden">
      {/* ================= DECORATIVE DIVIDER ================= */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_1px_12px_0_rgba(0,0,0,0.1)]" />

      {/* ================= BACKGROUND ELEMENTS ================= */}

      {/* 1. Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* 2. Giant Watermark Text */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-[10rem] lg:text-[16rem] font-black text-gray-50 pointer-events-none select-none leading-none opacity-80 whitespace-nowrap">
        QUALITY
      </div>

      {/* 3. Ambient Gradient Blobs */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-amber-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-blue-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-wider mb-6 border border-amber-100">
              <Award className="w-3 h-3" /> Our Promise
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Commitment to{" "}
              <span className="text-primary relative inline-block">
                Excellence
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At MRPGlobal Traders, quality is our top priority. From exotic
              tropical fruits to staple grains, every product undergoes strict
              quality assurance processes to guarantee freshness and safety.
            </p>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 transition-all duration-500 hover:-translate-y-2 ${feature.shadow} ${feature.border}`}
            >
              {/* Icon Container */}
              <div className="relative mb-6 inline-block">
                <div
                  className={`w-20 h-20 rounded-2xl ${feature.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10`}
                >
                  <feature.icon className={`h-10 w-10 ${feature.color}`} />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-600 text-base leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/products"
            className="group inline-flex items-center gap-3 bg-[#0B1120] text-white px-10 py-4 rounded-full font-bold hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
          >
            <span>Discover Our Quality Range</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default QualitySection;
