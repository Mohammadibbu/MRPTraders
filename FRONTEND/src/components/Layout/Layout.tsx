// components/Layout/Layout.tsx

import Header from "./Header";
import Footer from "./Footer";
import FloatingWhatsApp from "../UI/FloatingWhatsApp";
import ScrollToTop from "../UI/ScrollToTop";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const Location = useLocation();
  console.log(Location.pathname);
  const isHomePage = Location.pathname === "/";

  return (
    <div
      className={`min-h-screen flex flex-col overflow-hidden ${
        !isHomePage ? "mt-20" : ""
      }`}
    >
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
