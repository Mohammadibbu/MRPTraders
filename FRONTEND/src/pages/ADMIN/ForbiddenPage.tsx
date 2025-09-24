import Forbidden from "../../assets/SVG/Forbidden.svg";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ForbiddenPage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen  flex items-center  bg-secondary/60 justify-center px-4 py-10">
      <div className="w-full max-w-3xl  rounded-xl  p-6 sm:p-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-700">
          403 Forbidden
        </h1>

        <img
          src={Forbidden}
          alt="403 Forbidden"
          className="w-full max-w-lg mx-auto my-6"
        />

        <p className="text-base sm:text-lg text-gray-700">
          You do not have permission to access this page.
        </p>
        <p className="text-sm sm:text-md text-gray-700 mt-2">
          Please log in with the appropriate credentials to gain access.
        </p>

        <button
          onClick={handleLoginRedirect}
          className="mt-6 px-5 py-2 text-sm sm:text-base inline-flex items-center bg-primary text-white rounded-lg hover:bg-primary/80 transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Go to Login Page
        </button>
      </div>
    </div>
  );
};

export default ForbiddenPage;
