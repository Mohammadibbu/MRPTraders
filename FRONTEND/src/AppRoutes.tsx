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
import UserTable from "./components/AdminComp/UserTable";
import ManageProducts from "./pages/ADMIN/ManageProducts";
import AddProduct from "./pages/ADMIN/AddProduct";

// Auth
import ProtectedRoute from "./Routes/ProtectedRoute";
import ForbiddenPage from "./pages/ADMIN/ForbiddenPage";

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const isAdminLogin = location.pathname === "/admin/login";
  const isAdminRoute = location.pathname.startsWith("/admin") && !isAdminLogin;

  return (
    <Routes>
      {/* Public layout */}
      {!isAdminRoute && !isAdminLogin && (
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:category" element={<ProductListings />} />
          <Route path="/contact" element={<Contact />} />
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
          <Route path="*" element={<NotFoundInAdminPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
