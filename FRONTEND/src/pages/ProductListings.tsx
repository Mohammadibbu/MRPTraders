import React, { useState, useMemo, useEffect } from "react";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/Products/ProductCard";
import ProductFilter from "../components/Products/ProductFilter";
import SkeletonLoader from "../components/UI/SkeletonLoader";
import { motion } from "framer-motion";
import { Product } from "../types";
import { showtoast } from "../utils/Toast";
import JoinUsSection from "../components/Home/JoinUsSection";
import axios, { getProductsApi } from "../utils/AxiosInstance";

const PRODUCTS_PER_PAGE = 8;

const ProductListings: React.FC = () => {
  const { products = [], searchTerm, setSearchTerm, setProducts } = useApp();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    category: "All",
    origin: "All",
    searchTerm: searchTerm || "",
    availability: "All",
  });

  // Fetch products from API on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(getProductsApi);
        const fetchedProducts = response?.data || [];

        setProducts(fetchedProducts);

        // Store suggestions in localStorage
        const suggestions = fetchedProducts.map((p: Product) => p.name);
        localStorage.setItem("suggestions", JSON.stringify(suggestions));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts]);

  // Reset to page 1 on filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products?.filter((product: Product) => {
      const matchesSearch =
        !filters.searchTerm ||
        product.name.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesCategory =
        filters.category === "All" || product.category === filters.category;

      const matchesOrigin =
        filters.origin === "All" || product.origin.includes(filters.origin);

      const matchesAvailability =
        filters.availability === "All" ||
        product.availability === filters.availability;

      return (
        matchesSearch && matchesCategory && matchesOrigin && matchesAvailability
      );
    });
  }, [products, filters]);

  // Paginated products
  const totalPages = Math.ceil(filteredProducts!.length / PRODUCTS_PER_PAGE);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts?.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Handle product addition
  const handleAddToCart = (product: Product) => {
    showtoast(`Added ${product.name} to inquiry list!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-dustyTaupe to-secondary py-20 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0">
          <img
            src="/Images/ProductPage.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/50 to-primary/40" />
        </div>
        <motion.div
          className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full"
          animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Product Listings
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore our range of high-quality natural products.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductFilter
          filters={filters}
          products={products}
          onFilterChange={setFilters}
        />

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <SkeletonLoader type="product" count={8} />
          </div>
        ) : filteredProducts?.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-6">🔍</div>
            <div className="text-gray-500 text-2xl font-semibold mb-4">
              No products found
            </div>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              Try adjusting your filters or search terms.
            </p>
          </motion.div>
        ) : (
          <>
            {/* Product Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {currentProducts?.map((product) => (
                <ProductCard
                  key={product.id ?? product.name}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </motion.div>

            {/* Pagination */}
            <div className="flex justify-center mt-10 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
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
                className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
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

export default ProductListings;
