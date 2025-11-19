import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CreditCard,
  Truck,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import ImageWithLoader from "../../utils/imageLoader";

const TransactionsSection: React.FC = () => {
  const features = [
    {
      title: "Secure Payments",
      description:
        "Trusted gateways and encrypted transactions for global business.",
      icon: CreditCard,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "group-hover:border-blue-200",
    },
    {
      title: "Global Logistics",
      description:
        "Reliable shipping partners ensuring safe, on-time delivery worldwide.",
      icon: Truck,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "group-hover:border-emerald-200",
    },
    {
      title: "Buyer Protection",
      description:
        "Comprehensive safeguards to ensure a risk-free trading experience.",
      icon: ShieldCheck,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "group-hover:border-purple-200",
    },
    {
      title: "Real-time Tracking",
      description:
        "Monitor your shipments from our farms directly to your doorstep.",
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "group-hover:border-orange-200",
    },
  ];

  return (
    <section className="relative bg-white py-20 sm:py-24 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_1px_12px_0_rgba(0,0,0,0.1)]" />

      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Centered Top */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Seamless &{" "}
              <span className="text-primary">Secure Transactions</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether browsing products, placing orders, or making payments,
              MRPGlobal Traders ensures a hassle-free and secure experience.
              With multiple payment methods and integrated logistics, we
              simplify global trading for you.
            </p>
          </motion.div>
        </div>

        {/* Main Content: Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: 2x2 Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 lg:order-1">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left ${feature.border}`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Image & CTA */}
          <div className="flex flex-col items-center lg:items-start gap-8 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-gray-200 border border-gray-100"
            >
              <ImageWithLoader
                src="/Images/HomePageImages/TransactionSection.png"
                alt="Secure Global Trade Logistics"
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full flex justify-center lg:justify-start"
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-1 w-full sm:w-auto justify-center"
              >
                <span>Start Trading Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionsSection;
