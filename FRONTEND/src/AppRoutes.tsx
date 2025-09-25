import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Layouts
import Layout from "./components/Layout/Layout";
import AdminLayout from "./components/AdminLayout/AdminLayout";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import ProductListings from "./pages/ProductListings";
import Contact from "./pages/Contact";
import NotFound from "./utils/NotFound";
import NotFoundInAdminPage from "./pages/ADMIN/NotFoundInAdminPage";

// Admin Pages
import AdminDashboard from "./pages/ADMIN/AdminDashboard";
import LoginPage from "./pages/ADMIN/LoginPage";
import UserTable from "./pages/ADMIN/UserTable";
import ManageProducts from "./pages/ADMIN/ManageProducts";
import AddProduct from "./pages/ADMIN/AddProduct";

// Auth
import ProtectedRoute from "./Routes/ProtectedRoute";
import ForbiddenPage from "./pages/ADMIN/ForbiddenPage";
import PrivacyPolicy from "./pages/LegalAndSupport/PrivacyPolicy";
import FAQPage from "./pages/LegalAndSupport/FaqPage";
import TermsAndConditions from "./pages/LegalAndSupport/TermsAndCondition";
import ProductDetails from "./components/Products/ProductsDetails";

import BulkUploadPage from "./pages/ADMIN/BulkUpload";

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const isAdminLogin = location.pathname === "/admin/login";
  const isAdminRoute =
    /^\/admin(\/|$)/.test(location.pathname) && !isAdminLogin;

  return (
    <Routes>
      {/* Public layout */}
      {!isAdminRoute && !isAdminLogin && (
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:productid" element={<ProductDetails />} />
          <Route path="/products" element={<ProductListings />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/faq" element={<FAQPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      )}

      {/* Admin login route (no layout) */}
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/forbidden" element={<ForbiddenPage />} />

      {/* Protected admin layout and routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />

          <Route path="Alladmins" element={<UserTable />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/bulkupload" element={<BulkUploadPage />} />
          <Route path="*" element={<NotFoundInAdminPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
