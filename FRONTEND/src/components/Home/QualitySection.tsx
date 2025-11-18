import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, ShieldCheck, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const QualitySection: React.FC = () => {
  const features = [
    {
      title: "Premium Quality",
      description:
        "Only the finest Grade A produce and grains sourced directly from trusted farmers who meet our rigorous standards.",
      icon: Award,
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "group-hover:border-amber-200",
    },
    {
      title: "Certified & Safe",
      description:
        "Full compliance with ISO, FSSAI, and global food safety standards to ensure peace of mind for every shipment.",
      icon: ShieldCheck,
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "group-hover:border-blue-200",
    },
    {
      title: "Organic & Sustainable",
      description:
        "A wide range of sustainably grown organic products that support healthy living and environmental responsibility.",
      icon: Leaf,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      border: "group-hover:border-emerald-200",
    },
  ];

  return (
    <section className="relative bg-white py-20 sm:py-24 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Commitment to <span className="text-primary">Excellence</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At MRPGlobal Traders, quality is our top priority. From exotic
              tropical fruits to staple grains, every product undergoes strict
              quality assurance processes to guarantee freshness and safety for
              our customers worldwide.
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
              className={`group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center ${feature.border}`}
            >
              <div
                className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
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
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-1"
          >
            <span>Discover Our Quality Range</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default QualitySection;
