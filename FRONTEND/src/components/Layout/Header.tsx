import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, Globe } from "lucide-react";
import { useApp } from "../../context/AppContext";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { searchTerm, setSearchTerm } = useApp();
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight / 1.2) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <header
      className={`bg-primary shadow-lg fixed w-full  top-0 z-50 ${
        scrolled
          ? "backdrop-blur-lg shadow-md bg-primary/90"
          : "backdrop-blur-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Globe className="h-10 w-10 text-secondary" />
            <div className="text-2xl font-bold bg-gradient-to-r from-secondary via-secondarylight to-secondary bg-clip-text text-transparent">
              MRPGlobal
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="NavLink">
              Home
            </Link>

            <div className="relative group">
              <button className="NavLink">Products</button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-secondarylight rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/products/imports"
                  className="block px-4 py-3 text-sm font-bold text-primary hover:bg-primary hover:text-secondarylight"
                >
                  Imports
                </Link>
                <Link
                  to="/products/exports"
                  className="block px-4 py-3 text-sm font-bold text-primary hover:bg-primary hover:text-secondarylight"
                >
                  Exports
                </Link>
              </div>
            </div>
            <Link to="/about" className="NavLink">
              About Us
            </Link>
            {/* <Link to="/gallery" className="NavLink">
              Gallery
            </Link> */}
            <Link to="/contact" className="NavLink">
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-2 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-secondarylight "
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-secondary border-t">
          <div className="px-4 py-4 space-y-7 ">
            <div className="mb-4 ">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <Link
              to="/"
              className="block text-primary hover:text-secondarylight py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products/imports"
              className="block text-primary hover:text-secondarylight py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Imports
            </Link>
            <Link
              to="/products/exports"
              className="block text-primary hover:text-secondarylight py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Exports
            </Link>
            <Link
              to="/about"
              className="block text-primary hover:text-secondarylight py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            {/* <Link
              to="/gallery"
              className="block text-primary hover:text-secondarylight py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link> */}
            <Link
              to="/contact"
              className="block text-primary hover:text-secondarylight py-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
