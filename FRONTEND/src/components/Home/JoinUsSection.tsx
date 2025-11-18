import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Globe, TrendingUp } from "lucide-react";
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
    },
    {
      icon: Globe,
      title: "Support Businesses",
      description:
        "Source certified, high-quality agricultural products directly from trusted origins with transparent logistics.",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: TrendingUp,
      title: "Grow With Us",
      description:
        "Join a dynamic network of partners driving ethical, scalable, and technology-driven global trade.",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <section className="relative bg-gray-900 py-20 sm:py-24 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
              Partner With <span className="text-primary">MRPGlobal</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Whether you're a grower, supplier, or business leader — we're here
              to help you scale globally. Tap into reliable trade networks,
              premium markets, and long-term growth opportunities.
            </p>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 group text-left"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <card.icon className={`h-7 w-7 ${card.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {card.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {card.description}
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
            to="/contact"
            className="inline-flex items-center space-x-3 bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:-translate-y-1"
          >
            <span>Let’s Start the Conversation</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinUsSection;
