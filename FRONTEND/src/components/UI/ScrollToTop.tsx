import React, { useState, useEffect } from "react";

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
      className={`fixed bottom-28 right-6 p-4 rounded-full shadow-xl transition-opacity duration-500 ease-in-out ${bgColor} ${textColor} ${hoverColor} ${
        showButton ? "opacity-100" : "opacity-0"
      } ${showButton ? "pointer-events-auto" : "pointer-events-none"}`}
      style={{ transition: "opacity 0.5s ease-in-out" }}
      aria-label="Scroll to Top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 21 21"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="M19 9l-7-7-7 7"
        />
      </svg>
    </button>
  );
};

export default ScrollToTop;
