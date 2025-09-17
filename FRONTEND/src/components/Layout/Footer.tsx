import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import logo from "../../assets/images/logo.png";
const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center ">
              {/* <Globe className="h-8 w-8 text-[#CCBBAE]" /> */}
              <img src={logo} alt="logo" className="h-52 w-52" />
            </div>
            <p className="text-gray-300 text-sm">
              Connecting farmers and suppliers with international buyers through
              premium quality fruits and food products.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-[#CCBBAE] transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#CCBBAE] transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#CCBBAE] transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#CCBBAE] transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#CCBBAE]">
              Quick Links
            </h3>
            <div className="space-y-2">
              <Link
                to="/"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/products/imports"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Imports
              </Link>
              <Link
                to="/products/exports"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Exports
              </Link>
              <Link
                to="/gallery"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Gallery
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#CCBBAE]">Legal</h3>
            <div className="space-y-2">
              <Link
                to="/privacy-policy"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/faq"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                FAQ
              </Link>
              <Link
                to="/contact"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#CCBBAE]">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#CCBBAE]" />
                <span className="text-gray-300 text-sm">
                  info@mrpglobal.com
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-[#CCBBAE]" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-[#CCBBAE]" />
                <span className="text-gray-300 text-sm">
                  MRP Global Traders , Chennai, India
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            &copy; 2025 MRPGlobal Traders. All rights reserved. Connecting the
            world through quality food products.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
