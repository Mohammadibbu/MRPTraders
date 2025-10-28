import React, { useEffect, useState } from "react";

const LoadingScreen: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate page load + show for 2 seconds
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center 
        bg-secondarylight transition-opacity duration-700 z-50 
        ${isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      {/* Brand Logo */}
      <div className="relative">
        <div className="bg-primary rounded-full animate-bounce w-32 h-32 md:w-36 md:h-36 mb-6">
          <img src="/Images/Logo/logo.png" alt="Brand Logo" className="p-2 " />
        </div>

        <div className="loader absolute bottom-5  w-full"></div>
      </div>

      {/* Loader Spinner */}
    </div>
  );
};

export default LoadingScreen;
