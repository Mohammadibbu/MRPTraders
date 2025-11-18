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
  ChevronRight,
  ShieldCheck,
  FileText,
} from "lucide-react";
import logo from "../../assets/images/logo.png";
import { companyDetails, contactDetails } from "../../utils/ContactDetails";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-secondaryDark text-white pt-20 pb-10 overflow-hidden">
      {/* Decorative Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

      {/* Background Pattern (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-gray-900 to-gray-900"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* --- Column 1: Brand Info --- */}
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <Link to="/" className="flex items-center gap-3 group w-fit">
                <div className="bg-white/5 p-2 rounded-xl group-hover:bg-white/10 transition-colors">
                  <img
                    src={logo}
                    alt="MRPGlobal Logo"
                    className="h-12 w-auto"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    MRP Global Traders
                  </h2>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">
                    Export Quality
                  </p>
                </div>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Bridging farmers and suppliers with international markets,
                delivering fresh, premium quality fruits and food products
                worldwide.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                {
                  icon: Facebook,
                  href: contactDetails.facebook ?? "#",
                  label: "Facebook",
                },
                {
                  icon: Instagram,
                  href: contactDetails.instagram ?? "#",
                  label: "Instagram",
                },
                {
                  icon: Linkedin,
                  href: contactDetails.linkedin ?? "#",
                  label: "LinkedIn",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 border border-gray-800 hover:border-primary"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* --- Column 2: Quick Links --- */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/products", label: "Our Products" },
                { to: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Column 3: Legal & Support --- */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Legal
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/privacy-policy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms & Conditions" },
                { to: "/faq", label: "FAQ" },
                { to: "/support", label: "Support Center" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Column 4: Contact Info --- */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 bg-gray-900 p-2 rounded-lg border border-gray-800">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-gray-400 leading-relaxed">
                  {contactDetails.location}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-gray-900 p-2 rounded-lg border border-gray-800">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <a
                  href={`tel:${contactDetails.phoneNumber}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {contactDetails.phoneNumber}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-gray-900 p-2 rounded-lg border border-gray-800">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors break-all"
                >
                  {contactDetails.email || contactDetails.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Footer Bottom: Certifications & Copyright --- */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Certifications */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full border border-gray-800">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-400 font-mono">
                  GSTN: {companyDetails.GSTN}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full border border-gray-800">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span className="text-xs text-gray-400 font-mono">
                  FSSAI: {companyDetails.FSSAI}
                </span>
              </div>
            </div>

            {/* Copyright & Back to Top */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <p className="text-sm text-gray-500">
                &copy; {currentYear} MRP Global Traders. All rights reserved.
              </p>
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-primary text-gray-400 hover:text-white rounded-full transition-all duration-300 text-sm font-medium"
              >
                Top
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
