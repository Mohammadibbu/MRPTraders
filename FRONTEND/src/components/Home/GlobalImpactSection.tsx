import React from "react";
import { Users, TrendingUp, Globe, Heart, ArrowDown } from "lucide-react";
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
      border: "border-blue-100",
    },
    {
      id: 2,
      label: "Countries Served",
      value: "50+",
      icon: Globe,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      id: 3,
      label: "Successful Trades",
      value: "1000+",
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
    },
    {
      id: 4,
      label: "Customer Satisfaction",
      value: "99%",
      icon: Heart,
      color: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-100",
    },
  ];

  return (
    <section className="relative bg-white pt-16 pb-20 sm:pt-20 sm:pb-32 overflow-hidden">
      {/* ================= DECORATIVE DIVIDER ================= */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_1px_12px_0_rgba(0,0,0,0.1)]" />

      {/* ================= BACKGROUND ELEMENTS ================= */}

      {/* 1. World Map Watermark (Fills empty space) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 2000 1001"
          className="w-[150%] sm:w-[90%] fill-gray-900"
        >
          <path d="M1775 225l-10 15-20 5-35-5-12 10-25 5-10 20h-25l-10 15-20 10-30-10-15 10-20-5-15 10-20-5-10 15h-20l-20 20h-15l-15 10-20 5-5 10h-10l-10 10-30 10-15 15-20 10h-20l-10 10h-40l-15 20-20 10-20-10h-20l-10 10h-50l-30 10H900l-20 10-30-10h-40l-20-10-10-15-25-10h-15l-20-10-10 10-25-10h-40l-20-15-5-15-20-10-10-20-20-10-25 5-10-15-30-15-10-15-10-40-20-30v-80l10-30 20-25 10-20 40-20 20-20 20-10h30l20-10 40-10h50l30 10 20-10h30l50 10h30l40-10h25l30 10h30l20 10 20-10h40l40 10h40l30 10 20 20 30 10h50l20 10 30 30 10 20 20 20 10 20 10 50-10 30z" />
        </svg>
      </div>

      {/* 2. Floating Particles (Animated) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/4 left-10 w-3 h-3 bg-blue-500/20 rounded-full blur-[2px]"
        />
        <motion.div
          animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/3 right-10 w-4 h-4 bg-emerald-500/20 rounded-full blur-[2px]"
        />
        <motion.div
          animate={{ x: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute top-10 right-1/3 w-2 h-2 bg-purple-500/20 rounded-full blur-[1px]"
        />
      </div>

      {/* 3. Ambient Glows */}
      <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[20rem] h-[20rem] bg-blue-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* --- Left Column: Image Stack --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            {/* Main Image Card */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200/50 border border-white/50">
              <div className="relative aspect-[4/3.2] bg-gray-100 group">
                <img
                  src="/Images/HomePageImages/Globalimpact.png"
                  alt="Global Impact"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -right-4 sm:-right-10 hidden sm:flex bg-white p-4 pr-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 items-center gap-4 z-10 backdrop-blur-sm bg-white/95"
            >
              <div className="bg-blue-50 p-3 rounded-full">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">
                  Network
                </p>
                <p className="text-sm font-bold text-gray-900 whitespace-nowrap">
                  Expanding Daily
                </p>
              </div>
            </motion.div>

            {/* Decorative Dots behind image */}
            <div className="absolute -top-8 -left-8 grid grid-cols-3 gap-2 opacity-20">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                ></div>
              ))}
            </div>
          </motion.div>

          {/* --- Right Column: Content & Stats --- */}
          <div className="order-1 lg:order-2">
            {/* Header */}
            <div className="text-left mb-10 sm:mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                  <TrendingUp className="w-3 h-3" /> Our Impact
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-[1.15]">
                  Bridging Borders, <br className="hidden lg:block" />
                  <span className="text-primary ">Empowering Lives</span>
                </h2>
                <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
                  At MRPGlobal Traders, we connect local farmers with
                  international markets, fostering sustainable growth. Our
                  platform supports communities worldwide, enabling them to
                  thrive in the global economy.
                </p>
              </motion.div>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white rounded-2xl p-4 sm:p-5 shadow-sm border ${stat.border} hover:shadow-md hover:scale-[1.02] transition-all duration-300 flex items-center gap-4 group`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shrink-0`}
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 tracking-tight leading-none mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Mobile Only: Small CTA or indicator
            <div className="mt-8 flex lg:hidden items-center gap-2 text-sm text-primary font-medium cursor-pointer hover:gap-3 transition-all">
              Read our success stories{" "}
              <ArrowDown className="w-4 h-4 -rotate-90" />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalImpactSection;
