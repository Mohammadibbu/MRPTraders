import React, { useState, useMemo, useEffect } from "react";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/Products/ProductCard";
import ProductFilter from "../components/Products/ProductFilter";
import SkeletonLoader from "../components/UI/SkeletonLoader";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../types";
import { showtoast } from "../utils/Toast";
import JoinUsSection from "../components/Home/JoinUsSection";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  PackageX,
  SearchX,
  Home,
  ChevronRight,
  SlidersHorizontal,
  Filter,
  X,
} from "lucide-react";

const PRODUCTS_PER_PAGE = 12;

const ProductListings: React.FC = () => {
  const { products = [], categories = [], loading, searchTerm } = useApp();
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();

  // Get category from the categories list
  const Thiscategory = categories?.find(
    (cat) => cat.id === categoryName?.toLowerCase().trim()
  );

  // If specific category requested but not found, redirect to 404
  useEffect(() => {
    if (categoryName && !Thiscategory && !loading) {
      navigate("/404");
    }
  }, [categoryName, Thiscategory, navigate, loading]);

  // CORRECTED LOGIC: Return all products if no category selected, otherwise filter by category
  const ThiscatProducts = useMemo(() => {
    if (!products) return [];

    // If a specific category is selected
    if (Thiscategory) {
      if (!Thiscategory.productIds || !Array.isArray(Thiscategory.productIds)) {
        return [];
      }
      return products.filter((product) =>
        Thiscategory?.productIds?.includes(product.id)
      );
    }

    // If no category selected (All Products View)
    return products;
  }, [Thiscategory, products]);

  // Filters applied inside the selected category only
  const [filters, setFilters] = useState({
    searchTerm: searchTerm || "",
    origin: "All",
    availability: "All",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false); // Toggle for top filters

  useEffect(() => setCurrentPage(1), [filters]);

  // Apply filters ONLY to category products
  const filteredProducts = useMemo(() => {
    return (
      ThiscatProducts?.filter((product: Product) => {
        const matchesSearch =
          !filters.searchTerm ||
          product.name.toLowerCase().includes(filters.searchTerm.toLowerCase());

        const matchesOrigin =
          filters.origin === "All" || product.origin?.includes(filters.origin);

        const matchesAvailability =
          filters.availability === "All" ||
          product.availability === filters.availability;

        return matchesSearch && matchesOrigin && matchesAvailability;
      }) || []
    );
  }, [ThiscatProducts, filters]);

  // Pagination logic
  const totalPages =
    Math.ceil((filteredProducts?.length || 0) / PRODUCTS_PER_PAGE) || 1;

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts?.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleAddToCart = (product: Product) => {
    showtoast(`Added ${product.name} to inquiry list!`);
  };

  // Dynamic Background Image Source
  const heroBgImage =
    Thiscategory?.photos?.[0]?.base64 ?? "/Images/ProductPage.png";

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-primary/20">
      {/* --- Breadcrumb Navigation --- */}
      <div className="bg-white/80 border-b sticky top-0 z-30 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <nav className="flex items-center text-sm text-gray-500 font-medium">
            <Link
              to="/"
              className="hover:text-primary transition-colors p-1 rounded-md hover:bg-gray-100"
            >
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300 shrink-0" />
            <Link
              to="/products"
              className={`hover:text-primary transition-colors ${
                !Thiscategory ? "text-gray-900 font-semibold" : ""
              }`}
            >
              Products
            </Link>
            {Thiscategory && (
              <>
                <ChevronRight className="w-4 h-4 mx-2 text-gray-300 shrink-0" />
                <span className="text-gray-900 truncate font-semibold">
                  {Thiscategory.name}
                </span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* --- Hero Section with Background Image --- */}
      <div className="relative bg-gray-900 border-b border-gray-200 overflow-hidden h-64 sm:h-80 lg:h-96 flex items-center justify-center">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBgImage}
            alt={Thiscategory ? Thiscategory.name : "All Products"}
            className="w-full h-full object-cover opacity-50"
          />
          {/* Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-gray-900/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">
              {Thiscategory ? (
                <>
                  Premium{" "}
                  <span className="text-primary">{Thiscategory.name}</span>
                </>
              ) : (
                "Our Product Catalog"
              )}
            </h1>
            <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow-md font-medium">
              {Thiscategory
                ? `Explore our handpicked selection of high-quality ${Thiscategory.name.toLowerCase()}, sourced directly from the finest regions.`
                : "Browse our complete collection of premium export-quality products tailored for global markets."}
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Controls Header: Results Count & Filter Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-gray-600 font-medium order-2 sm:order-1">
            Showing{" "}
            <span className="text-gray-900 font-bold">
              {filteredProducts.length}
            </span>{" "}
            products
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`order-1 sm:order-2 flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all shadow-sm ${
              showFilters
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary"
            }`}
          >
            {showFilters ? (
              <X className="w-4 h-4" />
            ) : (
              <SlidersHorizontal className="w-4 h-4" />
            )}
            {showFilters ? "Close Filters" : "Filter Products"}
          </button>
        </div>

        {/* Top Filters Section (Expandable) */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                  <Filter className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
                    Refine Selection
                  </h3>
                </div>
                {/* Filters Component */}
                <div className="">
                  {ThiscatProducts.length > 0 ? (
                    // We pass a className if ProductFilter supported it, otherwise it renders its default layout.
                    // Assuming ProductFilter renders inputs/selects.
                    <ProductFilter
                      filters={filters}
                      products={ThiscatProducts}
                      onFilterChange={setFilters}
                    />
                  ) : (
                    <p className="text-gray-500 italic">
                      No filters available for this selection.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="w-full">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <SkeletonLoader type="product" count={8} />
            </div>
          ) : ThiscatProducts.length === 0 ? (
            // Empty Category State
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <PackageX className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                No Products Found
              </h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                {Thiscategory
                  ? `We haven't added any products to "${Thiscategory.name}" yet.`
                  : "Our catalog is currently empty."}
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-primary rounded-xl hover:bg-primary/90 transition-all"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </div>
          ) : filteredProducts.length === 0 ? (
            // Empty Filter Results State
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <SearchX className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                No Matches Found
              </h2>
              <p className="text-gray-500 mb-6">
                We couldn't find any products matching your current filters.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    searchTerm: "",
                    origin: "All",
                    availability: "All",
                  })
                }
                className="text-primary font-bold hover:underline"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              {/* Correct Responsive Product Grid (4 Cols on Desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (num) => (
                        <button
                          key={num}
                          onClick={() => setCurrentPage(num)}
                          className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                            currentPage === num
                              ? "bg-primary text-white shadow-md shadow-primary/20"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {num}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <JoinUsSection />
    </div>
  );
};

export default ProductListings;
