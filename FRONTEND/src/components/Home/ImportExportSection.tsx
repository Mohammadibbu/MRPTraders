import React from "react";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Package,
  Globe,
  Plane,
  Ship,
} from "lucide-react";
import { motion } from "framer-motion";

const ImportExportSection: React.FC = () => {
  const features = [
    {
      id: "import",
      title: "Import Essentials",
      description:
        "Sourcing top-grade tropical fruits and specialty items from trusted global partners.",
      icon: ArrowDownCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      shadow: "hover:shadow-emerald-100",
      border: "hover:border-emerald-200",
    },
    {
      id: "export",
      title: "Export Confidence",
      description:
        "Delivering India’s finest rice, pulses, spices, and grains to global destinations.",
      icon: ArrowUpCircle,
      color: "text-blue-600",
      bg: "bg-blue-50",
      shadow: "hover:shadow-blue-100",
      border: "hover:border-blue-200",
    },
    {
      id: "quality",
      title: "Certified Quality",
      description:
        "Every batch undergoes strict inspections to meet international quality and safety standards.",
      icon: Package,
      color: "text-purple-600",
      bg: "bg-purple-50",
      shadow: "hover:shadow-purple-100",
      border: "hover:border-purple-200",
    },
    {
      id: "global",
      title: "Global Reach",
      description:
        "Serving importers and distributors across Asia, the Middle East, Europe, and beyond.",
      icon: Globe,
      color: "text-orange-600",
      bg: "bg-orange-50",
      shadow: "hover:shadow-orange-100",
      border: "hover:border-orange-200",
    },
  ];

  return (
    <section className="relative bg-gray-50/50 py-20 overflow-hidden">
      {/* ================= DECORATIVE DIVIDER ================= */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_1px_12px_0_rgba(0,0,0,0.1)]" />

      {/* ================= BACKGROUND ELEMENTS ================= */}

      {/* 1. The Supply Chain Path (Dashed Line connecting cards) */}
      {/* Hidden on mobile, visible on large screens to connect the grid */}
      <div className="absolute top-1/2 left-0 w-full h-full -translate-y-1/2 pointer-events-none opacity-10 hidden lg:block">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 400"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 C300,100 900,300 1200,200"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="10 10"
            className="text-gray-400"
          />
        </svg>
      </div>

      {/* 2. Giant Watermark Text */}
      <div className="absolute -top-0 -left-0 text-[10rem] font-black text-gray-100 pointer-events-none select-none leading-none opacity-60">
        IMPORT
      </div>
      <div className="absolute -bottom-0 -right-0 text-[10rem] font-black text-gray-100 pointer-events-none select-none leading-none opacity-60 text-right">
        EXPORT
      </div>

      {/* 3. Floating Logistics Icons (Animated) */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-10 text-gray-200 pointer-events-none"
      >
        <Plane className="w-24 h-24 opacity-20 rotate-12" />
      </motion.div>
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/3 right-20 text-gray-200 pointer-events-none"
      >
        <Ship className="w-32 h-32 opacity-20 -rotate-6" />
      </motion.div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
              <Globe className="w-3 h-3" /> Seamless Logistics
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Simplifying Global Trade, <br className="hidden sm:block" />
              <span className="text-primary relative inline-block">
                One Shipment at a Time
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At MRPGlobal Traders, we make importing and exporting effortless.
              Whether you're sourcing fresh produce or distributing Indian
              staples worldwide, our trusted logistics ensure a smooth
              experience.
            </p>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 transition-all duration-500 hover:-translate-y-2 ${feature.shadow} ${feature.border}`}
            >
              {/* Icon Blob */}
              <div className="relative mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10`}
                >
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">
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
