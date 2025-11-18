import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";
import PageNotFoundImage from "../assets/SVG/PageNotFound.svg";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-primary/20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Image Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto w-full max-w-md flex items-center justify-center"
        >
          <img
            src={PageNotFoundImage}
            alt="404 Not Found"
            className="w-full h-auto max-h-[400px] object-contain drop-shadow-xl"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
            Oops! It seems the page you are looking for has vanished or was
            moved. Don't worry, we can help you find your way back.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
