import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, Globe } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { searchTerm, setSearchTerm } = useApp();

  return (
    <motion.header 
      className="bg-primary/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-dustyTaupe/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Globe className="h-10 w-10 text-secondary group-hover:text-dustyTaupe transition-colors duration-300" />
              </motion.div>
              <div className="text-2xl font-bold bg-gradient-to-r from-secondary via-dustyTaupe to-secondary bg-clip-text text-transparent group-hover:from-dustyTaupe group-hover:to-secondary transition-all duration-300">
                MRPGlobal
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <motion.div whileHover={{ y: -2 }}>
              <Link to="/" className="NavLink">
                Home
              </Link>
            </motion.div>

            <div className="relative group">
              <motion.button 
                className="NavLink"
                whileHover={{ y: -2 }}
              >
                Products
              </motion.button>
              <motion.div 
                className="absolute top-full left-0 mt-2 w-48 bg-secondarylight/95 backdrop-blur-md rounded-lg shadow-xl border border-dustyTaupe/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
                initial={{ y: -10, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
              >
                <motion.div whileHover={{ x: 5 }}>
                  <Link
                    to="/products/imports"
                    className="block px-4 py-3 text-sm font-bold text-primary hover:bg-gradient-to-r hover:from-primary hover:to-dustyTaupe hover:text-white transition-all duration-200 rounded-t-lg"
                  >
                    Imports
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 5 }}>
                  <Link
                    to="/products/exports"
                    className="block px-4 py-3 text-sm font-bold text-primary hover:bg-gradient-to-r hover:from-primary hover:to-dustyTaupe hover:text-white transition-all duration-200 rounded-b-lg"
                  >
                    Exports
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            
            <motion.div whileHover={{ y: -2 }}>
              <Link to="/about" className="NavLink">
                About Us
              </Link>
            </motion.div>
            
            {/* <Link to="/gallery" className="NavLink">
              Gallery
            </Link> */}
            <motion.div whileHover={{ y: -2 }}>
              <Link to="/contact" className="NavLink">
                Contact
              </Link>
            </motion.div>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-2 max-w-md mx-8">
            <motion.div 
              className="relative w-full"
              whileFocus={{ scale: 1.02 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white/95 backdrop-blur-sm transition-all duration-300 hover:shadow-md"
              />
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-secondarylight p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="lg:hidden bg-secondary/95 backdrop-blur-md border-t border-dustyTaupe/20"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 py-6 space-y-6">
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white/95 backdrop-blur-sm"
                  />
                </div>
              </motion.div>
              
              {[
                { to: "/", label: "Home" },
                { to: "/products/imports", label: "Imports" },
                { to: "/products/exports", label: "Exports" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" }
              ].map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    to={item.to}
                    className="block text-primary hover:text-white hover:bg-gradient-to-r hover:from-primary hover:to-dustyTaupe py-3 px-4 rounded-lg font-medium transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
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
