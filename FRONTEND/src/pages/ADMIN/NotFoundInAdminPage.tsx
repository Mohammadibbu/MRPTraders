import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AdminPageNotFound from "../../assets/SVG/AdminPageNotFound.svg"; // Import the image from your assets folder
// import { showtoast } from "../../utils/Toast";

const NotFoundInAdminPage: React.FC = () => {
  useEffect(() => {
    // showtoast("404", "Admin Page Not Found!");
  }, []);

  return (
    <main>
      <div className="w-full text-center bg-white shadow-md rounded-lg p-8">
        <div className="my-6">
          <img
            src={AdminPageNotFound}
            alt="Page Not Found"
            className="mx-auto max-w-xl"
          />
        </div>
        <p className="text-gray-500 mb-6">
          The admin page you’re looking for doesn’t exist or was moved.
        </p>
        <Link
          to="/admin"
          className="inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-md font-medium hover:bg-primary-dark transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Admin Dashboard
        </Link>
      </div>
    </main>
  );
};

export default NotFoundInAdminPage;
