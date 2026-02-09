import React, { useState, useMemo, useEffect } from "react";
import { useApp } from "../context/AppContext";
import CategoryCard from "../components/Products/CategoryCard";
import SkeletonLoader from "../components/UI/SkeletonLoader";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async"; // SEO
import JoinUsSection from "../components/Home/JoinUsSection";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search, Home, Tag } from "lucide-react";

const CATEGORIES_PER_PAGE = 12;

const CategoryListings: React.FC = () => {
  const { categories = [], loading } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const filteredCategories = useMemo(() => {
    if (!categories) return [];
    if (!searchTerm) return categories;
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [categories, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredCategories.length / CATEGORIES_PER_PAGE);

  const currentCategories = useMemo(() => {
    const start = (currentPage - 1) * CATEGORIES_PER_PAGE;
    return filteredCategories.slice(start, start + CATEGORIES_PER_PAGE);
  }, [filteredCategories, currentPage]);

  const categoriesToDisplay = useMemo(() => {
    return currentCategories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      itemCount: cat.productIds?.length || 0,
      description: cat.description || "Explore our premium collection.",
      image: cat.photos?.[0]?.base64 || "/Images/fallback.png",
      link: `/products/c/${cat.id}`,
    }));
  }, [currentCategories]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-primary/20 overflow-x-hidden">
      <Helmet>
        <title>
          {searchTerm
            ? `Search results for "${searchTerm}" | MRP Global Traders`
            : "Product Categories | MRP Global Traders - Export Quality Spices & Fruits"}
        </title>
        <meta
          name="description"
          content="Browse our wide range of agricultural product categories. From exotic fruits and millets to premium Indian spices, find high-quality products for global export."
        />
        <link rel="canonical" href="https://mrpglobaltraders.com/categories" />
      </Helmet>

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
            <span className="text-gray-900 font-semibold">Categories</span>
          </nav>
        </div>
      </div>

      {/* --- Hero Section --- */}
      <div className="relative bg-gray-900 border-b border-gray-200 overflow-hidden h-56 sm:h-80 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/Images/ProductPage.png"
            alt="Categories"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-gray-900/30" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Explore Our <span className="text-primary">Collections</span>
            </h1>
            <p className="text-sm sm:text-lg text-gray-200 max-w-2xl mx-auto font-medium">
              Discover ethically sourced products, thoughtfully organized to
              help you find exactly what you need.
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Search & Count Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <div className="text-xs sm:text-sm text-gray-500 font-medium bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
            Showing{" "}
            <span className="text-primary font-bold">
              {filteredCategories.length}
            </span>{" "}
            categories
          </div>
        </div>

        {/* Categories Grid */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <SkeletonLoader type="product" count={8} />
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-gray-100 mt-8">
              <Search className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">
                No categories found
              </h3>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-primary font-semibold hover:underline"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <div className="relative flex items-center gap-2 mb-2">
                  <Tag className="w-5 h-5 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    {searchTerm ? "Search Results" : "Shop by Category"}
                  </h2>
                </div>
                <p className="text-gray-600 text-sm md:text-base max-w-3xl">
                  {searchTerm
                    ? `Found results matching "${searchTerm}".`
                    : "Browse our extensive catalog curated for quality and satisfaction."}
                </p>
              </div>

              <div className="md:-mx-4 lg:-mx-8">
                <CategoryCard categoriesToDisplay={categoriesToDisplay} />
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-center mt-12 gap-4 pb-12">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 sm:px-4 sm:py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium disabled:opacity-50 flex items-center gap-2 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />{" "}
                      <span className="hidden sm:inline">Previous</span>
                    </button>

                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (num) => (
                          <button
                            key={num}
                            onClick={() => setCurrentPage(num)}
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-sm font-bold transition-all ${
                              currentPage === num
                                ? "bg-primary text-white"
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
                      className="p-2 sm:px-4 sm:py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium disabled:opacity-50 flex items-center gap-2 transition-colors"
                    >
                      <span className="hidden sm:inline">Next</span>{" "}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
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

export default CategoryListings;
