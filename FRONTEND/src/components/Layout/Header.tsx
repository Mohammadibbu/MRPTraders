import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  Home,
  Package,
  Info,
  PhoneCall,
} from "lucide-react";
import { contactDetails } from "../../utils/ContactDetails";
import logo from "../../assets/images/logo.png";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const lastScrollY = useRef(0);

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Handle header visibility on scroll
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setVisible(false);
        setIsMenuOpen(false); // Close mobile menu if user scrolls down
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Products", path: "/products", icon: Package },
    { name: "About Us", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: PhoneCall },
  ];

  const socialLinks = [
    { icon: Facebook, href: contactDetails.facebook ?? "#", label: "Facebook" },
    {
      icon: Instagram,
      href: contactDetails.instagram ?? "#",
      label: "Instagram",
    },
    { icon: Linkedin, href: contactDetails.linkedin ?? "#", label: "LinkedIn" },
  ];
  const isContactPage = location.pathname === "/contact";

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ease-in-out transform 
      ${visible ? "translate-y-0" : "-translate-y-full"}
      ${
        // LOGIC UPDATE:
        // Stay transparent ONLY if: (Home Page) AND (Not Scrolled) AND (Menu is CLOSED)
        isHomePage && !scrolled && !isMenuOpen
          ? "bg-transparent border-b border-transparent py-2"
          : "bg-primary/95 backdrop-blur-md shadow-lg border-b border-white/10 py-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* --- Logo --- */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              className="h-12 w-auto sm:h-14 transition-transform duration-300 group-hover:scale-105"
              src={logo}
              alt="MRPGlobal Logo"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight leading-none transition-colors text-white drop-shadow-md">
                MRPGlobal
              </span>
              <span className="text-[10px] uppercase tracking-widest transition-colors text-white/80 drop-shadow-md">
                Export Quality
              </span>
            </div>
          </Link>

          {/* --- Desktop Navigation --- */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white text-primary shadow-lg"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="drop-shadow-sm">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* --- Desktop Actions --- */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="h-6 w-px bg-white/20"></div>
            <div className="flex space-x-2">
              {socialLinks.map(({ icon: Icon, href, label }: any) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full transition-all duration-200 text-white/70 hover:text-white hover:bg-white/10"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 drop-shadow-sm" />
                </a>
              ))}
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              {isContactPage ? (
                <a
                  href={`tel:${contactDetails.phoneNumber}`}
                  className="px-5 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 bg-secondaryDark text-gray-200 hover:bg-gray-800 flex items-center gap-2 shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              ) : (
                <Link
                  to="/contact"
                  className="px-5 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 bg-secondaryDark text-gray-200 hover:bg-gray-800 shadow-lg"
                >
                  Get Quote
                </Link>
              )}
            </div>
          </div>

          {/* --- Mobile Menu Toggle --- */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors text-white hover:bg-white/10"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="w-7 h-7 drop-shadow-md" />
            ) : (
              <Menu className="w-7 h-7 drop-shadow-md" />
            )}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 space-y-6">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive
                      ? "bg-primary/5 text-primary"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 mr-3 ${
                      isActive ? "text-primary" : "text-gray-400"
                    }`}
                  />
                  <span className="flex-grow">{link.name}</span>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  )}
                </Link>
              );
            })}
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-4 px-4">
            <div className="flex flex-col space-y-3">
              <a
                href={`tel:${contactDetails.phoneNumber}`}
                className="flex items-center text-gray-600 hover:text-primary"
              >
                <Phone className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-sm font-medium">Call Us</span>
              </a>
              <a
                href={`mailto:${contactDetails.email}`}
                className="flex items-center text-gray-600 hover:text-primary"
              >
                <Mail className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-sm font-medium">Email Support</span>
              </a>
            </div>
          </div>

          <div className="px-4 pt-2 pb-4">
            <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-100">
              {socialLinks.map(({ icon: Icon, href, label }: any) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transform hover:scale-110"
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
