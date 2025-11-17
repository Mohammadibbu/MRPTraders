import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Globe,
} from "lucide-react";
import logo from "../../assets/images/logo.png";
import { companyDetails, contactDetails } from "../../utils/ContactDetails";
const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-secondaryDark text-secondarylight overflow-hidden">
      {/* Animated gradient border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondarylight to-transparent animate-shimmer"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-secondarylight/10 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6 group">
            <div className="flex items-center space-x-3 animate-float">
              <div className="relative">
                <img
                  src={logo}
                  alt="MRPGlobal Logo"
                  className="h-24 w-24 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-secondarylight via-secondarylight to-secondarylight bg-clip-text text-transparent animate-shimmer">
                  MRPGlobal Traders
                </h2>
                <div className="flex items-center space-x-1 mt-1">
                  <Globe className="h-3 w-3 text-secondarylight animate-pulse-slow" />
                  <span className="text-xs text-secondarylight font-medium">
                    Global Food & Fruit Exporters
                  </span>
                </div>
              </div>
            </div>

            <p className="text-secondarylight text-sm leading-relaxed">
              Bridging farmers and suppliers with international markets,
              delivering fresh, premium quality fruits and food products
              worldwide.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              {[
                {
                  icon: Facebook,
                  href: contactDetails?.facebook || "",
                  label: "Facebook",
                },
                {
                  icon: Instagram,
                  href: contactDetails?.instagram || "",
                  label: "Instagram",
                },
                {
                  icon: Linkedin,
                  href: contactDetails?.linkedin || "",
                  label: "LinkedIn",
                },
              ].map(({ icon: Icon, href, label }, index) => (
                <a
                  key={label}
                  href={href?.toString()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2 text-secondarylight hover:text-secondarya transition-all duration-300 hover:scale-110 transform"
                  aria-label={label}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-secondarylight/20 to-secondary/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <Icon className="h-5 w-5 relative z-10 group-hover:animate-bounce-slow" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-secondarylight p-2 relative group">
              <span className="relative z-10">Quick Links</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondarylight/10 to-transparent rounded-lg"></div>
            </h3>
            <div className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/products", label: "Our Products" },

                { to: "/contact", label: "Contact Us" },
              ].map(({ to, label }, index) => (
                <Link
                  key={label}
                  to={to}
                  className="group flex items-center space-x-2 text-secondarylight hover:text-secondary transition-all duration-300 animate-shimmer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-2 h-1 bg-secondarylight rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Legal & Support */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-secondarylight p-2 relative group">
              <span className="relative z-10">Legal & Support</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondarylight/10 to-transparent rounded-lg transition-transform duration-300"></div>
            </h3>
            <div className="space-y-3">
              {[
                { to: "/privacy-policy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms & Conditions" },
                { to: "/faq", label: "FAQ" },
                { to: "/contact", label: "Contact Us" },
              ].map(({ to, label }, index) => (
                <Link
                  key={label}
                  to={to}
                  className="group flex items-center space-x-2 text-secondarylight hover:text-secondary transition-all duration-300 animate-shimmer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-2 h-1 bg-secondarylight rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold p-2 text-secondarylight relative group">
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondarylight/10 to-transparent rounded-lg transition-transform duration-300"></div>
            </h3>
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  text: contactDetails.mail,
                },
                {
                  icon: Phone,
                  text: contactDetails.phoneNumber
                    ?.replace(/^(\+\d{2})(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3 $4")
                    .trim(),
                },
                {
                  icon: MapPin,
                  text: contactDetails.location,
                },
              ].map(({ icon: Icon, text }, index) => (
                <span
                  key={text}
                  className="group flex items-start space-x-3 text-secondarylight hover:text-secondary transition-all duration-300"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative mt-0.5">
                    <Icon className="h-5 w-5 text-secondarylight" />
                    <div className="absolute inset-0 bg-gradient-to-r from-secondarylight/20 to-secondary/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
                  </div>
                  <span className="text-sm leading-relaxed group-hover:translate-x-1 transition-transform duration-300">
                    {text}
                  </span>
                </span>
              ))}
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group mt-6 flex items-center space-x-2 text-secondarylight hover:text-secondarylight transition-all duration-300 hover:scale-105 transform"
            >
              <div className="relative p-2 bg-secondarylight/10 rounded-full group-hover:bg-secondarylight/20 transition-colors duration-300">
                <ArrowUp className="h-4 w-4 group-hover:animate-bounce-slow" />
              </div>
              <span className="text-sm font-medium">Back to Top</span>
            </button>
          </div>
        </div>
        <div className="flex space-x-5 text-sm justify-between m-3 p-3 text-secondarylight">
          <span>GSTIN : {companyDetails.GSTN}</span>

          <span>FSSAI CERTIFICATE NUMBER : {companyDetails.FSSAI}</span>
        </div>
        {/* Bottom Section */}
        <div className="relative mt-16 pt-8">
          {/* Animated divider */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-secondarylight/50 to-transparent animate-shimmer"></div>

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-secondarylight text-sm">
                &copy; {new Date().getFullYear()}{" "}
                <span className="font-semibold text-secondarylight">
                  MRPGlobal Traders
                </span>
                . All rights reserved.
              </p>
              <p className="text-secondarylight/80 text-xs mt-1">
                Connecting the world through fresh, quality food products.
              </p>
            </div>

            <div className="flex items-center space-x-4 text-xs text-secondarylight/80">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></div>
                <span>Global Network, Trusted Service</span>
              </span>
              <span>|</span>
              <span>Committed to Quality & Freshness</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-secondarylight to-transparent animate-pulse-slow"></div>
    </footer>
  );
};

export default Footer;
