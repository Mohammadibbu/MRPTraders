import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  ChevronRight,
  FileText,
  Globe,
  Shield,
  Package,
  CreditCard,
  Truck,
  AlertTriangle,
  Scale,
  RefreshCw,
  Mail,
} from "lucide-react";
import JoinUsSection from "../../components/Home/JoinUsSection";
import { contactDetails } from "../../utils/ContactDetails";

const TermsAndConditions: React.FC = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "Introduction",
      icon: FileText,
      content: (
        <p>
          These Terms & Conditions govern your use of the MRP GLOBAL Traders
          website and services. By accessing or using our website, you agree to
          comply with these terms in full. If you disagree with any part of
          these terms, you must not use our website.
        </p>
      ),
    },
    {
      title: "Use of Website",
      icon: Globe,
      content: (
        <p>
          You agree to use our website only for lawful purposes and in a way
          that does not infringe upon the rights of others or restrict their
          use. We reserve the right to restrict or terminate your access if we
          believe your actions violate any laws or our terms.
        </p>
      ),
    },
    {
      title: "Intellectual Property",
      icon: Shield,
      content: (
        <p>
          All content on this site, including text, images, logos, branding, and
          product descriptions, are the property of MRP GLOBAL Traders unless
          otherwise stated. Unauthorized use, reproduction, or distribution is
          strictly prohibited without prior written consent.
        </p>
      ),
    },
    {
      title: "Product Information",
      icon: Package,
      content: (
        <p>
          We strive to provide accurate and up-to-date product information.
          However, availability, specifications, and pricing may be subject to
          change without notice due to market fluctuations or seasonal
          availability.
        </p>
      ),
    },
    {
      title: "Orders & Payment",
      icon: CreditCard,
      content: (
        <p>
          All orders are subject to acceptance and availability. Payment terms
          and conditions will be outlined in your specific invoice or purchase
          agreement. MRP GLOBAL Traders reserves the right to cancel or decline
          any order at its discretion.
        </p>
      ),
    },
    {
      title: "Shipping & Delivery",
      icon: Truck,
      content: (
        <p>
          We aim to fulfill and ship orders within agreed timelines. However, we
          are not liable for delays caused by customs inspections,
          transportation issues, force majeure, or events beyond our reasonable
          control.
        </p>
      ),
    },
    {
      title: "Limitation of Liability",
      icon: AlertTriangle,
      content: (
        <p>
          MRP GLOBAL Traders shall not be held liable for any indirect,
          incidental, or consequential damages arising out of the use of our
          website or services, to the fullest extent permitted by law.
        </p>
      ),
    },
    {
      title: "Governing Law",
      icon: Scale,
      content: (
        <p>
          These Terms & Conditions are governed by and construed in accordance
          with the laws of India. Any disputes shall be subject to the exclusive
          jurisdiction of the courts therein.
        </p>
      ),
    },
    {
      title: "Changes to Terms",
      icon: RefreshCw,
      content: (
        <p>
          MRP GLOBAL Traders reserves the right to update or change these Terms
          & Conditions at any time. Continued use of the site or services after
          changes are posted constitutes your agreement to the revised terms.
        </p>
      ),
    },
  ];

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
            <span className="text-gray-900 font-semibold">
              Terms & Conditions
            </span>
          </nav>
        </div>
      </div>

      {/* --- Hero Section --- */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/Images/Legal/terms&condition.jpg"
            alt="Terms Background"
            className="w-full h-full object-cover opacity-30"
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
            Terms & <span className="text-primary">Conditions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Please review the terms below before using our website or engaging
            in trade with MRPGlobal.
          </motion.p>
        </div>
      </section>

      {/* --- Main Content --- */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 -mt-20 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 sm:p-12 lg:p-16 space-y-12">
            {/* Last Updated Note */}
            <div className="text-sm text-gray-500 border-b border-gray-100 pb-8">
              <span className="font-semibold text-gray-900">Last Updated:</span>{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>

            {/* Sections */}
            {sections.map((section, index) => (
              <motion.section
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative pl-0 sm:pl-10 border-l-2 border-transparent sm:border-gray-100 hover:border-primary/30 transition-colors duration-300"
              >
                {/* Icon Bubble (Desktop) */}
                <div className="hidden sm:flex absolute -left-[21px] top-0 w-10 h-10 bg-white border border-gray-200 rounded-full items-center justify-center text-gray-400 group-hover:text-primary group-hover:border-primary/30 transition-all shadow-sm">
                  <section.icon className="w-5 h-5" />
                </div>

                {/* Mobile Title with Icon */}
                <div className="flex items-center gap-3 mb-3 sm:hidden">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <section.icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>

                {/* Desktop Title */}
                <h2 className="hidden sm:block text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {section.title}
                </h2>

                <div className="text-gray-600 leading-relaxed text-base">
                  {section.content}
                </div>
              </motion.section>
            ))}

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-200 mt-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Questions about our Terms?
              </h3>
              <p className="text-gray-600 mb-6">
                If you have any questions or need clarification regarding these
                Terms & Conditions, please feel free to reach out:
              </p>

              <a
                href={`mailto:${contactDetails.email}`}
                className="inline-flex text-xs sm:text-sm items-center font-semibold text-primary hover:text-primary-dark hover:underline transition-all"
              >
                {contactDetails.email}
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <JoinUsSection />
    </div>
  );
};

export default TermsAndConditions;
