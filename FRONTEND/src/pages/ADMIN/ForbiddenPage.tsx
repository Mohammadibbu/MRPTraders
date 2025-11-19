import React from "react";
import Forbidden from "../../assets/SVG/Forbidden.svg";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldAlert, Lock } from "lucide-react";
import { motion } from "framer-motion";

const ForbiddenPage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden font-sans">
      {/* ================= BACKGROUND ELEMENTS ================= */}

      {/* 1. Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      {/* 2. Giant Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] lg:text-[20rem] font-black text-gray-200/40 pointer-events-none select-none leading-none z-0">
        403
      </div>

      {/* 3. Ambient Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      {/* ================= MAIN CARD ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-lg px-4"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 sm:p-12 text-center">
          {/* Icon Badge */}
          <div className="mx-auto w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-8 rotate-3 hover:rotate-0 transition-transform duration-300">
            <ShieldAlert className="w-8 h-8 text-red-500" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Access Denied
          </h1>

          <p className="text-gray-500 text-sm font-medium uppercase tracking-widest mb-8">
            Error 403 • Forbidden
          </p>

          {/* Illustration */}
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-red-500/5 blur-2xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-500"></div>
            <img
              src={Forbidden}
              alt="403 Forbidden"
              className="relative w-full max-w-[280px] mx-auto drop-shadow-sm hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="space-y-2 mb-8">
            <p className="text-lg text-gray-700 font-medium">
              You don’t have permission to access this page.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
              Please ensure you are logged in with the correct administrative
              credentials.
            </p>
          </div>

          <button
            onClick={handleLoginRedirect}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0B1120] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </span>
          </button>
        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3" />
            Secured by MRPGlobal Admin System
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForbiddenPage;
