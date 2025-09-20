import Forbidden from "../../assets/SVG/Forbidden.svg";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ForbiddenPage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/admin/login");
  };

  return (
    <div className="bg-gradient-to-b min-h-screen from-secondarylight to-primary text-white ">
      <div className="text-center p-8 md:p-12 bg-secondary/60 rounded-lg shadow-lg ">
        <h1 className="text-4xl font-semibold text-gray-600">403 Forbidden</h1>
        <img
          src={Forbidden}
          alt="403 Forbidden"
          className=" max-w-2xl mx-auto"
        />
        <p className="mt-4 text-lg text-gray-700">
          You do not have permission to access this page.
        </p>
        <p className="mt-4 text-md text-gray-700">
          Please log in with the appropriate credentials to gain access.
        </p>
        <button
          onClick={handleLoginRedirect}
          className="mt-6 px-6 py-2 inline-flex items-center bg-primary text-secondary rounded-lg hover:bg-primary/80 transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Go to Login Page
        </button>
      </div>
    </div>
  );
};

export default ForbiddenPage;
