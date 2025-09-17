import React, { useState, useEffect } from "react";
import { X, MailCheck } from "lucide-react";

type BannerProps = {
  text: string; // Text content to display inside the banner
  buttonText: string; // Text for the button
  onButtonClick: () => void; // The function that will be triggered on button click
};

const Banner: React.FC<BannerProps> = ({ text, buttonText, onButtonClick }) => {
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Show the banner after 3 seconds for better UX
    const timer = setTimeout(() => {
      setIsBannerVisible(true);
      setIsExiting(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsBannerVisible(false);
    }, 500);
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onButtonClick();
  };

  return (
    <>
      {isBannerVisible && (
        <div
          className={`fixed hidden md:block sm:block lg:block w-full bottom-0 left-0 z-[200] transition-all duration-700 ease-in-out transform ${
            isExiting
              ? "opacity-0 translate-y-full"
              : "opacity-100 translate-y-0"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-dustyTaupe to-transparent animate-shimmer"></div>

          {/* Main banner content */}
          <div className="bg-gradient-to-r from-secondary via-secondary to-secondary backdrop-blur-sm shadow-2xl border-t border-dustyTaupe/30">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
              <div className="flex flex-col sm:flex-row items-center justify-between py-3 sm:py-4 gap-3 sm:gap-4">
                {/* Content Section */}
                <div className="flex items-center justify-center sm:justify-start flex-1 min-w-0">
                  <div className="flex items-center space-x-2 animate-float">
                    <MailCheck className="h-4 w-4 sm:h-5 sm:w-5 text-primary animate-pulse-slow flex-shrink-0" />
                    <div className="text-center sm:text-left">
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-primary font-medium leading-tight">
                        <span className="font-bold bg-gradient-to-r from-primary via-dustyTaupe to-primary bg-clip-text text-transparent animate-shimmer">
                          GeneriCon 2025
                        </span>
                        <span className="hidden sm:inline"> - </span>
                        <span className="block sm:inline mt-1 sm:mt-0">
                          {text}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Section */}
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  <button
                    onClick={handleButtonClick}
                    className="relative group px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-secondarylight bg-primary rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform "
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-dustyTaupe/20 to-primary/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    <span className="relative z-10">{buttonText}</span>
                  </button>

                  <button
                    onClick={handleClose}
                    className="group p-2 text-primary hover:text-secondarylight hover:bg-primary rounded-full transition-all duration-300 hover:scale-110 transform"
                    aria-label="Close banner"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-dustyTaupe/20 to-primary/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    <X className="h-4 w-4 sm:h-5 sm:w-5 relative z-10 group-hover:animate-spin-slow" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse-slow"></div>
        </div>
      )}
    </>
  );
};

export default Banner;
