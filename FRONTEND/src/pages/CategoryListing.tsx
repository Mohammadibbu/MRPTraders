import React, { useState, useMemo, useEffect } from "react";
import { useApp } from "../context/AppContext";
import CategoryCard from "../components/Products/CategoryCard";
import SkeletonLoader from "../components/UI/SkeletonLoader";
import { motion } from "framer-motion";
import JoinUsSection from "../components/Home/JoinUsSection";
import { useParams } from "react-router-dom";

const CATEGORIES_PER_PAGE = 8;

const CategoryListings: React.FC = () => {
  const { categories = [], loading } = useApp();
  const { category } = useParams<{ category: string }>();

  const [currentPage, setCurrentPage] = useState(1);

  // Filter categories by URL param
  const filteredCategories = useMemo(() => {
    return categories?.filter((cat) =>
      category ? cat.name.toLowerCase() === category.toLowerCase() : true
    );
  }, [categories, category]);

  // Pagination
  const totalPages = Math.ceil(
    (filteredCategories?.length ?? 0) / CATEGORIES_PER_PAGE
  );

  useEffect(() => {
    window.scrollTo({ top: 300, behavior: "smooth" });
  }, [currentPage]);

  const currentCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * CATEGORIES_PER_PAGE;
    return filteredCategories?.slice(
      startIndex,
      startIndex + CATEGORIES_PER_PAGE
    );
  }, [filteredCategories, currentPage]);

  // Map to CategoryCard format
  const categoriesToDisplay = useMemo(() => {
    return currentCategories?.map((cat) => ({
      id: cat?.id,
      name: cat?.name,
      image: cat.photos?.[0]?.base64 || "/Images/fallback.png",
      link: `/products?category=${encodeURIComponent(cat.name)}`,
    }));
  }, [currentCategories]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-dustyTaupe to-secondary py-20 overflow-hidden">
        <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {category ? category : "All"} Categories
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore our range of high-quality {category ?? "available"}{" "}
            categories.
          </motion.p>
        </div>
      </section>

      {/* Categories Grid / Loader / Empty State */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <SkeletonLoader type="product" count={4} />
          </div>
        ) : filteredCategories?.length === 0 ? (
          // Empty state
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-6">🔍</div>
            <div className="text-gray-500 text-2xl font-semibold mb-4">
              No categories found in {category}
            </div>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              Try checking other categories or come back later.
            </p>
          </motion.div>
        ) : (
          <>
            {/* Category Cards */}
            <CategoryCard categoriesToDisplay={categoriesToDisplay} />

            {/* Pagination */}
            <div className="flex justify-center mt-10 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-4 py-2 rounded ${
                      currentPage === pageNum
                        ? "bg-primary text-secondary"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      <JoinUsSection />
    </div>
  );
};

export default CategoryListings;
