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
import { Helmet } from "react-helmet-async";

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
    <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-primary/20 overflow-x-hidden">
      <Helmet>
        <title>Terms & Conditions | MRP Global Traders</title>
        <meta
          name="description"
          content="Review the official Terms and Conditions for MRP Global Traders. Understand the legal framework governing our agricultural trade services, website use, and global export agreements."
        />
        <link
          rel="canonical"
          href="https://mrpglobaltraders.com/terms-and-conditions"
        />
        <meta
          property="og:title"
          content="Terms & Conditions - MRP Global Traders"
        />
        <meta
          property="og:description"
          content="Legal terms and trade guidelines for engaging with MRP Global Traders. Please review before using our export services."
        />
      </Helmet>
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
      <section className="relative h-[30vh] md:h-[40vh] min-h-[280px] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="/Images/Legal/terms&condition.jpg"
            alt="Terms Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/20 to-gray-900/90" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight"
          >
            Terms & <span className="text-primary">Conditions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-xl text-gray-200 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Please review the terms below before using our website or engaging
            in trade with MRPGlobal.
          </motion.p>
        </div>
      </section>

      {/* --- Main Content --- */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-24 -mt-10 md:-mt-20 relative z-20">
        <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-12 lg:p-16 space-y-10 md:space-y-16">
            {/* Last Updated Note */}
            <div className="text-xs md:text-sm text-gray-500 border-b border-gray-100 pb-6 mb-6">
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
                className="group relative pl-0 sm:pl-10 sm:border-l-2 sm:border-gray-100 hover:border-primary/30 transition-colors duration-300"
              >
                {/* Icon Bubble (Desktop) */}
                <div className="hidden sm:flex absolute -left-[21px] top-0 w-10 h-10 bg-white border border-gray-200 rounded-full items-center justify-center text-gray-400 group-hover:text-primary group-hover:border-primary/30 transition-all shadow-sm">
                  <section.icon className="w-5 h-5" />
                </div>

                {/* Mobile Title with Icon */}
                <div className="flex items-center gap-3 mb-3 sm:mb-0">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary sm:hidden shrink-0">
                    <section.icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {section.title}
                  </h2>
                </div>

                <div className="text-gray-600 leading-relaxed text-sm md:text-base mt-2 md:mt-4">
                  {section.content}
                </div>
              </motion.section>
            ))}

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-5 md:p-8 border border-gray-200 mt-8"
            >
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                Questions about our Terms?
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-6">
                If you have any questions or need clarification regarding these
                Terms & Conditions, please reach out:
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {Array.isArray(contactDetails.email) ? (
                  contactDetails.email.map((email: string) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="text-xs md:text-sm font-semibold text-primary hover:text-primary-dark hover:underline break-all"
                    >
                      {email}
                    </a>
                  ))
                ) : (
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="text-xs md:text-sm font-semibold text-primary hover:text-primary-dark hover:underline break-all"
                  >
                    {contactDetails.email}
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <JoinUsSection />
    </div>
  );
};

export default TermsAndConditions;
