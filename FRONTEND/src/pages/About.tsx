// src/pages/About.tsx
import React from "react";
import { Award, Users, Globe, Shield, Heart } from "lucide-react";
// import { ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Animation from "../utils/Animation"; // Import the Animation component

const About: React.FC = () => {
  const certifications = [
    { name: "ISO 22000", description: "Food Safety Management" },
    { name: "FSSAI", description: "Food Safety Standards Authority" },
    { name: "Organic", description: "Certified Organic Products" },
    { name: "HACCP", description: "Hazard Analysis Critical Control" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description:
        "Every product meets international quality standards with rigorous testing and certification.",
    },
    {
      icon: Globe,
      title: "Global Network",
      description:
        "Connecting farmers from Asia with buyers worldwide through our extensive trade network.",
    },
    {
      icon: Users,
      title: "Fair Trade",
      description:
        "Ensuring fair prices for farmers while delivering value to international buyers.",
    },
    {
      icon: Heart,
      title: "Sustainability",
      description:
        "Committed to sustainable farming practices and environmental responsibility.",
    },
  ];

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {/* Hero Section */}

        <section className="py-20 relative">
          <div className="absolute top-0 inset-0 bg-gradient-to-b from-secondarylight/40 via-transparent to-primary z-10">
            <div className="absolute inset-0 bg-black opacity-30"></div>
          </div>
          <img
            src="https://www.shutterstock.com/shutterstock/videos/1086445067/thumb/8.jpg?ip=x480"
            className="absolute top-0 z-4 object-cover w-full h-full blur-sm"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-[11]">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Us
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Learn more about MRPGlobal Traders and our mission to connect
              farmers with global markets.
            </p>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Animation initialY={-100}>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Who We Are
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    MRPGlobal Traders is a full-fledged digital platform
                    designed to connect local farmers and suppliers with
                    international buyers...
                  </p>
                </div>
              </Animation>
              <Animation initialX={100}>
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/4397923/pexels-photo-4397923.jpeg"
                    alt="About us"
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </Animation>
            </div>
          </div>
        </section>

        {/* Certifications Section */}

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Animation initialX={-100}>
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg"
                    alt="Certifications"
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </Animation>
              <div>
                <Animation initialY={-100}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Certifications
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    We are ISO certified, FSSAI approved, and offer organic
                    products...
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

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Animation initialX={100}>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our Core Values
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  These principles guide everything we do, from sourcing to
                  delivery.
                </p>
              </div>
            </Animation>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Animation initialY={100} delay={0.3} key={index}>
                    <div className=" text-center group">
                      <div className="bg-gradient-to-br from-primary to-[#CCBBAE] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-8 w-8 text-white" />
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
    </div>
  );
};

export default About;
