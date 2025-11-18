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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-4 left-4 right-4 z-50 flex justify-center pointer-events-none"
        >
          <div className="pointer-events-auto max-w-4xl w-full bg-white/95 backdrop-blur-lg border border-gray-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-3 sm:pl-6 gap-4 sm:gap-6">
              {/* Icon & Text Content */}
              <div className="flex items-center gap-4 flex-1 text-center sm:text-left">
                <div className="hidden sm:flex p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-gray-900">{mainText}</p>
                  <p className="text-sm text-gray-500 leading-tight">{text}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end sm:pr-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onButtonClick();
                  }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-900 hover:bg-primary text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap group"
                >
                  {buttonText}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => setIsVisible(false)}
                  className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close banner"
                >
                  <X className="w-5 h-5" />
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
