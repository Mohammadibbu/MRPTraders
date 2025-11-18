import React from "react";
import { ArrowUpCircle, ArrowDownCircle, Package, Globe } from "lucide-react";
import { motion } from "framer-motion";

const ImportExportSection: React.FC = () => {
  const features = [
    {
      title: "Import Essentials",
      description:
        "Sourcing top-grade tropical fruits and specialty items from trusted global partners.",
      icon: ArrowDownCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "group-hover:border-emerald-200",
    },
    {
      title: "Export with Confidence",
      description:
        "Delivering India’s finest rice, pulses, spices, and grains to global destinations.",
      icon: ArrowUpCircle,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "group-hover:border-blue-200",
    },
    {
      title: "Certified Quality",
      description:
        "Every batch undergoes strict inspections to meet international quality and safety standards.",
      icon: Package,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "group-hover:border-purple-200",
    },
    {
      title: "Global Reach",
      description:
        "Serving importers and distributors across Asia, the Middle East, Europe, and beyond.",
      icon: Globe,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "group-hover:border-orange-200",
    },
  ];

  return (
    <section className="relative bg-white py-20 sm:py-24 overflow-hidden">
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

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
              Simplifying Global Trade, <br />
              <span className="text-primary">One Shipment at a Time</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At MRPGlobal Traders, we make importing and exporting effortless.
              Whether you're sourcing fresh produce or distributing Indian
              staples worldwide, our trusted logistics and quality-first
              approach ensure a smooth experience from farm to market.
            </p>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center ${feature.border}`}
            >
              <div
                className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
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
      </div>
    </section>
  );
};

export default ImportExportSection;
