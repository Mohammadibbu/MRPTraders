import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  ChevronRight,
  Shield,
  Lock,
  Eye,
  Share2,
  FileText,
  Mail,
} from "lucide-react";
import JoinUsSection from "../../components/Home/JoinUsSection";
import { contactDetails } from "../../utils/ContactDetails";

const PrivacyPolicy: React.FC = () => {
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
          MRP GLOBAL Traders ("we", "our", or "us") is committed to protecting
          your privacy. This Privacy Policy explains how we collect, use, store,
          and safeguard your personal data when you interact with our website or
          engage with us directly.
        </p>
      ),
    },
    {
      title: "Information We Collect",
      icon: Eye,
      content: (
        <>
          <p className="mb-4">
            We may collect the following information to provide better services:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Full name, email address, and phone number</li>
            <li>Business name, address, and type of service</li>
            <li>Details of inquiries, quotes, or trade transactions</li>
            <li>
              Browser data such as IP address, location, and device type (via
              cookies)
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "How We Use Your Information",
      icon: Shield,
      content: (
        <ul className="list-disc list-inside space-y-2 ml-2">
          <li>Respond to trade inquiries and provide customer support</li>
          <li>Process and fulfill export orders and logistics</li>
          <li>Improve website performance and user experience</li>
          <li>Meet legal, regulatory, or compliance obligations</li>
          <li>
            Send updates regarding our products or services (you may opt-out
            anytime)
          </li>
        </ul>
      ),
    },
    {
      title: "Sharing of Information",
      icon: Share2,
      content: (
        <>
          <p className="mb-4">
            We do not sell or rent your personal data. We may share data only
            with trusted third-party partners when essential for:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Shipping and logistics services (to deliver goods)</li>
            <li>Payment gateways or financial processors</li>
            <li>Compliance with government regulations or legal requests</li>
          </ul>
        </>
      ),
    },
    {
      title: "Data Security",
      icon: Lock,
      content: (
        <p>
          We apply industry-standard measures to safeguard your information from
          unauthorized access, misuse, alteration, or loss. This includes
          encryption (SSL), secure servers, and strict access control mechanisms
          for our internal teams.
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
            <span className="text-gray-900 font-semibold">Privacy Policy</span>
          </nav>
        </div>
      </div>

      {/* --- Hero Section --- */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-gray-900">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/Images/Legal/privacypolicybanner.jpg"
            alt="Privacy Policy Background"
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
            Privacy <span className="text-primary">Policy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Transparency is our core value. Learn how we collect, use, and
            protect your information.
          </motion.p>
        </div>
      </section>

      {/* --- Main Content --- */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 -mt-20 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 sm:p-12 lg:p-16 space-y-16">
            {/* Last Updated Note */}
            <div className="text-sm text-gray-500 border-b border-gray-100 pb-8 mb-8">
              <span className="font-semibold text-gray-900">Last Updated:</span>{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>

            {/* Policy Sections */}
            {sections.map((section, index) => (
              <motion.section
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-0 sm:pl-8 border-l-2 border-transparent sm:border-gray-100 hover:border-primary/30 transition-colors duration-300"
              >
                {/* Icon for Desktop (Absolute positioning on the line) */}
                <div className="hidden sm:flex absolute -left-[21px] top-0 w-10 h-10 bg-white border border-gray-200 rounded-full items-center justify-center text-primary shadow-sm">
                  <section.icon className="w-5 h-5" />
                </div>

                {/* Mobile Icon (Inline) */}
                <div className="flex items-center gap-3 mb-4 sm:hidden">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <section.icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>

                {/* Desktop Title */}
                <h2 className="hidden sm:block text-2xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h2>

                <div className="text-gray-600 leading-relaxed text-base sm:text-lg">
                  {section.content}
                </div>
              </motion.section>
            ))}

            {/* Contact Section for Privacy */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-200 mt-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Contact Us regarding Privacy
              </h3>
              <p className="text-gray-600 mb-6">
                If you have any questions or concerns regarding our Privacy
                Policy, or wish to exercise your rights, please contact us:
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

export default PrivacyPolicy;
