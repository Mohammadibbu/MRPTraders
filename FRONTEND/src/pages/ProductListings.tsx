import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/Products/ProductCard";
import ProductFilter from "../components/Products/ProductFilter";
import SkeletonLoader from "../components/UI/SkeletonLoader";
import { motion } from "framer-motion";
import { Product } from "../types";

const ProductListings: React.FC = () => {
  const { category } = useParams<{ category: "imports" | "exports" }>();
  const { products, searchTerm } = useApp();
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    category: category || "all",
    origin: "All",
    season: "All",
    certification: "All",
    quality: "All",
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      // Category filter
      if (category && product.category !== category) return false;

      // Search filter
      if (
        searchTerm &&
        !product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Other filters
      if (filters.origin !== "All" && product.origin !== filters.origin)
        return false;
      if (filters.season !== "All" && product.season !== filters.season)
        return false;
      if (
        filters.certification !== "All" &&
        !product.certifications.includes(filters.certification)
      )
        return false;
      if (filters.quality !== "All" && product.quality !== filters.quality)
        return false;

      return true;
    });
  }, [products, category, searchTerm, filters]);

  const handleAddToCart = (product: Product) => {
    // In a real app, this would add to cart/inquiry
    alert(`Added ${product.name} to inquiry list!`);
  };

  const categoryTitle =
    category === "imports" ? "Import Products" : "Export Products";
  const categoryDescription =
    category === "imports"
      ? "Premium tropical fruits and exotic produce from Southeast Asia"
      : "High-quality grains, pulses, and agricultural products from India";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative bg-gradient-to-r from-primary via-dustyTaupe to-secondary py-20 overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full"
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {categoryTitle}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {categoryDescription}
          </motion.p>
          <motion.div 
            className="text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 font-semibold">
              {filteredProducts.length} products found
            </span>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductFilter filters={filters} onFilterChange={setFilters} />

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
            <div className="text-gray-500 text-2xl font-semibold mb-4">No products found</div>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              Try adjusting your filters or search terms
            </p>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
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
