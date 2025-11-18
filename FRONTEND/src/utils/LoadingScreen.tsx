import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Ensure this path matches your actual logo location.
// Based on your previous code, it seemed to be imported or a public path.
// I will use the public path provided in your snippet.
const LOGO_SRC = "/Images/Logo/logo.png";

const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate minimum loading time (e.g., 2 seconds)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8 relative"
            >
              {/* Glowing Backdrop for Logo */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl scale-110 animate-pulse-slow" />

              <div className="relative bg-primary p-4 rounded-3xl shadow-lg border border-gray-100 w-32 h-32 flex items-center justify-center">
                <img
                  src={LOGO_SRC}
                  alt="MRPGlobal Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Brand Text */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center mb-8"
            >
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
                MRPGlobal
              </h1>
              <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em]">
                Export Quality
              </p>
            </motion.div>

            {/* Loading Bar */}
            <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>

          {/* Footer Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-10 text-xs text-gray-400 font-medium"
          >
            Connecting Global Markets
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
