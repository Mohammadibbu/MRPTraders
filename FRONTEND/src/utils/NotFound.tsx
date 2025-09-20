// src/pages/NotFoundPage.js

import PageNotFoundImage from "../assets/SVG/PageNotFound.svg"; // Assuming your 404 SVG is stored here
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleHomeRedirect = () => {
    navigate("/"); // Redirect to the homepage
  };

  return (
    <div className=" min-h-screen bg-gradient-to-b from-secondarylight to-primary text-white  ">
      <main>
        <div className="flex justify-center flex-col items-center bg-secondary/60 text-gray-800 rounded-lg shadow-lg   w-full p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-600 drop-shadow-lg">
            404 Not Found
          </h1>

          <img
            src={PageNotFoundImage}
            alt="Page Not Found"
            className="my-6 max-w-lg mx-auto"
          />

          <p className="mt-4 text-lg text-gray-700">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          <p className="mt-4 text-md text-gray-900">
            You can return to the homepage and try again.
          </p>

          <button
            onClick={handleHomeRedirect}
            className="mt-6 px-6 py-3 bg-primary inline-flex items-center  text-white rounded-lg font-semibold shadow-md hover:shadow-xl hover:bg-primary/80 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Go to Homepage
          </button>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;
