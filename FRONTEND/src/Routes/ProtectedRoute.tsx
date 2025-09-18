import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios, { verificationApi } from "../utils/AxiosInstance";
import FullPageLoader from "../utils/PageLoader";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const verificationToken = localStorage.getItem("adminToken");

      if (!verificationToken) {
        setIsVerified(false);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(verificationApi, {
          verificationToken,
        });

        if (response?.data?.verification === true) {
          setIsVerified(true);
        } else {
          localStorage.removeItem("adminToken");

          setIsVerified(false);
        }
      } catch (error) {
        // console.error(error);
        setError(true);
        localStorage.removeItem("adminToken");
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (loading) {
    return <FullPageLoader />;
  }

  if (error) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isVerified) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
