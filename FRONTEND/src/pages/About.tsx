import React from "react";
import { Link } from "react-router-dom";
import {
  Award,
  Users,
  Globe,
  Shield,
  Heart,
  CheckCircle2,
  Home,
  ChevronRight,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async"; // Added SEO Provider
import JoinUsSection from "../components/Home/JoinUsSection";
import ImageWithLoader from "../utils/imageLoader";
import { contactDetails } from "../utils/ContactDetails"; // Added for Email array logic

const certifications = [
  {
    name: "ISO 22000",
    description:
      "Certified Food Safety Management Systems ensuring top-tier quality control.",
    icon: Shield,
  },
  {
    name: "FSSAI",
    description:
      "Full compliance with India's Food Safety and Standards Authority regulations.",
    icon: CheckCircle2,
  },
  {
    name: "Organic Certified",
    description:
      "Guaranteed chemical-free products, promoting health and environmental safety.",
    icon: Heart,
  },
  {
    name: "HACCP",
    description:
      "Hazard Analysis and Critical Control Points certified for risk-free processing.",
    icon: Award,
  },
];

const values = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description:
      "All our products undergo strict quality control, ensuring compliance with global food safety standards.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "We bridge the gap between local producers and international markets through efficient logistics.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Users,
    title: "Fair Trade",
    description:
      "We empower farmers and producers with ethical sourcing, fair compensation, and transparent practices.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: Heart,
    title: "Sustainability",
    description:
      "Our operations support eco-friendly agriculture, responsible packaging, and long-term community growth.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary/20 overflow-x-hidden">
      {/* SEO Section */}
      <Helmet>
        <title>
          About Us | MRP Global Traders - Leading Export Trading House
        </title>
        <meta
          name="description"
          content="Learn about MRP Global Traders, your trusted partner in global agricultural trade. Committed to quality, fair trade, and sustainable sourcing of premium Indian produce."
        />
        <link rel="canonical" href="https://mrpglobaltraders.com/about" />
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
            <span className="text-gray-900 font-semibold">About Us</span>
          </nav>
        </div>
      </div>

      {/* --- Hero Section --- */}
      <section className="relative h-[40vh] md:h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Images/AboutPage/Hero.png"
            alt="About MRPGlobal"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight"
          >
            Cultivating{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500">
              Trust
            </span>
            , <br /> Delivering Excellence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-xl text-gray-200 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Connecting nature’s finest with the world — sustainably, ethically,
            and efficiently.
          </motion.p>
        </div>
      </section>

      {/* --- Who We Are Section --- */}
      <section className="py-16 md:py-24 px-6 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_1px_12px_0_rgba(0,0,0,0.1)]" />
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-bold uppercase tracking-wider mb-6">
              Who We Are
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              Global Leaders in <br />{" "}
              <span className="text-primary">Agricultural Trade</span>
            </h2>
            <div className="space-y-4 md:space-y-6 text-sm md:text-lg text-gray-600 leading-relaxed">
              <p>
                MRP GLOBAL Traders is a forward-thinking export company
                dedicated to delivering high-quality, natural agricultural
                products to global markets. We partner directly with local
                farmers across Asia to ensure product integrity.
              </p>
              <p>
                Our goal is simple — to create a seamless, trustworthy supply
                chain that benefits both producers and global buyers while
                promoting sustainability and transparency at every step.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 md:border-[8px] border-white z-10">
              <ImageWithLoader
                src="/Images/AboutPage/about1.png"
                alt="Our Mission"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 md:w-64 md:h-64 bg-primary/10 rounded-full blur-3xl -z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 md:w-64 md:h-64 bg-emerald-500/10 rounded-full blur-3xl -z-0"></div>
          </motion.div>
        </div>
      </section>

      {/* --- Core Values Grid --- */}
      <section className="bg-gray-50 py-16 md:py-24 relative">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_1px_12px_0_rgba(0,0,0,0.1)]" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4"
            >
              Our Core Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto"
            >
              The principles that guide our mission to build a better, more
              ethical, and sustainable trade ecosystem.
            </motion.p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${value.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <value.icon
                    className={`w-6 h-6 md:w-7 md:h-7 ${value.color}`}
                  />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- Certifications Section --- */}
      <section className="relative py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_1px_12px_0_rgba(0,0,0,0.1)]" />
        <div className="bg-[#1A1C23] rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>

          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6">
                Certified Excellence
              </h2>
              <p className="text-sm md:text-lg text-gray-300 mb-8 md:mb-10 leading-relaxed">
                We take quality and safety seriously. MRP GLOBAL Traders is
                certified and compliant with international standards.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="bg-primary/20 p-2 rounded-lg shrink-0">
                      <cert.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">
                        {cert.name}
                      </h4>
                      <p className="text-gray-400 text-[10px] md:text-xs mt-1 leading-snug">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-64 md:h-full min-h-[300px] lg:min-h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <ImageWithLoader
                src="/Images/AboutPage/about2.png"
                alt="Certifications"
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic Email Section */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200 text-center sm:text-left"
        >
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center justify-center sm:justify-start gap-2">
            <Mail className="w-5 h-5 text-primary" /> Questions about our
            Mission?
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            Reach out to our trade experts directly for compliance or
            partnership details:
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            {Array.isArray(contactDetails.email) ? (
              contactDetails.email.map((email) => (
                <a
                  key={email}
                  href={`mailto:${email}`}
                  className="text-xs md:text-sm font-semibold text-primary hover:underline break-all"
                >
                  {email}
                </a>
              ))
            ) : (
              <a
                href={`mailto:${contactDetails.email}`}
                className="text-xs md:text-sm font-semibold text-primary hover:underline break-all"
              >
                {contactDetails.email}
              </a>
            )}
          </div>
        </motion.div>
      </div>

      <JoinUsSection />
    </div>
  );
};

export default About;
