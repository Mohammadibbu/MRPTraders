import React from "react";
import { Award, Users, Globe, Shield, Heart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Animation from "../utils/Animation";
import JoinUsSection from "../components/Home/JoinUsSection";

const certifications = [
  {
    name: "ISO 22000",
    description: "Certified Food Safety Management Systems",
  },
  {
    name: "FSSAI",
    description: "Compliance with India's Food Safety Standards",
  },
  {
    name: "Organic",
    description: "Certified Organic Products – No Chemicals or Additives",
  },
  {
    name: "HACCP",
    description: "Hazard Analysis and Critical Control Points Certified",
  },
];

const values = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description:
      "All our products undergo strict quality control, ensuring compliance with global food safety standards.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "We bridge the gap between local producers and international markets through efficient logistics and trade expertise.",
  },
  {
    icon: Users,
    title: "Fair Trade",
    description:
      "We empower farmers and producers with ethical sourcing, fair compensation, and transparent practices.",
  },
  {
    icon: Heart,
    title: "Sustainability",
    description:
      "Our operations support eco-friendly agriculture, responsible packaging, and long-term community growth.",
  },
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      <AnimatePresence>
        <section className="py-20 relative">
          <div className="absolute top-0 inset-0 bg-gradient-to-b from-secondarylight/40 via-transparent to-primary z-10">
            <div className="absolute inset-0 bg-black opacity-30" />
          </div>
          <img
            src="/Images/AboutPage/Hero.png"
            alt="Background"
            className="absolute top-0 z-4 object-cover w-full h-full blur-sm"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-[11]">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Connecting nature’s finest with the world — sustainably,
              ethically, and efficiently.
            </p>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-14 px-5 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <Animation initialY={-100}>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Who We Are
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    MRP GLOBAL Traders is a forward-thinking export company
                    dedicated to delivering high-quality, natural agricultural
                    products to global markets. We partner directly with local
                    farmers, cooperatives, and certified producers across Asia
                    to ensure product integrity, ethical sourcing, and full
                    traceability from origin to destination.
                  </p>
                  <p className="text-lg text-gray-600">
                    Our goal is simple — to create a seamless, trustworthy
                    supply chain that benefits both producers and global buyers
                    while promoting sustainability and transparency at every
                    step.
                  </p>
                </div>
              </Animation>
              <Animation initialX={100}>
                <div className="relative">
                  <img
                    src="/Images/AboutPage/about1.png"
                    alt="Our Mission"
                    className="w-3/4"
                  />
                </div>
              </Animation>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-14 px-5 bg-secondarylight">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2  gap-12 items-center">
              <Animation initialX={-100}>
                <div className="relative">
                  <img
                    src="/Images/AboutPage/about2.png"
                    alt="Certifications"
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </Animation>
              <div>
                <Animation initialY={-100}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Certifications & Standards
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    We take quality and safety seriously. MRP GLOBAL Traders is
                    certified and compliant with international standards,
                    assuring our clients of consistently safe, pure, and
                    high-quality products.
                  </p>
                </Animation>
                <div className="grid grid-cols-2 gap-4">
                  {certifications.map((cert, index) => (
                    <Animation initialX={100} key={index}>
                      <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {cert.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {cert.description}
                        </p>
                      </div>
                    </Animation>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-14 px-5 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Animation initialX={100}>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Core Values
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  These values guide our mission to build a better, more
                  ethical, and sustainable trade ecosystem.
                </p>
              </div>
            </Animation>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Animation initialY={100} delay={0.2 * index} key={index}>
                    <div className="text-center group">
                      <div className="bg-gradient-to-br from-primary to-[#CCBBAE] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </Animation>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatePresence>
      <JoinUsSection />
    </div>
  );
};

export default About;
