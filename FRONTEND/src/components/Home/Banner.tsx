import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

type BannerProps = {
  text: string; // Text content to display inside the banner
  buttonText: string; // Text for the button
  onButtonClick: () => void; // The function that will be triggered on button click
};

const Banner: React.FC<BannerProps> = ({ text, buttonText, onButtonClick }) => {
  const [isBannerVisible, setIsBannerVisible] = useState(false); // Start with the banner hidden
  const [isExiting, setIsExiting] = useState(false); // Track if we are exiting

  useEffect(() => {
    // Show the banner after 5 seconds
    const timer = setTimeout(() => {
      setIsBannerVisible(true);
      setIsExiting(false); // Make sure it's not exiting when we first show it
    }, 5000); // 5 seconds delay for the banner to appear

    return () => clearTimeout(timer); // Cleanup timer if the component unmounts
  }, []);

  const handleClose = () => {
    // When closing, trigger exit animation
    setIsExiting(true);
    setTimeout(() => {
      setIsBannerVisible(false); // Hide banner completely after animation ends
    }, 500); // 500ms wait for exit animation
  };

  return (
    <>
      {isBannerVisible && (
        <div
          className={`fixed w-full bottom-0 left-0 z-[200] flex items-center justify-between bg-secondary text-primary p-4 shadow-md transition-all duration-1000 ease-in-out transform ${
            isExiting
              ? "opacity-0 translate-y-[100px]"
              : "opacity-100 translate-y-0"
          }`}
        >
          <div className="flex"></div>
          <div className="flex items-center justify-start">
            <p className="text-sm sm:text-base md:text-lg">
              <strong>GeneriCon 2023</strong> - {text}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#"
              onClick={onButtonClick}
              className="text-sm sm:text-base font-semibold text-secondarylight bg-primary px-3 py-2 rounded-md"
            >
              {buttonText}
            </a>
            <button
              onClick={handleClose}
              className="text-primary p-1 hover:bg-primary hover:text-secondary rounded-full"
            >
              <X aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
