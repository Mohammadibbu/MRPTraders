import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { showtoast } from "./Toast";

const NotFound: React.FC = () => {
  showtoast("404", "Page Not Found !");
  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-gradient-to-b from-secondarylight to-primary text-white text-center px-6">
      {/* Overlay for subtle effect */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 max-w-xl">
        <h1 className="text-7xl md:text-9xl font-extrabold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Oops! Page Not Found
        </h2>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft className="h-5 w-5" />
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
