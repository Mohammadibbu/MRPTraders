import React, { useEffect } from "react";
import Accordion from "../../components/UI/Accordian";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ChevronRight, MessageCircle, Mail } from "lucide-react";
import JoinUsSection from "../../components/Home/JoinUsSection";

const FAQPage: React.FC = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-primary/20">
      {/* --- Breadcrumb Navigation --- */}
      <div className="bg-white/80 border-b sticky top-0 z-30 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <nav className="flex items-center text-sm text-gray-500 font-medium">
            <Link
              to="/"
              className="hover:text-primary transition-colors p-1 rounded-md hover:bg-gray-100"
            >
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300 shrink-0" />
            <span className="text-gray-900 font-semibold">FAQ</span>
          </nav>
        </div>
      </div>

      {/* --- Hero Section --- */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/Images/Legal/FaQ.jpg"
            alt="FAQ Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/20 to-gray-900/90" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight"
          >
            Frequently Asked <span className="text-primary">Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Find answers to common questions about our export services,
            shipping, and product quality.
          </motion.p>
        </div>
      </section>

      {/* --- Main Content --- */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 -mt-20 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {/* Using the existing Accordion component */}
          <Accordion count={10} className="bg-white" />
        </motion.div>
      </div>

      {/* --- Contact Prompt --- */}
      <section className="py-16 relative sm:py-24">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_1px_12px_0_rgba(0,0,0,0.1)]" />
        {/* 1. Subtle Grid Pattern */}
        <div className="absolute inset-1 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-blue-50 rounded-3xl p-8 sm:p-12 border border-blue-100">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-primary">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Can't find the answer you're looking for? Our team is here to
              help. Reach out to us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      <JoinUsSection />
    </div>
  );
};

export default FAQPage;
