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
    <footer className="relative bg-secondaryDark text-white pt-10 pb-8 md:pt-20 md:pb-10 overflow-hidden">
      {/* Decorative Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
      {/* ================= DECORATIVE BACKGROUND LAYERS ================= */}

      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] pointer-events-none opacity-40"></div>

      {/* 3. Giant Watermark Text (Fills large empty space on right) */}
      <div className="absolute hidden md:block top-[14rem] right-[12rem] md:right-10 md:bottom-[-4rem] font-black text-[6rem] md:text-[12rem] leading-none text-white/[0.01] pointer-events-none select-none z-0 tracking-tighter">
        MRP GLOBAL
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          {/* --- Section 1: Brand Info (Full width on mobile) --- */}
          <div className="space-y-5 lg:col-span-1">
            <div className="flex flex-col gap-4">
              <Link to="/" className="flex items-center gap-3 group w-fit">
                <div className="bg-white/5 p-2 rounded-xl group-hover:bg-white/10 transition-colors">
                  <img
                    src={logo}
                    alt="MRPGlobal Logo"
                    className="h-10 w-auto md:h-12"
                  />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                    MRP Global Traders
                  </h2>
                  <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest">
                    Export Quality
                  </p>
                </div>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Bridging farmers and suppliers with international markets,
                delivering fresh, premium quality fruits and food products
                worldwide.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
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
                  className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gray-900 text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 border border-gray-800 hover:border-primary"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* --- Section 2 & 3 Wrapper: Double Column for Mobile --- */}
          {/* This div groups Links and Legal side-by-side on mobile to kill empty space */}
          <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:col-span-2 lg:grid-cols-2">
            {/* Quick Links */}
            <div>
              <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 flex items-center gap-2">
                <Globe className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                Quick Links
              </h3>
              <ul className="space-y-2.5">
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
                      <ChevronRight className="w-3.5 h-3.5 mr-1.5 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                Legal
              </h3>
              <ul className="space-y-2.5">
                {[
                  { to: "/privacy-policy", label: "Privacy Policy" },
                  { to: "/terms", label: "Terms" }, // Shortened for mobile fit
                  { to: "/faq", label: "FAQ" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="group flex items-center text-gray-400 hover:text-primary transition-colors text-sm"
                    >
                      <ChevronRight className="w-3.5 h-3.5 mr-1.5 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- Section 4: Contact Info --- */}
          <div className="lg:col-span-1">
            <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 flex items-center gap-2">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              Get In Touch
            </h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 bg-gray-900 p-1.5 rounded-lg border border-gray-800 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm text-gray-400 leading-relaxed">
                  {contactDetails.location}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-gray-900 p-1.5 rounded-lg border border-gray-800 shrink-0">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                </div>
                <a
                  href={`tel:${contactDetails.phoneNumber}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {contactDetails.phoneNumber}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-gray-900 p-1.5 rounded-lg border border-gray-800 shrink-0">
                  <Mail className="w-3.5 h-3.5 text-primary" />
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
        <div className="pt-6 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Certifications (Stacked neatly on mobile) */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-6 w-full lg:w-auto">
              <div className="flex flex-1 justify-center sm:flex-none items-center gap-2 px-3 py-2 bg-gray-900 rounded-xl border border-gray-800 min-w-[140px]">
                <FileText className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-xs text-gray-400 font-mono">
                  GSTN: {companyDetails.GSTN}
                </span>
              </div>
              <div className="flex flex-1 justify-center sm:flex-none items-center gap-2 px-3 py-2 bg-gray-900 rounded-xl border border-gray-800 min-w-[140px]">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                <span className="text-xs text-gray-400 font-mono">
                  FSSAI: {companyDetails.FSSAI}
                </span>
              </div>
            </div>

            {/* Copyright & Back to Top */}
            <div className="flex flex-col-reverse sm:flex-row items-center gap-4 sm:gap-6 w-full lg:w-auto justify-between sm:justify-end">
              <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                &copy; {currentYear} MRP Global Traders.
              </p>
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-primary text-gray-400 hover:text-white rounded-full transition-all duration-300 text-xs font-medium border border-gray-800"
              >
                Top
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
