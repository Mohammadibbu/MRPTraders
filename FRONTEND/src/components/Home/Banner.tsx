import React, { useState, useEffect } from "react";
import { X, Mail, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type BannerProps = {
  mainText: string;
  text: string;
  buttonText: string;
  onButtonClick: () => void;
};

const Banner: React.FC<BannerProps> = ({
  mainText,
  text,
  buttonText,
  onButtonClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the banner after a 3-second delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Optionally set a flag in localStorage to prevent showing again
    // localStorage.setItem('bannerDismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed z-100 bottom-4 left-4 right-4  flex justify-center pointer-events-none"
        >
          <div className="pointer-events-auto max-w-4xl w-full bg-white/95 backdrop-blur-lg border border-secondary shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl overflow-hidden">
            <div className="flex items-center p-3 sm:p-4 gap-3 sm:gap-6">
              {/* Icon & Text Content */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Desktop Icon */}
                <div className="hidden sm:flex p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>

                {/* Text Block - Uses min-w-0 to allow truncation */}
                <div className="min-w-0 space-y-0.5">
                  <p className="text-sm font-bold text-dustyTaupe truncate">
                    {mainText}
                  </p>
                  <p className="text-xs sm:text-sm text-gradientsecondary leading-tight truncate">
                    {text}
                  </p>
                </div>
              </div>

              {/* Actions & Close Button */}
              <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                {/* Primary Action Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onButtonClick();
                    handleClose(); // Close after action
                  }}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-primary hover:bg-opacity-90 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap group"
                >
                  <span className="truncate max-w-[80px] sm:max-w-none">
                    {buttonText}
                  </span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1 shrink-0" />
                </button>

                {/* Close Button - Fixed size/position */}
                <button
                  onClick={handleClose}
                  className="p-1.5 sm:p-2 text-gradientsecondary hover:text-dustyTaupe hover:bg-secondary rounded-full transition-colors shrink-0"
                  aria-label="Close banner"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Banner;
