import React, { useState, useMemo, useEffect } from "react";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/Products/ProductCard";
import ProductFilter from "../components/Products/ProductFilter";
import SkeletonLoader from "../components/UI/SkeletonLoader";
import { motion } from "framer-motion";
import { Product } from "../types";
import { showtoast } from "../utils/Toast";

const ProductListings: React.FC = () => {
  const { products, searchTerm, setSearchTerm } = useApp();
  const [loading, setLoading] = useState(true);
  setSearchTerm(searchTerm);
  const [filters, setFilters] = useState({
    category: "All",
    origin: "All",
    searchTerm,
    availability: "All",
  });

  // Memoized filtered products based on the selected filters
  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      // Search filter
      if (
        filters.searchTerm &&
        !product.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Category filter
      if (filters.category !== "All" && product.category !== filters.category) {
        return false;
      }

      // Origin filter
      if (
        filters.origin !== "All" &&
        !product.origin.includes(filters.origin)
      ) {
        return false;
      }

      // Availability filter
      if (
        filters.availability !== "All" &&
        product.availability !== filters.availability
      ) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  const handleAddToCart = (product: Product) => {
    showtoast(`Added ${product.name} to inquiry list!`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-primary via-dustyTaupe to-secondary py-20 overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full"
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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

      {/* Product Filters and Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductFilter
          filters={filters}
          products={products}
          onFilterChange={setFilters}
        />

        {/* Show Skeleton Loader when loading, or show filtered products */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <SkeletonLoader type="product" count={8} />
          </div>
        ) : filteredProducts.length === 0 ? (
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
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Displaying filtered product cards */}
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductListings;
