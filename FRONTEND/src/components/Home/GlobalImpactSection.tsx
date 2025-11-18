import React from "react";
import { Users, TrendingUp, Globe, Heart } from "lucide-react";
import { motion } from "framer-motion";

const GlobalImpactSection: React.FC = () => {
  const stats = [
    {
      id: 1,
      label: "Partner Farmers",
      value: "500+",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      id: 2,
      label: "Countries Served",
      value: "50+",
      icon: Globe,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      id: 3,
      label: "Successful Trades",
      value: "1000+",
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      id: 4,
      label: "Customer Satisfaction",
      value: "99%",
      icon: Heart,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
  ];

  return (
    <section className="relative bg-white py-20 sm:py-24 overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#4F46E5_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* --- Left Column: Image --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            {/* Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-200 border border-gray-100">
              <div className="relative aspect-[4/3] bg-gray-100">
                <img
                  src="/Images/HomePageImages/Globalimpact.png"
                  alt="Global Impact and Sustainable Trade"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Gradient Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Floating Badge (Optional Decorative Element) */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex bg-white p-4 rounded-2xl shadow-xl border border-gray-100 items-center gap-3 z-10">
              <div className="bg-blue-50 p-2.5 rounded-full">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Global Network
                </p>
                <p className="text-sm font-bold text-gray-900">
                  Expanding Daily
                </p>
              </div>
            </div>
          </motion.div>

          {/* --- Right Column: Content & Stats --- */}
          <div className="order-1 lg:order-2">
            {/* Header Section */}
            <div className="text-left mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                  Bridging Borders, <br className="hidden sm:block" />
                  <span className="text-primary">Empowering Communities</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  At MRPGlobal Traders, we connect local farmers with
                  international markets, fostering sustainable growth and
                  economic empowerment. Our platform supports agricultural
                  communities worldwide, enabling them to thrive in the global
                  economy.
                </p>
              </motion.div>
            </div>

            {/* Stats Grid (2x2 Layout for Side Column) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex items-center gap-4 group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0`}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalImpactSection;
