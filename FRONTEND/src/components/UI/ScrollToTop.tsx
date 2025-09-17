import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
interface ScrollToTopProps {
  bgColor?: string; // Background color
  textColor?: string; // Text color
  hoverColor?: string; // Hover color
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({
  bgColor = "bg-secondary",
  textColor = "text-primary",
  hoverColor = "",
}) => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight / 2) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-6 bottom-24  animate-float mt-6 flex items-center space-x-2 ${textColor} ${hoverColor}  rounded-full transition-all duration-300 hover:scale-105 transform ${
        showButton ? "opacity-100" : "opacity-0"
      } ${showButton ? "pointer-events-auto" : "pointer-events-none"}`}
      style={{ transition: "opacity 0.8s ease-in-out" }}
    >
      <div className={` p-2 ${bgColor} rounded-full hover:bg-secondarylight `}>
        <ArrowUp className={`h-9 w-9 `} />
      </div>
    </button>
  );
};

export default ScrollToTop;
