import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductListings from "./pages/ProductListings";
import Contact from "./pages/Contact";
// import Gallery from "./pages/Gallery";
// import ClientDashboard from "./pages/ClientDashboard";
// import SellerDashboard from "./pages/SellerDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./utils/NotFound";

import { Toaster } from "sonner";
import UserTable from "./components/AdminComp/UserTable";

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products/:category" element={<ProductListings />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/gallery" element={<Gallery />} />
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
            <Route path="/admin/Alladmins" element={<UserTable />} />

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Layout>
        <Toaster
          position="bottom-right"
          richColors
          swipeDirections={["right", "left"]}
        />
      </Router>
    </AppProvider>
  );
}

export default App;
