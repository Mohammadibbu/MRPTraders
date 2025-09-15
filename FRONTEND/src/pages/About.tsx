import React from "react";
import { Award, Users, Globe, Shield, Truck, Heart } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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
      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="absolute top-0 inset-0 bg-gradient-to-b from-secondarylight/40 via-transparent to-primary z-10">
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>
        <img
          src="https://www.shutterstock.com/shutterstock/videos/1086445067/thumb/8.jpg?ip=x480"
          className="absolute top-0 z-4 object-cover w-full h-full blur-sm "
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
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                MRPGlobal Traders is a full-fledged digital platform designed to
                connect local farmers and suppliers with international buyers.
                We specialize in high-quality fruits like rambutan, mangosteen,
                durian, and food products such as pulses, rice, and wheat.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our platform streamlines the import and export process, making
                it more transparent, efficient, and accessible for all
                stakeholders in the global food trade industry.
              </p>
              <p className="text-lg text-gray-600">
                We are committed to quality, sustainability, and fair trade
                practices that benefit both farmers and buyers worldwide.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4397923/pexels-photo-4397923.jpeg"
                alt="About us"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We believe in empowering local agriculture by providing farmers with
            access to global markets, ensuring high-quality products are sourced
            and delivered to businesses worldwide. We aim to streamline the
            import and export process, making it more transparent, efficient,
            and accessible.
          </p>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg"
                alt="Certifications"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Certifications
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We are ISO certified, FSSAI approved, and offer organic products
                to our customers. Our commitment to quality is reflected in
                every transaction and product we offer.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 text-center"
                  >
                    <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Network Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Network</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">
            Are you a farmer or supplier? Join our platform today to start
            importing and exporting high-quality products globally. Sign up to
            access a world of opportunities.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center space-x-2 bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
          >
            <span>Join Now</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from sourcing to
              delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-gradient-to-br from-primary to-[#CCBBAE] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Partner Farmers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-gray-600">Successful Shipments</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">99%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
