// components/RouteChangeLoader.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const RouteChangeLoader = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    setTimeout(() => NProgress.done(), 1500);
  }, [location.pathname]);

  return null;
};

export default RouteChangeLoader;
