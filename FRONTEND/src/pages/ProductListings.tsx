import React, { useState, useMemo, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/Products/ProductCard";
import ProductFilter from "../components/Products/ProductFilter";
import SkeletonLoader from "../components/UI/SkeletonLoader";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async"; // SEO Support
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
  Tag,
} from "lucide-react";

const PRODUCTS_PER_PAGE = 12;

const ProductListings: React.FC = () => {
  const { products = [], categories = [], loading, searchTerm } = useApp();
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();

  const productsTopRef = useRef<HTMLDivElement>(null);

  const Thiscategory = categories?.find(
    (cat) => cat.id === categoryName?.toLowerCase().trim(),
  );

  useEffect(() => {
    if (categoryName && !Thiscategory && !loading) {
      navigate("/404");
    }
  }, [categoryName, Thiscategory, navigate, loading]);

  const ThiscatProducts = useMemo(() => {
    if (!products) return [];
    if (Thiscategory) {
      if (!Thiscategory.productIds || !Array.isArray(Thiscategory.productIds)) {
        return [];
      }
      return products.filter((product) =>
        Thiscategory?.productIds?.includes(product.id),
      );
    }
    return products;
  }, [Thiscategory, products]);

  // Filters
  const [filters, setFilters] = useState({
    searchTerm: searchTerm || "",
    origin: "All",
    availability: "All",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => setCurrentPage(1), [filters]);

  useEffect(() => {
    if (productsTopRef.current) {
      productsTopRef.current.scrollIntoView({
        block: "start",
      });
    }
  }, [currentPage]);

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

  const totalPages =
    Math.ceil((filteredProducts?.length || 0) / PRODUCTS_PER_PAGE) || 1;

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts?.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleAddToCart = (product: Product) => {
    showtoast(`Added ${product.name} to inquiry list!`);
  };

  const getShortDescription = () => {
    if (filters.searchTerm) {
      return `Found ${filteredProducts.length} products matching "${filters.searchTerm}".`;
    }
    const text = Thiscategory?.description;
    const fallback =
      "Browse our premium collection of high-quality products, sourced responsibly and available for global shipping.";

    if (!text) return fallback;

    const parts = text.split(".");
    if (parts.length > 2) {
      return parts.slice(0, 2).join(".") + ".";
    }
    return text;
  };

  const heroBgImage =
    Thiscategory?.photos?.[0]?.base64 ?? "/Images/ProductPage.png";

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-primary/20 overflow-x-hidden">
      {/* SEO Helmet - Dynamic Titles */}
      <Helmet>
        <title>
          {filters.searchTerm
            ? `Search: ${filters.searchTerm} | MRP Global Traders`
            : Thiscategory
              ? `${Thiscategory.name} Export Quality | MRP Global Traders`
              : "Product Catalog | Premium Agricultural Exports - MRP Global Traders"}
        </title>
        <meta name="description" content={getShortDescription()} />
        <link
          rel="canonical"
          href={`https://mrpglobaltraders.com/products${categoryName ? `/c/${categoryName}` : ""}`}
        />
      </Helmet>

      {/* --- Breadcrumb Navigation --- */}
      <div className="bg-white/80 border-b sticky top-0 z-30 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center overflow-hidden">
          <nav className="flex items-center text-sm text-gray-500 font-medium w-full overflow-x-auto scrollbar-hide whitespace-nowrap">
            <Link
              to="/"
              className="hover:text-primary transition-colors p-1 rounded-md hover:bg-gray-100"
            >
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300 shrink-0" />
            <Link
              to="/products"
              className={`hover:text-primary transition-colors ${!Thiscategory ? "text-gray-900 font-semibold" : ""}`}
            >
              Products
            </Link>
            {Thiscategory && (
              <>
                <ChevronRight className="w-4 h-4 mx-2 text-gray-300 shrink-0" />
                <span className="text-gray-900 font-semibold">
                  {Thiscategory.name}
                </span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* --- Hero Section --- */}
      <div className="relative bg-gray-900 border-b border-gray-200 overflow-hidden min-h-[250px] md:min-h-[20rem] flex items-center justify-center py-12 md:py-0">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBgImage}
            alt={Thiscategory ? Thiscategory.name : "All Products"}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-gray-900/30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">
              {Thiscategory ? (
                <>
                  Premium{" "}
                  <span className="text-primary">{Thiscategory.name}</span>
                </>
              ) : (
                "Our Product Catalog"
              )}
            </h1>
            <p className="text-sm md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed font-medium">
              {Thiscategory
                ? `Explore our handpicked selection of high-quality ${Thiscategory.name.toLowerCase()}.`
                : "Browse our complete collection of premium export-quality products."}
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div
        ref={productsTopRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 scroll-mt-20"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-gray-600 font-medium text-sm md:text-base order-2 md:order-1">
            Showing{" "}
            <span className="text-primary font-bold">
              {filteredProducts.length}
            </span>{" "}
            products
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`order-1 md:order-2 w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-sm ${
              showFilters
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-700 border border-gray-200"
            }`}
          >
            {showFilters ? (
              <X className="w-4 h-4" />
            ) : (
              <SlidersHorizontal className="w-4 h-4" />
            )}
            {showFilters ? "Close Filters" : "Filter Selection"}
          </button>
        </div>

        {/* Filters Section */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-white p-5 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
                  <Filter className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-gray-900 text-xs uppercase tracking-widest">
                    Refine Selection
                  </h3>
                </div>
                {ThiscatProducts.length > 0 ? (
                  <ProductFilter
                    filters={filters}
                    products={ThiscatProducts}
                    onFilterChange={setFilters}
                  />
                ) : (
                  <p className="text-gray-400 italic text-sm">
                    No filters available.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Grid Area */}
        <div className="w-full">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <SkeletonLoader type="product" count={8} />
            </div>
          ) : ThiscatProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-gray-100">
              <PackageX className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                No Products Available
              </h2>
              <Link
                to="/products"
                className="text-primary font-semibold flex items-center justify-center mt-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> View all collections
              </Link>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-gray-100">
              <SearchX className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                No Matches Found
              </h2>
              <button
                onClick={() =>
                  setFilters({
                    searchTerm: "",
                    origin: "All",
                    availability: "All",
                  })
                }
                className="text-primary font-bold mt-2"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="relative mb-8 px-2">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-5 h-5 text-primary shrink-0" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    {filters.searchTerm
                      ? "Search Results"
                      : Thiscategory
                        ? Thiscategory.name
                        : "All Products"}
                  </h2>
                </div>
                <p className="text-sm md:text-base text-gray-600 max-w-3xl leading-relaxed">
                  {getShortDescription()}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
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
                <div className="flex flex-wrap justify-center mt-12 gap-3">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="flex-1 md:flex-none px-6 py-3 rounded-xl border border-gray-200 text-sm font-bold bg-white disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <div className="hidden md:flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (num) => (
                        <button
                          key={num}
                          onClick={() => setCurrentPage(num)}
                          className={`w-11 h-11 rounded-xl text-sm font-bold transition-all ${
                            currentPage === num
                              ? "bg-primary text-white shadow-lg"
                              : "bg-white text-gray-600 border border-gray-200"
                          }`}
                        >
                          {num}
                        </button>
                      ),
                    )}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="flex-1 md:flex-none px-6 py-3 rounded-xl border border-gray-200 text-sm font-bold bg-white disabled:opacity-50"
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
