import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, Facebook, Instagram, Linkedin, X } from "lucide-react";

// import { useApp } from "../../context/AppContext";
import logo from "../../assets/images/logo.png";
// import SearchBar from "../UI/Searchbar";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  // const { searchTerm, setSearchTerm } = useApp();

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Toggle scrolled style
      setScrolled(currentScrollY > window.innerHeight / 1.2);

      // Determine scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down
        setVisible(false);
      } else {
        // Scrolling up
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ease-in-out transform ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled
          ? "backdrop-blur-xl shadow-xl border-b border-secondarylight/30 bg-primary/95"
          : "backdrop-blur-sm bg-primary"
      }`}
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondarylight to-transparent "></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <img className="h-20 w-23" src={logo} alt="Logo" />
            <div className="relative">
              <div className="text-xl font-bold bg-gradient-to-r from-secondary via-secondarylight to-secondary bg-clip-text text-transparent">
                MRPGlobal
              </div>
              <div className="absolute inset-0 text-xl font-bold bg-gradient-to-r from-secondarylight to-secondarylight bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                MRPGlobal
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="relative px-4 py-2 text-secondarylight hover:text-secondarylight font-medium transition-all duration-300 group"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondarylight/20 to-secondary/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Link>

            <Link
              to="/products"
              className="relative px-4 py-2 text-secondarylight hover:text-secondarylight font-medium transition-all duration-300 group"
            >
              <span className="relative z-10"> Products</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondarylight/20 to-secondary/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Link>

            {["About Us", "Contact"].map((item, index) => (
              <Link
                key={item}
                to={item === "About Us" ? "/about" : "/contact"}
                className="relative px-4 py-2 text-secondarylight hover:text-secondarylight font-medium transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="relative z-10">{item}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondarylight/20 to-secondary/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
            ))}
          </nav>

          {/* SearchBar */}
          {/* <SearchBar /> */}
          {/* Social Media Links */}
          <div className="hidden sm:block">
            <div className="flex space-x-4  ">
              {[
                {
                  icon: Facebook,
                  href: "https://facebook.com/mrpglobal",
                  label: "Facebook",
                },

                {
                  icon: Instagram,
                  href: "https://instagram.com/mrpglobal",
                  label: "Instagram",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/company/mrpglobal",
                  label: "LinkedIn",
                },
              ].map(({ icon: Icon, href, label }, index) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2 text-secondary hover:text-dustyTaupe transition-all duration-300 hover:scale-110 transform"
                  aria-label={label}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-dustyTaupe/20 to-secondary/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  <Icon className="h-5 w-5 relative z-10 group-hover:animate-bounce-slow" />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative p-3 text-secondarylight hover:text-secondarylight transition-all duration-300 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-secondarylight/20 to-secondary/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            <div className="relative z-10">
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="lg:hidden backdrop-blur-xl border-t border-secondarylight/30 shadow-2xl  "
          style={{ backgroundColor: "#e8e0da" }}
        >
          <div className="px-4 py-4 space-y-7 ">
            {/* Mobile Search */}

            {/* Mobile Navigation */}
            {[
              { name: "Home", to: "/" },
              { name: "Products", to: "/products" },
              { name: "About Us", to: "/about" },
              { name: "Contact", to: "/contact" },
            ].map((link, index) => (
              <Link
                key={link.name}
                to={link.to}
                className="block text-primary hover:text-secondarylight py-2 font-medium transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
          <div className="pb-5">
            <div className="relative">
              <div className="flex space-x-4">
                {[
                  {
                    icon: Facebook,
                    href: "https://facebook.com/mrpglobal",
                    label: "Facebook",
                  },

                  {
                    icon: Instagram,
                    href: "https://instagram.com/mrpglobal",
                    label: "Instagram",
                  },
                  {
                    icon: Linkedin,
                    href: "https://linkedin.com/company/mrpglobal",
                    label: "LinkedIn",
                  },
                ].map(({ icon: Icon, href, label }, index) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2 text-primary hover:text-dustyTaupe transition-all duration-300 hover:scale-110 transform"
                    aria-label={label}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-dustyTaupe/20 to-primary/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    <Icon className="h-5 w-5 relative z-10 group-hover:animate-bounce-slow" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
