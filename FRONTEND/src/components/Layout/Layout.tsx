import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingWhatsApp from "../UI/FloatingWhatsApp";
import ScrollToTop from "../UI/ScrollToTop";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden mt-20">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
      <FloatingWhatsApp />
    </div>
  );
};

export default Layout;
