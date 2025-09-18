// components/Layout/Layout.tsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingWhatsApp from "../UI/FloatingWhatsApp";
import ScrollToTop from "../UI/ScrollToTop";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden mt-20">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <FloatingWhatsApp />
    </div>
  );
};

export default Layout;
