import React, { useState, useMemo, useEffect } from "react";
import { useApp } from "../context/AppContext";
import CategoryCard from "../components/Products/CategoryCard";
import SkeletonLoader from "../components/UI/SkeletonLoader";
import { motion } from "framer-motion";
import JoinUsSection from "../components/Home/JoinUsSection";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Search, Home, Tag } from "lucide-react";

const CATEGORIES_PER_PAGE = 12; // Standard grid size (3 rows of 4)

const CategoryListings: React.FC = () => {
  const { categories = [], loading } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Filter categories based on search term
  const filteredCategories = useMemo(() => {
    if (!categories) return [];
    if (!searchTerm) return categories;
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredCategories.length / CATEGORIES_PER_PAGE);

  const currentCategories = useMemo(() => {
    const start = (currentPage - 1) * CATEGORIES_PER_PAGE;
    return filteredCategories.slice(start, start + CATEGORIES_PER_PAGE);
  }, [filteredCategories, currentPage]);

  // Map data to the format expected by CategoryCard
  const categoriesToDisplay = useMemo(() => {
    return currentCategories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      // Added description here so it's available if CategoryCard needs it
      description: cat.description || "Explore our premium collection.",
      // Use the first image or a fallback
      image: cat.photos?.[0]?.base64 || "/Images/fallback.png",
      // Link must use ID to match ProductListings logic
      link: `/products/c/${cat.id}`,
    }));
  }, [currentCategories]);

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
            <span className="text-gray-900 font-semibold">Categories</span>
          </nav>
        </div>
      </div>

      {/* --- Hero Section --- */}
      <div className="relative bg-gray-900 border-b border-gray-200 overflow-hidden h-64 sm:h-80 flex items-center justify-center">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/Images/ProductPage.png"
            alt="Categories Background"
            className="w-full h-full object-cover opacity-40"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-gray-900/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">
              Explore Our Premium Collections
            </h1>
            <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
              Discover a world of quality with our diverse range of ethically
              sourced products, thoughtfully organized to help you find exactly
              what you need.
            </p>
          </motion.div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Count Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <div className="text-sm text-gray-500 font-medium">
            Showing{" "}
            <span className="text-gray-900 font-bold">
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
            <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border border-gray-100 shadow-sm mt-8">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No categories found
              </h3>
              <p className="text-gray-500 max-w-xs mx-auto">
                We couldn't find any categories matching "{searchTerm}".
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-6 text-primary font-semibold hover:underline"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <>
              {/* --- NEW SECTION: Category Name & Description Header --- */}

              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    {searchTerm ? "Search Results" : "Shop by Category"}
                  </h2>
                </div>
                <p className="text-gray-600 max-w-3xl leading-relaxed">
                  {searchTerm
                    ? `Found ${filteredCategories.length} categories matching your search for "${searchTerm}".`
                    : "Browse our extensive catalog below. Each category is curated to ensure the highest quality and satisfaction. Click on any card to view products."}
                </p>
              </div>

              {/* Category Cards Grid */}
              <div className="-mx-4 sm:-mx-6 lg:-mx-8">
                <CategoryCard categoriesToDisplay={categoriesToDisplay} />
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-4 gap-2 pb-12">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>

                  <div className="hidden sm:flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (num) => (
                        <button
                          key={num}
                          onClick={() => setCurrentPage(num)}
                          className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                            currentPage === num
                              ? "bg-primary text-white shadow-md shadow-primary/20"
                              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
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
                    className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-sm"
                  >
                    Next <ChevronRight className="w-4 h-4" />
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

export default CategoryListings;
