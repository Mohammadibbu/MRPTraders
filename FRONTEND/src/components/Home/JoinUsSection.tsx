import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  Globe,
  TrendingUp,
  CheckCircle2,
  Sprout,
} from "lucide-react";
import { motion } from "framer-motion";

const JoinUsSection: React.FC = () => {
  const cards = [
    {
      icon: Users,
      title: "Empower Farmers",
      description:
        "Gain direct access to international markets, ensuring fair trade and sustainable value for your harvest.",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "group-hover:border-emerald-500/50",
    },
    {
      icon: Globe,
      title: "Support Businesses",
      description:
        "Source certified, high-quality agricultural products directly from trusted origins with transparent logistics.",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "group-hover:border-blue-500/50",
    },
    {
      icon: TrendingUp,
      title: "Grow With Us",
      description:
        "Join a dynamic network of partners driving ethical, scalable, and technology-driven global trade.",
      color: "text-purple-400",
      bg: "bg-dustyTaupe/10",
      border: "group-hover:border-dustyTaupe/50",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Connect",
      desc: "Register your interest and profile.",
    },
    {
      step: "02",
      title: "Verify",
      desc: "We validate quality and compliance.",
    },
    {
      step: "03",
      title: "Trade",
      desc: "Access global markets instantly.",
    },
    {
      step: "04",
      title: "Scale",
      desc: "Grow with our logistics network.",
    },
  ];

  return (
    <section className="relative bg-secondaryDark py-24 overflow-hidden">
      {/* ================= BACKGROUND ELEMENTS ================= */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_1px_12px_0_rgba(0,0,0,0.1)]" />
      {/* 1. Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* 2. Animated Blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-dustyTaupe/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none"
      />

      {/* 3. Giant Watermark */}
      <div className="absolute top-56 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-white/[0.02] pointer-events-none select-none tracking-tighter whitespace-nowrap">
        GROW TOGETHER
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-gray-300 text-xs font-bold uppercase tracking-wider mb-6 border border-white/10">
              <Sprout className="w-3 h-3 text-primary" /> Ecosystem
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Partner With <span className="text-primary ">MRPGlobal</span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Whether you're a grower, supplier, or business leader — we're here
              to help you scale globally. Tap into reliable trade networks,
              premium markets, and long-term growth opportunities.
            </p>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-3xl p-8 hover:bg-white/[0.06] transition-all duration-500 group hover:-translate-y-2 ${card.border}`}
            >
              {/* Hover Gradient Border Effect */}
              <div
                className={`absolute inset-0 rounded-3xl border-2 border-transparent ${card.border} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              ></div>

              <div
                className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ring-1 ring-white/10`}
              >
                <card.icon className={`h-7 w-7 ${card.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* NEW SECTION: How it works (Visual Timeline) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative pt-20 mb-20"
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent shadow-[0_1px_12px_0_rgba(0,0,0,0.1)]" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-4">
            <div className="max-w-xs">
              <h3 className="text-2xl font-bold text-white mb-2">
                Simple Onboarding
              </h3>
              <p className="text-sm text-gray-400">
                Your journey to global trade in four simple steps.
              </p>
            </div>

            {/* Steps Visual */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
              {steps.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Connector Line (Desktop) */}
                  {idx !== steps.length - 1 && (
                    <div className="hidden md:block absolute top-4 left-1/2 w-full h-px bg-gradient-to-r from-white/20 to-transparent -z-10"></div>
                  )}

                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold border border-primary/30 group-hover:bg-primary group-hover:text-white transition-colors">
                      {item.step}
                    </div>
                    <span className="text-sm font-bold text-white">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 pl-11 group-hover:text-gray-400 transition-colors">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-primary via-dustyTaupe to-primary bg-[length:200%_auto] animate-gradient">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-3 bg-[#0B1120] text-white px-10 py-5 rounded-full font-bold hover:bg-white/10 transition-all duration-300 backface-hidden"
            >
              <span>Let’s Start the Conversation</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" /> No setup fees
            required to enquire
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinUsSection;
